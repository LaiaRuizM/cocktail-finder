'use strict';

//* Global variables -> to get the HTML element
const inputElement = document.querySelector('.js-input');
const searchBtn = document.querySelector('.js-searchBtn');
const resetBtn = document.querySelector('.js-resetBtn');
const cocktailsList = document.querySelector('.js-cocktailsUl');
const favoritesList = document.querySelector('.js-favoritesUl');
const deleteBtn = document.querySelector('.js-delete');
const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita`;
let cocktailsListData = [];
let favoritesListArray = [];

//* Server request. When the user is loading the page, the list of Cocktails should appear
fetch(url)
  .then((response) => response.json())
  .then((data) => {
    mapArray(data);
    renderCocktails(cocktailsListData);
  });

//* Function to avoid repetitive code
function mapArray(fetchArray) {
  cocktailsListData = fetchArray.drinks.map((showDrink) => ({
    name: showDrink.strDrink,
    photo: showDrink.strDrinkThumb,
    id: showDrink.idDrink,
  }));
}

//* In line 95 the data of save cocktails has been send to LS (setItem), so now we have to pick them up (getItem) -> to show on the nav.
function getFav() {
  const favLs = JSON.parse(localStorage.getItem('favCocktailsElements'));
  if (favLs) {
    favoritesListArray = favLs;
    renderFavoritesList(favoritesListArray);
  }
}
getFav();

//* Function handleClickSearch button to search any kind of cocktail (user's value)
function handleClickSearch(ev) {
  ev.preventDefault();
  const inputUserCocktail = inputElement.value.toLowerCase();
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputUserCocktail}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.drinks === null) {
        cocktailsList.innerHTML = 'Oh, vaya, parece que todavía no tenemos este cóctel. ¡Vamos a tenerlo en cuenta para ampliar nuestra variedad!';
      } else {
        mapArray(data);
        cocktailsList.innerHTML = '';
        renderCocktails(cocktailsListData);
      }
    });
}

//* Function to paint the list of different delicious cocktails -> Scroll through the ul list and selects the objects
function renderCocktails(drinks) {
  cocktailsList.innerHTML = '';
  for (const eachDrink of drinks) {
    const cocktailIsFav = favoritesListArray.findIndex(eachCocktailFav => eachDrink.id === eachCocktailFav.id);
    let selected = '';
    let photoCocktail = eachDrink.photo;
    if (cocktailIsFav !== -1) {
      selected = 'selected';
    }
    if (!photoCocktail) {
      photoCocktail = 'https://www.drinksco.es/blog/assets/uploads/sites/2/2020/05/cocktail-3327242_1920-1170x780.jpg';
    }
    const liSelected = `<li class="js-liDrink ${selected}" id="${eachDrink.id}"><h3 class="cocktailName1">${eachDrink.name}</h3><img src="${photoCocktail}" title="${eachDrink.name}" alt="${eachDrink.name}" class="cocktailImg"/></li>`;
    cocktailsList.innerHTML += liSelected;
  }
  addEventToLis();
}

//* Function to add cocktails to favorite list -> addEvList of Li
function handleClickList(ev) {
  ev.currentTarget.classList.toggle('selected');
  const idSelected = ev.currentTarget.id;
  const cocktailSelected = cocktailsListData.find(cocktailItem => cocktailItem.id === idSelected);
  const cocktailIndex = favoritesListArray.findIndex(cocktailItem => cocktailItem.id === idSelected);
  if (cocktailIndex === -1) {
    favoritesListArray.push(cocktailSelected);
  } else {
    favoritesListArray.splice(cocktailIndex, 1);
  }
  renderFavoritesList(favoritesListArray);
  localStorage.setItem('favCocktailsElements', JSON.stringify(favoritesListArray));
}

//* Function to paint all the favorites elements (ul fav)
function renderFavoritesList(drinkFav) {
  favoritesList.innerHTML = '';
  for (const eachDrinkFav of drinkFav) {
    favoritesList.innerHTML += `<li><h3 class="cocktailName2">${eachDrinkFav.name} <i class="trash fa-regular fa-trash-can js-iconX" id="${eachDrinkFav.id}"></i></h3><img src="${eachDrinkFav.photo}" title="${eachDrinkFav.name}" alt="${eachDrinkFav.name}" class="cocktailImg2"/></li>`;
  }
  addEventToX();
}

//* Function addEvList of iconX 
function handleClickIcon(event) {
  event.preventDefault();
  const idSelected = event.currentTarget.id;
  const cocktailIndex = favoritesListArray.findIndex(cocktailItem => cocktailItem.id === idSelected);
  if (cocktailIndex !== -1) {
    favoritesListArray.splice(cocktailIndex, 1);
  }
  renderFavoritesList(favoritesListArray);
  renderCocktails(cocktailsListData);
  localStorage.setItem('favCocktailsElements', JSON.stringify(favoritesListArray));
}

//* Function addEvList of Reset
function handleClickReset() {
  favoritesList.innerHTML = '';
  localStorage.removeItem('favCocktailsElements');
  location.reload();
}

//* Function addEvList of Delete all favs
function handleClickDelete() {
  favoritesList.innerHTML = '';
  localStorage.removeItem('favCocktailsElements');
  location.reload();
}

//* Events
searchBtn.addEventListener('click', handleClickSearch);

//* Event listener in any kind of cocktails list
function addEventToLis() {
  const liDrinkElements = document.querySelectorAll('.js-liDrink');
  for (const eachLi of liDrinkElements) {
    eachLi.addEventListener('click', handleClickList);
  }
}

//* Delete each favorite pressing "x" (li)
function addEventToX() {
  const iconsX = document.querySelectorAll('.js-iconX');
  for (const eachIconX of iconsX) {
    eachIconX.addEventListener('click', handleClickIcon);
  }
}

//* Reset all favorites
resetBtn.addEventListener('click', handleClickReset);

//* Delete favorites in his section
deleteBtn.addEventListener('click', handleClickDelete);

