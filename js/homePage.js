var clearStorage = function(){
  localStorage.clear();  
};

var loadHomePage = function(){
  renderHomeTitle();
  renderButtons();
  renderReunInfo();
  renderNews();
  renderReunPhoto();
  renderHomeNavButtons();
};

var renderHomeTitle = function(){
  var $home =document.getElementById("homeTitle");
  var $Title = document.createElement("h1");
  $Title.innerHTML = "Welcome to the Bowman 2017 Family Reunion";
  $home.appendChild($Title);
};

var renderReunPhoto = function(){
    var homeDiv = document.getElementById("reunPhoto");
    homeDiv.classList.add("individual_block");
    var photoContDiv = document.createElement("div");
    // photoContDiv.setAttribute("id", "reunPhoto");
    var photo = document.createElement("img");
    photo.setAttribute("src","../images/BFR Tee Shirt Front 2.jpg");
    photoContDiv.appendChild(photo);
    homeDiv.appendChild(photoContDiv);
};

var renderButtons = function(){
    var hDiv = document.getElementById("regArea");
    
    var acctDv = document.createElement("div");
    
    var signDiv = document.createElement("div");
    signDiv.classList.add("individual_block_first");
    
    var signBut = document.createElement("button");
    signBut.setAttribute("type", "button");
    signBut.setAttribute("id", "signUpButton");
    // signBut.classList.add("individual_block_first");
    signBut.innerHTML = "Account <br /> Registration";
    signBut.addEventListener("click", function(ev){
        showSignUpScreen();
    });
    signDiv.appendChild(signBut);
    acctDv.appendChild(signDiv);
    
    
    // hDiv.appendChild(signDiv);
    // hDiv.appendChild(signDiv);
    // hDiv.appendChild(signBut);
    
    var logDiv = document.createElement("div");
    logDiv.classList.add("individual_block");
    
    var logBut = document.createElement("button");
    logBut.setAttribute("type", "button");
    logBut.setAttribute("id", "login");
    // logBut.classList.add("individual_block");
    logBut.innerHTML = "Login";
    logBut.addEventListener("click", function(ev){
        showLoginScreen();
    });
    logDiv.appendChild(logBut);
    acctDv.appendChild(logDiv);
    
    
    // hDiv.appendChild(logDiv);
    hDiv.appendChild(acctDv);
    // hDiv.appendChild(logBut);
};

var renderReunInfo = function(){
    var homePa =document.getElementById("news");
    homePa.classList.add("individual_block_first");
    var attendDate = document.createElement("h1");
    attendDate.innerHTML = "The family reunion will take place Saturday, July 15th 2017, from Noon to 6 PM.";
    homePa.appendChild(attendDate);
    
    var attendLoc = document.createElement("div");
    var attendLocation = document.createElement("h1");
    attendLocation.innerHTML = "It will take place at the following Location";
    attendLoc.appendChild(attendLocation);

    var attendName = document.createElement("div");
    attendName.innerHTML = "Charles City Social Center";
    attendLoc.appendChild(attendName);

    var attendAddr = document.createElement("div");
    attendAddr.innerHTML = "8320 Ruthville Road";
    attendLoc.appendChild(attendAddr);
    
    var attendCity = document.createElement("div");
    attendCity.innerHTML = "Ruthville, VA 23147";
    attendLoc.appendChild(attendCity);
    homePa.appendChild(attendLoc);
};

var renderNews = function(){
    var homeP =document.getElementById("news");
    homeP.classList.add("individual_block_first");
    var $div = document.createElement("div");
    // $div.setAttribute("id", "news");
    $div.innerHTML = "";
  var $head = document.createElement("h2");
  $head.innerHTML = "Family Reunion Tee-Shirts will be available.  More information about cost will be provided once one has created a free account and logged in. The buttons below will give you basic information";
    $div.appendChild($head); 
    homeP.appendChild($div);
};

var renderHomeNavButtons = function(){
    var home = document.getElementById("navigation");
    var nav = document.createElement("div");
    // nav.setAttribute("id", "navigation");
    
    var costDiv = document.createElement("div");
    costDiv.classList.add("individual_block_first");
    
    var homeCostBut = document.createElement("button");
    homeCostBut.setAttribute("type", "button");
    homeCostBut.setAttribute("id", "costBut");
    homeCostBut.innerHTML = "Event Cost <br /> Information";
    homeCostBut.addEventListener("click", function(ev){
        showCostScreen();
    });
    costDiv.appendChild(homeCostBut);
    nav.appendChild(costDiv);
    
    // nav.appendChild(homeCostBut);
    
    var shirtDv = document.createElement("div");
    shirtDv.classList.add("individual_block");
    
    var homeGenTBut = document.createElement("button");
    homeGenTBut.setAttribute("type", "button");
    homeGenTBut.setAttribute("id", "teeShirt");
    // homeGenTBut.classList.add("individual_block");
    homeGenTBut.innerHTML = "Tee Shirt <br /> Information";
    homeGenTBut.addEventListener("click", function(ev){
        showTeeShirtGeneralScreen();
    });
    shirtDv.appendChild(homeGenTBut);
    nav.appendChild(shirtDv);
    
    // nav.appendChild(homeGenTBut);
    
    var menuDiv = document.createElement("div");
    menuDiv.classList.add("individual_block");
    
    var homeMenuBut = document.createElement("button");
    homeMenuBut.setAttribute("type", "button");
    homeMenuBut.setAttribute("id", "genMenuBut");
    // homeMenuBut.classList.add("individual_block");
    homeMenuBut.innerHTML = "Menu <br /> Information";
    homeMenuBut.addEventListener("click", function(ev){
        showCurrentMenuScreen();
    });
    
    menuDiv.appendChild(homeMenuBut);
    nav.appendChild(menuDiv);
    // nav.appendChild(homeMenuBut);
    
    home.appendChild(nav);
};

var homeStart = function(){
    clearStorage();
    loadHomePage();
};

document.addEventListener('DOMContentLoaded', homeStart);