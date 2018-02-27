var userSearch = "";
var repayValue = 0;
var repayUpdate =0;

var admAt = "";
var repayDB = new Firebase("https://bowmanfamreun.firebaseio.com/Expenses");

var getAdmins = function(){
    admAt = localStorage.getItem("admin");
    if(admAt == null){
        showAdminLoginScreen();
    }
    if(admAt != "LawAdmin"){
        alert("This website is in Archive mode. Your account has been permanently disabled.");
        showHomePageScreen();
    }
};

var setRepayValue = function(rpyVe){
    repayValue = rpyVe;  
};

var setRepayUpdate = function(rpy){
    repayUpdate = repayValue + rpy;  
};

var setUserSearch = function(searchName){
    userSearch = searchName;  
};

var resetAll = function(){
    userSearch = "";
    repayValue = 0;
    repayUpdate =0;
    renderReset();
    renderUserRepaySearch();
};

var submitRepayUpdate = function(key){
    var rePay = document.getElementById("newRepay").value;
    setRepayUpdate(+rePay);
    repayDB.child(key).update({purRePaid: +repayUpdate});
    resetAll();
};

var getResults = function(){
    var dv = document.getElementById("userRepayRetrieve");
    while (dv.firstChild)
        dv.removeChild(dv.firstChild);
    
        repayDB.orderByChild("purOwedName").equalTo(userSearch).on("value", function(snapshot){
            snapshot.forEach(function(childSnapshot){
                var nM = childSnapshot.val().purOwedName;
                var nKey = childSnapshot.key();
                renderIndResult(nM, nKey);
            }); 
        });
};

var getFees = function(rKey){
    repayDB.orderByChild("purOwedName").equalTo(userSearch).on("value", function(snapshot){
        snapshot.forEach(function (childSnapshot){
            var rePd = childSnapshot.val().purRePaid;
            var pdKey = childSnapshot.key();
            setRepayValue(rePd);
            renderCurrRepayment();
            renderRepayUpdate();
            renderRepayUpdateButton(pdKey);
        });
    });
};

// RENDERING THE SCREEN (VIEW)
var renderRepayHeader = function(){
    var div = document.getElementById("repayHeader");
    var regTitle = document.createElement("h1");
    regTitle.innerHTML = "Update a Repayment Record";
    div.appendChild(regTitle);
};

var renderUserRepaySearch = function(){
    renderRepaySearch();
    renderSearchButton();
};

var renderRepaySearch = function(){
    var orDiv = document.getElementById("userRepaySearch");
  
    var dv = document.createElement("div");
    dv.classList.add("individual_block_first");
  
    var fNamLbl = document.createElement("label");
    fNamLbl.setAttribute("for", "repayName");
    fNamLbl.innerHTML = "Name: ";
    dv.appendChild(fNamLbl);
  
    var fNamIpt = document.createElement("input");
    fNamIpt.setAttribute("type", "text");
    fNamIpt.setAttribute("id", "repayName");
    fNamIpt.addEventListener("blur", function(ev){
        setUserSearch(document.getElementById("repayName").value);
    });
    dv.appendChild(fNamIpt);
    orDiv.appendChild(dv);
};

var renderSearchButton = function(){
    var oBDiv = document.getElementById("userRepaySearch");
    var persSearchBtn = document.createElement("button");
    persSearchBtn.setAttribute("type", "button");
    persSearchBtn.setAttribute("id", "personRepayQuery");
    persSearchBtn.innerHTML = "Search Person";
    persSearchBtn.addEventListener("click", function(ev){
        searchReset();
        getResults();
    });
    oBDiv.appendChild(persSearchBtn);
};

