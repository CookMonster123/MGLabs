import { mainUI, helloScreen } from "./mainUI.js";
let main = document.querySelector("#main");
export function toassets() {
  let assets = document.createElement("div");
  assets.classList.add("menuUI"); mainUI.append(assets);
  let backBtn = document.createElement("img");
  backBtn.classList.add("backBtn"); backBtn.src = "../assets/return.svg";
  assets.appendChild(backBtn);
  backBtn.addEventListener("click", () => {
    assets.style.animation = "1.5s menuDis";
    setTimeout(() => assets.remove(), 1500);
  });
}
