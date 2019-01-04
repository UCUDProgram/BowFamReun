var userAcct = "";
var admAct = "";
var accountDB = new Firebase("https://bowmanfamreun.firebaseio.com/Accounts");
var shirtsDB = new Firebase("https://bowmanfamreun.firebaseio.com/TShirt");
var attendDB = new Firebase("https://bowmanfamreun.firebaseio.com/Attendees");
var feeDB = new Firebase("https://bowmanfamreun.firebaseio.com/Fees");
var useDB = new Firebase("https://bowmanfamreun.firebaseio.com/Users");
var DB = new Firebase("https://bowmanfamreun.firebaseio.com/");

var setUserAccount = function(usAct){
  userAcct = usAct;  
};

var setAdmAct = function(){
    admAct = localStorage.getItem("admin");
    if(admAct == null){
        showAdminLoginScreen();
    }
    // if(admAct != "LawAdmin"){
    //     alert("This website is in Archive mode. Your account has been permanently disabled.");
    //     showHomePageScreen();
    // }
};

//THIS SECTION ADDRESSES THE SEARCH PAGE VIEW
var persFirst = "";
var persLast = "";
var persList = [];

var setPersFirst = function(newFirst){
    persFirst = newFirst;  
};

var setPersLast = function(newLast){
    persLast = newLast;    
};

var getFirstNames = function(){
    accountDB.orderByChild("firstname").equalTo(persFirst).on("value", function(snapshot){
        snapshot.forEach(function(childSnapshot){
            var acctKy = childSnapshot.val().userName;
            var index_of_uFirstNm = persList.indexOf(acctKy);
            if(index_of_uFirstNm == -1)
                persList.push(acctKy);
        });
    });
};

var getLastNames = function(){
    accountDB.orderByChild("lastname").equalTo(persLast).on("value", function(snapshot){
        snapshot.forEach(function(childSnapshot){
            var accoutKy = childSnapshot.val().userName;
            var index_of_uLastNm = persList.indexOf(accoutKy);
            if(index_of_uLastNm == -1)
                persList.push(accoutKy);
        });
    });
};

var removeChangedValue = function(nameCat, oldUser){
    accountDB.orderByChild(nameCat).equalTo(oldUser).on("value", function(snapshot){
        snapshot.forEach(function(childSnapshot){
            var acctKy = childSnapshot.val().userName;
            var index_of_userNm = persList.indexOf(acctKy);
            if(index_of_userNm > -1)
                persList.splice(index_of_userNm,1);
        });
    });
};

var renderPersonSearchView = function(){
    var resu = document.getElementById("searchResults");
    while(resu.firstChild)
        resu.removeChild(resu.firstChild);
    var perVie = document.getElementById("personView");
    while(perVie.firstChild)
        perVie.removeChild(perVie.firstChild);
    var perEdi = document.getElementById("personEdit");
    while(perEdi.firstChild)
        perEdi.removeChild(perEdi.firstChild);
    renderPersonSearch();
};

var renderPersonSearch = function(){
    renderSearchHeader();
    renderPersonFirstSearch();
    renderPersonLastSearch();
    renderPersonSearchButton();
};

var renderSearchHeader = function(){
    var srcDiv = document.getElementById("personSearch");
    var searchHead = document.createElement("h1");
    searchHead.innerHTML = "Search for Registered Members";
    srcDiv.appendChild(searchHead);
};

var renderPersonFirstSearch = function(){
    var orDiv = document.getElementById("personSearch");
  
    var dv = document.createElement("div");
    dv.classList.add("individual_block_first");
  
    var fNamLbl = document.createElement("label");
    fNamLbl.setAttribute("for", "persFName");
    fNamLbl.innerHTML = "First Name: ";
    dv.appendChild(fNamLbl);

    var fNamIpt = document.createElement("input");
    fNamIpt.setAttribute("type", "text");
    fNamIpt.setAttribute("id", "persFName");
    fNamIpt.addEventListener("blur", function(ev){
        removeChangedValue("firstname", persFirst);
        setPersFirst(document.getElementById("persFName").value);
        getFirstNames();
        getLastNames();
    });
    dv.appendChild(fNamIpt);
    orDiv.appendChild(dv);
};

var renderPersonLastSearch = function(){
    var oDiv = document.getElementById("personSearch");
  
    var ldv = document.createElement("div");
    ldv.classList.add("individual_block");
  
    var lNamLbl = document.createElement("label");
    lNamLbl.setAttribute("for", "persLName");
    lNamLbl.innerHTML = "Last Name: ";
    ldv.appendChild(lNamLbl);
  
    var lNamIpt = document.createElement("input");
    lNamIpt.setAttribute("type", "text");
    lNamIpt.setAttribute("id", "persLName");
    lNamIpt.addEventListener("blur", function(ev){
        removeChangedValue("lastname", persLast);
        setPersLast(document.getElementById("persLName").value);
        getLastNames();
        getFirstNames();
    });
    ldv.appendChild(lNamIpt);
    oDiv.appendChild(ldv);
};

var renderPersonSearchButton = function(){
    var oBDiv = document.getElementById("personSearch");
    var persSearchBtn = document.createElement("button");
    persSearchBtn.setAttribute("type", "button");
    persSearchBtn.setAttribute("id", "personQuery");
    persSearchBtn.innerHTML = "Search Person";
    persSearchBtn.addEventListener("click", function(ev){
        getResults();
    });
    oBDiv.appendChild(persSearchBtn);
};

//THIS SECTION ADDRESSES THE RESULTS PAGE VIEW

var getResults = function(){
    var dv = document.getElementById("searchResults");
    while(dv.firstChild)
        dv.removeChild(dv.firstChild);
    renderResultsHeader();
    persList.forEach(function (userN){
        accountDB.orderByChild("userName").equalTo(userN).on("value", function(snapshot){
            snapshot.forEach(function(childSnapshot){
                var fNm = childSnapshot.val().firstname;
                var lNm = childSnapshot.val().lastname;
                renderIndivResult(fNm, lNm, userN);
            }); 
        });
    });
};

var renderResultsHeader = function(){
    var srcDiv = document.getElementById("searchResults");
    var resultsHead = document.createElement("h1");
    resultsHead.innerHTML = "Results";
    srcDiv.appendChild(resultsHead);
};

var renderIndivResult = function(frstNm, lstNm, usrN){
    var indDv = document.getElementById("searchResults");
    var perDv = document.createElement("div");
    var divName = frstNm.concat(lstNm).concat("Record");
    perDv.setAttribute("id", divName);
    
    var fNDv = document.createElement("div");
    fNDv.classList.add("individual_block_first");
    fNDv.innerHTML = frstNm;
    perDv.appendChild(fNDv);
    
    var lNDv = document.createElement("div");
    lNDv.classList.add("individual_block");
    lNDv.innerHTML = lstNm;
    perDv.appendChild(lNDv);
    
    var persSelectBtn = document.createElement("button");
    persSelectBtn.classList.add("individual_block");
    persSelectBtn.setAttribute("type", "button");
    persSelectBtn.setAttribute("id", "personSelect");
    persSelectBtn.innerHTML = "View Person";
    persSelectBtn.addEventListener("click", function(ev){
        setUserAccount(usrN);
        getRecord();
    });
    perDv.appendChild(persSelectBtn);
    indDv.appendChild(perDv);
};

//THIS SECTION ADDRESSES THE VIEWING OF AN ACCOUNT
var getRecord = function(){
    var viewClr = document.getElementById("personView");
    while (viewClr.firstChild)
        viewClr.removeChild(viewClr.firstChild);
    
    personViewInitialize();
    
    document.getElementById("personSearch").classList.add("hidden");
    document.getElementById("searchResults").classList.add("hidden");
    document.getElementById("personEdit").classList.add("hidden");
    renderPersonEditButton();
    renderBackButton();
    renderDeleteRecordButton();
    getPersonInfo();
    getPersonAttendeesList();
    getPersonShirtOrders();
};

var personViewInitialize = function(){
    var viewSrc = document.getElementById("personView");
    
    var navDiv = document.createElement("div");
    navDiv.setAttribute("id","personViewNav");
    viewSrc.appendChild(navDiv); 
   
    var conDiv = document.createElement("div");
    conDiv.setAttribute("id","personViewContact");
    viewSrc.appendChild(conDiv);
        
    var attDiv = document.createElement("div");
    attDiv.setAttribute("id","personViewAttendees");
    viewSrc.appendChild(attDiv);

    var shtDiv = document.createElement("div");
    shtDiv.setAttribute("id","personViewShirts");
    viewSrc.appendChild(shtDiv);
};

var getPersonInfo = function(){
    accountDB.orderByChild("userName").equalTo(userAcct).on("value", function(snapshot){
        snapshot.forEach(function(childSnapshot){
            var fName = childSnapshot.val().firstname;
            var lName = childSnapshot.val().lastname;
            var addre = childSnapshot.val().address;
            var cty = childSnapshot.val().city;
            var st = childSnapshot.val().state;
            var zp = childSnapshot.val().zip;
            var phn = childSnapshot.val().phone;
            var emal = childSnapshot.val().email;
            renderPersonInfo(fName, lName,addre, cty, st, zp, phn, emal);
        });
    });  
};

