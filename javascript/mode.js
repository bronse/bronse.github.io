
// mode.js

// this object holds flags that the game uses to know what rendering mode is running. it is accessed by its corresponding function
// todo: make a function for accessing the halt and running properties
var renderModeFlags = {
    video:   false,
    console: false,
    menu:    false,

    halt:    false,
    running: false,
}

// this is the function used to set the render mode flag
// todo: move the following two functions into the rendermodeflags object
function setRenderModeFlag(mode) {
    var ret = clearRenderModeFlags();
    switch(mode) {
        case "video":
            renderModeFlags.video   = true;
            renderModeFlags.running = true;
            break;
        case "console":
            renderModeFlags.console = true;
            renderModeFlags.running = true
            break;
        case "menu":
            renderModeFlags.menu    = true;
            renderModeFlags.running = true
            break;
        default:
            // an error has occurred
    }

}

// the two following functions are now out of date because rendermodeflags holds the status of the current mode now. a simple name change will fix these functions
function getRenderModeFlag() {
    if(renderModeFlags.video)   { return "video"; }
    if(renderModeFlags.console) { return "console"; }
    if(renderModeFlags.menu)    { return "menu"; }
    return "error";   
}

function clearRenderModeFlags() {
    renderModeFlags.video   = false;
    renderModeFlags.console = false;
    renderModeFlags.menu    = false;

    renderModeFlags.halt    = false;
    renderModeFlags.running = false;
}

// change the render mode
// change the name of this to setRenderMode
function renderMode(mode) {

    // is there a render mode currently running?
    if(!renderModeFlags.running) {
        switch(mode) {
            case "video":
                setRenderModeFlag("video");
                renderVideo();
                break;
            case "console":
                setRenderModeFlag("console");
                console_.launch();
                break;      
            case "menu":
                setRenderModeFlag("menu");
                menu.launch();
                break;
            default:
                // an error has occurred
        }
    }
    
    // is the requested mode the same and the currently running mode?
    else if(mode !== getRenderModeFlag()) {
        switch(mode) {
            case "video":
                setRenderModeFlag("video");
                renderModeFlags.halt = true;
                break;
            case "video_restore":
                console_.log("video_restore engaged");
                restoreVideoState();
                setRenderModeFlag("video");
                renderModeFlags.halt = true;
                break;
            case "console":
                setRenderModeFlag("console");
                console_.log("---");
                renderModeFlags.halt = true;
                break;      
            case "menu":
                // render things in menu mode
                break;
            default:
                // an error has occurred
        }
    }
}

function switchRenderMode() {
    
    switch(getRenderModeFlag()) {
        case "video":
            renderModeFlags.halt = false;
            renderVideo();
            break;
        case "console":
            renderModeFlags.halt = false;
            console_.launch();
            break;
        case "menu":
            // switch to menu
            break;
        default:
            // an error has occurred
    }
}