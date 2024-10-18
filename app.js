function fetchApi () {
    fetch("https://thecocktaildb.com/api/json/v1/1/search.php?f=a")
    .then((res) => res.json())
     .then((item) =>  showItem(item.drinks)    
)}

fetchApi ();

function showItem (user = [] ) { 
   if (user.length > 0) {
    user.slice(0, 12).forEach((user) => { 
        console.log(user);
          
        document.getElementById("user-box").innerHTML += `
         <div class="border border-gray-300">
            <img src=${user.strDrinkThumb} alt="">
           <div class="p-3"> 
            <h3 class="text-white text-[20px]">${user.strDrink}</h3>
            <p class="text-[15px] text-white my-3 h-[100px]">${user.strInstructions.slice(0, 90)}...</p>
            <div class="my-5">
            <a href="#" class="text-white ml-3" onclick="showPopup('${user.idDrink}')">View Details</a>
            </div>
           </div>
         </div>
        `
    })
   }
};

function showPopup (id){
    let apiUrl = `https://thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
    fetch(apiUrl)
    .then((res) => res.json())
     .then((item) =>  popupDetails(item.drinks[0])    
)
}

function popupDetails (meal) {
   console.log(meal);
   const popup = document.getElementById("popup");
//    popup.style.display = "none";
//    popup.style.display = "block";
   popup.classList.add("visible")
   popup.classList.remove("invisible")
popup.innerHTML = `
           <div class="popup bg-white w-170%] min-h-[500px] p-10">
            <img src=${meal.strDrinkThumb} alt="" class="w-[300px] pt-2">
            <h2 class="text-2xl font-bold mb-4">${meal.strDrink}</h2>
            <div class="flex gap-2 items-center">
            <h1>Category:</h1>
            <h1 class="text-[15px] mb-4 text-red-900 pt-5">${meal.strCategory}</h1>
            </div>
            <p class="mb-6">${meal.strInstructions}.</p>
            <button
              class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded" onclick="closePopup()"
            >
              Close
            </button>
          </div>
   `
}

function closePopup() {
    popup.classList.add("invisible");
    popup.classList.remove("visible");
    // popup.style.display = "block";
    // popup.style.display = "flex";
}


// // search start 
const searchCocktail = document.getElementById("input")
function fetchCocktail () {
    if (searchCocktail.value) {
        console.log(searchCocktail.value);
        let URL = `https://thecocktaildb.com/api/json/v1/1/search.php?s=${searchCocktail.value}`;
    fetch(URL)
    .then((res) => res.json())
    .then((cocktails) => showCocktail(cocktails.drinks));
    document.getElementById("no-found").style.display = "none";
    document.querySelector(".cocktail").innerHTML = "";
    } else {
        alert ("Search for a Cocktail First ...")
    document.getElementById("no-found").style.display = "block";
    } 
}
function showCocktail (cocktails) {
    console.log(cocktails);
    for (let cocktail of cocktails ) {
        console.log(cocktail);
        document.querySelector(".cocktail").innerHTML += `
        <div class="Cocktail-box border border-gray-300">
        <img src=${cocktail.strDrinkThumb} alt="">
       <div class="p-3"> 
        <h3 class="text-white text-[20px]">${cocktail.strDrink}</h3>
        <p class="text-[15px] text-white my-3 min-h-[100px]">${cocktail.strInstructions}</p>
        <div class="my-5">          
        <a href="#" class="text-white ml-3" onclick="lookUpDetails('${cocktail.idDrink}')">View Details</a>
        </div>
       </div>
     </div>   `
        
    }   
}
function lookUpDetails (id) {
    console.log(id);
    let URL = `https://thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    fetch(URL)
    .then((res) => res.json())
    .then((cocktails) => showMoreDetails(cocktails.drinks[0]));
}
function showMoreDetails (cocktail){
//    console.log(cocktail);
   const details = document.getElementById("details");
//    details.style.display = "none";
//    details.style.display = "block";
   details.classList.add("visible")
   details.classList.remove("invisible")
   details.innerHTML = `
            <div class="popup bg-white w-170%] min-h-[500px] p-10">
            <img src=${cocktail.strDrinkThumb} alt="" class="w-[200px] pt-2">
            <h2 class="text-2xl font-bold mb-4">${cocktail.strDrink}</h2>
             <div class="flex gap-2 items-center">
            <h1>Category:</h1>
            <h1 class="text-[15px] mb-4 text-red-900 pt-5">${cocktail.strCategory}</h1>
            </div>
            <p class="mb-6">${cocktail.strInstructions}</p>
            <button
              class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded" onclick="close()"
            >
              Close
            </button>
            </div>
   `
}
function close() {
    details.classList.add("visible");
    details.classList.remove("visible");
    // details.style.display = "block";
    // details.style.display = "flex";
};
const search = document.getElementById("search");
search.addEventListener("click", () => {
    fetchCocktail ()
});
