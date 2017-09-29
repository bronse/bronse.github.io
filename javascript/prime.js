
// prime.js

function gamePrime() {
    // these must be defined to avoid strange errors
    video_layer_1 = document.getElementById("vid_1");
    video_layer_2 = document.getElementById("vid_2");
    video_layer_3 = document.getElementById("vid_3");
    video_layer_1.addEventListener('play' , set_video_layer_1,true);
    video_layer_1.addEventListener('pause', clr_video_layer_1,true);
    video_layer_2.addEventListener('play' , set_video_layer_2,true);
    video_layer_2.addEventListener('pause', clr_video_layer_2,true);
    video_layer_3.addEventListener('play' , set_video_layer_3,true);
    video_layer_3.addEventListener('pause', clr_video_layer_3,true);

    renderMode("menu");
}
