
// menu.js

// the mouseclick callback should call a function in here
// the menu consists of a single looping video and a series of interfaces
// simply set a video looping and draw it every frame regardless of anything else. dont forget to turn it off when you leave
// in the loop, draw the video, draw the buttons and so on. check for roll over. 
// the menu can have scenes like the video scenes, but they only consist of buttons

// one can think of buttons as a tree. some buttons are leaf nodes that do something. other buttons simply lead to more buttons.
// lets maintain a list of current buttons. branch nodes will change the list.

// buttons will only be able to be pressed and rolled over one at a time. this will be baked into the code
    
var menuButtons = {

    button_001_001: {
        name: "start",
        x: 350,  y: 500,
        w: 100, h: 50,
        tex_curr: document.getElementById("img_1"),
        tex_idle: document.getElementById("img_1"),
        tex_roll: document.getElementById("img_2"),

        onClick: function() {
            // put the gamePrime function in here. load regions and bla
            // currentScene = scene_001;
            // currentScene.loadRegions();
            // currentScene.initiate();
            
            // menu.currentButtons = [this.button_001_002];

            currentScene = scene_001;
            currentScene.loadRegions();
            currentScene.initiate();    
            renderMode("video");
        }            
    },

    button_001_002: {
        name: "options",
        x: 350, y: 600,
        w: 100, h: 50,
        tex_curr: document.getElementById("img_1"), 
        tex_idle: document.getElementById("img_1"),
        tex_roll: document.getElementById("img_2"),

        onClick: function() {
            menu.currentButtons = [menuButtons.button_001_001];
        }
    }
};

// todo: limit the loop to 24 frames per second and overhaul the button hightlighting so that its perf doesnt suck
var menu = {

    overlay: null,
    video: null,
    currentButtons: [menuButtons.button_001_001, menuButtons.button_001_002],

    launch: function() {

        console_.log("menu launching");
        this.video =   document.getElementById("vid_4");
        this.overlay = document.getElementById("img_3"),
        this.video.play();
        this.loop();
    },

    loop: function() {
        context.drawImage(menu.video, 0, 0, canvas.width, canvas.height);
        context.drawImage(menu.overlay, 0, 0, canvas.width, canvas.height);

        for(i = 0; i < menu.currentButtons.length; i++) {
            var but = menu.currentButtons[i];
            context.drawImage(but.tex_curr, but.x, but.y, but.w, but.h);
        }

        if(renderModeFlags.halt) {
            console_.log("menu mode halted");
            menu.video.pause();
            switchRenderMode();
        }
        else {
            requestAnimationFrame(menu.loop);
        }
    },

    processClick: function(mx, my) {
        console_.log("click detected");

        for(var buttonKey in menuButtons) {
            var button = menuButtons[buttonKey];
            if(button.y < my && (button.y + button.h) > my) {
                if(button.x < mx && (button.x + button.w) > mx) {
                    button.onClick();
                    return(true);
                }
            }
        }
        return(false);
    },

    processMove: function(mx, my) {
        // todo: change this so that its more efficient
        for(buttonKey in menuButtons) {
            menuButtons[buttonKey].tex_curr = menuButtons[buttonKey].tex_idle;
        }
        
        for(var buttonKey in menuButtons) {
            var button = menuButtons[buttonKey];
            if(button.y < my && (button.y + button.h) > my) {
                if(button.x < mx && (button.x + button.w) > mx) {
                    button.tex_curr = button.tex_roll;
                    return(true);
                }
            }
        }
        return(false);
    },
};