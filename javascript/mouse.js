
// mouse.js

// todo: does this need to synced with the canvas loading?
var boundingClientRect = canvas.getBoundingClientRect();

// callback function for mouse press
canvas.addEventListener('mousedown', function(e) {
    console_.log("mouse is down");

    // get mouse coords relative to the canvas
    var canvasRect = canvas.getBoundingClientRect();
    var mx = e.clientX - canvasRect.left;
    var my = e.clientY - canvasRect.top;

    switch(getRenderModeFlag()) {
        case "video": 
            // call the video function
            video_process_click(mx, my);
            break;
        case "console": 
            // call the console function if i ever make one
            break;
        case "menu": 
            menu.processClick(mx, my);
            break;
        default:
            // an error has ocurred
    }
}, true);

canvas.addEventListener('mousemove', function(e) {
    
    // get mouse coords relative to the canvas
    var canvasRect = canvas.getBoundingClientRect();
    var mx = e.clientX - canvasRect.left;
    var my = e.clientY - canvasRect.top;

    // find out what render mode is currently engaged
    switch(getRenderModeFlag()) {
        case "video":
            // wat do
            break;
        case "menu":
            menu.processMove(mx, my);
            break;
        case "console":
            // wat do
            break;
        default:
            // do something fucking insane
            console_.log("you should never see this - mousemove event listener");
    }

}, true);