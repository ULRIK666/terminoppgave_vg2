//moving circles
let circle;
let circles = [1];
let smallball = 75;
//where supposed to click
let drumleft, drumright;
let outerleft, outerright;
let hitcircle;
//background path for circles
let path, edge, hitline, box;
let animation;
//speed
let speed = -30;

let textbox;
let bestdiameter, bestcolor;
const BIG_DIAMETER = 125;
const SMALL_DIAMETER = 75;

let img;
let hiterror;
let hiterrorline;

function setup() {
	new Canvas(1422, 630);
	frameRate(300);

	path = new Sprite;
	path.width = width;
	path.height = 225;
	path.y = 200;
	path.color = 'grey';
	path.collider = 'none';
	path.layer = -4;

	edge = new Sprite;
	edge.width = 5;
	edge.height = 225;
	edge.y = 200;
	edge.x = 302;
	edge.layer = 1;
	edge.color = 'black';
	edge.collider = 'none';

	box = new Sprite;
	box.width = 300;
	box.height = 225;
	box.y = 200;
	box.x = 150;
	box.color = 'white';
	box.collider = 'none';
	box.layer = 10;

	//box content
	outerleft = new Sprite;
	outerleft.img = 'images/drum.png';
	outerleft.y = 200;
	outerleft.x = box.width / 2 - 43;
	outerleft.color = 'gray';
	outerleft.collider = 'none';
	outerleft.layer = 10;

	outerright = new Sprite;
	outerright.img = 'images/right_drum.png';
	outerright.y = 200;
	outerright.x = box.width / 2 + 43;
	outerright.color = 'gray';
	outerright.collider = 'none';
	outerright.layer = 10;

	drumleft = new Sprite;
	drumleft.img = 'images/right_inside_drum.png';
	drumleft.y = 200;
	drumleft.x = box.width / 2 + 43;
	drumleft.color = 'gray';
	drumleft.collider = 'none';
	drumleft.layer = 10;

	drumright = new Sprite;
	drumright.img = 'images/left_inside_drum.png';
	drumright.y = 200;
	drumright.x = box.width / 2 - 43;
	drumright.color = 'gray';
	drumright.collider = 'none';
	drumright.layer = 10;


	//where to hit
	hitcircle = new Sprite;
	hitcircle.diameter = 90;
	hitcircle.y = 200;
	hitcircle.x = 400;
	hitcircle.color = '#D3D3D3';
	hitcircle.collider = 'none';
	hitcircle.layer = -2;

	hitcircle = new Sprite;
	hitcircle.diameter = SMALL_DIAMETER;
	hitcircle.y = 200;
	hitcircle.x = 400;
	hitcircle.color = '#white';
	hitcircle.collider = 'none';
	hitcircle.layer = -2;

	hitline = new Sprite;
	hitline.width = 3;
	hitline.height = 225;
	hitline.y = 200;
	hitline.x = 400;
	hitline.color = 'black';
	hitline.collider = 'none';
	hitline.layer = -3;

	textbox = new Sprite;
	textbox.x = hitline.x;
	textbox.y = height / 2 + 100;
	textbox.width = 200;
	textbox.height = 100;
	textbox.color = 'red'

	img = new Sprite;
	img.x = hitline.x;
	img.y = height / 2 + 100;
	img.img = 'images/tekstresultat/perfect.png';

	hiterror = new Sprite;
	hiterror.x = width / 2;
	hiterror.y = height - 20;
	hiterror.width = 500;
	hiterror.height = 60;
	hiterror.color = 'white'
}

//img.style('display') = none | inherit

function draw() {
	let d, t;
	background('black');

	if (kb.pressing('l')) {
		outerright.img = 'images/right_drum_blue.png';
		d = bestdistance();
		//		if (bestdiameter == BIG_DIAMETER && bestcolor == 'blue') {
		t = scoring(d);
		textbox.text = t + d;
		//}
	} else {
		outerright.img = 'images/right_drum.png';
	}

	if (kb.pressing('d')) {
		outerleft.img = 'images/blue_drum_left.png';
		d = bestdistance();
		t = scoring(d);
		textbox.text = t + d;
	} else {
		outerleft.img = 'images/drum.png';
	}

	if (kb.pressing('k')) {
		drumleft.img = 'images/right_inside_drum_red.png';
		d = bestdistance();
		t = scoring(d);
		textbox.text = t + d;

	} else {
		drumleft.img = 'images/right_inside_drum.png';
	}

	if (kb.pressing('f')) {
		drumright.img = 'images/left_inside_drum_red.png';
		d = bestdistance();
		t = scoring(d);
		textbox.text = t + d;
	} else {
		drumright.img = 'images/left_inside_drum.png';
	}

}

