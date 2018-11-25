var foodCatTotal = 0;
var cutleryCatTotal = 0;
var entertainmentCatTotal = 0;
var setupCatTotal = 0;
var distributionCatTotal = 0;
var ordersCatTotal = 0;
var otherCatTotal =0;
var catTotal = 0;
var storeNames = [];
var storeNamesTotal = [];
var storeTotal = 0;
var peopleNames = [];
var peopleNamesTotal = [];
var peopleTotal = 0;
var ami = "";
var expensesDB = new Firebase("https://bowmanfamreun.firebaseio.com/Expenses");

var updateIndividualCategoryTotal = function(catName, itemValue){
    if (catName == "Food")
        foodCatTotal += itemValue;
    if(catName == "Cutlery")
        cutleryCatTotal += itemValue;
    if (catName == "Entertainment")
        entertainmentCatTotal += itemValue;
    if (catName == "Setup")
        setupCatTotal += itemValue;
    if (catName == "Distribution")
        distributionCatTotal += itemValue;
    if(catName == "Orders")
        ordersCatTotal += itemValue; 
    if(catName == "Other")
        otherCatTotal += itemValue;
};

var updateCatTotal = function(cValue){
    catTotal += cValue;  
};

var updateStore = function(stre, stoValue){
    var storeIndex = storeNames.indexOf(stre);
    if(storeIndex == -1){
        storeNames.push(stre);
        storeNamesTotal.push(stoValue);
    } else {
        var oldValue = storeNamesTotal[storeIndex];
        var newValue = +(oldValue + stoValue);
        storeNamesTotal[storeIndex] = newValue;
    }
};

var updateStoreTotal = function(sValue){
    storeTotal += sValue;  
};

var updatePerson  = function(perso, persoValue){
    var personIndex = peopleNames.indexOf(perso);
    if(personIndex == -1){
        peopleNames.push(perso);
        peopleNamesTotal.push(persoValue);
    } else {
        var oldPersValue = peopleNamesTotal[personIndex];
        var newPersValue = +(oldPersValue + persoValue);
        peopleNamesTotal[personIndex] = newPersValue;
    }
};

var updatePeopleTotal = function(pValue){
    peopleTotal += pValue;
};

var getAdmnst = function(){
    ami = localStorage.getItem("admin");
    if(ami == null){
        showAdminLoginScreen();
    }
    // if(ami != "LawAdmin"){
    //     alert("This website is in Archive mode. Your account has been permanently disabled.");
    //     showHomePageScreen();
    // }
};

var getCategoryExpenses = function(){
    expensesDB.orderByKey().on("value", function(snapshot){
        snapshot.forEach(function (snap){
            var catDiv = document.getElementById("categoryExpense");
            while(catDiv.firstChild)
            catDiv.removeChild(catDiv.firstChild);
            
            var itmCat = snap.val().purCat;
            var itmValue = snap.val().purCost;
            // var iValue = parseInt(itmValue, 10);
            var iValue = parseFloat(itmValue);
            
            if(itmValue != undefined ){
                updateIndividualCategoryTotal(itmCat, iValue);
                updateCatTotal(iValue);
                } 
            renderCatExpenseTable();
            
        });
    });
};

var getStoreExpenses = function(){
    expensesDB.orderByKey().on("value", function(snapshot){
        snapshot.forEach(function (snap){
            var strDiv = document.getElementById("storeExpense");
            while(strDiv.firstChild)
                strDiv.removeChild(strDiv.firstChild);
            
            var location = snap.val().purLoc;
            var locValue = snap.val().purCost;
            var lValue = parseFloat(locValue);
            
            if(locValue != undefined){
                updateStore(location, lValue);
                updateStoreTotal(lValue);
            }
            renderStoreExpenseTable();
        });
    });
};

var getPersonExpenses = function(){
    expensesDB.orderByKey().on("value", function(snapshot){
        snapshot.forEach(function (snap){
            var perDiv = document.getElementById("personExpense");
            while(perDiv.firstChild)
                perDiv.removeChild(perDiv.firstChild);
            
            var owed = snap.val().purOwedName;
            var owedValue = snap.val().purCost;
            var oValue = parseFloat(owedValue);
            
            if(owedValue != undefined){
                updatePerson(owed, oValue);
                updatePeopleTotal(oValue);
            }
            renderPeopleExpenseTable();            
        });
    });
};

