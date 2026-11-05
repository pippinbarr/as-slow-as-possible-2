const RaceState = {
    WAITING_FOR_PLAYERS: "Adding players",
    STARTING_RACE: "Starting the race",
    RACING: "The race is on",
    RACE_OVER: "The race is finished"
};

class Race {
    constructor() {

    }

    create() {
        this.race = {
            numPlayersRequired: 1,
            startY: 0.9,
            finishY: 0.1,
            countdown: 3,
            state: RaceState.WAITING_FOR_PLAYERS
        };

        this.players = [];
        this.playerNumber = 1;
        this.playerIdentityThreshold = 75;
    }

    update() {
        // Racing orange
        background("#ce5f4c");


        switch (this.race.state) {
            case RaceState.WAITING_FOR_PLAYERS:
                this.drawWaiting();
                // Draw the elements of the racetrack and players
                this.drawStart();
                this.drawFinish();

                this.drawPlayers();
                break;

            case RaceState.STARTING_RACE:
                this.drawCountdown();
                // Draw the elements of the racetrack and players
                this.drawStart();
                this.drawFinish();

                this.drawPlayers();
                break;

            case RaceState.RACING:
                // Check if anyone finished the race
                this.checkFinish();

                // Draw the elements of the racetrack and players                
                this.drawFinish();
                this.drawPlayers();
                break;

            case RaceState.RACE_OVER:
                this.drawRaceOver();
                this.drawPlayers();

                break;
        }


    }


    checkFinish() {
        let finishers = 0;
        for (let player of this.players) {
            if (player.y <= this.race.finishY * height) {
                player.active = false;
                finishers++;
            }
        }
        if (finishers === this.players.length) {
            // Everyone finished!
            this.race.state = RaceState.RACE_OVER;
        }
    }


    /**
     * Draw the start line and label
     */
    drawStart() {
        push();
        drawingContext.setLineDash([windowWidth * 0.025, windowWidth * 0.02]);
        noFill();
        stroke("#fff");
        strokeWeight(windowWidth * 0.005);
        line(0, this.race.startY * height, width, this.race.startY * height);
        pop();

        push();
        fill("#fff")
        textAlign(CENTER, CENTER);
        textSize(windowWidth * 0.05);
        text("START", width / 2, this.race.startY * height - textAscent());
        pop();
    }

    /**
    * Draw the finish line and label
    */
    drawFinish() {
        push();
        drawingContext.setLineDash([windowWidth * 0.025, windowWidth * 0.02]);
        noFill();
        stroke("#fff");
        strokeWeight(windowWidth * 0.005);
        line(0, this.race.finishY * height, width, this.race.finishY * height);
        pop();

        push();
        fill("#fff")
        textAlign(CENTER, CENTER);
        textSize(windowWidth * 0.05);
        text("FINISH", width / 2, this.race.finishY * height - textAscent());
        pop();
    }


    drawWaiting() {
        push();
        fill("#fff")
        textAlign(CENTER, CENTER);
        textSize(windowWidth * 0.05);
        text("WAITING FOR RACERS", width / 2, height / 2);
        pop();
    }

    drawCountdown() {
        push();
        fill("#fff")
        textAlign(CENTER, CENTER);
        textSize(windowWidth * 0.1);
        text(this.race.countdown, width / 2, height / 2);
        pop();
    }

    drawRaceOver() {
        push();
        fill("#fff")
        textAlign(CENTER, CENTER);
        textSize(windowWidth * 0.1);
        text("RACE OVER", width / 2, height / 2);
        pop();
    }


    /**
     * Draw all the players and their trails
     */
    drawPlayers() {
        // Go through all the players
        for (let player of this.players) {
            this.drawPlayer(player);
        }
    }


    /** 
     * Draws a single player 
     */
    drawPlayer(_player) {
        // Draw the trail as a series of dots
        push();
        stroke(255);
        strokeWeight(windowWidth * 0.01);
        for (let p of _player.trail) {
            point(p.x, p.y);
        }
        pop();

        // Draw the player position as a circle (so they can see the game knows where they are)
        // It's possible it'd be even more fun *not* to draw this for deeper "immersion"?
        push();
        noFill();
        stroke("#fff");
        strokeWeight(windowWidth * 0.005);
        if (!_player.failed) {
            ellipse(_player.x, _player.y, _player.size);
        }
        else {
            const xSize = _player.size / 20;
            line(_player.x - _player.size / xSize, _player.y - _player.size / xSize, _player.x + _player.size / xSize, _player.y + _player.size / xSize);
            line(_player.x + _player.size / xSize, _player.y - _player.size / xSize, _player.x - _player.size / xSize, _player.y + _player.size / xSize);
        }
        pop();

        if (!_player.failed) {
            // Draw the player's id number for reference, presumably don't need this long term
            // (Though how else will I announce a winner? Hmm.)
            push();
            fill(255);
            textAlign(CENTER, CENTER);
            textSize(windowWidth * 0.05);
            text(_player.id, _player.x, _player.y + _player.size / 1.5);
            pop();
        }


    }