var getPersonAttendeesList = function(){
    var originDv = document.getElementById("personViewAttendees");
    var sourceDv = document.createElement("div");
    
    var attendHead = document.createElement("h3");
    attendHead.innerHTML = "Attendees";
    sourceDv.appendChild(attendHead);
    
    attendDB.orderByChild("account").equalTo(userAcct).on("value", function(snapshot){
        snapshot.forEach(function(childSnapshot){
            var attFirst = childSnapshot.val().firstname;
            var attLast = childSnapshot.val().lastname;
            var attAge = childSnapshot.val().age;
            renderAttendent(attFirst, attLast, attAge, sourceDv);
        });
    });
    originDv.appendChild(sourceDv);
};

var getPersonShirtOrders = function(){
    
     var origDv = document.getElementById("personViewShirts");
    
    var shirtHead = document.createElement("h3");
    shirtHead.innerHTML = "Shirt Orders";
    origDv.appendChild(shirtHead);
    
    shirtsDB.orderByChild("account").equalTo(userAcct).on("value", function(snapshot){
        snapshot.forEach(function(childSnapshot){
            var persNm = childSnapshot.val().childName;
            var persSm = childSnapshot.val().small;
            var persMd = childSnapshot.val().medium;
            var persLg = childSnapshot.val().large;
            var persXL = childSnapshot.val().xL;
            var persxxL = childSnapshot.val().xxLarge;
            var persxxxL = childSnapshot.val().xxxLarge;
            var persxxxxL = childSnapshot.val().xxxxLarge;
            renderShirtOrder(persNm, persSm, persMd, persLg, persXL, persxxL, persxxxL, persxxxxL);
        }); 
    });  
};

var renderPersonInfo = function(fn,ln, ad, cy, sa, zi, ph, em){
    var div = document.getElementById("personViewContact");
    var personInfoDiv = document.createElement("div");
    
    var infoHead = document.createElement("h3");
    infoHead.innerHTML = "Contact Information";
    personInfoDiv.appendChild(infoHead);
    
    renderPersName(fn, ln, personInfoDiv);
    renderPersAddr(ad, personInfoDiv);
    renderPersMailAddr(cy, sa, zi, personInfoDiv);
    renderPersContact(ph, em, personInfoDiv);
    div.appendChild(personInfoDiv);
};

var renderPersName = function(first, last, aDiv){
    var namDv = document.createElement("div");
    
    var fnmDv = document.createElement("div");
    fnmDv.classList.add("individual_block_first");
    fnmDv.innerHTML = "First Name: " + first;
    namDv.appendChild(fnmDv);
    
    var lnmDv = document.createElement("div");
    lnmDv.classList.add("individual_block");
    lnmDv.innerHTML = "Last Name: " + last;
    namDv.appendChild(lnmDv);
    aDiv.appendChild(namDv);
};

var renderPersAddr = function(addre, adv){
    var adDv = document.createElement("div");
  
    var addrDv = document.createElement("div");
    addrDv.innerHTML = "Address: " + addre;
    adDv.appendChild(addrDv);
    adv.appendChild(adDv);
};

var renderPersMailAddr = function(cit,sta,zipC, peDi){
    var mailDv = document.createElement("div");
  
    var citDv = document.createElement("div");
    citDv.classList.add("individual_block_first");
    citDv.innerHTML = "City: " + cit;
    mailDv.appendChild(citDv);
  
    var stDv = document.createElement("div");
    stDv.classList.add("individual_block");
    stDv.innerHTML = "State: " + sta;
    mailDv.appendChild(stDv);
  
    var zpDv = document.createElement("div");
    zpDv.classList.add("individual_block");
    zpDv.innerHTML = "Zipcode: " + zipC;
    mailDv.appendChild(zpDv);
    peDi.appendChild(mailDv);
};

var renderPersContact = function(phon, emai, perDiv){
    var conDv = document.createElement("div");
  
    var phonDv = document.createElement("div");
    phonDv.classList.add("individual_block_first");
    phonDv.innerHTML = "Phone Number: " + phon;
    conDv.appendChild(phonDv);
  
    var emalDv = document.createElement("div");
    emalDv.classList.add("individual_block");
    emalDv.innerHTML = "Email Address: " + emai;
    conDv.appendChild(emalDv);
    perDiv.appendChild(conDv);
};

var renderShirtOrder = function(cN, sm, me, lg, xl, xxl, xxxl, xxxxl){
    var shrtSrc = document.getElementById("personViewShirts");
    var shrtDv = document.createElement("div");
  
    var chld = document.createElement("div");
    chld.classList.add("individual_block_first");
    chld.innerHTML = cN;
    shrtDv.appendChild(chld);
  
    var smll = document.createElement("div");
    smll.innerHTML = sm + " Small Shirts";
    smll.classList.add("individual_block");
    shrtDv.appendChild(smll);
  
    var mdm = document.createElement("div");
    mdm.classList.add("individual_block");
    mdm.innerHTML = me + " Medium Shirts";
    shrtDv.appendChild(mdm);
  
    var lrg = document.createElement("div");
    lrg.classList.add("individual_block");
    lrg.innerHTML = lg + " Large Shirts";
    shrtDv.appendChild(lrg);
  
    var xlrg = document.createElement("div");
    xlrg.classList.add("individual_block");
    xlrg.innerHTML = xl + " XL Shirts";
    shrtDv.appendChild(xlrg);
  
    var xxlrg = document.createElement("div");
    xxlrg.classList.add("individual_block");
    xxlrg.innerHTML = xxl + " XXL Shirts";
    shrtDv.appendChild(xxlrg);
  
    var xxxlrg = document.createElement("div");
    xxxlrg.classList.add("individual_block");
    xxxlrg.innerHTML = xxxl + " XXXL Shirts";
    shrtDv.appendChild(xxxlrg);
  
    var xxxxlrg = document.createElement("div");
    xxxxlrg.classList.add("individual_block");
    xxxxlrg.innerHTML = xxxxl + " XXXXL Shirts";
    shrtDv.appendChild(xxxxlrg);
    
    shrtSrc.appendChild(shrtDv);
};

var renderAttendent = function(attFirst, attLast, attAge, attDv){
    var persDv = document.createElement("div");
 
    var atFirDv = document.createElement("div");
    atFirDv.classList.add("individual_block_first");
    atFirDv.innerHTML = attFirst;
    persDv.appendChild(atFirDv);
    
    var atLasDv = document.createElement("div");
    atLasDv.classList.add("individual_block");
    atLasDv.innerHTML = attLast;
    persDv.appendChild(atLasDv);
    
    var atAgeDv = document.createElement("div");
    atAgeDv.classList.add("individual_block");
    atAgeDv.innerHTML = attAge;
    persDv.appendChild(atAgeDv);
    
    attDv.appendChild(persDv);
};

var renderPersonEditButton = function(){
    var oBDiv = document.getElementById("personViewNav");
    var persEditBtn = document.createElement("button");
    persEditBtn.setAttribute("type", "button");
    persEditBtn.setAttribute("id", "personEditBut");
    persEditBtn.innerHTML = "Edit Person";
    persEditBtn.addEventListener("click", function(ev){
        getEditRecord();
    });
    oBDiv.appendChild(persEditBtn);
};

var renderBackButton = function(){
    var oBDiv = document.getElementById("personViewNav");
    var persEditBtn = document.createElement("button");
    persEditBtn.setAttribute("type", "button");
    persEditBtn.setAttribute("id", "persList");
    persEditBtn.innerHTML = "Return to Results";
    persEditBtn.addEventListener("click", function(ev){
        var remView = document.getElementById("personView");
        while(remView.firstChild)
            remView.removeChild(remView.firstChild);
        document.getElementById("personSearch").classList.remove("hidden");
        document.getElementById("searchResults").classList.remove("hidden");
    });
    oBDiv.appendChild(persEditBtn);
};

var deleteContactKey = function(){
    accountDB.orderByChild("userName").equalTo(userAcct).on("value", function(snapshot){
        snapshot.forEach(function(childSnapshot){
            var accountKey = childSnapshot.key();
            deleteContact(accountKey);
        });
    });
};

var deleteContact = function(conta){
    accountDB.child(conta).remove();
};

var deleteShirtKey = function(){
    shirtsDB.orderByChild("account").equalTo(userAcct).on("value", function(snapshot){
        snapshot.forEach(function(childSnapshot){
            var shirtKey = childSnapshot.key();
            deleteShirt(shirtKey);
        });
    });
};

var deleteShirt = function(shrt){
    shirtsDB.child(shrt).remove();
};

var deleteAttendeesKeys = function(){
    attendDB.orderByChild("account").equalTo(userAcct).on("value", function(snapshot){
        snapshot.forEach(function(childSnapshot){
            var attKey = childSnapshot.key();
            deleteAttendees(attKey);
        });
    });
};

var deleteAttendees = function(attnd){
    attendDB.child(attnd).remove(); 
};

var deleteUserKey = function(){
    var userData = DB.child("Users");
    userData.orderByChild("userName").equalTo(userAcct).on("value", function(snapshot){
        snapshot.forEach(function(childSnapshot){
            var urKy = childSnapshot.key();
            deleteUser(urKy);
        });
    });
};

var deleteUser = function(usrKy){
    useDB.child(usrKy).remove();
};

var deleteFeesKey = function(){
    feeDB.orderByChild("userName").equalTo(userAcct).once("value").then(function(snapshot){
        snapshot.forEach(function(childSnapshot){
            var feesKey = childSnapshot.key();
            deleteFees(feesKey);
        });
    });
};

var deleteFees = function(feKy){
    feeDB.child(feKy).remove();
};

var deleteEntireRecord = function(){
    deleteContactKey();
    deleteUserKey();
    deleteFeesKey();
    deleteShirtKey();
    deleteAttendeesKeys();
};

