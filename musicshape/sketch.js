var notes = []; //array of notes
var labels = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
var frequencies = [261.626, 277.18, 293.665, 311.127, 329.628, 349.228, 369.994, 391.995, 415.305, 440.000, 466.164, 493.883]
var bc = 10;


function setup() {
	createCanvas(400, 400);
	colorMode(HSB, 100);
	for (var i=0; i<12; i++) {
		notes.push(new Note(i * TWO_PI/12, frequencies[i]));
}
}

function draw() {
//Draws background and steps through colour
	background(bc % 100, 75, 75);
	if (bc <= 100){
		bc = bc + 0.01
	} else{
		bc = 0
	}

//Draws the Shape
	push();
	translate(width/2, height/2);
	stroke(100);
	strokeWeight(3);
	fill((bc + 50) % 100,100,100,50);
	beginShape()
	for (var i=0; i<notes.length; i++){
	if(notes[i].on == true){
		vertex(notes[i].x, notes[i].y);
		}
	}
	endShape(CLOSE);
	pop();

//Draw the notes
	for (var i=0; i<notes.length; i++){
		notes[i].show();
		notes[i].tone();
	}
//Draw the labels
	for (var i=0; i<labels.length; i++){
		push();
		translate(width/2, height/2);
		textAlign(CENTER, CENTER);
		textFont('Verdana');
		text(labels[i], notes[i].x, notes[i].y);
		pop();
	}
}




//Mouse pressed
function mousePressed(){
	for (var i=0; i<notes.length; i++){
	notes[i].clicked(mouseX, mouseY);
	}
}


//Note Class
class Note {
	constructor(a, f) {
		this.x = 150 * cos(a);
		this.y = 150 * sin(a);
		this.a = a;
		this.on = false;

		this.osc = new p5.Oscillator();
		this.osc.setType('sine');
		this.osc.amp(0);
		this.osc.freq(f);
		this.osc.start();
		this.env = new p5.Env();
		this.env.setADSR(0.1,1,0.3,1);


	}
	show(){
		push();
		translate(width/2, height/2);
		ellipseMode(CENTER);
		noStroke();
		if (this.on == true){
			fill((bc + 50) % 100,100,100);
		} else
		fill(255);
		ellipse(this.x, this.y, 30, 30);
		pop();
	}

	tone(){

		if (this.on == true){
			this.env.play(this.osc)
		}else{
		this.osc.amp(0);
		}


	}


	clicked(mx, my){
		let d = dist (mx - width/2, my - height/2 , this.x, this.y);
		if (d < 30) {
			this.on = !this.on;
			console.log(this.osc.freq)
		}
	}
}
