let target;
let aimbackground;
let score = 0;
var timeleft = 15;
var originaltime = 3;
let gameovermessage;
let gameoverscore;
let savescoremessage;
let newgame;
let controls;
let controls_button;
let control_text;
let info;
let info_button;
let info_text;
let show_controlls = false;
let show_info = false;

let playing = false;


let countdown;

document.body.style.cursor = 'crosshair'

function setup() {
	new Canvas(windowWidth, windowHeight);

	aimbackground = new Sprite;
	aimbackground.x = width / 2;
	aimbackground.y = height / 2;
	aimbackground.width = width / 2
	aimbackground.height = height;
	aimbackground.layer = -1;
	aimbackground.color = 'darkgray';
	aimbackground.collider = 'none';

	target = new Sprite;
	target.x = random(width / 4 + 25, width - width / 4 - 25);
	target.y = random(25, height - 25);
	target.width = 1;
	target.height = 1;
	target.collider = 'static';

	countdown = new Sprite;
	countdown.x = 170;
	countdown.y = 80;
	countdown.width = timeleft * 12;
	countdown.height = 30;
	countdown.color = 'green'

	controls = new Sprite;
	controls.img = '../../spillside/images/controller.png';
	controls.x = width - width / 8;
	controls.y = height/2 - 150;
	controls.width = 30;
	controls.height = 30;
	controls.collider = 'none';

	controls_button = new Sprite;
	controls_button.text = "Controlls";
	controls_button.color = 'lightblue';
	controls_button.textSize = 30;
	controls_button.x = width - width / 8;
	controls_button.y = height/2 - 80;
	controls_button.width = 150;
	controls_button.height = 50;
	controls_button.collider = 'none';

	info = new Sprite;
	info.img = '../../spillside/images/info.png';
	info.x = width / 8;
	info.y = height/2 - 150;
	info.width = 30;
	info.height = 30;
	info.collider = 'none';

	info_button = new Sprite;
	info_button.text = "Info";
	info_button.color = 'lightblue';
	info_button.textSize = 30;
	info_button.x = width / 8;
	info_button.y = height/2 - 80;
	info_button.width = 150;
	info_button.height = 50;
	info_button.collider = 'none';

	gameovermessage = new Sprite;
	gameovermessage.text = "No time left",
	gameovermessage.y = height / 2 - 100;
	gameovermessage.width = 1;
	gameovermessage.height = 1;
	gameovermessage.layer = -2;
	gameovermessage.collider = 'none';

	gameoverscore = new Sprite;
	gameoverscore.x = width / 2;
	gameoverscore.y = height / 2;
	gameoverscore.layer = -2;
	gameoverscore.width = 1;
	gameoverscore.height = 1;
	gameoverscore.collider = 'none';

	savescoremessage = new Sprite;
	savescoremessage.x = width / 2;
	savescoremessage.y = height / 2;
	savescoremessage.layer = -2;
	savescoremessage.width = 1;
	savescoremessage.height = 1;
	savescoremessage.collider = 'none';

	newgame = new Sprite;
	newgame.text = "Play again";
	newgame.x = width / 2;
	newgame.y = height / 2 + 100;
	newgame.width = 1;
	newgame.height = 1;
	newgame.layer = -2;
	newgame.color = 'green';
	newgame.collider = 'none'

	startgame = new Sprite;
	startgame.text = "Play game";
	startgame.textSize = 30;
	startgame.x = width / 2;
	startgame.y = height / 2;
	startgame.width = 200;
	startgame.height = 100;
	startgame.layer = 2;
	startgame.color = 'green';
}