var renderDeleteRecordButton = function(){
    var oBDiv = document.getElementById("personViewNav");
    var persDelBtn = document.createElement("button");
    persDelBtn.setAttribute("type", "button");
    persDelBtn.setAttribute("id", "persDelete");
    persDelBtn.innerHTML = "Delete Entire Record";
    persDelBtn.addEventListener("click", function(ev){
        deleteEntireRecord();
        var remView = document.getElementById("personView");
        while(remView.firstChild)
            remView.removeChild(remView.firstChild);
        document.getElementById("personSearch").classList.remove("hidden");
        document.getElementById("searchResults").classList.remove("hidden");
        var remRes = document.getElementById("searchResults");
        while(remRes.firstChild)
            remRes.removeChild(remRes.firstChild);
        getResults();
    });
    oBDiv.appendChild(persDelBtn);
};


// THIS SECTION ADDRESSES THE EDIT VIEW OF AN ACCOUNT
var newFirstName = "";
var newLastName = "";
var newAddress = "";
var newCity = "";
var newState = "";
var newZipCode = "";
var newEmail = "";
var newPhone = "";
var newNameShirt = "";
var newSmallShirt = 0;
var newMediumShirt = 0;
var newLargeShirt = 0;
var newXLShirt = 0;
var newXXLShirt = 0;
var newXXXLShirt = 0;
var newXXXXLShirt = 0;
var newShirtOrder =0;
var childCounter = 0;
var adultCounter = 0;
var newAttendantOrder = 0;

var updateFirstName = function(newFrNm){
    newFirstName = newFrNm;    
};

var updateLastName = function(newLstNm){
    newLastName = newLstNm;    
};

var updateAddress = function(newAddr){
    newAddress = newAddr;  
};

var updateCity = function(newCty){
    newCity = newCty;  
};

var updateState = function(newSt){
    newState = newSt;  
};

var updateZip = function(newZp){
    newZipCode = newZp;  
};

var updateEmail = function(newEma){
    newEmail = newEma;  
};

var updatePhone = function(newPhn){
    newPhone = newPhn;  
};

var updateShirtName = function(newNm){
    newNameShirt = newNm;    
};

var updateSmallShirt = function(newSm){
    newSmallShirt = newSm;
};

var updateMediumShirt = function(newMd){
    newMediumShirt = newMd;
};

var updateLgShirt = function(newLg){
    newLargeShirt = newLg;
};

var updateXLShirt = function(newXLg){
    newXLShirt = newXLg;
};

var updateXXLShirt = function(newXXLg){
    newXXLShirt = newXXLg;
};

var updateXXXLShirt = function(newXXXLg){
    newXXXLShirt = newXXXLg;
};

var updateXXXXLShirt = function(newXXXXLg){
    newXXXXLShirt = newXXXXLg;
};

var getPersonEditInfo = function(){
    accountDB.orderByChild("userName").equalTo(userAcct).on("value", function(snapshot){
        snapshot.forEach(function(childSnapshot){
            var fName = childSnapshot.val().firstname;
            var lName = childSnapshot.val().lastname;
            var addre = childSnapshot.val().address;
            var cty = childSnapshot.val().city;
            var st = childSnapshot.val().state;
            var zp = childSnapshot.val().zip;
            var phn = childSnapshot.val().phone;
            var emal = childSnapshot.val().email;
            var infoKey = childSnapshot.key();
            updateFirstName(fName);
            updateLastName(lName);
            updateAddress(addre);
            updateCity(cty);
            updateState(st);
            updateZip(zp);
            updatePhone(phn);
            updateEmail(emal);
            renderPersonEdit(infoKey);
        });
    });  
};

var getPersonShirtEditOrder = function(){
    renderPersonShirtHeader();
    shirtsDB.orderByChild("account").equalTo(userAcct).on("value", function(snapshot){
        snapshot.forEach(function(childSnapshot){
            var persNam = childSnapshot.val().childName;
            var persSma = childSnapshot.val().small;
            var persMed = childSnapshot.val().medium;
            var persLag = childSnapshot.val().large;
            var persXLa = childSnapshot.val().xL;
            var persxxLa = childSnapshot.val().xxLarge;
            var persxxxLa = childSnapshot.val().xxxLarge;
            var persxxxxLa = childSnapshot.val().xxxxLarge;
            var perKey = childSnapshot.key();
            updateShirtName(persNam);
            updateSmallShirt(persSma);
            updateMediumShirt(persMed);
            updateLgShirt(persLag);
            updateXLShirt(persXLa);
            updateXXLShirt(persxxLa);
            updateXXXLShirt(persxxxLa);
            updateXXXXLShirt(persxxxxLa);
            renderShirtEditOrder(persNam,perKey);
        }); 
    });  
};

var getAssocAttend = function(){
    renderAttendeesEditHeader();
    attendDB.orderByChild("account").equalTo(userAcct).on("value", function(snapshot){
        snapshot.forEach(function(childSnapshot){
            var indFirst = childSnapshot.val().firstname;
            var indLast = childSnapshot.val().lastname;
            var indAge = childSnapshot.val().age;
            var indKey = childSnapshot.key();
            renderIndAttend(indFirst, indLast, indAge, indKey);
        });
    });
};

var getAttendCount = function(){
    attendDB.orderByChild("account").equalTo(userAcct).on("value", function(snapshot){
        snapshot.forEach(function(childSnapshot){
            var indAge = childSnapshot.val().age;
            updateAgeTotals(indAge);
        });
    });
};

var getEditRecord = function(){
    document.getElementById("personSearch").classList.add("hidden");
    document.getElementById("searchResults").classList.add("hidden");
    document.getElementById("personView").classList.add("hidden");
    document.getElementById("personEdit").classList.remove("hidden");
    renderEditScreen();
};

var renderEditScreen = function(){
    personEditInitialize();
    headerButtons();
    getPersonEditInfo();
    renderNewAttendant();
    getAssocAttend();
    renderNewShirtOrder();
    getPersonShirtEditOrder();
};

var personEditInitialize = function(){
    var editSrc = document.getElementById("personEdit");
    
    var editNav = document.createElement("div");
    editNav.setAttribute("id", "personEditNav");
    editSrc.appendChild(editNav);
    
    var editCon = document.createElement("div");
    editCon.setAttribute("id", "personEditCon");
    editSrc.appendChild(editCon);
    
    var editAtt = document.createElement("div");
    editAtt.setAttribute("id", "personEditAtt");
    editSrc.appendChild(editAtt);
    
    var editSht = document.createElement("div");
    editSht.setAttribute("id","personEditSht");
    editSrc.appendChild(editSht);
};

var clearAllScreen = function(){
    var sourceScreen = document.getElementById("personEdit");
    while(sourceScreen.firstChild)
        sourceScreen.removeChild(sourceScreen.firstChild);
};

var resetAttendVar = function(){
    childCounter = 0;
    adultCounter = 0;
    newAttendantOrder = 0;
};

var resetShirtOrderVar = function(){
    document.getElementById("newChildTSh").selectedIndex = 0;
    document.getElementById("newSmallTSh").selectedIndex = 0;
    document.getElementById("newMediumTSh").selectedIndex = 0;
    document.getElementById("newLargeTSh").selectedIndex = 0;
    document.getElementById("newXLTSh").selectedIndex = 0;
    document.getElementById("newXXLTSh").selectedIndex = 0;
    document.getElementById("newXXXLTSh").selectedIndex = 0;
    document.getElementById("newXXXXLTSh").selectedIndex = 0;
};

var updateAccountInfo = function(key){
    accountDB.child(key).update({firstname:newFirstName,
                                lastname:newLastName,
                                address:newAddress,
                                city:newCity,
                                state:newState,
                                zip:newZipCode,
                                email:newEmail,
                                phone:newPhone});
    clearAllScreen();
    renderEditScreen();
};

var updateShirtInfo = function(key){
    shirtsDB.child(key).update({small:newSmallShirt,
                              medium:newMediumShirt,
                              large:newLargeShirt,
                              xL:newXLShirt,
                              xxLarge:newXXLShirt,
                              xxxLarge:newXXXLShirt,
                              xxxxLarge:newXXXXLShirt});
    getShirtOrderKey();
    clearAllScreen();
    renderEditScreen();
};

var getShirtOrderKey = function(){
    feeDB.orderByChild("userName").equalTo(userAcct).once("value").then(function(snapshot){
        snapshot.forEach(function(childSnapshot){
            var shirtKey = childSnapshot.key();
            updateShirtsOrder(shirtKey);
        });
    });
};

var getAttendOrderKey = function(){
    feeDB.orderByChild("userName").equalTo(userAcct).once("value").then(function(snapshot){
        snapshot.forEach(function(childSnapshot){
            var attendKey = childSnapshot.key();
            getAttendanceOrderKey(attendKey);
        });
    });
};

var updateShirtCostInfo = function(key){
    feeDB.child(key).update({shirtDue:newShirtOrder});  
};

var updateRegCostInfo = function(key){
    feeDB.child(key).update({regDue:newAttendantOrder});  
};

var pushNewShirtOrder = function(){
    shirtsDB.child().push({account: userAcct,
                            childName: document.getElementById("newChildTSh").value,
                            small: document.getElementById("newSmallTSh").value,
                            medium: document.getElementById("newMediumTSh").value,
                            large: document.getElementById("newLargelTSh").value,
                            xL: document.getElementById("newXLTSh").value,
                            xxLarge: document.getElementById("newXXLTSh").value,
                            xxxLarge: document.getElementById("newXXXLTSh").value,
                            xxxxLarge: document.getElementById("newXXXXLTSh").value
                        });
};

