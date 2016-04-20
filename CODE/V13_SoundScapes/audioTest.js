// Detect if the audio context is supported.
window.AudioContext = (
    window.AudioContext ||
    window.webkitAudioContext ||
    null
);

if (!AudioContext) {
    throw new Error("AudioContext not supported!");
}

// Create a new audio context.
var ctx = new AudioContext();

// Create a AudioGainNode to control the main volume.
var mainVolume = ctx.createGain();
// Connect the main volume node to the context destination.
mainVolume.connect(ctx.destination);

// Create an object with a sound source and a volume control.
var sound = {};
sound.source = ctx.createBufferSource();
sound.volume = ctx.createGain();
sound.panner = ctx.createPanner();


// Connect the sound source to the volume control.
sound.source.connect(sound.volume);
// Instead of hooking up the volume to the main volume, hook it up to the panner.
sound.volume.connect(sound.panner);
// And hook up the panner to the main volume.
sound.panner.connect(mainVolume);
// Hook up the sound volume control to the main volume.
// sound.volume.connect(mainVolume);

// Make the sound source loop.
sound.source.loop = true;



// Load a sound file using an ArrayBuffer XMLHttpRequest.
var request = new XMLHttpRequest();
request.open("GET", "https://evejweinberg.github.io/anxiety/01_03.wav",
    true);
request.responseType = "arraybuffer";
request.onload = function(e) {

    // Create a buffer from the response ArrayBuffer.
    ctx.decodeAudioData(this.response, function onSuccess(buffer) {
        sound.buffer = buffer;

        // Make the sound source use the buffer and start playing it.
        sound.source.buffer = sound.buffer;
        sound.source.start(ctx.currentTime);
    }, function onFailure() {
        alert("Decoding the audio buffer failed");
    });
};
request.send();


var camera, scene, renderer;
var newX = -200,
    newY = 0,
    newZ = 0;
var mesh, mousex, mousey;
init();
animate();

function init() {
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 400;
    scene = new THREE.Scene();
    var geometry = new THREE.BoxGeometry(200, 200, 200);
    var material = new THREE.MeshBasicMaterial();
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(mousex, newY, newZ);
    scene.add(mesh);
    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
}


$("body").mousemove(function(e) {
    mousex = event.pageX;
    mousey = event.pageY;

})


function animate() {
    // var s = window.event.clientX
    // Get the camera position.
    camera.position.set(0, 0, 0);
    console.log(mousex)
    camera.updateMatrixWorld();
    var p = new THREE.Vector3();
    p.setFromMatrixPosition(camera.matrixWorld);



    // newX += .4
    requestAnimationFrame(animate);
    // mesh.rotation.x += 0.005;
    // mesh.rotation.y += 0.01;
    renderer.render(scene, camera);


    if (mousex)
    // In the frame handler function, get the object's position.
    { mesh.position.set(mousex, newY, newZ); } else {
        mesh.position.set(0, newY, newZ);
    }
    mesh.updateMatrixWorld();
    var p = new THREE.Vector3();
    p.setFromMatrixPosition(mesh.matrixWorld);
    ctx.listener.setPosition(p.x, p.y, p.z);

    // And copy the position over to the sound of the object.
    sound.panner.setPosition(p.x, p.y, p.z);
}
