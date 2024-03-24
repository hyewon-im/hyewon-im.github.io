let video;
let faceMesh;
let keypointsX = [];
let keypointsY = [];
let keypointsZ = [];
let poseNet;
let noseX = 0;
let noseY = 0;
let eyeX = 0;
let eyeY = 0;

function setup() {
  createCanvas(960, 480);
  video = createCapture(VIDEO);
  video.hide();
  faceMesh = ml5.facemesh(video, modelLoaded);
  faceMesh.on("face", gotData);
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on("pose", gotPoses);
}

function modelLoaded() {
  console.log("Ready to go!");
}

function gotData(data) {
  if (data.length > 0) {
    keypointsX = [];
    keypointsY = [];
    keypointsZ = [];

    for (let i = 0; i < data[0].scaledMesh.length; i += 10) {
      keypointsX.push(data[0].scaledMesh[i][0]);
      keypointsY.push(data[0].scaledMesh[i][1]);
      keypointsZ.push(data[0].scaledMesh[i][2]);
    }
  }
}

function gotPoses(poses) {
  console.log(poses);
  noseX = poses[0].pose.keypoints[0].position.x;
  noseY = poses[0].pose.keypoints[0].position.y;

  eyeX = poses[0].pose.keypoints[1].position.x;
  eyeY = poses[0].pose.keypoints[1].position.y;
}

function draw() {
  background(0);
  image(video, 0, 0);
  let faceSize = dist(noseX, noseY, eyeX, eyeY);

  
  
  if (faceSize < 100) {
    textSize(40);
    fill(63, 255 , 0);
  text("Face Detected", 670, 230);
    fill(255);
    text("23158888", 720, 300);
    text("SL 8.01", 740, 350);
    noStroke();
    fill(85, 255, 255);
  }

  if (faceSize > 100) {
    noStroke();
    fill(255, 0, 0);
    textSize(25);
    text("Face Not Recognised", 685, 250);
    textSize(20);
    text("Please step back for recognition!", 655, 300);
  }

  for (let i = 0; i < keypointsX.length; i++) {
    let sizeZ = map(keypointsZ[i], -70, 70, 10, 1);
    ellipse(keypointsX[i], keypointsY[i], sizeZ);
  }
  
  let t;
  let h = hour();
  let m = minute();
  let s = second();

  if (h < 12) { t = "AM";}
  if (h >= 12) { t = "PM";}
  if (s < 10) { s = "0" + s; }
  if (m < 10) { m = "0" + m; }
  if (h < 10) { h = "0" + h; }

  textSize(40);
  fill(255);
  text( t + " " + h + ":" + m + ":" + s, 690, 130);
}