var headerButtons = function(){
    renderPersonBackButton();
};

var renderPersonEdit = function(ky){
    renderPersonEditHeader();
    var persoDiv = document.getElementById("personEditCon");
    var perEditDv = document.createElement("div");
    renderPersEditName(perEditDv);
    renderPersEditAddr(perEditDv);
    renderPersEditAddrInfo(perEditDv);
    renderPersEditContactInfo(perEditDv);
    renderUpdateEditPerson(perEditDv, ky);
    persoDiv.appendChild(perEditDv);
};

var renderPersonEditHeader = function(){
    var editContactHead = document.getElementById("personEditCon");
    var editHead = document.createElement("h2");
    editHead.innerHTML = "Contact Information";
    editContactHead.appendChild(editHead);
};

var renderAttendeesEditHeader = function(){
    var editContactHead = document.getElementById("personEditAtt");
    var editHead = document.createElement("h2");
    editHead.innerHTML = "Attendees";
    editContactHead.appendChild(editHead);
};

var renderPersEditName = function(dv){
    var nmDiv = document.createElement("div");
    renderPersEditFirstName(nmDiv);
    renderPersEditLastName(nmDiv);
    dv.appendChild(nmDiv);
};

var renderPersEditFirstName = function(adV){
    var $fNameDiv = document.createElement("div");
    $fNameDiv.classList.add("individual_block_first");
    
    var $newFirstNameInput = document.createElement("input");
    var $newFirstNameLabel = document.createElement("label");
    $newFirstNameLabel.setAttribute("for", "editFirstName");
    $newFirstNameLabel.setAttribute("value", "First Name");
    $newFirstNameLabel.innerHTML = "First Name";
    $fNameDiv.appendChild($newFirstNameLabel);  
    
    $newFirstNameInput.setAttribute("type", "text");
    $newFirstNameInput.setAttribute("id", "editFirstName");
    $newFirstNameInput.setAttribute("value",newFirstName);
    $newFirstNameInput.addEventListener("blur", function(ev){
        updateFirstName(document.getElementById("editFirstName").value);
    });
    $fNameDiv.appendChild($newFirstNameInput);
    adV.appendChild($fNameDiv);  
};

var renderPersEditLastName = function(adV){
    var $fNameDiv = document.createElement("div");
    $fNameDiv.classList.add("individual_block");
    
    var $newLnameInput = document.createElement("input");
    var $newLnameLabel = document.createElement("label");
    $newLnameLabel.setAttribute("for", "editLastName");
    $newLnameLabel.innerHTML = "Last Name";
    $fNameDiv.appendChild($newLnameLabel);  
    
    $newLnameInput.setAttribute("type", "text");
    $newLnameInput.setAttribute("id", "editLastName");
    $newLnameInput.setAttribute("value",newLastName);
    $newLnameInput.addEventListener("blur", function(ev){
        updateLastName(document.getElementById("editLastName").value);
    });
    $fNameDiv.appendChild($newLnameInput);
    adV.appendChild($fNameDiv);  
};

var renderPersEditAddr = function(addDv){
    var addDiv = document.createElement("div");
    var addrLbl = document.createElement("label");
    addrLbl.setAttribute("for", "editAddr");
    addrLbl.innerHTML = "Address: ";
    addDiv.appendChild(addrLbl);
  
    var addrIpt = document.createElement("input");
    addrIpt.setAttribute("type", "text");
    addrIpt.setAttribute("id", "editAddr");
    addrIpt.setAttribute("value", newAddress);
    addrIpt.addEventListener("blur", function(ev){
       newAddress = document.getElementById("editAddr").value; 
    });
    addDiv.appendChild(addrIpt);

    addDv.appendChild(addDiv);
};

var renderPersEditAddrInfo = function(aDv){
    var addressDiv = document.createElement("div");
    renderEditCity(addressDiv);
    renderEditState(addressDiv);
    renderEditZip(addressDiv);
    aDv.appendChild(addressDiv);
};

var renderEditCity = function(dv){
    var addDiv = document.createElement("div");
    addDiv.classList.add("individual_block_first");

    var addrLbl = document.createElement("label");
    addrLbl.setAttribute("for", "editCity");
    addrLbl.innerHTML = "City: ";
    addDiv.appendChild(addrLbl);
  
    var addrIpt = document.createElement("input");
    addrIpt.setAttribute("type", "text");
    addrIpt.setAttribute("id", "editCity");
    addrIpt.setAttribute("value", newCity);
    addrIpt.addEventListener("blur", function(ev){
       newCity = document.getElementById("editCity").value; 
    });
    addDiv.appendChild(addrIpt);
    dv.appendChild(addDiv);
};

var renderEditState = function(dv){
    var addDiv = document.createElement("div");
    addDiv.classList.add("individual_block");
    var addrLbl = document.createElement("label");
    addrLbl.setAttribute("for", "editState");
    addrLbl.innerHTML = "State: ";
    addDiv.appendChild(addrLbl);
  
    var addrIpt = document.createElement("input");
    addrIpt.setAttribute("type", "text");
    addrIpt.setAttribute("id", "editState");
    addrIpt.setAttribute("value", newState);
    addrIpt.addEventListener("blur", function(ev){
       newState = document.getElementById("editState").value; 
    });
    addDiv.appendChild(addrIpt);
    dv.appendChild(addDiv);
};

var renderEditZip = function(dv){
    var addDiv = document.createElement("div");
    addDiv.classList.add("individual_block");
    var addrLbl = document.createElement("label");
    addrLbl.setAttribute("for", "editZip");
    addrLbl.innerHTML = "Zipcode: ";
    addDiv.appendChild(addrLbl);
  
    var addrIpt = document.createElement("input");
    addrIpt.setAttribute("type", "text");
    addrIpt.setAttribute("id", "editZip");
    addrIpt.setAttribute("value", newZipCode);
    addrIpt.addEventListener("blur", function(ev){
       newZipCode = document.getElementById("editZip").value; 
    });
    addDiv.appendChild(addrIpt);
    dv.appendChild(addDiv);
};

var renderPersEditContactInfo = function(attaDv){
    var contDiv = document.createElement("div");
    renderEditPhone(contDiv);
    renderEditEmail(contDiv);
    attaDv.appendChild(contDiv);
};

var renderEditEmail = function(dv){
    var addDiv = document.createElement("div");
    addDiv.classList.add("individual_block");
    var addrLbl = document.createElement("label");
    addrLbl.setAttribute("for", "editEmail");
    addrLbl.innerHTML = "Email Address: ";
    addDiv.appendChild(addrLbl);
  
    var addrIpt = document.createElement("input");
    addrIpt.setAttribute("type", "text");
    addrIpt.setAttribute("id", "editEmail");
    addrIpt.setAttribute("value", newEmail);
    addrIpt.addEventListener("blur", function(ev){
       newEmail = document.getElementById("editEmail").value; 
    });
    addDiv.appendChild(addrIpt);
    dv.appendChild(addDiv);
};

var renderEditPhone = function(dv){
    var addDiv = document.createElement("div");
    addDiv.classList.add("individual_block_first");
    var addrLbl = document.createElement("label");
    addrLbl.setAttribute("for", "editPhone");
    addrLbl.innerHTML = "Phone Number: ";
    addDiv.appendChild(addrLbl);
  
    var addrIpt = document.createElement("input");
    addrIpt.setAttribute("type", "text");
    addrIpt.setAttribute("id", "editPhone");
    addrIpt.setAttribute("value", newPhone);
    addrIpt.addEventListener("blur", function(ev){
       newPhone = document.getElementById("editPhone").value; 
    });
    addDiv.appendChild(addrIpt);
    dv.appendChild(addDiv);
};

var renderUpdateEditPerson = function(adiv, persKy){
    var updatePersInfoButton = document.createElement("button");
    updatePersInfoButton.classList.add("individual_block");
    updatePersInfoButton.setAttribute("id","UpdatePersInfoButton");
    updatePersInfoButton.innerHTML = "Update Person Info";
    updatePersInfoButton.addEventListener("click",function(ev){
        updateAccountInfo(persKy);
        renderEditScreen();
    });
    adiv.appendChild(updatePersInfoButton);
};

var renderShirtEditOrder = function(shtNa,aky){
    var shirtDiv = document.getElementById("personEditSht");
    var shirtEditDiv = document.createElement("div");
    shirtEditDiv.classList.add("shirt_edit_block");
    renderEditShirtName(shirtEditDiv);
    renderEditSmallShirt(shirtEditDiv);
    renderEditMediumShirt(shirtEditDiv);
    renderEditLargeShirt(shirtEditDiv);
    renderEditXLShirt(shirtEditDiv);
    renderEditXXLShirt(shirtEditDiv);
    renderEditXXXLShirt(shirtEditDiv);
    renderEditXXXXLShirt(shirtEditDiv);
    renderUpdateEditShirt(shirtEditDiv, aky);
    shirtDiv.appendChild(shirtEditDiv);    
};

var renderPersonShirtHeader = function(){
    var editShirtHead = document.getElementById("personEditSht");
    var editHead = document.createElement("h2");
    editHead.innerHTML = "Shirt Orders";
    editShirtHead.appendChild(editHead);
};

