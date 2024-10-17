function fetchApi () {
    fetch("https://thecocktaildb.com/api/json/v1/1/search.php?f=a")
    .then((res) => res.json())
    .then((item) => console.log
    (item));
}

fetchApi ();

function showItem (user) {
    // console.log(user);
    user.forEach((user) => console.log(user)
    //  document.getElementById("user-box").innerHTML += 
    // `
    // <div class=" grid grid-cols-3 gap-5 mt-4">
    //   <div class="Cocktail-box border border-gray-300">
    //      <img src=${user.strDrinkThumb} alt="">
    //     <div class="p-3"> 
    //      <h3 class="text-white text-[20px]">${user.strAlcoholic}</h3>
    //      <p class="text-[15px] text-white my-3">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloremque magni quas ea hic, voluptatem molestias!</p>
    //      <div class="my-5">
    //        <a href="#" class="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded">Watch</a>
    //      <a href="#" class="text-white ml-3">View Cocktail</a>
    //      </div>
    //     </div>
    //   </div>
    // </div>
    // `
)};


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
   details.style.display = "none";
   details.style.display = "block";
//    details.classList.add("invisible")
   details.innerHTML = `
    <div class="bg-white rounded-lg p-6 w-[50%] md:flex-col md:flex">
        <h2 class="text-lg font-bold">${cocktail.strDrink}</h2>
        <p class="mt-2">${cocktail.strInstructions}</p>
        <div class="mt-4 flex justify-start">
            <button class="bg-red-500 text-white px-4 py-2 rounded" onclick="close()">Close</button>
        </div>
    </div>
   `
}
function close() {
    // details.classList.add("invisible");
    // details.classList.remove("visible");
    details.style.display = "block";
    details.style.display = "flex";
}
const search = document.getElementById("search");
search.addEventListener("click", () => {
    fetchCocktail ()
})
