var administ = "";
var smallShirtTotal=0;
var mediumShirtTotal=0;
var lgShirtTotal=0;
var xLGShirtTotal = 0;
var doubXLShirtTotal=0;
var tripXLShirtTotal = 0;
var quadXLShirtTotal = 0;
var shirtTotal = 0;
var shirtDB = new Firebase("https://bowmanfamreun.firebaseio.com/TShirt");

var getAdmUser = function(){
    administ = localStorage.getItem("admin");
     if(administ == null){
      showAdminLoginScreen();
     }
};

var updateSmallCount = function(sm){
  smallShirtTotal += sm;  
};

var updateMediumCount = function(med){
  mediumShirtTotal += med;  
};

var updateLargeCount = function(lg){
  lgShirtTotal += lg;  
};

var updateXLCount = function(xlg){
  xLGShirtTotal += xlg;  
};

var updateXXLShirtCount = function(xxl){
  doubXLShirtTotal += xxl;  
};

var updateXXXLShirtCount = function(xxxl){
    tripXLShirtTotal += xxxl;
}

var updateXXXXLShirtCount = function(xxxxl){
  quadXLShirtTotal += xxxxl;  
};

var updateShirtTotal = function(aShOrder){
    shirtTotal += aShOrder;
}

var getShirtCount = function(){
   shirtDB.orderByKey().on("value", function(snapshot){
     snapshot.forEach(function (child){
       var parDiv = document.getElementById("shirtTotals");
      while(parDiv.firstChild)
          parDiv.removeChild(parDiv.firstChild);
       var shSm = child.val().small;
       var shMed = child.val().medium;
       var shLg = child.val().large;
       var shXL = child.val().xL;
       var shXXL = child.val().xxLarge;
       var shXXXL = child.val().xxxLarge;
       var shXXXXL = child.val().xxxxLarge;
       
       var shirtSmall = parseInt(shSm,10);
       var shirtMedium = parseInt(shMed,10);
       var shirtLarge = parseInt(shLg,10);
       var shirtXL = parseInt(shXL, 10);
       var shirtXXL = parseInt(shXXL,10);
       var shirtXXXL = parseInt(shXXXL,10);
       var shirtXXXXL = parseInt(shXXXXL,10);
       
       updateSmallCount(shirtSmall);
       updateShirtTotal(shirtSmall);
       updateMediumCount(shirtMedium);
       updateShirtTotal(shirtMedium);
        updateLargeCount(shirtLarge);
        updateShirtTotal(shirtLarge);   
       updateXLCount(shirtXL);
       updateShirtTotal(shirtXL);
       updateXXLShirtCount(shirtXXL);
       updateShirtTotal(shirtXXL);
       updateXXXLShirtCount(shirtXXXL);
       updateShirtTotal(shirtXXXL);
       updateXXXXLShirtCount(shirtXXXXL);
       updateShirtTotal(shirtXXXXL);
       renderShirtTotal();
     });
   });
};

var updateCount = function(){
  renderShirtTotal();
};


// RENDERING THE SCREEN (VIEW)
var renderShirtPage = function(){
  renderShirtOrderHeader();
  renderShirtTotal();
};

var renderShirtOrderHeader = function(){
    var ordHead = document.getElementById("shirtHead");
    var ordTitle = document.createElement("h1");
    ordTitle.innerHTML = "T-Shirt Totals";
    ordHead.appendChild(ordTitle);
};

var renderShirtTotal = function(){
    var shirtDiv = document.getElementById("shirtTotals");
    
    var smallTot = document.createElement("h3");
    smallTot.innerHTML = "Total Small Shirts Ordered: " + smallShirtTotal;
    shirtDiv.appendChild(smallTot);
    
    var medTot = document.createElement("h3");
    medTot.innerHTML = "Total Medium Shirts Ordered: " + mediumShirtTotal;
    shirtDiv.appendChild(medTot);
    
    var larTot = document.createElement("h3");
    larTot.innerHTML = "Total Large Shirts Ordered: " + lgShirtTotal;
    shirtDiv.appendChild(larTot);

    var xlarTot = document.createElement("h3");
    xlarTot.innerHTML = "Total Extra Large Shirts Ordered: " + xLGShirtTotal;
    shirtDiv.appendChild(xlarTot);
    
    var xxlTot = document.createElement("h3");
    xxlTot.innerHTML = "Double Extra Large Shirts Ordered: " + doubXLShirtTotal;
    shirtDiv.appendChild(xxlTot);
    
    var xxxlTot = document.createElement("h3");
    xxxlTot.innerHTML = "Triple Extra Large Shirts Ordered: " + tripXLShirtTotal;
    shirtDiv.appendChild(xxxlTot);
    
    var xxxxlTot = document.createElement("h3");
    xxxxlTot.innerHTML = "Quadruple Extra Large Shirts Ordered: " + quadXLShirtTotal;
    shirtDiv.appendChild(xxxxlTot);
    
    var tot = document.createElement("h3");
    tot.innerHTML = "Total confirmed to Order: " + shirtTotal;
    shirtDiv.appendChild(tot);
};

var shirtStart = function(){
    getAdmUser();
    getShirtCount();
    renderShirtOrderHeader();
};

document.addEventListener('DOMContentLoaded',shirtStart);