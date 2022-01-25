var canvas = document.querySelector('canvas');
canvas.width = 800;
canvas.height = 600;

//brick image//
//var img = document.querySelector('img');

// var img = new Image();
// img.src = "brick.png";
// img.onload = function () {
//     c.drawImage(img, 10, 10, 20, 20);
// }

var c = canvas.getContext('2d');
let moveLeft = false;
let moveRight = false;


document.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowLeft') {
        moveLeft = true;
    } if (event.key === 'ArrowRight') {
        moveRight = true;
    }

})
document.addEventListener('keyup', function (event) {
    if (event.key === 'ArrowLeft') {
        moveLeft = false;
    } if (event.key === 'ArrowRight') {
        moveRight = false;
    }

})


let playerLife = 3;

console.log(playerLife);
function Paddle(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.dx = 5;
    this.dy = 5;
}
//Draw Paddle//
Paddle.prototype.draw = function () {
    c.fillStyle = 'blue';
    c.fillRect(this.x, this.y, this.width, this.height);

}
// Move Paddle//
Paddle.prototype.update = function () {
    paddle.draw();
    if (moveLeft && this.x > 0) {
        this.x -= this.dx;
    } else if (moveRight && this.x + this.width < canvas.width) {
        this.x += this.dx;
    }
}

//Ball constructor//

function Ball(x, y, radius,) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.speed = 4;
    this.dx = (Math.random() * 2 - 1) * 3;
    this.dy = -3;
}

Ball.prototype.draw = function () {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = 'red';
    c.fill();
    c.closePath();
}
Ball.prototype.update = function () {
    ball.draw();
    ballPaddleCollision();
    if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
        this.dx = -this.dx;
    } if (this.y - this.radius < 0) {
        this.dy = -this.dy;
    } if (this.y + this.radius > canvas.height) {
        playerLife = -1;
        resetBall();
    }

    this.x += this.dx;
    this.y += this.dy;
}

function ballPaddleCollision() {
    if (ball.x + ball.radius < paddle.x + paddle.width && ball.x + ball.radius >= paddle.x && ball.y <= paddle.y + paddle.height && ball.y + ball.radius >= paddle.y) {
        // still need to understand//
        //check where the ball hits the Paddle//
        let collidePoint = ball.x - (paddle.x + paddle.width / 2);
        //normalize the values//
        collidePoint = collidePoint / (paddle.width / 2);
        //calculate the angle of the ball//
        let angle = collidePoint * Math.PI / 3;

        ball.dx = ball.speed * Math.sin(angle);
        ball.dy = - ball.speed * Math.cos(angle);

    }
}


const brick = {
    image: document.getElementById('myImage'),
    row: 3,
    column: 10,
    width: 55,
    height: 20,
    marginTop: 20
}

let bricks = [];
function creatBricks() {
    for (let c = 0; c < brick.column; c++) {
        brick[c] = [];
        for (let r = 0; r < brick.row; r++) {
            brick[c][r] = {
                x: 80 * r,
                y: 20 + 24 * c,

            }
        }
    }
}

creatBricks();
function drawBricks() {
    for (let c = 0; c < brick.column; c++) {
        for (let r = 0; r < brick.row; r++) {
            brick[c][r].x = 80 * r;
            brick[c][r].y = 20 + 24 * c;
            c.drawImage(brick.image);
        }
    }
}


var paddle = new Paddle(canvas.width / 2 - 50, canvas.height - 30, 100, 15);
var ball = new Ball(canvas.width / 2, paddle.y - 8, 8);


function resetBall() {
    ball = new Ball(canvas.width / 2, paddle.y - 8, 8);
}
function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    paddle.update();
    ball.update();
    drawBricks();
}
animate();

