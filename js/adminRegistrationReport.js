var regBalance = 0;
var administr = "";
var DB = new Firebase("https://bowmanfamreun.firebaseio.com/");

var getAdministra = function(){
    administr = localStorage.getItem("admin");
     if(administr == null){
      showAdminLoginScreen();
     }
};

var setRegBalance = function(bal){
    regBalance = bal;  
};

var getNames = function(){
  var regData = DB.child("Accounts");
  regData.orderByKey().on("value", function (snapshot){
     snapshot.forEach(function (childSnapshot){
        var firstNam = childSnapshot.val().firstname;
        var lastNam = childSnapshot.val().lastname;
        var userky = childSnapshot.val().userName;
        getBalanceDue(userky);
        renderPersonRegInfo(firstNam, lastNam, userky);
     }); 
  });
};

var getBalanceDue = function(usKy){
    var balData = DB.child("Fees");
    balData.orderByChild("userName").equalTo(usKy).on("value", function(snapshot){
       snapshot.forEach(function(childSnapshot){
          var regBal = childSnapshot.val().regDue;
          setRegBalance(regBal);
       }); 
    });
};

var getAttendBreakdown = function(aKy, attachmDv){
    var infan = 0;
    var chil = 0;
    var adul = 0;
    var senio = 0;
    var attData = DB.child("Attendees");
    attData.orderByChild("account").equalTo(aKy).on("value", function(snapshot){
       snapshot.forEach(function(childSnapshot){
          var attAge = childSnapshot.val().age;
            if (attAge == "Infant"){
                infan +=1;
            } else if (attAge == "Child"){
                chil +=1;
            } else if (attAge == "Adult"){
                adul += 1;
            } else {
                senio +=1;
            }
            setAttendString(infan, chil, adul, senio, attachmDv);
       }); 
    });
};

var setAttendString = function(infa, chi, adu, seni,attachment){
    while (attachment.firstChild)
        attachment.removeChild(attachment.firstChild);
    var atStr = "";
    var infantCountStr = infa + " Infant, ";
    var infantsCountStr = infa + " Infants, ";
    var childCountStr = chi + " Child, ";
    var childrenCountStr = chi + " Children, ";
    var adultCountStr = adu + " Adult, ";
    var adultsCountStr = adu + " Adults, ";
    var seniorCountStr = seni + " Senior, ";
    var seniorsCountStr = seni + " Seniors, ";

    if(infa > 0){
        if (infa == 1)
            atStr += infantCountStr;
        else
            atStr += infantsCountStr;
    }
    if (chi >0){
        if(chi == 1)
            atStr += childCountStr;
        else
            atStr += childrenCountStr;
    }
    if (adu >0){
        if (adu == 1)
            atStr += adultCountStr;
        else
            atStr += adultsCountStr;
    }
    if (seni > 0){
        if (seni == 1)
            atStr += seniorCountStr;
        else
            atStr += seniorsCountStr;
    }
    atStr = atStr.substring(0, atStr.length -2);    
    attachment.innerHTML = atStr;
};

// RENDERING THE SCREEN (VIEW)
var renderRegisHeader = function(){
 var div = document.getElementById("registrationReportHeader");
 var regTitle = document.createElement("h1");
 regTitle.innerHTML = "Registration Report";
 div.appendChild(regTitle);
};

var renderPersonRegInfo = function(first, last, key){
    var div = document.getElementById("registrationReport");
    
    var divNam = first.concat(last).concat("RegReport");
    var persRptDiv = document.createElement("div");
    persRptDiv.setAttribute("id", divNam);
    
    var fnamDiv = document.createElement("div");
    fnamDiv.classList.add("individual_block_first");
    fnamDiv.innerHTML = first;
    persRptDiv.appendChild(fnamDiv);
    
    var lnamDiv = document.createElement("div");
    lnamDiv.classList.add("individual_block");
    lnamDiv.innerHTML = last;
    persRptDiv.appendChild(lnamDiv);
    
    var attDiv = document.createElement("div");
    attDiv.classList.add("individual_block");
    getAttendBreakdown(key, attDiv);
    persRptDiv.appendChild(attDiv);
    
    
    var regBalDiv = document.createElement("div");
    regBalDiv.classList.add("individual_block");
    regBalDiv.innerHTML = regBalance;
    persRptDiv.appendChild(regBalDiv);
    
    div.appendChild(persRptDiv);
};


var regReportStart = function(){
    getAdministra();
    renderRegisHeader();
    getNames();
};

document.addEventListener('DOMContentLoaded', regReportStart);