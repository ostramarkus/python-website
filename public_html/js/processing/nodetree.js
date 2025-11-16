let tree;

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(0);
	blendMode(ADD);
	colorMode(HSB, 360, 100, 100, 100);
	tree = new Tree();
}

function draw() {
	clear();
	tree.tick();
}

class Tree {
	constructor() {
		this.rootNode = null;
		this.maxGen = 0;
		this.medianChildren = 1;
		this.nodes = [];
		this.init();
	}

	init() {
		this.rootNode = new Node(this);
		this.rootNode.radianShiftSpread = TWO_PI;
		this.rootNode.maxChildren = 20;
	}

	tick() {
		this.rootNode.tick();
	}
}

class Node {
	constructor(_tree) {
		this.tree = _tree;
		this.parent = null;
		this.root = null;
		this.children = [];
		this.maxChildren = this.tree.medianChildren;
		this.generation = 1;
		this.pos = createVector(width * 0.8, height * 0.2);
		this.stemLength = random(20, 40);
		this.age = 0;
		this.hue = random(360);
		this.rotation = -HALF_PI;
		this.radianShiftSpread = HALF_PI * 0.7;
		this.radianShift = randomGaussian(0, HALF_PI * 0.25);
	}

	tick() {
		this.update()
		this.display();
		for (let child of this.children) {
			child.tick();
		}
	}

	update() {
		this.age++;

		if (this.parent) {
			let generationFactor = this.generation / 6;
			let stemLengthAnim = sin(frameCount * 0.005 * TWO_PI * generationFactor);
			let baseStemLength = min(this.stemLength, this.age / 100 * this.stemLength);
			let currentStemLength = (baseStemLength * 0.9) + (stemLengthAnim * baseStemLength * 0.1);

			let noiseValue = noise(this.pos.x * 0.001, this.pos.y * 0.001, frameCount * 0.001);
			this.rotation = this.radianShift + HALF_PI * 0.5 * (1 - noiseValue * 2);
			this.rotation = this.radianShift;
			this.pos.x = this.parent.pos.x + cos(this.rotation) * currentStemLength;
			this.pos.y = this.parent.pos.y + sin(this.rotation) * currentStemLength;
		}

		if (frameRate() > 40 &&
			this.age > 30 &&
			random(1000) > 990) {
			this.spawnChild();
		}

	}

	display() {
		let currentHue = abs(this.hue % 360);
		stroke(currentHue, 80, 80, 50);
		fill(currentHue, 80, 80, 80);
		circle(this.pos.x, this.pos.y, 5);
		if (this.parent) {
			line(this.pos.x, this.pos.y, this.parent.pos.x, this.parent.pos.y);
		}
	}

	spawnChild() {
		let childShift = this.radianShiftSpread / this.maxChildren;
		let thisChildShift = -this.radianShiftSpread * 0.5 + childShift * this.children.length;
		thisChildShift = random(-this.radianShiftSpread * 0.5, + this.radianShiftSpread * 0.5);


		let child = new Node(this.tree);
		child.parent = this;
		child.hue = this.hue + random(-20, 20);
		child.generation = this.generation + 1;
		if (!this.parent) {
			child.radianShift = random(TWO_PI);
		}
		child.radianShift = this.radianShift + thisChildShift;
		this.children.push(child);

		this.tree.maxGen = max(this.tree.maxGen, child.generation);
	}
}