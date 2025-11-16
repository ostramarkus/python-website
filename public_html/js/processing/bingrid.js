let noiseRes = 0.3;
let noiseSpeed = 0.02;
let cellSize = 24;
let pixels = [];

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(100);
	textFont('Courier New');
	textSize(10);
	fill(255, 30);
	frameRate(20);
	createBinGrid();
	noStroke();
}

function draw() {
	clear();
	createBinGrid();
}

function createBinGrid() {
	noStroke();
	cellsX = ceil(width / cellSize)
	cellsY = ceil(width / cellSize)
	for (let y = 0; y < cellsY; y += 1) {
		for (let x = 0; x < cellsX; x += 1) {
			let posX = x * cellSize;
			let posY = y * cellSize;
			let alpha = noise(x * noiseRes, y * noiseRes, frameCount * noiseSpeed);
			fill(0, alpha * 100);
			if (mouseX > posX && mouseX < posX + cellSize && mouseY > posY && mouseY < posY + cellSize) {
				fill(255, 60);
			}

			if (pixels.indexOf([x, y]) != -1) {
				fill(255, 100);
			}

			rect(posX, posY, cellSize - 1, cellSize - 1);
		}
	}
}

function mousePressed() {
	let gridX = ceil(mouseX / cellSize)
	let gridY = ceil(mouseY / cellSize)
	pixels.push([gridX, gridY])
	console.log(pixels)
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}