var smallCount = 0;
var smallTot = 0;
var mediumCount = 0;
var mediumTot = 0;
var largeCount = 0;
var largeTot = 0;
var xLCount = 0;
var xLTot = 0;
var xXLCount = 0;
var xXLTot = 0;
var xXXLCount = 0;
var xXXLTot = 0;
var xXXXLCount = 0;
var xXXXLTot = 0;
var regularTShirtCost = 10;
var largerTShirtCost = 12;


var infantCount = 0;
var infantCost = 0;
var infantTot = 0;
var childCount = 0;
var childCost = 10;
var childTot = 0;
var adultCount = 0;
var adultCost = 20;
var adultTot = 0;
var seniorCount = 0;
var seniorCost = 0;
var seniorTot = 0;

var shrtTot = 0;
var attTot = 0;
var shirtDu = 0;
var attDu = 0;

var admi = "";
var attendanceDB = new Firebase("https://bowmanfamreun.firebaseio.com/Attendees");
var shirtDB = new Firebase("https://bowmanfamreun.firebaseio.com/TShirt");
var feesDB = new Firebase("https://bowmanfamreun.firebaseio.com/Fees");


var getAdminist = function(){
    admi = localStorage.getItem("admin");
     if(admi == null){
      showAdminLoginScreen();
     }
};

var getShirtTotals = function(){
   shirtDB.orderByKey().on("value", function(snapshot){
     snapshot.forEach(function (child){
      var parDiv = document.getElementById("shirtRevenue");
      while(parDiv.firstChild)
          parDiv.removeChild(parDiv.firstChild);
       var shirtSm = child.val().small;
       var shirtMed = child.val().medium;
       var shirtLg = child.val().large;
       var shirtxLg = child.val().xL;
       var shirtXXL = child.val().xxLarge;
       var shirtXXXL = child.val().xxxLarge;
       var shirtXXXXL = child.val().xxxxLarge;
       
       var shirtSmall = parseInt(shirtSm ,10);
       var shirtMedium = parseInt(shirtMed,10);
       var shirtLarge = parseInt(shirtLg,10);
       var shirtXLarge = parseInt(shirtxLg,10);
       var shirtDoubleL = parseInt(shirtXXL,10);
       var shirtTripleXL = parseInt(shirtXXXL,10);
       var shirtQuadXL = parseInt(shirtXXXXL,10);
       
       updateSmallShirtTotal(shirtSmall);
       updateMediumShirtTotal(shirtMedium);
      updateLargeShirtTotal(shirtLarge);
      updateXLShirtTotal(shirtXLarge);
       updateXXLShirtTotal(shirtDoubleL);
       updateXXXLShirtTotal(shirtTripleXL);
       updateXXXXLShirtTotal(shirtQuadXL);
       updateShirtCosts();
      renderShirtTable();
     });
   });
};

var getAttendanceTotals = function(){
    attendanceDB.orderByKey().on("value", function(snapshot){
     snapshot.forEach(function (snap){
     var attDiv = document.getElementById("registrationExpense");
     while(attDiv.firstChild)
        attDiv.removeChild(attDiv.firstChild);
     var personAge = snap.val().age;
    getPersonAge(personAge);
    updateRegCosts();
    renderAttendanceTable();
      });
  });
};

var getMoneyReceived = function(){
    feesDB.orderByKey().on("value", function(snapshot){
     snapshot.forEach(function (snap){
     var monDiv = document.getElementById("moneyIntake");
     while(monDiv.firstChild)
        monDiv.removeChild(monDiv.firstChild);
     var personReg = snap.val().regPaid;
     var personShirt = snap.val().shirtPaid;
     var personRegD = snap.val().regDue;
     var personShirtD = snap.val().shirtDue;
     
     updateRegTot(personReg);
     updateRegDue(personRegD);
    updateShirtTot(personShirt);
    updateShirtDue(personShirtD);
    renderRevenueTable();
      });
  });
};


var getPersonAge = function(aPAge){
  if (aPAge == "Infant"){
      updateInfantCount();
  } else if(aPAge == "Child"){
      updateChildCount();
  } else if(aPAge == "Adult"){
      updateAdultCount();
  } else {
      updateSeniorCount();
  }
};

var updateSmallShirtTotal = function(smallOrder){
  smallCount += smallOrder;  
};

var updateSmallTotal = function(){
  smallTot = smallCount * regularTShirtCost;  
};

var updateMediumShirtTotal = function(mediumOrder){
  mediumCount +=mediumOrder;  
};

var updateMediumTotal = function(){
    mediumTot = mediumCount * regularTShirtCost;
};

var updateLargeShirtTotal = function(largeOrder){
  largeCount += largeOrder;  
};

