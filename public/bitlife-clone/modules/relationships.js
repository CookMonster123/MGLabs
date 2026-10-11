import { mainUI, helloScreen } from "./mainUI.js";
let main = document.querySelector("#main");
export function torelationships() {
  let relationships = document.createElement("div");
  relationships.classList.add("menuUI"); mainUI.append(relationships);
  let backBtn = document.createElement("img");
  backBtn.classList.add("backBtn"); backBtn.src = "../assets/return.svg";
  relationships.appendChild(backBtn);
  backBtn.addEventListener("click", () => {
    relationships.style.animation = "1.5s menuDis";
    setTimeout(() => relationships.remove(), 1500);
  });
}
