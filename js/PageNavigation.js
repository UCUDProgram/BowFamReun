var pages = ['homePage','signup','login','pass_reset', 'loginHome','adminlogin','adminHome','teeShirtGeneral','teeShirtLogin','costInf'];
var currentPageIndex =0;
var userAccount = new Profile();
var useAcct = "guest";

var showHomePageScreen = function(){
  var oldIndex = currentPageIndex;
  currentPageIndex =0;
  document.getElementById(pages[oldIndex]).classList.add('hidden');
  document.getElementById(pages[currentPageIndex]).classList.remove('hidden');
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
  // var oldIndex = currentPageIndex;
  // currentPageIndex =4;
  // document.getElementById(pages[oldIndex]).classList.add('hidden');
  // document.getElementById(pages[currentPageIndex]).classList.remove('hidden');

window.location.href = "members.html";

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
  currentPageIndex =9;
  document.getElementById(pages[oldIndex]).classList.add('hidden');
  document.getElementById(pages[currentPageIndex]).classList.remove('hidden');
};


var appStart = function(){
    currentPageIndex = 0;  
    showHomePageScreen();
    // Event Listeners for Navgation
    document.getElementById("regHomeReturn").addEventListener("click",showHomePageScreen);
    document.getElementById("tShirtHomeReturn").addEventListener("click",showHomePageScreen);
  };

document.addEventListener('DOMContentLoaded',appStart);