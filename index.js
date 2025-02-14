
var context, controller, player, loop;


context = document.querySelector("canvas").getContext("2d");

context.canvas.height = innerHeight -20;
context.canvas.width = innerWidth - 20;

player = {

  height:64,
  jumping:true,
  width:64,
  x:144, // center of the canvas
  x_velocity:0,
  y: 0,
  y_velocity:0

};
var ground = context.canvas.height - player.y - player.height;

enemy = {

    height:32,
    jumping:true,
    width:32,
    x:144, 
    x_velocity:0,
    y:ground,
    y_velocity:0
  };

controller = {

  left:false,
  right:false,
  up:false,
  keyListener:function(event) {

    var key_state = (event.type == "keydown");

    switch(event.keyCode) {
      case 37:// left key
        controller.left = key_state;
        break;
    case 65:
        controller.left = key_state;
        break;
      case 32:
        controller.up = key_state;
        break;
      case 87:
        controller.up = key_state;
        break;  
      case 38:// up key
        controller.up = key_state;
        break;
      case 39:// right key
        controller.right = key_state;
        break;
    case 68:
        controller.right = key_state;
        break;

    }

  }

};

loop = function() {

  if (controller.up && player.jumping == false) {

    player.y_velocity -= 25;
    player.jumping = true;

  }

  if (controller.left) {

    player.x_velocity -= 1;

  }

  if (controller.right) {

    player.x_velocity += 1;

  }

  player.y_velocity += 1.5;// gravity
  player.x += player.x_velocity;
  player.y += player.y_velocity;
  player.x_velocity *= 0.9;// friction
  player.y_velocity *= 0.9;// friction



  // if player is falling below floor line





  if (player.y > ground) {

    player.jumping = false;
    player.y = ground;
    player.y_velocity = 0;

  }

  

  


  // if player is going off the left of the screen


    context.fillStyle = "#202020";
    context.fillRect(0, 0, innerWidth, innerHeight);// x, y, width, height
    context.fillStyle = "#ff0000";
    context.beginPath();
    context.rect(player.x, player.y, player.width, player.height);
    context.fill();
    context.fillStyle = "blue";
    context.beginPath();
    context.rect(enemy.x, enemy.y, enemy.width, enemy.height);
    context.fill();
  
    


  if (collision({ player, enemy })) {
    console.log("HIT");
  }
  // call update when the browser is ready to draw again
  window.requestAnimationFrame(loop);

};

window.addEventListener("keydown", controller.keyListener)
window.addEventListener("keyup", controller.keyListener);
window.requestAnimationFrame(loop);







function collision({ player, enemy }) {
    if (player.x < enemy.x + enemy.width && player.x + player.width > enemy.x &&
        player.y < enemy.y + enemy.height && player.y + player.height > enemy.y) {
        if (player.y + player.height > enemy.y && player.y_velocity > 0) {
            player.jumping = false;
            player.y_velocity = 0;
            player.y = enemy.y - player.height;

    
        }
        else{

        
            if (player.x + player.width > enemy.x && player.x < enemy.x + enemy.width) {
                if (player.x_velocity > 0) { // Moving to the right
                    player.x = enemy.x - player.width;  // Set player position to the left of the enemy
                } else if (player.x_velocity < 0) { // Moving to the left
                    player.x = enemy.x + enemy.width;  // Set player position to the right of the enemy
                }
                player.x_velocity = 0;
            }
        }
    }
}




//player.x < enemy.x + enemy.width right side


//player.y < enemy.y + enemy.height bottom

//player.x + player.width > enemy.x left side

//player.y + player.height > enemy.y top