var getRepaymentExpenses = function(){
  expensesDB.orderByKey().on("value", function(snapshot){
        snapshot.forEach(function (snap){
            var owed = snap.val().purOwedName;
            var spntValue = snap.val().purCost;
            var rpaid = snap.val().purRePaid;
            var owedspent = parseFloat(spntValue);
            var owedrepd = parseFloat(rpaid);
            if(spntValue != undefined)
                renderPersonRepaymentTable(owed,owedspent, owedrepd); 
        });
    });
};
var resetCatVariables = function(){
    foodCatTotal = 0;
    cutleryCatTotal = 0;
    entertainmentCatTotal = 0;
    setupCatTotal = 0;
    distributionCatTotal = 0;
    ordersCatTotal = 0;
    otherCatTotal =0;
    catTotal = 0;
};

var resetStoreVariables = function(){
    storeNames = [];
    storeNamesTotal = [];
    storeTotal = 0;
};

var resetPeopleVariables = function(){
    peopleNames = [];
    peopleNamesTotal = [];
    peopleTotal = 0;
};

// RENDERING THE SCREEN (VIEW)
var renderExpenseHead = function(){
    var expHead = document.getElementById("expenseReportHeader");
    var expTitle = document.createElement("h2");
    expTitle.innerHTML = "Expense Reports for the Bowman Family Reunion";
    expHead.appendChild(expTitle);
};

var renderExpRptOpt = function(){
  var rptOpt = document.getElementById("expenseReportOptions");
  
  var $catOption = document.createElement("button");
    $catOption.setAttribute("id", "catOption");
    $catOption.innerHTML = "Report by Category";
    $catOption.addEventListener("click", function(ev){
        clearExpenseView();
        resetCatVariables();
        getCategoryExpenses();
    });
    rptOpt.appendChild($catOption);
    
    
    var $storeOption = document.createElement("button");
    $storeOption.setAttribute("id", "storeOption");
    $storeOption.innerHTML = "Report by Store";
    $storeOption.addEventListener("click", function(ev){
        clearExpenseView();
        resetStoreVariables();
        getStoreExpenses();
    });
    rptOpt.appendChild($storeOption);
    
    
    var $peopleOption = document.createElement("button");
    $peopleOption.setAttribute("id", "peopleOption");
    $peopleOption.innerHTML = "Report on Personal Spending";
    $peopleOption.addEventListener("click", function(ev){
        clearExpenseView();
        resetPeopleVariables();
        getPersonExpenses();
    });
    rptOpt.appendChild($peopleOption);
    
    var $repayOption = document.createElement("button");
    $repayOption.setAttribute("id", "peopleOption");
    $repayOption.innerHTML = "Report on Expense Repayment";
    $repayOption.addEventListener("click", function(ev){
        clearExpenseView();
        renderRepaymentHeader();
       getRepaymentExpenses(); 
    });
    rptOpt.appendChild($repayOption);
    
};

var clearExpenseView = function(){
    var catClr = document.getElementById("categoryExpense");
    while(catClr.firstChild)
        catClr.removeChild(catClr.firstChild);
    
    var strClr = document.getElementById("storeExpense");
    while(strClr.firstChild)
        strClr.removeChild(strClr.firstChild);
        
    var perClr = document.getElementById("personExpense");
    while(perClr.firstChild)
        perClr.removeChild(perClr.firstChild);
        
    var repyClr = document.getElementById("repayExpense");
    while(repyClr.firstChild)
        repyClr.removeChild(repyClr.firstChild);
};

var renderCatExpenseTable = function(){
    var catTblSrc = document.getElementById("categoryExpense");
    var cateDi = document.createElement("div");
    
    var catTblHead = document.createElement("h1");
    catTblHead.innerHTML = "Expenses sorted by Category";
    cateDi.appendChild(catTblHead);
    
    var catTbl = document.createElement("table");
    renderFoodCatRow(catTbl);
    renderCutleryCatRow(catTbl);
    renderEntertainCatRow(catTbl);
    renderSetupCatRow(catTbl);
    renderDistributeCatRow(catTbl);
    renderOrdersCatRow(catTbl);
    renderOtherCatRow(catTbl);
    cateDi.appendChild(catTbl);
    catTblSrc.appendChild(cateDi);
};

var renderFoodCatRow = function(catTable){
    var foodRow = document.createElement("tr");
    
    var foodTotFormat = foodCatTotal.toFixed(2);
    var fpercent = +(foodCatTotal / catTotal);
    var fdPerc = +(fpercent * 100);
    var fdPerValue = fdPerc.toFixed(2);
    
    
    var fdNa = document.createElement("td");
    fdNa.innerHTML = "Food";
    foodRow.appendChild(fdNa);
    
    var fdVl = document.createElement("td");
    fdVl.innerHTML = foodTotFormat;
    foodRow.appendChild(fdVl);
    
    var fdPer = document.createElement("td");
    fdPer.innerHTML = fdPerValue + "%";
    foodRow.appendChild(fdPer);
    catTable.appendChild(foodRow);
};

