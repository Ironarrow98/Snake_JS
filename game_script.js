var grid_size = 20;
var grid_num = 20;
var player_x = Math.floor(Math.random() * grid_num);
var player_y =Math.floor(Math.random() * grid_num);
var apple_x = Math.floor(Math.random() * grid_num);
var apple_y = Math.floor(Math.random() * grid_num);
var collide_x;
var collide_y;
var x_direction = 0;
var y_direction = 0;
var snake = [];
var tail = 5;
var normal_speed = 100;
var speed = 100;
var game_status = 0;
var game_state = 0;
var my_game;

// 1. Create the button
var button = document.createElement("button");
button.innerHTML = "Do Something";

// 2. Append somewhere
var body = document.getElementsByTagName("body")[0];
body.appendChild(button);

// 3. Add event handler
button.addEventListener ("click", function() {
  clearInterval(my_game);
  game_status++;
  my_game = setInterval(game, speed);
  button.style.visibility = "hidden";
});


window.onload = function() {
	canv = document.getElementById("gc");
	context = canv.getContext("2d");
	document.addEventListener("keydown", keyPush);
	document.addEventListener("keyup", keyRelease);
}

function game() {
	player_x += x_direction;
	player_y += y_direction;
	if (player_x < 0) {
		player_x = grid_num - 1;
	}
	if (player_x > grid_num - 1) {
		player_x = 0;
	}
	if (player_y < 0) {
		player_y = grid_num - 1;
	}
	if (player_y > grid_num - 1) {
		player_y = 0;
	}
	context.fillStyle = "black";
	context.fillRect(0, 0, canv.width, canv.height);
	context.fillStyle = "lime";
	for(var i = 0; i < snake.length; i++) {
		context.fillRect(snake[i].x * grid_size, snake[i].y * grid_size, grid_size - 2, grid_size - 2);
		if(snake[i].x == player_x && snake[i].y == player_y) {
			if (game_state == 0) {
				tail = 5;
			} else {
        collide_x = snake[i].x;
        collide_y = snake[i].y;
				endGame();
				return;
			}
		}
	}
	snake.push({x:player_x, y:player_y});
	while(snake.length > tail) {
		snake.shift();
	}
	if (apple_x == player_x && apple_y == player_y) {
		tail++;
		apple_x = Math.floor(Math.random() * grid_num);
		apple_y = Math.floor(Math.random() * grid_num);
	}
	context.fillStyle = "red";
	context.fillRect(apple_x * grid_size, apple_y * grid_size, grid_size - 2, grid_size - 2);
}

function keyPush(keyEvent) {
	switch(keyEvent.keyCode) {
		case 37:
			if (x_direction == 1 || game_status == 0) {
				break;
			}
      game_state++;
			x_direction = -1;
			y_direction = 0;
			break;
		case 38:
			if (y_direction == 1 || game_status == 0) {
				break;
			}
      game_state++;
			x_direction = 0;
			y_direction = -1;
			break;
		case 39:
			if (x_direction == -1 || game_status == 0) {
				break;
			}
      game_state++;
			x_direction = 1;
			y_direction = 0;
			break;
		case 40:
			if (y_direction == -1 || game_status == 0) {
				break;
			}
      game_state++;
			x_direction = 0;
			y_direction = 1;
			break;
		case 65:
			if (x_direction == 1 || game_status == 0) {
				break;
			}
      game_state++;
			x_direction = -1;
			y_direction = 0;
			break;
		case 87:
			if (y_direction == 1 || game_status == 0) {
				break;
			}
      game_state++;
			x_direction = 0;
			y_direction = -1;
			break;
		case 68:
			if (x_direction == -1 || game_status == 0) {
				break;
			}
      game_state++;
			x_direction = 1;
			y_direction = 0;
			break;
		case 83:
			if (y_direction == -1 || game_status == 0) {
				break;
			}
      game_state++;
			x_direction = 0;
			y_direction = 1;
			break;
		case 16:
      if((speed > (normal_speed * 0.5)) && (game_status > 0)) {
        clearInterval(my_game);
        speed = normal_speed * 0.5;
        my_game = setInterval(game, speed);
      }
      break;
	}
}

function keyRelease(keyEvent) {
	switch(keyEvent.keyCode) {
		case 16:
      if((speed == (normal_speed * 0.5)) && (game_status > 0)) {
        clearInterval(my_game);
        speed = normal_speed;
        my_game = setInterval(game, speed);
      }
      break;
	}
}

function endGame() {
  clearInterval(my_game);
  context.fillStyle = "black";
	context.fillRect(0, 0, canv.width, canv.height);
	context.fillStyle = "white";
	for(var i = 0; i < snake.length; i++) {
		context.fillRect(snake[i].x * grid_size, snake[i].y * grid_size, grid_size - 2, grid_size - 2);
  }
  context.fillStyle = "red";
  context.fillRect(collide_x * grid_size, collide_y * grid_size, grid_size - 2, grid_size - 2);
	context.fillStyle = "yellow";
	context.font="20px Georgia";
	context.fillText("Game Over!", 10, 50);
  x_direction = 0;
  y_direction = 0;
  snake = [];
  tail = 5;
  normal_speed = 100;
  speed = 100;
  game_status = 0;
  game_state = 0;
  button.style.visibility = "visible";
}
