// Based on JEFF THOMPSONs reading video pixels- webcam tracking in p5js on his youtube channer
// https://www.youtube.com/watch?v=VYg-YdGpW1o
// 영상보면서 재구성하여 만들었고 블랜드모드로 필터를 넣고 픽셀을 겹쳐 사각형 픽셀만 로테이션값을 줘서 돌아가게 만들었습니다
// JEFF THOMPSON의 페이스 트랙킹 원조 코드입니다

// let video;

// function setup() {
//   createCanvas(windowWidth, windowHeight);

//   video = createCapture(VIDEO);
//   video.size(width, height);
//   video.hide();
// }

// function draw() {
//   background(255);

//   let gridSize = int(map(mouseX, 0,width, 15,50));

//   video.loadPixels();
//   for (let y=0; y<video.height; y+=gridSize) {
//     for (let x=0; x<video.width; x+=gridSize) {

//       let index = (y * video.width + x) * 4;
//       let r = video.pixels[index];
//       let dia = map(r, 0,255, gridSize,2);

//       fill(0);
//       noStroke();
//       circle(x+gridSize/2,y+gridSize/2, dia);
//     }
//   }

// }

let Vid;
let rotationAngle = 0;
let filterAdd;

function setup() {
  setCanvasContainer('canvas', 3, 2, true);

  Vid = createCapture(VIDEO);
  Vid.size(width, height);
  Vid.hide();
  noStroke();
  frameRate(30);
  filterAdd = createGraphics(width, height);

  console.log(Vid);
}

function draw() {
  background(0);
  translate(width, 0);
  scale(-1, 1);

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

      let rotateX = sin(frameCount * 0.1);
      let rotateY = cos(frameCount * 0.1);
      let rotatingX = x + gridSize / 2 + rotateX;
      let rotatingY = y + gridSize / 2 + rotateY;

      rotationAngle += radians(1.5);

      push();
      translate(rotatingX, rotatingY);
      rotate(rotationAngle);

      rect(-dia / 2, -dia / 2, dia, dia);
      pop();

      fill(random(255), random(255), random(255), 60);
      // rectMode(CENTER);

      circle(x + gridSize / 2, y + gridSize / 2, dia);
    }
  }
}
