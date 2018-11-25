var adm = "";
var DB = new Firebase("https://bowmanfamreun.firebaseio.com/");

var getAdm = function(){
    adm = localStorage.getItem("admin");
    if(adm == null){
        showAdminLoginScreen();
    }
    // if(adm != "LawAdmin"){
    //     alert("This website is in Archive mode. Your account has been permanently disabled.");
    //     showHomePageScreen();
    // }
};

var getShirtOrderName = function(usNm, attach){
    var attData = DB.child("Accounts");
    attData.orderByChild("userName").equalTo(usNm).on("value", function(snapshot){
        snapshot.forEach(function (childSnapshot){
            var firstNam = childSnapshot.val().firstname;
            var lastNam = childSnapshot.val().lastname;
        
            var fnamDiv = document.createElement("td");
            // fnamDiv.classList.add("individual_block_first");
            fnamDiv.innerHTML = firstNam;
            attach.appendChild(fnamDiv);
        
            var lnamDiv = document.createElement("td");
            // lnamDiv.classList.add("individual_block");
            lnamDiv.innerHTML = lastNam;
            attach.appendChild(lnamDiv);
        });
    });
};

var getShirtOrder = function (aUser, attach){
    var shtData = DB.child("TShirt");
    shtData.orderByChild("account").equalTo(aUser).once("value", function(snapshot){
        snapshot.forEach(function(childSnapshot){
            var shtDv = document.createElement("td");
            // shtDv.classList.add("individual_block");
            var smSh = +childSnapshot.val().small; 
            var mdSh = +childSnapshot.val().medium;
            var lgSh = +childSnapshot.val().large;
            var xlSh = +childSnapshot.val().xL;
            var xxLSh = +childSnapshot.val().xxLarge;
            var tripxLSh = +childSnapshot.val().xxxLarge;
            var quadxLSh = +childSnapshot.val().xxxxLarge;
            shirtString(smSh, mdSh, lgSh, xlSh, xxLSh, tripxLSh, quadxLSh,shtDv);
            attach.appendChild(shtDv);
        }); 
    });
};

var getNames = function(){
    var clrShtRpt = document.getElementById("shirtReport");
    while(clrShtRpt.firstChild)
        clrShtRpt.removeChild(clrShtRpt.firstChild);
        
    var regData = DB.child("Accounts"); 
    regData.orderByKey().on("value", function (snapshot){
        snapshot.forEach(function (childSnapshot){
            var userNm = childSnapshot.val().userName;
            getShirtBreakdown(userNm);
        });
    });
};

var getShirtBreakdown = function(aKy){
    var attData = DB.child("TShirt");
    attData.orderByChild("account").equalTo(aKy).on("value", function(snapshot){
        snapshot.forEach(function(childSnapshot){
            var smSht = childSnapshot.val().small; 
            var mdSht = childSnapshot.val().medium;
            var lgSht = childSnapshot.val().large;
            var xlSht = childSnapshot.val().xL;
            var xxLSht = childSnapshot.val().xxLarge;
            var tripxLSht = childSnapshot.val().xxxLarge;
            var quadxLSht = childSnapshot.val().xxxxLarge;
            var shirtTot = +smSht + +mdSht + +lgSht + +xlSht + +xxLSht + +tripxLSht + +quadxLSht;
            if (shirtTot > 0)
                renderOrder(aKy);
        }); 
    });
};

var getShirtBalanceDue = function(usKy, attach){
    var balData = DB.child("Fees");
    balData.orderByChild("userName").equalTo(usKy).on("value", function(snapshot){
        snapshot.forEach(function(childSnapshot){
            var shtBalDiv = document.createElement("td");
            // shtBalDiv.classList.add("individual_block");
            var shtDue = childSnapshot.val().shirtDue;
            var shtPd = childSnapshot.val().shirtPaid;
            var shtBal = +shtDue - +shtPd;
            if(shtBal > 0)
                shtBalDiv.style.color = "Red";
            shtBalDiv.innerHTML = shtBal;
            attach.appendChild(shtBalDiv);
        }); 
    });
};

var shirtString = function(sSm, sMd, sLg, sxL, sxxL, sxxxL, sxxxxL,attachment){
    while(attachment.firstChild)
        attachment.removeChild(attachment.firstChild);
    var sString = "";
    var smallShirtStr = sSm + " Small, ";
    var mediumShirtStr = sMd + " Medium, ";
    var largeShirtStr = sLg + " Large, ";
    var xlShirtStr = sxL + " XL, ";
    var xxlShirtStr = sxxL + " XXL, ";
    var xxxlShirtStr = sxxxL + " XXXL, ";
    var xxxxlShirtStr = sxxxxL + " XXXXL Shirts. ";
    if (sSm >0)
        sString += smallShirtStr;
    if (sMd >0)
        sString += mediumShirtStr;
    if (sLg > 0)
        sString += largeShirtStr;
    if (sxL > 0)
        sString += xlShirtStr;
    if (sxxL > 0)
        sString += xxlShirtStr;
    if (sxxxL >0)
        sString += xxxlShirtStr;
    if (sxxxxL >0)
        sString += xxxxlShirtStr;
    
    sString = sString.substring(0, sString.length -2);
    sString += " Shirts.";
    attachment.innerHTML = sString;
};

// RENDERING THE SCREEN (VIEW)
var renderReportHeader = function(){
    var div = document.getElementById("shirtReportHeader");
    var regTitle = document.createElement("h1");
    regTitle.innerHTML = "Shirt Report";
    div.appendChild(regTitle);
};

var renderOrder = function(usR){
    var div = document.getElementById("shirtReport");
    var persSht = document.createElement("table");
    var persShtDiv = document.createElement("tr");
    
    getShirtOrderName(usR,persShtDiv);
    getShirtOrder(usR, persShtDiv);
    getShirtBalanceDue(usR, persShtDiv);
    persSht.appendChild(persShtDiv);
    div.appendChild(persSht);
};

var shirtReportStart = function(){
    getAdm();
    renderReportHeader();
    getNames();
};

document.addEventListener('DOMContentLoaded', shirtReportStart);