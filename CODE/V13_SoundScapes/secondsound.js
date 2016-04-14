var scene, cameraThree, renderer, listener, audioCtx
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
    //TODO: link tone.js context to this one
    audioCtx = listener.context;

    //Tone.setContext(listener.context);
    cameraThree.add(listener);

    dummySounds();
}


function dummySounds() {

  // Create sound
  var sound1 = new THREE.PositionalAudio( listener );
  //createBuffer is for loading the sounds
  var buffer = audioCtx.createBuffer(1, 100000,44100);
  //
  //var bufferLoader =  new BufferLoader( audioCtx, '../assets/dummy1.wav', console.log("its alive"));
  //buffer.load( '../assets/dummy1.wav' );
  console.log("its alive");
  //sound1.setBuffer(buffer);
  sound1.setRefDistance( 30 );
  sound1.autoplay = true;
  sound1.setLoop(true);
  sound1.setPosition(500, 0, 0);

  // // Start sound
  // setTimeout(function() {
  //     sound1.play();
  // }, 2000);

  // Try to detect end #1
  sound1.onended = function() {
      console.log('sound1 ended #1');
  };
  // Try to detect end #1
  sound1.addEventListener('ended', function() {
      console.log('sound1 ended #2');
  });

    var geo = new THREE.BoxGeometry(10, 10, 10)
    var mat = new THREE.BasicMaterial({
        color: 0xffffff,
        opacity: .5
    })
    var mesh = new THREE.Mesh(geo, mat)
    console.log(mesh)
    mesh.add(sound1)
    scene.add(mesh)

}

//http://www.html5rocks.com/en/tutorials/webaudio/intro/js/buffer-loader.js
function BufferLoader(context, urlList, callback) {
  this.context = context;
  this.urlList = urlList;
  this.onload = callback;
  this.bufferList = new Array();
  this.loadCount = 0;
}

BufferLoader.prototype.loadBuffer = function(url, index) {
  // Load buffer asynchronously
  var request = new XMLHttpRequest();
  request.open("GET", url, true);
  request.responseType = "arraybuffer";

  var loader = this;

  request.onload = function() {
    // Asynchronously decode the audio file data in request.response
    loader.context.decodeAudioData(
      request.response,
      function(buffer) {
        if (!buffer) {
          alert('error decoding file data: ' + url);
          return;
        }
        loader.bufferList[index] = buffer;
        if (++loader.loadCount == loader.urlList.length)
          loader.onload(loader.bufferList);
      },
      function(error) {
        console.error('decodeAudioData error', error);
      }
    );
  }

  request.onerror = function() {
    alert('BufferLoader: XHR error');
  }

  request.send();
}

BufferLoader.prototype.load = function() {
  for (var i = 0; i < this.urlList.length; ++i)
  this.loadBuffer(this.urlList[i], i);
}
