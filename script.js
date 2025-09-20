const COUNTRY= document.getElementById('Countries');
    const apiURL = "https://api.allorigins.win/raw?url=https://www.apicountries.com/countries";

    async function GetCountries() {
      try{
        const response=await fetch(apiURL);
        const COUNTRIES=await response.json();
        COUNTRY.innerHTML='';
        COUNTRIES.forEach(country => {
          const CountryCard=document.createElement('a');
          CountryCard.className='country-card';
          CountryCard.href='details.html?name${encodeURIComponent(country.name)}';
          const flagImage=document.createElement('img');
          flagImage.src=country.flags.svg;
          flagImage.alt='Flag of ${country.name}';

          const CountryName=document.createElement('h3');
          CountryName.textContent=country.name;
          
          CountryCard.appendChild(flagImage);
          CountryCard.appendChild(CountryName);
          COUNTRY.appendChild(CountryCard);
        });

      }catch(error){
        COUNTRY.innerHTML='<p>ERROR IN LOADING THE COUNTRY LIST!!!</p>';
      }
      
    }
    GetCountries();

  
