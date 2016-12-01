var clearStrgData = function(){
    localStorage.clear();
};

//  RENDERING THE SCREEN (VIEW)
var loadGeneralShirt = function(){
  genShirtHeader();
  genShirtImages();
  genShirtNavigation();
  genShirtNews();
};

var genShirtHeader = function(){
    var $shirtHead = document.getElementById("teeShirtGeneral");
    var genShirtHead = document.createElement("h1");
    genShirtHead.innerHTML = "T-Shirt Information";
    $shirtHead.appendChild(genShirtHead);
};

var genShirtImages = function(){
    var originDiv = document.getElementById("teeShirtGeneral");
    var firstDiv = document.createElement("div");

    var image1Div = document.createElement("div");
    image1Div.setAttribute("id","tshirt");
    
    var frontText = document.createElement("div");
    frontText.classList.add("textCentered");
    frontText.innerHTML = "Front";
    image1Div.appendChild(frontText);
    
    var frontImage = document.createElement("img");
    frontImage.setAttribute("src", "../images/BFR Tee Shirt Front 2.jpg");
    image1Div.appendChild(frontImage);
    firstDiv.appendChild(image1Div);
    
    var image2Div = document.createElement("div");
    image2Div.setAttribute("id","tshirt");
    
    var backText = document.createElement("div");
    backText.classList.add("textCentered");
    backText.innerHTML = "Back";
    image2Div.appendChild(backText);
    
    var backImage = document.createElement("img");
    backImage.setAttribute("src", "../images/BFR Tee Shirt Back.jpg");
    image2Div.appendChild(backImage);
    
    firstDiv.appendChild(image2Div);
    originDiv.appendChild(firstDiv);
};

var genShirtNavigation = function(){
    var sourceDiv = document.getElementById("teeShirtGeneral");
    var buttonDiv = document.createElement("div");
    
    var genShirtHomeReturn = document.createElement("button");
    genShirtHomeReturn.setAttribute("type", "button");
    genShirtHomeReturn.setAttribute("id", "tShirtHomeReturn");
    genShirtHomeReturn.innerHTML = "Return to Home Screen";
    genShirtHomeReturn.addEventListener("click", function(ev){
        showHomePageScreen();
    });
    
    buttonDiv.appendChild(genShirtHomeReturn);
    sourceDiv.appendChild(buttonDiv);
};

var genShirtNews = function(){
  var shirtSourceDiv = document.getElementById("teeShirtGeneral");
  var newsDiv = document.createElement("div");
  var newsPar = document.createElement("p");
  newsPar.innerHTML = "More information will be available after you register for a free Account";
  newsDiv.appendChild(newsPar);
  shirtSourceDiv.appendChild(newsDiv);
};

var genShirtStart = function(){
    clearStrgData();
    loadGeneralShirt();    
};

document.addEventListener("DOMContentLoaded",genShirtStart);