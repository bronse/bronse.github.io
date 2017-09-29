
// console.js

// grab a screen of the canvas and save it. maybe add a blur effect for dem fuzzies
// 

// the console will consist of functions and objects. the functions are the interface for the object. when somehting
// happens in the game, a console function is called to log that happening in the log object. when you want to read that
// data, you call a console function to get it. the console object can actually be the text buffer itself. the data object will
// have a max size, which will be kept track of and enforced by the access function. when console render mode is entered, it will
// enter a loop where a certain number of lines are drawn from the data object and put on the screen. also during each iteraton,
// key presses will be checked for and those keys will be added to the text field. when enter is pressed, a console function is called
// that makes sense of the characters and takes some action based on them. 

// draw all the console shit on top


// console font color legend:
//  - red: critical messages
//  - white: benign messages
//  - blue: console commands
var console_ = {
    
    logString:      "initiating console...",   // initial message in console
    logStringSize:  45,                        // the number of csv's allowed in logString
    keyBuffer:      "",
    image_original: null,                      // original pixels on the canvas before console call
    image_reduced:  null,                      // pixels used as background for console

    launch: function() {
        this.setFont();
        this.capture();
        this.loop();
    },

    // todo: make sure that the Enter and Backspace strings are the same across all browsers
    // todo: add "exit" to commands list
    keyBufferWrite: function(key) {

        if(key == "Enter") {
            // enter key pressed, flush the buffer
            if(console_.keyBuffer !== "") {
                console_.command(console_.keyBuffer);
            }
            console_.keyBuffer = "";
        }
        else if(key == "Backspace") {
            // remove one character from the keybuffer string
            console_.keyBuffer = console_.keyBuffer.slice(0, -1);
        }
        else if(key == "Shift") {
            // shifting is taken care of, nothing to do
        }
        else if(key == "Alt") {
            // nothing to do
        }
        else if(key == "`") {
            // nothing to do
        }

        else {
            console_.keyBuffer = console_.keyBuffer + key;
        }
    },

    capture: function() {
        
        console_.image_original = context.getImageData(0, 0, canvas.width, canvas.height);
        console_.image_reduced = context.getImageData(0, 0, canvas.width, canvas.height);

        // alter the pixels to make them darker
        var data = console_.image_reduced.data;
        for(i = 0; i < data.length; i += 4) {
            data[i]     /= 3; // r
            data[i + 1] /= 3; // g
            data[i + 2] /= 3; // b
            data[i + 3];      // a (this should not be changed)
        }
        
        context.putImageData(console_.image_reduced, 0, 0);
        context.strokeRect(5, 5, canvas.width - 10, canvas.height - 50);
        context.strokeRect(5, (16 * console_.logStringSize) + 40, canvas.width - 10, 30);
        console_.image_reduced = context.getImageData(0, 0, canvas.width, canvas.height);

    },

    setFont: function() {
        context.font = "15px Optima";
        context.fillStyle = "white";
        context.textAlign = "left";
    },

    // make sure the halt handler stays with the function that actully loops
    // todo: make the font size and text alignment automatic for canvas size and screen size
    loop: function() {
        context.putImageData(console_.image_reduced, 0, 0);
        var logStringArray = console_.logString.split(",");

        for(i = 0; i < console_.logStringSize && i < logStringArray.length; i++) {
            context.fillText(logStringArray[i], 10, (i * 16) + 40);
        }
        context.fillText(console_.keyBuffer, 10, console_.logStringSize * 16 + 60);
        
        if(renderModeFlags.halt) {
            console_.log("---");
            console_.keyBuffer = "";
            context.putImageData(console_.image_original, 0, 0);
            switchRenderMode();
        }
        else {
            requestAnimationFrame(console_.loop);
        }
    },

    log: function(msg) {
        var logArray = console_.logString.split(",");
        if(logArray.length >= console_.logStringSize) {
            logArray.shift();
            console_.logString = logArray.toString();
        }

        // add the new entry to the log string
        console_.logString = console_.logString + "," + msg;
    },

    command: function(msg) {
        console_.log("] " + msg);
        var msgArray = msg.split(" ");

        switch(msgArray[0]) {

            case "help":
                console_.log("- enter a command you idiot");
                break;

            case "man":
                switch(msgArray[1]) {
                    case "help":
                        console_.log("- help: a command that is lost on idiots");
                        break;
                    default:
                        console_.log("- command not recognised");
                }
                break;

            case "toggle":
                switch(msgArray[1]) {
                    case "region_debug":
                        console_.log("- toggling region_debug");
                        region_debug = !region_debug;
                        break;
                    default:
                        console_.log("- command not recognised");
                }
                break;

            default:
                console_.log("- command not recognised");
        }
    }
}