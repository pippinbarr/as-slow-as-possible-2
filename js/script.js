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
    ready: false
};

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
    background(0);


    drawStart();
    drawFinish();
    drawPlayers();
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
        console.log("Drawing ", player.x, player.y, player.size);
        push();
        noFill();
        stroke("#fff");
        strokeWeight(windowWidth * 0.005);
        ellipse(player.x, player.y, player.size);

        fill(255);
        textAlign(CENTER, CENTER);
        textSize(windowWidth * 0.05);
        text(player.id, player.x, player.y);
        pop();
    }
}

function touchStarted(event) {
    for (let touch of touches) {
        if (players.length === 0) {
            addPlayer(touch);
        }
        else {
            for (let player of players) {
                const d = dist(player.x, player.y, touch.x, touch.y);
                if (d > 50) {
                    addPlayer(touch);
                    break;
                }
            }
        }
    }
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
                player.x = touch.x;
                player.y = touch.y;
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
        size: 100,
        id: playerNumber++
    });
}