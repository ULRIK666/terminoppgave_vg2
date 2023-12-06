let player;
let border;
let levelbar;

let enemy, rightarm, leftarm, animation;
let laserballs;
let warning;
let ekstrarightarm, ekstraleftarm;
let laserlaunchball;
let laserlauncheballs;
let fallinglaserballs;

let gamestarter;
let cycles = 0; // Declare cycles in a broader scope

let playing = false;
let counter = 0;
let level = 0;

let maxHealth = 10; // Maximum health
let currentHealth = maxHealth; // Current health
let healthBarWidth = 200; // Width of the health bar
let healthBarHeight = 20; // Height of the health bar
let healthBarX = 20; // X-coordinate of the health bar
let healthBarY = 80; // Y-coordinate of the health bar


function setup() {
	createCanvas(windowWidth - 5, windowHeight - 5);

	gamestarter = new Sprite();
	gamestarter.x = width / 2;
	gamestarter.y = height / 2;
	gamestarter.width = 150;
	gamestarter.height = 50;
	gamestarter.text = "Start new game";
	gamestarter.color = 'gray';
	gamestarter.collider = 'rect'; // Use 'rect' for a rectangular collider

	gamestarter.onMousePressed = function () {
		if (!playing) {
			playing = true;
			console.log("Game started");
		}
	};

	let borderThickness = 3;

	laserballs = new Group();
	laserlauncheballs = new Group();
	fallinglaserballs = new Group();

	// Bottom border
	let bottomBorder = new Sprite();
	bottomBorder.width = width;
	bottomBorder.height = borderThickness;
	bottomBorder.x = width / 2;
	bottomBorder.y = height - borderThickness / 2;
	bottomBorder.color = 'black';
	bottomBorder.collider = 'static';

	// Top border
	let topBorder = new Sprite();
	topBorder.width = width;
	topBorder.height = borderThickness;
	topBorder.x = width / 2;
	topBorder.y = borderThickness / 2;
	topBorder.color = 'black';
	topBorder.collider = 'static';

	// Right border
	let rightBorder = new Sprite();
	rightBorder.width = borderThickness;
	rightBorder.height = height;
	rightBorder.x = width - borderThickness / 2;
	rightBorder.y = height / 2;
	rightBorder.color = 'black';
	rightBorder.collider = 'static';

	// Left border
	let leftBorder = new Sprite();
	leftBorder.width = borderThickness;
	leftBorder.height = height;
	leftBorder.x = borderThickness / 2;
	leftBorder.y = height / 2;
	leftBorder.color = 'black';
	leftBorder.collider = 'static';
}

  

function draw() {
	background('black');
	
	if (mouseIsPressed && mouseX > gamestarter.x - 75 && mouseX < gamestarter.x + 75 && mouseY > gamestarter.y - 25 && mouseY < gamestarter.y + 25 && !playing) {
		playing = true;
		console.log("Game started");
		gamestarter.remove();
		player = new Sprite();
		player.x = width / 2;
		player.y = height / 2;
		player.width = 40;
		player.height = 40;
		player.color = 'blue';
		laserattack1();
		createlevelbar();
	}

	if (playing) {
		drawHealthBar();

		player.rotation = 0;

		if (kb.pressing('left')) {
			player.vel.x = -5;
		}
		else if (kb.pressing('right')) {
			player.vel.x = 5;
		} else {
			player.vel.x = 0;
		}
		if (kb.pressing('up')) {
			player.vel.y = -5;
		}
		else if (kb.pressing('down')) {
			player.vel.y = 5;
		} else {
			player.vel.y = 0;
		}

	}
	for (let i = laserballs.length - 1; i >= 0; i--) {
		let laserball = laserballs[i];
		if (player.overlap(laserball)) {
		  // Reduce health when the player touches a laserball
		  currentHealth -= 1;
  
		  // Remove the laserball
		  laserball.remove();
  
		  // Check if the player has run out of health
		  if (currentHealth <= 0) {
			// Handle game over or any other logic when the player loses all health
			// For example, set playing to false to stop the game.
			playing = false;
			removeall();
			console.log("Game over");
		  }
		}
		}
		
}


