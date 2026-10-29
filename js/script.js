/**
 * As Slow As Possible 2
 * Pippin Barr
 * 
 * Going slow. Again.
 */

"use strict";

const players = [];
let playerNumber = 0;

let start = {
    y: 0.9,
    ready: false,
};

let countdown = {
    active: false,
    count: 3
};

let raceOn = false;

let finish = {
    y: 0.1
};

/**
 * Create a canvas
*/
function setup() {
    createCanvas(windowWidth, windowHeight);

    // Phone stuff. Oh god. Taken from Phone game for now.
    pixelDensity(1);

    // addEventListener('orientationchange', windowResized);
    // ???

    window.requestAnimationFrame(updateTouches)
}


/**
 * Move and display the danger and me
*/
function draw() {
    background("#ce5f4c");

    checkFinish();

    drawStart();
    drawFinish();
    drawPlayers();
}

function checkFinish() {
    for (let player of players) {
        if (player.y < finish.y * height) {
            noLoop();
        }
    }
}

function drawStart() {
    push();
    drawingContext.setLineDash([windowWidth * 0.025, windowWidth * 0.02]);
    noFill();
    stroke("#fff");
    strokeWeight(windowWidth * 0.005);
    line(0, start.y * height, width, start.y * height);
    pop();

    push();
    fill("#fff")
    textAlign(CENTER, CENTER);
    textSize(windowWidth * 0.05);
    text("START", width / 2, start.y * height - textAscent());
    pop();
}

function drawFinish() {
    push();
    drawingContext.setLineDash([windowWidth * 0.025, windowWidth * 0.02]);
    noFill();
    stroke("#fff");
    strokeWeight(windowWidth * 0.005);
    line(0, finish.y * height, width, finish.y * height);
    pop();

    push();
    fill("#fff")
    textAlign(CENTER, CENTER);
    textSize(windowWidth * 0.05);
    text("FINISH", width / 2, finish.y * height - textAscent());
    pop();
}

function drawPlayers() {
    for (let player of players) {

        push();
        stroke(255);
        strokeWeight(windowWidth * 0.01);
        for (let p of player.trail) {
            point(p.x, p.y);
        }
        pop();

        push();
        noFill();
        stroke("#fff");
        strokeWeight(windowWidth * 0.005);
        ellipse(player.x, player.y, player.size);

        fill(255);
        textAlign(CENTER, CENTER);
        textSize(windowWidth * 0.05);
        text(player.id, player.x, player.y + player.size / 1.5);
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
function touchStarted(event) {
    for (let touch of touches) {
        // If the touch isn't inside the starting area, then it's invalid
        if (touch.y < start.y * height) {
            return;
        }
        // If there are no players, we want to add this one
        if (players.length === 0) {
            addPlayer(touch);
        }
        else {
            // Otherwise if there are other players, check if this touch
            // represents a new player (because it's above a threshold distance
            // away from where all other players currently are)
            for (let player of players) {
                const d = dist(player.x, player.y, touch.x, touch.y);
                // Using 50 here is bad cat stuff and I'll do better (later)
                if (d > 50) {
                    // Add a player at this touch
                    addPlayer(touch);
                    break;
                }
            }
        }
    }
    // This stops a long press context menu from showing up
    event.preventDefault();
}

function touchEnded(event) {
    for (let player of players) {
        let found = false;
        for (let touch of touches) {
            const d = dist(player.x, player.y, touch.x, touch.y);
            if (d < 50) {
                found = true;
            }
        }
        if (!found) {
            players.splice(players.indexOf(player), 1);
        }
    }
}

function updateTouches() {
    for (let touch of touches) {
        for (let player of players) {
            const d = dist(player.x, player.y, touch.x, touch.y);
            if (d < 50) {
                player.distance += dist(player.x, player.y, touch.x, touch.y);
                player.x = touch.x;
                player.y = touch.y;
                if (player.y < start.y * height && player.distance > player.lastMarker + player.distanceMarkerInterval) {
                    player.lastMarker = player.distance;
                    player.trail.push({ x: player.x, y: player.y });
                }
                break;
            }
        }
    }
    window.requestAnimationFrame(updateTouches);
}

function addPlayer(touch) {
    players.push({
        x: touch.x,
        y: touch.y,
        size: 200,
        distance: 0,
        lastMarker: 0,
        distanceMarkerInterval: 20,
        trail: [],
        addTimestamp: millis(),
        id: playerNumber++
    });
}