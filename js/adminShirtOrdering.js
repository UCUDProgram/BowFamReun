var admA = "";
var DB = new Firebase("https://bowmanfamreun.firebaseio.com/");

var getAdmini = function(){
    admA = localStorage.getItem("admin");
    if(admA == null){
        showAdminLoginScreen();
    }
    if(admA != "LawAdmin"){
        alert("This website is in Archive mode. Your account has been permanently disabled.");
        showHomePageScreen();
    }
};

var getShirtOrderList = function(){
    var shirtD = DB.child("ShirtOrder");
    shirtD.orderByKey().on("value",function(snapshot){
       snapshot.forEach(function(childSnapshot){
          var fir = childSnapshot.val().firstName;
          var las = childSnapshot.val().lastName;
          var ke = childSnapshot.key();
          if(fir != undefined)
            renderOrderList(fir, las, ke);
       });
    });  
};


var renderAdminShirtOrderingScreen = function(){
    renderShirtOrderHeader();
    getShirtOrderList();
};

var renderShirtOrderHeader = function(){
    var sou = document.getElementById("adminShirtOrderHeader");
    var shrtHdr = document.createElement("h1");
    shrtHdr.innerHTML = "Shirt Orders";
    sou.appendChild(shrtHdr);
};

var renderOrderList = function(firstN, lastN, ordKey){
    var sourc = document.getElementById("adminShirtOrderList");
    var personNam = firstN + " " + lastN;
    var personOrder = document.createElement("div");
    var personName = document.createElement("div");
    personName.classList.add("individual_block_first");
    personName.innerHTML = personNam;
    personOrder.appendChild(personName);
    renderPersonEditButton(ordKey,personOrder);
    
    sourc.appendChild(personOrder);
};

var renderPersonEditButton = function(ky,atta){
    var personBtn = document.createElement("button");
    personBtn.classList.add("individual_block");
    personBtn.setAttribute("type", "button");
    personBtn.setAttribute("id", "persView");
    personBtn.innerHTML = "Edit Shirt Order";
    personBtn.addEventListener("click", function(ev){
        renderShirtOrderInfo(ky);
    });
    atta.appendChild(personBtn);
};

// Viewing an individual shirt order 
var renderShirtOrderInfo = function(shtKy){
    document.getElementById("adminShirtOrderHeader").classList.add("hidden");
    document.getElementById("adminShirtOrderList").classList.add("hidden");
    var shrtView = document.getElementById("adminShirtOrderView");
    while (shrtView.firstChild)
        shrtView.removeChild(shrtView.firstChild);
    document.getElementById("adminShirtOrderView").classList.remove("hidden");
    renderShirtBackButton();
    renderPaymentButton(shtKy);
    getTShirtOrder(shtKy);
};

var getTShirtOrder = function(sKy){
    var shirtDB = DB.child("ShirtOrder");
    shirtDB.orderByKey().equalTo(sKy).on("value", function(snapshot){
        snapshot.forEach(function (childSnapshot){
            var fNa = childSnapshot.val().firstName;
            var lNa = childSnapshot.val().lastName;
            var adr = childSnapshot.val().addr;
            var ciy = childSnapshot.val().city;
            var ste = childSnapshot.val().state;
            var zipCo = childSnapshot.val().zip;
            var phne = childSnapshot.val().phone;
            var emil = childSnapshot.val().email;
            var smS = childSnapshot.val().SmallShirt;
            var mdS = childSnapshot.val().MedShirt;
            var lgS = childSnapshot.val().LgShirt;
            var xlS = childSnapshot.val().XLShirt;
            var xxlS = childSnapshot.val().XXLShirt;
            var xxxlS = childSnapshot.val().XXXLShirt;
            var xxxxlS = childSnapshot.val().XXXXLShirt;
            var monPd = childSnapshot.val().moneyPaid;
            renderShtMail(fNa, lNa, adr, ciy, ste, zipCo, phne, emil);
            renderShtOrder(+smS, +mdS, +lgS, +xlS, +xxlS, +xxxlS, +xxxxlS);
            renderShtPayment(monPd);
        });
    });  
};

