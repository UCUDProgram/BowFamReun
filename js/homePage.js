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
    renderContact();
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
    signBut.innerHTML = "Account <br /> Registration";
    signBut.addEventListener("click", function(ev){
        showSignUpScreen();
    });
    signDiv.appendChild(signBut);
    acctDv.appendChild(signDiv);

    var logDiv = document.createElement("div");
    logDiv.classList.add("individual_block");
    var logBut = document.createElement("button");
    logBut.setAttribute("type", "button");
    logBut.setAttribute("id", "login");
    logBut.innerHTML = "Login";
    logBut.addEventListener("click", function(ev){
        showLoginScreen();
    });
    logDiv.appendChild(logBut);
    acctDv.appendChild(logDiv);
    hDiv.appendChild(acctDv);
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

    var attendLoca = document.createElement("div");
    attendLoca.classList.add("addressD");
    var attendName = document.createElement("h3");
    attendName.innerHTML = "Charles City Social Center";
    attendLoca.appendChild(attendName);

    var attendAddr = document.createElement("h3");
    attendAddr.innerHTML = "8320 Ruthville Road";
    attendLoca.appendChild(attendAddr);
    
    var attendCity = document.createElement("h3");
    attendCity.innerHTML = "Ruthville, VA 23147";
    attendLoca.appendChild(attendCity);
    attendLoc.appendChild(attendLoca);
    homePa.appendChild(attendLoc);
};

var renderNews = function(){
    var homeP =document.getElementById("news");
    homeP.classList.add("individual_block_first");
    var $div = document.createElement("div");
    $div.innerHTML = "";
    var $head = document.createElement("h2");
    $head.innerHTML = "Family Reunion Tee-Shirts will be available.  More information about cost will be provided once one has created a free account and logged in. The buttons below will give you basic information";
    $div.appendChild($head); 
    homeP.appendChild($div);
};

var renderContact = function(){
    var conDiv = document.getElementById("contact");
    var contaDv = document.createElement("h2");
    contaDv.innerHTML = "If you have any questions, you can contact us via email @ nerprouc@gmail.com";
    conDiv.appendChild(contaDv);
  
    // var emlnk = document.createElement("a");
    // emlnk.setAttribute("href", "mailto:nerprouc@gmail.com");
    // emlnk.innerHTML = "nerprouc@gmail.com";
    // emlnk.style.fontSize = "28px";
    // conDiv.appendChild(emlnk);
};

var renderHomeNavButtons = function(){
    var home = document.getElementById("navigation");
    var nav = document.createElement("div");
    renderEventCost(nav);
    renderShirtInfo(nav);
    renderMenuInfo(nav);
    renderAncestryReport(nav);
    renderMailingSignup(nav);
    renderCommitteeSignup(nav);
    renderRaffleInfo(nav);
    home.appendChild(nav);
};

var renderEventCost = function(atD){
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
    atD.appendChild(costDiv);
};

var renderShirtInfo = function(ataD){
    var shirtDv = document.createElement("div");
    shirtDv.classList.add("individual_block");
    
    var homeGenTBut = document.createElement("button");
    homeGenTBut.setAttribute("type", "button");
    homeGenTBut.setAttribute("id", "teeShirt");
    homeGenTBut.innerHTML = "Tee Shirt <br /> Information";
    homeGenTBut.addEventListener("click", function(ev){
        showTeeShirtGeneralScreen();
    });
    shirtDv.appendChild(homeGenTBut);
    ataD.appendChild(shirtDv);
};

var renderMenuInfo = function(ataDi){
    var menuDiv = document.createElement("div");
    menuDiv.classList.add("individual_block");
    
    var homeMenuBut = document.createElement("button");
    homeMenuBut.setAttribute("type", "button");
    homeMenuBut.setAttribute("id", "genMenuBut");
    homeMenuBut.innerHTML = "Menu <br /> Information";
    homeMenuBut.addEventListener("click", function(ev){
        showCurrentMenuScreen();
    });
    menuDiv.appendChild(homeMenuBut);
    ataDi.appendChild(menuDiv);
};
    
var renderAncestryReport = function(atDi){    
    var ancestDiv = document.createElement("div");
    ancestDiv.classList.add("individual_block");
    
    var ancestRptBut = document.createElement("button");
    ancestRptBut.setAttribute("type", "button");
    ancestRptBut.setAttribute("id", "ancestRptBut");
    ancestRptBut.innerHTML = "Ancestry <br />  Report <br /> Request";
    ancestRptBut.addEventListener("click", function(ev){
        showAncestryReportRequestScreen();
    });
    ancestDiv.appendChild(ancestRptBut);
    atDi.appendChild(ancestDiv);
};
    
var renderMailingSignup = function(attDiv){
    var mailingListDiv = document.createElement("div");
    mailingListDiv.classList.add("individual_block");
    
    var mailingListBut = document.createElement("button");
    mailingListBut.setAttribute("type", "button");
    mailingListBut.setAttribute("id", "mailingListBut");
    mailingListBut.innerHTML = "Mailing List <br />  Signup";
    mailingListBut.addEventListener("click", function(ev){
        showMailingListScreen();
    });
    mailingListDiv.appendChild(mailingListBut);
    attDiv.appendChild(mailingListDiv);
};

var renderCommitteeSignup = function(atDv){
    var committeeDiv = document.createElement("div");
    committeeDiv.classList.add("individual_block");
    
    var committeeBut = document.createElement("button");
    committeeBut.setAttribute("type", "button");
    committeeBut.setAttribute("id", "committeeBut");
    committeeBut.innerHTML = "2018 Committee <br />  Signup";
    committeeBut.addEventListener("click", function(ev){
        showCommitteeScreen();
    });
    committeeDiv.appendChild(committeeBut);
    atDv.appendChild(committeeDiv);
};    

var renderRaffleInfo = function(aDv){
    var raffleDiv = document.createElement("div");
    raffleDiv.classList.add("individual_block");
    
    var raffleBut = document.createElement("button");
    raffleBut.setAttribute("type", "button");
    raffleBut.setAttribute("id", "raffleBut");
    raffleBut.innerHTML = "Raffle";
    raffleBut.addEventListener("click", function(ev){
        showRaffleScreen();
    });
    raffleDiv.appendChild(raffleBut);
    aDv.appendChild(raffleDiv);
};    
    


var homeStart = function(){
    clearStorage();
    loadHomePage();
};

document.addEventListener('DOMContentLoaded', homeStart);