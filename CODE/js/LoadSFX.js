//load sound effects
var buffersfx1_1
var buffersfx1_2
var buffersfx1_3
var buffersfx1_4
var buffersfx1_5
var buffersfx1_6
var setrefdist = .5
var sfx1Meshes = []
var listener = new THREE.AudioListener();

function LoadSfxManually() {
    var sfxCube1 = new THREE.BoxGeometry(100, 50, 50);
    var material = new THREE.MeshBasicMaterial({ color: 0x0000FF, opacity: 0, visible: false })


    buffersfx1_1 = new THREE.AudioBuffer(listener.context);
    buffersfx1_1.load(ExperiencesData[0].firstSfx);
    buffersfx1_1.onReady(function() {
        // console.log(buffersfx1)
        var newsfx1 = new THREE.PositionalAudio(listener);
        newsfx1.setBuffer(buffersfx1_1)
        newsfx1.autoplay = true;
        newsfx1.setLoop(true);
        newsfx1.gain = 2
        newsfx1.panner.rolloffFactor = 5
        newsfx1.panner.maxDistance = 200
        newsfx1.play()
        newsfx1.setRefDistance(setrefdist)
        sfx1.push(newsfx1)
        var mesh = new THREE.Mesh(sfxCube1,material)
        mesh.add(newsfx1)
        sfx1Meshes.push(mesh)
        sfx1readyAmt++

    });


    buffersfx1_2 = new THREE.AudioBuffer(listener.context);
    buffersfx1_2.load(ExperiencesData[1].firstSfx);
    buffersfx1_2.onReady(function() {
        // console.log(buffersfx1)
        var newsfx1 = new THREE.PositionalAudio(listener);
        newsfx1.setBuffer(buffersfx1_2)
        newsfx1.autoplay = true;
        newsfx1.setLoop(true);
        newsfx1.gain = 2
        newsfx1.panner.rolloffFactor = 5
        newsfx1.panner.maxDistance = 200
        newsfx1.play()
        newsfx1.setRefDistance(setrefdist)
        sfx1.push(newsfx1)
         var mesh = new THREE.Mesh(sfxCube1,material)
        mesh.add(newsfx1)
        sfx1Meshes.push(mesh)
        sfx1readyAmt++

    });


    buffersfx1_3 = new THREE.AudioBuffer(listener.context);
    buffersfx1_3.load(ExperiencesData[2].firstSfx);
    buffersfx1_3.onReady(function() {
        // console.log(buffersfx1)
        var newsfx1 = new THREE.PositionalAudio(listener);
        newsfx1.setBuffer(buffersfx1_3)
        newsfx1.autoplay = true;
        newsfx1.setLoop(true);
        newsfx1.gain = 2
        newsfx1.panner.rolloffFactor = 5
        newsfx1.panner.maxDistance = 200
        newsfx1.play()
        newsfx1.setRefDistance(setrefdist)
        sfx1.push(newsfx1)
         var mesh = new THREE.Mesh(sfxCube1,material)
        mesh.add(newsfx1)
        sfx1Meshes.push(mesh)
        sfx1readyAmt++

    });


    buffersfx1_4 = new THREE.AudioBuffer(listener.context);
    buffersfx1_4.load(ExperiencesData[3].firstSfx);
    buffersfx1_4.onReady(function() {
        // console.log(buffersfx1)
        var newsfx1 = new THREE.PositionalAudio(listener);
        newsfx1.setBuffer(buffersfx1_4)
        newsfx1.autoplay = true;
        newsfx1.setLoop(true);
        newsfx1.gain = 2
        newsfx1.panner.rolloffFactor = 5
        newsfx1.panner.maxDistance = 200
        newsfx1.play()
        newsfx1.setRefDistance(setrefdist)
        sfx1.push(newsfx1)
         var mesh = new THREE.Mesh(sfxCube1,material)
        mesh.add(newsfx1)
        sfx1Meshes.push(mesh)
        sfx1readyAmt++

    });


    buffersfx1_5 = new THREE.AudioBuffer(listener.context);
    buffersfx1_5.load(ExperiencesData[4].firstSfx);
    buffersfx1_5.onReady(function() {
        // console.log(buffersfx1)
        var newsfx1 = new THREE.PositionalAudio(listener);
        newsfx1.setBuffer(buffersfx1_5)
        newsfx1.autoplay = true;
        newsfx1.setLoop(true);
        newsfx1.gain = 2
        newsfx1.panner.rolloffFactor = 5
        newsfx1.play()
        newsfx1.panner.maxDistance = 200
        newsfx1.setRefDistance(setrefdist)
        sfx1.push(newsfx1)
         var mesh = new THREE.Mesh(sfxCube1,material)
        mesh.add(newsfx1)
        sfx1Meshes.push(mesh)
        sfx1readyAmt++

    });


    buffersfx1_6 = new THREE.AudioBuffer(listener.context);
    buffersfx1_6.load(ExperiencesData[5].firstSfx);
    buffersfx1_6.onReady(function() {
        // console.log(buffersfx1)
        var newsfx1 = new THREE.PositionalAudio(listener);
        newsfx1.setBuffer(buffersfx1_6)
        newsfx1.autoplay = true;
        newsfx1.setLoop(true);
        newsfx1.gain = 2
        newsfx1.panner.rolloffFactor = 5
        newsfx1.play()
        newsfx1.panner.maxDistance = 200
        newsfx1.setRefDistance(setrefdist)
        sfx1.push(newsfx1)
         var mesh = new THREE.Mesh(sfxCube1,material)
        mesh.add(newsfx1)
        sfx1Meshes.push(mesh)
        sfx1readyAmt++

    });

}
