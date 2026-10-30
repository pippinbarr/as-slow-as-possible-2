class Race {
    constructor() {

    }

    create() {
        this.start = {
            y: 0.9
        };

        this.finish = {
            y: 0.1
        };

        this.players = [];
        this.playerNumber = 1;
    }

    update() {
        // Racing orange
        background("#ce5f4c");

        // Check if anyone finished the race
        // this.checkFinish();

        // Draw the elements of the racetrack and players
        this.drawStart();
        this.drawFinish();
        this.drawPlayers();
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
        line(0, this.start.y * height, width, this.start.y * height);
        pop();

        push();
        fill("#fff")
        textAlign(CENTER, CENTER);
        textSize(windowWidth * 0.05);
        text("START", width / 2, this.start.y * height - textAscent());
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
        line(0, this.finish.y * height, width, this.finish.y * height);
        pop();

        push();
        fill("#fff")
        textAlign(CENTER, CENTER);
        textSize(windowWidth * 0.05);
        text("FINISH", width / 2, this.finish.y * height - textAscent());
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
        ellipse(_player.x, _player.y, _player.size);

        // Draw the player's id number for reference, presumably don't need this long term
        // (Though how else will I announce a winner? Hmm.)
        fill(255);
        textAlign(CENTER, CENTER);
        textSize(windowWidth * 0.05);
        text(_player.id, _player.x, _player.y + _player.size / 1.5);
        pop();
    }


    /**
     * Called when any finger-like thing starts touching the display.
     * I'm using the touches array rather than the information in the
     * event for reasons I'm unsure of.
     * @param {*} event - Contains info about the touch
     * @returns nothing
     */
    touchStarted(event) {
        for (let touch of touches) {
            // If the touch isn't inside the starting area, then it's invalid
            if (touch.y < this.start.y * height) {
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
                if (d < 50) {
                    found = true;
                }
            }
            // If you can't find a touch for a player, then that player must be gone
            if (!found) {
                this.players.splice(this.players.indexOf(player), 1);
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
                // Check if the touch corresponds to the player by a threshold
                // (Which needs to be improved)
                const d = dist(player.x, player.y, touch.x, touch.y);
                if (d < 100) {
                    // If it's this player, update how far the player has travelled
                    player.distance += dist(player.x, player.y, touch.x, touch.y);
                    // Update the player's position to the new touch position
                    player.x = touch.x;
                    player.y = touch.y;
                    // If the player is racing and they've moved far enough
                    // add a point into their trail for display
                    if (player.y < this.start.y * height && player.distance > player.lastMarker + player.distanceMarkerInterval) {
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
            // Give them an id
            id: this.playerNumber++
        };

        // Add player data for a player at this position
        this.players.push(newPlayer);
    }
}