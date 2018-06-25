//app.js is the main code of the game that handles enemies and player inputs.

"use strict";

// timesWon keeps track of how many times the player has won
// timesWon adds enemies for each win up to a max of 6
let timesWon = 0;

//Set's up the enemies
var Enemy = function() {
    // randomBlock decides which of the 3 blocks enemies spawn on.
    let randomBlock = Math.floor(Math.random() * 3) + 1;
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    if (randomBlock === 1) {
      this.y = 214.5;
    } else if (randomBlock === 2) {
      this.y = 129;
    } else {
      this.y = 43.5;
    }

    this.x = -200;
    this.speed = Math.floor((Math.random() * 435) + 380);
};

//Declare our new enemies
const enemy1 = new Enemy();
const enemy2 = new Enemy();
const enemy3 = new Enemy();



// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    // Checks if the enemy is off screen and resets its position if it is.
    if (this.x >= 505) {
      let randomBlock = Math.floor(Math.random() * 3) + 1;
      this.x = -200;
      if (randomBlock === 1) {
        this.y = 214.5;
        let lastRandomNum = randomBlock;
      } else if (randomBlock === 2) {
        this.y = 129;
        let lastRandomNum = randomBlock;
      } else {
        this.y = 43.5;
        let lastRandomNum = randomBlock;
      }
    }
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
//Creates the player and set's their position.
const Player = function() {
  this.sprite = 'images/char-boy.png';
  this.x = 202;
  this.y = 385.5;
};

Player.prototype.update = function(dt){
  // Code to make sure the player doesn't go off screen.
  if (this.x > 404) {
    this.x = 404;
  } else if (this.x < 0) {
    this.x = 0;
  }
  if (this.y > 385.5) {
    this.y = 385.5;
  }

  // checks each enemy for collision code
  for (let enemy of allEnemies) {
    // if hit player resets and their timesWon is subtacted by one.
    // collission code gotten from https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
    if (this.x < enemy.x + 80 && this.x + 80 > enemy.x && this.y === enemy.y){
      this.x = 202;
      this.y = 385.5;
      if (timesWon > 0) {
        timesWon -= 1;
        allEnemies.pop();
      }
    }
  }
  // checks to see if player is in the water and adds difficulty if true.
  if (this.y === -42) {
    timesWon += 1;
    this.x = 202;
    this.y = 385.5;
    switch(timesWon) {
      case 1:
      const enemy4 = new Enemy();
      allEnemies.push(enemy4);
      break;
      case 2:
      const enemy5 = new Enemy();
      allEnemies.push(enemy5);
      break;
      case 3:
      const enemy6 = new Enemy();
      allEnemies.push(enemy6);
      break;
    }
  }
};

Player.prototype.handleInput = function(key){
  // switch statement checks which key was pressed and moves player one block.
  switch(key) {
    case 'right':
      this.x += 101;
      break;
    case 'left':
      this.x -= 101;
      break;
    case 'up':
      this.y -= 85.5;
      break;
    case 'down':
      this.y += 85.5;
      break;
  }
}

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const allEnemies = [enemy1, enemy2, enemy3];

const player = new Player();



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
