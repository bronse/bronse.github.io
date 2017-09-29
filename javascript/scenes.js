
// scenes.js

// click regions
// x, y, w, h -- the (x,y) coordinate is the ___ ___ corner of the region
// region_interactive_<scene>_<item>_<name>
// todo: use a function to create a "class" for these
// todo: make it so you can change things without breaking stuff. dont encode the name string into the variable name
// todo: IMPORTANT! when you play a video thats been played before, it sometimes flashes with the last frame of the movie. fix this by resetting the movie to the first frame or
//       by skipping the first frame every time you play a movie, or something like that

// todo: make a list of bugs on each browser. add to firefox that movies sometimes do not finish playing. add to chrome that the console doesnt work
var region_movement_button_forward            = { x:0,    y:0,    w:50,  h:800, id:"glob_0001", active:true};
var region_movement_button_backward           = { x:750,  y:0,    w:50,  h:800, id:"glob_0002", active:true};
var region_movement_button_interactive_escape = { x:100,  y:750,  w:600, h:50,  id:"glob_0003", active:true};

var region_interactive_001_001_knob           = { x:300,  y:200,  w:200, h:500, id:"001_0001",  active:true};
var region_interactive_001_002_options        = { x:300,  y:200,  w:200, h:50,  id:"001_0002",  active:true};

var region_interactive_002_001_lamp           = { x:100,  y:400,  w:100, h:100, id:"002_0001",  active:true};


// scenes
var scene_001 = {   name: "door",
                    
                    loadRegions: function() {
                        console_.log("regions are loading for scene_001 ...");
                        regionArray = [ 
                            region_movement_button_forward,
                            region_movement_button_backward,
                            region_interactive_001_001_knob
                                        ];
                        console_.log("regions for scene_001 have been loaded");
                    },

                    initiate: function() {
                        console_.log("scene_001 initiated");
                        playVideos("vid_8", null, null, null);
                    },

                    processClick: function(id) {
                        switch(id) {
                            case "glob_0001":
                                currentScene = scene_003;
                                currentScene.loadRegions();
                                playVideos("vid_11", null, null, null);
                                break;
                            case "glob_0002":
                                currentScene = scene_007;
                                currentScene.loadRegions();
                                playVideos("vid_21", null, null, null);
                                break;
                            case "001_0001":
                                // the player clicked the door
                                currentScene = scene_002;
                                currentScene.loadRegions();
                                playVideos("vid_9", null, null, null);
                                break;
                            default:
                                // an error has occurred
                        }
                    }
                }

var scene_002 = {   name: "door_knob",

                    loadRegions: function() {
                        regionArray = [ region_movement_button_interactive_escape
                                      ];
                    },
                    
                    processClick: function(id) {
                        switch(id) {
                            case "glob_0001":
                                // roll over
                                break;
                            case "glob_0002":
                                // red rover
                                break;
                            case "glob_0003":
                                currentScene = scene_001;
                                currentScene.loadRegions();
                                playVideos("vid_10", null, null, null);
                                break;
                            default:
                                // report some kind of error
                        }
                    }
                }

var scene_003 = {   name: "breaker",
                    
                    loadRegions: function() {
                        regionArray = [ region_movement_button_forward,
                                        region_movement_button_backward,
                                      ];
                    },

                    processClick: function(id) {
                        switch(id) {
                            case "glob_0001":
                                currentScene = scene_004;
                                currentScene.loadRegions();
                                playVideos("vid_12", null, null, null);
                                break;
                            case "glob_0002":
                                currentScene = scene_001;
                                currentScene.loadRegions();
                                playVideos("vid_26", null, null, null);
                                break;
                            case "002_0001":
                                // what is the hell is this
                                break;
                            default:
                                // report an error
                        }
                    }
                }

var scene_004 = {   name: "register",
                
                    loadRegions: function() {
                        regionArray = [ region_movement_button_forward,
                                        region_movement_button_backward,
                                        ];
                    },
                
                    processClick: function(id) {
                        switch(id) {
                            case "glob_0001":
                                currentScene = scene_005;
                                currentScene.loadRegions();
                                playVideos("vid_14", null, null, null);
                                break;
                            case "glob_0002":
                                currentScene = scene_003;
                                currentScene.loadRegions();
                                playVideos("vid_25", null, null, null);
                                break;
                            default:
                                // report an error
                        }
                    }
                }

var scene_005 = {   name: "machine",
            
                    loadRegions: function() {
                        regionArray = [ region_movement_button_forward,
                                        region_movement_button_backward,
                                      ];
                    },
        
                    processClick: function(id) {
                        switch(id) {
                            case "glob_0001":
                                currentScene = scene_006;
                                currentScene.loadRegions();
                                playVideos("vid_16", null, null, null);
                                break;
                            case "glob_0002":
                                currentScene = scene_004;
                                currentScene.loadRegions();
                                playVideos("vid_24", null, null, null);
                                break;
                            default:
                                // report an error
                        }
                    }
                }

var scene_006 = {   name: "window",
                
                    loadRegions: function() {
                        regionArray = [ region_movement_button_forward,
                                        region_movement_button_backward,
                                        ];
                    },
        
                    processClick: function(id) {
                        switch(id) {
                            case "glob_0001":
                                currentScene = scene_007;
                                currentScene.loadRegions();
                                playVideos("vid_18", null, null, null);
                                break;
                            case "glob_0002":
                                currentScene = scene_005;
                                currentScene.loadRegions();
                                playVideos("vid_23", null, null, null);
                                break;
                            default:
                                // report an error
                        }
                    }
                }

var scene_007 = {   name: "terminal",
                
                    loadRegions: function() {
                        regionArray = [ region_movement_button_forward,
                                        region_movement_button_backward,
                                        ];
                    },
        
                    processClick: function(id) {
                        switch(id) {
                            case "glob_0001":
                                currentScene = scene_001;
                                currentScene.loadRegions();
                                playVideos("vid_20", null, null, null);
                                break;
                            case "glob_0002":
                                currentScene = scene_006;
                                currentScene.loadRegions();
                                playVideos("vid_22", null, null, null);
                                break;
                            default:
                                // report an error
                        }
                    }
                }