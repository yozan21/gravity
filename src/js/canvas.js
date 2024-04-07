import utils, { randomColor, randomIntFromRange } from "./utils";

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2,
};

const colors = ["#2185C5", "#7ECEFD", "#FFF6E5", "#FF7F66"];

const gravity = 1;
const friction = 0.95;

// Event Listeners
addEventListener("mousemove", (event) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  init();
});
addEventListener("click", function () {
  init();
});
// Objects
class Ball {
  constructor(x, y, dx, dy, radius, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;
  }

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.stroke();
    c.closePath();
  }

  update() {
    if (this.y + this.radius + this.dy > canvas.height) {
      this.dy = -this.dy * friction;
      Math.abs(this.dy) < 0.000001 ? (this.dy = 0) : (this.dy = this.dy);
      // console.log(this.dy);
    } else {
      this.dy += gravity;
    }
    if (
      this.x + this.radius + this.dx > canvas.width ||
      this.x - this.radius <= 0
    ) {
      if (this.dy == 0) {
        this.dx = 0;
      } else {
        this.dx = -this.dx * friction;
        Math.abs(this.dx) < 0.0001 ? (this.dx = 0) : (this.dx = this.dx);
      }
      // console.log(this.dy);
    }
    this.x += this.dx;
    this.y += this.dy;
    this.draw();
  }
}

// Implementation
let ballArr;
function init() {
  ballArr = [];
  // ball = new Ball(canvas.width / 2, canvas.height / 2, 2, 30, "red");
  for (let i = 0; i < 400; i++) {
    // objects.push()
    const x = randomIntFromRange(0 + radius, canvas.width - radius);
    const y = randomIntFromRange(0, canvas.height - radius);
    const dx = randomIntFromRange(-2, 2);
    const dy = randomIntFromRange(-2, 2);
    const radius = randomIntFromRange(8, 30);
    const color = randomColor(colors);
    ballArr.push(new Ball(x, y, dx, dy, radius, color));
  }
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  ballArr.forEach((ball) => {
    ball.update();
  });
}

init();
animate();