function removeall() {
	for(let i=allSprites.length; i--;) {
		allSprites[i].remove();
	}
}

function drawHealthBar() {
	// Draw the background of the health bar
	fill(100); // Gray color
	rect(healthBarX, healthBarY, healthBarWidth, healthBarHeight);
  
	// Calculate the width of the green (health) bar
	let healthBarFillWidth = (currentHealth / maxHealth) * healthBarWidth;
  
	// Draw the green (health) bar
	fill(0, 255, 0); // Green color
	rect(healthBarX, healthBarY, healthBarFillWidth, healthBarHeight);
  }

function createlevelbar() {
	levelbar = new Sprite;
	levelbar.x = 150;
	levelbar.y = 30;
	levelbar.width = 200;
	levelbar.height = 8;
	levelbar.color = 'white';
	levelbar.collider = 'none';
}

function preload() {
	frame1 = loadImage('images/jetpack/1frame.png');
	frame2 = loadImage('images/jetpack/2frame.png');
	frame3 = loadImage('images/jetpack/3frame.png');
	frame4 = loadImage('images/jetpack/4frame.png');
  }
  

function startanimation() {
	animation = createSprite(width / 2, height / 2 - 150);
  
	// Define the animation frames
	animation.addAnimation('default', frame1, frame2, frame3, frame4);
	setInterval(() => {
		// Move the enemy to the right
		enemy.moveTo(width / 2 + 4, height / 2 - 200, 25);
	
		setTimeout(() => {
			// Move the enemy to the left after 1 second
			enemy.moveTo(width / 2 - 4, height / 2 - 200, 25);
		}, 200); // Wait 1 second before moving back to the left
	}, 400); // Wait 2.25 seconds before reversing direction
	// Set sprite properties
	animation.layer = -3;
	animation.collider = 'none';
}




function obstaclespawn() {
	cycles = 0; // Keep track of cycles
	let isVisible = true; // Start with visibility
	if (level > 0) {
		animation.remove();	
	}
	
	// Create and remove elements at intervals
	const interval = setInterval(function () {
		if (cycles >= 5) {
			clearInterval(interval); // Stop the interval after 10 cycles

			return;
		}

		if (isVisible) {
			// Remove elements
			if (enemy) {
				enemy.remove();
				enemy = null;
			}
			if (leftarm) {
				leftarm.remove();
				leftarm = null;
			}
			if (rightarm) {
				rightarm.remove();
				rightarm = null;
			}
			isVisible = false; // Set to not visible
		} else {
			// Create and display elements
			enemy = new Sprite();
			enemy.x = width / 2;
			enemy.y = height / 2 - 200;
			enemy.img = 'images/enemy.png';
			enemy.width = 150;
			enemy.height = 250;
			enemy.layer = -3;
			enemy.collider = 'none';

			leftarm = new Sprite();
			leftarm.x = width / 2 - 120;
			leftarm.y = height / 2 - 50;
			leftarm.img = 'images/leftarm.png';
			leftarm.width = 70;
			leftarm.height = 245;
			leftarm.collider = 'none';
			leftarm.layer = -3;

			rightarm = new Sprite();
			rightarm.x = width / 2 + 120;
			rightarm.y = height / 2 - 50;
			rightarm.img = 'images/rightarm.png';
			rightarm.width = 70;
			rightarm.height = 245;
			rightarm.collider = 'none';
			rightarm.layer = -3;

			isVisible = true; // Set to visible
			cycles++; // Increment the cycle counter
		}
	}, 100); // Repeat every 1 second
	setTimeout(() => {
	startanimation();
	}, 1000);
}


