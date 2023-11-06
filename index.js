const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchButton');
const searchResultDiv = document.querySelector(".search-result");
const container = document.getElementById('how-to-section');
let searchQuery = '';
const APP_ID = 'b7d09c4e';
const APP_Key = '309cd13dbf5981f154550861c35e0e38';


searchBtn.addEventListener('click', function(e){
e.preventDefault()
searchQuery = searchInput.value;
fetchAPI();
})

async function fetchAPI(){
const baseUrl = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_Key}&from=0&to=20`;
const response = await fetch(baseUrl);
const data = await response.json();
generateHTML(data.hits)
console.log(data)
}

function generateHTML(results){
    let generatedHTML = ''
    results.map((result) => {
        generatedHTML += 
        `
        <div class="item">
          <img src="${result.recipe.image}" alt="img">
          <div class="flex-container">
          <h1 class="title">${result.recipe.label}</h1>
            <a class="view-btn" target="_blank" href="${
                result.recipe.url
              }">View Recipe</a>
          </div>
          <p class="item-data">Calories: ${result.recipe.calories.toFixed(0)}</p>
        </div> 
        `
    })
    searchResultDiv.innerHTML = generatedHTML;
}
