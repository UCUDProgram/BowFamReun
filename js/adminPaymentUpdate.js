var userFirst = "";
var userLast = "";
var useAcct = "";
var accountList = [];
var shrtPd = 0;
var regPd = 0;
var regPayment =0;
var shirtPayment =0;
var feeDB = new Firebase("https://bowmanfamreun.firebaseio.com/Fees");
var accDB = new Firebase("https://bowmanfamreun.firebaseio.com/Accounts");

var setShirtPaid = function(shirt){
  shrtPd = shirt;  
};

var updateShirtPaid = function(shtValue){
  shrtPd += shtValue;  
};

var setRegPaid = function(reg){
  regPd = reg;  
};

var setUserFirst = function(newFirst){
  userFirst = newFirst;  
};

var setUserLast = function(newLast){
    userLast = newLast;    
};

var updateRegPaid = function(regValue){
  regPd +=regValue;  
};

var setUserAccount = function(usAct){
  useAcct = usAct;  
};

var resetAll = function(){
  shrtPd =0;
  regPd =0;
  regPayment =0;
  shirtPayment = 0;
  userFirst = "";
  userLast = "";
  useAcct = "";
    renderReset();
};

var getFirstNames = function(){
  accDB.orderByChild("firstname").equalTo(userFirst).on("value", function(snapshot){
      snapshot.forEach(function(childSnapshot){
          var acctKy = childSnapshot.val().userName;
          var index_of_uFirstNm = accountList.indexOf(acctKy);
          if(index_of_uFirstNm == -1)
            accountList.push(acctKy);
      });
  });
};

var getLastNames = function(){
  accDB.orderByChild("lastname").equalTo(userLast).on("value", function(snapshot){
      snapshot.forEach(function(childSnapshot){
          var accoutKy = childSnapshot.val().userName;
          var index_of_uLastNm = accountList.indexOf(accoutKy);
          if(index_of_uLastNm == -1)
            accountList.push(accoutKy);
      });
  });
};

var setNewDues = function(key){
  var newReg = parseInt(document.getElementById("payReg").value, 10);
  var newShirt = parseInt(document.getElementById("payShirt").value,10);
  updateRegPaid(newReg);
  updateShirtPaid(newShirt);
  feeDB.child(key).update({regPaid: regPd,
                            shirtPaid: shrtPd
  });
};

var getNamesList = function(){
      getFirstNames();
       getLastNames();
       getResults();
};

var getResults = function(){
  accountList.forEach(function (userN){
     accDB.orderByChild("userName").equalTo(userN[0]).on("value", function(snapshot){
        snapshot.forEach(function(childSnapshot){
           var fNm = childSnapshot.val().firstname;
           var lNm = childSnapshot.val().lastname;
           renderIndResult(fNm, lNm, userN);
        }); 
     });
  });
};

var getFees = function(){
  feeDB.orderByChild("userName").equalTo(useAcct).on("value", function(snapshot){
      snapshot.forEach(function (childSnapshot){
         var shrt = childSnapshot.val().shirtPaid;
         var reg = childSnapshot.val().regPaid;
         var key = childSnapshot.key();
         setRegPaid(reg);
         setShirtPaid(shrt);
         renderUserCurrentPaid();
         renderPayUpdate();
         renderPayUpdateButton(key);
      });
  });
};

// RENDERING THE SCREEN (VIEW)
var renderPayHeader = function(){
 var div = document.getElementById("payHeader");
 var regTitle = document.createElement("h1");
 regTitle.innerHTML = "Member Payment Received";
 div.appendChild(regTitle);
};

var renderUserPaySearch = function(){
  renderUserFirstSearch();
  renderUserLastSearch();
  renderSearchButton();
};

var renderUserFirstSearch = function(){
  var orDiv = document.getElementById("userPaySearch");
  
  var dv = document.createElement("div");
  dv.classList.add("individual_block_first");
  
  var fNamLbl = document.createElement("label");
  fNamLbl.setAttribute("for", "payFName");
  fNamLbl.innerHTML = "First Name: ";
  dv.appendChild(fNamLbl);
  
  var fNamIpt = document.createElement("input");
  fNamIpt.setAttribute("type", "text");
  fNamIpt.setAttribute("id", "payFName");
  fNamIpt.addEventListener("blur", function(ev){
      setUserFirst(document.getElementById("payFName").value);
  });
  dv.appendChild(fNamIpt);
  orDiv.appendChild(dv);
};

var renderUserLastSearch = function(){
    var oDiv = document.getElementById("userPaySearch");
  
  var ldv = document.createElement("div");
  ldv.classList.add("individual_block");
  
  var lNamLbl = document.createElement("label");
  lNamLbl.setAttribute("for", "payLName");
  lNamLbl.innerHTML = "Last Name: ";
  ldv.appendChild(lNamLbl);
  
  var lNamIpt = document.createElement("input");
  lNamIpt.setAttribute("type", "text");
  lNamIpt.setAttribute("id", "payLName");
  lNamIpt.addEventListener("blur", function(ev){
      setUserLast(document.getElementById("payLName").value);
  });
  ldv.appendChild(lNamIpt);
  oDiv.appendChild(ldv);
};