function laserattack1() {
	obstaclespawn();
	setTimeout(() => {

		level = 1;
		console.log(level)
		leftarm.moveTo(300, 300, 8);
		rightarm.moveTo(width - 300, 300, 8);
		cycles = 0; // Reset cycles here

		setTimeout(() => {
			rightarm.rotationSpeed = 1;
			leftarm.rotationSpeed = -1;
			laserballactivate(); // Call laserballactivate here

			setTimeout(() => {
				for (let i = laserballs.length - 1; i >= 0; i--) {
					laserballs[i].remove(); // Remove the specific laserball if it collides with a wall
				}

				rightarm.rotationSpeed = 0;
				leftarm.rotationSpeed = 0;
				rightarm.rotation = 0;
				leftarm.rotation = 0;
				leftarm.moveTo(width / 2 - 120, height / 2 - 50, 15);
				rightarm.moveTo(width / 2 + 120, height / 2 - 50, 15);
				obstaclespawn();
				laserattack2();
			}, 15200);
		}, 800);
	}, 2000);
}

function laserattack2() {
	level = 2;
	console.log(level)
	let repetitions = 0; // Counter to keep track of repetitions

	function createWarning() {
		let warningCount = 0; // Counter to keep track of warnings created

		function createSingleWarning(xPos) {
			if (warningCount < 2) {
				let warning = createSprite(xPos, 0);
				warning.addImage('warning', loadImage('images/warning.png'));
				warning.collider = 'none';

				let yPos = height / 2 - height / 3 + Math.floor(random(0, 3)) * height / 3;
				warning.position.y = yPos;

				function flashWarning() {
					warning.visible = !warning.visible; // Toggle visibility
				}

				function createbiglaser() {
					biglaser = new Sprite;
					if (warning.x == 150) {
						biglaser.x = -width / 2 - 80;
						biglaser.vel.x = 20;
					} else {
						biglaser.x = width + width / 2 - 80;
						biglaser.vel.x = -20;
					}
					biglaser.y = warning.y;
					biglaser.width = width * 0.90;
					biglaser.height = height / 3;
					biglaser.color = 'red';
					biglaser.collider = 'none';
				}

				// Flash the warning sign quickly for 5 times
				const flashInterval = setInterval(flashWarning, 200);
				setTimeout(() => {
					clearInterval(flashInterval);
					warning.remove();
					createbiglaser();
					warningCount++;
				}, 1000); // Flash for 2000ms
			}
		}

		// Create warnings on both sides
		createSingleWarning(150);
		createSingleWarning(width - 175);
	}

	function startSequence() {
		// Start the sequence by creating the first warning
		repetitions++;
		createWarning();
		if (repetitions < 18) {
			// If not yet repeated 10 times, create the next warning after 2 seconds
			setTimeout(startSequence, 2200);
		} else {

			rightarm.rotationSpeed = 0;
			leftarm.rotationSpeed = 0;
			rightarm.rotation = 0;
			leftarm.rotation = 0;
			leftarm.moveTo(width / 2 - 120, height / 2 - 50, 15);
			rightarm.moveTo(width / 2 + 120, height / 2 - 50, 15);
			setTimeout(() => {
				obstaclespawn();
				setTimeout(() => {
					laserattack3();
				}, 2000);

			}, 1000);
		}
	}

	setTimeout(() => {
		rightarm.rotationSpeed = 1;
		leftarm.rotationSpeed = -1;
		leftarm.moveTo(-200, 150, 15);
		rightarm.moveTo(width + 200, height - 150, 15);

		// Start the sequence
		startSequence();
	}, 2000);
}

