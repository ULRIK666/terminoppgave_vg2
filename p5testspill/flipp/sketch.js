let ball;
let floor, wall, triangle, spike;
let flipper1, flipper2;
let coin;
let score = 0;
let isGameOver = false;

function setup() {
	new Canvas(475, 500);
	world.gravity.y = 10;

	ball = new Sprite();
	ball.diameter = 50;
	ball.x = random(20, (width - 20));
	ball.y = 20;

	coin = new Sprite();
	coin.color = 'yellow';
	coin.diameter = 30;
	coin.x = random(20, (width - 70));
	coin.y = random(300, 50);
	coin.collider = 'static';

	floor = new Sprite();
	floor.y = height - 50;
	floor.w = width;
	floor.h = 100;
	floor.x = width - 70;
	floor.rotation = -40;
	floor.collider = 'static';

	floor = new Sprite();
	floor.y = height - 50;
	floor.w = width;
	floor.h = 100;
	floor.x = 70;
	floor.rotation = 40;
	floor.collider = 'static';

	wall = new Sprite();
	wall.w = 3;
	wall.h = height;
	wall.x = 0;
	wall.collider = 'static';

	wall = new Sprite();
	wall.w = 3;
	wall.h = height;
	wall.x = width;
	wall.collider = 'static';

	wall = new Sprite();
	wall.w = width;
	wall.h = 3;
	wall.y = 0;
	wall.collider = 'static';

	spike = new Sprite();
	spike.y = height - 5;
	spike.w = 150;
	spike.h = 2;
	spike.collider = 'static';

	triangle = new Sprite(250, 100, [
		[40, 20],
		[-40, 20],
		[0, -40]
	]);
	triangle.collider = 'static'
	triangle.y = 50;
	triangle.rotation = -90;

	flipper1 = new Sprite(160, 400, [
		[0, -25],
		[-100, 12.5],
		[0, 25],
		[100, 12.5],
		[0, -25]
	], 'k');

	flipper1.addCollider(-60, 0, 25);
	flipper1.addCollider(40, 0, 50);

	flipper1.x = width - 100;
	flipper1.y = height - 60;
	flipper1.offset.x = -40;
	flipper1.rotation = -20;
	flipper1.debug = true;

	flipper2 = new Sprite(160, 400, [
		[0, -25],
		[100, 12.5],
		[0, 25],
		[-100, 12.5],
		[0, -25]
	], 'k');

	flipper2.addCollider(60, 0, 25);
	flipper2.addCollider(-40, 0, 50);

	flipper2.x = 100;
	flipper2.y = height - 60;
	flipper2.offset.x = 40;
	flipper2.rotation = -20;
	flipper2.debug = true;

}

function draw() {
	background(16);

	if (kb.pressing('right')) {
		flipper1.rotateTo(20, 8);
	} else {
		flipper1.rotateTo(-20, 8);
	}

	if (kb.pressing('left')) {
		flipper2.rotateTo(-20, 8);
	} else {
		flipper2.rotateTo(20, 8);
	}

	if (ball.collides(coin)) {
		coin.x = random(20, (width - 20));
		coin.y = random(300, 50);
		score += 1;
	}


	if (ball.collides(spike)) {
		textSize(50);
		fill(255, 0, 0);
		text("Game Over", width / 2 - 100, height / 2);
		if (score > 0) {
			let xhr = new XMLHttpRequest();

			// 2. Configure it: GET-request for the URL /article/.../load
			xhr.open('GET', "../../spillside/includes/scorehandler.inc.php?spill=FLIPPER&poeng=" + score);

			// 3. Send the request over the network
			xhr.send();

			xhr.onload = function () {
				if (xhr.status != 200) { // analyze HTTP status of the response
					alert(`Error ${xhr.status}: ${xhr.statusText}`); // e.g. 404: Not Found
				} else { // show the result
					//alert(`Done, got ${xhr.response.length} bytes . content= ${xhr.responseText} . score=`+score); // response is the server response
					alert(`Highscore ble sendt inn, du fikk ` + score + ` poeng`); // response is the server response
				}
			};

		}
		setTimeout(() => {
			isGameOver = true;
			ball.x = random(20, (width - 20));
			ball.y = 20;
			score = 0;
		}, "1000");

	} else {
		textSize(16);
		fill(255);
		text("Score: " + score, 20, 20);
	}

}
/*
	if (!isGameOver) {
		// Calculate the time elapsed in seconds
		let currentTime = millis() / 1000;
		if (currentTime - lastTime >= 1) {
			score += 1; // Increase score every second
			lastTime = currentTime;
		}
		
				for (let circle of circles) {
				  circle.update();
				  circle.display();
				  if (cube.hits(circle)) {
					isGameOver = true;
				  }
				}
		
		textSize(16);
		fill(255);
		text("Score: " + score, 20, 20);
	} else {
		textSize(50);
		fill(255, 0, 0);
		text("Game Over", width / 2 - 100, height / 2);

		// Save the score to local storage
		localStorage.setItem('gameScore', score);
	}
}
*/