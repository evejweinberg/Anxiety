////////////////////////////////////////////////////////////    
// SET_UP_VARIABLES
////////////////////////////////////////////////////////////
var experiences = [1, 2, 3, 4, 5, 6]
var videos = []
var allvideoTextures = []
var allMats = []
var scene, cameraThree, renderer;
var light;
var readyAllVideos = false
var worldRadius = 420;
var videoRadius = worldRadius*.8;
var spacing = 360 / experiences.length;
var container;
var controls;
var screenWidth = window.innerWidth;
var screenHeight = window.innerHeight;
 var centerRadius = 10

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
    // cameraThree.position.set(0,150,400);             //can also do position.set(x, y, z)
    scene.add(cameraThree); //add camera into the scene
    // RENDERER
    container = document.createElement('div');
    document.body.appendChild(container);
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);
    renderer.setClearColor(0x000000, 1); //set background color and alpha

    buildGeo();
    DrawCenterArea();
    Floor()








    // EVENTS
    // automatically resize renderer
    window.addEventListener('resize', onWindowResize, false);

    // CONTROLS
    // left click to rotate, middle click/scroll to zoom, right click to pan
    controls = new THREE.OrbitControls(cameraThree, renderer.domElement);


    animate();

}

function animate() {
    requestAnimationFrame(animate); //http://creativejs.com/resources/requestanimationframe/
    update();
    render();
}

function update() {
    controls.update();



}



function render() {
    if (videoo.readyState === videoo.HAVE_ENOUGH_DATA) {
        if (readyAllVideos == true) {
            for (var k = 0; k < experiences.length; k++) {
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
                    if (videoo.readyState === videoo.HAVE_ENOUGH_DATA) {
                        videoImageContext.drawImage(videoo, 0, 0);
                        if (videoTexture)
                            videoTexture.needsUpdate = true;
                    }
                }
            }

            renderer.render(scene, cameraThree);
        }
    }
}








function buildGeo() {

    for (var i = 0; i < experiences.length; i++) {
        video = document.createElement('video');
        // video.setAttribute("webkit-playsinline", "");
        video.setAttribute('crossorigin', 'anonymous');

        video.autoplay = true;
        video.loop = true;
        video.preload = "auto";
        video.src = "https://evejweinberg.github.io/videos/" + [i + 1] + ".mov";
        videos.push(video)


        videoImage = document.createElement('canvas');
        videoImage.width = 720;
        videoImage.height = 720;
        videoImageContext = videoImage.getContext('2d');
        videoImageContext.fillStyle = '#000000';
        videoImageContext.fillRect(0, 0, videoImage.width, videoImage.height);

        videoTexture = new THREE.Texture(videoImage);
        allvideoTextures.push(videoTexture)

        mat = new THREE.MeshBasicMaterial({ map: videoTexture, side: THREE.DoubleSide, transparent: true });
        mat.blending = THREE["AdditiveBlending"];

        allMats.push(mat);



    } //FOR LOOP OVER



    readyAllVideos = true

    // console.log(videos)


    //JUST LOAD ONE VIDEO ONTO ALL CUBES

    videoo = document.createElement('video');
    videoo.setAttribute("webkit-playsinline", "");
    videoo.setAttribute('crossorigin', 'anonymous');
    videoo.autoplay = true;
    videoo.loop = true;
    videoo.preload = "auto";
    videoo.src = "https://evejweinberg.github.io/videos/1.mov";




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
    mat.blending = THREE["AdditiveBlending"];


    for (var k = 0; k < experiences.length; k++) {
        var xCenter = Math.cos(toRadians(k * spacing)) 

        var zCenter = Math.sin(toRadians(k * spacing)) 

        for (var j = 0; j < 10; j++) {


            var randOffset = 0
            var size = 5 + 20 * Math.random();

            geo = new THREE.BoxGeometry(size, size, size);
            var mesh = new THREE.Mesh(geo, mat);
            mesh.position.set(videoRadius * xCenter+randOffset, 0+randOffset ,randOffset+ videoRadius * zCenter)
            // mesh.rotateZ(Math.random())
            // mesh.rotateX(Math.random(-1))
            scene.add(mesh);

        }
        // }
    }

}





function toDegrees(angle) {
    return angle * (180 / Math.PI);
}

function toRadians(angle) {
    return angle * (Math.PI / 180);
}


function DrawCenterArea() {
    var map = new THREE.TextureLoader().load('../textures/UV_Grid_Sm.jpg');
    map.wrapS = map.wrapT = THREE.RepeatWrapping;
    map.anisotropy = 10;
    var material = new THREE.MeshLambertMaterial({ map: map, side: THREE.DoubleSide });
    object = new THREE.Mesh(new THREE.CylinderGeometry(centerRadius,centerRadius, 10, experiences.length, 1), material);
    object.position.set(0, 0, 0);
    scene.add(object);

}


function Floor(){
    floorMat = new THREE.MeshStandardMaterial( {
                    roughness: 0.8,
                    color: 0xffffff,
                    metalness: 0.2,
                    bumpScale: 0.0005,
                });
                var textureLoader = new THREE.TextureLoader();
                textureLoader.load( "../examples/textures/hardwood2_diffuse.jpg", function( map ) {
                    map.wrapS = THREE.RepeatWrapping;
                    map.wrapT = THREE.RepeatWrapping;
                    map.anisotropy = 4;
                    map.repeat.set( 10, 24 );
                    floorMat.map = map;
                    floorMat.needsUpdate = true;
                } );
                textureLoader.load( "../examples/textures/hardwood2_bump.jpg", function( map ) {
                    map.wrapS = THREE.RepeatWrapping;
                    map.wrapT = THREE.RepeatWrapping;
                    map.anisotropy = 4;
                    map.repeat.set( 10, 24 );
                    floorMat.bumpMap = map;
                    floorMat.needsUpdate = true;
                } );
                textureLoader.load( "../examples/textures/hardwood2_roughness.jpg", function( map ) {
                    map.wrapS = THREE.RepeatWrapping;
                    map.wrapT = THREE.RepeatWrapping;
                    map.anisotropy = 4;
                    map.repeat.set( 10, 24 );
                    floorMat.roughnessMap = map;
                    floorMat.needsUpdate = true;
                } );

                var floorGeometry = new THREE.PlaneBufferGeometry( worldRadius*2,worldRadius*2 );
                var floorMesh = new THREE.Mesh( floorGeometry, floorMat );
                floorMesh.receiveShadow = true;
                floorMesh.rotation.x = -Math.PI / 2.0;
                scene.add( floorMesh );
}

function onWindowResize() {
    cameraThree.aspect = window.innerWidth / window.innerHeight;
    cameraThree.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function isTouchDevice() {
    return 'ontouchstart' in window || !!(navigator.msMaxTouchPoints);
}
