const JUMP_STRENGTH = 100;
const GRAVITY = 10;

var jumpStrength = 0;

onJumpKeyupPress(){
    if(play.canJump)
    jumpStrength = JUMP_STRENGTH;
}

gameTick(){
    if(!player.onGround)
    {
        if(jumpKeyIsStillPressed){
            player.up.velocity += jumpStrength;
            jumpStrength /= 2;
        }
        player.up.velocity -= GRAVITY;
        player.y += player.up.velocity;
    }
    else{
        player.up.velocity = 0;
        jumpStrength = 0;
    }
}