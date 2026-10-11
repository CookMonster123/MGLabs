import { helloScreen } from "./modules/mainUI.js";
import { newLife } from "./modules/person.js";
import { countryWindow } from "./modules/countryWindow.js";

let playersExist = false;
let main = document.querySelector("#main");
export let greetingMsg = document.createElement("div");
let helloMsg = document.createElement("h1");
let playerName = document.createElement("input");
let genderBox = document.createElement("div");
let male = document.createElement("div");
let female = document.createElement("div");
let alertBox = document.createElement("div");
let alertBoxMsg = document.createElement("p");
let maleImg = document.createElement("img");
let femaleImg = document.createElement("img");
let countryList = document.createElement("div");

countryList.textContent = "Choose Your Country";

countryList.addEventListener("click", () => {
  let window = countryWindow();
  greetingMsg.append(window);
  window.addEventListener("click", (event) => {
    const clickedElement = event.target;
    if (clickedElement.nodeName == "LI") {
      const selectedCountry = clickedElement.textContent.trim();
      countryList.textContent = selectedCountry;
      window.remove();
    }
  });
});

export let startNewLife;

maleImg.src = "./assets/male.svg";
femaleImg.src = "./assets/female.svg";

maleImg.classList.add("icon");
femaleImg.classList.add("icon");
greetingMsg.classList.add("greetingMsg");
helloMsg.classList.add("helloMsg");
playerName.classList.add("playerName");
genderBox.classList.add("genderBox");
male.classList.add("male");
female.classList.add("female");
alertBox.classList.add("alertBox");
alertBoxMsg.classList.add("alertBoxMsg");
countryList.classList.add("countryList");

helloMsg.textContent = "Welcome to BitLife Clone";
playerName.setAttribute("placeholder", "Type your name here");
greetingMsg.append(helloMsg, playerName, countryList, genderBox);
male.appendChild(maleImg);
female.appendChild(femaleImg);
genderBox.append(male, female);
main.appendChild(greetingMsg);

if (!playersExist) {
  male.addEventListener("click", () => {
    greetingMsg.remove();
    genderMsg(true);
    helloScreen();
    navigator.vibrate(50);
  });
  female.addEventListener("click", () => {
    greetingMsg.remove();
    genderMsg(false);
    helloScreen();
    let startNewLife = new newLife(playerName.value, chooseGender);
    console.log(startNewLife);
  });

  function genderMsg(isMale) {
    function chooseGender(gender) {
      switch (gender) {
        case 0: return 0;
        case 1: return 1;
      }
    }
    if (isMale) {
      startNewLife = new newLife(playerName.value, chooseGender);
      main.appendChild(alertBox);
      alertBoxMsg.textContent = `Hello, Mr ${playerName.value}`;
      alertBox.appendChild(alertBoxMsg);
    } else {
      startNewLife = new newLife(playerName.value, chooseGender);
      main.appendChild(alertBox);
      alertBoxMsg.textContent = `Hello, Ms ${playerName.value}!`;
      alertBox.appendChild(alertBoxMsg);
    }
  }

  alertBox.addEventListener("dblclick", () => {
    setInterval(() => alertBox.remove(), 500);
  });
}
