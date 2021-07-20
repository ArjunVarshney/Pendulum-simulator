let innerscene = document.querySelector(".innerscene");
let root = document.querySelector(":root");
let string = document.querySelector(".string");
let computed = window.getComputedStyle(string);
let f = false;
let angle = 50;
innerscene.addEventListener("mousedown", () => (f = true));
innerscene.addEventListener("mouseup", () => (f = false));
innerscene.addEventListener("mousemove", track);
innerscene.addEventListener("click", track);
innerscene.addEventListener("touchmove", pendulummovertouch);
function track(e) {
  e.preventDefault();
  if (f) {
    pendulummover(e);
  }
}
function pendulummover(e) {
  let x = parseInt(computed.getPropertyValue("left")) - e.offsetX;
  let y = e.offsetY - 5;
  angle = Math.atan(y / x) * 57.2958;
  if (angle < 0) {
    angle = angle + 180;
  }
  animation("string");
}
function pendulummovertouch(e) {
  let x = parseInt(computed.getPropertyValue("left")) - e.touches[0].clientX;
  let y = e.touches[0].clientY - 5;
  angle = Math.atan(y / x) * 57.2958;
  if (angle < 0) {
    angle = angle + 180;
  }
  animation("string");
}

let g = 10,
  l = 0.5,
  m = 2.5;

function variables(len, gr, mas) {
  g = gr;
  m = mas;
  l = len;
  string.style.height = l*120+'px';
  animation("string");
}

function animation(id) {
  document
    .getElementById(id)
    .animate(
      [
        { transform: `rotate(${-1 * (90 - angle)}deg)` },
        { transform: `rotate(${90 - angle}deg)` },
      ],
      {
        duration: Math.PI * Math.sqrt(l / g) * 1000,
        iterations: Infinity,
        easing: "ease-in-out",
        direction: "alternate-reverse",
      }
    );
}
let gravity = document.getElementById("gravity");
gravity.addEventListener("input", () => {
  document.querySelector(".gravity").innerHTML = gravity.value / 10;
  variables(length.value / 100, gravity.value / 10, mass.value / 100);
});

let length = document.getElementById("length");
length.addEventListener("input", () => {
  document.querySelector(".length").innerHTML = length.value / 100;
  variables(length.value / 100, gravity.value / 10, mass.value / 100);
});

let mass = document.getElementById("mass");
mass.addEventListener("input", () => {
  document.querySelector(".mass").innerHTML = mass.value / 100;
  variables(length.value / 100, gravity.value / 10, mass.value / 100);
});
