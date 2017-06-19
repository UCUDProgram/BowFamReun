var DB = new Firebase("https://bowmanfamreun.firebaseio.com/");

var getAncestOrders = function(){
    var ancestOrder = DB.child("AncestryRpt");
    ancestOrder.orderByKey().on("value", function(snapshot){
        snapshot.forEach(function(childSnapshot){
            var mailOrder = childSnapshot.val().mailPick;
            var emailOrder = childSnapshot.val().emailPick;
            var pickOrder = childSnapshot.val().pickup;
            var orderKey = childSnapshot.key();
            console.log(mailOrder);
            if(mailOrder == true)
                renderMailOrder(orderKey);
            if (emailOrder == true)
                renderEmailOrder(orderKey);
            if (pickOrder == true)
                renderPickupOrder(orderKey);
        });
    });
};

// RENDERING THE SCREEN
var renderAncestReportHead = function(){
    var rptHed = document.getElementById("orderHeader");
    var reptTitle = document.createElement("h1");
    reptTitle.innerHTML = "Ancestry Report Orders";
    rptHed.appendChild(reptTitle);
};

var renderHeaders = function(){
    mailHeader();
    emailHeader();
    pickupHeader();
};

var mailHeader = function(){
    var mailHed = document.getElementById("mailOrders");
    var mailTitle = document.createElement("h1");
    mailTitle.innerHTML = "Mail Orders";
    mailHed.appendChild(mailTitle);
};

var emailHeader = function(){
    var emailHed = document.getElementById("emailOrders");
    var emailTitle = document.createElement("h1");
    emailTitle.innerHTML = "Email Orders";
    emailHed.appendChild(emailTitle);
};

var pickupHeader = function(){
    var pickupHed = document.getElementById("pickupOrders");
    var pickupTitle = document.createElement("h1");
    pickupTitle.innerHTML = "Pickup Orders";
    pickupHed.appendChild(pickupTitle);
};

var renderMailOrder = function(ordrKy){
    var mailOrdr = DB.child("AncestryRpt");
    mailOrdr.orderByKey().equalTo(ordrKy).on("value",function(snapshot){
        snapshot.forEach(function(childSnapshot){
            var mNam = childSnapshot.val().mailName;
            var mAddr = childSnapshot.val().mailAddress;
            var mCy = childSnapshot.val().mailCity;
            var mSt = childSnapshot.val().mailState;
            var mZp = childSnapshot.val().mailZip;
            var rFName = childSnapshot.val().firstName;
            var rLName = childSnapshot.val().lastName;
            var rrptNm = childSnapshot.val().rptName;
            var rrptGen = childSnapshot.val().rptGen;
            renderMail(mNam, mAddr, mCy, mSt, mZp, rFName, rLName, rrptNm, rrptGen);
        });
    });
};

var renderMail = function(mN,mA,mC, mS, mZ, rFN, rLN, rNm, rG){
    var mailSource = document.getElementById("mailOrders");
    var indMailOrder = document.createElement("div");
    renderOrdHead(rFN, rLN, indMailOrder);
    renderRptInfo(rFN, rLN, rG, rNm, indMailOrder);
    var maiDv = document.createElement("div");
    renderMailAddressHead(maiDv);
    renderMailName(mN, maiDv);
    renderMailAddress(mA, maiDv);
    renderMailDestin(mC, mS, mZ, maiDv);
    indMailOrder.appendChild(maiDv);
    
    mailSource.appendChild(indMailOrder);
};

var renderOrdHead = function(fi, la, mDv){
    var persOrdDv = document.createElement("div");
    var fNaD = document.createElement("h2");
    fNaD.classList.add("individual_block_first");
    fNaD.innerHTML = fi;
    persOrdDv.appendChild(fNaD);
    
    var lNaD = document.createElement("h2");
    lNaD.classList.add("individual_block");
    lNaD.innerHTML = la;
    persOrdDv.appendChild(lNaD);
    
    mDv.appendChild(persOrdDv);
};