var updateLargeTotal = function(){
  largeTot = largeCount * regularTShirtCost;  
};

var updateXLShirtTotal = function(xlOrder){
  xLCount += xlOrder;  
};

var updateXLTotal = function(){
  xLTot = xLCount * regularTShirtCost;  
};

var updateXXLShirtTotal = function(xxlOrder){
  xXLCount += xxlOrder;  
};

var updateXXLTotal = function(){
  xXLTot = xXLCount * regularTShirtCost;  
};

var updateXXXLShirtTotal = function(xxxlOrder){
  xXXLCount += xxxlOrder;  
};

var updateXXXLTotal = function(){
  xXXLTot = xXXLCount * largerTShirtCost;  
};

var updateXXXXLShirtTotal = function(xxxxlOrder){
  xXXXLCount += xxxxlOrder;  
};

var updateXXXXLTotal = function(){
  xXXXLTot = xXXXLCount * largerTShirtCost;  
};

var updateInfantCount = function(){
    infantCount +=1;
};

var updateInfantTotal = function(){
    infantTot = infantCount * infantCost;  
};

var updateChildCount = function(){
    childCount +=1;
};

var updateChildTotal = function(){
  childTot = childCount * childCost;  
};

var updateAdultCount = function(){
    adultCount +=1;  
};

var updateAdultTotal = function(){
    adultTot = adultCount * adultCost;  
};

var updateSeniorCount = function(){
    seniorCount +=1;  
};

var updateSeniorTotal = function(){
  seniorTot = seniorCount * seniorCost;  
};

var updateShirtTot = function(shtPad){
  shrtTot += shtPad;  
};

var updateRegTot = function(regPad){
  attTot += regPad;  
};

var updateRegDue = function(regisDe){
  attDu += regisDe;  
};

var updateShirtDue = function(shrDe){
  shirtDu += shrDe;  
};

var updateShirtCosts = function(){
  updateSmallTotal();
  updateMediumTotal();
  updateLargeTotal();
  updateXLTotal();
  updateXXLTotal();
  updateXXXLTotal();
  updateXXXXLTotal();
};

var updateRegCosts = function(){
    updateInfantTotal();
  updateChildTotal();
  updateAdultTotal();
  updateSeniorTotal();
};

// RENDERING THE SCREEN (VIEW)
var renderExpenseHead = function(){
  var expHead = document.getElementById("expenseHeader");
  var expTitle = document.createElement("h2");
  expTitle.innerHTML = "Expenses for the Bowman Family Reunion";
    expHead.appendChild(expTitle);
};

var renderShirtTable = function(){
  var shtTblSrc = document.getElementById("shirtRevenue");
  
  var shtDiv = document.createElement("div");
  
  var shtTblHead = document.createElement("h1");
  shtTblHead.innerHTML = "Shirt Revenue";
  shtDiv.appendChild(shtTblHead);
  
  var shtTbl = document.createElement("table");
  
    renderShirtKeyRow(shtTbl);
    renderSmallShirtRow(shtTbl);
    renderMediumShirtRow(shtTbl);
    renderLargeShirtRow(shtTbl);
    renderXLShirtRow(shtTbl);
    renderXXLShirtRow(shtTbl);
    renderXXXLShirtRow(shtTbl);
    renderXXXXLShirtRow(shtTbl);

    shtDiv.appendChild(shtTbl);
    shtTblSrc.appendChild(shtDiv);
};

var renderShirtKeyRow = function(shirtTbl){
    var shirtRow = document.createElement("tr");
    
    var itemName = document.createElement("td");
    itemName.innerHTML = "Size";
    shirtRow.appendChild(itemName);
    
    var shirtOrd = document.createElement("td");
    shirtOrd.innerHTML = "Quantity";
    shirtRow.appendChild(shirtOrd);
    
    var shirtIntake = document.createElement("td");
    shirtIntake.innerHTML = "Revenue";
    shirtRow.appendChild(shirtIntake);
    shirtTbl.appendChild(shirtRow);
    
};

var renderSmallShirtRow = function(shtTable){
    var smallRow = document.createElement("tr");
    
    var smallName = document.createElement("td");
    smallName.innerHTML = "Small";
    smallRow.appendChild(smallName);
    
    var smallQuant = document.createElement("td");
    smallQuant.innerHTML = smallCount;
    smallRow.appendChild(smallQuant);
    
    var smallRev = document.createElement("td");
    smallRev.innerHTML = smallTot;
    smallRow.appendChild(smallRev);
    shtTable.appendChild(smallRow);
};