var renderEditShirtName = function(sD){
    
    var $nameDiv = document.createElement("div");
    $nameDiv.classList.add("individual_block_first");
    var $nameShirtLabel = document.createElement("div");
    $nameShirtLabel.setAttribute("id", "nameShirt");
    $nameShirtLabel.innerHTML = "Child";
    $nameDiv.appendChild($nameShirtLabel);
    
    var $nameselection = document.createElement("select");
    $nameselection.setAttribute("name","nameOrder");
    $nameselection.setAttribute("id","nameTSh");
   
   var $albertaEditOption = document.createElement("option");
    $albertaEditOption.setAttribute("value","Alberta");
    $albertaEditOption.setAttribute("id", "alberta Edit Option");
    $albertaEditOption.innerHTML = "Alberta";
    if(newNameShirt == "Alberta"){
            $albertaEditOption.setAttribute("selected", true);
        }
    $nameselection.appendChild($albertaEditOption);
    
    var $lillianEditOption = document.createElement("option");
    $lillianEditOption.setAttribute("value","Lillian");
    $lillianEditOption.setAttribute("id", "lillian Edit Option");
    $lillianEditOption.innerHTML = "Lillian";
    if(newNameShirt == "Lillian"){
            $lillianEditOption.setAttribute("selected", true);
        }
    $nameselection.appendChild($lillianEditOption);
        
    var $ednaEditOption = document.createElement("option");
    $ednaEditOption.setAttribute("value","Edna");
    $ednaEditOption.setAttribute("id", "edna Edit Option");
    $ednaEditOption.innerHTML = "Edna";
    if(newNameShirt == "Edna"){
            $ednaEditOption.setAttribute("selected", true);
        }
    $nameselection.appendChild($ednaEditOption);
        
    var $elizabethEditOption = document.createElement("option");
    $elizabethEditOption.setAttribute("value","Elizabeth");
    $elizabethEditOption.setAttribute("id", "elizabeth Edit Option");
    $elizabethEditOption.innerHTML = "Elizabeth";
    if(newNameShirt == "Elizabeth"){
            $elizabethEditOption.setAttribute("selected", true);
        }
    $nameselection.appendChild($elizabethEditOption);
        
    var $maryLueEditOption = document.createElement("option");
    $maryLueEditOption.setAttribute("value","MaryLue");
    $maryLueEditOption.setAttribute("id", "marylue Edit Option");
    $maryLueEditOption.innerHTML = "MaryLue";
    if(newNameShirt == "MaryLue"){
            $maryLueEditOption.setAttribute("selected", true);
        }
    $nameselection.appendChild($maryLueEditOption);
        
    var $dulceniaEditOption = document.createElement("option");
    $dulceniaEditOption.setAttribute("value","Dulcenia");
    $dulceniaEditOption.setAttribute("id", "dulcenia Edit Option");
    $dulceniaEditOption.innerHTML = "Dulcenia";
    if(newNameShirt == "Dulcenia"){
            $dulceniaEditOption.setAttribute("selected", true);
        }
    $nameselection.appendChild($dulceniaEditOption);
        
    var $ireneEditOption = document.createElement("option");
    $ireneEditOption.setAttribute("value","Irene");
    $ireneEditOption.setAttribute("id", "irene Edit Option");
    $ireneEditOption.innerHTML = "Irene";
    if(newNameShirt == "Irene"){
            $ireneEditOption.setAttribute("selected", true);
        }
    $nameselection.appendChild($ireneEditOption);
        
    var $jimmieEditOption = document.createElement("option");
    $jimmieEditOption.setAttribute("value","Jimmie");
    $jimmieEditOption.setAttribute("id", "jimmie Edit Option");
    $jimmieEditOption.innerHTML = "Jimmie";
    if(newNameShirt == "Jimmie"){
            $jimmieEditOption.setAttribute("selected", true);
        }
    $nameselection.appendChild($jimmieEditOption);
        
    var $blaineEditOption = document.createElement("option");
    $blaineEditOption.setAttribute("value","Blaine");
    $blaineEditOption.setAttribute("id", "blaine Edit Option");
    $blaineEditOption.innerHTML = "Blaine";
    if(newNameShirt == "Blaine"){
            $blaineEditOption.setAttribute("selected", true);
        }
    $nameselection.appendChild($blaineEditOption);
    
    var $commemorativeEditOption = document.createElement("option");
    $commemorativeEditOption.setAttribute("value","Commemorative");
    $commemorativeEditOption.setAttribute("id", "commemorative Edit Option");
    $commemorativeEditOption.innerHTML = "Commemorative";
    if(newNameShirt == "Commemorative"){
            $commemorativeEditOption.setAttribute("selected", true);
        }
    $nameselection.appendChild($commemorativeEditOption);
      
    $nameselection.addEventListener("change", function(ev){
        newNameShirt = document.getElementById("nameTSh").value;
    });
    $nameDiv.appendChild($nameselection);
    sD.appendChild($nameDiv);
    
};

var renderEditSmallShirt = function(srcDv){
    var $smallDiv = document.createElement("div");
    $smallDiv.classList.add("individual_block");
    var $smallShirtLabel = document.createElement("div");
    $smallShirtLabel.setAttribute("id", "userSmallShirt");
    $smallShirtLabel.innerHTML = "Small";
    $smallDiv.appendChild($smallShirtLabel);
    
    var $smallselection = document.createElement("select");
    $smallselection.setAttribute("name","userSmallOrder");
    $smallselection.setAttribute("id","userSmallTSh");
    for(var i =0; i<11;i++){
        var $iOption = document.createElement("option");
        $iOption.setAttribute("value",i);
        var itemId = i + "Option";
        $iOption.setAttribute("id", itemId);
        $iOption.innerHTML = i;
        $smallselection.appendChild($iOption);
        if(i == newSmallShirt){
            $iOption.setAttribute("selected", true);
        }
    }
    $smallselection.addEventListener("change", function(ev){
        newSmallShirt = document.getElementById("userSmallTSh").value;
    });
    $smallDiv.appendChild($smallselection);
    srcDv.appendChild($smallDiv);
};

var renderEditMediumShirt = function(rDv){
    var $mediumDiv = document.createElement("div");
    $mediumDiv.classList.add("individual_block");
    var $mediumShirtLabel = document.createElement("div");
    $mediumShirtLabel.setAttribute("id", "userMediumShirt");
    $mediumShirtLabel.innerHTML = "Medium";
    $mediumDiv.appendChild($mediumShirtLabel);
    
    var $mediumselection = document.createElement("select");
    $mediumselection.setAttribute("name","userMediumOrder");
    $mediumselection.setAttribute("id","userMediumTSh");
    for(var i =0; i<11;i++){
        var $iOption = document.createElement("option");
        $iOption.setAttribute("value",i);
        var itemId = i + "Option";
        $iOption.setAttribute("id", itemId);
        $iOption.innerHTML = i;
        if(i == newMediumShirt){
            $iOption.setAttribute("selected", true);
        }
        $mediumselection.appendChild($iOption);
    }
    $mediumselection.addEventListener("change", function(ev){
        newMediumShirt = document.getElementById("userMediumTSh").value;
    });
    $mediumDiv.appendChild($mediumselection);
    rDv.appendChild($mediumDiv);
};

var renderEditLargeShirt = function(sDv){
    var $largeDiv = document.createElement("div");
    $largeDiv.classList.add("individual_block");
    var $largeShirtLabel = document.createElement("div");
    $largeShirtLabel.setAttribute("id", "userLargeShirt");
    $largeShirtLabel.innerHTML = "Large";
    $largeDiv.appendChild($largeShirtLabel);
    
    var $largeselection = document.createElement("select");
    $largeselection.setAttribute("name","userLargeOrder");
    $largeselection.setAttribute("id","userLargeTSh");
    for(var i =0; i<11;i++){
        var $iOption = document.createElement("option");
        $iOption.setAttribute("value",i);
        var itemId = i + "Option";
        $iOption.setAttribute("id", itemId);
        $iOption.innerHTML = i;
        $largeselection.appendChild($iOption);
        if(i == newLargeShirt){
            $iOption.setAttribute("selected", true);
        }
    }
    $largeselection.addEventListener("change", function(ev){
        newLargeShirt = document.getElementById("userLargeTSh").value;
    });
    $largeDiv.appendChild($largeselection);
    sDv.appendChild($largeDiv);
};

var renderEditXLShirt = function (scD){
    var $xlargeDiv = document.createElement("div");
    $xlargeDiv.classList.add("individual_block");
    var $xlargeShirtLabel = document.createElement("div");
    $xlargeShirtLabel.setAttribute("id", "userXLargeShirt");
    $xlargeShirtLabel.innerHTML = "XL";
    $xlargeDiv.appendChild($xlargeShirtLabel);
    
    var $xlargeselection = document.createElement("select");
    $xlargeselection.setAttribute("name","userXLargeOrder");
    $xlargeselection.setAttribute("id","userXLargeTSh");
    for(var i =0; i<11;i++){
        var $iOption = document.createElement("option");
        $iOption.setAttribute("value",i);
        var itemId = i + "Option";
        $iOption.setAttribute("id", itemId);
        $iOption.innerHTML = i;
        $xlargeselection.appendChild($iOption);
        if(i == newXLShirt){
            $iOption.setAttribute("selected", true);
        }
    }
    $xlargeselection.addEventListener("change", function(ev){
        newXLShirt = document.getElementById("userXLargeTSh").value;
    });
    $xlargeDiv.appendChild($xlargeselection);
    scD.appendChild($xlargeDiv);
};

