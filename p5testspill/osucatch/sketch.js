let player;
let border, floor;
let distance;
let avoiders;
let ball;
let health = 25;
let score = 0;

let controls;
let controls_button;
let control_text;
let info;
let info_button;
let info_text;
let show_controlls = false;
let show_info = false;

let playing = false;

function setup() {
	new Canvas(windowWidth, windowHeight);
	world.gravity.y = 10;

	avoiders = new Sprite;
	avoiders.width = 75;
	avoiders.height = 50;
	avoiders.x = width / 2;
	avoiders.y = 30;
	avoiders.color = 'red';

	ball = new Sprite();
	ball.diameter = 20;
	ball.x = avoiders.x;
	ball.y = avoiders.y - 50;

	//floor
	floor = new Sprite();
	floor.y = height - 20;
	floor.w = width;
	floor.h = 3;
	floor.color = 'red';
	floor.collider = 'static';
	//roof
	border = new Sprite();
	border.y = 2;
	border.w = width;
	border.h = 3;
	border.color = 'black';
	border.collider = 'static';
	//left wall
	border = new Sprite();
	border.x = 2;
	border.w = 3;
	border.h = height - 3;
	border.color = 'black';
	border.collider = 'static';
	//right wall
	border = new Sprite();
	border.x = width - 3;
	border.w = 3;
	border.h = height;
	border.color = 'black';
	border.collider = 'static';

	//floor
	border = new Sprite();
	border.y = 65;
	border.w = width;
	border.h = 3;
	border.color = 'black';
	border.collider = 'static';

	player = new Sprite;
	player.img = 'images/cart.png';
	player.height = 120;
	player.width = 150;
	player.y = height - 60;
	player.x = width / 2;

	controls = new Sprite;
	controls.img = '../../spillside/images/controller.png';
	controls.x = width - width / 8;
	controls.y = 110;
	controls.width = 30;
	controls.height = 30;
	controls.collider = 'null';

	controls_button = new Sprite;
	controls_button.text = "Controlls";
	controls_button.color = 'lightblue';
	controls_button.textSize = 30;
	controls_button.x = width - width / 8;
	controls_button.y = 180;
	controls_button.width = 150;
	controls_button.height = 50;
	controls_button.collider = 'null';

	info = new Sprite;
	info.img = '../../spillside/images/info.png';
	info.x = width - width / 8;
	info.y = height / 2 + 70;
	info.width = 30;
	info.height = 30;
	info.collider = 'none';

	info_button = new Sprite;
	info_button.text = "Info";
	info_button.color = 'lightblue';
	info_button.textSize = 30;
	info_button.x = width - width / 8;
	info_button.y = height / 2 + 140;
	info_button.width = 150;
	info_button.height = 50;
	info_button.collider = 'none';

	startgame = new Sprite;
	startgame.text = "Play game";
	startgame.textSize = 30;
	startgame.x = width / 2;
	startgame.y = height / 2;
	startgame.width = 200;
	startgame.height = 100;
	startgame.layer = 2;
	startgame.color = 'green';
	startgame.collider = 'null';

}


function draw() {
	background('gray');

	if (startgame && playing == false && mouse.presses() && mouseX > startgame.x - 75 && mouseX < startgame.x + 75 && mouseY > startgame.y - 40 && mouseY < startgame.y + 40) {
		playing = true;
		avoiders.x = width / 2;
		player.x = width / 2;

		startgame.remove();
		info.remove();
		info_button.remove();
		controls.remove();
		controls_button.remove();
		if (show_controlls == true) {
			info_text.remove();
		}
		if (show_controlls == true) {
			control_text.remove();
		}


	}

	if (mouse.presses() && mouseX > controls_button.x - 75 && mouseX < controls_button.x + 75 && mouseY > controls_button.y - 25 && mouseY < controls_button.y + 25) {
		if (show_controlls == true) {
			control_text.remove();
			show_controlls = false;
		} else {
			control_text = new Sprite;
			control_text.text = "CATCHE'M ALL  controlls: \n Gå mot venstre: pil venstre \n Gå mot høyere: pil høyere \n Dash/gå fortere: shift";
			control_text.color = 'lightgray';
			control_text.textSize = 24;
			control_text.x = width - width / 8;
			control_text.y = 300;
			control_text.width = width / 5;
			control_text.height = height / 5;
			control_text.collider = 'null';
			show_controlls = true;
		}
	}


	if (mouse.presses() && mouseX > info_button.x - 75 && mouseX < info_button.x + 75 && mouseY > info_button.y - 25 && mouseY < info_button.y + 25) {
		if (show_info == true) {
			info_text.remove();
			show_info = false;
		} else {
			info_text = new Sprite;
			info_text.text = "CATCHE'M ALL info: \n ta imot de fallene sirklene, \n for å få poeng, hvis noen faller \n i bakken vil du miste ett liv";
			info_text.color = 'lightgray';
			info_text.textSize = 24;
			info_text.x = width - width / 8;
			info_text.y = height / 2 + 250;
			info_text.width = width / 5 + 20;
			info_text.height = 150;
			info_text.collider = 'none';

			show_info = true;
		}
	}


	if (kb.pressing('left')) {
		if (kb.pressing('shift')) {
			player.vel.x = -15;
		} else {
			player.vel.x = -7;
		}
	}
	else if (kb.pressing('right')) {
		if (kb.pressing('shift')) {
			player.vel.x = 15;
		} else {
			player.vel.x = 7;
		}
	} else {
		player.vel.x = 0;
	}

	if (health <= 0 && playing == true) {
		if (score > 0) {
			let xhr = new XMLHttpRequest();

			// 2. Configure it: GET-request for the URL /article/.../load
			xhr.open('GET', "../../spillside/includes/scorehandler.inc.php?spill=CATCHE'M ALL&poeng=" + score);

			// 3. Send the request over the network
			xhr.send();

			xhr.onload = function () {
				if (xhr.status != 200) { // analyze HTTP status of the response
					alert(`Error ${xhr.status}: ${xhr.statusText}`); // e.g. 404: Not Found
				}
			};

		}
		score = 0;
		health = 25;
		playing = false
		notPlaying();
	}
	fill(0);
	textSize(40);
	text(`Score: ${score}`, 10, 100);
	text(`health: ${health}`, 10, 180);
	health = constrain(health, 0, 100); // Ensure health stays within 0 to 100
	drawHealthBar(10, 200, 200, 20, health, 25);
}