var renderMediumShirtRow = function (shirtTabl){
    var mediumRow = document.createElement("tr");
    
    var mediumName = document.createElement("td");
    mediumName.innerHTML = "Medium";
    mediumRow.appendChild(mediumName);
    
    var mediumQuant = document.createElement("td");
    mediumQuant.innerHTML = mediumCount;
    mediumRow.appendChild(mediumQuant);
    
    var mediumRev = document.createElement("td");
    mediumRev.innerHTML = mediumTot;
    mediumRow.appendChild(mediumRev);
    shirtTabl.appendChild(mediumRow);
};

var renderLargeShirtRow = function(shrtTbl){
    var largeRow = document.createElement("tr");
    
    var largeName = document.createElement("td");
    largeName.innerHTML = "Large";
    largeRow.appendChild(largeName);
    
    var largeQuant = document.createElement("td");
    largeQuant.innerHTML = largeCount;
    largeRow.appendChild(largeQuant);
    
    var largeRev = document.createElement("td");
    largeRev.innerHTML = largeTot;
    largeRow.appendChild(largeRev);
    shrtTbl.appendChild(largeRow);
};

var renderXLShirtRow = function(shrtTbl){
    var xlargeRow = document.createElement("tr");
    
    var xlargeName = document.createElement("td");
    xlargeName.innerHTML = "XL";
    xlargeRow.appendChild(xlargeName);
    
    var xlargeQuant = document.createElement("td");
    xlargeQuant.innerHTML = xLCount;
    xlargeRow.appendChild(xlargeQuant);
    
    var xlargeRev = document.createElement("td");
    xlargeRev.innerHTML = xLTot;
    xlargeRow.appendChild(xlargeRev);
    shrtTbl.appendChild(xlargeRow);
};

var renderXXLShirtRow = function(siTae){
    var xXLRow = document.createElement("tr");
    
    var xXLName = document.createElement("td");
    xXLName.innerHTML = "XXL";
    xXLRow.appendChild(xXLName);
    
    var xXLQuant = document.createElement("td");
    xXLQuant.innerHTML = xXLCount;
    xXLRow.appendChild(xXLQuant);
    
    var xXLRev = document.createElement("td");
    xXLRev.innerHTML = xXLTot;
    xXLRow.appendChild(xXLRev);
    siTae.appendChild(xXLRow);
};

var renderXXXLShirtRow = function(siTae){
    var xXXLRow = document.createElement("tr");
    
    var xXXLName = document.createElement("td");
    xXXLName.innerHTML = "XXXL";
    xXXLRow.appendChild(xXXLName);
    
    var xXXLQuant = document.createElement("td");
    xXXLQuant.innerHTML = xXXLCount;
    xXXLRow.appendChild(xXXLQuant);
    
    var xXXLRev = document.createElement("td");
    xXXLRev.innerHTML = xXXLTot;
    xXXLRow.appendChild(xXXLRev);
    siTae.appendChild(xXXLRow);
};

var renderXXXXLShirtRow = function(siTae){
    var xXXXLRow = document.createElement("tr");
    
    var xXXXLName = document.createElement("td");
    xXXXLName.innerHTML = "XXXXL";
    xXXXLRow.appendChild(xXXXLName);
    
    var xXXXLQuant = document.createElement("td");
    xXXXLQuant.innerHTML = xXXXLCount;
    xXXXLRow.appendChild(xXXXLQuant);
    
    var xXXXLRev = document.createElement("td");
    xXXXLRev.innerHTML = xXXXLTot;
    xXXXLRow.appendChild(xXXXLRev);
    siTae.appendChild(xXXXLRow);
};

var renderAttendanceTable = function(){
  var attTblSrc = document.getElementById("registrationExpense");
  
  var revDiv = document.createElement("div");
  
  var revTblHead = document.createElement("h1");
  revTblHead.innerHTML = "Attendance Revenue";
  revDiv.appendChild(revTblHead);
  
  var attTbl = document.createElement("table");
    
    renderAttendanceKey(attTbl);
    renderInfantRow(attTbl);
    renderChildRow(attTbl);
    renderAdultRow(attTbl);
    renderSeniorRow(attTbl);
    
    revDiv.appendChild(attTbl);
    attTblSrc.appendChild(revDiv);
};

var renderAttendanceKey = function(attendTbl){
    var attendRow = document.createElement("tr");
    
    var attendName = document.createElement("td");
    attendName.innerHTML = "Age";
    attendRow.appendChild(attendName);
    
    var attendQuant = document.createElement("td");
    attendQuant.innerHTML = "Count";
    attendRow.appendChild(attendQuant);
    
    var attendRev = document.createElement("td");
    attendRev.innerHTML = "Revenue";
    attendRow.appendChild(attendRev);
    attendTbl.appendChild(attendRow);
};

