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
    renderShirtImagesRowTwo(firstDiv);
    renderShirtImagesRowThree(firstDiv);
    renderShirtImagesRowFour(firstDiv);
    renderShirtImagesRowFive(firstDiv);
    originDiv.appendChild(firstDiv);
};

var renderShirtImagesRowOne = function(shrtDiv){
    var firstRowDiv = document.createElement("div");
    firstRowDiv.setAttribute("id","shirtRow");
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
    frontImage.setAttribute("src", "../images/Lillian Bowman Tee Shirt Design.png");
    imageRow1Div.appendChild(frontImage);
    firDiv.appendChild(imageRow1Div);
};

var renderShirtImagesRowTwo = function(shrtDiv){
    var secondRowDiv = document.createElement("div");
    // secondRowDiv.classList.add("shirtRow");
    renderEdnaShirt(secondRowDiv);
    renderElizabethShirt(secondRowDiv);
    shrtDiv.appendChild(secondRowDiv);
    
};

var renderEdnaShirt = function(frDiv){
    var imageRow1Div = document.createElement("div");
    imageRow1Div.setAttribute("id","tshirt");
    
    var frontText = document.createElement("div");
    frontText.classList.add("textCentered");
    frontText.innerHTML = "Florence Edna Bowman";
    imageRow1Div.appendChild(frontText);
    
    var frontImage = document.createElement("img");
    frontImage.setAttribute("src", "../images/Florence Edna Tee Shirt Design.png");
    imageRow1Div.appendChild(frontImage);
    frDiv.appendChild(imageRow1Div);
};

var renderElizabethShirt = function(firDiv){
    var imageRow1Div = document.createElement("div");
    imageRow1Div.setAttribute("id","tshirt");
    
    var frontText = document.createElement("div");
    frontText.classList.add("textCentered");
    frontText.innerHTML = "Elizabeth Bowman";
    imageRow1Div.appendChild(frontText);
    
    var frontImage = document.createElement("img");
    frontImage.setAttribute("src", "../images/Elizabeth Bowman Tee Shirt Design.png");
    imageRow1Div.appendChild(frontImage);
    firDiv.appendChild(imageRow1Div);
};

var renderShirtImagesRowThree = function(shrtDiv){
    var firstRowDiv = document.createElement("div");
    renderMaryLueShirt(firstRowDiv);
    renderDulceniaShirt(firstRowDiv);
    shrtDiv.appendChild(firstRowDiv);
    
};

var renderMaryLueShirt = function(frDiv){
    var imageRow1Div = document.createElement("div");
    imageRow1Div.setAttribute("id","tshirt");
    
    var frontText = document.createElement("div");
    frontText.classList.add("textCentered");
    frontText.innerHTML = "MaryLue Estelle Bowman Moorer";
    imageRow1Div.appendChild(frontText);
    
    var frontImage = document.createElement("img");
    frontImage.setAttribute("src", "../images/Marylue Tee Shirt Design.jpeg");
    imageRow1Div.appendChild(frontImage);
    frDiv.appendChild(imageRow1Div);
};

var renderDulceniaShirt = function(firDiv){
    var imageRow1Div = document.createElement("div");
    imageRow1Div.setAttribute("id","tshirt");
    
    var frontText = document.createElement("div");
    frontText.classList.add("textCentered");
    frontText.innerHTML = "Dulcenia Bowman";
    imageRow1Div.appendChild(frontText);
    
    var frontImage = document.createElement("img");
    frontImage.setAttribute("src", "../images/Dulcenia Bowman Tee Shirt Design.png");
    imageRow1Div.appendChild(frontImage);
    firDiv.appendChild(imageRow1Div);
};
var renderShirtImagesRowFour = function(shrtDiv){
    var firstRowDiv = document.createElement("div");
    renderIreneShirt(firstRowDiv);
    renderJimmyShirt(firstRowDiv);
    shrtDiv.appendChild(firstRowDiv);
    
};

var renderIreneShirt = function(frDiv){
    var imageRow1Div = document.createElement("div");
    imageRow1Div.setAttribute("id","tshirt");
    
    var frontText = document.createElement("div");
    frontText.classList.add("textCentered");
    frontText.innerHTML = "Irene Bowman ";
    imageRow1Div.appendChild(frontText);
    
    var frontImage = document.createElement("img");
    frontImage.setAttribute("src", "../images/Irene Bowman Tee Shirt Design.png");
    imageRow1Div.appendChild(frontImage);
    frDiv.appendChild(imageRow1Div);
};

var renderJimmyShirt = function(firDiv){
    var imageRow1Div = document.createElement("div");
    imageRow1Div.setAttribute("id","tshirt");
    
    var frontText = document.createElement("div");
    frontText.classList.add("textCentered");
    frontText.innerHTML = "Jimmy Bowman ";
    imageRow1Div.appendChild(frontText);
    
    var frontImage = document.createElement("img");
    frontImage.setAttribute("src", "../images/Jimmie Bowman Tee Shirt Design.png");
    imageRow1Div.appendChild(frontImage);
    firDiv.appendChild(imageRow1Div);
};
var renderShirtImagesRowFive = function(shrtDiv){
    var firstRowDiv = document.createElement("div");
    renderWardellShirt(firstRowDiv);
    renderCommemorativeShirt(firstRowDiv);
    shrtDiv.appendChild(firstRowDiv);
    
};

var renderWardellShirt = function(frDiv){
    var imageRow1Div = document.createElement("div");
    imageRow1Div.setAttribute("id","tshirt");
    
    var frontText = document.createElement("div");
    frontText.classList.add("textCentered");
    frontText.innerHTML = "Blaine Wardell Bowman";
    imageRow1Div.appendChild(frontText);
    
    var frontImage = document.createElement("img");
    frontImage.setAttribute("src", "../images/Blaine Bowman Tee Shirt Design.png");
    imageRow1Div.appendChild(frontImage);
    frDiv.appendChild(imageRow1Div);
};

var renderCommemorativeShirt = function(firDiv){
    var imageRow1Div = document.createElement("div");
    imageRow1Div.setAttribute("id","tshirt");
    
    var frontText = document.createElement("div");
    frontText.classList.add("textCentered");
    frontText.innerHTML = "Commemorative Shirt ";
    imageRow1Div.appendChild(frontText);
    
    var frontImage = document.createElement("img");
    frontImage.setAttribute("src", "../images/Commemorative Tee Shirt Design.jpeg");
    imageRow1Div.appendChild(frontImage);
    firDiv.appendChild(imageRow1Div);
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