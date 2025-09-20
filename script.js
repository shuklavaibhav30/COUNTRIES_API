const COUNTRY = document.getElementById('Countries');
const apiURL = "https://api.allorigins.win/raw?url=https://www.apicountries.com/countries";

async function GetCountries() {
  try {
    const response = await fetch(apiURL);
    const COUNTRIES = await response.json();
    COUNTRY.innerHTML = '';
    COUNTRIES.forEach(country => {
      const CountryCard = document.createElement('a');
      CountryCard.className = 'country-card';
      CountryCard.href = `details.html?name=${encodeURIComponent(country.name)}`;
      const flagImage = document.createElement('img');
      flagImage.src = country.flags.svg;
      flagImage.alt = `Flag of ${country.name}`;

      const CountryName = document.createElement('h3');
      CountryName.textContent = country.name;

      CountryCard.appendChild(flagImage);
      CountryCard.appendChild(CountryName);
      COUNTRY.appendChild(CountryCard);
    });

  } catch (error) {
    COUNTRY.innerHTML = '<p>ERROR IN LOADING THE COUNTRY LIST!!!</p>';
  }

}


async function GetCountryDetails() {
  const details = document.getElementById("country_details")
  if (!details) return;
  const parameter = new URLSearchParams(window.location.search);
  const country_name = parameter.get("name");

  try {
    const response = await fetch(apiURL);
    const COUNTRIES = await response.json()
    const counTRY = COUNTRIES.find(c => c.name.toLowerCase() === country_name.toLowerCase());
    if (!counTRY) {
      details.innerHTML = `<p>Country Not Found!!!<a href="index.html">BACK</a><p>`;
      return;
    }

    details.innerHTML = `
          <h2>${counTRY.name}</h2>
          <img src="${counTRY.flags.svg}" alt="Flag of ${counTRY.name}" width="200"></img>
          <p>Capital:${counTRY.capital || "N/A"}</p>
          <p>Region:${counTRY.region || "N/A"}</p>
          <p>Sub-Region:${counTRY.subregion || "N/A"}</p><p>Population:${counTRY.population || "N/A"}</p>
          <p>Top-Level-Domain:${counTRY.topLevelDomain?.join(",") || "N/A"}</p>
          <p>Alpha-2-code:${counTRY.alpha2Code || "N/A"}</p>
          <p>Alpha-3-code:${counTRY.alpha3Code || "N/A"}</p>
          <p>CallingCodes:${counTRY.CallingCodes?.join(",") || "N/A"}</p>
          <p>Alternate-Spellings:${counTRY.altSpellings?.join(",") || "N/A"}</p>
          <p>Demonym:${counTRY.demonym || "N/A"}</p>
          <p>Area:${counTRY.area || "N/A"}km square</p>
          <p>Region:${counTRY.region || "N/A"}</p>
          <p>Timezones:${counTRY.timezones?.join(",") || "N/A"}</p>
          <p>Borders:${counTRY.borders?.join(",") || "N/A"}</p>
          <p>Numeric Code:${counTRY.numericCode || "N/A"}</p>
          <p>Currencies:${counTRY.currencies && counTRY.currencies.length > 0
        ? counTRY.currencies.map(curr => `${curr.name} (${curr.symbol})`).join(", ") : "N/A"}</p>
          <p>Languages:${counTRY.languages && counTRY.languages.length > 0
        ? counTRY.languages.map(lang => lang.name).join(",") : "N/A"}</p >
        <p>Regional Blocks:${counTRY.regionalBlocs && counTRY.regionalBlocs.length > 0
        ? counTRY.regionalBlocs.map(b => `${b.name}(${b.acronym})`).join(",") : "N/A"}</p>
          `;
  }
  catch (error) {
    details.innerHTML = "<p>ERROR LOADING DETAILS!!!</p>";
  }


}






GetCountries();
GetCountryDetails();