var renderInfantRow = function(attndTbl){
    var infantRow = document.createElement("tr");
    
    var infantName = document.createElement("td");
    infantName.innerHTML = "Infant";
    infantRow.appendChild(infantName);
    
    var infantQuant = document.createElement("td");
    infantQuant.innerHTML = infantCount;
    infantRow.appendChild(infantQuant);
    
    var infantRev = document.createElement("td");
    infantRev.innerHTML = infantTot;
    infantRow.appendChild(infantRev);
    attndTbl.appendChild(infantRow);
};

var renderChildRow = function(atndTbl){
      var childRow = document.createElement("tr");
    
    var childName = document.createElement("td");
    childName.innerHTML = "Child";
    childRow.appendChild(childName);
    
    var childQuant = document.createElement("td");
    childQuant.innerHTML = childCount;
    childRow.appendChild(childQuant);
    
    var childRev = document.createElement("td");
    childRev.innerHTML = childTot;
    childRow.appendChild(childRev);
    atndTbl.appendChild(childRow);
};

var renderAdultRow = function(aTbl){
     var adultRow = document.createElement("tr");
    
    var adultName = document.createElement("td");
    adultName.innerHTML = "Adult";
    adultRow.appendChild(adultName);
    
    var adultQuant = document.createElement("td");
    adultQuant.innerHTML = adultCount;
    adultRow.appendChild(adultQuant);
    
    var adultRev = document.createElement("td");
    adultRev.innerHTML = adultTot;
    adultRow.appendChild(adultRev);
    aTbl.appendChild(adultRow);
};

var renderSeniorRow = function(attend){
    var seniorRow = document.createElement("tr");
    
    var seniorName = document.createElement("td");
    seniorName.innerHTML = "Senior";
    seniorRow.appendChild(seniorName);
    
    var seniorQuant = document.createElement("td");
    seniorQuant.innerHTML = seniorCount;
    seniorRow.appendChild(seniorQuant);
    
    var seniorRev = document.createElement("td");
    seniorRev.innerHTML = seniorTot;
    seniorRow.appendChild(seniorRev);
    attend.appendChild(seniorRow);
};

var renderRevenueTable = function(){
  var attTblSrc = document.getElementById("moneyIntake");
  
  var revDiv = document.createElement("div");
  
  var monTblHead = document.createElement("h1");
  monTblHead.innerHTML = "Money Received";
  revDiv.appendChild(monTblHead);
  
  var monTbl = document.createElement("table");
    
    renderMoneyKey(monTbl);
    renderAttendance(monTbl);
    renderShirt(monTbl);
    
    revDiv.appendChild(monTbl);
    attTblSrc.appendChild(revDiv);
};

var renderMoneyKey = function(mon){
    var seniorRow = document.createElement("tr");
    
    var seniorName = document.createElement("td");
    seniorName.innerHTML = "Category";
    seniorRow.appendChild(seniorName);
    
    var seniorQuant = document.createElement("td");
    seniorQuant.innerHTML = "Money Received";
    seniorRow.appendChild(seniorQuant);
    
    var seniorQuant = document.createElement("td");
    seniorQuant.innerHTML = "Money Due";
    seniorRow.appendChild(seniorQuant);
    
    mon.appendChild(seniorRow);
};

var renderAttendance = function(mny){
    var seniorRow = document.createElement("tr");
    
    var seniorName = document.createElement("td");
    seniorName.innerHTML = "Registration";
    seniorRow.appendChild(seniorName);
    
    var seniorQuant = document.createElement("td");
    seniorQuant.innerHTML = attTot;
    seniorRow.appendChild(seniorQuant);
    
    var seniorQuan = document.createElement("td");
    seniorQuan.innerHTML = attDu;
    seniorRow.appendChild(seniorQuan);
    
    mny.appendChild(seniorRow);
};

var renderShirt = function(mone){
    var seniorRow = document.createElement("tr");
    
    var seniorName = document.createElement("td");
    seniorName.innerHTML = "Shirt";
    seniorRow.appendChild(seniorName);
    
    var seniorQuant = document.createElement("td");
    seniorQuant.innerHTML = shrtTot;
    seniorRow.appendChild(seniorQuant);
    
    var senioQuan = document.createElement("td");
    senioQuan.innerHTML = shirtDu;
    seniorRow.appendChild(senioQuan);
    
    mone.appendChild(seniorRow);
};

var adminExpenseStart = function(){
    getAdminist();
    renderExpenseHead();
    getShirtTotals();
    getAttendanceTotals();
    getMoneyReceived();
};

document.addEventListener('DOMContentLoaded', adminExpenseStart);