var renderRptInfo = function(fir, las, geN,rptN, miDv){
    var rptDiv = document.createElement("div");
    
    var rptNa = document.createElement("div");
    var rptFNm = document.createElement("div");
    rptFNm.classList.add("individual_block_first");
    rptFNm.innerHTML = fir;
    rptNa.appendChild(rptFNm);
    
    var rptLNm = document.createElement("div");
    rptLNm.classList.add("individual_block");
    rptLNm.innerHTML = las;
    rptNa.appendChild(rptLNm);
    rptDiv.appendChild(rptNa);
    
    var rptOd = document.createElement("div");
    var rptO = document.createElement("div");
    rptO.classList.add("individual_block_first");
    rptO.innerHTML = rptN;
    rptOd.appendChild(rptO);
    
    var rptGn = document.createElement("div");
    rptGn.classList.add("individual_block");
    rptGn.innerHTML = geN;
    rptOd.appendChild(rptGn);
    
    rptDiv.appendChild(rptOd);
    miDv.appendChild(rptDiv);
};

var renderMailAddressHead = function(malDv){
  var mailTo = document.createElement("div");
  mailTo.innerHTML = "Mail the Report to the following Address:";
  malDv.appendChild(mailTo);
};

var renderMailName = function(min, maDi){
    var maDiv = document.createElement("div");
    maDiv.innerHTML = min;
    maDi.appendChild(maDiv);
};

var renderMailAddress = function(mAd, miDi){
    var maiDi = document.createElement("div");
    maiDi.innerHTML = mAd;
    miDi.appendChild(maiDi);
};

var renderMailDestin = function(mCi,mSta, mZi, mlD){
    var destDv = document.createElement("div");
    
    var citDv = document.createElement("div");
    citDv.classList.add("individual_block_first");
    citDv.innerHTML = mCi;
    destDv.appendChild(citDv);
    
    var staDv = document.createElement("div");
    staDv.classList.add("individual_block");
    staDv.innerHTML = mSta;
    destDv.appendChild(staDv);
    
    var zpDv = document.createElement("div");
    zpDv.classList.add("individual_block");
    zpDv.innerHTML = mZi;
    destDv.appendChild(zpDv);
    
    mlD.appendChild(destDv);
};
var renderEmailOrder = function(odeKey){
    var emailOrdr = DB.child("AncestryRpt");
    emailOrdr.orderByKey().equalTo(odeKey).on("value",function(snapshot){
        snapshot.forEach(function(childSnapshot){
            var emNam = childSnapshot.val().emailName;
            var emAddr = childSnapshot.val().emailAddress;
            var rFNam = childSnapshot.val().firstName;
            var rLNam = childSnapshot.val().lastName;
            var rrptNam = childSnapshot.val().rptName;
            var rrptGn = childSnapshot.val().rptGen;
            renderEmail(emNam,emAddr,rFNam,rLNam,rrptNam,rrptGn);
        });
    });
};

var renderEmail = function(eN, eA, rF,rL, rN, rGe){
    var emailSource = document.getElementById("emailOrders");
    var indEmailOrder = document.createElement("div");
    renderOrdHead(rF, rL, indEmailOrder);
    renderEmailN(eN, indEmailOrder);
    renderEmailA(eA, indEmailOrder);
    renderRptInfo(rF,rL,rGe,rN,indEmailOrder);
    emailSource.appendChild(indEmailOrder);
};

var renderEmailN = function(eNa,emD){
    var emDiv = document.createElement("div");
    emDiv.innerHTML = eNa;
    emD.appendChild(emDiv);
};

var renderEmailA = function(eAdd, emDi){
    var emADv = document.createElement("div");
    emADv.innerHTML = eAdd;
    emDi.appendChild(emADv);
};

var renderPickupOrder = function(ordrKey){
    var pckupOrdr = DB.child("AncestryRpt");
    pckupOrdr.orderByKey().equalTo(ordrKey).on("value",function(snapshot){
        snapshot.forEach(function(childSnapshot){
            var rFNm = childSnapshot.val().firstName;
            var rLNm = childSnapshot.val().lastName;
            var rptNm = childSnapshot.val().rptName;
            var rptGn = childSnapshot.val().rptGen;
            renderPickup(rFNm,rLNm,rptNm, rptGn);
        });
    });
};

var renderPickup = function(rFa, rLa, rRN, rRG){
     var pickupSource = document.getElementById("pickupOrders");
    var indPickupOrder = document.createElement("div");
    renderOrdHead(rFa, rLa, indPickupOrder);
    renderRptInfo(rFa,rLa,rRG, rRN,indPickupOrder);
    pickupSource.appendChild(indPickupOrder);
};

var adminAncestryRptStart = function(){
    renderAncestReportHead();
    renderHeaders();
    getAncestOrders();
};

document.addEventListener('DOMContentLoaded', adminAncestryRptStart);