var renderIndResult = function(nam, uKey){
    var indDv = document.getElementById("userRepayRetrieve");
    var perDv = document.createElement("div");
    var divName = nam.concat("RePayment");
    perDv.setAttribute("id", divName);
    perDv.classList.add("recordSpacing");
    
    var fNDv = document.createElement("div");
    fNDv.classList.add("individual_block_first");
    fNDv.innerHTML = nam;
    perDv.appendChild(fNDv);

    var persSelectBtn = document.createElement("button");
    persSelectBtn.classList.add("individual_block");
    persSelectBtn.setAttribute("type", "button");
    persSelectBtn.setAttribute("id", "personSelect");
    persSelectBtn.innerHTML = "Select Repayment Record";
    persSelectBtn.addEventListener("click", function(ev){
        getFees(uKey);
    });
    perDv.appendChild(persSelectBtn);
    indDv.appendChild(perDv);
};

var renderReset = function(){
    var sea = document.getElementById("userRepaySearch");
    while(sea.firstChild)
        sea.removeChild(sea.firstChild);
    
    var res = document.getElementById("userRepayRetrieve");
    while(res.firstChild)
        res.removeChild(res.firstChild);
  
    var pay = document.getElementById("currRepayment");
    while(pay.firstChild)
        pay.removeChild(pay.firstChild);
    
    var payIpt = document.getElementById("userRepayUpdate");
    while(payIpt.firstChild)
        payIpt.removeChild(payIpt.firstChild);
};

var searchReset = function(){
    var pay = document.getElementById("currRepayment");
    while(pay.firstChild)
        pay.removeChild(pay.firstChild);
    
    var payIpt = document.getElementById("userRepayUpdate");
    while(payIpt.firstChild)
        payIpt.removeChild(payIpt.firstChild);
};

var renderCurrRepayment = function(){
    var dv = document.getElementById("currRepayment");
    while(dv.firstChild)
        dv.removeChild(dv.firstChild);
    renderUserRepay();
};

var renderUserRepay = function(){
    var sourc = document.getElementById("currRepayment");
    
    var regDv = document.createElement("div");
    regDv.classList.add("individual_block_first");
    
    var regPayHead = document.createElement("div");
    regPayHead.innerHTML = "Expenses Amount Repaid:";
    regDv.appendChild(regPayHead);
    
    var regPayValue = document.createElement("div");
    regPayValue.innerHTML = repayValue;
    regDv.appendChild(regPayValue);
    sourc.appendChild(regDv);
};

var renderRepayUpdate = function(){
    var pDv = document.getElementById("userRepayUpdate");
    while(pDv.firstChild)
        pDv.removeChild(pDv.firstChild);
    renderPersonRepayUpdate();
};

var renderPersonRepayUpdate = function(){
    var oDiv = document.getElementById("userRepayUpdate");
  
    var rPDv = document.createElement("div");
    rPDv.classList.add("individual_block");
  
    var regNamLbl = document.createElement("label");
    regNamLbl.setAttribute("for", "newRepay");
    regNamLbl.innerHTML = "Registration Payment: ";
    rPDv.appendChild(regNamLbl);
  
    var regNamIpt = document.createElement("input");
    regNamIpt.setAttribute("type", "text");
    regNamIpt.setAttribute("id", "newRepay");
    regNamIpt.setAttribute("value",0);
    regNamIpt.addEventListener("blur", function(ev){
    });
    rPDv.appendChild(regNamIpt);
    oDiv.appendChild(rPDv);
};

var renderRepayUpdateButton = function(key){
    var oBDiv = document.getElementById("userRepayUpdate");
    var persPayBtn = document.createElement("button");
    persPayBtn.setAttribute("type", "button");
    persPayBtn.setAttribute("id", "personRepayUpdate");
    persPayBtn.innerHTML = "Update Repayment Record";
    persPayBtn.addEventListener("click", function(ev){
        submitRepayUpdate(key);
    });
    oBDiv.appendChild(persPayBtn);
};

var admrePayStart = function(){
    getAdmins();
    renderRepayHeader();
    renderUserRepaySearch();
};

document.addEventListener('DOMContentLoaded', admrePayStart);