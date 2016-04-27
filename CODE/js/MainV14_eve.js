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
var gameOver = false;
var windbuffer, windplayer
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
        $("#scene5").hide();
        loadingOvervid.pause();

        $('#next-button').click(function() {
            scene2 = true
            windplayer.start()
            headspin = true;

            $("#intro").hide();
        });
    }
}

function preloadMedia() {
    windbuffer = new Tone.Buffer("../assets/wind.m4a", function() {
        windplayer = new Tone.Player(windbuffer)
        windplayer.connect(Tone.Master)
        console.log('loaded wind')


    })

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
            scene4 = true;
            scene4ready = false
        }
    } else if (newscene == 5) {
        HeartPlayer.volume.value = -5
        HeartPlayer.volume.linearRampToValueAtTime(0, HeartPlayer.context.currentTime + 5)
        scene5 = true;
        $("#scene5").show();
        // TweenLite('#thank-you', 5, {y:200} ) ;
        $('#scene4').hide();
        $('body').css("background-color", "white")
        $('#thank-you').addClass(".animate-focus")
        scene4 = false
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
var voices = [],
    voicesCenter = [],
    sfx1 = [],
    sfx2 = [];
var scene4 = false
var allLines = []
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
var sfx2BufferLoadingCounter = 0
var sfx1BufferLoadingCounter = 0
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
var textRadius = worldRadius * .85;
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
var text1;
var allTexts = []
var thetaStart = 0
var walls;
var allType = []
    ////////SCENE 5//////////////
var scene5Clock = 0
var Scene5 = false
var sfx1readyAmt = 0
var sfx2readyAmt = 0
var audioLoader
var composer;
var glitchPass;
//////SFX//////
var allSfx2 = []
var allSfx1 = []
var buffersfx1_1
var buffersfx1_2
var buffersfx1_3
var buffersfx1_4
var buffersfx1_5
var buffersfx1_6
var setrefdist = .5
var sfx1Meshes = []
    ///////WAVEFORMS////////
var waveformsRaw = []
var waveHeight = 128
var waveWidth = 512
var waveContexts = []
var waveFormMeshes = []
var allWaveTextures = []
    ///////////////////////
var floorTxtReady = false;



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
    var pointLight;

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
        hemiLight.color.setHSL(0.1, 1, 0.4);
        hemiLight.groundColor.setHSL(0.005, 1, 0.5);
        hemiLight.position.set(0, 500, 0);
        scene.add(hemiLight);
        pointLight = new THREE.PointLight(0xff0000, 1, 100)
        scene.add(pointLight)


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
        //if we're using tone, include this line
        Tone.setContext(listener.context);
        cameraThree.add(listener);



        ////////////////////////////////

        //create canvases for waveforms ground
        for (i in experiences) {

            //make 6 analysers
            var waveform = new Tone.Analyser(256, "waveform");
            waveformsRaw.push(waveform)

            //make 6 canvases
            var waveContext = $("<canvas>", {
                "id": "waveform" + i
            }).appendTo("#Content").get(0).getContext("2d");
            waveContext.canvas.width = 512;
            waveContext.canvas.height = waveHeight;
            waveContexts.push(waveContext)

        }



        raycaster = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, -1, 0), 0, 10);
        // raycaster.set(origin,direction)
        AudioIcontxt = new THREE.MeshBasicMaterial({
            color: colorPlayingFar,
            opacity: 1,
            side: THREE.DoubleSide
        })

        DrawCenterArea();
        Floor();
        OuterSphere();

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



        ////draw type

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

            DrawLips();

        }, onProgress, onError);


        var loader = new THREE.FontLoader();
        loader.load('../js/helvetiker_regular.typeface.js', function(font) {

            DrawType(font);


        });






        function DrawType(font) {

            for (i in experiences) {


                var theText = "Click to silence voice";

                var hash = document.location.hash.substr(1);

                if (hash.length !== 0) {

                    theText = hash;

                }

                var geometry = new THREE.TextGeometry(theText, {
                    font: font,
                    size: 1,
                    height: 0.5,
                    curveSegments: 7
                });

                // 
                geometry.computeBoundingBox();
                var centerOffset = -0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);

                var material = new THREE.MultiMaterial([new THREE.MeshBasicMaterial({
                    color: 0xffffff,
                    overdraw: 0.5
                }), new THREE.MeshBasicMaterial({
                    color: 0x000000,
                    overdraw: 0.5
                })]);
                var xCenter = Math.cos(toRadians(i * spacing))

                var zCenter = Math.sin(toRadians(i * spacing))
                var mesh = new THREE.Mesh(geometry, material);
                mesh.position.set(videoRadius * xCenter + centerOffset, 8, videoRadius * zCenter);

                mesh.lookAt(new THREE.Vector3(0, 0, 0))
                allType.push(mesh)

                scene.add(allType[i]);
            }
        } //end of draw Type






        // DrawCenterArea();
        // Floor()
        // OuterSphere()




        window.addEventListener('resize', onWindowResize, false);



        controls = new THREE.PointerLockControls(cameraThree);
        controls.getObject().add(listener);
        scene.add(controls.getObject());

        var spt1 = new THREE.SpotLight(0xFF7F00);
        spt1.position.set(15, 40, 45);
        // spt1.target = new THREE.Vector3(controls.position.x, controls.position.y, controls.position.z)
        // scene.add(spt1);
        // var flashlight = new THREE.SpotLight(0xffffff, 4, 40);
        // scene.add(flashlight);
        // flashlight.position.set(0, 0, 1);
        // flashlight.target = controls;

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

        // postprocessing
        composer = new THREE.EffectComposer(renderer);
        composer.addPass(new THREE.RenderPass(scene, cameraThree));

        glitchPass = new THREE.GlitchPass();
        glitchPass.renderToScreen = true;
        composer.addPass(glitchPass);



        document.addEventListener('keydown', onKeyDown, false);
        document.addEventListener('keyup', onKeyUp, false);
        document.addEventListener('click', onClick, false);




    } //INIT ENDS
    ////////////////////////////////
    ///////////////////////////////////


    function onClick() {
        // console.log('clicked')
        for (i in experiences) {
            if (ExperiencesData[i].userClose == true && ExperiencesData[i].songPlaying == false) {
                scene.remove(allType[i]);
                voices[i].play()

                voicesCenter[i].play()
                ExperiencesData[i].songPlaying = true
                HowManyPlaying++
                // console.log(HowManyPlaying)
                onOffCubes[i].children[0].material.color.set(colorPlayingClose)

                checkIfFinished();

            } else if (ExperiencesData[i].userClose == true && ExperiencesData[i].songPlaying == true) {
                scene.remove(allType[i]);
                ExperiencesData[i].songPlaying = false
                onOffCubes[i].children[0].material.color.set(colorNotPlayingClose)
                voices[i].pause()
                voicesCenter[i].pause()

                HowManyPlaying--


                checkIfFinished();
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


        audioLoader = new THREE.AudioLoader();


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
            // lipsMaterial = new THREE.MeshPhongMaterial( { color: 0xffffff, shading: THREE.FlatShading } );

            lipsMaterial = new THREE.MeshBasicMaterial({
                color: 0x808080,
                map: lipVideoTexture,
                wireframe: false,
                side: THREE.DoubleSide,
                opacity: 1
            });
            // mat.blending = THREE["AdditiveBlending"];

            allLipMaterials.push(lipsMaterial);

            //CUBE VIDEOS
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

            //make a buffer for all voices
            var buffer = new THREE.AudioBuffer(listener.context);
            buffer.load(ExperiencesData[i].voice);
            buffer.onReady(function() {
                bufferLoadingCounter++;
                if (bufferLoadingCounter === experiences.length) {
                    console.log('done loading voices')
                    var sfxCube1 = new THREE.BoxGeometry(100, 50, 50);
                    var material = new THREE.MeshBasicMaterial({ color: 0x0000FF, opacity: 0, visible: false })
                }
            });

            var sfx2Buffer = new THREE.AudioBuffer(listener.context);
            sfx2Buffer.load(ExperiencesData[i].secondSfx);
            sfx2Buffer.onReady(function() {
                sfx2BufferLoadingCounter++;
                if (sfx2BufferLoadingCounter === experiences.length) {
                    console.log('done loading sfx2')
                    var sfxCube2 = new THREE.BoxGeometry(100, 50, 50);
                    var material2 = new THREE.MeshBasicMaterial({ color: 0x0000FF, opacity: 0, visible: false })
                }

            });


            var sfx1Buffer = new THREE.AudioBuffer(listener.context);
            sfx1Buffer.load(ExperiencesData[i].firstSfx);
            sfx1Buffer.onReady(function() {
                sfx1BufferLoadingCounter++;
                if (sfx1BufferLoadingCounter === experiences.length) {
                    console.log('done loading sfx1')
                    var sfxCube1b = new THREE.BoxGeometry(100, 50, 50);
                    var material1b = new THREE.MeshBasicMaterial({ color: 0x0000FF, opacity: 0, visible: false })
                }

            });



            //old way
            var newVoice = new THREE.PositionalAudio(listener);
            var panner = newVoice.getOutput();
            newVoice.setBuffer(buffer);
            newVoice.setRefDistance(13);
            newVoice.autoplay = true;
            newVoice.setLoop(true);
            newVoice.setVolume(1)
            newVoice.gain.connect(waveformsRaw[i])
                //newVoice.connect(waveformsRaw[i])
            voices.push(newVoice);

            var sfx2 = new THREE.PositionalAudio(listener)
            var panner2 = sfx2.getOutput();
            sfx2.setBuffer(sfx2Buffer);
            sfx2.setRefDistance(13);
            sfx2.autoplay = true;
            sfx2.setLoop(true);
            sfx2.setVolume(1)
            allSfx2.push(sfx2)

            var sfx1 = new THREE.PositionalAudio(listener)
            var panner1 = sfx1.getOutput();
            sfx1.setBuffer(sfx1Buffer);
            sfx1.setRefDistance(13);
            sfx1.autoplay = true;
            sfx1.setLoop(true);
            sfx1.setVolume(1)
            allSfx1.push(sfx1)



            var newVoiceCenter = new THREE.PositionalAudio(listener);
            var panner = newVoiceCenter.getOutput();
            newVoiceCenter.setBuffer(buffer);
            newVoiceCenter.autoplay = true;
            newVoiceCenter.setLoop(true);
            voicesCenter.push(newVoiceCenter);
        



            onoffbutton = audIcon.clone();
            AudioIcontxt = new THREE.MeshPhongMaterial({
                color: colorPlayingFar,
                opacity: 1,
                side: THREE.DoubleSide
            })
            onoffbutton.traverse(function(child) {
                if (child instanceof THREE.Mesh) {
                    child.material = AudioIcontxt
                }
            });

            scene.add(onoffbutton)
            onOffCubes.push(onoffbutton);
            // }
            //instead of this, use the json file
            // onoffbutton.userData.sound = voices;

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





    function BuildCubes() {





        for (var k = 0; k < experiences.length; k++) {

            var xCenter = Math.cos(toRadians(k * spacing))

            var zCenter = Math.sin(toRadians(k * spacing))


            //the volume buttons and attach voices to them
            onOffCubes[k].position.set(videoRadius * xCenter, 15, videoRadius * zCenter)
            onOffCubes[k].lookAt(new THREE.Vector3(0, 0, 0))
            onOffCubes[k].add(voices[k])
            onOffCubes[k].add(allSfx2[k])
            onOffCubes[k].add(allSfx1[k])
                // voices[k].gain.gain = 3


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

             
                group.add(mesh);
              

            }
            group.position.set(videoRadius * xCenter, 70, videoRadius * zCenter);




            group.lookAt(new THREE.Vector3())
            scene.add(group)

        }
        readyAllVideos = true


    } //BUILD CUBES ENDS

    function transX(geo, n) {
        for (var i = 0; i < geo.vertices.length; i++) {
            geo.vertices[i].x += n;
        }
    }

    function DrawCenterArea() {

        //make one center cylinder that's really transparent
        //try and make it blurry if you can
        var centerpiecemat = new THREE.MeshPhongMaterial({ side: THREE.DoubleSide, color: 0xFF0000, specular: 0xFF0000, emissive: 0xFF0000, shininess: 10, shading: THREE.SmoothShading, opacity: 0.1, transparent: true })
        centerpiece = new THREE.Mesh(new THREE.CylinderGeometry(centerRadius * 1.5, centerRadius * 1.5, worldRadius, 22, 1), centerpiecemat);
        centerpiece.position.set(0, 0, 0);
        scene.add(centerpiece);


        ///////DRAW WAVEFORM PLANE GEOMETRY GROUND ///////////
        var groundplane = new THREE.PlaneGeometry(videoRadius, waveHeight * 2, 15)

        transX(groundplane, 190);

        for (i in experiences) {
            textureWave = new THREE.Texture(document.getElementById('waveform' + i))
            textureWave.needsUpdate = true;
            // console.log(textureWave)
            allWaveTextures.push(textureWave)


            var materialWave = new THREE.MeshBasicMaterial({
                map: allWaveTextures[i],
                color: 0xffffff,
                side: THREE.DoubleSide,
                transparent: true,
                opacity: .5
            })
            var mesh = new THREE.Mesh(groundplane, materialWave)
            scene.add(mesh)




            // mesh.rotation.x = 45*i
            mesh.rotation.x = Math.PI / 2
            mesh.rotation.z = Math.PI / 3 * i
                // mesh.rotation.z = 90
            mesh.position.set(0, 7, 0);
            waveFormMeshes.push(mesh)
        }



        ////////DRAW LINES/////////
        for (k in experiences) {
            var xCenter = Math.cos(toRadians(k * spacing))
            var zCenter = Math.sin(toRadians(k * spacing))
            var Linematerial = new THREE.LineBasicMaterial({
                color: colorPlayingClose
            });

            var Linegeometry = new THREE.Geometry();
            Linegeometry.vertices.push(
                new THREE.Vector3(videoRadius * xCenter, 1, zCenter * videoRadius),
                new THREE.Vector3(xCenter * centerRadius, 1, zCenter * centerRadius)
                // new THREE.Vector3(10, 0, 0)
            );

            var line = new THREE.Line(Linegeometry, Linematerial);
            allLines.push(line)
                // scene.add(line);
        }
        /////////////////FINISH LINES

    }

    function DrawLips() {
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
            object = new THREE.Mesh(new THREE.CylinderGeometry(circleRad, circleRad, 10, 22, 1), material);
            object.position.set(x, 0, z);

            lipDisk = new THREE.CircleGeometry(circleRad, 12);

            lipDiskMesh = new THREE.Mesh(lipDisk, allLipMaterials[i]);
            lipDiskMesh.position.set(x, 10, z)
            lipDiskMesh.lookAt(new THREE.Vector3())
            lipDiskMesh.add(voicesCenter[i])
            allLipDiskMeshes.push(lipDiskMesh)
            scene.add(lipDiskMesh)

            scene.add(object);
            centerPieces.push(object)
        }
        allLipVideosReady = true;
    }


    function Floor() {
        floorMat = new THREE.MeshStandardMaterial({
            roughness: 0.8,
            color: 0xffffff,
            bumpScale: 0.0005,
        });
        var textureLoader = new THREE.TextureLoader();
        textureLoader.load("../textures/wallpaper1.png", function(map) {
            console.log('loaded floor txt')
            map.wrapS = THREE.RepeatWrapping;
            map.wrapT = THREE.RepeatWrapping;
            map.anisotropy = 4;
            map.repeat.set(10, 10);
            floorMat.map = map;
            floorMat.needsUpdate = true;
            floorTxtReady = true
            var floorGeometry = new THREE.PlaneBufferGeometry(worldRadius * 2, worldRadius * 2);
            var floorMesh = new THREE.Mesh(floorGeometry, floorMat);
            floorMesh.receiveShadow = true;
            floorMesh.rotation.x = -Math.PI / 2.0;
            scene.add(floorMesh);

        });

    }


    function OuterSphere() {
        walls = new THREE.MeshBasicMaterial({

            color: 0xaf8585,
            metalness: 0.2,
            side: THREE.DoubleSide,
        
        });
        var textureLoader = new THREE.TextureLoader();
        textureLoader.load("../textures/wallpaper1.png", function(map) {
            console.log('loaded sphere txt')
            map.wrapS = THREE.RepeatWrapping;
            map.wrapT = THREE.RepeatWrapping;
            map.anisotropy = 4;
            map.repeat.set(10, 10);
            walls.map = map;
            walls.needsUpdate = true;
            worldgeo = new THREE.SphereGeometry(worldRadius, 20, 20, 0, Math.PI * 2, thetaStart)
            worldgeo.thetaStart = 0;
            worldSphere = new THREE.Mesh(worldgeo, walls)
                // new THREE.MeshBasicMaterial()

            scene.add(worldSphere);

        });


    }



    function addAllSounds() {

        for (i in experiences) {
            //make a cube
            var sfxCube1 = new THREE.BoxGeometry(100, 50, 50);
            var sfxCube2 = new THREE.BoxGeometry(100, 50, 50);
            var material = new THREE.MeshBasicMaterial({ color: 0x0000FF, opacity: 0, visible: false })

            var xCenter = Math.cos(toRadians(k * spacing))

            var zCenter = Math.sin(toRadians(k * spacing))


            var meshsfx1 = new THREE.Mesh(sfxCube1, material)

            var meshsfx2 = new THREE.Mesh(sfxCube2, material)
               
            meshsfx1.position.set(videoRadius * xCenter * .5, 15, videoRadius * .5 * zCenter)


            scene.add(meshsfx1)

        }



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

    var newspherecreated = false;

    function recreateSphere() {
        console.log('recreate sphere')

        scene.remove(worldSphere)

        worldgeo = new THREE.SphereGeometry(worldRadius, 20, 20, 0, Math.PI * 2, 1, Math.PI)
            // worldgeo.thetaStart = 0;
        worldSphere = new THREE.Mesh(worldgeo, walls)
        scene.add(worldSphere)
    }


    function animate() {

        pointLight.position.set(controls.getObject().position)



        composer.render();


        if ((sfx1readyAmt + sfx2readyAmt) > 5) {
            console.log('more than 6 sfx')
                // addAllSounds()
            sfx1readyAmt = 0;
        }



        if (gameOver) {
            if (newspherecreated == false) {
                recreateSphere();
                newspherecreated = true
            }

            if (cameraThree.position.y == 150) {
                switchScenes(5)
            }
            if (cameraThree.position.y == 70) {
                // scene.fog = new THREE.Fog(0xffffff, 10, 60);
                // scene.fog.color.setHSL( 0.51, 0.6, 0.6 );
            }



            cameraThree.position.y += .5
            hemiLight.color.setHSL(0.1, 1, 1);
            walls.opacity = .5
            if (lighten < 1) { lighten = lighten + .01 } else {
                lighten = 1
            }
        } else {
            var lighten = 0.6;

        }


        // spt1.target = controls.getObject().position


        if (readyAllVideos == true) {


            for (i in experiences) {
                //if you're near the object
                if (controls.getObject().position.distanceTo(onOffCubes[i].position) < interactableDist) {
                    ExperiencesData[i].userClose = true


                    if (ExperiencesData[i].songPlaying == true) {
                        scene.add(allType[i])
                            // console.log('song is playing and I am inside')
                            //change color to bright red

                        onOffCubes[i].children[0].material.color.set(colorPlayingClose)
                        allLines[i].material.color.set(colorPlayingClose)
                            // AudioIcontxt[i].color.set(colorPlayingClose)
                            //add text to say "click anywhere to silence voice"
                    } else if (ExperiencesData[i].songPlaying == false) {
                        // console.log('song is OFF and I am inside')
                        onOffCubes[i].children[0].material.color.set(colorNotPlayingClose)
                        allLines[i].material.color.set(colorNotPlayingFar)

                    }

                } else {
                    if (allType[i]) { scene.remove(allType[i]) }
                    //IF CONTROLS ARE NOT CLOSE TO THE SOUND, make it false
                    ExperiencesData[i].userClose = false
                    if (ExperiencesData[i].songPlaying == true) {
                        // console.log('I am Far from'+ i + 'and song is playing')
                        onOffCubes[i].children[0].material.color.set(colorPlayingFar)
                        allLines[i].material.color.set(colorPlayingClose)
                    } else if (ExperiencesData[i].songPlaying == false) {
                        // console.log('I am Far from'+ i + 'and song is not playing')
                        onOffCubes[i].children[0].material.color.set(colorNotPlayingFar)
                        allLines[i].material.color.set(colorNotPlayingFar)
                    }
                }

            }


            //GROUND WAVE FORMS
            for (i in experiences) {
                if (ExperiencesData[i].songPlaying == true) {
                    drawWaveform(i);
                    waveFormMeshes[i].material.map.needsUpdate = true
                } else {
                    if (waveFormMeshes[i]) {
                        console.log('removed one')
                        scene.remove(waveFormMeshes[i]);
                    }
                }
            }

        }




        requestAnimationFrame(animate); //http://creativejs.com/resources/requestanimationframe/
        ///CONTROLS
        if (controlsEnabled) {
            // console.log('controls enabled')

            //updateMatrixWorld(controls.getObject());

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


        render();




    }


    function Scene5() {
        for (i in allSfx2) {
            //         // allSfx2[i].gain.gain.linearRampToValueAtTime(0,listener.context.currentTime+20)
            allSfx2[i].gain.gain.setTargetAtTime(0, listener.context.currentTime + 6, 2);
        }

        for (i in allSfx1) {
            //         // allSfx2[i].gain.gain.linearRampToValueAtTime(0,listener.context.currentTime+20)
            allSfx1[i].gain.gain.setTargetAtTime(0, listener.context.currentTime + 6, 2);
        }

        //       for (i in allSfx1){
        // //         // allSfx2[i].gain.gain.linearRampToValueAtTime(0,listener.context.currentTime+20)
        //         allSfx2[i].gain.gain.setTargetAtTime(0, listener.context.currentTime+12, 2);
        //     }
        // console.log('scene 5 was called')
        // $('#scene4').hide()
        // $("#scene5").show();
        scene5Clock++
        // scene.fog = new THREE.Fog(0xffffff, 10, 60);
        // scene.fog.color.setHSL( 0.51, 0.6, 0.6 );
        //do stuff?
    }



    function checkIfFinished() {

        if (HowManyPlaying == 0) {
            for (i in experiences) {
                voices[i].pause()
                    // voices[4].gain.gain.exponentialRampToValueAtTime(0, listener.context.currentTime+1);
            }
            gameOver = true;
            Scene5();
            console.log('Done')
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

        if (floorMat) {
            floorMat.needsUpdate = true;
        }


        if (allLipVideosReady == true) {
            // if (allLipMaterials.length > 0) {
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


        var vec1 = new THREE.Vector3(100, 100, 100)
        var distance = vec1.distanceTo(cameraThree.position)

        if (Scene5 == true) {
            // console.log('scene5')
            renderer.setClearColor(0xffffff, .5); //set background color and alpha

        }
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
        composer.setSize(window.innerWidth, window.innerHeight);
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





function updateMatrixWorld() {

    var position = new THREE.Vector3();
    var quaternion = new THREE.Quaternion();
    var scale = new THREE.Vector3();

    var orientation = new THREE.Vector3();

    return function updateMatrixWorld(camera) {

        var up = camera.up;

        camera.matrixWorld.decompose(position, quaternion, scale);

        orientation.set(0, 0, -1).applyQuaternion(quaternion);

        listener.context.listener.setPosition(position.x, position.y, position.z);
        listener.context.listener.setOrientation(orientation.x, orientation.y, orientation.z, up.x, up.y, up.z);

    };

}



function drawWaveform(i) {
    // if (ExperiencesData[i].songPlaying == true) {
    // console.log('voice' + i + 'is playing')
    var waveformValues = waveformsRaw[i].analyse();

    waveContexts[i].clearRect(0, 0, 512, waveHeight);
    //for debugging turn this on
    // waveContexts[i].fillStyle = "#00ff00";
    // waveContexts[i].fillRect(0, 0, 512, waveHeight);
    var values = waveformsRaw[i].analyse();
    waveContexts[i].beginPath();
    waveContexts[i].lineJoin = "round";

    waveContexts[i].strokeStyle = '#d84343';

    waveContexts[i].lineWidth = 3;

    waveContexts[i].moveTo(0, (values[0] / 255) * waveHeight);
    for (var j = 1, len = values.length; j < len; j++) {
        var val = values[j] / 255;
        var x = 512 * (j / len);
        var y = val * waveHeight;
        waveContexts[i].lineTo(x, y);
    }
    waveContexts[i].stroke();

    // } //is playing over

}