var renderCutleryCatRow = function(catTble){
    var cutlRow = document.createElement("tr");
    
    var cutTotFormat = cutleryCatTotal.toFixed(2);
    var ctPercent = +(cutleryCatTotal / catTotal);
    var ctPerc = ctPercent * 100;
    var ctPerValue = ctPerc.toFixed(2);
    
    var ctNa = document.createElement("td");
    ctNa.innerHTML = "Cutlery";
    cutlRow.appendChild(ctNa);
    
    var ctVl = document.createElement("td");
    ctVl.innerHTML = cutTotFormat;
    cutlRow.appendChild(ctVl);
    
    var ctPer = document.createElement("td");
    ctPer.innerHTML = ctPerValue + "%";
    cutlRow.appendChild(ctPer);
    catTble.appendChild(cutlRow);
};

var renderEntertainCatRow = function(catTab){
    var etRow = document.createElement("tr");
    
    var entertainmentTotFormat = entertainmentCatTotal.toFixed(2);
    var etPercent = +(entertainmentCatTotal / catTotal);
    var etPerc = etPercent * 100;
    var etPerValue = etPerc.toFixed(2);
    
    var etNa = document.createElement("td");
    etNa.innerHTML = "Entertainment";
    etRow.appendChild(etNa);
    
    var etVl = document.createElement("td");
    etVl.innerHTML = entertainmentTotFormat;
    etRow.appendChild(etVl);
    
    var etPer = document.createElement("td");
    etPer.innerHTML = etPerValue + "%";
    etRow.appendChild(etPer);
    catTab.appendChild(etRow);
};

var renderSetupCatRow = function(catTabl){
    var setRow = document.createElement("tr");
    
    var setupTotFormat = setupCatTotal.toFixed(2);
    var setPercent = +(setupCatTotal / catTotal);
    var setPerc = setPercent * 100;
    var setPerValue = setPerc.toFixed(2);
    
    var setNa = document.createElement("td");
    setNa.innerHTML = "Setup";
    setRow.appendChild(setNa);
    
    var setVl = document.createElement("td");
    setVl.innerHTML = setupTotFormat;
    setRow.appendChild(setVl);
    
    var setPer = document.createElement("td");
    setPer.innerHTML = setPerValue + "%";
    setRow.appendChild(setPer);
    catTabl.appendChild(setRow);
};

var renderDistributeCatRow = function(catTbe){
    var distRow = document.createElement("tr");
    
    var distTotFormat = distributionCatTotal.toFixed(2);
    var distPercent = +(distributionCatTotal / catTotal);
    var distPerc = distPercent * 100;
    var distPerValue = distPerc.toFixed(2);
    
    var distNa = document.createElement("td");
    distNa.innerHTML = "Distribution";
    distRow.appendChild(distNa);
    
    var distVl = document.createElement("td");
    distVl.innerHTML = distTotFormat;
    distRow.appendChild(distVl);
    
    var distPer = document.createElement("td");
    distPer.innerHTML = distPerValue + "%";
    distRow.appendChild(distPer);
    catTbe.appendChild(distRow);
};

var renderOrdersCatRow = function(catTal){
    var orderRow = document.createElement("tr");
    
    var ordersTotFormat = ordersCatTotal.toFixed(2);
    var orderPercent = +(ordersCatTotal / catTotal);
    var orderPerc = orderPercent * 100;
    var orderPerValue = orderPerc.toFixed(2);
    
    var orderNa = document.createElement("td");
    orderNa.innerHTML = "Orders";
    orderRow.appendChild(orderNa);
    
    var orderVl = document.createElement("td");
    orderVl.innerHTML = ordersTotFormat;
    orderRow.appendChild(orderVl);
    
    var orderPer = document.createElement("td");
    orderPer.innerHTML = orderPerValue + "%";
    orderRow.appendChild(orderPer);
    catTal.appendChild(orderRow);
};

var renderOtherCatRow = function(catTae){
    var otherRow = document.createElement("tr");
    
    var othersTotFormat = otherCatTotal.toFixed(2);
    var otherPercent = +(otherCatTotal / catTotal);
    var otherPerc = otherPercent * 100;
    var orderPerValue = otherPerc.toFixed(2);
    
    var otherNa = document.createElement("td");
    otherNa.innerHTML = "Other";
    otherRow.appendChild(otherNa);
    
    var otherVl = document.createElement("td");
    otherVl.innerHTML = othersTotFormat;
    otherRow.appendChild(otherVl);
    
    var otherPer = document.createElement("td");
    otherPer.innerHTML = orderPerValue + "%";
    otherRow.appendChild(otherPer);
    catTae.appendChild(otherRow);
};

