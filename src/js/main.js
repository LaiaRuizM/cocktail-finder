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
//const favoritesList = document.querySelector('.js.favorites'); //ul favs
const margaritasUrl =
  `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita`;
let listMargaritasData = [];
let listAllDrinks = []; // el resto de cócteles (drinks/coctéles)
let listArrayCocktail = [];  // es el array para recoger el listado de las favoritas: favoritesList -> listado para meter los cócteles
// let listArrayFavorite = []; listado para meter los favoritos

//? When the user is loading the page the list of Margaritas should appear
fetch(margaritasUrl)
  .then((response) => response.json())
  .then((data) => {
    console.log(data); // to see which property I have to chose
    listMargaritasData = data.drinks.map((showDrink) => ({
      name: showDrink.strDrink,
      photo: showDrink.strDrinkThumb,
      id: showDrink.idDrink,
    }));
    renderCocktails(listMargaritasData); //donde pintarlo -> cambiarlo por el render
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
      listAllDrinks = data.drinks.map((showDrink) => ({
        name: showDrink.strDrink,
        photo: showDrink.strDrinkThumb,
        id: showDrink.idDrink,
      }));
      cocktailsList.innerHTML = ''; //
      renderCocktails(listAllDrinks); //donde pintarlo -> cambiarlo por el render -> OK
    });
}

//* Function to add cocktails to favorite list
function handleClickList(ev) {
  console.log(ev.currentTarget.id);
  ev.currentTarget.classList.toggle('selected');
  const idSelected = listArrayCocktail.ev.currentTarget.id; 

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