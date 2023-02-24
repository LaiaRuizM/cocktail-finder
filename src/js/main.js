'use strict';

//*
//!
//?
//
//todo

//* Global variables - cogemos elementos del HTML
const inputElement = document.querySelector('.js-input');
const searchBtn = document.querySelector('.js-searchBtn');
// const resetBtn = document.querySelector('.js-resetBtn');
const cocktailsList = document.querySelector('.js-cocktailsUl');
const favoritesList = document.querySelector('.js-favoritesUl'); //ul favs
const url =
  `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita`;
let cocktailsListData = []; 
let favoritesListArray = [];  // es el array para recoger el listado de las favoritas: favoritesList -> listado para meter los cócteles listArrayFavorite
// let listArrayFavorite = []; listado para meter los favoritos -> ELIMINAR

//? When the user is loading the page the list of Margaritas should appear
fetch(url)
  .then((response) => response.json())
  .then((data) => {
    console.log(data); // to see which property I have to chose (drinks)
    cocktailsListData = data.drinks.map((showDrink) => ({
      name: showDrink.strDrink,
      photo: showDrink.strDrinkThumb,
      id: showDrink.idDrink,
    }));
    renderCocktails(cocktailsListData); //donde pintarlo -> cambiarlo por el render
    //renderFavoritesList(favoritesList);
  });

//? function to paint the list of delicious cocktails
function renderCocktails(drinks) {
  for (const eachDrink of drinks) {
    if (eachDrink.photo) {
      cocktailsList.innerHTML += `<li class="js-liDrink" id="${eachDrink.id}"><h4>${eachDrink.name}</h4><img src="${eachDrink.photo}" title="${eachDrink.name}" alt="${eachDrink.name}" class="cocktailImg"/></li>`;
    } else {
      cocktailsList.innerHTML += `<li class="js-liDrink" id="${eachDrink.id}"><h4>${eachDrink.name}</h4><img src="https://www.drinksco.es/blog/assets/uploads/sites/2/2020/05/cocktail-3327242_1920-1170x780.jpg" title="${eachDrink.name}" alt="${eachDrink.name}" class="cocktailImg"/></li>`;
    }
  }
  addEventToLis(); // para ejecutar la función click del las lis. Para activar el click, en este momento tiene que hacerse el click -> ejecutamos la función del evento del click
}

// Function handleClickSearch button to search any kind of cocktail
function handleClickSearch(ev) {
  ev.preventDefault();
  const inputUserCocktail = inputElement.value.toLowerCase();
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputUserCocktail}`)
    .then((response) => response.json())
    .then((data) => {
      cocktailsListData = data.drinks.map((showDrink) => ({
        name: showDrink.strDrink,
        photo: showDrink.strDrinkThumb,
        id: showDrink.idDrink,
      }));
      cocktailsList.innerHTML = ''; //
      renderCocktails(cocktailsListData); //donde pintarlo -> cambiarlo por el render -> OK
      renderFavoritesList(favoritesList);
    });
}

//* Function to add cocktails to favorite list
function handleClickList(ev) {
  console.log(ev.currentTarget.id);
  const idSelected = ev.currentTarget.id;
  const cocktailSelected = cocktailsListData.find(cocktailItem => cocktailItem.id === idSelected); 
  //console.log(cocktailSelected);
  const cocktailIndex = favoritesListArray.findIndex(cocktailItem => cocktailItem.id === idSelected); // el index es la posición
  console.log(cocktailIndex);
  if (cocktailIndex === -1) {  // Compruebo si existe el favorito cocktailIndex, si no existe en favoritos (-1), pues lo añado (push) en favoritos -> ADD
    ev.currentTarget.classList.add('selected');
    favoritesListArray.push(cocktailSelected);
  } else {
    ev.currentTarget.classList.remove('selected'); // Compruebo si existe el favorito, si existe en favoritos (i), pues lo elimino (splice) de favoritos -> REMOVE
    favoritesListArray.splice(cocktailIndex, 1); // splice = elimina un elemento a partir de una posición y con el 1 indicamos que no borre todo, que se elimine él, si es 2 es él mismo + next y así.
  }
  renderFavoritesList(favoritesListArray);
}

function renderFavoritesList(drinkFav) {
  favoritesList.innerHTML = '';
  console.log('holis');
  for (const eachDrinkFav of drinkFav) {
    favoritesList.innerHTML += `<li class="js-liDrink" id="${eachDrinkFav.id}"><h4>${eachDrinkFav.name}</h4><img src="${eachDrinkFav.photo}" title="${eachDrinkFav.name}" alt="${eachDrinkFav.name}" class="cocktailImg"/></li>`;
  }
}


//* Events
searchBtn.addEventListener('click', handleClickSearch);


//* Event listener in any kind of cocktails (drinks) list
function addEventToLis() {
  const liDrinkElements = document.querySelectorAll('.js-liDrink');
  for (const eachLi of liDrinkElements) {
    eachLi.addEventListener('click', handleClickList);
  }

}