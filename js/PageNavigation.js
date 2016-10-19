var pages = ['homePage','signup','login','pass_reset', 'loginHome','adminlogin','adminHome','teeShirtGeneral','teeShirtLogin','costInf'];
var currentPageIndex =0;


var showHomePageScreen = function(){
  var oldIndex = currentPageIndex;
  currentPageIndex =0;
  document.getElementById(pages[oldIndex]).classList.add('hidden');
  document.getElementById(pages[currentPageIndex]).classList.remove('hidden');
  renderTeeShirtInfo();
};

var showSignUpScreen = function(){
  var oldIndex = currentPageIndex;
  currentPageIndex =1;
  document.getElementById(pages[oldIndex]).classList.add('hidden');
  document.getElementById(pages[currentPageIndex]).classList.remove('hidden');
};

var showLoginScreen = function(){
  var oldIndex = currentPageIndex;
  currentPageIndex =2;
  document.getElementById(pages[oldIndex]).classList.add('hidden');
  document.getElementById(pages[currentPageIndex]).classList.remove('hidden');
};

var showPasswordResetScreen = function(){
  var oldIndex = currentPageIndex;
  currentPageIndex =3;
  document.getElementById(pages[oldIndex]).classList.add('hidden');
  document.getElementById(pages[currentPageIndex]).classList.remove('hidden');
};

var showLoginHomeScreen = function(){
  var oldIndex = currentPageIndex;
  currentPageIndex =4;
  document.getElementById(pages[oldIndex]).classList.add('hidden');
  document.getElementById(pages[currentPageIndex]).classList.remove('hidden');
};

var showAdminLoginScreen = function(){
  var oldIndex = currentPageIndex;
  currentPageIndex =5;
  document.getElementById(pages[oldIndex]).classList.add('hidden');
  document.getElementById(pages[currentPageIndex]).classList.remove('hidden');
};

var showAdminHomeScreen = function(){
  var oldIndex = currentPageIndex;
  currentPageIndex =6;
  document.getElementById(pages[oldIndex]).classList.add('hidden');
  document.getElementById(pages[currentPageIndex]).classList.remove('hidden');
};

var showTeeShirtGeneralScreen = function(){
  var oldIndex = currentPageIndex;
  currentPageIndex =7;
  document.getElementById(pages[oldIndex]).classList.add('hidden');
  document.getElementById(pages[currentPageIndex]).classList.remove('hidden');
};

var showTeeShirtLoginScreen = function(){
  var oldIndex = currentPageIndex;
  currentPageIndex =8;
  document.getElementById(pages[oldIndex]).classList.add('hidden');
  document.getElementById(pages[currentPageIndex]).classList.remove('hidden');
};

var showCostScreen = function(){
  var oldIndex = currentPageIndex;
  currentPageIndex =8;
  document.getElementById(pages[oldIndex]).classList.add('hidden');
  document.getElementById(pages[currentPageIndex]).classList.remove('hidden');
    renderCostInfo();
};

var renderTeeShirtInfo = function(){
  var $div = document.getElementById("news");
    $div.innerHTML = "";
  var $head = document.createElement("h2");
  $head.innerHTML = "Family Reunion Tee-Shirts will be available.  Please come back later for more information. The button below will give you basic information";
    $div.appendChild($head); 
};

var renderCostInfo = function(){
    var $div = document.getElementById("costInfo");
    $div.innerHTML = "";
    var $child = document.createElement("h2");
    $child.innerHTML = "Cost for a child(Age 3-17) is $5.00";
    $div.appendChild($child);
    var $adult = document.createElement("h2");
    $adult.innerHTML = "Cost for an adult(Age 18-79) is $20.00";
    $div.appendChild($adult);
    var $free = document.createElement("h2");
    $free.innerHTML = "Cost for a child(Under 3) or an adult 80 & over is FREE ($0.00)";
    $div.appendChild($free);
};

var appStart = function(){
    currentPageIndex = 0;  
    showHomePageScreen();
    // Event Listeners for Navgation
    document.getElementById("regHomeReturn").addEventListener("click",showHomePageScreen);
    document.getElementById("loginHomeReturn").addEventListener("click",showHomePageScreen);
    document.getElementById("tShirtHomeReturn").addEventListener("click",showHomePageScreen);
    document.getElementById("costHomeReturn").addEventListener("click",showHomePageScreen);
    

    document.getElementById("signUp").addEventListener("click",showSignUpScreen);
    document.getElementById("logIn").addEventListener("click",showLoginScreen);
    document.getElementById("passForgotten").addEventListener("click",showPasswordResetScreen);
    document.getElementById("loginReturn").addEventListener("click",showLoginScreen);


    document.getElementById("teeShirt").addEventListener("click",showTeeShirtGeneralScreen);
    document.getElementById("costBut").addEventListener("click",showCostScreen);
};

document.addEventListener('DOMContentLoaded',appStart);