var renderEditXXLShirt = function(srD){
    var $xXLDiv = document.createElement("div");
    $xXLDiv.classList.add("individual_block");
    var $xXLShirtLabel = document.createElement("div");
    $xXLShirtLabel.setAttribute("id", "userXXLShirt");
    $xXLShirtLabel.innerHTML = "XXL";
    $xXLDiv.appendChild($xXLShirtLabel);
    
    var $xXLselection = document.createElement("select");
    $xXLselection.setAttribute("name","userXXLOrder");
    $xXLselection.setAttribute("id","userXXLTSh");
    for(var i =0; i<11;i++){
        var $iOption = document.createElement("option");
        $iOption.setAttribute("value",i);
        var itemId = i + "Option";
        $iOption.setAttribute("id", itemId);
        $iOption.innerHTML = i;
        $xXLselection.appendChild($iOption);
        if(i == newXXLShirt){
            $iOption.setAttribute("selected", true);
        }
    }
    $xXLselection.addEventListener("change", function(ev){
        newXXLShirt = document.getElementById("userXXLTSh").value;
    });
    $xXLDiv.appendChild($xXLselection);
    srD.appendChild($xXLDiv);
};

var renderEditXXXLShirt = function(scDv){
    var $xXXLDiv = document.createElement("div");
    $xXXLDiv.classList.add("individual_block");
    var $xXXLShirtLabel = document.createElement("div");
    $xXXLShirtLabel.setAttribute("id", "userXXXLShirt");
    $xXXLShirtLabel.innerHTML = "XXXL";
    $xXXLDiv.appendChild($xXXLShirtLabel);
    
    var $xXXLselection = document.createElement("select");
    $xXXLselection.setAttribute("name","userXXXLOrder");
    $xXXLselection.setAttribute("id","userXXXLTSh");
    for(var i =0; i<11;i++){
        var $iOption = document.createElement("option");
        $iOption.setAttribute("value",i);
        var itemId = i + "Option";
        $iOption.setAttribute("id", itemId);
        $iOption.innerHTML = i;
        $xXXLselection.appendChild($iOption);
        if(i == newXXXLShirt){
            $iOption.setAttribute("selected", true);
        }
    }
    $xXXLselection.addEventListener("change", function(ev){
        newXXXLShirt = document.getElementById("userXXXLTSh").value;
    });
    $xXXLDiv.appendChild($xXXLselection);
    scDv.appendChild($xXXLDiv);
};

var renderEditXXXXLShirt = function(srDv){
    var $xXXXLDiv = document.createElement("div");
    $xXXXLDiv.classList.add("individual_block");
    var $xXXXLShirtLabel = document.createElement("div");
    $xXXXLShirtLabel.setAttribute("id", "userXXXXLShirt");
    $xXXXLShirtLabel.innerHTML = "XXXXL";
    $xXXXLDiv.appendChild($xXXXLShirtLabel);
    
    var $xXXXLselection = document.createElement("select");
    $xXXXLselection.setAttribute("name","userXXXXLOrder");
    $xXXXLselection.setAttribute("id","userXXXXLTSh");
    for(var i =0; i<11;i++){
        var $iOption = document.createElement("option");
        $iOption.setAttribute("value",i);
        var itemId = i + "Option";
        $iOption.setAttribute("id", itemId);
        $iOption.innerHTML = i;
        $xXXXLselection.appendChild($iOption);
        if(i == newXXXXLShirt){
            $iOption.setAttribute("selected", true);
        }
    }
    $xXXXLselection.addEventListener("change", function(ev){
        newXXXXLShirt = document.getElementById("userXXXLTSh").value;
    });
    $xXXXLDiv.appendChild($xXXXLselection);
    srDv.appendChild($xXXXLDiv);
};

var setShirtCost = function(){
    var normShtTot = +newSmallShirt + +newMediumShirt + +newLargeShirt + +newXLShirt + +newXXLShirt;
    var largShtTot = +newXXXLShirt + +newXXXXLShirt;
    var normTot = normShtTot * 10;
    var largTot = largShtTot * 12;
    newShirtOrder = normTot + largTot;
};

var updateShirtsOrder = function(shrtKy){
    setShirtCost();
    updateShirtCostInfo(shrtKy);
};

var renderUpdateEditShirt = function(ataDv, shKy){
    var updateShirtButton = document.createElement("button");
    updateShirtButton.classList.add("individual_block");
    updateShirtButton.setAttribute("id","UpdateShirtButton");
    updateShirtButton.innerHTML = "Update Shirt Order";
    updateShirtButton.addEventListener("click",function(ev){
        updateShirtInfo(shKy);
    });
    ataDv.appendChild(updateShirtButton);
};

var renderNewShirtOrder = function(){
    var shrtOrdSrc = document.getElementById("personEditSht");
    var shrtOrdDiv = document.createElement("div");
    renderShirtHeader(shrtOrdDiv);
    renderNewChildNameShirt(shrtOrdDiv);
    renderNewSmallShirt(shrtOrdDiv);
    renderNewMediumShirt(shrtOrdDiv);
    renderNewLargeShirt(shrtOrdDiv);
    renderNewXLShirt(shrtOrdDiv);
    renderNewXXLShirt(shrtOrdDiv);
    renderNewXXXLShirt(shrtOrdDiv);
    renderNewXXXXLShirt(shrtOrdDiv);
    renderNewShirtOrderButton(shrtOrdDiv);
    shrtOrdSrc.appendChild(shrtOrdDiv);
};
var renderShirtHeader = function(shtDivm){
    var shirtHead = document.createElement("h1");
    shirtHead.innerHTML = "Add a new Shirt Order";
    shtDivm.appendChild(shirtHead);
};

var renderNewChildNameShirt = function(nShDi){
    var childSelDiv = document.createElement("div");
     childSelDiv.classList.add("individual_block_first");
    var $childShirtSelect = document.createElement("select");
    $childShirtSelect.setAttribute("name","newChildTSh");
    $childShirtSelect.setAttribute("id","newChildTSh");
    
    var $defaultOption = document.createElement("option");
    $defaultOption.setAttribute("value","None");
    $defaultOption.setAttribute("id", "Default Option");
    $defaultOption.innerHTML = "None Selected";
    $defaultOption.setAttribute("selected", true);
    $childShirtSelect.appendChild($defaultOption);
    
    var $albertaOption = document.createElement("option");
    $albertaOption.setAttribute("value","Alberta");
    $albertaOption.setAttribute("id", "alberta Option");
    $albertaOption.innerHTML = "Alberta";
    $childShirtSelect.appendChild($albertaOption);
    
    var $lillianOption = document.createElement("option");
    $lillianOption.setAttribute("value","Lillian");
    $lillianOption.setAttribute("id", "lillian Option");
    $lillianOption.innerHTML = "Lillian";
    $childShirtSelect.appendChild($lillianOption);
        
    var $ednaOption = document.createElement("option");
    $ednaOption.setAttribute("value","Edna");
    $ednaOption.setAttribute("id", "edna Option");
    $ednaOption.innerHTML = "Edna";
    $childShirtSelect.appendChild($ednaOption);
        
    var $elizabethOption = document.createElement("option");
    $elizabethOption.setAttribute("value","Elizabeth");
    $elizabethOption.setAttribute("id", "elizabeth Option");
    $elizabethOption.innerHTML = "Elizabeth";
    $childShirtSelect.appendChild($elizabethOption);
        
    var $maryLueOption = document.createElement("option");
    $maryLueOption.setAttribute("value","MaryLue");
    $maryLueOption.setAttribute("id", "marylue Option");
    $maryLueOption.innerHTML = "MaryLue";
    $childShirtSelect.appendChild($maryLueOption);
        
    var $dulceniaOption = document.createElement("option");
    $dulceniaOption.setAttribute("value","Dulcenia");
    $dulceniaOption.setAttribute("id", "dulcenia Option");
    $dulceniaOption.innerHTML = "Dulcenia";
    $childShirtSelect.appendChild($dulceniaOption);
        
    var $ireneOption = document.createElement("option");
    $ireneOption.setAttribute("value","Irene");
    $ireneOption.setAttribute("id", "irene Option");
    $ireneOption.innerHTML = "Irene";
    $childShirtSelect.appendChild($ireneOption);
        
    var $jimmieOption = document.createElement("option");
    $jimmieOption.setAttribute("value","Jimmie");
    $jimmieOption.setAttribute("id", "jimmie Option");
    $jimmieOption.innerHTML = "Jimmie";
    $childShirtSelect.appendChild($jimmieOption);
        
    var $blaineOption = document.createElement("option");
    $blaineOption.setAttribute("value","Blaine");
    $blaineOption.setAttribute("id", "blaine Option");
    $blaineOption.innerHTML = "Blaine";
    $childShirtSelect.appendChild($blaineOption);
    
    var $commemorativeOption = document.createElement("option");
    $commemorativeOption.setAttribute("value","Commemorative");
    $commemorativeOption.setAttribute("id", "commemorative Option");
    $commemorativeOption.innerHTML = "Commemorative";
    $childShirtSelect.appendChild($commemorativeOption);
    
    childSelDiv.appendChild($childShirtSelect);
    nShDi.appendChild(childSelDiv);
};

