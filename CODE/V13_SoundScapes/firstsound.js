var scene,cameraThree,renderer,listener
init();

function init() {
  console.log('called init')

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
//Tone.setContext(listener.context);
cameraThree.add(listener);


dummySounds();
}

function dummySounds() {
  Tone.setContext()
  console.log('called dummy')
  var buffer = new THREE.AudioBuffer(listener.context);
  //buffer.load(ExperiencesData[i].voice);
  buffer.load('../assets/dummy1.wav');

  var newDummy = new THREE.PositionalAudio(listener);
  newDummy.setBuffer(buffer);
  newDummy.setRefDistance(20);
  newDummy.autoplay = true;
  newDummy.setLoop(true);


  //this gives us a spatial panner mode
  var panner = Tone.context.createPanner();

  panner.coneInnerAngle = 90;
  panner.coneOuterAngle = 100;
  panner.setOrientation(rx, ry, rz);
  panner.setPosition(x, y, z);//same world coordinates as three.js
  // panner.rolloff


  //this applied shape of our ear. Use this if you're NOT doing mobile
  panner.panningModel = "HRTF"
  player.connect(panner);



  // newDummy.setPosition(0,0,0);
  // newDummy.setOrientation(0,1,0);

  var geo = new THREE.BoxGeometry(10,10,10)
  var mat = new THREE.BasicMaterial({color: 0xffffff, opacity:.5})
  var mesh = new THREE.Mesh(geo, mat)
  console.log(mesh)
  mesh.add(newDummy)
  scene.add(mesh)

}
