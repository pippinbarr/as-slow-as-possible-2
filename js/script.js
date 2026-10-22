/**
 * As Slow As Possible 2
 * Pippin Barr
 * 
 * Going slow. Again.
 */

"use strict";

let me = {
    x: 100,
    y: 600,
    size: 50,
    fill: "#ffffff"
};

let start = {
    x: 100,
    y: 500,
    size: 80,
    fill: false,
    angle: 0,
    textFill: "#ffffff",
    ready: false
}

/**
 * Create a canvas
*/
function setup() {
    createCanvas(200, 600);
}


/**
 * Move and display the danger and me
*/
function draw() {
    background(0);

    moveMe();

    const d = dist(me.x, me.y, start.x, start.y);
    if (!start.ready && start.angle < TWO_PI && d < me.size / 2 + start.size / 2) {
        start.angle = constrain(start.angle + 0.05, 0, TWO_PI);
        if (start.angle === TWO_PI) {
            start.textFill = "#0f0";
            start.ready = true;
        }
    }
    else if (!start.ready && d > me.size / 2 + start.size / 2) {
        start.angle = constrain(start.angle - 0.05, 0, TWO_PI);
        if (start.angle === 0) {
            start.textFill = "#ffffff";
            start.ready = false;
        }
    }

    drawStart();
    drawEnd();
    drawMe();
}

function moveMe() {
    me.x = constrain(mouseX, 0, width);
    me.y = constrain(mouseY, 0, height);
}

function drawStart() {
    push();
    drawingContext.setLineDash([5, 3]);
    noFill();
    stroke("#fff");
    ellipse(start.x, start.y, start.size);
    pop();

    push();
    // drawingContext.setLineDash([5, 3]);
    noFill();
    stroke("#0f0");
    arc(start.x, start.y, start.size, start.size, -PI, -PI + start.angle);
    pop();

    push();
    fill(start.textFill)
    textAlign(CENTER, CENTER);
    textSize(18);
    text("START", start.x, start.y);
    pop();
}

function drawEnd() {
    push();
    drawingContext.setLineDash([5, 3]);
    noFill();
    stroke("#fff");
    ellipse(width / 2, 0 + me.size, me.size * 1.5);
    pop();

    push();
    fill(255)
    textAlign(CENTER, CENTER);
    textSize(18);
    text("END", width / 2, 0 + me.size);
    pop();
}

function drawMe() {
    push();
    fill(me.fill);
    noStroke();
    ellipse(me.x, me.y, me.size);
    pop();
}