function draw() {
	background('gray');

	if (mouse.presses() && mouseX > target.x - 15 && mouseX < target.x + 15 && mouseY > target.y - 15 && mouseY < target.y + 15 && playing == true) {
		target.remove();
		newbox();
		score += 1;
		if (originaltime > 0.2) originaltime -= 0.2;
		resetTime();
	}

	if (mouse.presses() && mouseX > controls_button.x - 75 && mouseX < controls_button.x + 75 && mouseY > controls_button.y - 25 && mouseY < controls_button.y + 25) {
		if (show_controlls == true) {
			control_text.remove();
			show_controlls = false;
		} else {
			control_text = new Sprite;
			control_text.text = "Aim trainer controlls: \n Sikting: bevegelse av mus\n Skyting: left klikk";
			control_text.color = 'lightgray';
			control_text.textSize = 24;
			control_text.x = width - width / 8;
			control_text.y = 400;
			control_text.width = width / 5;
			control_text.height = 150;
			//left aligne virker ikke
			//			control_text.textAlign = LEFT; 
			show_controlls = true;
		}
	}

	if (mouse.presses() && mouseX > info_button.x - 75 && mouseX < info_button.x + 75 && mouseY > info_button.y - 25 && mouseY < info_button.y + 25) {
		if (show_controlls == true) {
			info_text.remove();
			show_info = false;
		} else {
			info_text = new Sprite;
			info_text.text = "Aim trainer info: \n prøv å trykke på boxene \nså fort som mulig";
			info_text.color = 'lightgray';
			info_text.textSize = 24;
			info_text.x = width / 8;
			info_text.y = 400;
			info_text.width = width / 5;
			info_text.height = 150;
			//left aligne virker ikke
			//			control_text.textAlign = LEFT; 
			show_info = true;
		}
	}

	if (startgame && playing == false && mouse.presses() && mouseX > startgame.x - 75 && mouseX < startgame.x + 75 && mouseY > startgame.y - 40 && mouseY < startgame.y + 40) {
		timeleft = 15;
		originaltime = 3;
		playing = true;
		startgame.remove();
		target.remove();
		newbox();
	}

	if (newgame.layer == 1 && mouse.presses() && mouseX > newgame.x - 75 && mouseX < newgame.x + 75 && mouseY > newgame.y - 40 && mouseY < newgame.y + 40) {
		if (score > 0) {
			let xhr = new XMLHttpRequest();

			// 2. Configure it: GET-request for the URL /article/.../load
			xhr.open('GET', "../../spillside/includes/scorehandler.inc.php?spill=AIMTRAINER&poeng=" + score);

			// 3. Send the request over the network
			xhr.send();

			xhr.onload = function () {
				if (xhr.status != 200) { // analyze HTTP status of the response
					alert(`Error ${xhr.status}: ${xhr.statusText}`); // e.g. 404: Not Found
				}
			};
		}

		score = 0;
		timeleft = 15;
		originaltime = 3;
		newgame.layer = -2;
		gameovermessage.layer = -2;
		gameoverscore.layer = -2;
		savescoremessage.layer = -2;

		countdown = new Sprite;
		countdown.x = 170;
		countdown.y = 80;
		countdown.width = timeleft * 12;
		countdown.height = 30;
		countdown.color = 'green'

		playing = true;

		newbox();
	}

	textSize(30);

	if (timeleft <= 0 && playing == true) {
		gameovermessage.layer = 1;
		gameovermessage.textSize = 30;
		gameovermessage.text = "No time left";
		gameovermessage.x = width / 2;
		gameovermessage.y = height / 2 - 100;

		gameoverscore.layer = 1;
		gameoverscore.textSize = 30;
		gameoverscore.x = width / 2;
		gameoverscore.y = height / 2 - 65;
		gameoverscore.text = "You got " + score + " points";

		savescoremessage.layer = 1;
		savescoremessage.textSize = 30;
		savescoremessage.x = width / 2;
		savescoremessage.y = height / 2 - 25;
		savescoremessage.text = "Your score will be saved when you press the green button";

		newgame.layer = 1;
		newgame.width = 150;
		newgame.height = 80;
		newgame.textSize = 30;
		newgame.x = width / 2;
		newgame.y = height / 2 + 50;

		countdown.remove();
		target.remove();
	} else {
		text(Math.round(timeleft) + " seconds remaining", 20, 140);
	}
	text("your score: " + score, 20, 40);
	countdown.width = timeleft * 12;

}

function resetTime() {
	timeleft += originaltime;
}

setInterval(() => {
	if(playing == true) {
	timeleft -= 1;
	}
}, 1000);


function newbox() {
	target = new Sprite;
	target.x = random(width / 4 + 25, width - width / 4 - 25);
	target.y = random(25, height - 25);
	target.width = 30;
	target.height = 30;
	target.collider = 'static';

}