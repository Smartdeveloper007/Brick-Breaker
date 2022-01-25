var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
console.log(canvas);
var c = canvas.getContext('2d');


function getDistance(x1, y1, x2, y2) {
    var xDistance = x2 - x1;
    var yDistance = y2 - y1;

    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}

var mouse = {
    x: 10,
    y: 10
}

window.addEventListener('mousemove', function (event) {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
    console.log(event);
})
window.addEventListener('resize', function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
})

function Circle(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
    }
    this.update = function () {
        this.draw();
    }
}
var circle1;
var circle2;
function init() {
    circle1 = new Circle(300, 300, 100, 'green');
    circle2 = new Circle(undefined, undefined, 30, 'red');

}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);

    circle2.x = mouse.x;
    circle2.y = mouse.y;
    circle1.update();
    circle2.update();
    if (getDistance(circle1.x, circle1.y, circle2.x, circle2.y) < circle1.radius + circle2.radius) {
        circle1.color = 'red';
    } else {
        circle1.color = 'green';
    }


    // console.log(getDistance(circle1.x, circle1.y, circle2.x, circle2.y));
}

init();
animate();