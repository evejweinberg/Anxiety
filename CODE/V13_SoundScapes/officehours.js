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
    var worldCenter = new THREE.Vector3(0, 0, 0);

    
      init();
    animate();

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

        // instructions.addEventListener('click', function(event) {

        //     instructions.style.display = 'none';

        //     // Ask the browser to lock the pointer
        //     element.requestPointerLock = element.requestPointerLock || element.mozRequestPointerLock || element.webkitRequestPointerLock;

        //     if (/Firefox/i.test(navigator.userAgent)) {

        //         var fullscreenchange = function(event) {

        //             if (document.fullscreenElement === element || document.mozFullscreenElement === element || document.mozFullScreenElement === element) {

        //                 document.removeEventListener('fullscreenchange', fullscreenchange);
        //                 document.removeEventListener('mozfullscreenchange', fullscreenchange);

        //                 element.requestPointerLock();
        //             }

        //         };

        //         document.addEventListener('fullscreenchange', fullscreenchange, false);
        //         document.addEventListener('mozfullscreenchange', fullscreenchange, false);
        //         //origin, direction, near, far


        //         element.requestFullscreen = element.requestFullscreen || element.mozRequestFullscreen || element.mozRequestFullScreen || element.webkitRequestFullscreen;

        //         element.requestFullscreen();

        //     } else {

        //         element.requestPointerLock();

        //     }

        // }, false);

    } else {
        instructions.innerHTML = 'Your browser doesn\'t seem to support Pointer Lock API';
    }




















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
        // document.addEventListener('click', onClick, false);


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

       function animate(){
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




        // render();


    }
   