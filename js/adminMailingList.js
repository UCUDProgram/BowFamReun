var adstr = "";
var mailDB = new Firebase("https://bowmanfamreun.firebaseio.com/Mailing");

var getAdmn = function(){
    adstr = localStorage.getItem("admin");
    if(adstr == null){
        showAdminLoginScreen();
    }
};

var getMailingList = function(){
    mailDB.orderByKey().on("value", function(snapshot){
        snapshot.forEach(function (childSnapshot){
            var mFirst = childSnapshot.val().mailFirst;
            var mLast = childSnapshot.val().mailLast;
            var mAddress = childSnapshot.val().mailAddress;
            var mCity = childSnapshot.val().mailCity;
            var mState = childSnapshot.val().mailState;
            var mZip = childSnapshot.val().mailZip;
            var mPhone = childSnapshot.val().mailPhone;
            var mEmail = childSnapshot.val().mailEmail;
            if(mFirst != undefined)
                renderMailUser(mFirst,mLast,mAddress,mCity,mState,mZip,mPhone,mEmail);
        });
    });
};

// RENDERING THE SCREEN (VIEW)
var renderMailingPage = function(){
    renderAdminMailHeader();
    getMailingList();
};

var renderAdminMailHeader = function(){
    var mList = document.getElementById("adminMailHeader");
    var mListHead = document.createElement("h1");
    mListHead.innerHTML = "Mailing List";
    mList.appendChild(mListHead);
};

var renderMailUser = function(maFir,maLas,maAdd, maCit, maSta, maZip, maPho, maEma){
    var mailingSource = document.getElementById("adminMailList");
    
    var mailingDiv = document.createElement("div");
    var mailingName = maFir + maLas + "Mailing";
    mailingDiv.setAttribute("id", mailingName);
    mailingDiv.classList.add("mailingDivSpace");
    
    renderMailingRow1(maFir, maLas, mailingDiv);
    renderMailingRow2(maAdd, mailingDiv);
    renderMailingRow3(maCit, maSta, maZip, mailingDiv);
    renderMailingRow4(maPho,maEma,mailingDiv);
    
    mailingSource.appendChild(mailingDiv);
};

var renderMailingRow1 = function(indMFirs, indMLas, srcD){
    var rowOne = document.createElement("div");
    
    var mFirstN = document.createElement("div");
    mFirstN.classList.add("individual_block_first");
    mFirstN.innerHTML = indMFirs;
    rowOne.appendChild(mFirstN);
    
    var mLastN = document.createElement("div");
    mLastN.classList.add("individual_block");
    mLastN.innerHTML = indMLas;
    rowOne.appendChild(mLastN);
    
    srcD.appendChild(rowOne);
};

var renderMailingRow2 = function(indMAdd, srcDi){
    var rowTwo = document.createElement("div");
    
    var mAddrN = document.createElement("div");
    mAddrN.innerHTML = indMAdd;
    rowTwo.appendChild(mAddrN);
    
    srcDi.appendChild(rowTwo);
};

var renderMailingRow3 = function(indMCi, indMSta, indMZip,srcDiv ){
    var rowThree = document.createElement("div");
    
    var mCityN = document.createElement("div");
    mCityN.classList.add("individual_block_first");
    mCityN.innerHTML = indMCi;
    rowThree.appendChild(mCityN);
    
    var mStateN = document.createElement("div");
    mStateN.classList.add("individual_block");
    mStateN.innerHTML = indMSta;
    rowThree.appendChild(mStateN);
    
    var mZipN = document.createElement("div");
    mZipN.classList.add("individual_block");
    mZipN.innerHTML = indMZip;
    rowThree.appendChild(mZipN);
    
    srcDiv.appendChild(rowThree);
};

var renderMailingRow4 = function(indMPh, indMEm, soDi ){
    var rowFour = document.createElement("div");
    
    var mPhoneN = document.createElement("div");
    mPhoneN.classList.add("individual_block_first");
    mPhoneN.innerHTML = indMPh;
    rowFour.appendChild(mPhoneN);
    
    var mEmailN = document.createElement("div");
    mEmailN.classList.add("individual_block");
    mEmailN.innerHTML = indMEm;
    rowFour.appendChild(mEmailN);

    soDi.appendChild(rowFour);
};

var adminMailingStart = function(){
    getAdmn();
    renderMailingPage();
};

document.addEventListener('DOMContentLoaded', adminMailingStart);