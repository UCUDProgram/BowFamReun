var administr = "";
var DB = new Firebase("https://bowmanfamreun.firebaseio.com/");

var getAdministra = function(){
    administr = localStorage.getItem("admin");
    if(administr == null){
        showAdminLoginScreen();
    }
};

var getRegNames = function(){
    var regData = DB.child("Accounts");
    regData.orderByKey().on("value", function (snapshot){
        snapshot.forEach(function (childSnapshot){
            var userky = childSnapshot.val().userName;
            renderRegistrationReport(userky);
        }); 
    });
};

var getPersonRegInfo = function(key, attDv){
    var regData = DB.child("Accounts");
    regData.orderByChild("userName").equalTo(key).on("value", function(snapshot){
        snapshot.forEach(function (childSnapshot){
            var frstNam = childSnapshot.val().firstname;
            var lstNam = childSnapshot.val().lastname;
            var divNam = frstNam .concat(lstNam).concat("RegReport");
            attDv.setAttribute("id", divNam);
    
            var fnameDiv = document.createElement("div");
            fnameDiv.classList.add("individual_block_first");
            fnameDiv.innerHTML = frstNam;
            attDv.appendChild(fnameDiv);
    
            var lnameDiv = document.createElement("div");
            lnameDiv.classList.add("individual_block");
            lnameDiv.innerHTML = lstNam;
            attDv.appendChild(lnameDiv);
        });
    });
};

var getBalanceDue = function(usKy,ataD){
    var balData = DB.child("Fees");
    balData.orderByChild("userName").equalTo(usKy).on("value", function(snapshot){
        snapshot.forEach(function(childSnapshot){
            var regBalDiv = document.createElement("div");
            regBalDiv.classList.add("individual_block");
            var regDe = childSnapshot.val().regDue;
            var regPad = childSnapshot.val().regPaid;
            var regBal = +regDe - +regPad;
            if(regBal >0 ){
                regBalDiv.style.color = "Red";
            }
            regBalDiv.innerHTML = regBal;
            ataD.appendChild(regBalDiv);
        }); 
    });
};

var getAttendBreakdown = function(aKy, attachmDv){
    var infan = 0;
    var chil = 0;
    var adul = 0;
    var senio = 0;
    var attndDv = document.createElement("div");
    attndDv.classList.add("individual_block");
    var attData = DB.child("Attendees");
    attData.orderByChild("account").equalTo(aKy).once("value", function(snapshot){
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
            setAttendString(infan, chil, adul, senio, attndDv);
        }); 
    });
    attachmDv.appendChild(attndDv);
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

var renderRegistrationReport = function(usrNme){
    var div = document.getElementById("registrationReport");
    var regDiv = document.createElement("div");
    getPersonRegInfo(usrNme, regDiv);
    getAttendBreakdown(usrNme,regDiv);
    getBalanceDue(usrNme, regDiv);
    div.appendChild(regDiv);
};

var regReportStart = function(){
    getAdministra();
    renderRegisHeader();
    getRegNames();
};

document.addEventListener('DOMContentLoaded', regReportStart);