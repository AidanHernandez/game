context = document.querySelector("canvas").getContext("2d");


context.canvas.height = innerHeight;
context.canvas.width = innerWidth;

let startAnimation = false;
let enemyJump = false;

player = {
    name: "player",
    height: context.canvas.height/20,
    jumping:true,
    width:context.canvas.height/20,
    x:innerWidth/2, // center of the canvas
    x_velocity:0,
    y: 0,
    y_velocity:0,
    dash:false,
    doubleJump:false
};

var ground = context.canvas.height - player.y - player.height;



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


let enemies = [
    createEnemy(innerWidth / 6, innerHeight- innerHeight)
];


let floor = [
    createFloor(context.canvas.width, context.canvas.height/47, context.canvas.width - context.canvas.width, context.canvas.height/1.022),
    createFloor(context.canvas.width - context.canvas.width/1.45, context.canvas.height/47, context.canvas.width - context.canvas.width, context.canvas.height/1.13),
    createFloor(context.canvas.width - context.canvas.width/1.45, context.canvas.height/47, context.canvas.width - (context.canvas.width - context.canvas.width/1.45), context.canvas.height/1.13),
    createFloor(context.canvas.width - context.canvas.width/1.45, context.canvas.height/47, context.canvas.width - (context.canvas.width - context.canvas.width/2.9), context.canvas.height/1.26)

];


loop = function() {
  



    player.y_velocity += 1.5; 
    player.x += player.x_velocity;
    player.y += player.y_velocity;
  
    player.y_velocity *= 0.9; 
  
    if (player.y > ground) {
        player.jumping = false;
        player.y = ground;
        player.y_velocity = 0;
      }
    
    


  
    //bg color
    context.fillStyle = "#202020";
    context.fillRect(0, 0, innerWidth, innerHeight);
    context.fillStyle = "#ff0000";
    //player
    context.beginPath();
    context.rect(player.x, player.y, player.width, player.height);
    context.fill();

  
    
    
        
    
  

    enemies.forEach(enemy => {

        if (collisionDetection(player, enemy)) {
          console.log("YOU LOST")
        }
      
      
        //MAKE OBJECT ON OBJECT COLLISOION
        enemies.forEach(otherEnemy => {
          collisionDetection(enemy, otherEnemy)
        });
      
      
        floor.forEach(floor => {
            collisionDetection(player, floor)
            collisionDetection(enemy, floor)
          context.fillStyle = "green";
          context.beginPath();
          context.rect(floor.x, floor.y, floor.width, floor.height);
          context.fill();
        })
      
        // ----------------------


        enemy.y_velocity += 1.5; 
        enemy.y += enemy.y_velocity;
        enemy.y_velocity *= 0.9; 

        if(startAnimation){
            
            setTimeout(() =>  enemy.x_velocity = 5, 100)
            setTimeout(() =>  enemy.jumping = false, 200)
            console.log(enemy.jumping)
            if(!enemy.jumping){

                enemy.y_velocity = -45
                enemy.jumping = true
                
            }


            enemy.y_velocity += 1.5; 
            enemy.y += enemy.y_velocity;
            enemy.y_velocity *= 0.9; 


            enemy.x += enemy.x_velocity;
            startAnimation = false;
        }

        // ------------
        context.fillStyle = "blue";
        context.beginPath();
        context.rect(enemy.x, enemy.y, enemy.width, enemy.height);
        context.fill();
      });
      
  
  
  
  
  
  
  
  
  window.requestAnimationFrame(loop);
  };
  
  window.requestAnimationFrame(loop);









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
        // obj1.jumping = false;
        startAnimation = true;
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
  

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}