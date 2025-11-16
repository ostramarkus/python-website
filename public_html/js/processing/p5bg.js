class Particle {
	constructor(x, y) {
		this.pos = createVector(x, y);
		this.heading = p5.Vector.random2D();
		this.speed = random(0, 0.2);
	}

	display() {
		let distLimit = 140;
		noStroke()
		circle(this.pos.x, this.pos.y, 2);

		for (particle of particles) {
			if (particle != this) {
				let dist = this.pos.dist(particle.pos);
				if (dist < distLimit) {
					let lineAlpha = (distLimit - dist) / distLimit;
					stroke(255, 20 * lineAlpha);
					line(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y);
				}
			}
		}
	}

	update() {
		this.velocity = p5.Vector.mult(this.heading, this.speed);
		this.pos.add(this.velocity)
		if (this.pos.x > width) this.pos.x = 0;
		if (this.pos.x < 0) this.pos.x = width
		if (this.pos.y > height) this.pos.y = 0;
		if (this.pos.y < 0) this.pos.y = height;
	}
}

particles = []

function setup() {
	noStroke();
	fill(255, 20);
	createCanvas(windowWidth, windowHeight);
	background(0);

	for (let i = 0; i < 100; i++) {
		particles.push(new Particle(random(width), random(height)));
	}
}

function draw() {
	clear();
	for (particle of particles) {
		particle.update();
		particle.display();
	}
}