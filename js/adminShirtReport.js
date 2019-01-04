var adm = "";
var usrName = "";
var TSChild = "";
var TSSmall = 0;
var TSMed = 0;
var TSLg = 0;
var TSXL = 0;
var TSXXL = 0;
var TSXXXL = 0;
var TSXXXXL = 0;
var TSFirst = "";
var TSLast = "";
var TSDue = 0;
var TSTot = 0;

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


var getNames = function(){
    var shrtRpt = document.getElementById("shirtReport");
    while(shrtRpt.firstChild)
        shrtRpt.removeChild(shrtRpt.firstChild);
    
    var regData = DB.child("Accounts"); 
    regData.orderByKey().on("value", function (snapshot){
        snapshot.forEach(function (childSnapshot){
            var userNm = childSnapshot.val().userName;
            var firstNam = childSnapshot.val().firstname;
            var lastNam = childSnapshot.val().lastname;
            var ordCont = document.createElement("div");
            var orderDiv = document.createElement("div");
            var shirtDiv = document.createElement("div");
                
            if(userNm != undefined){
                renderShirtOrderName(firstNam, lastNam, orderDiv);
                renderShirtBalance(userNm, orderDiv);
                renderShirts(userNm, shirtDiv);
                ordCont.appendChild(orderDiv);
                ordCont.appendChild(shirtDiv);
                shrtRpt.appendChild(ordCont);
            }
        });
    });
};

var renderShirts = function(uNam, shDi){
    var attData = DB.child("TShirt");
    attData.orderByChild("account").equalTo(uNam).on("value", function(snapshot){
        snapshot.forEach(function(childSnapshot){
            var chSht = childSnapshot.val().childName;
            var smSht = childSnapshot.val().small; 
            var mdSht = childSnapshot.val().medium;
            var lgSht = childSnapshot.val().large;
            var xlSht = childSnapshot.val().xL;
            var xxLSht = childSnapshot.val().xxLarge;
            var tripxLSht = childSnapshot.val().xxxLarge;
            var quadxLSht = childSnapshot.val().xxxxLarge;
            var shtDiv = document.createElement("div");
            renderIndShirtChild(chSht, shtDiv);
            renderIndOrder(+smSht, +mdSht, +lgSht, +xlSht, +xxLSht, +tripxLSht, +quadxLSht, shtDiv);
            shDi.appendChild(shtDiv);
        }); 
    });
};

var renderShirtBalance = function(uNa, attach){
    var balData = DB.child("Fees");
    balData.orderByChild("userName").equalTo(uNa).on("value", function(snapshot){
        snapshot.forEach(function(childSnapshot){
            var shtDue = childSnapshot.val().shirtDue;
            var shtPd = childSnapshot.val().shirtPaid;
            var shtBal = +shtDue - +shtPd;
            var shtBalDiv = document.createElement("h3");
            shtBalDiv.classList.add("individual_block");
            if(shtBal > 0)
                shtBalDiv.style.color = "Red";
            shtBalDiv.innerHTML = shtBal;
            attach.appendChild(shtBalDiv);
        }); 
    });
};

var renderIndOrder = function(sm, md,la, xla, xxla, xxxla, xxxxla, attachment){
    var strDiv = document.createElement("div");
    strDiv.classList.add("individual_block");
    var sString = "";
    var smallShirtStr = sm + " Small, ";
    var mediumShirtStr = md + " Medium, ";
    var largeShirtStr = la + " Large, ";
    var xlShirtStr = xla + " XL, ";
    var xxlShirtStr = xxla + " XXL, ";
    var xxxlShirtStr = xxxla + " XXXL, ";
    var xxxxlShirtStr = xxxxla + " XXXXL. ";
    if (sm >0)
        sString += smallShirtStr;
    if (md >0)
        sString += mediumShirtStr;
    if (la > 0)
        sString += largeShirtStr;
    if (xla > 0)
        sString += xlShirtStr;
    if (xxla > 0)
        sString += xxlShirtStr;
    if (xxxla >0)
        sString += xxxlShirtStr;
    if (xxxxla >0)
        sString += xxxxlShirtStr;
    
    sString = sString.substring(0, sString.length -2);
    sString += " Shirts.";
    strDiv.innerHTML = sString;
    attachment.appendChild(strDiv);
};

// RENDERING THE SCREEN (VIEW)
var renderReportHeader = function(){
    var div = document.getElementById("shirtReportHeader");
    var regTitle = document.createElement("h1");
    regTitle.innerHTML = "Shirt Report";
    div.appendChild(regTitle);
};

var renderShirtOrderName = function(first, last, atDiv){
    var fnamDiv = document.createElement("h1");
    fnamDiv.classList.add("individual_block_first");
    fnamDiv.innerHTML = first;
    atDiv.appendChild(fnamDiv);
        
    var lnamDiv = document.createElement("h1");
    lnamDiv.classList.add("individual_block");
    lnamDiv.innerHTML = last;
    atDiv.appendChild(lnamDiv);
};

var renderIndShirtChild = function(childN, shD){
    var chdNm = document.createElement("div");
    chdNm.classList.add("individual_block_first");
    chdNm.innerHTML = childN;
    shD.appendChild(chdNm);
};

var shirtReportStart = function(){
    getAdm();
    renderReportHeader();
    getNames();
};

document.addEventListener('DOMContentLoaded', shirtReportStart);