import { newLife } from "./person.js";
import { Countries } from "./countries.js";
import { greetingMsg } from "../index.js";

export function countryWindow() {
  let character1 = new newLife("Aaron", 0, 0, 0);
  let window = document.createElement("div");
  window.classList.add("countryPage");
  let countryName = character1.country.flag;
  console.log(countryName);
  const countriesInstance = new Countries();
  const allCountries = countriesInstance.getAllCountries();

  allCountries.forEach((country, index) => {
    let list = document.createElement("li");
    list.textContent = `${country.flag}${country.name} `;
    switch (index % 5) {
      case 0: list.style.background = "green"; break;
      case 1: list.style.background = "yellow"; list.style.color = "#000"; break;
      case 2: list.style.background = "orange"; break;
      case 3: list.style.background = "red"; break;
      case 4: list.style.background = "purple"; break;
    }
    window.append(list);
  });
  return window;
}
