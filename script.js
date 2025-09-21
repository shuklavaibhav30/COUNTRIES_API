const COUNTRY = document.getElementById('Countries');
const PAGINATION=document.getElementById('pagination');
const SEARCHBOX=document.getElementById('searchbox');
const apiURL = "https://api.allorigins.win/raw?url=https://www.apicountries.com/countries";


let COUNTRIES=[];
let filteredCOUNTRIES=[];
let currentPage=1;
const itemsPerPage=30;
async function GetCountries() {
  if (!COUNTRY) return;

  try {
    const response = await fetch(apiURL);
    COUNTRIES = await response.json();
    filteredCOUNTRIES=COUNTRIES;
    renderPage();
    renderPagination();

  } catch (error) {
    COUNTRY.innerHTML = '<p style="color:white;">ERROR IN LOADING THE COUNTRY LIST!!!</p>';
  }

}

function renderPage() {
  COUNTRY.innerHTML='';

  const startIndex=(currentPage-1)*itemsPerPage;
  const endIndex=startIndex+itemsPerPage;
  const countriesToShow=filteredCOUNTRIES.slice(startIndex,endIndex);
  countriesToShow.forEach(country => {
    const CountryCard = document.createElement('a');
    CountryCard.className = 'country-card';
    CountryCard.href = `details.html?name=${encodeURIComponent(country.name)}`;
    const flagImage = document.createElement('img');
    flagImage.src = country.flags?.svg || country.flags?.png || '';
    flagImage.alt = `Flag of ${country.name}`;

    const CountryName = document.createElement('h3');
    CountryName.textContent = country.name;

    CountryCard.appendChild(flagImage);
    CountryCard.appendChild(CountryName);
    COUNTRY.appendChild(CountryCard);
  });
}

function renderPagination() {
  PAGINATION.innerHTML='';
  const totalPages=Math.ceil(filteredCOUNTRIES.length/itemsPerPage);

  //prev button
  if(currentPage>1){
    const prev=document.createElement('button');
    prev.textContent="Prev";
    prev.addEventListener('click',()=>{
      currentPage--;
      renderPage();
      renderPagination();
    })
    PAGINATION.appendChild(prev);
  }
  //page numbers button
  for(let i=1;i<=totalPages;i++){
    const Button=document.createElement('button');
    Button.textContent=i;
    if(i==currentPage)Button.classList.add('active');
    Button.addEventListener('click',()=>{
      currentPage=i;
      renderPage();
      renderPagination();
    });
    PAGINATION.appendChild(Button)
  }
  //next
  if(currentPage<totalPages){
    const next=document.createElement('button');
    next.textContent="Next";
    next.addEventListener('click',()=>{
      currentPage++;
      renderPage();
      renderPagination();
    });
    PAGINATION.appendChild(next);
  }
}
if(SEARCHBOX){
  SEARCHBOX.addEventListener('input',()=>{
  const searchInput=SEARCHBOX.value.toLowerCase();
  if(searchInput=="")
    filteredCOUNTRIES=COUNTRIES;
  else{
    filteredCOUNTRIES=COUNTRIES.filter(c=>c.name.toLowerCase().includes(searchInput));
  }
  currentPage=1;
  renderPage();
  renderPagination();
});


}
async function GetCountryDetails() {
  const details = document.getElementById("country_details")
  if (!details) return;
  const parameter = new URLSearchParams(window.location.search);
  const country_name = parameter.get("name");

  try {
    const response = await fetch(apiURL);
    const allCountries = await response.json()
    const counTRY = allCountries.find(c => c.name.toLowerCase()===country_name.toLowerCase());
    if (!counTRY) {
      details.innerHTML = `<p style="color:white;">Country Not Found!!!<a href="index.html">BACK</a><p>`;
      return;
    }

    details.innerHTML = `
          <h2>${counTRY.name}</h2>
          <img src="${counTRY.flags.svg ||counTRY.flags?.png}" alt="Flag of ${counTRY.name}" width="200"></img>
          <p><b>Capital:</b>${counTRY.capital || "N/A"}</p>
          <p><b>Region:</b>${counTRY.region || "N/A"}</p>
          <p><b>Sub-Region:</b>${counTRY.subregion || "N/A"}</p>
          <p><b>Population:</b>${counTRY.population || "N/A"}</p>
          <p><b>Top-Level-Domain:</b>${counTRY.topLevelDomain?.join(",") || "N/A"}</p>
          <p><b>Alpha-2-code:</b>${counTRY.alpha2Code || "N/A"}</p>
          <p><b>Alpha-3-code:</b>${counTRY.alpha3Code || "N/A"}</p>
          <p><b>CallingCodes:</b>${counTRY.callingCodes?.join(",") || "N/A"}</p>
          <p><b>Alternate-Spellings:</b>${counTRY.altSpellings?.join(",") || "N/A"}</p>
          <p><b>Demonym:</b>${counTRY.demonym || "N/A"}</p>
          <p><b>Area:</b>${counTRY.area || "N/A"}km square</p>
          <p><b>Timezones:</b>${counTRY.timezones?.join(",") || "N/A"}</p>
          <p><b>Borders:</b>${counTRY.borders?.join(",") || "N/A"}</p>
          <p><b>Numeric Code:</b>${counTRY.numericCode || "N/A"}</p>
          <p><b>Currencies:</b>${counTRY.currencies && counTRY.currencies.length > 0
        ? counTRY.currencies.map(curr => `${curr.name} (${curr.symbol})`).join(", ") : "N/A"}</p>
          <p><b>Languages:</b>${counTRY.languages && counTRY.languages.length > 0
        ? counTRY.languages.map(lang => lang.name).join(",") : "N/A"}</p >
        <p><b>Regional Blocks:</b>${counTRY.regionalBlocs && counTRY.regionalBlocs.length > 0
        ? counTRY.regionalBlocs.map(b => `${b.name}(${b.acronym})`).join(",") : "N/A"}</p>
          `;
  }
  catch (error) {
    details.innerHTML = "<p>ERROR LOADING DETAILS!!!</p>";
  }


}






GetCountries();
GetCountryDetails();

