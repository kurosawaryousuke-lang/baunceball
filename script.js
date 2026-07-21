const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

// ボール
const ball = {
    x: 100,
    y: 300,
    r: 10
};

// 発射角度（度）
let angle = 0;

// 発射パワー
let power = 8;

// 描画
function draw() {

    // 背景
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // ボール
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
    ctx.fillStyle = "dodgerblue";
    ctx.fill();

    // 狙い線
    const length = 60;

    const rad = angle * Math.PI / 180;

    ctx.beginPath();
    ctx.moveTo(ball.x, ball.y);
    ctx.lineTo(
        ball.x + Math.cos(rad) * length,
        ball.y - Math.sin(rad) * length
    );
    ctx.strokeStyle = "red";
    ctx.lineWidth = 3;
    ctx.stroke();

    // 情報表示
    ctx.fillStyle = "black";
    ctx.font = "20px sans-serif";
    ctx.fillText("角度: " + angle + "°", 20, 30);
    ctx.fillText("パワー: " + power, 20, 60);
}

draw();

// キー操作
document.addEventListener("keydown", (e)=>{

    if(e.key==="ArrowLeft"){
        angle -= 5;
    }

    if(e.key==="ArrowRight"){
        angle += 5;
    }

    if(e.key==="ArrowUp"){
        power++;
    }

    if(e.key==="ArrowDown"){
        power--;
        if(power<1) power=1;
    }

    draw();

});