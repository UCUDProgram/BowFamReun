var clearStorage = function(){
  localStorage.clear();  
};

var loadHomePage = function(){
  renderHomeTitle();
  renderReunPhoto();
  renderButtons();
  renderNews();
  renderHomeNavButtons();
};

var renderHomeTitle = function(){
  var $home =document.getElementById("homePage");
  var $Title = document.createElement("h1");
  $Title.innerHTML = "Welcome to the Bowman 2017 Family Reunion";
  $home.appendChild($Title);
};

var renderReunPhoto = function(){
    var homeDiv = document.getElementById("homePage");
    var photoContDiv = document.createElement("div");
    photoContDiv.setAttribute("id", "reunPhoto");
    var photo = document.createElement("img");
    photo.setAttribute("src","../images/BFR Tee Shirt Front 2.jpg");
    photoContDiv.appendChild(photo);
    homeDiv.appendChild(photoContDiv);
};

var renderButtons = function(){
    var hDiv = document.getElementById("homePage");
    
    var signBut = document.createElement("button");
    signBut.setAttribute("type", "button");
    signBut.setAttribute("id", "signUp");
    signBut.innerHTML = "Account Registration";
    signBut.addEventListener("click", function(ev){
        showSignUpScreen();
    });
    hDiv.appendChild(signBut);
    
    var logBut = document.createElement("button");
    logBut.setAttribute("type", "button");
    logBut.setAttribute("id", "logIn");
    logBut.innerHTML = "Login";
    logBut.addEventListener("click", function(ev){
        showLoginScreen();
    });
    hDiv.appendChild(logBut);
    
};

var renderNews = function(){
    var homeP =document.getElementById("homePage");
    var $div = document.createElement("div");
    $div.setAttribute("id", "news");
    $div.innerHTML = "";
  var $head = document.createElement("h2");
  $head.innerHTML = "Family Reunion Tee-Shirts will be available.  More information about cost will be provided once one has created a free account and logged in. The buttons below will give you basic information";
    $div.appendChild($head); 
    homeP.appendChild($div);
};

var renderHomeNavButtons = function(){
    var home = document.getElementById("homePage");
    var nav = document.createElement("div");
    nav.setAttribute("id", "navigation");
    
    var homeCostBut = document.createElement("button");
    homeCostBut.setAttribute("type", "button");
    homeCostBut.setAttribute("id", "costBut");
    homeCostBut.innerHTML = "Event Cost Information";
    homeCostBut.addEventListener("click", function(ev){
        showCostScreen();
    });
    nav.appendChild(homeCostBut);
    
    var homeGenTBut = document.createElement("button");
    homeGenTBut.setAttribute("type", "button");
    homeGenTBut.setAttribute("id", "teeShirt");
    homeGenTBut.innerHTML = "Tee Shirt Information";
    homeGenTBut.addEventListener("click", function(ev){
        showTeeShirtGeneralScreen();
    });
    nav.appendChild(homeGenTBut);
    
    var homeMenu = document.createElement("button");
    homeMenu.setAttribute("type", "button");
    homeMenu.setAttribute("id", "genMenu");
    homeMenu.innerHTML = "Menu Information";
    homeMenu.addEventListener("click", function(ev){
        showCurrentMenuScreen();
    });
    nav.appendChild(homeMenu);
    
    home.appendChild(nav);
};

var homeStart = function(){
    clearStorage();
    loadHomePage();
};

document.addEventListener('DOMContentLoaded', homeStart);