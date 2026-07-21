const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const ball = {
    x: 100,
    y: 300,
    r: 10,
    vx: 0,
    vy: 0
};

let angle = 0;
let power = 8;
let moving = false;

function resetBall(){
    ball.x = 100;
    ball.y = 300;
    ball.vx = 0;
    ball.vy = 0;
    moving = false;
}

function shoot(){

    if(moving) return;

    const rad = angle * Math.PI / 180;

    ball.vx = Math.cos(rad) * power;
    ball.vy = -Math.sin(rad) * power;

    moving = true;

}

function update(){

    if(moving){

        ball.x += ball.vx;
        ball.y += ball.vy;

    }

}

function draw(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    // ボール
    ctx.beginPath();
    ctx.arc(ball.x,ball.y,ball.r,0,Math.PI*2);
    ctx.fillStyle="dodgerblue";
    ctx.fill();

    // 照準
    if(!moving){

        const rad=angle*Math.PI/180;

        ctx.beginPath();
        ctx.moveTo(ball.x,ball.y);
        ctx.lineTo(
            ball.x+Math.cos(rad)*60,
            ball.y-Math.sin(rad)*60
        );
        ctx.strokeStyle="red";
        ctx.lineWidth=3;
        ctx.stroke();

    }

    ctx.fillStyle="black";
    ctx.font="20px sans-serif";

    ctx.fillText("角度："+angle+"°",20,30);
    ctx.fillText("パワー："+power,20,60);

}

function gameLoop(){

    update();

    draw();

    requestAnimationFrame(gameLoop);

}

gameLoop();

document.addEventListener("keydown",(e)=>{

    if(!moving){

        if(e.key==="ArrowLeft") angle-=5;
        if(e.key==="ArrowRight") angle+=5;
        if(e.key==="ArrowUp") power++;
        if(e.key==="ArrowDown"){
            power--;
            if(power<1) power=1;
        }

    }

    if(e.code==="Space"){
        shoot();
    }

    if(e.key==="r" || e.key==="R"){
        resetBall();
    }

});