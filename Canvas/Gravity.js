var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
console.log(canvas);

var c = canvas.getContext('2d');
var gravity = 1;
var friction = 0.99;
// Gravity Circle//
window.addEventListener('resize', function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
})

var mouse = {
    x: undefined,
    y: undefined
};

var maxRadius = 40;
//var minRadius = 2;

window.addEventListener('mousemove', function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
    console.log(event);
})

window.addEventListener('click', function () {
    init();
})

var colors = [
    'orange',
    'blue',
    'green',
    'violet',
    'red'
];
console.log(colors);
function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)];
}

function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);

}

var Ball = function (x, y, radius, dx, dy, color) {
    this.x = x,
        this.y = y,
        this.radius = radius,
        this.minRadius = radius,
        this.dx = dx,
        this.dy = dy,
        this.color = color,
        this.draw = function () {
            c.beginPath();
            c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            c.fillStyle = this.color;
            c.stroke();
            c.fill();
        }
    this.update = function () {
        if (this.y + this.radius + this.dy > canvas.height) {
            this.dy = -this.dy * friction;
        } else {
            this.dy += gravity;
        }

        if (this.x + this.radius + this.dx > canvas.width ||
            this.x - this.radius < 0) {
            this.dx = -this.dx;
        }

        this.x += this.dx;
        this.y += this.dy;

        if (mouse.x - this.x < 50 && mouse.x - this.x > -50 &&
            mouse.y - this.y < 50 && mouse.y - this.y > -50) {
            if (this.radius < maxRadius) {
                this.radius += 1;
            }
        } else if (this.radius > this.minRadius) {
            this.radius -= 1;
        }
        this.draw();
    }

}

ballArray = [];
function init() {
    ballArray = [];

    for (var i = 0; i < 400; i++) {
        var radius = randomIntFromRange(8, 20);
        var x = randomIntFromRange(0, canvas.width - radius);
        var y = randomIntFromRange(0, canvas.height - radius);
        var dx = randomIntFromRange(-2, 2);
        var dy = randomIntFromRange(-2, 2);
        var color = randomColor(colors);
        ballArray.push(new Ball(x, y, radius, dx, dy, color))
    }
    // console.log(ballArray);


}
function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    for (var i = 0; i < ballArray.length; i++) {
        ballArray[i].update();
    }
}
init();
animate();



