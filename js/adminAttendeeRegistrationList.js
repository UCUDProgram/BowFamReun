var admn = "";
var DB = new Firebase("https://bowmanfamreun.firebaseio.com/");

var getAdmn = function(){
    admn = localStorage.getItem("admin");
     if(admn == null){
        showAdminLoginScreen();
     }
    //  if(admn != "LawAdmin"){
    //     alert("This website is in Archive mode. Your account has been permanently disabled.");
    //     showHomePageScreen();
    // }
};

var getNameList = function(){
    var clrShtRpt = document.getElementById("attendListReport");
    while(clrShtRpt.firstChild)
        clrShtRpt.removeChild(clrShtRpt.firstChild);
        
    var regData = DB.child("Accounts"); 
    regData.orderByKey().on("value", function (snapshot){
        snapshot.forEach(function (childSnapshot){
            var userFirst = childSnapshot.val().firstname;
            var userLast = childSnapshot.val().lastname; 
            var userNm = childSnapshot.val().userName;
            var div = document.createElement("div");
            renderUserName(userFirst,userLast, div); 
            getUserAttendee(userNm, div);
            clrShtRpt.appendChild(div);
        });
    });
};

var getUserAttendee = function(uName, attDiv){
    var attData = DB.child("Attendees");
    attData.orderByChild("account").equalTo(uName).on("value", function(snapshot){
        snapshot.forEach(function(childSnapshot){
            var attFirst = childSnapshot.val().firstname;
            var attLast = childSnapshot.val().lastname;
            var attAge = childSnapshot.val().age;
            var attDv = document.createElement("div");
            renderAttendee(attFirst, attLast, attAge, attDv);
            attDiv.appendChild(attDv);
        });
    });
};

// RENDERING THE SCREEN (VIEW)
var renderListHeader = function(){
    var div = document.getElementById("attendListHeader");
    var listTitle = document.createElement("h1");
    listTitle.innerHTML = "Attendee Registration List Report";
    div.appendChild(listTitle);
};

var renderAttendee = function(atFrst, atLst, attAg, atta){
    var atFirsDv = document.createElement("div");
    atFirsDv.innerHTML = atFrst;
    atFirsDv.style.display = "inline-block";
    atFirsDv.style.paddingLeft = "1em";
    atta.appendChild(atFirsDv);
    
    var atLasDv = document.createElement("div");
    atLasDv.innerHTML = atLst;
    atLasDv.style.display = "inline-block";
    atLasDv.style.paddingLeft = "1em";
    atta.appendChild(atLasDv);
    
    var atAgeDv = document.createElement("div");
    atAgeDv.innerHTML = attAg;
    atAgeDv.style.display = "inline-block";
    atAgeDv.style.paddingLeft = "1em";

    atta.appendChild(atAgeDv);
    
};

var renderUserName = function(uFirst, uLast, atDv){
    var firsDv = document.createElement("div");
    firsDv.innerHTML = uFirst;
    firsDv.style.display = "inline-block";
    firsDv.style.fontWeight = "bold";
    firsDv.style.fontSize = "28px";
    atDv.appendChild(firsDv);
    
    var lasDv = document.createElement("div");
    lasDv.innerHTML = uLast;
    lasDv.style.display = "inline-block";
    lasDv.style.paddingLeft = "1em";
    lasDv.style.fontWeight = "bold";
    lasDv.style.fontSize = "28px";

    atDv.appendChild(lasDv);
};

var shirtReportStart = function(){
    getAdmn();
    renderListHeader();
    getNameList();
};

document.addEventListener('DOMContentLoaded', shirtReportStart);