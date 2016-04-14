var analyser = new Tone.Analyser(256, "waveform");

//powers of two
analyser.returnType = "float";
//prob dont need to use this
analyser.minDecibels = -30;
//float is between mid and max decibles...the smallest loudness and max is high end of volume, like doing a map for you
//change float to "byte"
// use not alot of byte
// analyzers, 50 if you only have any analyzers
// think about scale
//you get the analysis as an array


// function setup() {
    // createCanvas(300, 300);
    //open up the microphone
    var mic = new Tone.Microphone().open().start().connect(analyser);
// }

// function draw() {
//     background(255);
//     //draw the current level using the meter
//     var analysis = analyser.analyse();
//     fill(0);
//     //rect(0, height - level * height, width, height);
//     strokeWeight(3);

//     var segWidth = width / analysis.length;
//     var lastY = height / 2;
//     for (var i = 1; i < analysis.length; i++) {
//         var startX = (i - 1) * segWidth;
//         var endX = i * segWidth;
//         var y = map(analysis[i], -1, 1, height, 0);
//         line(startX, lastY, endX, y);
//         stroke(0);
//         lastY = y;
//     }



    //make a line
    //
var WaveFormSt = new THREE.Vector3( 10, 0, 0 )
var WaveFormEnd = new THREE.Vector3( 0, 10, 0  )
var oneWaveForm = Line3(WaveFormSt, WaveFormEnd)
scene.add(oneWaveForm)

//OR
//

var a = new THREE.Vector3( 1, 0, 0 );
var b = new THREE.Vector3( 0, 1, 0 );
var c = new THREE.Vector3();
c.crossVectors( a, b );


    //give them a color state
    //make 6 lines in an array
    //var analysis = analyser.analyse();
    //
    // var segWidth = width / analysis.length;
    //   var lastY = height/2;
    //   for (var i = 1; i < analysis.length; i++){
    //   	var startX = (i - 1) * segWidth;
    //     var endX = i * segWidth;
    // 		var y = map(analysis[i], -1, 1, height, 0);
    //   	line(startX, lastY, endX, y);
    //   stroke(0);
    //     lastY = y;
    //   }

// }
