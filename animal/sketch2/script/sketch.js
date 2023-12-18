// Based on JEFF THOMPSONs simple face detection in p5js on his youtube channer
// https://www.youtube.com/watch?v=jovusqHNpRo
// 뱀과 비둘기 예제는 교수님 상담 통해서 완성한 코드이고 제프 톰슨꺼 재구성하여 합쳐서 완성했습니다
let cam;
let something;

function setup() {
  setCanvasContainer('canvas', 4, 3, true);

  const constraints = {
    video: {
      width: { exact: 320 },
      height: { exact: 240 },
    },
    audio: false,
  };
  //   let constraints = {
  //     video: {
  //       mandatory: {
  //         minWidth: 1280,
  //         minHeight: 720,
  //       },
  //       optional: [{ maxFrameRate: 10 }],
  //     },
  //     audio: false,
  //   };
  cam = createCapture(constraints);
  cam.hide();

  // 콘솔에 로딩이 뜨고 로디드가 뜨면 detection이 화면에 표시
  console.log('loading model...');
  cocoSsd.load().then((cocoSsd) => {
    console.log('- loaded');
    something = cocoSsd;
  });

  background('white');
}

function draw() {
  background('white');
  // captureDot();
  captureIR();

  image(cam, 0, 0);

  if (cam.width > 0 && something !== undefined) {
    const imgDatayo = drawingContext.getImageData(0, 0, width, height);
    something.detect(imgDatayo).then((predictions) => {
      for (let p of predictions) {
        let x = p.bbox[0];
        let y = p.bbox[1];
        let w = p.bbox[2];
        let h = p.bbox[3];

        strokeWeight(4);
        stroke(0);
        noFill();
        rect(x, y, w, h);

        let textSizeVal = 18;
        textSize(textSizeVal);

        fill(255);
        noStroke();
        text(p.class + ': ' + nf(p.score, 0, 4), x + 10, y + 15);
      }
    });
  }
}

// function captureDot() {
//   cam.loadPixels();
//   noStroke();
//   fill('black');
//   for (let y = 5; y < cam.height; y += 10) {
//     for (let x = 5; x < cam.width; x += 10) {
//       const pixelIdx = 4 * (cam.width * y + x);
//       const r = cam.pixels[pixelIdx + 0];
//       const g = cam.pixels[pixelIdx + 1];
//       const b = cam.pixels[pixelIdx + 2];
//       const a = cam.pixels[pixelIdx + 3];
//       const pixelColor = color(r, g, b);
//       const pixelBrightness = brightness(pixelColor);
//       const canvasX = map(x, 0, cam.width - 1, 0, width - 1);
//       const canvasY = map(y, 0, cam.height - 1, 0, height - 1);
//       const ratio = width / cam.width;
//       ellipse(canvasX, canvasY, ratio * (10 - (10 * pixelBrightness) / 255));
//     }
//   }
// }

function captureIR() {
  cam.loadPixels();
  noStroke();
  colorMode(HSL, 360, 100, 100, 100);
  let pixelBrightnessMax = 0;
  let pixelBrightnessMin = 255;
  for (let y = 0; y < cam.height; y += 4) {
    for (let x = 0; x < cam.width; x += 4) {
      const pixelIdx = 4 * (cam.width * y + x);
      const r = cam.pixels[pixelIdx + 0];
      const g = cam.pixels[pixelIdx + 1];
      const b = cam.pixels[pixelIdx + 2];
      const a = cam.pixels[pixelIdx + 3];
      const pixelColor = color(r, g, b);
      const pixelBrightness = brightness(pixelColor);
      pixelBrightnessMax = max(pixelBrightnessMax, pixelBrightness);
      pixelBrightnessMin = min(pixelBrightnessMin, pixelBrightness);
    }
  }
  for (let y = 0; y < cam.height; y += 4) {
    for (let x = 0; x < cam.width; x += 4) {
      const pixelIdx = 4 * (cam.width * y + x);
      const r = cam.pixels[pixelIdx + 0];
      const g = cam.pixels[pixelIdx + 1];
      const b = cam.pixels[pixelIdx + 2];
      const a = cam.pixels[pixelIdx + 3];
      const pixelColor = color(r, g, b);
      const pixelBrightness = brightness(pixelColor);
      const fillHue = map(
        pixelBrightness,
        pixelBrightnessMin,
        pixelBrightnessMax,
        270,
        0
      );
      const canvasX = map(x, 0, cam.width - 1, 0, width - 1);
      const canvasY = map(y, 0, cam.height - 1, 0, height - 1);
      const ratio = width / cam.width;
      const colorText = 'hsl(' + fillHue + ', 100%, 50%)';
      const fillColor = color(colorText);
      fill(fillHue, 100, 50);
      rect(canvasX, canvasY, ratio * 4);
    }
  }
}
