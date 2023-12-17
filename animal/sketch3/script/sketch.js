let cam;

function setup() {
  setCanvasContainer('canvas', 4, 3, true);

  const constraints = {
    video: {
      width: { exact: 320 },
      height: { exact: 240 },
    },
    audio: false,
  };
  cam = createCapture(constraints);
  cam.hide();
  colorMode(HSL, 140, 200, 150, 30);
}

function draw() {
  background('white');
  captureMagnify();
  translate(width, 0);
  scale(-1, 1);
}

function captureMagnify() {
  image(cam, 0, 0, width, height);

  const coordRatio = cam.width / width;
  const beginX = floor(mouseX * coordRatio) - 20;
  const beginY = floor(mouseY * coordRatio) - 20;
  cam.loadPixels();

  const maskDiameter = 200;
  const maskX = mouseX;
  const maskY = mouseY;

  // 마스크를 씌우보자
  push();
  ellipseMode(CENTER);

  noStroke();
  let coordY = 0;
  for (let y = beginY; y < beginY + 20; y += 1) {
    let coordX = 0;
    for (let x = beginX; x < beginX + 20; x += 1) {
      const pixelIdx = 4 * (cam.width * y + x);
      const r = cam.pixels[pixelIdx + 0];
      const g = cam.pixels[pixelIdx + 1];
      const b = cam.pixels[pixelIdx + 2];
      const pixelColor = color(r, g, b);
      const ratio = width / cam.width;

      if (
        dist(maskX, maskY, mouseX + coordX - 100, mouseY + coordY - 100) <
        maskDiameter / 2
      ) {
        fill(pixelColor);
        rect(mouseX + coordX - 100, mouseY + coordY - 100, 20);
      }
      coordX += 10;
    }
    coordY += 10;
  }

  pop();
}
