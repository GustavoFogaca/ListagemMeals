//Campos PopUp
const receit_Popup = document.getElementById("meal-popup");
const info_ElementReceita = document.getElementById("info-receitas");
const popupCloseButton = document.getElementById("close-popup");
//style
const elementReceita = document.getElementById("receitas");
const favoriteContainer = document.getElementById("fav-Receitas");
//campos do Header
const searchReceitas = document.getElementById("search-Receita");
const searchButton = document.getElementById("search");

async function getSearch(receita) {
  const url = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + receita;

  const resp = await fetch(url);
  const respData = await resp.json();
  const meals = respData.meals;
  return meals;
}

function addReceita(listData) {
  console.log(listData);

  const meal = document.createElement("div");
  meal.classList.add("meal");

  meal.innerHTML = `
  <div class="meal-body">
  <h4>${listData.strMeal}</h4>
  <button class="fav-info">
      <i class="fas fa-info"></i>
  </button>
  </div>
        <div class="receita-header">
            <img
                src="${listData.strMealThumb}"
                alt="${listData.strMeal}"
            />
        </div>
    `;

  meal.addEventListener("click", () => {
    showInformacao(listData);
  });
  elementReceita.appendChild(meal);
}

function showInformacao(listData) {
  info_ElementReceita.innerHTML = "";
  const mealElement = document.createElement("div");
  const ingredients = [];

  for (let i = 1; i <= 20; i++) {
    if (listData["strIngredient" + i]) {
      ingredients.push(
        `${listData["strIngredient" + i]} - ${listData["strMeasure" + i]}`
      );
    } else {
      break;
    }
  }

  mealElement.innerHTML = `
        <h1>${listData.strMeal}</h1>
        <img
            src="${listData.strMealThumb}"
            alt="${listData.strMeal}"
        />
        <h3>Ingredients:</h3>
        <ul>
            ${ingredients
              .map(
                (ing) => `
            <li>${ing}</li>
            `
              )
              .join("")}
        </ul>
        <p>
        ${listData.strInstructions}
        </p>
    `;
  info_ElementReceita.appendChild(mealElement);

  receit_Popup.classList.remove("hidden");
}

searchButton.addEventListener("click", async () => {
  elementReceita.innerHTML = "";

  const search = searchReceitas.value;
  const meals = await getSearch(search);

  if (meals) {
    meals.forEach((meal) => {
      addReceita(meal);
    });
  }
});

popupCloseButton.addEventListener("click", () => {
  receit_Popup.classList.add("hidden");
});