    /**
     * Called when any finger-like thing starts touching the display.
     * I'm using the touches array rather than the information in the
     * event for reasons I'm unsure of.
     * @param {*} event - Contains info about the touch
     * @returns nothing
     */
    touchStarted(event) {
        // We only care about touches starting when adding players
        if (this.race.state !== RaceState.WAITING_FOR_PLAYERS) return;

        for (let touch of touches) {
            // If the touch isn't inside the starting area, then it's invalid
            if (touch.y < this.race.startY * height) {
                return;
            }
            // If there are no players, we want to add this one
            if (this.players.length === 0) {
                this.addPlayer(touch);
            }
            else {
                // Otherwise if there are other players, check if this touch
                // represents a new player (because it's above a threshold distance
                // away from where all other players currently are)
                for (let player of this.players) {
                    const d = dist(player.x, player.y, touch.x, touch.y);
                    // Using 50 here is bad cat stuff and I'll do better (later)
                    if (d > 50) {
                        // Add a player at this touch
                        this.addPlayer(touch);
                        break;
                    }
                }
            }
        }
    }

    /**
     * Handles a lifted finger essentially just by deleting that player
     * It amounts to a forfeit...
     * @param {*} event 
     */
    touchEnded(event) {
        // Go through all the players
        for (let player of this.players) {
            let found = false;
            // Go through all the touches and see if there's a touch that
            // would correspond to the player, that is within a certain threshold
            for (let touch of touches) {
                const d = dist(player.x, player.y, touch.x, touch.y);
                if (d < this.playerIdentityThreshold) {
                    found = true;
                }
            }
            // If you can't find a touch for a player, then that player must be gone
            if (!found) {
                player.active = false;
                if (this.race.state === RaceState.RACING) {
                    player.failed = true;
                }
                else if (this.race.state === RaceState.STARTING_RACE) {
                    this.players.splice(this.players.indexOf(player), 1);
                    if (this.players.length < this.race.numPlayersRequired) {
                        this.race.state = RaceState.WAITING_FOR_PLAYERS;
                    }
                }
            }
        }
    }

    /**
     * Update the game based on the current set of touches
     */
    updateTouches() {
        // Go through all touches and all players
        for (let touch of touches) {
            for (let player of this.players) {
                if (!player.active || this.race.state !== RaceState.RACING) return;
                // Check if the touch corresponds to the player by a threshold
                // (Which needs to be improved)
                const d = dist(player.x, player.y, touch.x, touch.y);
                if (d < this.playerIdentityThreshold) { // Oh this number
                    // If it's this player, update how far the player has travelled
                    player.distance += dist(player.x, player.y, touch.x, touch.y);
                    // Update the player's position to the new touch position
                    player.x = touch.x;
                    player.y = touch.y;
                    // If the player is racing and they've moved far enough
                    // add a point into their trail for display
                    if (player.distance > player.lastMarker + player.distanceMarkerInterval) {
                        player.lastMarker = player.distance;
                        player.trail.push({ x: player.x, y: player.y });
                    }
                    // Found and updated this player, so don't need to look for
                    // a corresponding player for the touch anymore
                    break;
                }
            }
        }
    }

    /**
     * Adds a new player at the provided touch position
     * @param {*} touch 
     */
    addPlayer(touch) {
        const newPlayer = {
            active: true,
            finished: false,
            failed: false,
            x: touch.x,
            y: touch.y,
            size: 200,
            // Properties to track how far the player has moved
            // and to maintain a trace of their trajectory
            distance: 0,
            lastMarker: 0,
            distanceMarkerInterval: 20,
            trail: [],
            // When they joined the game, in case that's useful
            addTimestamp: millis(),
            // When they officially started
            startTimestamp: undefined,
            // When they officially finished
            finishTimestamp: undefined,
            // Give them an id
            id: this.playerNumber++
        };

        // Add player data for a player at this position
        this.players.push(newPlayer);

        // Check if we've got enough players
        if (this.players.length === this.race.numPlayersRequired) {
            // Start the race...
            this.startRaceCountdown();
        }
    }

    startRaceCountdown() {
        this.race.state = RaceState.STARTING_RACE;

        // Now we set up the count down and so on
        // Be nice to remove the START LINE on start too, there's a funny idea there
        // about the opposite of trying to get right up on the line, trying to hang back
        // so you have a tiny bit further to go
        setInterval(() => {
            this.race.countdown--;
            if (this.race.countdown === 0) {
                this.race.state = RaceState.RACING;
            }
        }, 1000);
    }
}