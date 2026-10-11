import { mainUI } from "./mainUI.js";
let main = document.querySelector("#main");
export function toMenu() {
  const menuItems = [
    { name: "New Life", description: "Save this life and start a new one" },
    { name: "New Life as Cat", description: "Save this life and start a new one" },
    { name: "New Life as Dog", description: "Save this life and start a new one" },
    { name: "Save Life", description: "Save this life and start a new one" },
    { name: "Lives in Progress", description: "Save this life and start a new one" },
  ];
  let menu = document.createElement("div");
  let mainMenu = document.createElement("div");
  let menuUpper = document.createElement("div");
  menu.classList.add("menuUI"); menu.classList.add("mainMenu");
  menuUpper.classList.add("menuUpper"); mainUI.append(menuUpper, menu);
  let backBtn = document.createElement("img");
  backBtn.classList.add("backBtn"); backBtn.src = "../assets/return.svg";
  menu.append(backBtn, mainMenu);
  backBtn.addEventListener("click", () => {
    menu.style.animation = "1.5s menuDis";
    setTimeout(() => menu.remove(), 1500);
  });
  menuItems.forEach((item) => {
    let menuList = document.createElement("div");
    let menuListNames = document.createElement("h1");
    let menuListDescriptions = document.createElement("p");
    menuListNames.textContent = item.name;
    menuListDescriptions.textContent = item.description;
    menuList.classList.add("menuList");
    menuList.append(menuListNames, menuListDescriptions);
    menu.append(menuList);
  });
}