var renderShtMail = function(fi, la, ad, ci, st, zC, ph, em){
    var mail = document.getElementById("adminShirtOrderView");
    var mailDi = document.createElement("div");
    
    var mailN = document.createElement("div");
    mailN.innerHTML = "Name: " + fi + " " + la;
    mailDi.appendChild(mailN);
    
    var mailA = document.createElement("div");
    mailA.innerHTML = "Address: " + ad;
    mailDi.appendChild(mailA);
    
    var mailD = document.createElement("div");
    
    var mailC = document.createElement("div");
    mailC.classList.add("individual_block_first");
    mailC.innerHTML = "City: " + ci;
    mailD.appendChild(mailC);
    
    var mailS = document.createElement("div");
    mailS.classList.add("individual_block");
    mailS.innerHTML = "State: " + st;
    mailD.appendChild(mailS);
    
    var mailZ = document.createElement("div");
    mailZ.classList.add("individual_block");
    mailZ.innerHTML = "ZipCode: " + zC;
    mailD.appendChild(mailZ);
    
    mailDi.appendChild(mailD);
    
    var mailP = document.createElement("div");
    mailP.innerHTML = "Phone Number: " + ph;
    mailDi.appendChild(mailP);
    
    var mailE = document.createElement("div");
    mailE.innerHTML = "Email Address: " + em;
    mailDi.appendChild(mailE);
    
    mail.appendChild(mailDi);
};

var renderShtOrder = function(sl, mm, le, xe, xxe, xxxe, xxxxe){
    var shtView = document.getElementById("adminShirtOrderView");
    var shirtCount = "";
    var smaSh = sl + " Small, ";
    var medSh = mm + " Medium, ";
    var larSh = le + " Large, ";
    var xlaSh = xe + " XL, ";
    var xxlaSh = xxe + " XXL, ";
    var xxxlaSh = xxxe + " XXXL, ";
    var xxxxlaSh = xxxxe + " XXXXL, ";
    if (sl > 0)
        shirtCount += smaSh;
    if (mm > 0)
        shirtCount += medSh;
    if (le > 0) 
        shirtCount += larSh;
    if (xe > 0)
        shirtCount += xlaSh;
    if (xxe > 0)
        shirtCount += xxlaSh;
    if (xxxe > 0)
        shirtCount += xxxlaSh;
    if (xxxxe > 0)
        shirtCount += xxxxlaSh;
    
    shirtCount = shirtCount.substring(0, shirtCount.length -2);
    shirtCount += " Shirts.";
    
    var shtOrd = document.createElement("div");
    shtOrd.innerHTML = shirtCount;
    shtView.appendChild(shtOrd);
};

var renderShtPayment = function(mP){
    var sView = document.getElementById("adminShirtOrderView");
    var py = document.createElement("div");
    py.innerHTML = "Money Paid: " + mP;
    sView.appendChild(py);
};

var renderShirtBackButton = function(){
    var shirtBack = document.getElementById("adminShirtOrderView");
    var backBtn = document.createElement("button");
    backBtn.classList.add("individual_block");
    backBtn.setAttribute("type", "button");
    backBtn.setAttribute("id", "persList");
    backBtn.innerHTML = "Return to List";
    backBtn.addEventListener("click", function(ev){
        var shirtClr = document.getElementById("adminShirtOrderView");
        while(shirtClr.firstChild)
            shirtClr.removeChild(shirtClr.firstChild);
        document.getElementById("adminShirtOrderHeader").classList.remove("hidden");
        document.getElementById("adminShirtOrderList").classList.remove("hidden");
    });
    shirtBack.appendChild(backBtn);
};

