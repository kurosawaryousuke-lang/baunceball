const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

// ===== ステージ =====
const stages = [
{
    start: { x: 100, y: 300 },

    goal: { x: 820, y: 300, r: 20 },

    stars: [
        { x: 200, y: 100, got: false },
        { x: 700, y: 500, got: false }
    ],
    spikes: [
    { x: 450, y: 250, r: 15 },
    { x: 600, y: 400, r: 15 }
]
},
{
    start: { x: 100, y: 500 },

    goal: { x: 800, y: 80, r: 20 },

    stars: [
        { x: 200, y: 500, got: false },
        { x: 500, y: 250, got: false },
        { x: 700, y: 120, got: false }
    ],

    spikes: [
        { x: 350, y: 350, r: 15 },
        { x: 600, y: 200, r: 15 }
    ]
}
];

let currentStage = 0;
let stage = stages[currentStage];
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
let resetting = false;
let countdown = 0;

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

    if (ball.moving || resetting) return;

    const rad = angle * Math.PI / 180;

    ball.vx = Math.cos(rad) * power;
    ball.vy = -Math.sin(rad) * power;

    ball.moving = true;
}

// ===== 更新 =====
function update() {

    if (!ball.moving) return;

ball.x += ball.vx;
ball.y += ball.vy;
// 摩擦
ball.vx *= 0.995;
ball.vy *= 0.995;

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
if (
    Math.abs(ball.vx) < 0.05 &&
    Math.abs(ball.vy) < 0.05 &&
    !resetting
) {
    ball.vx = 0;
    ball.vy = 0;

    resetting = true;

countdown = 3;

const timer = setInterval(() => {

    countdown--;

    if (countdown <= 0) {

        clearInterval(timer);

        resetBall();

        resetting = false;

    }

}, 1000);
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

        // ===== 星を取る =====
for (const star of stage.stars) {

    if (star.got) continue;

    const dx = ball.x - star.x;
    const dy = ball.y - star.y;

    if (Math.sqrt(dx * dx + dy * dy) < ball.r + 10) {

        star.got = true;

    }

}

const starsLeft = stage.stars.filter(star => !star.got).length;

// ===== トゲ =====
for (const spike of stage.spikes) {

    const dx = ball.x - spike.x;
    const dy = ball.y - spike.y;

    if (Math.sqrt(dx * dx + dy * dy) < ball.r + spike.r) {

        alert("💥 トゲに当たった！");

        resetBall();
        return;
    }
}
        // ===== ゴール =====
        const dx = ball.x - stage.goal.x;
        const dy = ball.y - stage.goal.y;

        if (Math.sqrt(dx * dx + dy * dy) < ball.r + stage.goal.r) {
if (starsLeft === 0) {

    alert("Stage Clear!");
    resetBall();
    return;

} else {

    alert("星を全部集めよう！");
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
ctx.fillStyle = "gold";

for (const star of stage.stars) {

    if (star.got) continue;

    const spikes = 5;
    const outer = 10;
    const inner = 4;

    let rot = Math.PI / 2 * 3;
    let x = star.x;
    let y = star.y;

    ctx.beginPath();
    ctx.moveTo(x, y - outer);

    for (let i = 0; i < spikes; i++) {

        ctx.lineTo(
            x + Math.cos(rot) * outer,
            y + Math.sin(rot) * outer
        );

        rot += Math.PI / spikes;

        ctx.lineTo(
            x + Math.cos(rot) * inner,
            y + Math.sin(rot) * inner
        );

        rot += Math.PI / spikes;
    }

    ctx.closePath();
    ctx.fill();
}
// ===== トゲ =====
ctx.fillStyle = "crimson";

for (const spike of stage.spikes) {

    ctx.beginPath();

    for (let i = 0; i < 3; i++) {

        const angle = Math.PI * 2 / 3 * i - Math.PI / 2;

        const x = spike.x + Math.cos(angle) * spike.r;
        const y = spike.y + Math.sin(angle) * spike.r;

        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    }

    ctx.closePath();
    ctx.fill();
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
    if (resetting) {

    ctx.fillStyle = "rgba(0,0,0,0.5)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "white";
    ctx.font = "80px sans-serif";
    ctx.textAlign = "center";

    ctx.fillText(
        countdown,
        canvas.width / 2,
        canvas.height / 2
    );

    ctx.textAlign = "left";

}
const starsGot = stage.stars.filter(star => star.got).length;
const starsTotal = stage.stars.length;

document.getElementById("starText").textContent =
    `⭐ ${starsGot} / ${starsTotal}`;
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
    if (power > 20) power = 20;
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