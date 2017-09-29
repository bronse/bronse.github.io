
// global.js
// global resources

var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

// what does this even do?
canvas.addEventListener('selectstart', function(e) { e.preventDefault(); return false; }, false);