export class Countries {
  constructor() {
    this.allCountries = [
      { flag: "🇦🇺", name: "Australia" }, { flag: "🇧🇷", name: "Brazil" },
      { flag: "🇨🇦", name: "Canada" }, { flag: "🇨🇳", name: "China" },
      { flag: "🇫🇷", name: "France" }, { flag: "🇩🇪", name: "Germany" },
      { flag: "🇮🇳", name: "India" }, { flag: "🇮🇩", name: "Indonesia" },
      { flag: "🇮🇹", name: "Italy" }, { flag: "🇯🇵", name: "Japan" },
      { flag: "🇰🇷", name: "South Korea" }, { flag: "🇲🇽", name: "Mexico" },
      { flag: "🇳🇱", name: "Netherlands" }, { flag: "🇷🇺", name: "Russia" },
      { flag: "🇸🇦", name: "Saudi Arabia" }, { flag: "🇪🇸", name: "Spain" },
      { flag: "🇨🇭", name: "Switzerland" }, { flag: "🇹🇷", name: "Turkey" },
      { flag: "🇬🇧", name: "United Kingdom" }, { flag: "🇺🇸", name: "United States" }
    ];
  }
  getAllCountries() { return this.allCountries; }
}
