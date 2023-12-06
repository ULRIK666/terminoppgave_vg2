//objects
let kengeru;
let sand;
let cactus;
let cactie = [1];
//obastacle speed
let speed = -10;
let spawntime = 2000;
//score
let score = 0;
let scoreshift = 100;
let scorecount;
//game starter
let gamestarter;
//difficulty;
let easy;
let medium;
let hard;
//booleans
let night = false;
let playing = false;
let difficulty = 0;
var diffTime;

let controls;
let controls_button;
let control_text;
let show_controlls = false;

//document.getElementById('kengeru').style.display = 'none'

function setup() {
	new Canvas(windowWidth, windowHeight);
	world.gravity.y = 40;


	kengeru = new Sprite();
	kengeru.img = 'images/kengeru/light.png';
	kengeru.width = 150;
	kengeru.height = 150;
	kengeru.x = 100;
	kengeru.y = height - 150;

	sand = new Sprite;
	sand.x = width / 2;
	sand.y = height - 20;
	sand.width = width;
	sand.height = 100;
	sand.color = '##ffc400'
	sand.collider = 'static';

	scorecount = new Sprite;
	scorecount.x = 100;
	scorecount.y = 70;
	scorecount.width = 100;
	scorecount.height = 50;
	scorecount.color = 'white'
	scorecount.collider = 'none';

	gamestarter = new Sprite;
	gamestarter.x = width / 2;
	gamestarter.y = height / 2;
	gamestarter.width = width / 2;
	gamestarter.height = height / 2;
	gamestarter.color = 'white';
	gamestarter.collider = 'none';

	controls = new Sprite;
	controls.img = '../../spillside/images/controller.png';
	controls.x = width - width / 8;
	controls.y = 100;
	controls.width = 30;
	controls.height = 30;
	controls.collider = 'null';

	controls_button = new Sprite;
	controls_button.text = "Controlls";
	controls_button.color = 'lightblue';
	controls_button.textSize = 30;
	controls_button.x = width - width / 8;
	controls_button.y = 170;
	controls_button.width = 150;
	controls_button.height = 50;
	controls_button.collider = 'null';
	
	easy = new Sprite;
	easy.x = width / 2 - 200;
	easy.y = height / 2 + 75;
	easy.width = width / 8;
	easy.height = height / 8;
	easy.color = 'lightgreen';
	easy.collider = 'none';
	easy.textSize = 20;
	easy.text = "Easy";   

	medium = new Sprite;
	medium.x = width / 2;
	medium.y = height / 2 + 75;
	medium.width = width / 8;
	medium.height = height / 8;
	medium.color = 'yellow';
	medium.collider = 'none';
	medium.textSize = 20;
	medium.text = "Medium";

	hard = new Sprite;
	hard.x = width / 2 + 200;
	hard.y = height / 2 + 75;
	hard.width = width / 8;
	hard.height = height / 8;
	hard.color = '#ed3419';
	hard.collider = 'none';
    hard.textSize = 20;
	hard.text = "Hard";
}

function draw() {

	background('#3d80cd');
	//gray darker version

	kengeru.rotation = 0;

	if (mouse.presses() && mouseX > controls_button.x - 50 && mouseX < controls_button.x + 50 && mouseY > controls_button.y - 20 && mouseY < controls_button.y + 20) {
		if (show_controlls == true) {
			control_text.remove();
			show_controlls = false;
		} else {
			control_text = new Sprite;
			control_text.text = "NO INTERNETT controlls: \n Hopping: mellomrom";
			control_text.color = 'lightgray';
			control_text.textSize = 24;
			control_text.x = width - width / 8;
			control_text.y = 300;
			control_text.width = width / 5;
			control_text.height = height / 5;
			control_text.collider = 'null';
			//left aligne virker ikke
			//			control_text.textAlign = LEFT; 
			show_controlls = true;
		}
	}

	if (mouse.presses() && mouseX > easy.x - 90 && mouseX < easy.x + 90 && mouseY > easy.y - 40 && mouseY < easy.y + 40 && playing == false) {
		playing = true;
		difficulty = 1;
		speed = -8;
		spawntime = 3000;
		hard.remove();
		medium.remove();
		easy.remove();
		gamestarter.remove();
		setTimerEasy();
	}
	if (mouse.presses() && mouseX > medium.x - 90 && mouseX < medium.x + 90 && mouseY > medium.y - 40 && mouseY < medium.y + 40 && playing == false) {
		playing = true;
		difficulty = 2;
		speed = -11;
		spawntime = 2000;
		hard.remove();
		medium.remove();
		easy.remove();
		gamestarter.remove();
		setTimerMedium();

	}
	if (mouse.presses() && mouseX > hard.x - 90 && mouseX < hard.x + 90 && mouseY > hard.y - 40 && mouseY < hard.y + 40  && playing == false) {
		playing = true;
		difficulty = 3;
		speed = -14;
		spawntime = 1000;
		hard.remove();
		medium.remove();
		easy.remove();
		gamestarter.remove();
		setTimerHard();
	}


	if (kb.presses('space') && kengeru.y > 470 && playing == true) {
		//   (distance, direction, speed)
		console.log(kengeru.y);
		kengeru.vel.y = -20;
		if (night === false) {
			kengeru.img = 'images/kengeru/lightjump.png';

			setTimeout(() => {
				kengeru.img = 'images/kengeru/light.png';

			}, 1000);
		} else {
			kengeru.img = 'images/kengeru/darkjump.png';
			setTimeout(() => {
				kengeru.img = 'images/kengeru/dark.png';
			}, 1000);

		}
	}

	if (score > scoreshift) {
		if (night === false) {
			night = true;
		} else {
			night = false;
		}
		scoreshift += 100;
	}

	if (night === true) {
		background('#142b44');
		sand.color = '#b57000';

	}

	if (night === false) {
		background('#3d80cd');
		sand.color = '#ffc400';
	}

}

