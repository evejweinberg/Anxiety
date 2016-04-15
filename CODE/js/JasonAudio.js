/**
 *  create audio elements
 */


THREE.Audio.prototype.fadeOut = function() {
	if (this.on) {
		this.gain.gain.setValueAtTime(1, this.context.currentTime);
	}

	this.gain.gain.linearRampToValueAtTime(0, this.context.currentTime + 1);
	this.fadeTime = this.context.currentTime;
	this.on = false;
};

THREE.Audio.prototype.fadeIn = function() {
	var self = this;
	this.on = true;

	if (this.fadeTime) {
		origStart = this.fadeTime;
		this.pause();
		self.startTime = origStart;
		this.gain.gain.setValueAtTime(0, this.context.currentTime);
		this.gain.gain.exponentialRampToValueAtTime(1.0, this.context.currentTime + 0.2);
		setTimeout(function() {
			self.play();
		}, 50);
	}
};

var Audio3d = {

	// set the overall volume boost (1 = normal)
	volumeLevel : 6,
	webAudioEnabled : typeof( (window.AudioContext || window.webkitAudioContext) ) != 'undefined',
	compressor: null,
	paused : false,

	// initialize audio listener and return an array of audio elements
	initAudio : function(pathArray, cam) {
		var arr = [];

		// if there is web audio, use 3d panner
		// else {
			if (!this.listener) {
				this.listener = new THREE.AudioListener();
			}

			this.compressor = this.listener.context.createDynamicsCompressor();
			this.compressor.knee.value = 32;
			this.compressor.ratio.value = 4;
			this.compressor.threshold.value = -48;
			this.masterGain = this.listener.context.createGain();
			this.masterGain.gain.value = this.volumeLevel;
			this.compressor.connect(this.masterGain);
			this.masterGain.connect(this.listener.context.destination);
			cam.add( this.listener );

		// }

		return arr;
	},

	// return an audio element
	addAudioToPosition : function(pathToAudio, pos) {

		if (!this.webAudioEnabled) {
			var a = new Audio();
			a.fadeIn = function() {
				$(a).animate({volume: 1}, 1000);
				a.on = true;
			};
			a.fadeOut = function() {
				$(a).animate({volume: 0}, 1000);
				a.on = false;
			};
			a.src = pathToAudio;
			a.isPlaying = false;
			a.on = false;
			a.setAttribute('loop', true);
			document.body.appendChild(a);
			a.hidden = true;
			// detect distances if web audio is not enabled
			a.position = new THREE.Vector3();
			a.position.x = pos.x;
			a.position.y = pos.y;
			a.position.z = pos.z;
			return a;
		}

		else {
			return this._makeThreeAudio(pathToAudio, pos, this.listener);
		}
	},

	/**
	 *  Returns -1 if no indexes are detected. Otherwise returns index
	 *  of the closest item to your position.
	 *
	 *  @param  {Array} meshArray Array of Meshes
	 *  @param  {Vec3} myPos       vec3 x y z position
	 *  @return {Number}             -1 or the index of the closest item in array
	 */
	detectDistances : function(meshArray, myPos) {
		// play with this number to calibrate max distance to trigger sound
		var distanceThreshold = 8200;

		var maxDist = 100000;
		var closestItem = -1;

		var str = '';
		// console.log(myPos);
		for (var i = 0; i < audioList.length; i++) {
			var dist = myPos.distanceTo(meshArray[i].position);
			if (dist < distanceThreshold && dist < maxDist) {
				maxDist = dist;
				closestItem = i;
			}
			str += i + ' Dist: ' +dist;
		}
		// console.log(str);
		return closestItem;
	},

	// make a THREE.JS audio element and associate it with a mesh and listener
	// and TURN IT UP
	_makeThreeAudio : function(pathToAudio, pos, listener) {
		var snd = new THREE.Audio(listener);
		snd.gain.gain.value = 1.0;
		snd.gain.disconnect();
		snd.gain.connect(this.compressor);
		snd.setLoop(true);
		snd.on = false;
		snd.load(pathToAudio);
		snd.position.set(pos.x, pos.y, pos.z);
		// mesh.add(snd);
		scene.add(snd);
		return snd;
	},

	_startIOS : function() {

		// if web audio is enabled...
		if (this.webAudioEnabled) {
			this.listener = new THREE.AudioListener();
			var audioContext = this.listener.context;
			var iosStarted = false;

			var startIOS = function() {
				if (iosStarted) return;
				// create empty buffer
				var buffer = audioContext.createBuffer(1, 1, 22050);
				var source = audioContext.createBufferSource();
				source.buffer = buffer;

				source.connect(audioContext.destination);
				source.start(0);

				if (audioContext.state === 'running') {
					iosStarted = true;
				}
			};
			document.addEventListener('touchend', startIOS, false);
			document.addEventListener('touchstart', startIOS, false);
		}

	},

	fadeAllOut: function() {
		this.paused = true;
		if (this.webAudioEnabled) {
			for (var i = 0; i < audioList.length; i++) {
				if (audioList[i].isPlaying) {
					audioList[i].fadeOut();
					// audioList[i].stop();
				}
			}
		}
		else {
			for (var i = 0; i < audioList.length; i++) {
				audioList[i].fadeOut();
			}
		}
	},

	fadeAllIn: function() {
		this.paused = false;
		if (this.webAudioEnabled) {
			for (var i = 0; i < audioList.length; i++) {
				if (audioList[i].isPlaying) {
					audioList[i].fadeIn();
				}
			}
		}
		else {
			for (var i = 0; i < audioList.length; i++) {
				audioList[i].fadeIn();
			}
		}
	}

}
