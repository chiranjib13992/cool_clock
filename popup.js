const timeEl = document.getElementById("time");
const canvas = document.getElementById("analogClock");
const ctx = canvas.getContext("2d");
const toggleBtn = document.getElementById("toggleBtn");

let radius = canvas.height / 2;
ctx.translate(radius, radius);
radius *= 0.9;

let isAnalog = false;

// Digital clock updater
function updateDigitalTime() {
  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;
  timeEl.textContent = `${hours}:${minutes}:${seconds} ${ampm}`;
}
setInterval(updateDigitalTime, 1000);
updateDigitalTime();

// Analog clock
function drawAnalogClock() {
  drawFace(ctx, radius);
  drawNumbers(ctx, radius);
  drawTime(ctx, radius);
}
setInterval(() => {
  if (isAnalog) {
    ctx.clearRect(-canvas.width, -canvas.height, canvas.width * 2, canvas.height * 2);
    drawAnalogClock();
  }
}, 1000);

toggleBtn.onclick = () => {
  isAnalog = !isAnalog;
  document.getElementById("digitalClock").style.display = isAnalog ? "none" : "block";
  canvas.style.display = isAnalog ? "block" : "none";
  toggleBtn.textContent = isAnalog ? "Switch to Digital" : "Switch to Analog";
};

// Analog draw functions
function drawFace(ctx, radius) {
  const grad = ctx.createRadialGradient(0,0,radius*0.95, 0,0,radius*1.05);
  grad.addColorStop(0, '#333');
  grad.addColorStop(0.5, 'white');
  grad.addColorStop(1, '#333');
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, 2*Math.PI);
  ctx.fillStyle = 'white';
  ctx.fill();
  ctx.strokeStyle = grad;
  ctx.lineWidth = radius*0.07;
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(0, 0, radius*0.1, 0, 2*Math.PI);
  ctx.fillStyle = '#333';
  ctx.fill();
}

function drawNumbers(ctx, radius) {
  ctx.font = radius*0.15 + "px arial";
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  for (let num = 1; num < 13; num++) {
    let ang = num * Math.PI / 6;
    ctx.rotate(ang);
    ctx.translate(0, -radius * 0.85);
    ctx.rotate(-ang);
    ctx.fillText(num.toString(), 0, 0);
    ctx.rotate(ang);
    ctx.translate(0, radius * 0.85);
    ctx.rotate(-ang);
  }
}

function drawTime(ctx, radius) {
  const now = new Date();
  let hour = now.getHours();
  let minute = now.getMinutes();
  let second = now.getSeconds();

  hour = hour % 12;
  hour = (hour*Math.PI/6) +
         (minute*Math.PI/(6*60)) +
         (second*Math.PI/(360*60));
  drawHand(ctx, hour, radius*0.5, radius*0.07);

  minute = (minute*Math.PI/30) + (second*Math.PI/(30*60));
  drawHand(ctx, minute, radius*0.8, radius*0.07);

  second = (second*Math.PI/30);
  drawHand(ctx, second, radius*0.9, radius*0.02);
}

function drawHand(ctx, pos, length, width) {
  ctx.beginPath();
  ctx.lineWidth = width;
  ctx.lineCap = "round";
  ctx.moveTo(0, 0);
  ctx.rotate(pos);
  ctx.lineTo(0, -length);
  ctx.stroke();
  ctx.rotate(-pos);
}

// Trigger animation again on click
toggleBtn.classList.remove('bounce');
void toggleBtn.offsetWidth; // trigger reflow
toggleBtn.classList.add('bounce');

