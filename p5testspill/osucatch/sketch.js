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
let show_controlls = false;

function setup() {
	new Canvas(windowWidth, windowHeight);
	world.gravity.y = 10;

	avoiders = new Sprite;
	avoiders.width = 75;
	avoiders.height = 50;
	avoiders.x = random(350, width - 350);
	avoiders.y = 30;
	avoiders.color = 'red';

	ball = new Sprite();
	ball.diameter = 20;
	ball.x = avoiders.x;
	ball.y = avoiders.y - 50;

	//floor
	floor = new Sprite();
	floor.y = height-20	;
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
}


function draw() {
	background('gray');

	if (mouse.presses() && mouseX > controls_button.x - 50 && mouseX < controls_button.x + 50 && mouseY > controls_button.y - 20 && mouseY < controls_button.y + 20) {
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
			//left aligne virker ikke
			//			control_text.textAlign = LEFT; 
			show_controlls = true;
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
	}	else {
		player.vel.x = 0;
	}

	if (health <= 0) {
		if(score > 0){ 
		let xhr = new XMLHttpRequest();

		// 2. Configure it: GET-request for the URL /article/.../load
		xhr.open('GET', "../../spillside/includes/scorehandler.inc.php?spill=CATCHE'M ALL&poeng="+score);

		// 3. Send the request over the network
		xhr.send();

		xhr.onload = function() {
			if (xhr.status != 200) { // analyze HTTP status of the response
			  alert(`Error ${xhr.status}: ${xhr.statusText}`); // e.g. 404: Not Found
			} 
		  };

		}
		score = 0;
		health = 25;
	}

	fill(0);
	textSize(40);
	text(`Score: ${score}`, 10, 100);	
	text(`health: ${health}`, 10, 180);	
	health = constrain(health, 0, 100); // Ensure health stays within 0 to 100
	drawHealthBar(10, 200, 200, 20, health, 25);
}

setInterval(() => {
	ball = new Sprite();
	ball.diameter = Math.floor(Math.random() * ((25 - 8) +1) + 10)
	ball.x = random((avoiders.x - 40), (avoiders.x + 40));
	ball.y = random(avoiders.y + 40, avoiders.y + 60);
	// gems.amount = 2;

	ball.collide(player, collect);
	ball.collide(floor, healthbar);

}, 100);

setInterval(() => {
	if (avoiders.x > width - 200) {
		avoiders.speed = random(-8, -15);
	} else if (avoiders.x < 200) {
		avoiders.speed = random(8, 15);
	} else {
		avoiders.speed = random(random(8, 12), random(-8, -12));
	}
}, 1000);


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
