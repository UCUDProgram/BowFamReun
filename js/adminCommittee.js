var adminis = "";
var committeeDB = new Firebase("https://bowmanfamreun.firebaseio.com/Committee");

var getAdmin = function(){
    adminis = localStorage.getItem("admin");
    if(adminis == null){
        showAdminLoginScreen();
    }
    // if(adminis != "LawAdmin"){
    //     alert("This website is in Archive mode. Your account has been permanently disabled.");
    //     showHomePageScreen();
    // }
};

var getCommitteeList = function(){
    committeeDB.orderByKey().on("value", function(snapshot){
        snapshot.forEach(function (childSnapshot){
            var cFirst = childSnapshot.val().committeeFirst;
            var cLast = childSnapshot.val().committeeLast;
            var cAddress = childSnapshot.val().committeeAddress;
            var cCity = childSnapshot.val().committeeCity;
            var cState = childSnapshot.val().committeeState;
            var cZip = childSnapshot.val().committeeZip;
            var cPhone = childSnapshot.val().committeePhone;
            var cEmail = childSnapshot.val().committeeEmail;
            if(cFirst != undefined)
                renderCommitteeUser(cFirst,cLast,cAddress,cCity,cState,cZip,cPhone,cEmail);
        });
    });
};

// RENDERING THE SCREEN (VIEW)
var renderCommitteePage = function(){
    renderAdminCommitteeHeader();
    getCommitteeList();
};

var renderAdminCommitteeHeader = function(){
    var mList = document.getElementById("adminCommitteeHeader");
    var mListHead = document.createElement("h1");
    mListHead.innerHTML = "Committee Members List";
    mList.appendChild(mListHead);
};

var renderCommitteeUser = function(cFir,cLas,cAdd, cCit, cSta, cZip, cPho, cEma){
    var committeeSource = document.getElementById("adminCommitteeList");
    
    var committeeDiv = document.createElement("div");
    var committeeName = cFir + cLas + "Committee";
    committeeDiv.setAttribute("id", committeeName);
    committeeDiv.classList.add("committeeDivSpace");
    
    renderCommitteeRow1(cFir, cLas, committeeDiv);
    renderCommitteeRow2(cAdd, committeeDiv);
    renderCommitteeRow3(cCit, cSta, cZip, committeeDiv);
    renderCommitteeRow4(cPho,cEma,committeeDiv);
    
    committeeSource.appendChild(committeeDiv);
};

var renderCommitteeRow1 = function(indCFirs, indCLas, srcD){
    var rowOne = document.createElement("div");
    
    var cFirstN = document.createElement("div");
    cFirstN.classList.add("individual_block_first");
    cFirstN.innerHTML = indCFirs;
    rowOne.appendChild(cFirstN);
    
    var cLastN = document.createElement("div");
    cLastN.classList.add("individual_block");
    cLastN.innerHTML = indCLas;
    rowOne.appendChild(cLastN);
    
    srcD.appendChild(rowOne);
};

var renderCommitteeRow2 = function(indCAdd, srcDi){
    var rowTwo = document.createElement("div");
    
    var cAddrN = document.createElement("div");
    cAddrN.innerHTML = indCAdd;
    rowTwo.appendChild(cAddrN);
    
    srcDi.appendChild(rowTwo);
};

var renderCommitteeRow3 = function(indCCi, indCSta, indCZip,srcDiv ){
    var rowThree = document.createElement("div");
    
    var cCityN = document.createElement("div");
    cCityN.classList.add("individual_block_first");
    cCityN.innerHTML = indCCi;
    rowThree.appendChild(cCityN);
    
    var cStateN = document.createElement("div");
    cStateN.classList.add("individual_block");
    cStateN.innerHTML = indCSta;
    rowThree.appendChild(cStateN);
    
    var cZipN = document.createElement("div");
    cZipN.classList.add("individual_block");
    cZipN.innerHTML = indCZip;
    rowThree.appendChild(cZipN);
    
    srcDiv.appendChild(rowThree);
};

var renderCommitteeRow4 = function(indCPh, indCEm, soDi ){
    var rowFour = document.createElement("div");
    
    var cPhoneN = document.createElement("div");
    cPhoneN.classList.add("individual_block_first");
    cPhoneN.innerHTML = indCPh;
    rowFour.appendChild(cPhoneN);
    
    var cEmailN = document.createElement("div");
    cEmailN.classList.add("individual_block");
    cEmailN.innerHTML = indCEm;
    rowFour.appendChild(cEmailN);

    soDi.appendChild(rowFour);
};

var adminMailingStart = function(){
    getAdmin();
    renderCommitteePage();
};

document.addEventListener('DOMContentLoaded', adminMailingStart);