function laserattack3() {
	level = 3;
	console.log(level)
	repetitions = 0;
	ekstrarightarm = new Sprite;
	ekstrarightarm.x = rightarm.x;
	ekstrarightarm.y = rightarm.y;
	ekstrarightarm.img = 'images/rightarm.png';
	ekstrarightarm.width = 70;
	ekstrarightarm.height = 245;
	ekstrarightarm.collider = 'none';
	ekstrarightarm.layer = -3;

	ekstraleftarm = new Sprite();
	ekstraleftarm.x = leftarm.x;
	ekstraleftarm.y = leftarm.y;
	ekstraleftarm.img = 'images/leftarm.png';
	ekstraleftarm.width = 70;
	ekstraleftarm.height = 245;
	ekstraleftarm.collider = 'none';
	ekstraleftarm.layer = -3;

	ekstrarightarm.rotateTo(-90, 7);
	ekstrarightarm.moveTo(width / 2 + 300, height / 2 - 130, 5);

	ekstraleftarm.rotateTo(90, 7);
	ekstraleftarm.moveTo(width / 2 - 300, height / 2 - 130, 5);

	leftarm.rotateTo(90, 7);
	leftarm.moveTo(width / 2 - 350, height / 2 + 100, 5);

	rightarm.rotateTo(-90, 7);
	rightarm.moveTo(width / 2 + 350, height / 2 + 100, 5);

	setTimeout(() => {
		ekstraleftarm.rotationSpeed = -10;
		ekstrarightarm.rotationSpeed = 10;
		leftarm.rotationSpeed = -10;
		rightarm.rotationSpeed = 10;
		setTimeout(() => {
			leftarm.moveTo(-200, height - 100, 15);
			rightarm.moveTo(width + 200, height - 100, 15);
			ekstraleftarm.moveTo(-200, 100, 15);
			ekstrarightarm.moveTo(width + 200, 100, 15);
			setTimeout(() => {
				ekstrarightarm.x = random(0, width);
				ekstraleftarm.x = random(0, width);
				ekstrarightarm.y = -100;
				ekstraleftarm.y = height + 100;
			}, 1000);
			armSpinningSequence();
		}, 1000);
	}, 1000);

	function armSpinningSequence() {
		// Start the sequence by creating the first warning
		repetitions++;
		if (repetitions < 20) {
			// If not yet repeated 10 times, create the next warning after 2 seconds
			if (rightarm.x > width + 50) {
				rightarm.moveTo(-200, random(height, 0), 5);
				leftarm.moveTo(width + 200, random(height, 0), 5);
			} else if (rightarm.x < -50) {
				leftarm.moveTo(-200, random(height, 0), 5);
				rightarm.moveTo(width + 200, random(height, 0), 5);
				//				ekstrarightarm.moveTo( width + 200, random(height, 0), 5);
			}
			if (ekstrarightarm.y < -50) {
				ekstrarightarm.moveTo(random(0, width), height + 200, 5);
				ekstraleftarm.moveTo(random(0, width), -200, 5);
			} else if (ekstrarightarm.y > height + 50) {
				ekstraleftarm.moveTo(random(0, width), height + 200, 5);
				ekstrarightarm.moveTo(random(0, width), -200, 5);
				//				ekstrarightarm.moveTo( width + 200, random(height, 0), 5);
			}


			setTimeout(armSpinningSequence, 2200);
		} else {

			rightarm.rotationSpeed = 0;
			leftarm.rotationSpeed = 0;
			rightarm.rotation = 0;
			leftarm.rotation = 0;
			ekstraleftarm.rotationSpeed = 0;
			ekstrarightarm.rotationSpeed = 0;
			ekstrarightarm.rotation = 0;
			ekstraleftarm.rotation = 0;
			ekstraleftarm.moveTo(width / 2 - 120, height / 2 - 50, 15);
			ekstrarightarm.moveTo(width / 2 + 120, height / 2 - 50, 15);
			leftarm.moveTo(width / 2 - 120, height / 2 - 50, 15);
			rightarm.moveTo(width / 2 + 120, height / 2 - 50, 15);
			setTimeout(() => {
				ekstraleftarm.remove();
				ekstrarightarm.remove();
				laserattack4();
			}, 3000);
			obstaclespawn();

		}
	}
}


