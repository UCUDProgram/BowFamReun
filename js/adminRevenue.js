var albertaRegShirt = 0;
var albertaBiggerShirt = 0;

var lillianRegShirt = 0;
var lillianBiggerShirt = 0;

var elizabethRegShirt = 0;
var elizabethBiggerShirt = 0;

var maryLueRegShirt = 0;
var maryLueBiggerShirt = 0;

var ednaRegShirt = 0;
var ednaBiggerShirt = 0;

var dulceniaRegShirt = 0;
var dulceniaBiggerShirt = 0;

var ireneRegShirt = 0;
var ireneBiggerShirt =0;

var jimmieRegShirt = 0;
var jimmieBiggerShirt = 0;

var wardellRegShirt = 0;
var wardellBiggerShirt = 0;

var commemorativeRegShirt = 0;
var commemorativeBiggerShirt = 0;

var regularShirt = 0;
var largerShirt = 0;


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
    // if(admi != "LawAdmin"){
    //     alert("This website is in Archive mode. Your account has been permanently disabled.");
    //     showHomePageScreen();
    // }
};

var getShirtTotals = function(){
    shirtDB.orderByKey().on("value", function(snapshot){
        snapshot.forEach(function (child){
            var parDiv = document.getElementById("shirtRevenue");
            while(parDiv.firstChild)
                parDiv.removeChild(parDiv.firstChild);
            var chNam = child.val().childName;
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
            var shirtDoubleXL = parseInt(shirtXXL,10);
            var shirtTripleXL = parseInt(shirtXXXL,10);
            var shirtQuadXL = parseInt(shirtXXXXL,10);
       
            var regOrder = +shirtSmall + +shirtMedium + +shirtLarge + +shirtXLarge + +shirtDoubleXL;
            var largerOrder = +shirtTripleXL + +shirtQuadXL;
           
           if (chNam != undefined){
               if (chNam == "Alberta"){
                   updateAlbertaRegCount(regOrder);
                   updateAlbertaLarCount(largerOrder);
               }
               if (chNam == "Lillian"){
                   updateLillianRegCount(regOrder);
                   updateLillianLarCount(largerOrder);
               }
               if (chNam == "Elizabeth"){
                   updateElizabethRegCount(regOrder);
                   updateElizabethLarCount(largerOrder);
               }
               if (chNam == "Marylue"){
                   updateMaryLueRegCount(regOrder);
                   updateMaryLueLarCount(largerOrder);
               }
               if (chNam == "Edna"){
                   updateEdnaRegCount(regOrder);
                   updateEdnaLarCount(largerOrder);
               }
               if (chNam == "Dulcenia"){
                   updateDulceniaRegCount(regOrder);
                   updateDulceniaLarCount(largerOrder);
               }
               if (chNam == "Irene"){
                   updateIreneRegCount(regOrder);
                   updateIreneLarCount(largerOrder);
               }
               if (chNam == "Jimmy"){
                   updateJimmieRegCount(regOrder);
                   updateJimmieLarCount(largerOrder);
               }
               if (chNam == "Wardell"){
                   updateWardellRegCount(regOrder);
                   updateWardellLarCount(largerOrder);
               }
               if (chNam == "Commemorative"){
                   updateCommemorativeRegCount(regOrder);
                   updateCommemorativeLarCount(largerOrder);
               }
               updateRegCount(regOrder);
               updateLargerCount(largerOrder);
           }
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

var updateAlbertaRegCount = function(alReTo){
    albertaRegShirt += alReTo;    
};

var updateAlbertaLarCount = function (alLaTo){
    albertaBiggerShirt += alLaTo;
};

var updateLillianRegCount = function(liReTo){
    lillianRegShirt += liReTo;  
};

var updateLillianLarCount = function(liLaTo){
    lillianBiggerShirt += liLaTo;
};

var updateElizabethRegCount = function(elReTo){
    elizabethRegShirt += elReTo;  
};

var updateElizabethLarCount = function(elLaTo){
    elizabethBiggerShirt += elLaTo;
};

var updateMaryLueRegCount = function(mlReTo){
   maryLueRegShirt += mlReTo; 
};

var updateMaryLueLarCount = function(mlLaTo){
    maryLueBiggerShirt += mlLaTo;
};

var updateEdnaRegCount = function(edReTo){
    ednaRegShirt += edReTo;
};

var updateEdnaLarCount = function(edlaTo){
    ednaBiggerShirt += edlaTo;
};

var updateDulceniaRegCount = function(duReTo){
    dulceniaRegShirt += duReTo;
};

var updateDulceniaLarCount = function(dulaTo){
    dulceniaBiggerShirt += dulaTo;
};

var updateIreneRegCount = function(irReTo){
    ireneRegShirt += irReTo;  
};

var updateIreneLarCount = function(irlaTo){
    ireneBiggerShirt += irlaTo;
};

var updateJimmieRegCount = function(jiReTo){
    jimmieRegShirt += jiReTo;
};

var updateJimmieLarCount = function(jilaTo){
    jimmieBiggerShirt += jilaTo;
};

var updateWardellRegCount = function(waReTo){
    wardellRegShirt += waReTo;
};

var updateWardellLarCount = function(walaTo){
    wardellBiggerShirt += walaTo;
};

var updateCommemorativeRegCount = function(coReTo){
    commemorativeRegShirt += coReTo;  
};

var updateCommemorativeLarCount = function(colaTo){
    commemorativeBiggerShirt += colaTo;
};

var updateRegCount = function(reTo){
    regularShirt += reTo;
};

var updateLargerCount = function(laTo){
    largerShirt += laTo;
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

var updateRegCosts = function(){
    updateInfantTotal();
    updateChildTotal();
    updateAdultTotal();
    updateSeniorTotal();
};

// RENDERING THE SCREEN (VIEW)
var renderRevenueHead = function(){
    var revHead = document.getElementById("revenueHeader");
    var revTitle = document.createElement("h2");
    revTitle.innerHTML = "Revenue for the Bowman Family Reunion";
    revHead.appendChild(revTitle);
};

var renderShirtTable = function(){
    var shtTblSrc = document.getElementById("shirtRevenue");
  
    var shtDiv = document.createElement("div");
  
    var shtTblHead = document.createElement("h1");
    shtTblHead.innerHTML = "Shirt Revenue";
    shtDiv.appendChild(shtTblHead);
  
    var shtTbl = document.createElement("table");
  
    renderShirtKeyRow(shtTbl);
    renderAlbertaShirtTotalRow(shtTbl);
    renderLillianShirtTotalRow(shtTbl);
    renderElizabethShirtTotalRow(shtTbl);
    renderMaryLueShirtTotalRow(shtTbl);
    renderEdnaShirtTotalRow(shtTbl);
    renderDulceniaShirtTotalRow(shtTbl);
    renderIreneShirtTotalRow(shtTbl);
    renderJimmieShirtTotalRow(shtTbl);
    renderWardellShirtTotalRow(shtTbl);
    renderCommemorativeShirtTotalRow(shtTbl);
    renderShirtTotalRow(shtTbl);

    shtDiv.appendChild(shtTbl);
    shtTblSrc.appendChild(shtDiv);
};

var renderShirtKeyRow = function(shirtTbl){
    var shirtRow = document.createElement("tr");
    
    var itemName = document.createElement("td");
    itemName.innerHTML = "Child Name";
    shirtRow.appendChild(itemName);
    
    var regShirtOrd = document.createElement("td");
    regShirtOrd.innerHTML = "Regular Shirt Revenue (Sm - XXL)";
    shirtRow.appendChild(regShirtOrd);
    
    
    var shirtOrd = document.createElement("td");
    shirtOrd.innerHTML = "Larger Shirt Revenue (XXXL - XXXXL)";
    shirtRow.appendChild(shirtOrd);
    
    var shirtIntake = document.createElement("td");
    shirtIntake.innerHTML = "Total Shirt Revenue";
    shirtRow.appendChild(shirtIntake);
    shirtTbl.appendChild(shirtRow);
};

var renderAlbertaShirtTotalRow = function(shtTable){
    var albertaRegTotal = albertaRegShirt * regularTShirtCost;
    var albertaBigTotal = albertaBiggerShirt * largerTShirtCost;
    var albertaRev = albertaRegTotal + albertaBigTotal;
    var smallRow = document.createElement("tr");
    
    var albertaName = document.createElement("td");
    albertaName.innerHTML = "Alberta";
    smallRow.appendChild(albertaName);
    
    var smallName = document.createElement("td");
    smallName.innerHTML = "$" + albertaRegTotal;
    smallRow.appendChild(smallName);
    
    var smallQuant = document.createElement("td");
    smallQuant.innerHTML = "$" + albertaBigTotal;;
    smallRow.appendChild(smallQuant);
    
    var smallRev = document.createElement("td");
    smallRev.innerHTML = "$" + albertaRev;
    smallRow.appendChild(smallRev);
    shtTable.appendChild(smallRow);
};

var renderLillianShirtTotalRow = function (shirtTabl){
    var lillianRegTotal = lillianRegShirt * regularTShirtCost;
    var lillianBigTotal = lillianBiggerShirt * largerTShirtCost;
    var lillianRev = lillianRegTotal + lillianBigTotal;
    
    var mediumRow = document.createElement("tr");
    
    var lillianName = document.createElement("td");
    lillianName.innerHTML = "Lillian";
    mediumRow.appendChild(lillianName);
    
    var mediumName = document.createElement("td");
    mediumName.innerHTML = "$" +lillianRegTotal;
    mediumRow.appendChild(mediumName);
    
    var mediumQuant = document.createElement("td");
    mediumQuant.innerHTML = "$" + lillianBigTotal;
    mediumRow.appendChild(mediumQuant);
    
    var mediumRev = document.createElement("td");
    mediumRev.innerHTML = "$" + lillianRev;
    mediumRow.appendChild(mediumRev);
    shirtTabl.appendChild(mediumRow);
};

var renderElizabethShirtTotalRow = function(shrtTbl){
    var elizabethRegTotal = elizabethRegShirt * regularTShirtCost;
    var elizabethBigTotal = elizabethBiggerShirt * largerTShirtCost;
    var elizabethRev = elizabethRegTotal + elizabethBigTotal;
    
    var largeRow = document.createElement("tr");
    
    var elizabethName = document.createElement("td");
    elizabethName.innerHTML = "Elizabeth";
    largeRow.appendChild(elizabethName);
    
    var largeName = document.createElement("td");
    largeName.innerHTML = "$" + elizabethRegTotal;
    largeRow.appendChild(largeName);
    
    var largeQuant = document.createElement("td");
    largeQuant.innerHTML = "$" + elizabethBigTotal;
    largeRow.appendChild(largeQuant);
    
    var largeRev = document.createElement("td");
    largeRev.innerHTML = "$"+ elizabethRev;
    largeRow.appendChild(largeRev);
    shrtTbl.appendChild(largeRow);
};

var renderMaryLueShirtTotalRow = function(shrtTbl){
    var maryLueRegTotal = maryLueRegShirt * regularTShirtCost;
    var maryLueBigTotal = maryLueBiggerShirt * largerTShirtCost;
    var maryLueRev = maryLueRegTotal + maryLueBigTotal;
    
    var xlargeRow = document.createElement("tr");
    
    var maryLueName = document.createElement("td");
    maryLueName.innerHTML = "MaryLue";
    xlargeRow.appendChild(maryLueName);
    
    var xlargeName = document.createElement("td");
    xlargeName.innerHTML = "$"+ maryLueRegTotal;
    xlargeRow.appendChild(xlargeName);
    
    var xlargeQuant = document.createElement("td");
    xlargeQuant.innerHTML = "$" + maryLueBigTotal;
    xlargeRow.appendChild(xlargeQuant);
    
    var xlargeRev = document.createElement("td");
    xlargeRev.innerHTML = "$" + maryLueRev;
    xlargeRow.appendChild(xlargeRev);
    shrtTbl.appendChild(xlargeRow);
};

var renderEdnaShirtTotalRow = function(siTae){
    var ednaRegTotal = ednaRegShirt * regularTShirtCost;
    var ednaBigTotal = ednaBiggerShirt * largerTShirtCost;
    var ednaRev = ednaRegTotal + ednaBigTotal;
    
    var xXLRow = document.createElement("tr");
    
    var ednaName = document.createElement("td");
    ednaName.innerHTML = "Edna";
    xXLRow.appendChild(ednaName);
    
    var xXLName = document.createElement("td");
    xXLName.innerHTML = "$" + ednaRegTotal;
    xXLRow.appendChild(xXLName);
    
    var xXLQuant = document.createElement("td");
    xXLQuant.innerHTML = "$" + ednaBigTotal;
    xXLRow.appendChild(xXLQuant);
    
    var xXLRev = document.createElement("td");
    xXLRev.innerHTML = "$" + ednaRev;
    xXLRow.appendChild(xXLRev);
    siTae.appendChild(xXLRow);
};

var renderDulceniaShirtTotalRow = function(siTae){
    var dulceniaRegTotal = dulceniaRegShirt * regularTShirtCost;
    var dulceniaBigTotal = dulceniaBiggerShirt * largerTShirtCost;
    var dulceniaRev = dulceniaRegTotal + dulceniaBigTotal;
    
    var xXXLRow = document.createElement("tr");
    
    var dulceniaName = document.createElement("td");
    dulceniaName.innerHTML = "Dulcenia";
    xXXLRow.appendChild(dulceniaName);
    
    var xXXLName = document.createElement("td");
    xXXLName.innerHTML = "$" + dulceniaRegTotal;
    xXXLRow.appendChild(xXXLName);
    
    var xXXLQuant = document.createElement("td");
    xXXLQuant.innerHTML = "$" + dulceniaBigTotal;
    xXXLRow.appendChild(xXXLQuant);
    
    var xXXLRev = document.createElement("td");
    xXXLRev.innerHTML = "$" + dulceniaRev;
    xXXLRow.appendChild(xXXLRev);
    siTae.appendChild(xXXLRow);
};

var renderIreneShirtTotalRow = function(siTae){
    var ireneRegTotal = ireneRegShirt * regularTShirtCost;
    var ireneBigTotal = ireneBiggerShirt * largerTShirtCost;
    var ireneRev = ireneRegTotal + ireneBigTotal;
    var xXXXLRow = document.createElement("tr");
    
    var ireneName = document.createElement("td");
    ireneName.innerHTML = "Irene";
    xXXXLRow.appendChild(ireneName);
    
    var xXXXLName = document.createElement("td");
    xXXXLName.innerHTML = "$" + ireneRegTotal;
    xXXXLRow.appendChild(xXXXLName);
    
    var xXXXLQuant = document.createElement("td");
    xXXXLQuant.innerHTML = "$" + ireneBigTotal;
    xXXXLRow.appendChild(xXXXLQuant);
    
    var xXXXLRev = document.createElement("td");
    xXXXLRev.innerHTML = "$" + ireneRev;
    xXXXLRow.appendChild(xXXXLRev);
    siTae.appendChild(xXXXLRow);
};

var renderJimmieShirtTotalRow = function(siTae){
    var jimmieRegTotal = jimmieRegShirt * regularTShirtCost;
    var jimmieBigTotal = jimmieBiggerShirt * largerTShirtCost;
    var jimmieRev = jimmieRegTotal + jimmieBigTotal;
    var xXXXLRow = document.createElement("tr");
    
    var jimmieName = document.createElement("td");
    jimmieName.innerHTML = "Jimmie";
    xXXXLRow.appendChild(jimmieName);
    
    var xXXXLName = document.createElement("td");
    xXXXLName.innerHTML = "$" + jimmieRegTotal;
    xXXXLRow.appendChild(xXXXLName);
    
    var xXXXLQuant = document.createElement("td");
    xXXXLQuant.innerHTML = "$" + jimmieBigTotal;
    xXXXLRow.appendChild(xXXXLQuant);
    
    var xXXXLRev = document.createElement("td");
    xXXXLRev.innerHTML = "$" + jimmieRev;
    xXXXLRow.appendChild(xXXXLRev);
    siTae.appendChild(xXXXLRow);
};

var renderWardellShirtTotalRow = function(siTae){
    var wardellRegTotal = wardellRegShirt * regularTShirtCost;
    var wardellBigTotal = wardellBiggerShirt * largerTShirtCost;
    var wardellRev = wardellRegTotal + wardellBigTotal;
    var xXXXLRow = document.createElement("tr");
    
    var wardellName = document.createElement("td");
    wardellName.innerHTML = "Wardell";
    xXXXLRow.appendChild(wardellName);
    
    var xXXXLName = document.createElement("td");
    xXXXLName.innerHTML = "$" + wardellRegTotal;
    xXXXLRow.appendChild(xXXXLName);
    
    var xXXXLQuant = document.createElement("td");
    xXXXLQuant.innerHTML = "$" + wardellBigTotal;
    xXXXLRow.appendChild(xXXXLQuant);
    
    var xXXXLRev = document.createElement("td");
    xXXXLRev.innerHTML = "$" + wardellRev;
    xXXXLRow.appendChild(xXXXLRev);
    siTae.appendChild(xXXXLRow);
};

var renderCommemorativeShirtTotalRow = function(siTae){
    var commemorativeRegTotal = commemorativeRegShirt * regularTShirtCost;
    var commemorativeBigTotal = commemorativeBiggerShirt * largerTShirtCost;
    var commemorativeRev = commemorativeRegTotal + commemorativeBigTotal;
    
    var xXXXLRow = document.createElement("tr");
    
    var commemorativeName = document.createElement("td");
    commemorativeName.innerHTML = "Commemorative";
    xXXXLRow.appendChild(commemorativeName);
    
    var xXXXLName = document.createElement("td");
    xXXXLName.innerHTML = "$" + commemorativeRegTotal;
    xXXXLRow.appendChild(xXXXLName);
    
    var xXXXLQuant = document.createElement("td");
    xXXXLQuant.innerHTML = "$" + commemorativeBigTotal;
    xXXXLRow.appendChild(xXXXLQuant);
    
    var xXXXLRev = document.createElement("td");
    xXXXLRev.innerHTML = "$" + commemorativeRev;
    xXXXLRow.appendChild(xXXXLRev);
    siTae.appendChild(xXXXLRow);
};

var renderShirtTotalRow = function(siTae){
    var regTotal = regularShirt * regularTShirtCost;
    var bigTotal = largerShirt * largerTShirtCost;
    var shirtRev = regTotal + bigTotal;
    
    var xXXXLRow = document.createElement("tr");
    
    var shirtName = document.createElement("td");
    shirtName.innerHTML = "Totals";
    xXXXLRow.appendChild(shirtName);
    
    var xXXXLName = document.createElement("td");
    xXXXLName.innerHTML = "$" + regTotal;
    xXXXLRow.appendChild(xXXXLName);
    
    var xXXXLQuant = document.createElement("td");
    xXXXLQuant.innerHTML = "$" + bigTotal;
    xXXXLRow.appendChild(xXXXLQuant);
    
    var xXXXLRev = document.createElement("td");
    xXXXLRev.innerHTML = "$" + shirtRev;
    xXXXLRow.appendChild(xXXXLRev);
    siTae.appendChild(xXXXLRow);
};

var renderAttendanceTable = function(){
    var attTblSrc = document.getElementById("registrationRevenue");
  
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
    var moneyKeyRow = document.createElement("tr");
    
    var moneyCat = document.createElement("td");
    moneyCat.innerHTML = "Category";
    moneyKeyRow.appendChild(moneyCat);
    
    var moneyRec = document.createElement("td");
    moneyRec.innerHTML = "Money Received";
    moneyKeyRow.appendChild(moneyRec);
    
    var moneyDue = document.createElement("td");
    moneyDue.innerHTML = "Money Due";
    moneyKeyRow.appendChild(moneyDue);
    
    mon.appendChild(moneyKeyRow);
};

var renderAttendance = function(mny){
    var regRow = document.createElement("tr");
    
    var regName = document.createElement("td");
    regName.innerHTML = "Registration";
    regRow.appendChild(regName);
    
    var regRec = document.createElement("td");
    regRec.innerHTML = attTot;
    regRow.appendChild(regRec);
    
    var registDue = document.createElement("td");
    registDue.innerHTML = attDu;
    regRow.appendChild(registDue);
    
    mny.appendChild(regRow);
};

var renderShirt = function(mone){
    var shirtRow = document.createElement("tr");
    
    var shirtName = document.createElement("td");
    shirtName.innerHTML = "Shirt";
    shirtRow.appendChild(shirtName);
    
    var shirtRec = document.createElement("td");
    shirtRec.innerHTML = shrtTot;
    shirtRow.appendChild(shirtRec);
    
    var shirtD = document.createElement("td");
    shirtD.innerHTML = shirtDu;
    shirtRow.appendChild(shirtD);
    
    mone.appendChild(shirtRow);
};

var adminRevenueStart = function(){
    getAdminist();
    renderRevenueHead();
    getShirtTotals();
    getAttendanceTotals();
    getMoneyReceived();
};

document.addEventListener('DOMContentLoaded', adminRevenueStart);