var renderNewSmallShirt = function(neShDi){
    var $newSmallDiv = document.createElement("div");
    $newSmallDiv.classList.add("individual_block");
    var $newSmallShirtLabel = document.createElement("div");
    $newSmallShirtLabel.setAttribute("id", "newSmallShirt");
    $newSmallShirtLabel.innerHTML = "Small";
    $newSmallDiv.appendChild($newSmallShirtLabel);
    
    var $newSmallselection = document.createElement("select");
    $newSmallselection.setAttribute("name","newSmallOrder");
    $newSmallselection.setAttribute("id","newSmallTSh");
    for(var i =0; i<11;i++){
        var $iOption = document.createElement("option");
        $iOption.setAttribute("value",i);
        var itemId = i + "Option";
        $iOption.setAttribute("id", itemId);
        $iOption.innerHTML = i;
        $newSmallselection.appendChild($iOption);
    }
    $newSmallDiv.appendChild($newSmallselection);
    neShDi.appendChild($newSmallDiv);
};

var renderNewMediumShirt = function(newShiDiv){
     var $newMediumDiv = document.createElement("div");
    $newMediumDiv.classList.add("individual_block");
    var $newMediumShirtLabel = document.createElement("div");
    $newMediumShirtLabel.setAttribute("id", "newMediumShirt");
    $newMediumShirtLabel.innerHTML = "Medium";
    $newMediumDiv.appendChild($newMediumShirtLabel);
    
    var $newMediumselection = document.createElement("select");
    $newMediumselection.setAttribute("name","newMediumOrder");
    $newMediumselection.setAttribute("id","newMediumTSh");
    for(var i =0; i<11;i++){
        var $iOption = document.createElement("option");
        $iOption.setAttribute("value",i);
        var itemId = i + "Option";
        $iOption.setAttribute("id", itemId);
        $iOption.innerHTML = i;
        $newMediumselection.appendChild($iOption);
    }
    $newMediumDiv.appendChild($newMediumselection);
    newShiDiv.appendChild($newMediumDiv);
};

var renderNewLargeShirt = function(nSD){
    var $newLargeDiv = document.createElement("div");
    $newLargeDiv.classList.add("individual_block");
    var $newLargeShirtLabel = document.createElement("div");
    $newLargeShirtLabel.setAttribute("id", "newLargeShirt");
    $newLargeShirtLabel.innerHTML = "Large";
    $newLargeDiv.appendChild($newLargeShirtLabel);
    
    var $newLargeselection = document.createElement("select");
    $newLargeselection.setAttribute("name","newLargeOrder");
    $newLargeselection.setAttribute("id","newLargeTSh");
    for(var i =0; i<11;i++){
        var $iOption = document.createElement("option");
        $iOption.setAttribute("value",i);
        var itemId = i + "Option";
        $iOption.setAttribute("id", itemId);
        $iOption.innerHTML = i;
        $newLargeselection.appendChild($iOption);
    }
    $newLargeDiv.appendChild($newLargeselection);
    nSD.appendChild($newLargeDiv);
};

var renderNewXLShirt = function(nShD){
    var $newXLDiv = document.createElement("div");
    $newXLDiv.classList.add("individual_block");
    var $newXLShirtLabel = document.createElement("div");
    $newXLShirtLabel.setAttribute("id", "newXLShirt");
    $newXLShirtLabel.innerHTML = "XL";
    $newXLDiv.appendChild($newXLShirtLabel);
    
    var $newXLselection = document.createElement("select");
    $newXLselection.setAttribute("name","newXLOrder");
    $newXLselection.setAttribute("id","newXLTSh");
    for(var i =0; i<11;i++){
        var $iOption = document.createElement("option");
        $iOption.setAttribute("value",i);
        var itemId = i + "Option";
        $iOption.setAttribute("id", itemId);
        $iOption.innerHTML = i;
        $newXLselection.appendChild($iOption);
    }
    $newXLDiv.appendChild($newXLselection);
    nShD.appendChild($newXLDiv);
};

var renderNewXXLShirt = function(nSrDv){
    var $newXXLDiv = document.createElement("div");
    $newXXLDiv.classList.add("individual_block");
    var $newXXLShirtLabel = document.createElement("div");
    $newXXLShirtLabel.setAttribute("id", "newXXLShirt");
    $newXXLShirtLabel.innerHTML = "XXL";
    $newXXLDiv.appendChild($newXXLShirtLabel);
    
    var $newXXLselection = document.createElement("select");
    $newXXLselection.setAttribute("name","newXXLOrder");
    $newXXLselection.setAttribute("id","newXXLTSh");
    for(var i =0; i<11;i++){
        var $iOption = document.createElement("option");
        $iOption.setAttribute("value",i);
        var itemId = i + "Option";
        $iOption.setAttribute("id", itemId);
        $iOption.innerHTML = i;
        $newXXLselection.appendChild($iOption);
    }
    $newXXLDiv.appendChild($newXXLselection);
    nSrDv.appendChild($newXXLDiv);
};

var renderNewXXXLShirt = function(nStDv){
    var $newXXXLDiv = document.createElement("div");
    $newXXXLDiv.classList.add("individual_block");
    var $newXXXLShirtLabel = document.createElement("div");
    $newXXXLShirtLabel.setAttribute("id", "newXXXLShirt");
    $newXXXLShirtLabel.innerHTML = "XXXL";
    $newXXXLDiv.appendChild($newXXXLShirtLabel);
    
    var $newXXXLselection = document.createElement("select");
    $newXXXLselection.setAttribute("name","newXXXLOrder");
    $newXXXLselection.setAttribute("id","newXXXLTSh");
    for(var i =0; i<11;i++){
        var $iOption = document.createElement("option");
        $iOption.setAttribute("value",i);
        var itemId = i + "Option";
        $iOption.setAttribute("id", itemId);
        $iOption.innerHTML = i;
        $newXXXLselection.appendChild($iOption);
    }
    $newXXXLDiv.appendChild($newXXXLselection);
    nStDv.appendChild($newXXXLDiv);
};

var renderNewXXXXLShirt = function(neStDi){
    var $newXXXXLDiv = document.createElement("div");
    $newXXXXLDiv.classList.add("individual_block");
    var $newXXXXLShirtLabel = document.createElement("div");
    $newXXXXLShirtLabel.setAttribute("id", "newXXXLShirt");
    $newXXXXLShirtLabel.innerHTML = "XXXL";
    $newXXXXLDiv.appendChild($newXXXXLShirtLabel);
    
    var $newXXXXLselection = document.createElement("select");
    $newXXXXLselection.setAttribute("name","newXXXLOrder");
    $newXXXXLselection.setAttribute("id","newXXXLTSh");
    for(var i =0; i<11;i++){
        var $iOption = document.createElement("option");
        $iOption.setAttribute("value",i);
        var itemId = i + "Option";
        $iOption.setAttribute("id", itemId);
        $iOption.innerHTML = i;
        $newXXXXLselection.appendChild($iOption);
    }
    $newXXXXLDiv.appendChild($newXXXXLselection);
    neStDi.appendChild($newXXXXLDiv);
};

var renderNewShirtOrderButton = function(neStDv){
    var shtDiv = document.createElement("div");
    shtDiv.classList.add("individual_block");
    var shtSubmit = document.createElement("button");
    shtSubmit.setAttribute("id", "newShirtSubmit");
    shtSubmit.innerHTML = "Submit New Shirt Order";
    shtSubmit.addEventListener("click", function(ev){
        pushNewShirtOrder();
        resetShirtOrderVar();
        renderEditScreen();
    });
    shtDiv.appendChild(shtSubmit);
    neStDv.appendChild(shtDiv);
};



var renderIndAttend = function(ifirst, iLast, iAge, iKey){
    var indDiv = document.getElementById("personEditAtt");
    var attendDiv = document.createElement("div");
    var attendDivName = ifirst.concat(iLast);
    renderAttendFirstEdit(ifirst, attendDiv,attendDivName);
    renderAttendLastEdit(iLast,attendDiv, attendDivName);
    renderAttendAgeEdit(iAge, attendDiv, attendDivName);
    renderAttendUpdateButton(iKey,attendDiv, attendDivName);
    renderAttendDeleteButton(iKey,attendDiv, attendDivName);
    indDiv.appendChild(attendDiv);
};

var renderAttendFirstEdit = function(first, attDiv, dvName){
    var attFirstName = dvName.concat("First");
    var attenDiv = document.createElement("div");
    attenDiv.classList.add("individual_block_first");
    
    var attendfnameInput = document.createElement("input");
    var attendfnameLabel = document.createElement("label");
    attendfnameLabel.setAttribute("for", "attendfnameInput");
    attendfnameLabel.innerHTML = "First Name";
    attenDiv.appendChild(attendfnameLabel);  
    
    attendfnameInput.setAttribute("type", "text");
    attendfnameInput.setAttribute("id", attFirstName);
    attendfnameInput.setAttribute("value", first);
    attendfnameInput.innerHTML = first;
    attenDiv.appendChild(attendfnameInput);

    attDiv.appendChild(attenDiv);
};

var renderAttendLastEdit = function(last, attaDiv,dvName){
    var attLastName = dvName.concat("Last");
    var attedDiv = document.createElement("div");
    attedDiv.classList.add("individual_block");
    
    var attendlnameInput = document.createElement("input");
    var attendlnameLabel = document.createElement("label");
    attendlnameLabel.setAttribute("for", "attendlnameInput");
    attendlnameLabel.innerHTML = "Last Name";
    attedDiv.appendChild(attendlnameLabel);  
    
    attendlnameInput.setAttribute("type", "text");
    attendlnameInput.setAttribute("id", attLastName);
    attendlnameInput.setAttribute("value", last);
    attendlnameInput.innerHTML = last;
    attedDiv.appendChild(attendlnameInput);
    
    attaDiv.appendChild(attedDiv);
};