setInterval(() => {
	if (playing === true)
		score += 1;
	scorecount.text = "SCORE: " + score;
}, 100);


function setTimerEasy() {

	setInterval(() => {
		if (playing == true) {
			const randomValue = Math.floor(Math.random() * 8) + 1;
			const redorblue = Math.floor(Math.random() * 2) + 1;
			cactus = new Sprite;
			cactie.push(circle);

			cactus.x = width + 50;
			cactus.y = height - 130;
			if (night === false) cactus.img = 'images/kaktus/lightcactus.png';
			else cactus.img = 'images/kaktus/darkcactus.png';
			cactus.vel.x = speed;
			cactus.layer = 1;
			cactus.collider = 'none';
		}
	}, 3000);
}
function setTimerMedium() {

	setInterval(() => {
		if (playing == true) {
			const randomValue = Math.floor(Math.random() * 8) + 1;
			const redorblue = Math.floor(Math.random() * 2) + 1;
			cactus = new Sprite;
			cactie.push(circle);

			cactus.x = width + 50;
			cactus.y = height - 130;
			if (night === false) cactus.img = 'images/kaktus/lightcactus.png';
			else cactus.img = 'images/kaktus/darkcactus.png';
			cactus.vel.x = speed;
			cactus.layer = 1;
			cactus.collider = 'none';


			//	cleanup();
			//  cactus.collide(edge, remove);
		}
	}, 1800);
}
function setTimerHard() {

	setInterval(() => {
		if (playing == true) {
			const randomValue = Math.floor(Math.random() * 8) + 1;
			const redorblue = Math.floor(Math.random() * 2) + 1;
			cactus = new Sprite;
			cactie.push(circle);

			cactus.x = width + 50;
			cactus.y = height - 130;
			if (night === false) cactus.img = 'images/kaktus/lightcactus.png';
			else cactus.img = 'images/kaktus/darkcactus.png';
			cactus.vel.x = speed;
			cactus.layer = 1;
			cactus.collider = 'none';


			//	cleanup();
			//  cactus.collide(edge, remove);
		}
	}, 1200);
}

// setInterval(() => {
// 	if (playing == true) {
// 		const randomValue = Math.floor(Math.random() * 8) + 1;
// 		const redorblue = Math.floor(Math.random() * 2) + 1;
// 		cactus = new Sprite;
// 		cactie.push(circle);
// 
// 		cactus.x = width + 50;
// 		cactus.y = height - 130;
// 		if (night === false) cactus.img = 'images/kaktus/lightcactus.png';
// 		else cactus.img = 'images/kaktus/darkcactus.png';
// 		cactus.vel.x = speed;
// 		cactus.layer = 1;
// 		cactus.collider = 'none';
// 
// 
// 		//	cleanup();
// 		//  cactus.collide(edge, remove);
// 		console.log(diffTime)
// 	}
// }, 2000);  

/*
function cleanup() {
	cactie.forEach((c) => {
		let dist = Math.abs(edge.x - c.x);
		if (dist > width) {
			let i = cactie.indexOf(c);
			cactie.splice(i, 1);
			console.log("removing circle number " + i);
		}
	})
	printcacti();
}

function printcacti() {
	cactie.forEach((c) => {
		let dist = Math.abs(edge.x - c.x);
		let i = cactie.indexOf(c);
		console.log("i: " + i + " dist:" + dist);
	})
}*/