function laserattack4() {
	level = 4;
	console.log(level)
	repetitions = 0;
	leftarm.moveTo(width / 2 - 350, height / 2 + 100, 10);
	leftarm.rotateTo(180, 5);

	rightarm.moveTo(width / 2 + 350, height / 2 + 100, 10);
	rightarm.rotateTo(-180, 5);

	setTimeout(() => {
		laserlaunchanimation();
	}, 1000);

	function laserlaunchanimation() {
		if (repetitions < 50) {
			setTimeout(() => {
				let laserlaunchballright = createSprite(rightarm.position.x, rightarm.position.y);
				laserlaunchballright.speed = 25;
				laserlaunchballright.direction = rightarm.direction - 90 + random(-15, 15);
				laserlaunchballright.collider = 'none';
				laserlaunchballright.layer = -4;
				laserlaunchballright.color = 'red';
				laserlaunchballright.diameter = 50;
				laserlauncheballs.add(laserlaunchballright);
				repetitions++;

				let laserlaunchballleft = createSprite(leftarm.position.x, leftarm.position.y);

				laserlaunchballleft.speed = 25;
				laserlaunchballleft.direction = leftarm.direction - 90 + random(-15, 15);
				laserlaunchballleft.collider = 'none';
				laserlaunchballleft.layer = -4;
				laserlaunchballleft.color = 'red';
				laserlaunchballleft.diameter = 50;
				laserlauncheballs.add(laserlaunchballleft);
				repetitions++;
				laserlaunchanimation();
			}, 150); // Launch a ball every 1000ms (1 second)
		} else {
			rightarm.rotation = 0;
			leftarm.rotation = 0;
			leftarm.moveTo(width / 2 - 120, height / 2 - 50, 15);
			rightarm.moveTo(width / 2 + 120, height / 2 - 50, 15);
			setTimeout(() => {
				for (let i = laserlauncheballs.length - 1; i >= 0; i--) {
					laserlauncheballs[i].remove(); // Remove the specific laserball if it collides with a wall
				}
				obstaclespawn();
				fallinglasers();
				repetitions = 0;

			}, 2000);
		}
	}

	function fallinglasers() {
		if (repetitions < 300) {
			setTimeout(() => {
				let fallinglaserball = createSprite(random(-20, width + 20), - 100);
				fallinglaserball.vel.y = 10;
				fallinglaserball.collider = 'none';
				fallinglaserball.layer = -2;
				fallinglaserball.color = 'red';
				fallinglaserball.diameter = 50;
				fallinglaserballs.add(fallinglaserball);
				repetitions++;
				fallinglasers();
			}, 60); // Launch a ball every 1000ms (1 second)
		} else {
			setTimeout(() => {
				for (let i = fallinglaserballs.length - 1; i >= 0; i--) {
					fallinglaserballs[i].remove(); // Remove the specific laserball if it collides with a wall
				}
				obstaclespawn();
			}, 2000);
		}
	}
}


function createlaserballs() {
	let angleright = rightarm.rotation;
	let angleleft = leftarm.rotation;

	// Create and display right laserball
	let laserballRight = new Sprite();
	laserballRight.x = rightarm.x;
	laserballRight.y = rightarm.y;
	laserballRight.diameter = 16;
	laserballRight.direction = angleright + 90;
	laserballRight.speed = 8;
	laserballRight.color = 'red';

	// Create and display left laserball
	let laserballLeft = new Sprite();
	laserballLeft.x = leftarm.x;
	laserballLeft.y = leftarm.y;
	laserballLeft.diameter = 16;
	laserballLeft.direction = angleleft + 90;
	laserballLeft.speed = 8;
	laserballLeft.color = 'red';

	laserballs.add(laserballRight);
	laserballs.add(laserballLeft);
}

function laserballactivate() {
	const interval = setInterval(function () {
		if (cycles >= 150) {
			clearInterval(interval); // Stop the interval after 100 cycles
			console.log('Interval cleared.');
			return;
		}

		createlaserballs();
		setTimeout(() => {

			createlaserballs();
		}, 50);
		cycles++; // Increment the cycle counter
	}, 100);
}