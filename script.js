const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

// ボール
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

// 初期位置に戻す
function resetBall() {
    ball.x = 100;
    ball.y = 300;
    ball.vx = 0;
    ball.vy = 0;
    moving = false;
}

// 発射
function shoot() {

    if (moving) return;

    const rad = angle * Math.PI / 180;

    ball.vx = Math.cos(rad) * power;
    ball.vy = -Math.sin(rad) * power;

    moving = true;
}

// 更新
function update() {

    if (!moving) return;

    ball.x += ball.vx;
    ball.y += ball.vy;

    // 左右の壁
    if (ball.x - ball.r <= 0) {
        ball.x = ball.r;
        ball.vx = -ball.vx;
    }

    if (ball.x + ball.r >= canvas.width) {
        ball.x = canvas.width - ball.r;
        ball.vx = -ball.vx;
    }

    // 上下の壁
    if (ball.y - ball.r <= 0) {
        ball.y = ball.r;
        ball.vy = -ball.vy;
    }

    if (ball.y + ball.r >= canvas.height) {
        ball.y = canvas.height - ball.r;
        ball.vy = -ball.vy;
    }

}

// 描画
function draw() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // ボール
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
    ctx.fillStyle = "dodgerblue";
    ctx.fill();

    // 照準
    if (!moving) {

        const rad = angle * Math.PI / 180;

        ctx.beginPath();
        ctx.moveTo(ball.x, ball.y);
        ctx.lineTo(
            ball.x + Math.cos(rad) * 60,
            ball.y - Math.sin(rad) * 60
        );
        ctx.strokeStyle = "red";
        ctx.lineWidth = 3;
        ctx.stroke();

    }

    // 情報
    ctx.fillStyle = "black";
    ctx.font = "20px sans-serif";
    ctx.fillText("角度: " + angle + "°", 20, 30);
    ctx.fillText("パワー: " + power, 20, 60);

}

// メインループ
function gameLoop() {

    update();
    draw();

    requestAnimationFrame(gameLoop);

}

gameLoop();

// キー操作
document.addEventListener("keydown", function (e) {

    if (!moving) {

        if (e.key === "ArrowLeft") angle -= 5;
        if (e.key === "ArrowRight") angle += 5;
        if (e.key === "ArrowUp") power++;
        if (e.key === "ArrowDown") {
            power--;
            if (power < 1) power = 1;
        }

    }

    if (e.code === "Space") {
        shoot();
    }

    if (e.key === "r" || e.key === "R") {
        resetBall();
    }

});