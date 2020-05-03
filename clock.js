const clockContainer = document.querySelector(".js-clock"),
  clockTitle = clockContainer.querySelector("h1");

function getTime() {
  const date = new Date();
  const minutes = date.getMinutes();
  const hours = date.getHours();
  const seconds = date.getSeconds();

  clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours}:${
    minutes < 10 ? `0${minutes}` : minutes
  }:${seconds < 9 ? `0${seconds}` : seconds}`;
}
function init() {
  clockTitle.style.color = `rgb(${Math.floor(Math.random() * 255)},${Math.floor(
    Math.random() * 255
  )},${Math.floor(Math.random() * 255)})`;
  getTime();
  setInterval(getTime, 1000);
}
init();
// function sayHi() {
//   console.log("say hi");
// }
// setInterval(sayHi, 3000); // timer  함수,interval