var renderSearchButton = function(){
    var oBDiv = document.getElementById("userPaySearch");
    var persSearchBtn = document.createElement("button");
    persSearchBtn.setAttribute("type", "button");
    persSearchBtn.setAttribute("id", "personPayQuery");
    persSearchBtn.innerHTML = "Search Person";
    persSearchBtn.addEventListener("click", function(ev){
    
        console.log(accountList);
        getNamesList();
        console.log(accountList);
        // getResults();
    });
    oBDiv.appendChild(persSearchBtn);
};

var renderIndResult = function(frstNm, lstNm, usr){
    var indDv = document.getElementById("userPayRetrieve");
    var perDv = document.createElement("div");
    var divName = frstNm.concat(lstNm).concat("Record");
    perDv.setAttribute("id", divName);
    
    var fNDv = document.createElement("div");
    fNDv.innerHTML = frstNm;
    perDv.appendChild(fNDv);
    
    var lNDv = document.createElement("div");
    lNDv.innerHTML = lstNm;
    perDv.appendChild(lNDv);
    
    var persSelectBtn = document.createElement("button");
    persSelectBtn.setAttribute("type", "button");
    persSelectBtn.setAttribute("id", "personSelect");
    persSelectBtn.innerHTML = "Select Record";
    persSelectBtn.addEventListener("click", function(ev){
        setUserAccount(usr);
        getFees();
    });
    perDv.appendChild(persSelectBtn);
    indDv.appendChild(perDv);
};

var renderReset = function(){
  var res = document.getElementById("userPayRetrieve");
   while(res.firstChild)
        res.removeChild(res.firstChild);
  
  var pay = document.getElementById("currPayment");
  while(pay.firstChild)
        pay.removeChild(pay.firstChild);
    
    var payIpt = document.getElementById("userPayUpdate");
    while(payIpt.firstChild)
        payIpt.removeChild(payIpt.firstChild);
};


var renderUserCurrentPaid = function(){
    var dv = document.getElementById("currPayment");
    while(dv.firstChild)
        dv.removeChild(dv.firstChild);
        
    renderUserRegPayment();
    renderUserShirtPayment();
};

var renderUserRegPayment = function(){
    var sourc = document.getElementById("currPayment");
    
    var regDv = document.createElement("div");
    
    var regPayHead = document.createElement("div");
    regPayHead.innerHTML = "Registration Paid";
    regDv.appendChild(regPayHead);
    
    var regPayValue = document.createElement("div");
    regPayValue.innerHTML = regPd;
    regDv.appendChild(regPayValue);
    sourc.appendChild(regDv);
};

var renderUserShirtPayment = function(){
    var sorc = document.getElementById("currPayment");
    
    var shtDv = document.createElement("div");
    
    var shtPayHead = document.createElement("div");
    shtPayHead.innerHTML = "Shirt Paid";
    shtDv.appendChild(shtPayHead);
    
    var shtPayValue = document.createElement("div");
    shtPayValue.innerHTML = shrtPd;
    shtDv.appendChild(shtPayValue);
    sorc.appendChild(shtDv);
};

var renderPayUpdate = function(){
    var pDv = document.getElementById("userPayUpdate");
     while(pDv.firstChild)
        pDv.removeChild(pDv.firstChild);
        
  renderRegPayUpdate();
  renderShtPayUpdate();
};

var renderRegPayUpdate = function(){
    var oDiv = document.getElementById("userPayUpdate");
  
  var rPDv = document.createElement("div");
  rPDv.classList.add("individual_block");
  
  var regNamLbl = document.createElement("label");
  regNamLbl.setAttribute("for", "payReg");
  regNamLbl.innerHTML = "Registration Payment: ";
  rPDv.appendChild(regNamLbl);
  
  var regNamIpt = document.createElement("input");
  regNamIpt.setAttribute("type", "text");
  regNamIpt.setAttribute("id", "payReg");
  regNamIpt.setAttribute("value",0);
  regNamIpt.addEventListener("blur", function(ev){
      regPayment = document.getElementById("payReg").value;
  });
  rPDv.appendChild(regNamIpt);
  oDiv.appendChild(rPDv);
};

var renderShtPayUpdate = function(){
    var oDiv = document.getElementById("userPayUpdate");
  
  var sPDv = document.createElement("div");
  sPDv.classList.add("individual_block");
  
  var shrtNamLbl = document.createElement("label");
  shrtNamLbl.setAttribute("for", "payShirt");
  shrtNamLbl.innerHTML = "Shirt Payment: ";
  sPDv.appendChild(shrtNamLbl);
  
  var shrtNamIpt = document.createElement("input");
  shrtNamIpt.setAttribute("type", "text");
  shrtNamIpt.setAttribute("id", "payShirt");
  shrtNamIpt.setAttribute("value", 0);
  shrtNamIpt.addEventListener("blur", function(ev){
      shirtPayment = document.getElementById("payShirt").value;
  });
  sPDv.appendChild(shrtNamIpt);
  oDiv.appendChild(sPDv);
};

var renderPayUpdateButton = function(key){
    var oBDiv = document.getElementById("userPayUpdate");
    var persPayBtn = document.createElement("button");
    persPayBtn.setAttribute("type", "button");
    persPayBtn.setAttribute("id", "personPayUpdate");
    persPayBtn.innerHTML = "Update Record";
    persPayBtn.addEventListener("click", function(ev){
        setNewDues(key);
        resetAll();
    });
    oBDiv.appendChild(persPayBtn);
};

var admPayStart = function(){
    renderPayHeader();
    renderUserPaySearch();
    
};

document.addEventListener('DOMContentLoaded', admPayStart);