/**
 * As Slow As Possible 2
 * Pippin Barr
 * 
 * Going slow. Again.
 */

"use strict";

let race = undefined;

/**
 * Create a canvas
*/
function setup() {
    // Trying out using the full dimensions of the availble screen
    createCanvas(windowWidth, windowHeight);

    // Phone stuff. Oh god. Taken from Phone game for now.
    pixelDensity(1);

    // addEventListener('orientationchange', windowResized);
    // Should I be handling this? Probably I ought to just disallow it

    race = new Race();
    race.create();

    // Start requesting touches at the animation framerate to keep it smooth
    window.requestAnimationFrame(updateTouches)
}


/**
 * Move and display the danger and me
*/
function draw() {
    race.update();
}


/**
 * Called when any finger-like thing starts touching the display.
 * I'm using the touches array rather than the information in the
 * event for reasons I'm unsure of.
 * @param {*} event - Contains info about the touch
 * @returns nothing
 */
function touchStarted(event) {
    race.touchStarted(event);

    // This stops a long press context menu from showing up
    event.preventDefault();
}

/**
 * Handles a lifted finger essentially just by deleting that player
 * It amounts to a forfeit...
 * @param {*} event 
 */
function touchEnded(event) {
    race.touchEnded(event);
}

/**
 * Update the game based on the current set of touches
 */
function updateTouches() {
    race.updateTouches();

    // Let's do it again in a frame
    window.requestAnimationFrame(updateTouches);
}
