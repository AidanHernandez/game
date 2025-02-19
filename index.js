
var context, controller, player, loop;
let jumpKeyIsStillPressed = false;
let timePressed;
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



 
function createEnemy(xPosition, yPosition) {
  return {
    height: 32,
    jumping: true,
    width: 32,
    x: xPosition, 
    x_velocity: 0,
    y: yPosition,
    y_velocity: 0
  };
}









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
  
  let timePressed = 0; // Track how long the key is held down
  let keyHoldInterval = null; // Variable to hold the interval reference
  
  // Assuming you have some mechanism to check key status (e.g., controller or key event listeners)
  document.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowUp' || event.code === 'ArrowUp') { // Replace with your controller key condition
          if (timePressed === 0) { // Start timing when key is first pressed
              keyHoldInterval = setInterval(() => {
                  timePressed += 50; // Increment the timePressed by 50ms (adjust if needed)
              }, 50); // Update time every 50ms (you can adjust this interval for more accuracy)
          }
      }
  });
  
  // Stop the timer when key is released (optional if you want to reset on release)
  document.addEventListener('keyup', (event) => {
      if (event.key === 'ArrowUp' || event.code === 'ArrowUp') {
          clearInterval(keyHoldInterval);
          keyHoldInterval = null;
          timePressed = 0;
      }
  });
  
  if (controller.up && player.jumping === false) {
      if (timePressed > 150) {
          player.y_velocity -= 85; 
          player.jumping = true;
      } else {
          player.y_velocity -= 30; 
          player.jumping = true;
      }
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
    jumpKeyIsStillPressed = false;
    

  }

  if (player.y == ground) {

    jumpKeyIsStillPressed = false;
    
    
    
    
  }
  

  


  

    
  
    


  




  //bg color
  context.fillStyle = "#202020";
  context.fillRect(0, 0, innerWidth, innerHeight);
  context.fillStyle = "#ff0000";






  //make player
  context.beginPath();
  context.rect(player.x, player.y, player.width, player.height);
  context.fill();



  //creating enemies
  let enemies = [
    createEnemy(400, context.canvas.height - 32),
    createEnemy(0, 900)
  ];
  

  context.fillStyle = "blue";
  context.beginPath();
  enemies.forEach(enemy => {
    context.rect(enemy.x, enemy.y, enemy.width, enemy.height);
  });
  context.fill();
  
  // Collision detection
  enemies.forEach(enemy => {
    if (collision({ player, enemy })) {
      
      console.log("HIT");
    }
  });








  // call update when the browser is ready to draw again
  window.requestAnimationFrame(loop);

};

window.addEventListener("keydown", controller.keyListener)
window.addEventListener("keyup", controller.keyListener);
window.requestAnimationFrame(loop);

















function collision({ player, enemy }) {
  if (player.x < enemy.x + enemy.width && player.x + player.width > enemy.x && player.y < enemy.y + enemy.height && player.y + player.height > enemy.y) {
    if (player.y + player.height > enemy.y && player.y_velocity > 0) {

      player.jumping = false;

      player.y_velocity = 0;

      player.y = enemy.y - player.height;
      jumpKeyIsStillPressed = false;

    } 
    else{
      if (player.x + player.width > enemy.x && player.x < enemy.x + enemy.width) {
        if (player.x_velocity > 0){ 
          player.x = enemy.x - player.width;  
          
        } 
        else if (player.x_velocity < 0) { 
          player.x = enemy.x + enemy.width;  
        }

        player.x_velocity = 0;
      }
    }
  }
}




//player.x < enemy1.x + enemy1.width right side


//player.y < enemy1.y + enemy1.height bottom

//player.x + player.width > enemy1.x left side

//player.y + player.height > enemy1.y top