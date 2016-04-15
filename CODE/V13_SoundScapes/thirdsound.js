 var scene, cameraThree, renderer, listener, audioCtx

 var movieScreenPositions = [{
         x: -2803.17,
         y: 0,
         z: -63559
     }, {
         x: 2672.20,
         y: 0,
         z: -24474
     }, {
         x: -1528.02,
         y: 0,
         z: -1704.82
     }];

 init();

 function init() {
     console.log('called init')

     //audioCtx = new AudioContext();

     var container = document.getElementById('scene4');
     document.body.appendChild(container);
     renderer = new THREE.WebGLRenderer({
         antialias: true,
         alpha: true
     });
     renderer.setPixelRatio(window.devicePixelRatio);
     renderer.setSize(window.innerWidth, window.innerHeight);
     container.appendChild(renderer.domElement);
     renderer.setClearColor(0x000000, 1); //set background color and alpha

     scene = new THREE.Scene();

     // CAMERA
     // PerspectiveCamera( field of view, aspect, near, far )
     cameraThree = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
     scene.add(cameraThree); //add camera into the scene
     // RENDERER

     listener = new THREE.AudioListener();
     //retrieve the audio context from THREE
     audioCtx = listener.context;

     //Tone.setContext(listener.context);
     cameraThree.add(listener);

     dummySounds();
 }

 function dummySounds() {

     audioList = new Audio("../assets/dummy1.wav");

     audioList.play();

     addAudioToPosition("../assets/dummy1.wav", movieScreenPositions[0]);z

     var mesh = new THREE.Mesh(geo, mat);
     console.log(mesh);
     mesh.add(sound1);
     scene.add(mesh);

 }