var renderAttendAgeEdit = function(age, attacDiv, dvName){
    var attAgeName = dvName.concat("Age");
    var atedDiv = document.createElement("div");
    atedDiv.classList.add("individual_block");
    
    var attendageLabel = document.createElement("label");
    attendageLabel.setAttribute("for", "attendageInput");
    attendageLabel.innerHTML = "Age";
    atedDiv.appendChild(attendageLabel);  
    
    attendAge(age, attAgeName,atedDiv);
    attacDiv.appendChild(atedDiv);
};

var attendAge = function(perAg, selectNme,attachmen){
    var $ageClassification = document.createElement("select");
    $ageClassification.setAttribute("name", "age");
    $ageClassification.setAttribute("id", selectNme);
  
    var $infantClassification = document.createElement("option");
    $infantClassification.setAttribute("value", "Infant");
    $infantClassification.setAttribute("id", "newInfantAge");
    $infantClassification.innerHTML = "Infant";
    if(perAg == "Infant"){
        $infantClassification.setAttribute("selected",true);
    }
    $ageClassification.appendChild($infantClassification);

    var $childClassification = document.createElement("option");
    $childClassification.setAttribute("value", "Child");
    $childClassification.setAttribute("id", "newChildAge");
    $childClassification.innerHTML = "Child";
    if(perAg == "Child"){
        $childClassification.setAttribute("selected",true);
    }
    $ageClassification.appendChild($childClassification);
      
    var $adultClassification = document.createElement("option");
    $adultClassification.setAttribute("value", "Adult");
    $adultClassification.setAttribute("id", "newAdultAge");
    $adultClassification.innerHTML = "Adult";
    if(perAg == "Adult"){
        $adultClassification.setAttribute("selected",true);
    }
    $ageClassification.appendChild($adultClassification);
     
    var $seniorClassification = document.createElement("option");
    $seniorClassification.setAttribute("value", "Senior");
    $seniorClassification.setAttribute("id", "newSeniorAge");
    $seniorClassification.innerHTML = "Distinguished Adult";
    if(perAg == "Senior"){
        $seniorClassification.setAttribute("selected",true);
    }
    $ageClassification.appendChild($seniorClassification);
    attachmen.appendChild($ageClassification);
};

var renderAttendUpdateButton = function(key, atDiv, dvName){
    var attFirstName = dvName.concat("First");
    var attLastName = dvName.concat("Last");
    var attAgeName = dvName.concat("Age");
    var butDiv = document.createElement("div");
    butDiv.classList.add("individual_block");
    var attSubmit = document.createElement("button");
    attSubmit.setAttribute("id", "updateAttendSubmit");
    attSubmit.innerHTML = "Update Attendee";
    attSubmit.addEventListener("click", function(ev){
        attendDB.child(key).update({firstname: document.getElementById(attFirstName).value,
                            account: userAcct,
                            lastname: document.getElementById(attLastName).value,
                            age: document.getElementById(attAgeName).value});
        getAttendOrderKey();
        resetAttendVar();
        renderEditScreen();
    });
    butDiv.appendChild(attSubmit);
    atDiv.appendChild(butDiv);
};

var renderAttendDeleteButton = function(key, atDiv, dvName){
    var butDiv = document.createElement("div");
    butDiv.classList.add("individual_block");
    var attSubmit = document.createElement("button");
    attSubmit.setAttribute("id", "attendDelete");
    attSubmit.innerHTML = "Delete Attendee";
    attSubmit.addEventListener("click", function(ev){
        attendDB.child(key).remove();
        getAttendOrderKey();
        resetAttendVar();
        renderEditScreen();
    });
    butDiv.appendChild(attSubmit);
    atDiv.appendChild(butDiv);
};

var updateAgeTotals = function(aPrsAg){
    if (aPrsAg == "Child"){
        childCounter += 1;
    }  
    if (aPrsAg == "Adult"){
        adultCounter += 1 ;
    }
};

var getAttendanceOrderKey = function(atKy){
    getAttendCount();
    setPersonRegCost();
    updateRegCostInfo(atKy);
};

var setPersonRegCost = function(){
    var childCost = childCounter * 10;
    var adultCost = adultCounter * 20;
    newAttendantOrder = childCost + adultCost;
};

var renderNewAttendant = function(){
    var nAttSrc = document.getElementById("personEditAtt");
    var nAttDiv = document.createElement("div");
    renderAttendHeader(nAttDiv);
    renderAttendFirst(nAttDiv);
    renderAttendLast(nAttDiv);
    renderAttendAge(nAttDiv);
    renderAttendSubmit(nAttDiv);
    nAttSrc.appendChild(nAttDiv);
};

var renderAttendHeader = function(atDivm){
    var atteHead = document.createElement("h1");
    atteHead.innerHTML = "Add a new Attendee";
    atDivm.appendChild(atteHead);
};

var renderAttendFirst = function(attD){
    var attendfNameDiv = document.createElement("div");
    attendfNameDiv.classList.add("individual_block_first");
    
    var attendFnameInput = document.createElement("input");
    var attendFnameLabel = document.createElement("label");
    attendFnameLabel.setAttribute("for", "attendFnameInput");
    attendFnameLabel.setAttribute("value", "First Name");
    attendFnameLabel.innerHTML = "First Name";
    attendfNameDiv.appendChild(attendFnameLabel);  
    
    attendFnameInput.setAttribute("type", "text");
    attendFnameInput.setAttribute("id", "attendFname");
    attendFnameInput.innerHTML = null;
    attendfNameDiv.appendChild(attendFnameInput);
    attD.appendChild(attendfNameDiv);
};

var renderAttendLast = function(atDi){
    var attendlNameDiv = document.createElement("div");
    attendlNameDiv.classList.add("individual_block");
    
    var attendLnameLabel = document.createElement("label");
    attendLnameLabel.setAttribute("for", attendLnameInput);
    attendLnameLabel.innerHTML = "Last Name";
    attendlNameDiv.appendChild(attendLnameLabel);
    
    var attendLnameInput = document.createElement("input");
    attendLnameInput.setAttribute("type", "text");
    attendLnameInput.setAttribute("id", "attendLname");
    
    attendlNameDiv.appendChild(attendLnameInput);
    atDi.appendChild(attendlNameDiv);
};

var renderAttendAge = function(atDv){
    var $ageDiv = document.createElement("div");
    $ageDiv.classList.add("individual_block");
    
    var $ageClassify = document.createElement("select");
    $ageClassify.setAttribute("name", "age");
    $ageClassify.setAttribute("id", "attendAge");  
 
    var $defaultClassify = document.createElement("option");
    $defaultClassify.setAttribute("value", "Choose Age");
    $defaultClassify.setAttribute("selected", true);
    $defaultClassify.setAttribute("id", "defaultOption");
    $defaultClassify.innerHTML = "Choose Person's Age";
    $ageClassify.appendChild($defaultClassify);
    
    var $infantClassify = document.createElement("option");
    $infantClassify.setAttribute("value", "Infant");
    $infantClassify.setAttribute("id", "infantAge");
    $infantClassify.innerHTML = "Infant";
    $ageClassify.appendChild($infantClassify);
      
    var $childClassify = document.createElement("option");
    $childClassify.setAttribute("value", "Child");
    $childClassify.setAttribute("id", "childAge");
    $childClassify.innerHTML = "Child";
    $ageClassify.appendChild($childClassify);
      
    var $adultClassify = document.createElement("option");
    $adultClassify.setAttribute("value", "Adult");
    $adultClassify.setAttribute("id", "adultAge");
    $adultClassify.innerHTML = "Adult";
    $adultClassify.classList.add("Adult");
    $ageClassify.appendChild($adultClassify);
      
    var $seniorClassify = document.createElement("option");
    $seniorClassify.setAttribute("value", "Senior");
    $seniorClassify.setAttribute("id", "seniorAge");
    $seniorClassify.innerHTML = "Distinguished Adult";
    $ageClassify.appendChild($seniorClassify);
      
    $ageDiv.appendChild($ageClassify);
    atDv.appendChild($ageDiv);
};

var renderAttendSubmit = function(attachm){
    var attendButton = document.createElement("button");
    attendButton.setAttribute("id","newAttendeeSubmit");
    attendButton.innerHTML = "Add Attendee to record";
    attendButton.addEventListener("click", function(ev){
        attendDB.push().set({firstname: document.getElementById("attendFname").value,
                            account:userAcct,
                            lastname:document.getElementById("attendLname").value,
                            age:document.getElementById("attendAge").value});
        getAttendOrderKey();
        clearAllScreen();
        renderEditScreen();
    });
    attachm.appendChild(attendButton);
};

var renderPersonBackButton = function(){
    var oBDiv = document.getElementById("personEditNav");
    var persEditBtn = document.createElement("button");
    persEditBtn.setAttribute("type", "button");
    persEditBtn.setAttribute("id", "persEditBck");
    persEditBtn.innerHTML = "Return to Person Information";
    persEditBtn.addEventListener("click", function(ev){
        var remView = document.getElementById("personEdit");
        while(remView.firstChild)
            remView.removeChild(remView.firstChild);
        document.getElementById("personView").classList.remove("hidden");
        getRecord();
    });
    oBDiv.appendChild(persEditBtn);
};

var adminSearchStart = function(){
    setAdmAct();
    renderPersonSearchView();
};

document.addEventListener("DOMContentLoaded", adminSearchStart);