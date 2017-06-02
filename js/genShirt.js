var clearStrgData = function(){
    localStorage.clear();
};

//  RENDERING THE SCREEN (VIEW)
var loadGeneralShirt = function(){
    renderGenShirtHeader();
    renderGenShirtImages();
    renderGenShirtCost();
};

var renderGenShirtHeader = function(){
    var shirtHead = document.getElementById("tShirtHead");
    var genShirtHead = document.createElement("h1");
    genShirtHead.innerHTML = "T-Shirt Information";
    shirtHead.appendChild(genShirtHead);
};

var renderGenShirtImages = function(){
    var originDiv = document.getElementById("tShirtImage");
    var firstDiv = document.createElement("div");

    var image1Div = document.createElement("div");
    image1Div.setAttribute("id","tshirt");
    
    var frontText = document.createElement("div");
    frontText.classList.add("textCentered");
    frontText.innerHTML = "Front";
    image1Div.appendChild(frontText);
    
    var frontImage = document.createElement("img");
    frontImage.setAttribute("src", "../images/BFR Tee Shirt.jpeg");
    image1Div.appendChild(frontImage);
    firstDiv.appendChild(image1Div);
    originDiv.appendChild(firstDiv);
};

var renderGenShirtCost = function(){
    var shtDv = document.getElementById("tShirtCost");
    var normCost = document.createElement("h4");
    normCost.innerHTML = "Shirt sizes from small up to and including XXL can be purchased for 10 dollars ($10) each.";
    shtDv.appendChild(normCost);
    
    var biggerCost = document.createElement("h4");
    biggerCost.innerHTML = "Triple and Quadruple XL Shirts, however, can be purchased for 12 dollars ($12) each.";
    shtDv.appendChild(biggerCost);
    
};

var genShirtStart = function(){
    clearStrgData();
    loadGeneralShirt();    
};

document.addEventListener("DOMContentLoaded",genShirtStart);