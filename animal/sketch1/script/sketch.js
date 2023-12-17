let Vid;
let rotationAngle = 0;
let filterAdd;

function setup() {
  setCanvasContainer('canvas', 4, 3, true);

  const constraints = {
    video: {
      width: { exact: 320 },
      height: { exact: 240 },
    },
    audio: false,
  };

  Vid = createCapture(VIDEO);
  Vid.size(width, height);
  Vid.hide();
  noStroke();
  filterAdd = createGraphics(width, height);

  console.log(Vid);
}

function draw() {
  background(0);

  Vid.position(0, 0);

  filterAdd.image(Vid, 0, 0, width, height);
  filterAdd.filter(POSTERIZE, 13);

  blendMode(SCREEN);
  image(filterAdd, 0, 0);
  blendMode(NORMAL);

  //   그리드설정하귀
  let gridSize = int(map(mouseX, 0, width, 10, 45));

  Vid.loadPixels();
  for (let y = 0; y < Vid.height; y += gridSize) {
    for (let x = 0; x < Vid.width; x += gridSize) {
      let index = (y * Vid.width + x) * 4;
      let r = Vid.pixels[index];

      let dia = map(r, 0, 255, gridSize, 2);

      // // 픽셀 위에 애니 더하귀
      // let bounceX = sin(frameCount * 0.15);
      // let bounceY = cos(frameCount * 0.15);
      // let bouncingX = x + gridSize / 2 + bounceX * 5;
      // let bouncingY = y + gridSize / 2 + bounceY * 5;
      // rect(bouncingX, bouncingY, dia);

      let bounceX = sin(frameCount * 0.1);
      let bounceY = cos(frameCount * 0.1);
      let bouncingX = x + gridSize / 2 + bounceX;
      let bouncingY = y + gridSize / 2 + bounceY;

      rotationAngle += radians(1.5); //회전스피드

      push();
      translate(bouncingX, bouncingY);
      rotate(rotationAngle);

      rect(-dia / 2, -dia / 2, dia, dia); // 위치지정
      pop();

      fill(random(255), random(255), random(255), 60);
      // rectMode(CENTER);

      circle(x + gridSize / 2, y + gridSize / 2, dia);
    }
  }
}