var renderPaymentButton = function(shiKe){
    var paymentButton = document.getElementById("adminShirtOrderView");
    var paymentBtn = document.createElement("button");
    paymentBtn.classList.add("individual_block");
    paymentBtn.setAttribute("type", "button");
    paymentBtn.setAttribute("id", "shrtPay");
    paymentBtn.innerHTML = "Update Shirt Payment";
    paymentBtn.addEventListener("click", function(ev){
        renderShirtPayment(shiKe);
    });
    paymentButton.appendChild(paymentBtn);
};
// Viewing the Payment Screen for TShirt Order
var regularOrder = 0;
var largerOrder = 0;
var regCos = 15;
var largCos = 20;
var shipping = 5;
var totalDue = 0;
var payment = 0;
var moneyPid = 0;
var paymentUpdate = 0;

var setRegularOrder = function(regTot){
    regularOrder = regTot;  
};

var setLargerOrder = function(largTot){
    largerOrder = largTot;  
};

var setPayment = function(payM){
    payment = payM;    
};

var updateMoneyPaid = function(mPaid){
    moneyPid = mPaid;  
};

var setNewPaymentValue = function(){
    paymentUpdate = +moneyPid + +payment;    
};

var setTotalDue = function(){
    var reguDue = regularOrder * regCos;
    var largeDue = largerOrder * largCos;
    var totDu = +reguDue + +largeDue + +shipping;
    totalDue = totDu;
};

var updatePayment = function(ske){
    var shrtOrd = DB.child("ShirtOrder");
    shrtOrd.child(ske).update({moneyPaid: +paymentUpdate});
};

var renderShirtPayment = function(shKe){
    var shirtClr = document.getElementById("adminShirtOrderPaymentUpdate");
    while(shirtClr.firstChild)
        shirtClr.removeChild(shirtClr.firstChild);
    document.getElementById("adminShirtOrderView").classList.add("hidden");
    getShirtOrdInf(shKe);
};

// var renderPayment = function(shtKe){
//     getShirtOrdInf(shtKe);
//     renderShrtPayment();
    
// };

var getShirtOrdInf = function(ky){
    var shirtDB = DB.child("ShirtOrder");
    shirtDB.orderByKey().equalTo(ky).on("value", function(snapshot){
        snapshot.forEach(function (childSnapshot){
            var fNam = childSnapshot.val().firstName;
            var lNam = childSnapshot.val().lastName;
            var smSh = childSnapshot.val().SmallShirt;
            var mdSh = childSnapshot.val().MedShirt;
            var lgSh = childSnapshot.val().LgShirt;
            var xlSh = childSnapshot.val().XLShirt;
            var xxlSh = childSnapshot.val().XXLShirt;
            var xxxlSh = childSnapshot.val().XXXLShirt;
            var xxxxlSh = childSnapshot.val().XXXXLShirt;
            var monyPd = childSnapshot.val().moneyPaid;
            updateMoneyPaid(monyPd);
            renderName(fNam, lNam);
            renderOrder(+smSh, +mdSh, +lgSh, +xlSh, +xxlSh, +xxxlSh, +xxxxlSh);
            renderPaymentHistory(monyPd);
            renderShrtPay(ky);
        });
    });    
};

var renderName = function(fiNa, laNa){
    var soDi = document.getElementById("adminShirtOrderPaymentUpdate");
    var nmD = document.createElement("h3");
    nmD.innerHTML = fiNa + " " + laNa;
    soDi.appendChild(nmD);
};

var renderOrder = function(sSh, mSh, lSh, xlaS, xxlaS, xxxlaS, xxxxlaS){
    var sOrd = sSh + mSh + lSh + xlaS + xxlaS;
    var lOrd = xxxlaS + xxxxlaS;
    setRegularOrder(sOrd);
    setLargerOrder(lOrd);
    setTotalDue();
    renderMoneyDue();
};