var renderStoreExpenseTable = function(){
    var strTblSrc = document.getElementById("storeExpense");
    var strDi = document.createElement("div");
    
    var strTblHead = document.createElement("h1");
    strTblHead.innerHTML = "Expenses sorted by Store";
    strDi.appendChild(strTblHead);
    
    var strTbl = document.createElement("table");
    for(var ind= 0; ind < storeNames.length;ind++ )
        renderAStore(ind,strTbl);
    
    
    strDi.appendChild(strTbl);
    strTblSrc.appendChild(strDi);
};

var renderAStore = function(index, storTbl){
    var storeRow = document.createElement("tr");
    
    var aStore = storeNames[index];
    var aStoreValue = storeNamesTotal[index];
    var storeValue = aStoreValue.toFixed(2);
    
    var storePercent = +(aStoreValue / storeTotal);
    var storePerc = storePercent * 100;
    var storePerValue = storePerc.toFixed(2);
    
    var storeNa = document.createElement("td");
    storeNa.innerHTML = aStore;
    storeRow.appendChild(storeNa);
    
    var storeVl = document.createElement("td");
    storeVl.innerHTML = storeValue;
    storeRow.appendChild(storeVl);
    
    var storePer = document.createElement("td");
    storePer.innerHTML = storePerValue + "%";
    storeRow.appendChild(storePer);
    storTbl.appendChild(storeRow);
    
};

var renderPeopleExpenseTable = function(){
    var peopTblSrc = document.getElementById("personExpense");
    var peopDi = document.createElement("div");
    
    var peopTblHead = document.createElement("h1");
    peopTblHead.innerHTML = "Expenses sorted by People Owed Money";
    peopDi.appendChild(peopTblHead);
    
    var peopTbl = document.createElement("table");
    for(var inde = 0; inde < peopleNames.length; inde++)
        renderAPerson(inde, peopTbl);
    
    peopDi.appendChild(peopTbl);
    peopTblSrc.appendChild(peopDi);
};

var renderAPerson = function(perInd, perTb){
    var personRow = document.createElement("tr");
    
    var aPerson = peopleNames[perInd];
    var aPersonValue = peopleNamesTotal[perInd];
    var personValue = aPersonValue.toFixed(2);
    
    var personPercent = +(aPersonValue / peopleTotal);
    var personPerc = personPercent * 100;
    var personPerValue = personPerc.toFixed(2);
    
    var personNa = document.createElement("td");
    personNa.innerHTML = aPerson;
    personRow.appendChild(personNa);
    
    var personVl = document.createElement("td");
    personVl.innerHTML = personValue;
    personRow.appendChild(personVl);
    
    var personPer = document.createElement("td");
    personPer.innerHTML = personPerValue + "%";
    personRow.appendChild(personPer);
    perTb.appendChild(personRow);
};


var renderRepaymentHeader = function(){
  var repayHeadSrc = document.getElementById("repayExpense");
    var repyDi = document.createElement("div");
    
    var repyHead = document.createElement("h1");
    repyHead.innerHTML = "Repayment Balance Sheet for Family Reunion Expenses";
    repyDi.appendChild(repyHead);
    repayHeadSrc.appendChild(repyDi);
};

var renderPersonRepaymentTable = function(owedName,moneyspnt, moneyrpaid){
    var owedPerson = +(moneyspnt - moneyrpaid);
    var owedValue = owedPerson.toFixed(2);
    
    var repayTblSrc = document.getElementById("repayExpense");
    var repayDi = document.createElement("div");
    var repayTbl = document.createElement("table");
    var repayRow = document.createElement("tr");
    
    var repayNa = document.createElement("td");
    repayNa.innerHTML = owedName;
    repayRow.appendChild(repayNa);
    
    var repayVl = document.createElement("td");
    repayVl.innerHTML = "$ " + owedValue;
    repayRow.appendChild(repayVl);
    
    repayTbl.appendChild(repayRow);
    repayDi.appendChild(repayTbl);
    repayTblSrc.appendChild(repayDi);
};

var adminExpenseStart = function(){
    // getAdmnst();
    renderExpenseHead();
    renderExpRptOpt();
};

document.addEventListener('DOMContentLoaded', adminExpenseStart);