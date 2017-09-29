
// keydown.js

window.addEventListener('keydown', this.keydown, false);

// key press callback
// todo: add a filter so only useful keys are considered
// todo: make it so space doesnt scroll down
// todo: you can disregard shift, when shift is pressed, the correct key is reported
function keydown(key) {

    // insert code to handle special events, like the tilde being pressed, which toggles the rendermode in and out of console, maybe?
    if(key.keyCode == 192) {
        renderMode("console");
    }
    // todo: eventually we need a way to toggle console mode off without specifying which mode to return to
    if(key.key == "1") {
        renderMode("video_restore");
    }

    switch(getRenderModeFlag()) {
        case "video":
            break;
        case "console":
            console_.keyBufferWrite(key.key);
            break;
        default:
            // wat hapan         
    }
}