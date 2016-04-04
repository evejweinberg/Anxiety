/*
 * Made by @jhclaura (Laura Chen, jhclaura.com)
 * for Three.js Pop-Up Workshops
 * X'mas season 2015
 *
 * @Topic: Video
 * @Reference hugely from: http://jeromeetienne.github.io/threex.videotexture/examples/videotexture.html
 */

////////////////////////////////////////////////////////////	
// SET_UP_VARIABLES
////////////////////////////////////////////////////////////
	// if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

// standard global variables
var scene, cameraThree, renderer;
var light;

var container;
var controls;
var screenWidth = window.innerWidth;
var screenHeight = window.innerHeight;

// custom global variables
var imgScreen, screens;

var videoo, videoImage, videoImageContext, videoTexture;
var videoIsLoaded = false;

var thisIsTouchDevice = false;
if (isTouchDevice()) thisIsTouchDevice = true;


//
var lastTime = Date.now();
var time;


///////////////////////////////////////////////////////////

// kind of like setup()
init();



///////////////////////////////////////////////////////////
// FUNCTIONS 
///////////////////////////////////////////////////////////

function init() {

    // SCENE
    // construct environment first
    scene = new THREE.Scene();

    // LIGHT
    // create light for the scene
    light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(1, 1, 1);
    scene.add(light);
    light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(-1, 1, 4000);
    scene.add(light);

    // CAMERA
    // PerspectiveCamera( field of view, aspect, near, far )
    cameraThree = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
    cameraThree.position.z = 100; //set the position of the camera
    // cameraThree.position.set(0,150,400);				//can also do position.set(x, y, z)
    scene.add(cameraThree); //add camera into the scene
    // RENDERER
    container = document.createElement('div');
    document.body.appendChild(container);
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);
    buildGeo()



    renderer.setClearColor(0x000000, 1); //set background color and alpha
    




    // EVENTS
    // automatically resize renderer
    window.addEventListener('resize', onWindowResize, false);

    // CONTROLS
    // left click to rotate, middle click/scroll to zoom, right click to pan
    controls = new THREE.OrbitControls(cameraThree, renderer.domElement);

    // var onTouchStart = function ( event ) {
    // 	if(!videoIsLoaded){
    // 		videoo.load();
    // 		videoIsLoaded = true;
    // 	}
    // 	videoo.play();
    // 	// console.log("play video!");
    // }

    // if(thisIsTouchDevice)
    // 	document.body.addEventListener( 'touchstart', onTouchStart, false );

    // kind of like draw()/loop()
    animate();

}

function animate() {
    requestAnimationFrame(animate); //http://creativejs.com/resources/requestanimationframe/
    update();
    render();
}

function update() {
    controls.update();

    // imgScreen.rotation.y += 0.1;

}

// var framesPerSecond = 6;

function render() {
    if (videoo.readyState === videoo.HAVE_ENOUGH_DATA) {
        if (whichMobile == "iOS_mobile") {

            time = Date.now();
            var elapsed = (time - lastTime) / 1000;

            // render
            if (elapsed >= ((1000 / framesPerSecond) / 1000)) {
                videoo.currentTime = videoo.currentTime + elapsed;
                videoImageContext.drawImage(videoo, 0, 0, videoo.videoWidth, videoo.videoHeight);
                if (videoTexture)
                    videoTexture.needsUpdate = true;
                lastTime = time;
            }

            // if we are at the end of the video stop
            var currentTime = (Math.round(parseFloat(videoo.currentTime) * 10000) / 10000);
            var duration = (Math.round(parseFloat(videoo.duration) * 10000) / 10000);
            if (currentTime >= duration) {
                console.log('currentTime: ' + currentTime + ' duration: ' + videoo.duration);
                // restart
                videoo.currentTime = 0;
                return;
            }

        } else {
            // if( videoo.readyState === videoo.HAVE_ENOUGH_DATA ) {
            videoImageContext.drawImage(videoo, 0, 0);
            if (videoTexture)
                videoTexture.needsUpdate = true;
            // }
        }
    }

    renderer.render(scene, cameraThree);
}








function buildGeo()
// VIDEO_TEXTURE
{
    videoo = document.createElement('video');
    videoo.setAttribute("webkit-playsinline", "");
    videoo.autoplay = true;
    videoo.loop = true;
    videoo.preload = "auto";
    // videoo.src = "http://evejweinberg.github.io/videos/1.mp4";

    videoo.src = "../assets/2.mov";



    videoImage = document.createElement('canvas');
    videoImage.width = 720;
    videoImage.height = 720;


    //
    videoImageContext = videoImage.getContext('2d');
    videoImageContext.fillStyle = '#000000';
    videoImageContext.fillRect(0, 0, videoImage.width, videoImage.height);

    // videoTexture = new THREE.Texture( videoo );
    videoTexture = new THREE.Texture(videoImage);
    videoTexture.minFilter = THREE.LinearFilter;
    videoTexture.magFilter = THREE.LinearFilter;
    videoTexture.format = THREE.RGBFormat;
    videoTexture.generateMipmaps = false;

    videoTexture.wrapS = videoTexture.wrapT = THREE.ClampToEdgeWrapping;
    videoTexture.needsUpdate = true;
    mat = new THREE.MeshBasicMaterial({ map: videoTexture, side: THREE.DoubleSide, transparent: true });
    // mat.trasparent = true;
    mat.blending = THREE[ "AdditiveBlending" ];

    for (var i = 0; i < 40; i += 15) {
        for (var j = 0; j < 40; j += 15) {
            var size = 5 + 20 * Math.random();
            console.log(size)
            geo = new THREE.BoxGeometry(size, size, size);
            var mesh = new THREE.Mesh(geo, mat);
            mesh.position.set(i, j, size)
            mesh.rotateZ(Math.random())
            mesh.rotateX(Math.random(-1))
            scene.add(mesh);
        }
    }
}










function onWindowResize() {
    cameraThree.aspect = window.innerWidth / window.innerHeight;
    cameraThree.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function isTouchDevice() {
    return 'ontouchstart' in window || !!(navigator.msMaxTouchPoints);
}
