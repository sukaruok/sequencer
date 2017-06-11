var changeNoteColor = function(){
	// eventでクリックした要素を取得
	if (event.target.innerHTML === "1") {
		event.target.innerHTML = "0";
		event.target.style.backgroundColor = '#ffffff';
	} else {
		event.target.innerHTML = "1";
		event.target.style.backgroundColor = '#6699ff';
	}
	changeSeq();
}

var changeColor = function() {
	var i = 0;
	var bar = 0;

	return function() {
		var str1 = ".column" + i;
		if (i === 0) {
			var str2 = ".column" + 7;
		} else {
			var str2 = ".column" + (i - 1);
		}

		document.querySelector(str1).style.backgroundColor = 'red';
		document.querySelector(str2).style.backgroundColor = '#ffffff';

		if(i === 7) {
			i = 0;
		} else {
			i++;
		}

		if (bar === 64) {
			clearInterval(timer);
			document.querySelector(str1).style.backgroundColor = '#ffffff';
			bar = 0;
		} else {
			bar++;
		}
	};
}();

var changeSeq = function() {
	var notes = document.querySelectorAll('.note');
	for(var i = 0; i < notes.length; i++) {
		if (i < 8) {
			sequencer.kick[i] = parseInt(notes[i].innerHTML);
		}

		if (8 <= i && i < 16 ) {
			sequencer.snare[i - 8] = parseInt(notes[i].innerHTML);
		}

		if (16 <= i && i < 24) {
			sequencer.hatClose[i - 16] = parseInt(notes[i].innerHTML);
		}

		if (24 <= i && i < 32) {
			sequencer.hatOpen[i - 24] = parseInt(notes[i].innerHTML);
		}
	}
}

var initSeq = function() {
	var notes = document.querySelectorAll('.note');
	for (var i = 0; i < notes.length; i++) {
		if (notes[i].innerHTML === "1") {
			notes[i].style.backgroundColor = '#6699ff';
		} else {
			notes[i].style.backgroundColor = '#ffffff';
		}

		// functionで囲まなければならない理由がわからない
		notes[i].addEventListener("click", function(){
			changeNoteColor();
		});
	}
}

var flg = true;
var timer;

(function() {
	// GUI
	document.querySelector('#play').addEventListener("click", function() {
		sequencer.play();
		timer = setInterval(changeColor, 100);
	});

	document.querySelector('#stop').addEventListener("click", function() {
		flg = false;
	});

	document.querySelector('#play1').addEventListener("click", function() {
		sequencer.play1();
	});

	document.querySelector('#play2').addEventListener("click", function() {
		sequencer.play2();
	});

	document.querySelector('#play3').addEventListener("click", function() {
		sequencer.play3();
	});

	document.querySelector('#play4').addEventListener("click", function() {
		sequencer.play4();
	});

	(function() {
		var html = "<div class='seq-area'>";

		html += "<p class='seq-row clearfix'>";
		html += "<span class='seq-row-space'></span>";
		for (var i = 0; i < 8; i++) {
			html += "<span class=" + "column" + i + ">" + "0" + "</span>";
		}

		html += "</p>";
		html += "<p class='row row1 clearfix'>";
		html += "<span class='inst'>kick</span>";

		for (var i = 0; i < 8; i++) {
			html += "<span class='note'>" + sequencer.kick[i] + "</span>";
		}

		html += "</p>";
		html += "<p class='row row2 clearfix'>";
		html += "<span class='inst'>snare</span>";

		for (var i = 0; i < 8; i++) {
			html += "<span class='note'>" + sequencer.snare[i] + "</span>";
		}

		html += "</p>";
		html += "<p class='row row3 clearfix'>";
		html += "<span class='inst'>hatOpen</span>";

		for (var i = 0; i < 8; i++) {
			html += "<span class='note'>" + sequencer.hatClose[i] + "</span>";
		}

		html += "</p>";
		html += "<p class='row row4 clearfix'>";
		html += "<span class='inst'>hatClose</span>";

		for (var i = 0; i < 8; i++) {
			html += "<span class='note'>" + sequencer.hatOpen[i] + "</span>";
		}

		html += "</p>";
		html += "</div>";

		document.querySelector('#seq').innerHTML = html;
	}());
	initSeq();
}());