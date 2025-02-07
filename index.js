//defines height and width of canvas
var canvasWidth = 600;
var canvasHeight = 400;

//defines pkayer and y position
var player;
var playerYPosition = 200;

//fall speed stuff
var fallSpeed = 0;
var interval = setInterval(updateCanvas, 10);

//if jumping stuff
var isJumping = false;
var jumpSpeed = 0;




//starts the game and creates the player
function startGame() {
    gameCanvas.start();

    //width, height, x
    player = new createPlayer(30, 30, 10);
    
}

//creates the game canvas
var gameCanvas = {
    canvas: document.createElement("canvas"),
    start: function() {
        this.canvas.width = canvasWidth;
        this.canvas.height = canvasHeight;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    }
}

//creates the player
function createPlayer(width, height, x) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = playerYPosition;
    

    //draws the canvas
    this.draw = function() {
        ctx = gameCanvas.context;
        ctx.fillStyle = "green";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.makeFall = function() {
        if (!isJumping) {
            this.y += fallSpeed;
            fallSpeed += 0.1;
            this.stopPlayer();
        }
    }
    this.stopPlayer = function() {
        var ground = canvasHeight - this.height;
        if (this.y > ground) {
            this.y = ground;
        }
    }
    this.jump = function() {
        if (isJumping) {
            this.y -= jumpSpeed;
            jumpSpeed += 1;
        }
    }
    
}






function updateCanvas() {

    
    ctx = gameCanvas.context;
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    
    player.makeFall();
    player.draw();
    player.jump();
    
    
    

    
}



function resetJump() {
    jumpSpeed = 0;
    isJumping = false;
}

document.body.onkeyup = function(e) {
    if (e.keyCode == 32) {
        isJumping = true;
        //defines how long you jumo
        setTimeout(function() { resetJump(); }, 500);
    }
}


let down = false;

document.body.onkeydown = function(e){
    if(e.keyCode == 68){
        down = true;
        
        var id = setInterval(frame, 20);
        function frame() {
            if (onkeyup) {
                clearInterval(id);
            } else {
                player.x =   player.x + 0.5;
            }
        }
    }
}

document.body.onkeyup = function(e){
    
        down = false;

}

function update(){
    console.log('working?');
    if (down) {
        player.x =   player.x + 0.5;
    }
    ctx = gameCanvas.context;
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    player.draw();
    requestAnimationFrame(update)
}
