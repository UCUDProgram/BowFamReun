var clearStrgData = function(){
    localStorage.clear();
};

//  RENDERING THE SCREEN (VIEW)
var loadGeneralShirt = function(){
    renderGenShirtHeader();
    renderGenShirtNews();
    renderGenChildrenTShirtImages();
};

var renderGenShirtHeader = function(){
    var shirtHead = document.getElementById("tShirtHead");
    var genShirtHead = document.createElement("h1");
    genShirtHead.innerHTML = "T-Shirt Information";
    shirtHead.appendChild(genShirtHead);
};

var renderGenChildrenTShirtImages = function(){
    var originDiv = document.getElementById("tShirtImages");
    var firstDiv = document.createElement("div");
    renderShirtImagesRowOne(firstDiv);
    // renderShirtImagesRowTwo(firstDiv);
    // renderShirtImagesRowThree(firstDiv);
    // renderShirtImagesRowFour(firstDiv);
    // renderShirtImagesRowFive(firstDiv);
    // renderShirtImagesRowSix(firstDiv);
    originDiv.appendChild(firstDiv);
};

var renderShirtImagesRowOne = function(shrtDiv){
    var firstRowDiv = document.createElement("div");
    renderAlbertaShirt(firstRowDiv);
    renderLillianShirt(firstRowDiv);
    shrtDiv.appendChild(firstRowDiv);
    
};

var renderAlbertaShirt = function(frDiv){
    var imageRow1Div = document.createElement("div");
    imageRow1Div.setAttribute("id","tshirt");
    
    var frontText = document.createElement("div");
    frontText.classList.add("textCentered");
    frontText.innerHTML = "Alberta Bowman Norrell";
    imageRow1Div.appendChild(frontText);
    
    var frontImage = document.createElement("img");
    frontImage.setAttribute("src", "../images/Alberta Tee Shirt Design.jpeg");
    imageRow1Div.appendChild(frontImage);
    frDiv.appendChild(imageRow1Div);
};

var renderLillianShirt = function(firDiv){
    var imageRow1Div = document.createElement("div");
    imageRow1Div.setAttribute("id","tshirt");
    
    var frontText = document.createElement("div");
    frontText.classList.add("textCentered");
    frontText.innerHTML = "Lillian Conovia Bowman Funn";
    imageRow1Div.appendChild(frontText);
    
    var frontImage = document.createElement("img");
    frontImage.setAttribute("src", "../images/Lillian Tee Shirt Design.jpeg");
    imageRow1Div.appendChild(frontImage);
    firDiv.appendChild(imageRow1Div);
};

var renderShirtImagesRowTwo = function(shrtDiv){
    var firstRowDiv = document.createElement("div");
    renderAlbertaShirt(firstRowDiv);
    renderLillianShirt(firstRowDiv);
    shrtDiv.appendChild(firstRowDiv);
    
};


var renderShirtImagesRowThree = function(shrtDiv){
    var firstRowDiv = document.createElement("div");
    renderAlbertaShirt(firstRowDiv);
    renderLillianShirt(firstRowDiv);
    shrtDiv.appendChild(firstRowDiv);
    
};


var renderShirtImagesRowFour = function(shrtDiv){
    var firstRowDiv = document.createElement("div");
    renderAlbertaShirt(firstRowDiv);
    renderLillianShirt(firstRowDiv);
    shrtDiv.appendChild(firstRowDiv);
    
};

var renderShirtImagesRowFive = function(shrtDiv){
    var firstRowDiv = document.createElement("div");
    renderAlbertaShirt(firstRowDiv);
    renderLillianShirt(firstRowDiv);
    shrtDiv.appendChild(firstRowDiv);
    
};

var renderShirtImagesRowSix = function(shrtDiv){
    var firstRowDiv = document.createElement("div");
    renderAlbertaShirt(firstRowDiv);
    renderLillianShirt(firstRowDiv);
    shrtDiv.appendChild(firstRowDiv);
    
};






var renderGenShirtNews = function(){
    var shtDv = document.getElementById("tShirtNews");
    var normCost = document.createElement("h4");
    normCost.innerHTML = "Shirt sizes from small up to and including XXL can be purchased for 10 dollars ($10) each.";
    shtDv.appendChild(normCost);
    
    var biggerCost = document.createElement("h4");
    biggerCost.innerHTML = "Triple and Quadruple XL Shirts, however, can be purchased for 12 dollars ($12) each.";
    shtDv.appendChild(biggerCost);
    
    var ordering = document.createElement("h3");
    ordering.innerHTML = "You are not limited to order a specific shirt, you can order as many different shirts as you want.";
    shtDv.appendChild(ordering);
    
};

var genShirtStart = function(){
    clearStrgData();
    loadGeneralShirt();    
};

document.addEventListener("DOMContentLoaded",genShirtStart);