import { mainUI, helloScreen } from "./mainUI.js";
let main = document.querySelector("#main");
export function toactivities() {
  let activities = document.createElement("div");
  activities.classList.add("menuUI"); mainUI.append(activities);
  let backBtn = document.createElement("img");
  backBtn.classList.add("backBtn"); backBtn.src = "../assets/return.svg";
  activities.appendChild(backBtn);
  backBtn.addEventListener("click", () => {
    activities.style.animation = "1.5s menuDis";
    setTimeout(() => activities.remove(), 1500);
  });
}
