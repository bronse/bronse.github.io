
// video.js

// create video objects
var video_layer_1;
var video_layer_2;
var video_layer_3;

// create flags for video playback
var video_layer_1_playing = false;
var video_layer_2_playing = false;
var video_layer_3_playing = false;
var region_debug          = true;

// these are needed because js does not allow directly accessing the play status of a video
function set_video_layer_1() { video_layer_1_playing = true; }
function clr_video_layer_1() { video_layer_1_playing = false;}
function set_video_layer_2() { video_layer_2_playing = true; }
function clr_video_layer_2() { video_layer_2_playing = false;}
function set_video_layer_3() { video_layer_3_playing = true; }
function clr_video_layer_3() { video_layer_3_playing = false;}

var renderVideoFlags = {
    // that status of each video
    video_layer_1_playing: false,
    video_layer_2_playing: false,
    video_layer_3_playing: false,

    // the name of each video
    video_layer_1_id: "na",
    video_layer_2_id: "na",
    video_layer_3_id: "na",
}

// declare the array that will hold all the current on-screen click regions
var regionArray;

// declare the variable that will hold the current scene
var currentScene;

// todo: make it so that each render mode has a prep function and a loop function
function renderVideo() {
    
    // todo: fix this?
    if(false) {
        restoreVideoState();
    }
    
    if(video_layer_1_playing || video_layer_2_playing || video_layer_3_playing) {

        //context.clearRect(50, 50, canvas.width, canvas.height); // leave this off untill you get visual artifacts at some point during development (which may never happen)
                                                                  // if you find that it has to be turned on, youll have to come up with a solution for dynamically determining
                                                                  // when and when not to clear, to avoid flashes during transitions

        if(video_layer_1_playing) { context.drawImage(video_layer_1, 0, 0, canvas.width, canvas.height); }
        if(video_layer_2_playing) { context.drawImage(video_layer_2, 0, 0, canvas.width, canvas.height); }
        if(video_layer_3_playing) { context.drawImage(video_layer_3, 0, 0, canvas.width, canvas.height); }
        if(region_debug) {
            for(i = 0; i < regionArray.length; i++) {
                context.strokeStyle="red";
                context.strokeRect( regionArray[i].x,
                                    regionArray[i].y,
                                    regionArray[i].w,
                                    regionArray[i].h
                                    );
            }
        }
    }
    // document.getElementById('debug_3').innerHTML = "video_playing: " + video_layer_1_playing; // debug
    // todo: pause videos that might be playing and do other cleanup
    // todo: make it so that video mode will save when switching modes and pick up where it left off when reactivated
    if(renderModeFlags.halt) {
        saveVideoState();
        switchRenderMode();
    }
    else {
        requestAnimationFrame(renderVideo);
    }
}

function video_process_click(mx, my) {
    console_.log("video_click entered");

    if(!video_layer_3_playing && !video_layer_2_playing && !video_layer_1_playing ) {
        for(i = 0; i < regionArray.length; i++) {
            if(regionArray[i].x < mx && mx < (regionArray[i].x + regionArray[i].w)) {
                if(regionArray[i].y < my && my < (regionArray[i].y + regionArray[i].h)) {
                    console_.log("mouse click: " + regionArray[i].id);
                    currentScene.processClick(regionArray[i].id);
                }
            }
        }
    }
}

function saveVideoState() {

    // pause all videos
    video_layer_1.pause();
    video_layer_2.pause();
    video_layer_3.pause();

    // save all video_layer_x_playing flags
    renderVideoFlags.video_layer_1_playing = video_layer_1_playing;
    renderVideoFlags.video_layer_2_playing = video_layer_2_playing;
    renderVideoFlags.video_layer_3_playing = video_layer_3_playing;

    // save all video names
    renderVideoFlags.video_layer_1_id = video_layer_1.id;
    renderVideoFlags.video_layer_2_id = video_layer_2.id;
    renderVideoFlags.video_layer_3_id = video_layer_3.id;

    // debug
    console_.log("saving videos ..." + 
                    "   layer_1:" + renderVideoFlags.video_layer_1_id +
                    "   layer_2:" + renderVideoFlags.video_layer_2_id +
                    "   layer_3:" + renderVideoFlags.video_layer_3_id
                );                                                                    
}

