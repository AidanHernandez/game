
var context, controller, player, loop;
let jumpKeyIsStillPressed = false;
let timePressed;
context = document.querySelector("canvas").getContext("2d");

context.canvas.height = innerHeight - 20;
context.canvas.width = innerWidth - 20;

player = {
  name: "player",
  height: context.canvas.height/20,
  jumping:true,
  width:context.canvas.height/20,
  x:144, // center of the canvas
  x_velocity:0,
  y: 0,
  y_velocity:0,
  dash:false,
  doubleJump:false
};
var ground = context.canvas.height - player.y - player.height;

console.log(player)


 
function createEnemy(xPosition, yPosition) {
  return {
    name: "enemy",
    height: context.canvas.height/27,
    jumping: true,
    width: context.canvas.height/27,
    x: xPosition, 
    x_velocity: 0,
    y: yPosition,
    y_velocity: 0,
    moveSpeed: 6 
  };
}

function createFloor(width, height, xPosition, yPosition) {
  return {
    name: "floor",
    height: height,
    width: width,
    x: xPosition, 
    y: yPosition
   
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
let playerJumped = false;  


let enemies = [
  createEnemy(getRandomNumber(context.canvas.width - context.canvas.width, context.canvas.width), getRandomNumber(context.canvas.height - context.canvas.height, context.canvas.height)),
  createEnemy(getRandomNumber(context.canvas.width - context.canvas.width, context.canvas.width), getRandomNumber(context.canvas.height - context.canvas.height, context.canvas.height))
];






//width, height, x, y

let floor = [
  createFloor(context.canvas.width + player.width, context.canvas.height/47, context.canvas.width - context.canvas.width - player.width, context.canvas.height/1.01),
  createFloor(context.canvas.width / 4, context.canvas.height/47, context.canvas.width - context.canvas.width/4, context.canvas.height/1.1),
  createFloor(context.canvas.width / 4, context.canvas.height/47, context.canvas.width - context.canvas.width, context.canvas.height/1.1),
  createFloor(context.canvas.width / 2.7, context.canvas.height/47, context.canvas.width - context.canvas.width/1.46, context.canvas.height/1.2),
  createFloor(context.canvas.width / 4, context.canvas.height/47, context.canvas.width - context.canvas.width/4, context.canvas.height/1.3),
  createFloor(context.canvas.width / 4, context.canvas.height/47, context.canvas.width - context.canvas.width, context.canvas.height/1.3),
  createFloor(context.canvas.width / 2.7, context.canvas.height/47, context.canvas.width - context.canvas.width/1.46, context.canvas.height/1.4)
];



loop = function() {
  

  if(player.x < context.canvas.width - context.canvas.width - player.width){
    player.x = context.canvas.width
  }
  if(player.x > context.canvas.width){
    player.x = context.canvas.width - context.canvas.width - player.width
  }
  

  if (controller.up) {
    
    if (player.jumping === false) {
      player.y_velocity = -20; 
      player.jumping = true;
      jumpKeyHoldDuration = 0; 
      playerJumped = true;
      
      if(numberJumps == 2){
        player.y_velocity = -40; 
        playerJumped = false;
      }
    }

    
    if (jumpKeyHoldDuration < 20) { 
      player.y_velocity -= 1.2; 
      jumpKeyHoldDuration++; 
      
      
    }
  }

  if (!controller.up && player.jumping === true) {
    jumpKeyHoldDuration = 0;
    playerJumped = false;
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
    playerJumped = false;
  }

  if (player.y == ground) {
    jumpKeyHoldDuration = 0; 
    // player.dash = false
    numberJumps = 0;
    playerJumped = false;
  }

  

  if(controller.dash && player.dash == false){
    setTimeout(player.dash = true , 300)
    player.x_velocity *= 4; 
    
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




for(i = 0; i < enemies.length; i++){
  

  var enemyGround = context.canvas.height - enemies[i].height;

  
  // console.log(enemies[i].jumping)
  if ((playerJumped && !enemies[i].jumping)) {
    enemies[i].y_velocity = -45; 
    enemies[i].jumping = true; 
    
  }

  

  enemies[i].y_velocity += 1.5; 
  enemies[i].y += enemies[i].y_velocity;
  enemies[i].y_velocity *= 0.9; 
  
  if (enemies[i].y > enemyGround) {
    enemies[i].jumping = false;
    enemies[i].y = enemyGround;
    enemies[i].y_velocity = 0;  
  }
}

//goes through list
enemies.forEach(enemy => {

  
  if (Math.abs(enemy.x - player.x) <= 10) {
    enemy.x_velocity = 0;
  } else if (enemy.x < player.x) {
    enemy.x_velocity = enemy.moveSpeed;
  } else if (enemy.x > player.x) {
    enemy.x_velocity = -enemy.moveSpeed;
  }


  enemy.x += enemy.x_velocity;

  

  
  if (collisionDetection(player, enemy)) {
    console.log("YOU LOST")
  }


  //MAKE OBJECT ON OBJECT COLLISOION
  enemies.forEach(otherEnemy => {
    if (collisionDetection(enemy, otherEnemy)) {
      
    }
  });


  floor.forEach(floor => {

    if (collisionDetection(player, floor)) {
      
    }
  
    if (collisionDetection(enemy, floor)) {
      
    }
  
    context.fillStyle = "green";
    context.beginPath();
    context.rect(floor.x, floor.y, floor.width, floor.height);
    context.fill();
  })


  

  // ------------
  context.fillStyle = "blue";
  context.beginPath();
  context.rect(enemy.x, enemy.y, enemy.width, enemy.height);
  context.fill();
});









window.requestAnimationFrame(loop);
};




window.addEventListener("keydown", controller.keyListener)
window.addEventListener("keyup", controller.keyListener);
window.requestAnimationFrame(loop);



function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
  


















function collisionDetection(obj1, obj2) {

  let topBottom = Math.abs(obj1.y - (obj2.y + obj2.height));
  let rightLeft = Math.abs((obj1.x + obj1.width) - obj2.x);
  let leftRight = Math.abs(obj1.x - (obj2.x + obj2.width));
  let bottomTop = Math.abs((obj1.y + obj1.height) - obj2.y);

  if (obj1.x + obj1.width < obj2.x || obj1.x > obj2.x + obj2.width || obj1.y + obj1.height < obj2.y || obj1.y > obj2.y + obj2.height) {
    return false; 
  }


 

  
  if ((obj1.y <= obj2.y + obj2.height && obj1.y + obj1.height > obj2.y + obj2.height) && (topBottom < rightLeft && topBottom < leftRight)) {
    obj1.y = obj2.y + obj2.height;  
    obj1.y_velocity = 0;  
    // numberJumps = 0;
  }

  
  if ((obj1.y + obj1.height >= obj2.y && obj1.y < obj2.y) && (bottomTop < rightLeft && bottomTop < leftRight)) {
    obj1.y = obj2.y - obj1.height;  

    if (obj1.name == 'player') {
      player.jumping = false;
      numberJumps = 0;
      playerJumped = false;  
    }

    if (obj1.name == 'enemy') {
      obj1.jumping = false;
      
    }


    obj1.y_velocity = 0;  
  }

  
  if ((obj1.x + obj1.width >= obj2.x && obj1.x < obj2.x) && (rightLeft < topBottom && rightLeft < bottomTop)) {
    obj1.x = obj2.x - obj1.width;  
    obj1.x_velocity = 0;  
  }

  
  if ((obj1.x <= obj2.x + obj2.width && obj1.x + obj1.width > obj2.x + obj2.width) && (leftRight < topBottom && leftRight < bottomTop)) {
    obj1.x = obj2.x + obj2.width;  
    obj1.x_velocity = 0;  
  }
  
}


//player.x < enemy1.x + enemy1.width right side


//player.y < enemy1.y + enemy1.height bottom

//player.x + player.width > enemy1.x left side

//player.y + player.height > enemy1.y top