function draw_hit_error(dist) {
	let x = width/2 + dist;
	stroke("red");
	line(x, 400, x, 600);


/*
		hiterrorline.x = width/2 + d * 1.30 + random(-5,5);
		hiterrorline.y = height - 20;
		hiterrorline.width = 2;
		hiterrorline.height = 60;
		hiterrorline.collider = 'none';
		hiterrorline.color = 'gray';
		*/

}

function scoring(dist) {
	let txt = "miss";
	let absdist = Math.abs(dist);
	draw_hit_error(dist);
	textbox.color = "grey"
	if (absdist < 200) {
		txt = "bad";
		textbox.color = "lightgray";
		img.img = 'images/tekstresultat/bad.png';
	}
	if (absdist < 150) {
		txt = "okay";
		textbox.color = "blue";
		img.img = 'images/tekstresultat/okay.png';
	}
	if (absdist < 125) {
		txt = "good";
		textbox.color = "cyan";
		img.img = 'images/tekstresultat/good.png';
	}
	if (absdist < 75) {
		txt = "great";
		textbox.color = "yellow";
		img.img = 'images/tekstresultat/great.png';
	}
	if (absdist < 50) {
		txt = "perfect";
		textbox.color = "lightgreen";
		img.img = 'images/tekstresultat/perfect.png';
	}
	return (txt);
}


function bestdistance() {
	let best = 9999;
	bestdiameter = 9999;
	bestcolor = null;
	circles.forEach((c) => {
		let dist = edge.x - c.x;
		if (Math.abs(dist) < best) {
			best = dist;
			bestcolor = c.color;
			bestdiameter = c.diameter;
		}
	})
	return (best);
}

setInterval(() => {
	const randomValue = Math.floor(Math.random() * 8) + 1;
	const redorblue = Math.floor(Math.random() * 2) + 1;
	circle = new Sprite;
	circles.push(circle);

	circle.x = width + 50;
	circle.y = 200;
	circle.vel.x = speed;
	circle.layer = -1;
	if (randomValue === 1) {
		if (redorblue === 1) {
			circle.diameter = BIG_DIAMETER;
			circle.color = 'red';
		} else {
			circle.diameter = BIG_DIAMETER;
			circle.color = 'blue';
		}
		circle = new Sprite;
		circle.x = width + 50;
		circle.y = 200;
		circle.vel.x = speed;
		circle.layer = -2;
		circle.diameter = 140;
		circle.color = 'white';

	} else {
		if (redorblue === 1) {
			circle.diameter = SMALL_DIAMETER;
			circle.color = 'red';
		} else {
			circle.diameter = SMALL_DIAMETER;
			circle.color = 'blue';
		}
		circle = new Sprite;
		circle.x = width + 50;
		circle.y = 200;
		circle.vel.x = speed;
		circle.layer = -2;
		circle.diameter = 90;
		circle.color = 'white';

	}

	cleanup();
	//  circle.collide(edge, remove);
}, 1000);
/*
function remove(circle, edge) {    
	circle.(remove);
  }*/

function cleanup() {
	circles.forEach((c) => {
		let dist = Math.abs(edge.x - c.x);
		if (dist > width) {
			let i = circles.indexOf(c);
			circles.splice(i, 1);
			console.log("removing circle number " + i);
		}
	})
	printcircles();
}

function printcircles() {
	circles.forEach((c) => {
		let dist = Math.abs(edge.x - c.x);
		let i = circles.indexOf(c);
		console.log("i: " + i + " dist:" + dist);
	})
}
///////////////////////////////////////////////////
//stem roller

//drum sounds

//https://mixkit.co/free-sound-effects/drum/
//hand tribal drum
//https://mixkit.co/free-sound-effects/drum/?page=2
//tribaly dry drum