////////////////////////////////////////////////////////////
// SET_UP_VARIABLES
////////////////////////////////////////////////////////////
var scene1, scene2;
var headspin;
var scene3count;
var scene4ready;
var headZstart;
var loadingOvervid;
var videoSources;
var ExperiencesData;
// var experiences = [];
var distances = [];

//setup global variables
setupVariables();

//preload the media
preloadMedia();

//render introduction
renderIntro();

function setupVariables() {
    scene1 = true,
        scene2 = false,
        headspin = false;
    scene3count = 0;
    scene4ready = false;
    headZstart = -50;
    loadingOvervid = document.getElementById("tunnel-vid");
    videoSources = [];
    experiences = [1, 2, 3, 4, 5, 6];
}

function renderIntro() {
    if (scene1) {
        Scene1();
        $("#blocker").hide();
        loadingOvervid.pause();
        // console.log('scene1')
        $('#next-button').click(function() {
            scene2 = true
            headspin = true;
            // switchscenes(2)
            $("#intro").hide();
        });
    }
}

function preloadMedia() {
    lipVideoURL = "../assets/lipTxt.mp4";


    for (var i = 0; i < experiences.length; i++) {
        var video = ExperiencesData[i].video;
        // var newVideo = "https://evejweinberg.github.io/videos/" + [i + 1] + ".mp4";
        videoSources.push(video);
    }
}

function switchScenes(newscene) {
    //change this to a switch case with 'breaks'
    if (newscene == 2) {
        scene1 = false;
    } else if (newscene == 3) {
        scene1 = false;
        $('#loadingvideo').show();
        $("scene1").hide();
        $('#tunnel').show();
    } else if (newscene == 4) {
        if (scene4ready) {
            scene1 = false;
            $('#loadingvideo').hide();
            $("#blocker").show();
            Scene4();
            scene4ready = false
        }
    }
}


//////////////////////////////////////////////////////////////////////////////////////////
// //    _   __   __    _____ _ __ ___   ___  ___   __  ___   ___   ___  __   __ _  __  ___
//   .' \ / /  / /   /_  _//// // o | / _/ / _/  / /,' _/  / o.) / _/,'_/  / // |/ /,' _/
//  / o // /_ / /_    / / / ` //  ,' / _/ / _/n_/ /_\ `.  / o \ / _// /_n / // || /_\ `.
// /_n_//___//___/   /_/ /_n_//_/`_\/___//___/\_,'/___,' /___,'/___/|__,'/_//_/|_//___,'
//////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////
var onOffCubes = []
var videos = [];
var voices = [];
var newSounds = []
var centerPieces = []
var onoffbutton;
var filters = [];
var audioContext;
var ambientSounds = [];
var soundisOn = [];
var allvideoTextures = [];
var videoImageContexts = [];
var allMats = [];
var mouseX = 0;
var mouseY = 0;
var bufferLoadingCounter = 0;
var spacing = 360 / 6;
var HowManyPlaying = 6;
var colorPlayingFar = 0xd84343
var colorPlayingClose = 0xe82727
var colorNotPlayingFar = 0x777474
var colorNotPlayingClose = 0x545353 //drk grey
var audIcon;
var readyAllVideos = false;
var worldRadius = 420;
var videoRadius = worldRadius * .8;
var spacing = 360 / experiences.length;
var voicefadedist = 10
    ////////////LIP VIDEOS
var lipVideoURL
var AlllipVideos = []
var lipVideoTexture
var allLipvideoTextures = []
var lipsMaterial
var allLipMaterials = []
var allLipVideosReady = false
var lipDisk
var lipDiskMesh
var allLipDiskMeshes = []
var videoLipImageContext
var videoLipImageContexts = []
    //////////////////////////
var circleRad = 2
var AudioIcontxt;
var interactableDist = 30;
//////////////////////



