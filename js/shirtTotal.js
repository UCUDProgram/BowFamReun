var administ = "";
var smallShirtTotal=0;
var mediumShirtTotal=0;
var lgShirtTotal=0;
var doubXLShirtTotal=0;
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
  // console.log(lgShirtTotal);
};

var updateXXLShirtCount = function(xxl){
  doubXLShirtTotal += xxl;  
};

var setShirtTotal = function(){
    shirtTotal = smallShirtTotal + mediumShirtTotal + lgShirtTotal + doubXLShirtTotal;
}

var getShirtCount = function(){
   shirtDB.orderByKey().on("value", function(snapshot){
     snapshot.forEach(function (child){
       var parDiv = document.getElementById("shirtTotals");
      while(parDiv.firstChild)
          parDiv.removeChild(parDiv.firstChild);
      // console.log(child.val());
       var shSm = child.val().small;
       var shMed = child.val().medium;
       var shLg = child.val().large;
       var shXXL = child.val().xxLarge;
       
       var shirtSmall = parseInt(shSm,10);
       var shirtMedium = parseInt(shMed,10);
       var shirtLarge = parseInt(shLg,10);
       var shirtXXL = parseInt(shXXL,10);
      // console.log(sma);
      // console.log(medi);
      // console.log(shLg);
      // console.log(shirtLarge);

      // console.log(xXLa);
       
       updateSmallCount(shirtSmall);
       updateMediumCount(shirtMedium);
      updateLargeCount(shirtLarge);
      // updateLargeCount(shLg);
       updateXXLShirtCount(shirtXXL);
       renderShirtTotal();
     });
   });
  // console.log(smallShirtTotal);
  // console.log(mediumShirtTotal);
  // console.log(lgShirtTotal);
  // console.log(doubXLShirtTotal);
  // renderShirtTotal();
};

var updateCount = function(){
  // getShirtCount();
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
    // console.log(lgShirtTotal);
    
    var xxlTot = document.createElement("h3");
    xxlTot.innerHTML = "Double Extra Large Shirts Ordered: " + doubXLShirtTotal;
    shirtDiv.appendChild(xxlTot);
};

var shirtStart = function(){
    getAdmUser();
    getShirtCount();
    renderShirtOrderHeader();
    // updateCount();
    // renderShirtTotal();
    // renderShirtPage();
};
// document.addEventListener("load",shirtStart);
// document.addEventListener('DOMWindowCreated',shirtStart);
document.addEventListener('DOMContentLoaded',shirtStart);
// document.getElementById("body").addEventListener('DOMContentLoaded',shirtStart);

