// Declare variables
let ratHeads = [];
let numRatHeads = 30;

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Create rat head objects
  for (let i = 0; i < numRatHeads; i++) {
    ratHeads.push(new RatHead());
  }
}

function draw() {
  // Kawaii pastel background
  background(220, 240, 255);
  noStroke();
  fill(255, 200, 200, 50);
  ellipse(random(width), random(height), random(50, 100));

  // Display rat heads
  for (let ratHead of ratHeads) {
    ratHead.display();
    ratHead.update();
    ratHead.reactToMouse();
  }
}

class RatHead {
  constructor() {
    this.x = random(width);
    this.y = random(-height, 0);
    this.speed = random(1, 3);
    this.size = random(20, 50);
    this.blinkDuration = random(2000, 5000);
  }

  display() {
    push();
    translate(this.x, this.y);

    // Rat head
    fill(200, 150, 220);
    ellipse(0, 0, this.size, this.size * 1.2);

    // Rat ears
    ellipse(-this.size * 0.4, -this.size * 0.5, this.size * 0.5, this.size * 0.5);
    ellipse(this.size * 0.4, -this.size * 0.5, this.size * 0.5, this.size * 0.5);

    // Rat eyes
    fill(0);
    if (millis() % this.blinkDuration < 100) {
      rect(-this.size * 0.3, -this.size * 0.2, this.size * 0.2, this.size * 0.05);
      rect(this.size * 0.1, -this.size * 0.2, this.size * 0.2, this.size * 0.05);
    } else {
      ellipse(-this.size * 0.3, -this.size * 0.2, this.size * 0.2, this.size * 0.2);
      ellipse(this.size * 0.1, -this.size * 0.2, this.size * 0.2, this.size * 0.2);
    }

    // Rat nose
    fill(0);
    ellipse(0, 0, this.size * 0.15, this.size * 0.15);


    pop();
  }

  update() {
    this.y += this.speed;

    // Reset position when off-screen
    if (this.y > height + this.size) {
      this.y = random(-height, 0);
      this.x = random(width);
    }
  }
  reactToMouse() {
    let d = dist(this.x, this.y, mouseX, mouseY);
    let escapeRadius = 100;

    if (d < escapeRadius) {
      let dx = this.x - mouseX;
      let dy = this.y - mouseY;

      let escapeForce = 5;

      this.x += dx * escapeForce / d;
      this.y += dy * escapeForce / d;
    }
  }
}