function Scene4() {

    var scene, cameraThree, renderer;
    var light;
    var container;
    var controls, guicontrols;
    var screenWidth = window.innerWidth;
    var screenHeight = window.innerHeight;
    var centerRadius = 10;
    var worldSphere
    var windowHalfX = window.innerWidth / 2;
    var windowHalfY = window.innerHeight / 2;

    // custom global variables
    var imgScreen, screens;

    var videoo, videoImage, videoImageContext, videoTexture, listener;
    var thisIsTouchDevice = false;
    if (isTouchDevice()) thisIsTouchDevice = true;
    var lastTime = Date.now();
    var time, clock;
    var worldCenter = new THREE.Vector3(0, 0, 0);

    /////variables/////for////controllers///////////////////////////////////////////
    var controlsEnabled = false;
    var moveForward = false;
    var moveBackward = false;
    var moveLeft = false;
    var moveRight = false;
    var canJump = false;
    var prevTime = performance.now();
    var velocity = new THREE.Vector3();
    var raycaster;
    var blocker = document.getElementById('blocker');
    var instructions = document.getElementById('instructions');
    var havePointerLock = 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document;
    //////////////////////////////////////////////////////////

    if (havePointerLock) {

        var element = document.body;

        var pointerlockchange = function(event) {

            if (document.pointerLockElement === element || document.mozPointerLockElement === element || document.webkitPointerLockElement === element) {

                controlsEnabled = true;
                controls.enabled = true;
                blocker.style.display = 'none';

            } else {
                controls.enabled = false;
                blocker.style.display = '-webkit-box';
                blocker.style.display = '-moz-box';
                blocker.style.display = 'box';

                instructions.style.display = '';

            }

        };

        var pointerlockerror = function(event) {

            instructions.style.display = '';

        };

        // Hook pointer lock state change events
        document.addEventListener('pointerlockchange', pointerlockchange, false);
        document.addEventListener('mozpointerlockchange', pointerlockchange, false);
        document.addEventListener('webkitpointerlockchange', pointerlockchange, false);

        document.addEventListener('pointerlockerror', pointerlockerror, false);
        document.addEventListener('mozpointerlockerror', pointerlockerror, false);
        document.addEventListener('webkitpointerlockerror', pointerlockerror, false);

        instructions.addEventListener('click', function(event) {

            instructions.style.display = 'none';

            // Ask the browser to lock the pointer
            element.requestPointerLock = element.requestPointerLock || element.mozRequestPointerLock || element.webkitRequestPointerLock;

            if (/Firefox/i.test(navigator.userAgent)) {

                var fullscreenchange = function(event) {

                    if (document.fullscreenElement === element || document.mozFullscreenElement === element || document.mozFullScreenElement === element) {

                        document.removeEventListener('fullscreenchange', fullscreenchange);
                        document.removeEventListener('mozfullscreenchange', fullscreenchange);

                        element.requestPointerLock();
                    }

                };

                document.addEventListener('fullscreenchange', fullscreenchange, false);
                document.addEventListener('mozfullscreenchange', fullscreenchange, false);
                //origin, direction, near, far


                element.requestFullscreen = element.requestFullscreen || element.mozRequestFullscreen || element.mozRequestFullScreen || element.webkitRequestFullscreen;

                element.requestFullscreen();

            } else {

                element.requestPointerLock();

            }

        }, false);

    } else {
        instructions.innerHTML = 'Your browser doesn\'t seem to support Pointer Lock API';
    }

    ////////////////////////////////////////////////////////////
    ////////POINTER LOCK STUFF OVER/////////////////////////////
    ////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////
    //set it up and kick off animation
    init();
    animate();

    ///////////////////////////////////////////////////////////
    ////// FUNCTIONS BEGIN ////////////////////////////////////
    ///////////////////////////////////////////////////////////






    function init() {
        clock = new THREE.Clock();
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
        hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6);
        hemiLight.color.setHSL(0.1, 1, 0.6);
        hemiLight.groundColor.setHSL(0.005, 1, 0.75);
        hemiLight.position.set(0, 500, 0);
        scene.add(hemiLight);

        // CAMERA
        // PerspectiveCamera( field of view, aspect, near, far )
        cameraThree = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
        scene.add(cameraThree); //add camera into the scene
        // RENDERER
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


        //////////CONNECT TONE TO THREE.JS LISTENERS
        ///   __
        // /,-
        // ||)
        // \\_, )
        //  `--'
        listener = new THREE.AudioListener();
        //Tone.setContext(listener.context);
        cameraThree.add(listener);
        ////////////////////////////////


        raycaster = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, -1, 0), 0, 10);
        // raycaster.set(origin,direction)
        AudioIcontxt = new THREE.MeshBasicMaterial({
            color: colorPlayingFar,
            opacity: 1,
            side: THREE.DoubleSide
        })

        ////LOAD ASSETS/////////
        ///////////////////////////////////
        var manager = new THREE.LoadingManager();
        manager.onProgress = function(item, loaded, total) {
            // console.log( item, loaded, total );

        };

        var onProgress = function(xhr) {
            if (xhr.lengthComputable) {
                var percentComplete = xhr.loaded / xhr.total * 100;
                console.log(Math.round(percentComplete, 2) + '% downloaded');
                console.log(percentComplete)
            }

        };

        var onError = function(xhr) {};

        var loader = new THREE.OBJLoader(manager);
        loader.load('../models/AudioIcon2.obj', function(object) {
            object.traverse(function(child) {
                if (child instanceof THREE.Mesh) {
                    child.material = AudioIcontxt
                }
            });
            object.scale.set(0.005, 0.005, 0.005);
            audIcon = object;

            buildGeo();
            BuildCubes();

        }, onProgress, onError);



        DrawCenterArea();
        Floor();
        OuterSphere();
            // AddGui()
        dummySounds();



        window.addEventListener('resize', onWindowResize, false);



        controls = new THREE.PointerLockControls(cameraThree);
        scene.add(controls.getObject());

        var onKeyDown = function(event) {

            switch (event.keyCode) {

                case 38: // up
                case 87: // w
                    moveForward = true;
                    break;

                case 37: // left
                case 65: // a
                    moveLeft = true;
                    break;

                case 40: // down
                case 83: // s
                    moveBackward = true;
                    break;

                case 39: // right
                case 68: // d
                    moveRight = true;
                    break;

                case 32: // space
                    if (canJump === true) velocity.y += 350;
                    canJump = false;
                    break;

            }

        };

        var onKeyUp = function(event) {

            switch (event.keyCode) {

                case 38: // up
                case 87: // w
                    moveForward = false;
                    // console.log('up')
                    break;

                case 37: // left
                case 65: // a
                    // console.log('left')
                    moveLeft = false;
                    break;

                case 40: // down
                case 83: // s
                    moveBackward = false;
                    break;

                case 39: // right
                case 68: // d
                    moveRight = false;
                    // console.log('right')
                    break;

            }

        };

        document.addEventListener('keydown', onKeyDown, false);
        document.addEventListener('keyup', onKeyUp, false);
        document.addEventListener('click', onClick, false);




    } //INIT ENDS
    ////////////////////////////////
    ///////////////////////////////////


    function onClick() {
        console.log('clicked')
        for (i in experiences) {
            if (ExperiencesData[i].userClose == true && ExperiencesData[i].songPlaying == false) {
                voices[i].play()
                ExperiencesData[i].songPlaying = true
                onOffCubes[i].children[0].material.color.set(colorPlayingClose)
            } else if (ExperiencesData[i].userClose == true && ExperiencesData[i].songPlaying == true) {

                ExperiencesData[i].songPlaying = false
                onOffCubes[i].children[0].material.color.set(colorNotPlayingClose)
                voices[i].pause()
            }


        }
    }


    //--------------------------------------------------------------------------------------------------//
    //--------------------------------------------------------------------------------------------------//
    // ((_)_  _ ((_)(_)) (_)) (_))_   _(())\_)() ((_) (_)) (_)) (_))_
    //  | _ )| | | ||_ _|| |   |   \  \ \((_)/ // _ \ | _ \| |   |   \
    //  | _ \| |_| | | | | |__ | |) |  \ \/\/ /| (_) ||   /| |__ | |) |
    //  |___/ \___/ |___||____||___/    \_/\_/  \___/ |_|_\|____||___/
    //--------------------------------------------------------------------------------------------------//
    //--------------------------------------------------------------------------------------------------//

    function buildGeo() {
        var onoffcube = new THREE.BoxGeometry(100, 50, 50);

        //make all video textures
        for (var i = 0; i < experiences.length; i++) {
            videoEl = document.createElement('video');
            videoEl.setAttribute('crossorigin', 'anonymous');

            videoEl.autoplay = true;
            videoEl.loop = true;
            videoEl.preload = "auto";
            //PULL FROM PRELOAD
            videoEl.src = "../assets/lipTxt.mp4";
            AlllipVideos.push(videoEl);

            videoCanvas = document.createElement('canvas');
            videoCanvas.width = 128;
            videoCanvas.height = 128;
            videoLipImageContext = videoCanvas.getContext('2d');
            videoLipImageContext.fillStyle = '#000000';
            videoLipImageContext.fillRect(0, 0, videoCanvas.width, videoCanvas.height);
            videoLipImageContexts.push(videoLipImageContext)

            lipVideoTexture = new THREE.Texture(videoCanvas);
            allLipvideoTextures.push(lipVideoTexture);


            lipsMaterial = new THREE.MeshBasicMaterial({
                color: 0x808080,
                map: lipVideoTexture,
                wireframe: false,
                side: THREE.DoubleSide,
                opacity: 1
            });
            // mat.blending = THREE["AdditiveBlending"];

            allLipMaterials.push(lipsMaterial);
            allLipVideosReady = true

            video = document.createElement('video');
            video.setAttribute('crossorigin', 'anonymous');

            video.autoplay = true;
            video.loop = true;
            video.preload = "auto";
            //PULL FROM PRELOAD
            video.src = videoSources[i];
            videos.push(video);

            videoImage = document.createElement('canvas');
            videoImage.width = 512;
            videoImage.height = 512;
            videoImageContext = videoImage.getContext('2d');
            videoImageContext.fillStyle = '#000000';
            videoImageContext.fillRect(0, 0, videoImage.width, videoImage.height);
            videoImageContexts.push(videoImageContext)

            videoTexture = new THREE.Texture(videoImage);
            allvideoTextures.push(videoTexture);

            var buffer = new THREE.AudioBuffer(listener.context);
            buffer.load(ExperiencesData[i].voice);
            buffer.onReady(function() {
                bufferLoadingCounter++;
                if (bufferLoadingCounter === experiences.length) {
                    console.log('done loading voices')
                        //close loading screen
                }
                // console.log("here");
            });

            var newVoice = new THREE.PositionalAudio(listener);
            newVoice.setBuffer(buffer);
            newVoice.setRefDistance(voicefadedist);
            newVoice.autoplay = false;
            newVoice.setLoop(true);
            voices.push(newVoice);

            var newFilter = listener.context.createBiquadFilter();
            newFilter.type = 'lowpass';
            newFilter.Q.value = 10;
            newFilter.frequency.value = 440;
            filters.push(newFilter);

            // for (i in experiences) {
                onoffbutton = audIcon.clone();
                scene.add(onoffbutton)
                onOffCubes.push(onoffbutton);
            // }
            //instead of this, use the json file
            onoffbutton.userData.sound = voices;

            mat = new THREE.MeshBasicMaterial({
                color: 0x808080,
                map: videoTexture,
                side: THREE.DoubleSide,
                opacity: 1
            });
            // mat.blending = THREE["AdditiveBlending"];

            allMats.push(mat);


        } //FOR LOOP OVER

    } //BUILD GEO OVER


    function dummySounds() {
      console.log('called dummy')
      var buffer = new THREE.AudioBuffer(listener.context);
      //buffer.load(ExperiencesData[i].voice);
      buffer.load('../assets/dummy1.wav');

      var newDummy = new THREE.PositionalAudio(listener);
      newDummy.setBuffer(buffer);
      newDummy.setRefDistance(voicefadedist);
      newDummy.autoplay = true;
      newDummy.setLoop(true);
      newDummy.setPosition(0,0,0);
      newDummy.setOrientation(0,1,0);

      var geo = new THREE.BoxGeometry(10,10,10)
      var mat = new THREE.BasicMaterial({color: 0xffffff, opacity:.5})
      var mesh = new THREE.Mesh(geo, mat)
      console.log(mesh)
      mesh.add(newDummy)
      scene.add(mesh)

    }

    function BuildCubes() {

        //place all cubes

        for (var k = 0; k < experiences.length; k++) {

            var xCenter = Math.cos(toRadians(k * spacing))

            var zCenter = Math.sin(toRadians(k * spacing))


            //the volume buttons and attach voices to them
            onOffCubes[k].position.set(videoRadius * xCenter, 5, videoRadius * zCenter)
            onOffCubes[k].lookAt(new THREE.Vector3(0, 0, 0))
            onOffCubes[k].add(voices[k])


            var group = new THREE.Object3D();

            // the 10 videos per experience cubes
            for (var j = 0; j < 22; j++) {

                var randOffset = Math.floor((Math.random() * 120) + -35);
                var size = 5 + (Math.random() * 50) - 10;

                geo = new THREE.BoxGeometry(size, size, size);
                var mesh = new THREE.Mesh(geo, allMats[k]);
                mesh.position.set((randOffset), randOffset, randOffset);
                mesh.rotateZ(randOffset)
                mesh.rotateX(randOffset)

                //ATTACH THE AUDIO TO ONE OF THE CUBES IN EACH ARRAY
                // if (j == 0) {

                //     // mesh.add(voices[k])
                // }
                group.add(mesh);
                // scene.add(mesh);

            }
            group.position.set(videoRadius * xCenter, 90, videoRadius * zCenter);
            group.lookAt(new THREE.Vector3())
            scene.add(group)

        }
        readyAllVideos = true


    } //BUILD CUBES ENDS


    function DrawCenterArea() {

        //make one center cylinder that's really transparent
        //try and make it blurry if you can
        var centerpiecemat = new THREE.MeshPhongMaterial({ side: THREE.DoubleSide, color: 0xFF0000, specular: 0xFF0000, emissive: 0xFF0000, shininess: 10, shading: THREE.SmoothShading, opacity: 0.1, transparent: true })
        centerpiece = new THREE.Mesh(new THREE.CylinderGeometry(centerRadius * 1.5, centerRadius * 1.5, worldRadius, 22, 1), centerpiecemat);
        centerpiece.position.set(0, 0, 0);
        scene.add(centerpiece);
        //


        for (var i = 0; i < experiences.length; i++) {




            var spacing = 360 / 6

            var x = centerRadius * Math.cos(toRadians(i * spacing))
            var z = centerRadius * Math.sin(toRadians(i * spacing))
            var cubeMaterial3 = new THREE.MeshLambertMaterial({ color: 0xFF0000, reflectivity: 0.3 });

            var map = new THREE.TextureLoader().load('../assets/lipTxt.png');
            map.wrapS = map.wrapT = THREE.RepeatWrapping;
            map.anisotropy = 10;
            var material = new THREE.MeshLambertMaterial({
                map: map,
                side: THREE.DoubleSide
            });
            //top rad, bottom rad, height, radseg, heightseg
            //CylinderGeometry(radiusTop, radiusBottom, height, radiusSegments, heightSegments, openEnded, thetaStart, thetaLength)
            object = new THREE.Mesh(new THREE.CylinderGeometry(circleRad, circleRad, 10, 22, 1), material);
            object.position.set(x, 0, z);

            lipDisk = new THREE.CircleGeometry(circleRad, 12);

            lipDiskMesh = new THREE.Mesh(lipDisk, allLipMaterials[i]);
            lipDiskMesh.position.set(x, 10, z)
            lipDiskMesh.lookAt(new THREE.Vector3())
            allLipDiskMeshes.push(lipDiskMesh)
            scene.add(lipDiskMesh)

            scene.add(object);
            centerPieces.push(object)
        }

    }


    function Floor() {
        floorMat = new THREE.MeshStandardMaterial({
            roughness: 0.8,
            color: 0xffffff,
            metalness: 0.2,
            bumpScale: 0.0005,
        });
        var textureLoader = new THREE.TextureLoader();
        textureLoader.load("../textures/wallpaper1.png", function(map) {
            map.wrapS = THREE.RepeatWrapping;
            map.wrapT = THREE.RepeatWrapping;
            map.anisotropy = 4;
            map.repeat.set(10, 10);
            floorMat.map = map;
            floorMat.needsUpdate = true;
        });


        var floorGeometry = new THREE.PlaneBufferGeometry(worldRadius * 2, worldRadius * 2);
        var floorMesh = new THREE.Mesh(floorGeometry, floorMat);
        floorMesh.receiveShadow = true;
        floorMesh.rotation.x = -Math.PI / 2.0;
        scene.add(floorMesh);
    }


    function OuterSphere() {
        walls = new THREE.MeshBasicMaterial({
            roughness: 0.8,
            color: 0xaf8585,
            metalness: 0.2,
            side: THREE.DoubleSide,
            // bumpScale: 0.0005,
        });
        var textureLoader = new THREE.TextureLoader();
        textureLoader.load("../textures/wallpaper1.png", function(map) {
            map.wrapS = THREE.RepeatWrapping;
            map.wrapT = THREE.RepeatWrapping;
            map.anisotropy = 4;
            map.repeat.set(10, 10);
            walls.map = map;
            walls.needsUpdate = true;
        });

        worldgeo = new THREE.SphereGeometry(worldRadius, 20, 20)
        worldSphere = new THREE.Mesh(worldgeo, walls)

        scene.add(worldSphere);

    }











    ////////////////////////////////////////////////////////////////////////////////////
    //     _      _   _                  __  __      _       _____  U _____ u
    // U  /"\  u | \ |"|       ___     U|' \/ '|uU  /"\  u  |_ " _| \| ___"|/
    //  \/ _ \/ <|  \| |>     |_"_|    \| |\/| |/ \/ _ \/     | |    |  _|"
    //  / ___ \ U| |\  |u      | |      | |  | |  / ___ \    /| |\   | |___
    // /_/   \_\ |_| \_|     U/| |\u    |_|  |_| /_/   \_\  u |_|U   |_____|
    //  \\    >> ||   \\,-.-,_|___|_,-.<<,-,,-.   \\    >>  _// \\_  <<   >>
    // (__)  (__)(_")  (_/ \_)-' '-(_/  (./  \.) (__)  (__)(__) (__)(__) (__)
    ////////////////////////////////////////////////////////////////////////////////////

    function animate() {


        if (readyAllVideos == true) {


            raycaster.set(controls.getObject().position, controls.getDirection(), 0, 40)

            for (i in experiences) {
                if (controls.getObject().position.distanceTo(onOffCubes[i].position) < interactableDist) {
                    ExperiencesData[i].userClose = true

                    if (ExperiencesData[i].songPlaying == true) {
                        // console.log('song is playing and I am inside')
                        //change color to bright red

                        onOffCubes[i].children[0].material.color.set(colorPlayingClose)
                            // AudioIcontxt[i].color.set(colorPlayingClose)
                            //add text to say "click anywhere to silence voice"
                    } else if (ExperiencesData[i].songPlaying == false) {
                        // console.log('song is OFF and I am inside')
                        onOffCubes[i].children[0].material.color.set(colorNotPlayingClose)

                    }

                } else {
                    //IF CONTROLS ARE NOT CLOSE TO THE SOUND, make it false
                    ExperiencesData[i].userClose = false
                    if (ExperiencesData[i].songPlaying == true) {
                        // console.log('I am Far from'+ i + 'and song is playing')
                        //if song is playing, set color
                        onOffCubes[i].children[0].material.color.set(colorPlayingFar)
                    } else if (ExperiencesData[i].songPlaying == false) {
                        // console.log('I am Far from'+ i + 'and song is not playing')
                        //if song is not playing set color
                        onOffCubes[i].children[0].material.color.set(colorNotPlayingFar)
                    }
                }
                //change color to red
            }

            // ExperiencesData[i].voices.play()

            // var intersects = raycaster.intersectObjects(scene.children, true)
            // console.log (cameraThree.position)
            // console.log(controls.getObject().position.distanceTo(onOffCubes[0].position))
            // console.log (cameraThree.position.distanceTo(onOffCubes[0]))
            // console.log('onOffcubes is greater than 0')
            // for (i in experiences) {
            var intersects = raycaster.intersectObjects(scene.children, true);
            // }

            // if (intersects.length > 0) {
            //     for (i in experiences) {
            //         // intersects = raycaster.intersectObjects(onOffCubes[i], true);
            //         // console.log(intersects[0])

            //         //if the first thing the raycaster sees is a cube
            //         if (intersects[0].group == onOffCubes[i].children) {
            //             ExperiencesData[i].userClose = true
            //             console.log(ExperiencesData[i].userClose)
            //             // console.log('intersected')
            //                 //turn that object this color
            //             intersects[0].object.material.color.set(0xeeb000);
            //             //if it's not playing
            //             if (!ExperiencesData[i].songPlaying) {
            //                 // console.log("song wasn't playing")
            //                 intersects[0].object.userData.playing = true;
            //                 intersects[0].object.userData.sound.play();
            //                 if (HowManyPlaying < 6) { HowManyPlaying++ }
            //                 // console.log("start sound here");
            //             }
            //             // console.log(intersects[0].object.userData.sound);
            //             // console.log("start sound here");
            //             //ADD MOUSECLICK HERE
            //         }
            //     }
            // }
            //IF WE ARE NOT INTERSECTING ANYTHING
            // else {
            // for (var i = 0; i < onOffCubes.length; i++) {
            //     //if (the audio[i] is playing)
            //     //pause the audio[i]
            //     if (onOffCubes[i] && onOffCubes[i].userData.playing) {
            //         onOffCubes[i].userData.playing = false;
            //         onOffCubes[i].userData.sound.pause();
            //         onOffCubes[i].material.color.set(0xff0000);
            //         HowManyPlaying--
            //         console.log("stop sound here" + "||" + HowManyPlaying);
            //     }
            //     //if (the audio[i] is not playing){
            //     // intersects[0].object.material.color.set(0xff0000);
            //     // play the audio[i]
            //     //}
            // }

            // }
        }

        // }


        requestAnimationFrame(animate); //http://creativejs.com/resources/requestanimationframe/
        ///CONTROLS
        if (controlsEnabled) {

            //copies the value of what is inside
            raycaster.ray.origin.copy(controls.getObject().position);
            raycaster.ray.origin.y -= 10;

            //looking for every object
            var objects = scene.children
            var intersections = raycaster.intersectObjects(objects);

            var isOnObject = intersections.length > 0;

            var time = performance.now();
            var delta = (time - prevTime) / 1000;

            velocity.x -= velocity.x * 10.0 * delta;
            velocity.z -= velocity.z * 10.0 * delta;
            velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass

            if (moveForward) velocity.z -= 400.0 * delta;
            if (moveBackward) velocity.z += 400.0 * delta;
            if (moveLeft) velocity.x -= 400.0 * delta;
            if (moveRight) velocity.x += 400.0 * delta;

            if (isOnObject === true) {
                velocity.y = Math.max(0, velocity.y);
                canJump = true;
            }

            if (controls.getObject().position.distanceTo(worldCenter) < videoRadius) {
                controls.getObject().translateX(velocity.x * delta);
                controls.getObject().translateY(velocity.y * delta);
                controls.getObject().translateZ(velocity.z * delta);
            } else {
                velocity.multiplyScalar(-1);
                controls.getObject().translateX(velocity.x * delta);
                controls.getObject().translateY(velocity.y * delta);
                controls.getObject().translateZ(velocity.z * delta);
            }
            if (controls.getObject().position.y < 10) {
                velocity.y = 0;
                controls.getObject().position.y = 10;
                canJump = true;

            }

            prevTime = time;

        }





        update();
        finished()
        render();




    }

    function update() {


    }

    function finished() {
        for (var i = 0; i < experiences.length; i++) {
            if (HowManyPlaying == 0) {
                console.log('Done')
            }

        }
    }
    //////////////////////////////////////////////////////////////////
    //    ____    U _____ u _   _    ____  U _____ u   ____
    // U |  _"\ u \| ___"|/| \ |"|  |  _"\ \| ___"|/U |  _"\ u
    //  \| |_) |/  |  _|" <|  \| |>/| | | | |  _|"   \| |_) |/
    //   |  _ <    | |___ U| |\  |uU| |_| |\| |___    |  _ <
    //   |_| \_\   |_____| |_| \_|  |____/ u|_____|   |_| \_\
    //   //   \\_  <<   >> ||   \\,-.|||_   <<   >>   //   \\_
    //  (__)  (__)(__) (__)(_")  (_/(__)_) (__) (__) (__)  (__)
    //////////////////////////////////////////////////////////////////

    function render() {

        // if (allLipVideosReady == true) {
        if (allLipMaterials.length > 3) {
            // console.log(allLipMaterials.length + 'is length of lipMaterials')


            for (var i = 0; i < experiences.length; i++) {
                if (ExperiencesData[i].songPlaying) {
                    // console.log('song is playing  - lips')
                    if (AlllipVideos[i].readyState === AlllipVideos[i].HAVE_ENOUGH_DATA) {
                        // console.log('i have enough data')
                        videoLipImageContexts[i].drawImage(AlllipVideos[i], 0, 0);
                        if (allLipvideoTextures[i])
                            allLipvideoTextures[i].needsUpdate = true;
                    }
                }
            }
        }

        //
        // worldRadius = guicontrols.worldradius
        //gui ends
        if (readyAllVideos == true) {

            for (var i = 0; i < experiences.length; i++) {
                if (videos[i].readyState === videos[i].HAVE_ENOUGH_DATA) {

                    videoImageContexts[i].drawImage(videos[i], 0, 0);

                    if (allvideoTextures[i])
                        allvideoTextures[i].needsUpdate = true;

                }
            }
        }

        renderer.render(scene, cameraThree);

        //console.log(cameraThree.position);
        var vec1 = new THREE.Vector3(100, 100, 100)
            // console.log(cameraThree.position)
        var distance = vec1.distanceTo(cameraThree.position)
            // console.log(distance)
    }


    ////////////////////////////////////////////////////////




    // function onMouseDown() {

    // }


    function toDegrees(angle) {
        return angle * (180 / Math.PI);
    }

    function toRadians(angle) {
        return angle * (Math.PI / 180);
    }





    function createMesh(geom) {

        // assign two materials
        var meshMaterial = new THREE.MeshNormalMaterial();
        meshMaterial.side = THREE.DoubleSide;
        var wireFrameMat = new THREE.MeshBasicMaterial();
        wireFrameMat.wireframe = true;

        // create a multimaterial
        var mesh = THREE.SceneUtils.createMultiMaterialObject(geom, [meshMaterial, wireFrameMat]);

        return mesh;
    }


    function onWindowResize() {
        windowHalfX = window.innerWidth / 2
        windowHalfY = window.innerHeight / 2
        cameraThree.aspect = window.innerWidth / window.innerHeight;
        cameraThree.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);

    }


    function isTouchDevice() {
        return 'ontouchstart' in window || !!(navigator.msMaxTouchPoints);
    }

    /////////////////////////////////////////////////////////////
    //    ____     _   _
    // U /"___|uU |"|u| |   ___
    // \| |  _ / \| |\| |  |_"_|
    //  | |_| |   | |_| |   | |
    //   \____|  <<\___/  U/| |\u
    //   _)(|_  (__) )(.-,_|___|_,-.
    //  (__)__)     (__)\_)-' '-(_/
    /////////////////////////////////////////////////////////////
    ///

    function AddGui() {

        guicontrols = new function() {
            //default values
            this.rotationSpeed = 0.02;
            this.bouncingSpeed = 0.03;
            this.worldradius = 400;
        }

        var gui = new dat.GUI();
        gui.add(guicontrols, 'rotationSpeed', 0, 0.5);
        gui.add(guicontrols, 'bouncingSpeed', 0, 0.5);
        gui.add(guicontrols, 'worldradius', 50, 1000)
    } //GUI ENDS


} ////ALL OF SCENE 2 IS OVER

function calculateDistances() {

    for (var i = 0; i < experiences.length; i++) {
        //var point1 = Scene4.cameraThree.matrixWorld.getPosition().clone();
        //var point2 = Scene4.cameraThree.matrixWorld.getPosition().clone();
        //distances[i] = point1.distanceTo(point2);
        //console.log(Scene4.cameraThree.position);
    }

}
