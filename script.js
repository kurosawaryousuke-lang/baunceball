const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

// ===== ステージ =====
const stage = {
    start: { x: 100, y: 300 },

    goal: { x: 820, y: 300, r: 20 },

    stars: [
        { x: 200, y: 100, got: false },
        { x: 700, y: 500, got: false }
    ]
};
// 星
ctx.fillStyle = "gold";

for (const star of stage.stars) {

    if (!star.got) {

        ctx.beginPath();
        ctx.arc(star.x, star.y, 8, 0, Math.PI * 2);
        ctx.fill();

    }

}
// ===== ボール =====
const ball = {
    x: stage.start.x,
    y: stage.start.y,
    r: 10,
    vx: 0,
    vy: 0,
    moving: false
};

// ===== 操作 =====
let angle = 0;
let power = 8;

// ===== リセット =====
function resetBall() {
    ball.x = stage.start.x;
    ball.y = stage.start.y;
    ball.vx = 0;
    ball.vy = 0;
    ball.moving = false;
}

// ===== 発射 =====
function shoot() {

    if (ball.moving) return;

    const rad = angle * Math.PI / 180;

    ball.vx = Math.cos(rad) * power;
    ball.vy = -Math.sin(rad) * power;

    ball.moving = true;
}

// ===== 更新 =====
function update() {

    if (!ball.moving) return;

    const steps = Math.ceil(
        Math.max(Math.abs(ball.vx), Math.abs(ball.vy))
    );

    const stepX = ball.vx / steps;
    const stepY = ball.vy / steps;

    for (let i = 0; i < steps; i++) {

        ball.x += stepX;
        ball.y += stepY;

        // ===== 壁との当たり判定 =====
        for (const wall of walls) {

            if (
                ball.x + ball.r > wall.x &&
                ball.x - ball.r < wall.x + wall.w &&
                ball.y + ball.r > wall.y &&
                ball.y - ball.r < wall.y + wall.h
            ) {

                const overlapLeft = (ball.x + ball.r) - wall.x;
                const overlapRight = (wall.x + wall.w) - (ball.x - ball.r);

                const overlapTop = (ball.y + ball.r) - wall.y;
                const overlapBottom = (wall.y + wall.h) - (ball.y - ball.r);

                const minOverlap = Math.min(
                    overlapLeft,
                    overlapRight,
                    overlapTop,
                    overlapBottom
                );

                if (minOverlap === overlapLeft) {
                    ball.x = wall.x - ball.r;
                    ball.vx *= -1;
                }
                else if (minOverlap === overlapRight) {
                    ball.x = wall.x + wall.w + ball.r;
                    ball.vx *= -1;
                }
                else if (minOverlap === overlapTop) {
                    ball.y = wall.y - ball.r;
                    ball.vy *= -1;
                }
                else {
                    ball.y = wall.y + wall.h + ball.r;
                    ball.vy *= -1;
                }
            }
        }

        // ===== 画面端 =====
        if (ball.x - ball.r < 0) {
            ball.x = ball.r;
            ball.vx *= -1;
        }

        if (ball.x + ball.r > canvas.width) {
            ball.x = canvas.width - ball.r;
            ball.vx *= -1;
        }

        if (ball.y - ball.r < 0) {
            ball.y = ball.r;
            ball.vy *= -1;
        }

        if (ball.y + ball.r > canvas.height) {
            ball.y = canvas.height - ball.r;
            ball.vy *= -1;
        }

        // ===== ゴール =====
        const dx = ball.x - stage.goal.x;
        const dy = ball.y - stage.goal.y;

        if (Math.sqrt(dx * dx + dy * dy) < ball.r + stage.goal.r) {

            alert("Stage Clear!");
            resetBall();
            return;
        }
    }
}
// ===== 描画 =====
function draw() {

    console.log("draw");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 背景
    ctx.fillStyle = "#dff6ff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // ゴール
    ctx.beginPath();
    ctx.arc(stage.goal.x, stage.goal.y, stage.goal.r, 0, Math.PI * 2);
    ctx.fillStyle = "limegreen";
    ctx.fill();

    // 壁
ctx.fillStyle = "#2b6cff";

for (const wall of walls) {
    ctx.fillRect(wall.x, wall.y, wall.w, wall.h);
}

    // ボール
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
    ctx.fillStyle = "dodgerblue";
    ctx.fill();

    // 照準
    if (!ball.moving) {

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

    // UI
    ctx.fillStyle = "black";
    ctx.font = "20px sans-serif";
    ctx.fillText("角度 : " + angle + "°", 20, 30);
    ctx.fillText("パワー : " + power, 20, 60);
}

// ===== メインループ =====
function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();

// ===== キー操作 =====
document.addEventListener("keydown", (e) => {

    if (!ball.moving) {

        if (e.key === "ArrowLeft") {
    angle -= 5;
    if (angle < 0) angle = 355;
}
        if (e.key === "ArrowRight") {
    angle += 5;
    if (angle >= 360) angle = 0;
}

        if (e.key === "ArrowUp") {
    power++;
    if (power > 100) power = 100;
}

        if (e.key === "ArrowDown") {
            power--;
            if (power < 1) power = 1;
        }
    }

    if (e.code === "Space") {       e.preventDefault();
        shoot();
    }

    if (e.key === "r" || e.key === "R") {
        resetBall();
    }

});