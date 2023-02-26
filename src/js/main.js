'use strict';

//* Global variables -> to get the HTML element
const inputElement = document.querySelector('.js-input');
const searchBtn = document.querySelector('.js-searchBtn');
const resetBtn = document.querySelector('.js-resetBtn');
const cocktailsList = document.querySelector('.js-cocktailsUl');
const favoritesList = document.querySelector('.js-favoritesUl'); 
const deleteBtn = document.querySelector('.js-delete');
const url =
  `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita`;
let cocktailsListData = []; // Empty array to fill the API with user's data
let favoritesListArray = [];  // Empty array to fill getting the favorite list (favoritesList)

//? Server request. When the user is loading the page, the list of Cocktails should appear -> cocktailsListData
fetch(url)
  .then((response) => response.json())
  .then((data) => {
    console.log(data); //? To see which property I have to chose (drinks). From the API (object array). This console shows an array 6 [0-5].
    mapArray(data);
    renderCocktails(cocktailsListData); //? Inside the Fetch bc until then is not executed, it is empty -> To be paint after getting the data
  });

//* Function to avoid repetitive code
function mapArray(fetchArray) {
  cocktailsListData = fetchArray.drinks.map((showDrink) => ({ //? data.drinks is use to obtain the data of each cocktail and the MAP is use here just to make a new array with the information that I need, such as: name, photo, id -> this way, I can avoid using "strDrink", instead I can use "name"
    name: showDrink.strDrink,
    photo: showDrink.strDrinkThumb,
    id: showDrink.idDrink,
  }));
}


//* When the user enter to the website or refresh the page, this function is going to be executed
//* In line 95 the data of save cocktails has been send to LS (setItem), so now we have to pick them up (getItem) -> to show on the nav.
//* We recall the function below
//* favLs -> !== null -> cuando es diferente a nulo, o sea, cuando tiene un valor.
function getFav() {
  const favLs = JSON.parse(localStorage.getItem('cocktailsElements'));  
  if (favLs) { 
    favoritesListArray = favLs; // ahora la global es igual a la local. Lo que saco de la LS, lo guardo en la global. Alguien va a usar el favoritesListArray y queremos que tenga ese valor actualizado.
    renderFavoritesList(favoritesListArray);
    console.log('HOLISSSSSS');
  }
}
getFav(); //* obtain the update data of LS.

// Function handleClickSearch button to search any kind of cocktail. We put a FETCH with the API's link obtaining the user's value (inputElement.value -> box).
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
        cocktailsList.innerHTML = ''; // We put an empty value in cocktailsList (ul list) to avoid overwriting this list and showing the user's inputs.
        renderCocktails(cocktailsListData); //todo (below) 
      }
    });
}

//todo function to paint the list of different delicious cocktails -> Scroll through the ul list and selects the objects
//todo This function is going to be recall (above) bc of the "slowly's" Fetch process
function renderCocktails(drinks) {
  for (const eachDrink of drinks) {
    if (eachDrink.photo) {
      cocktailsList.innerHTML += `<li class="js-liDrink" id="${eachDrink.id}"><h3 class="cocktailName1">${eachDrink.name}</h3><img src="${eachDrink.photo}" title="${eachDrink.name}" alt="${eachDrink.name}" class="cocktailImg"/></li>`;
    } else {
      cocktailsList.innerHTML += `<li class="js-liDrink" id="${eachDrink.id}"><h3 class="cocktailName1">${eachDrink.name}</h3><img src="https://www.drinksco.es/blog/assets/uploads/sites/2/2020/05/cocktail-3327242_1920-1170x780.jpg" title="${eachDrink.name} class="cocktailName" alt="${eachDrink.name}" class="cocktailImg"/></li>`;
    }
  }
  addEventToLis(); //todo To run the click function of LIs. It is to activate the click, in this moment, the click action should happen -> Execute the event click function (line 112)
}

//* Check if the selected cocktail is on favoritesListArray
// function already() {
//   const cocktailIsFav = favoritesListArray.find(eachCocktailFav => cocktailsListData.id === eachCocktailFav.id);
//   if (cocktailIsFav !== -1) {  //adds the class selected
//     cocktailIsFav = 'selected';
//   }
// }
// already();

