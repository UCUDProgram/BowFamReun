var clrStrDt = function(){
  localStorage.clear();  
};

//  RENDERING THE SCREEN (VIEW)
var loadGenCost = function(){
    costHeader();
    costInfo();
    costNav();
};

var costHeader = function(){
    var costInfHeader = document.getElementById("costInf");
    var costInfTitle = document.createElement("h1");
    costInfTitle.innerHTML = "Cost per person for the 2017 Bowman Family Reunion";
    costInfHeader.appendChild(costInfTitle);
};

var costInfo = function(){
    var costDiv = document.getElementById("costInf");
     var $costInfoDiv = document.createElement("div");
     $costInfoDiv.setAttribute("id","costInfo");
    $costInfoDiv.innerHTML = "";
    var $child = document.createElement("h2");
    $child.innerHTML = "Cost for a child(Age 3-17) is $5.00";
    $costInfoDiv.appendChild($child);
    var $adult = document.createElement("h2");
    $adult.innerHTML = "Cost for an adult(Age 18-79) is $20.00";
    $costInfoDiv.appendChild($adult);
    var $free = document.createElement("h2");
    $free.innerHTML = "Cost for a child(Under 3) or an adult 80 & over is FREE ($0.00)";
    $costInfoDiv.appendChild($free);
    costDiv.appendChild($costInfoDiv);
    
};

var costNav = function(){
    var costInfDiv = document.getElementById("costInf");
    var costHomeReturnButton = document.createElement("button");
    costHomeReturnButton.setAttribute("type", "button");
    costHomeReturnButton.setAttribute("id","costHomeReturn");
    costHomeReturnButton.innerHTML = "Return to Home Screen";
    costHomeReturnButton.addEventListener("click", function(ev){
        showHomePageScreen();
    });
    
    costInfDiv.appendChild(costHomeReturnButton);
};

var genCostStart = function(){
    clrStrDt();
  loadGenCost();  
};

document.addEventListener('DOMContentLoaded',genCostStart);