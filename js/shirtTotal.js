var smallShirtTotal=0;
var mediumShirtTotal=0;
var largeShirtTotal=0;
var doubXLShirtTotal=0;
var shirtTotal = 0;
var shirtDB = new Firebase("https://bowmanfamreun.firebaseio.com/TShirt");


var updateSmallCount = function(sm){
  smallShirtTotal +=sm;  
};

var updateMediumCount = function(med){
  mediumShirtTotal +=med;  
};

var updateLargeCount = function(lg){
  largeShirtTotal += lg;  
};

var updateXXLShirtCount = function(xxl){
  doubXLShirtTotal += xxl;  
};

var setShirtTotal = function(){
    shirtTotal = smallShirtTotal + mediumShirtTotal + largeShirtTotal + doubXLShirtTotal;
}

var getShirtCount = function(){
  
};


// RENDERING THE SCREEN (VIEW)
var renderShirtOrderHeader = function(){
    
};

var renderShirtTotal = function(){
    
};

var renderSmallShirtTotal = function(){
    
};

var renderMediumShirtTotal = function(){
    
};

var renderLargeShirtTotal = function(){
    
};

var renderXXLargeShirtTotal = function(){
    
};

var renderShirtTotalButtons = function(){
    
};

var shirtStart = function(){
    
};

document.addEventListener('DOMContentLoaded',shirtStart);