//* Function to add cocktails to favorite list -> addEvList of Li.
//* Find = returns the full object which performs the condition.
//* Splice = changes the array's content. You can extract one and put another one. 1st: "from where -> the position of the element that I want to extract the info (cocktailIndex)" and 2nd: "until where -> how many I want to extract (1)"  --> Ex: from cocktailIndex position, I want to extract 1. -> si pusiera cocktailIndex, 2, me eliminaría desde donde he clicado, o sea, ese + el siguiente.
//* Push = to add an element/s at the end of the array.
//* ev.cT.id -> To search with this id on cocktails list which cocktail has the cT id's.
//* The position that returns is the fav position!
function handleClickList(ev) {
  ev.currentTarget.classList.toggle('selected');
  console.log(ev.currentTarget.id);
  const idSelected = ev.currentTarget.id;
  const cocktailSelected = cocktailsListData.find(cocktailItem => cocktailItem.id === idSelected);  //* To introduce the selected object into cocktailSelected (id)
  const cocktailIndex = favoritesListArray.findIndex(cocktailItem => cocktailItem.id === idSelected); //* To check if it is in the fav []
  console.log(cocktailIndex);
  if (cocktailIndex === -1) {  //* Check if cocktailIndex favorite; if does not exist in favorites (-1), I will add it (push) to favs -> ADD
    //ev.currentTarget.classList.add('selected');
    favoritesListArray.push(cocktailSelected);
  } else {                                          //* I check if fav's exist; if it exists (i), I will delete it (splice) to favs -> REMOVE
    //ev.currentTarget.classList.remove('selected');
    favoritesListArray.splice(cocktailIndex, 1); 
  }
  renderFavoritesList(favoritesListArray);
  localStorage.setItem('cocktailsElements', JSON.stringify(favoritesListArray)); //? We add the fav. list [] to Local through setItem. Here the fav.List[] is created. First we save them and then we will need to catch and obtain the data (getItem -> line 38). -> cocktailsElements = key LS.
}

// Paint all the favorites elements (ul fav)
function renderFavoritesList(drinkFav) {
  favoritesList.innerHTML = '';
  console.log('holis');
  for (const eachDrinkFav of drinkFav) {
    favoritesList.innerHTML += `<li class="js-liDrink" id="${eachDrinkFav.id}"><h3 class="cocktailName2">${eachDrinkFav.name} <i class="fa-regular fa-trash-can js-iconX" id="${eachDrinkFav.id}"></i></h3><img src="${eachDrinkFav.photo}" title="${eachDrinkFav.name}" alt="${eachDrinkFav.name}" class="cocktailImg2"/></li>`;
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
  //renderCocktails(cocktailsListData);
  localStorage.setItem('cocktailsElements', JSON.stringify(favoritesListArray));
}

function handleClickReset(ev) {
  ev.preventDefault();
  cocktailsList.innerHTML = '';
  favoritesList.innerHTML = '';
  localStorage.removeItem('cocktailsElements');
  location.reload(); //* This method reloads the current document
}

function handleClickDelete() {
  cocktailsList.innerHTML = '';
  favoritesList.innerHTML = '';
  localStorage.removeItem('cocktailsElements');
  location.reload();
}

//* Events
searchBtn.addEventListener('click', handleClickSearch);

//todo Event listener in any kind of cocktails (drinks) list. -> In line 75
function addEventToLis() {
  const liDrinkElements = document.querySelectorAll('.js-liDrink');
  for (const eachLi of liDrinkElements) {
    eachLi.addEventListener('click', handleClickList);
  }
}

//* Delete each favorite pressing "x"  --> ADV: LA PRIMERA HAY QUE HACER DOBLE CLICK - MIRARLO.
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


// //* Animation cocktail
// const moveDrinks = document.querySelector('.js-moveDrinks');
// moveDrinks.onclick = function() {
//   this.onclick = null; // solo el primer clic debe comenzar la animación
//   let times = 1;
//   function go() {
//     if (times % 2) {
//       moveDrinks.classList.remove('back');
//       moveDrinks.style.marginLeft = 100 * times + 200 + 'px';
//     } else {
//       moveDrinks.classList.add('back');
//       moveDrinks.style.marginLeft = 100 * times - 200 + 'px';
//     }
//   }

//   go();
//   moveDrinks.addEventListener('transitionend', function() {
//     times++;
//     go();
//   });
// };  
