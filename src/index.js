let handpose, video, detections;

const blockWidth = 625, blockHeight = 625, blockMargin = 30;
let img, event;
let modes = {
    "f": function freeHandDrawing() {
      console.log("freeHandDrawing");
      drawKeypointsTmp();
    },
    "s": function regionSelection() {
      console.log("regionSelection");
      drawKeypointsTmp();
    },
    "c": function regionCopy() {
      console.log("regionCopy");
      drawKeypointsTmp();
    },
    "v": function regionPaste() {
      console.log("regionPaste");
      drawKeypointsTmp();
    }
};

function preload() {
  img = loadImage("./asset/test.jpg");
}

function setup() {
  // createCanvas(625, 437);
  createCanvas(1600, 900);
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();
  handpose = ml5.handpose(video, modelReady);
}
function modelReady() {
  handpose.on("hand", gotResults);
}
function gotResults(results) {
  detections = results;
}
function draw() {
  background(120);
  image(img, 0, 0, blockWidth, blockHeight);
  image(img, blockWidth + blockMargin, 0, blockWidth, blockHeight);
  if (detections) {
    if (detections.length > 0) drawKeypoints();
  }
}
function drawKeypoints() {
  noStroke();
  fill(255, 0, 0);
  for (let i = 0; i < detections.length; i++) {
    const detection = detections[i];
    for (let j = 0; j < detection.landmarks.length; j++) {
      const keypoint = detection.landmarks[j];
      ellipse(keypoint[0], keypoint[1], 10, 10);
    }
  }
}
function drawKeypointsTmp() {
  noStroke();
  fill(255, 0, 0);
  ellipse(500, 500, 10, 10);
}
window.addEventListener("keyup", (e) => {
    let key = e.key;
    mode = modes[e.key];
    if(mode) mode();
    document.getElementById("mode").innerHTML = mode ? mode.name : null;
    e.preventDefault();
})