var renderMoneyDue = function(){
    var souDi = document.getElementById("adminShirtOrderPaymentUpdate");
    var mPD = document.createElement("h3");
    mPD.innerHTML ="Money Due: " + totalDue;
    souDi.appendChild(mPD);
};

var renderPaymentHistory = function(mPa){
    var souDi = document.getElementById("adminShirtOrderPaymentUpdate");
    var mPD = document.createElement("h3");
    mPD.innerHTML ="Money Paid: " + mPa;
    souDi.appendChild(mPD);
};

var renderShrtPay = function(aSK){
    renderShrtPayment();
    var paDi = document.getElementById("adminShirtOrderPaymentUpdate");
    var btnDiv = document.createElement("div");
    btnDiv.classList.add("paymentDi");
    renderShirtPayUpdateBtn(aSK, btnDiv);
    renderShirtPayBackBtn(btnDiv);
    paDi.appendChild(btnDiv);
};

var renderShrtPayment = function(){
    var shrtPayment = document.getElementById("adminShirtOrderPaymentUpdate");
    
    var sPDv = document.createElement("div");
    sPDv.classList.add("individual_block_first");
  
    var shrtNamLbl = document.createElement("label");
    shrtNamLbl.setAttribute("for", "payShirtOrd");
    shrtNamLbl.innerHTML = "Shirt Payment: ";
    sPDv.appendChild(shrtNamLbl);
  
    var shrtNamIpt = document.createElement("input");
    shrtNamIpt.setAttribute("type", "text");
    shrtNamIpt.setAttribute("id", "payShirtOrd");
    shrtNamIpt.setAttribute("value", 0);
    shrtNamIpt.addEventListener("blur", function(ev){
        var pymnt = document.getElementById("payShirtOrd").value;
        setPayment(pymnt);
    });
    sPDv.appendChild(shrtNamIpt);
    shrtPayment.appendChild(sPDv);
};

var renderShirtPayUpdateBtn = function(aKe, bD){
    var oBDiv = document.createElement("div");
    oBDiv.classList.add("individual_block_first");
    var persPayBtn = document.createElement("button");
    persPayBtn.setAttribute("type", "button");
    persPayBtn.setAttribute("id", "adminPayUpdate");
    persPayBtn.innerHTML = "Update Payment";
    persPayBtn.addEventListener("click", function(ev){
        setNewPaymentValue();
        updatePayment(aKe);
        var clDi = document.getElementById("adminShirtOrderPaymentUpdate");
        while (clDi.firstChild)
            clDi.removeChild(clDi.firstChild);
        document.getElementById("adminShirtOrderHeader").classList.remove("hidden");
        var ordList = document.getElementById("adminShirtOrderList");
        while (ordList.firstChild)
            ordList.removeChild(ordList.firstChild);
        getShirtOrderList();
        document.getElementById("adminShirtOrderList").classList.remove("hidden");
    });
    oBDiv.appendChild(persPayBtn);
    bD.appendChild(oBDiv);
};

var renderShirtPayBackBtn = function(buDi){
    var PyDiv = document.createElement("div");
    PyDiv.classList.add("individual_block");
    var persPayBackBtn = document.createElement("button");
    persPayBackBtn.setAttribute("type", "button");
    persPayBackBtn.setAttribute("id", "adminPayBack");
    persPayBackBtn.innerHTML = "Back to Record";
    persPayBackBtn.addEventListener("click", function(ev){
        var clDi = document.getElementById("adminShirtOrderPaymentUpdate");
        while (clDi.firstChild)
            clDi.removeChild(clDi.firstChild);
        document.getElementById("adminShirtOrderView").classList.remove("hidden");
    });
    PyDiv.appendChild(persPayBackBtn);
    buDi.appendChild(PyDiv);
};

var adminShirtOrderingStart = function(){
    getAdmini();
    renderAdminShirtOrderingScreen();
};

document.addEventListener('DOMContentLoaded',adminShirtOrderingStart);