var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');
console.log(canvas);

window.addEventListener('resize', function () {
    init();
})

function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function getDistance(x1, y1, x2, y2) {
    const xDistance = x2 - x1;
    const yDistance = y2 - y1;

    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}

function Particle(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.veloctiy = {
        x: Math.random() - 0.5 * 3,
        y: Math.random() - 0.5 * 3
    }
    this.radius = radius;
    this.color = color;
    this.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this
            .radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.stroke();
        c.fill();
    }
    this.update = function (particles) {
        for (let i = 0; i < particles.length; i++) {
            if (this === particles[i]) continue;
            if (getDistance(this.x, this.y, particles[i].x, particles[i].y) - radius * 2 < 0) {
                // console.log('hascollided');

            }
        }

        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
            this.veloctiy.x = -this.veloctiy.x;
        }
        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {

            this.veloctiy.y = -this.veloctiy.y;
        }

        this.x += this.veloctiy.x;
        this.y += this.veloctiy.y;
        this.draw();
    }
}

let particles = [];

function init() {
    particles = [];
    for (let i = 0; i < 4; i++) {
        const radius = 100;
        let x = randomIntFromRange(radius, canvas.width - radius);
        let y = randomIntFromRange(radius, canvas.height - radius);

        const color = 'blue';

        // if particle of particles is not at 0 then particles should be spawn at differnt place using pythaorous therom and spawn x and y cordinate each time at different place.//
        if (i !== 0) {
            for (let j = 0; j < particles.length; j++) {
                if (getDistance(x, y, particles[j].x, particles[j].y) - radius * 2 < 0) {
                    x = randomIntFromRange(radius, canvas.width - radius);
                    y = randomIntFromRange(radius, canvas.height - radius);

                    // to start the loop again to make sure the particles do not spawn on each other.//
                    j = -1;
                }
            }
        }
        particles.push(new Particle(x, y, radius, color));
        // console.log(particles);
    }
}


function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    particles.forEach(particle => {
        particle.update(particles);
    })
}
init();
animate();




let array = [4, 5, 6];
array.unshift(1, 2, 3);
console.log(array); 