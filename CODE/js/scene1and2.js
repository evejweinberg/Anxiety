var HeartPlayer;

if (scene1) {

    function Scene1() {

        var container = document.getElementById('scene1');

        var renderer, scene, camera, fov = 45;
        var mesh;
        // var decal;
        var raycaster;
        var line;
        // var ReadyToMove = false;
        var geostart = -20
        var lightHelper

        var controls;
        var mouse = new THREE.Vector2();

        var textureLoader = new THREE.TextureLoader();
        var camStartDist = 200
        var mouseHelper;
        var p = new THREE.Vector3(0, 0, 0);
        var r = new THREE.Vector3(0, 0, 0);
        var s = new THREE.Vector3(10, 10, 10);
        var up = new THREE.Vector3(0, 1, 0);
        var check = new THREE.Vector3(1, 1, 1);

        console.log('scene 1 was called')

        var params = {
            projection: 'normal',
            minScale: 10,
            maxScale: 20,
            rotate: true,

        };

        window.addEventListener('load', init);

        function init() {

            renderer = new THREE.WebGLRenderer({
                antialias: true
            });
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(window.innerWidth, window.innerHeight);
            container.appendChild(renderer.domElement);

            scene = new THREE.Scene();

            camera = new THREE.PerspectiveCamera(fov, window.innerWidth / window.innerHeight, 1, 1000);
            camera.position.z = camStartDist;
            camera.target = new THREE.Vector3();

            scene.add(new THREE.AmbientLight(0x443333));

            var light = new THREE.DirectionalLight(0xffddcc, 1);
            light.position.set(1, 0.75, 0.5);
            scene.add(light);
            lightHelper = new THREE.DirectionalLightHelper(light, 50);
            // scene.add(lightHelper);

            //red light
            var light = new THREE.DirectionalLight(0xFF0000, 1);
            light.position.set(-1, 0.75, -0.5);
            scene.add(light);
            lightHelper = new THREE.DirectionalLightHelper(light, 50);
            // scene.add(lightHelper);




            loadHeadModel();


            window.addEventListener('resize', onWindowResize, false);

            onWindowResize();
            animate();

        }


        function loadHeadModel(callback) {

            var loader = new THREE.JSONLoader();

            loader.load('models/ESP_v3.js', function(geometry) {
                // loader.load('../models/Suzanne.js', function(geometry) {

                var material = new THREE.MeshPhongMaterial({
                    specular: 0x111111,
                    // map: headtextureLoader.load( '../models/leeperrysmith/Map-COL.jpg' ),

                    map: textureLoader.load('models/ESP_v2Tex1.jpg'),
                    // specularMap: headtextureLoader.load( '../models/evehead1/ESP.jpg' ),
                    // normalMap: headtextureLoader.load( '../models/evehead1/ESP.jpg'),
                    // normalScale: new THREE.Vector2( 0.75, 0.75 ),
                    shininess: 25
                });

                mesh = new THREE.Mesh(geometry, material);
                // mesh.geometry.boundingSphere.center.set(0, 0, 0)
                // console.log(mesh.geometry)
                scene.add(mesh);
                // mesh.centroid = new THREE.Vector3();
                // for (var i = 0, l = geometry.vertices.length; i < l; i++) {
                //     mesh.centroid.addSelf(
                //         geometry.vertices[i].clone()
                //     );
                // }
                // console.log(mesh.centroid)
                // var offset = mesh.centroid.clone();
                // mesh.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(-offset.x, -offset.y, -offset.z));
                // mesh.position.copy(objMesh.centroid);
                mesh.scale.set(20,20,20)
                // mesh.position.set(0, 0, 0)
                mesh.position.set(0, -30, geostart)
                mesh.rotation.z = Math.PI / 2
                mesh.rotation.y = Math.PI



            });

        }


        function soundBed() {
            HeartPlayer = new Tone.Player("assets/heartbeat.wav");
            HeartPlayer.toMaster();
            HeartPlayer.volume.value = -15
            Tone.Buffer.on("load", function() {
                HeartPlayer.start();
                HeartPlayer.loop = true;
            });

            //create a tone player and connect to master and loop
        }



        function onWindowResize() {

            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();

            renderer.setSize(window.innerWidth, window.innerHeight);

        }

        function animate() {

            if (headspin == true) {
                // console.log('cam position is ' +camera.position.z)
                mesh.rotation.y = mesh.rotation.y - .018;
                // mesh.position.y = mesh.position.y - .1
                // camera.position.z-=5
                camera.position.z--
            }

            if (camera.position.z == 0) {
                // console.log('load tunnel video now')

                $('#tunnel-vid').show();
                loadingOvervid.play();
                $('video#tunnel-vid').bind('ended', function() {
                    // console.log('video ended')
                    $('#tunnel-vid').remove();
                    switchScenes(4);
                    soundBed();
                });
            }

            if (camera.position.z == -50) {
                if (headspin) {
                    // console.log('headspin ending now in 3JS')
                    headspin = false
                    scene4ready = true
                    switchScenes(4)
                }
            }


            requestAnimationFrame(animate);
            renderer.render(scene, camera);

        }

        if (scene2) {

            while (scene3count < 4521) {
                // console.log(scene3count)
                scene3count++

                if (scene3count == 200) {
                    console.log('move head now')
                    headspin = true;
                }


            }
            if (scene3count == 2520) {
                console.log('head scene ended')
                    // switchscenes(4)
            }
        }




    }

}