setInterval(() => {
	if (playing == true) {
		ball = new Sprite();
		ball.diameter = Math.floor(Math.random() * ((25 - 8) + 1) + 10)
		ball.x = random((avoiders.x - 40), (avoiders.x + 40));
		ball.y = random(avoiders.y + 40, avoiders.y + 60);
		// gems.amount = 2;

		ball.collide(player, collect);
		ball.collide(floor, healthbar);
	}

}, 100);

setInterval(() => {
	if (playing == true) {
		if (avoiders.x > width - 200) {
			avoiders.speed = random(-8, -15);
		} else if (avoiders.x < 200) {
			avoiders.speed = random(8, 15);
		} else {
			avoiders.speed = random(random(8, 12), random(-8, -12));
		}
	}
}, 1000);

function notPlaying() {
	startgame = new Sprite;
	startgame.text = "Play game";
	startgame.textSize = 30;
	startgame.x = width / 2;
	startgame.y = height / 2;
	startgame.width = 200;
	startgame.height = 100;
	startgame.layer = 2;
	startgame.color = 'green';
	startgame.collider = 'null';


	controls = new Sprite;
	controls.img = '../../spillside/images/controller.png';
	controls.x = width - width / 8;
	controls.y = 110;
	controls.width = 30;
	controls.height = 30;
	controls.collider = 'null';

	controls_button = new Sprite;
	controls_button.text = "Controlls";
	controls_button.color = 'lightblue';
	controls_button.textSize = 30;
	controls_button.x = width - width / 8;
	controls_button.y = 180;
	controls_button.width = 150;
	controls_button.height = 50;
	controls_button.collider = 'null';

	info = new Sprite;
	info.img = '../../spillside/images/info.png';
	info.x = width - width / 8;
	info.y = height / 2 + 70;
	info.width = 30;
	info.height = 30;
	info.collider = 'none';

	info_button = new Sprite;
	info_button.text = "Info";
	info_button.color = 'lightblue';
	info_button.textSize = 30;
	info_button.x = width - width / 8;
	info_button.y = height / 2 + 140;
	info_button.width = 150;
	info_button.height = 50;
	info_button.collider = 'none';
}

function drawHealthBar(x, y, width, height, current, max) {
	// Calculate the width of the green (health) bar
	let healthBarWidth = (current / max) * width;

	// Draw the red (missing health) bar
	fill(255, 0, 0);
	rect(x, y, width, height);

	// Draw the green (health) bar
	fill(0, 255, 0);
	rect(x, y, healthBarWidth, height);
}


function collect(ball, player) {
	if (playing == true) {
		let pointText = "+1 point";
		let textX = ball.x;
		let textY = ball.y - 20; // Display the text just above the ball's position

		fill('green');
		text(pointText, textX, textY); // Use the correct variable name

		setTimeout(() => {
			pointText = ""; // Clear the text after 2 seconds
		}, 2000);

		ball.remove();
		score += 1;
	}
}


function healthbar(ball, floor) {
	let damageText = "-1 health";
	let textX = ball.x;
	let textY = ball.y - 20; // Display the text just above the ball's position

	fill('red');
	text(damageText, textX, textY);

	setTimeout(() => {
		damageText = ""; // Clear the text after 2 seconds
	}, 2000);

	ball.remove();
	health -= 1;
}
