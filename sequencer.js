var sequencer = function() {

	var ctx;
	var osc1;
	var osc2;
	var osc3;
	var osc4;
	var gain;
	var dest;
	var master;
	var oscs = [osc1, osc2, osc3, osc4];

	var kick = [0,0,0,0,0,0,0,0];
	var snare = [0,0,0,0,0,0,0,0];
	var hatClose = [0,0,0,0,0,0,0,0];
	var hatOpen = [0,0,0,0,0,0,0,0];

	var bar = 0;

	var _initSeq = function() {
		var array = [];
		for (var i = 0; i < 8; i++) {
			array.push(Math.floor(Math.random() * (2 - 0) + 0));
		}
		return array;
	};

	var kick = _initSeq();
	var snare = _initSeq();
	var hatClose = _initSeq();
	var hatOpen = _initSeq();
	var bpm = 140; // 使用予定

	var Sequencer = function() {
	};

	// create context
	var _initCtx = function () {
		try {
			ctx = new (window.AudioContext || window.webkitAudioContext)();
			_initNodes();
		} catch(e) {
			console.log('Web Audio API is not supported in this browser');
		}
	};

	var _initNodes = function(){
		gain = ctx.createGain();
		dest = ctx.destination;
		gain.connect(dest);
	}

	Sequencer.play = function() {

		for(bar = 0; bar < 8; bar++) {
			for (var i = 0; i < 8; i++) {

				if (kick[i] == 1) {
					_play1(i);
				}
				if (snare[i] == 1) {
					_play2(i);
				}
				if (hatClose[i] == 1) {
					_play3(i);
				}
				if (hatOpen[i] == 1) {
					_play4(i);
				}
			}
		}
	}

	Sequencer.stop = function() {
		_initNote();
	}

	Sequencer.chageNote = function(inst, num) {
		if (inst[num] === 0) {
			inst[num] = 1;
		} else {
			inst[num] = 0;
		}
	}

	var _play1 = function(seqNum) {
		var t0 = ctx.currentTime;
		osc1 = ctx.createOscillator();
		osc1.frequency.value = 300;
		osc1.connect(gain);
		osc1.start(t0 + 0 + (seqNum * 0.1) + (bar * 0.8));
		osc1.stop(t0 + 0.1 + (seqNum * 0.1) + (bar * 0.8));
	}

	var _play2 = function(seqNum) {
		var t0 = ctx.currentTime;
		osc2 = ctx.createOscillator();
		osc2.frequency.value = 500;
		osc2.connect(gain);
		osc2.start(t0 + 0 + (seqNum * 0.1) + (bar * 0.8));
		osc2.stop(t0 + 0.1 + (seqNum * 0.1) + (bar * 0.8));
	}

	var _play3 = function(seqNum) {
		var t0 = ctx.currentTime;
		osc3 = ctx.createOscillator();
		osc3.frequency.value = 1000;
		osc3.connect(gain);
		osc3.start(t0 + 0 + (seqNum * 0.1) + (bar * 0.8));
		osc3.stop(t0 + 0.1 + (seqNum * 0.1) + (bar * 0.8));
	}

	var _play4 = function(seqNum) {
		var t0 = ctx.currentTime;
		osc4 = ctx.createOscillator();
		osc4.frequency.value = 2000;
		osc4.connect(gain);
		osc4.start(t0 + 0 + (seqNum * 0.1) + (bar * 0.8));
		osc4.stop(t0 + 0.1 + (seqNum * 0.1) + (bar * 0.8));
	}

	Sequencer.play1 = function() {
		var t0 = ctx.currentTime;
		osc1 = ctx.createOscillator();
		osc1.frequency.value = 300;
		osc1.connect(gain);
		osc1.start(t0 + 0);
		osc1.stop(t0 + 0.1);
	}

	Sequencer.play2 = function() {
		var t0 = ctx.currentTime;
		osc2 = ctx.createOscillator();
		osc2.frequency.value = 500;
		osc2.connect(gain);
		osc2.start(t0 + 0);
		osc2.stop(t0 + 0.1);
	}

	Sequencer.play3 = function() {
		var t0 = ctx.currentTime;
		osc3 = ctx.createOscillator();
		osc3.frequency.value = 1000;
		osc3.connect(gain);
		osc3.start(t0 + 0);
		osc3.stop(t0 + 0.1);
	}

	Sequencer.play4 = function() {
		var t0 = ctx.currentTime;
		osc4 = ctx.createOscillator();
		osc4.frequency.value = 2000;
		osc4.connect(gain);
		osc4.start(t0 + 0);
		osc4.stop(t0 + 0.1);
	}

	Sequencer.kick = kick;
	Sequencer.snare = snare;
	Sequencer.hatClose = hatClose;
	Sequencer.hatOpen = hatOpen;

	_initCtx();

	return Sequencer;
}();