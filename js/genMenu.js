var fdDB = new Firebase("https://bowmanfamreun.firebaseio.com/Food");

var getFoodList = function(){
    fdDB.orderByKey().on("value", function(snapshot){
        snapshot.forEach(function (childSnapshot){
            var fdItem = childSnapshot.val().food;
            var foodCategory = childSnapshot.val().category;
            renderIndividualFood(fdItem, foodCategory);          
        });
    });
};

// RENDERING THE SCREEN (VIEW)
var renderMenu= function(){
  renderCategoryHeaders();
  getFoodList();  
};

var renderCategoryHeaders = function(){
    renderMenuHeader();
    renderSaladHeader();
    renderSideDishHeader();
    renderMeatHeader();
    renderDessertHeader();
};

var renderMenuHeader = function(){
    var genHeadDiv = document.getElementById("genMenuHeader");
    var genHead = document.createElement("h1");
    genHead.innerHTML = "Foods that will be brought to the 2017 Bowman Family Reunion";
    genHeadDiv.appendChild(genHead);
};

var renderSaladHeader = function(){
    var saladHeadDiv = document.getElementById("saladSection");
    var saladHead = document.createElement("h1");
    saladHead.innerHTML = "Salads";
    saladHeadDiv.appendChild(saladHead);
};

var renderSideDishHeader = function(){
    var sideDishHeadDiv = document.getElementById("sideDishSection");
    var sideDishHead = document.createElement("h1");
    sideDishHead.innerHTML = "SideDish";
    sideDishHeadDiv.appendChild(sideDishHead);
};

var renderMeatHeader = function(){
    var meatHeadDiv = document.getElementById("meatSection");
    var meatHead = document.createElement("h1");
    meatHead.innerHTML = "Meat";
    meatHeadDiv.appendChild(meatHead);
};

var renderDessertHeader = function(){
    var dessertHeadDiv = document.getElementById("dessertSection");
    var dessertHead = document.createElement("h1");
    dessertHead.innerHTML = "Dessert";
    dessertHeadDiv.appendChild(dessertHead);
};

var renderIndividualFood = function(afood, aCategory){
    if (aCategory == "Salad"){
        renderSalad(afood);
    } else if (aCategory == "Side Dish"){
        renderSideDish(afood);
    } else if (aCategory == "Meat"){
        renderMeat(afood);
    } else {
        renderDessert(afood);
    }
};

var renderSalad = function (aSalad){
  var saladDiv = document.getElementById("saladSection");
    var saladItem = document.createElement("div");
    saladItem.innerHTML = aSalad;
    saladDiv.appendChild(saladItem);
};

var renderSideDish = function (aSideDish){
  var sideDishDiv = document.getElementById("sideDishSection");
    var sideDishItem = document.createElement("div");
    sideDishItem.innerHTML = aSideDish;
    sideDishDiv.appendChild(sideDishItem);
};

var renderMeat = function (aMeat){
  var meatDiv = document.getElementById("meatSection");
    var meatItem = document.createElement("div");
    meatItem.innerHTML = aMeat;
    meatDiv.appendChild(meatItem);
};

var renderDessert = function (aDessert){
  var dessertDiv = document.getElementById("dessertSection");
    var dessertItem = document.createElement("div");
    dessertItem.innerHTML = aDessert;
    dessertDiv.appendChild(dessertItem);
};

var renderGenMenuNav = function(){
    var navDiv = document.getElementById("genMenuNav");
    
    var menuReturn = document.createElement("button");
    menuReturn.setAttribute("type", "button");
    menuReturn.setAttribute("id", "homeRtn");
    menuReturn.innerHTML = "Return to Homepage";
    menuReturn.addEventListener("click", function(ev){
        showHomePageScreen();
    });
    navDiv.appendChild(menuReturn);
};

var menuStart = function(){
    renderMenu();
    renderGenMenuNav();
};

document.addEventListener('DOMContentLoaded', menuStart);