function restoreVideoState() {

    try {
    video_layer_1.removeEventListener('play' , set_video_layer_1);
    video_layer_1.removeEventListener('pause', clr_video_layer_1);
    video_layer_2.removeEventListener('play' , set_video_layer_2);
    video_layer_2.removeEventListener('pause', clr_video_layer_2);
    video_layer_3.removeEventListener('play' , set_video_layer_3);
    video_layer_3.removeEventListener('pause', clr_video_layer_3);

    video_layer_1 = document.getElementById(renderVideoFlags.video_layer_1_id);
    video_layer_1.addEventListener('play' , set_video_layer_1, true);
    video_layer_1.addEventListener('pause', clr_video_layer_1, true);


    video_layer_2 = document.getElementById(renderVideoFlags.video_layer_2_id);
    video_layer_2.addEventListener('play' , set_video_layer_2, true);
    video_layer_2.addEventListener('pause', clr_video_layer_2, true);

    video_layer_3 = document.getElementById(renderVideoFlags.video_layer_3_id);
    video_layer_3.addEventListener('play' , set_video_layer_3, true);
    video_layer_3.addEventListener('pause', clr_video_layer_3, true);

    video_layer_1_playing = renderVideoFlags.video_layer_1_playing;
    video_layer_2_playing = renderVideoFlags.video_layer_2_playing;
    video_layer_3_playing = renderVideoFlags.video_layer_3_playing;

    if(video_layer_1_playing) { video_layer_1.play(); }
    if(video_layer_2_playing) { video_layer_2.play(); }
    if(video_layer_3_playing) { video_layer_3.play(); }
    
    }
    catch(e) {
        document.getElementById('debug_4').innerHTML = e;
    }
}

// this function accepts video names or nulls as its arguments
// todo: change the name of this function to reflect the fact that it uses the video rendering mode
function playVideos(a, b, c, d) {
    
    console_.log("playVideos: a: " + a + " b: " + b + " c: " + c + " d: " + d);
    
    // stop any videos that are playing currently (if's needed in case video_layer_x is not assigned to a video)
    video_layer_1.pause();
    video_layer_2.pause();
    video_layer_3.pause();
    clr_video_layer_1(false);
    clr_video_layer_2(false);
    clr_video_layer_3(false);

    // set all videos to their first frame (needed because the last frame will flash when transitioning otherwize)
    video_layer_1.currentTime = 0;
    video_layer_2.currentTime = 0;
    video_layer_3.currentTime = 0;
    
    // these are used to keep track of what videos need to be played. needed for quick succession of .play()'s
    var playA = false;
    var playB = false;
    var playC = false;
    var playD = false;
    
    // get rid of the old event listeners so that we dont accumulate listeners, which would be bad for perf
    video_layer_1.removeEventListener('play' , set_video_layer_1);
    video_layer_1.removeEventListener('pause', clr_video_layer_1);
    video_layer_2.removeEventListener('play' , set_video_layer_2);
    video_layer_2.removeEventListener('pause', clr_video_layer_2);
    video_layer_3.removeEventListener('play' , set_video_layer_3);
    video_layer_3.removeEventListener('pause', clr_video_layer_3);
    
    
    // a
    if(a == null) {
        // nothing to do
    }
    else {
        // todo: handle the error if the string a is not a valid video name
        playA = true;
        video_layer_1 = document.getElementById(a);
        video_layer_1.addEventListener('play' , set_video_layer_1, true);
        video_layer_1.addEventListener('pause', clr_video_layer_1, true);
    }
    
    // b
    if(b == null) {
        // nothing to do
    }
    else {
        playB = true;
        video_layer_2 = document.getElementById(b);
        video_layer_2.addEventListener('play' , set_video_layer_2, true);
        video_layer_2.addEventListener('pause', clr_video_layer_2, true);
    }
    
    // c
    if(c == null) {
        // nothing to do
    }
    else {
        playC = true;
        video_layer_3 = document.getElementById(c);
        video_layer_3.addEventListener('play' , set_video_layer_3, true);
        video_layer_3.addEventListener('pause', clr_video_layer_3, true);
    }

    // d (get rid of this shit doggy)
    if(d == null) {
        // nothing to do
    }
    else {
        playD = true;
        video_layer_3 = document.getElementById(c);
    }
    
    
    if(playA) { video_layer_1.play(); }
    if(playB) { video_layer_2.play(); }
    if(playC) { video_layer_3.play(); }
    
    renderMode("video");
}