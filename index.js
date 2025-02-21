
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
  y_velocity:0,
  dash:false,
  doubleJump:false
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




let numberJumps = 0;


controller = {
  left: false,
  right: false,
  up: false,
  keyListener: function(event) {
    var key_state = (event.type == "keydown");

    switch(event.keyCode) {
      case 37: // left key
        controller.left = key_state;
        break;
      case 65: // A key
        controller.left = key_state;
        break;
      case 32: // space key
        controller.up = key_state;
        
        break;
      case 87: // W key
        controller.up = key_state;
        
        break;
      case 38: // up key
        controller.up = key_state;
        break;
      case 39: // right key
        controller.right = key_state;
        break;
      case 68: // D key
        controller.right = key_state;
        break;
      case 16: //lshift
        controller.dash = key_state;
        break;
    }
  }
};

document.body.addEventListener("keydown", (e) => {

  if(event.keyCode == 32 || event.keyCode == 87 || event.keyCode == 38){
    numberJumps = numberJumps + 1
    
    if(numberJumps == 2){
      player.jumping = false;
    }
  }
})


let jumpKeyHoldDuration = 0;
let canDoubleJump = true;

loop = function() {
  
  

  if (controller.up) {
    
    if (player.jumping === false) {
      player.y_velocity = -20; 
      player.jumping = true;
      jumpKeyHoldDuration = 0; 
      
      if(numberJumps == 2){
        player.y_velocity = -40; 
        
      }
      else{
        
      }
    }

    
    if (jumpKeyHoldDuration < 20) { 
      player.y_velocity -= 1.2; 
      jumpKeyHoldDuration++; 
    }
  }

  if (!controller.up && player.jumping === true) {
    jumpKeyHoldDuration = 0;
  }







  if (controller.left) {
    player.x_velocity -= 1;
  }

  if (controller.right) {
    player.x_velocity += 1;
  }

  player.y_velocity += 1.5; 
  player.x += player.x_velocity;
  player.y += player.y_velocity;
  
  player.y_velocity *= 0.9; 


  if (player.y > ground) {
    player.jumping = false;
    player.y = ground;
    player.y_velocity = 0;
    jumpKeyHoldDuration = 0; 
  }

  if (player.y == ground) {
    jumpKeyHoldDuration = 0; 
    // player.dash = false
    numberJumps = 0;
  }

  if(controller.dash && player.dash == false){
    // console.log("hlloa")
    setTimeout(player.dash = true , 300)
    
    player.x_velocity *= 5; 
    
  }
  else{
    player.x_velocity *= 0.9; 
  }

  document.body.addEventListener("keyup", (e) =>{
    
    switch(event.keyCode) {
      case 16: //lshift
        player.dash = false
        break
    }  
  });



  

    
  
    


  




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
    createEnemy(context.canvas.width - context.canvas.width, context.canvas.height - 32)
  ];

  
  

  context.fillStyle = "blue";
  context.beginPath();
  
  
  
  

  

 

  

  enemies.forEach(enemy => {
    moveEnemyTowardsPlayer(enemy); 
    updateEnemyPosition(enemy); 



    if (collisionDetection(enemy)) {
      
      console.log("HIT");
    }
    context.rect(enemy.x, enemy.y, enemy.width, enemy.height);
  });
  context.fill();
  
  
  window.requestAnimationFrame(loop);

};



window.addEventListener("keydown", controller.keyListener)
window.addEventListener("keyup", controller.keyListener);
window.requestAnimationFrame(loop);




  



function moveEnemyTowardsPlayer(enemy) {
  let dx = player.x - enemy.x;
  let dy = player.y - enemy.y;

  let distance = Math.sqrt(dx * dx + dy * dy);

  if (distance > 0) {
    
    const speed = 3; 

    
    const maxSpeed = 400;  
    const dynamicSpeed = Math.min(speed + distance / 100, maxSpeed);


    enemy.x_velocity = (dx / distance) * dynamicSpeed;
    enemy.y_velocity = (dy / distance) * dynamicSpeed;
  }
}


function updateEnemyPosition(enemy) {

  

  enemy.x += enemy.x_velocity * 20
  enemy.y += enemy.y_velocity;

  
  
}











function collisionDetection(enemy) {
  if (player.x + player.width < enemy.x ||
      player.x > enemy.x + enemy.width ||
      player.y + player.height < enemy.y ||
      player.y > enemy.y + enemy.height) {
          return
      }
      narrowPhase(enemy);
}

function narrowPhase(enemy) {
  let playerTop_ObjBottom = Math.abs(player.y - (enemy.y + enemy.height));
  let playerRight_ObjLeft = Math.abs((player.x + player.width) - enemy.x);
  let playerLeft_ObjRight = Math.abs(player.x - (enemy.x + enemy.width));
  let playerBottom_ObjTop = Math.abs((player.y + player.height) - enemy.y);

  if ((player.y <= enemy.y + enemy.height && player.y + player.height > enemy.y + enemy.height) && (playerTop_ObjBottom < playerRight_ObjLeft && playerTop_ObjBottom < playerLeft_ObjRight)) {
      player.y = enemy.y + enemy.height;
      
      player.y_velocity = 0;
      
  }
  if ((player.y + player.height>= enemy.y && player.y < enemy.y) && (playerBottom_ObjTop < playerRight_ObjLeft && playerBottom_ObjTop < playerLeft_ObjRight)) {
      player.y = enemy.y - player.height; 
      player.jumping = false;
      numberJumps = 0;
      player.y_velocity = 0;
  }
  if ((player.x + player.width >= enemy.x && player.x < enemy.x) && (playerRight_ObjLeft < playerTop_ObjBottom && playerRight_ObjLeft < playerBottom_ObjTop)) {
      player.x = enemy.x - player.width;
      player.x_velocity = 0; 
  }
  if ((player.x <= enemy.x + enemy.width && player.x + player.width > enemy.x + enemy.width) && (playerLeft_ObjRight < playerTop_ObjBottom && playerLeft_ObjRight < playerBottom_ObjTop)) {
      player.x = enemy.x + enemy.width;
      player.x_velocity = 0; 
  }
}




//player.x < enemy1.x + enemy1.width right side


//player.y < enemy1.y + enemy1.height bottom

//player.x + player.width > enemy1.x left side

//player.y + player.height > enemy1.y top