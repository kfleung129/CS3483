let handpose, video, detections;
function setup() {
  createCanvas(625, 437);
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
  image(video, 0, 0, width, height);
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
