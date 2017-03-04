var shtBalance = 0;
var adm = "";
var DB = new Firebase("https://bowmanfamreun.firebaseio.com/");

var setShirtBalance = function(shBa){
    shtBalance = shBa;    
};

var getAdm = function(){
    adm = localStorage.getItem("admin");
     if(adm == null){
      showAdminLoginScreen();
     }
};
var getNames = function(){
  var regData = DB.child("Accounts");
  regData.orderByKey().on("value", function (snapshot){
     snapshot.forEach(function (childSnapshot){
        var firstNam = childSnapshot.val().firstname;
        var lastNam = childSnapshot.val().lastname;
        var userky = childSnapshot.val().userName;
        
         var attData = DB.child("TShirt");
        attData.orderByChild("account").equalTo(userky).on("value", function(snapshot){
            if(snapshot.val() != null){
                getShirtBalanceDue(userky);
                renderPersonShirtInfo(firstNam, lastNam, userky);
            }}); 
    });
    });
};

var getShirtBreakdown = function(aKy, shirtDv){
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
            shirtString(smSht,mdSht, lgSht, xlSht,xxLSht,tripxLSht, quadxLSht, shirtDv);
       }); 
    });
};

var getShirtBalanceDue = function(usKy){
    var balData = DB.child("Fees");
    balData.orderByChild("userName").equalTo(usKy).on("value", function(snapshot){
       snapshot.forEach(function(childSnapshot){
          var shtBal = childSnapshot.val().shirtDue;
          setShirtBalance(shtBal);
       }); 
    });
};

var shirtString = function(sm, med, lg, xl, xxl, xxxl, xxxxl, attachment){
    while(attachment.firstChild)
        attachment.removeChild(attachment.firstChild);
    var sString = "";
    var smallShirtStr = sm + " Small, ";
    var mediumShirtStr = med + " Medium, ";
    var largeShirtStr = lg + " Large, ";
    var xlShirtStr = xl + " XL, ";
    var xxlShirtStr = xxl + " XXL, ";
    var xxxlShirtStr = xxxl + " XXXL, ";
    var xxxxlShirtStr = xxxxl + " XXXXL Shirts. ";
    console.log(sm);
    console.log(med);
    if (sm >0)
        sString += smallShirtStr;
    if (med >0)
        sString += mediumShirtStr;
    if (lg > 0)
        sString += largeShirtStr;
    if (xl > 0)
        sString += xlShirtStr;
    if (xxl > 0)
        sString += xxlShirtStr;
    if (xxxl >0)
        sString += xxxlShirtStr;
    if (xxxxl >0)
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

var renderPersonShirtInfo = function(first, last, aky){
    var div = document.getElementById("shirtReport");
    
    var divNam = first.concat(last).concat("ShirtReport");
    var persShtDiv = document.createElement("div");
    persShtDiv.setAttribute("id", divNam);
    
    var fnamDiv = document.createElement("div");
    fnamDiv.classList.add("individual_block_first");
    fnamDiv.innerHTML = first;
    persShtDiv.appendChild(fnamDiv);
    
    var lnamDiv = document.createElement("div");
    lnamDiv.classList.add("individual_block");
    lnamDiv.innerHTML = last;
    persShtDiv.appendChild(lnamDiv);
    
    var shtDv = document.createElement("div");
    shtDv.classList.add("individual_block");
    getShirtBreakdown(aky, shtDv);
    persShtDiv.appendChild(shtDv);
   
    
    var shtBalDiv = document.createElement("div");
    shtBalDiv.classList.add("individual_block");
    shtBalDiv.innerHTML = shtBalance;
    persShtDiv.appendChild(shtBalDiv);
    
    div.appendChild(persShtDiv);
};

var shirtReportStart = function(){
    getAdm();
    renderReportHeader();
    getNames();
};

document.addEventListener('DOMContentLoaded', shirtReportStart);