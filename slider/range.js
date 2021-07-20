let range = document.getElementById("range");
range.addEventListener("input", () => {
  document.querySelector(".value").innerHTML = range.value;
});
