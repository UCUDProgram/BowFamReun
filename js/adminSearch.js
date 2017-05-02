var userAcct = "";

var accountDB = new Firebase("https://bowmanfamreun.firebaseio.com/Accounts");
var shirtsDB = new Firebase("https://bowmanfamreun.firebaseio.com/TShirt");
var attendDB = new Firebase("https://bowmanfamreun.firebaseio.com/Attendees");
var foodDB = new Firebase("https://bowmanfamreun.firebaseio.com/Food");
var feeDB = new Firebase("https://bowmanfamreun.firebaseio.com/Fees");
var useDB = new Firebase("https://bowmanfamreun.firebaseio.com/Users");
var DB = new Firebase("https://bowmanfamreun.firebaseio.com/");

var setUserAccount = function(usAct){
  userAcct = usAct;  
};

// var pages = ["personSearch", "searchResults","personView", "personEdit"];
// var renderPersonAttendList = function(){
//     var originDv = document.getElementById("personView");
//     var sourceDv = document.createElement("div");
    
//     var attendHead = document.createElement("h3");
//     attendHead.innerHTML = "Attendees";
//     sourceDv.appendChild(attendHead);
    
//   persAttendList.forEach(function(anAttendant){
//       var attfNm = anAttendant[0];
//       var attlNm = anAttendant[1];
//       var attag = anAttendant[2];
//       renderAttendent(attfNm, attlNm, attag, sourceDv);
//   });
//   originDv.appendChild(sourceDv);
// };

// var personKey = "";
// var shirtKey = "";
// var attendKey = [];
// var foodKey = [];
// var persAttendList = [];
// var persFoodList = [];

// var resetLists = function(){
//     while(persAttendList.length != 0)
//         persAttendList.pop();
        
//     while(persFoodList.length != 0)
//         persFoodList.pop();
// };

// var renderPersonFoodList = function(){
//     var origiDv = document.getElementById("personView");
//     var sourcDv = document.createElement("div");
    
//     var foodHead = document.createElement("h3");
//     foodHead.innerHTML = "Food";
//     sourcDv.appendChild(foodHead);
    
//   persFoodList.forEach(function(anAttendant){
//       var fdName = anAttendant[0];
//       var fdAge = anAttendant[1];
//       renderFood(fdName, fdAge, sourcDv);
//   });
//   origiDv.appendChild(sourcDv);
// };



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
        //   console.log(index_of_uFirstNm);
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
        //   console.log(index_of_uLastNm);
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
        //   console.log(index_of_userNm);
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
    
    var divS = document.getElementById("personView");
    while(divS.firstChild)
        divS.removeChild(divS.firstChild);
    
    console.log(userAcct);
    
    document.getElementById("personSearch").classList.add("hidden");
    document.getElementById("searchResults").classList.add("hidden");
    document.getElementById("personEdit").classList.add("hidden");
    renderPersonEditButton();
    renderBackButton();
    getPersonInfo();
    getPersonAttendeesList();
    getPersonShirtOrder();
    getPersonFoodList();
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
        var infoKey = childSnapshot.key();
        renderPersonInfo(fName, lName,addre, cty, st, zp, phn, emal);
      });
  });  
};

var getPersonAttendeesList = function(){
    var originDv = document.getElementById("personView");
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

var getPersonShirtOrder = function(){
  shirtsDB.orderByChild("account").equalTo(userAcct).on("value", function(snapshot){
     snapshot.forEach(function(childSnapshot){
         var persSm = childSnapshot.val().small;
         var persMd = childSnapshot.val().medium;
         var persLg = childSnapshot.val().large;
         var persXL = childSnapshot.val().xL;
         var persxxL = childSnapshot.val().xxLarge;
         var persxxxL = childSnapshot.val().xxxLarge;
         var persxxxxL = childSnapshot.val().xxxxLarge;
         renderShirtOrder(persSm, persMd, persLg, persXL, persxxL, persxxxL, persxxxxL);
     }); 
  });  
};

var getPersonFoodList = function(){
    var origiDv = document.getElementById("personView");
    var sourcDv = document.createElement("div");
    
    var foodHead = document.createElement("h3");
    foodHead.innerHTML = "Food";
    sourcDv.appendChild(foodHead);
    foodDB.orderByChild("user").equalTo(userAcct).on("value", function(snapshot){
       snapshot.forEach(function(childSnapshot){
           var fdNm = childSnapshot.val().food;
           var fdCat = childSnapshot.val().category;
           renderFood(fdNm, fdCat, sourcDv);
       });
    });
    origiDv.appendChild(sourcDv);
};

var renderPersonInfo = function(fn,ln, ad, cy, sa, zi, em, ph){
    var div = document.getElementById("personView");
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

var renderShirtOrder = function(sm, me, lg, xl, xxl, xxxl, xxxxl){
  var shrtSrc = document.getElementById("personView");
  
  var shrtDv = document.createElement("div");
  
  var shrtHead = document.createElement("h3");
  shrtHead.innerHTML = "Shirt Ordering";
  shrtDv.appendChild(shrtHead);
  
  var smll = document.createElement("div");
  smll.innerHTML = sm + " Small Shirts";
  shrtDv.appendChild(smll);
  
  var mdm = document.createElement("div");
  mdm.innerHTML = me + " Medium Shirts";
  shrtDv.appendChild(mdm);
  
  var lrg = document.createElement("div");
  lrg.innerHTML = lg + " Large Shirts";
  shrtDv.appendChild(lrg);
  
  var xlrg = document.createElement("div");
  xlrg.innerHTML = xl + " XL Shirts";
  shrtDv.appendChild(xlrg);
  
  var xxlrg = document.createElement("div");
  xxlrg.innerHTML = xxl + " XXL Shirts";
  shrtDv.appendChild(xxlrg);
  
  var xxxlrg = document.createElement("div");
  xxxlrg.innerHTML = xxxl + " XXXL Shirts";
  shrtDv.appendChild(xxxlrg);
  
  var xxxxlrg = document.createElement("div");
  xxxxlrg.innerHTML = xxxxl + " XXXXL Shirts";
    shrtDv.appendChild(xxxxlrg);
    
    shrtSrc.appendChild(shrtDv);
};

var renderFood = function(fdNam, fdCateg, attacDv){
  
  var foodDv = document.createElement("div");
  var fdNmDv = document.createElement("div");
  fdNmDv.classList.add("individual_block_first");
  fdNmDv.innerHTML = "Food Name: " + fdNam;
  foodDv.appendChild(fdNmDv);
  
  var fdCtDv = document.createElement("div");
  fdCtDv.classList.add("individual_block");
  fdCtDv.innerHTML = "Category: " + fdCateg;
  foodDv.appendChild(fdCtDv);
  attacDv.appendChild(foodDv);
    
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
    var oBDiv = document.getElementById("personView");
    var persEditBtn = document.createElement("button");
    persEditBtn.setAttribute("type", "button");
    persEditBtn.setAttribute("id", "personEditBut");
    persEditBtn.innerHTML = "Edit Person";
    persEditBtn.addEventListener("click", function(ev){
        // getDeleteKeys();
        getEditRecord();
    });
    oBDiv.appendChild(persEditBtn);
};

var renderBackButton = function(){
    var oBDiv = document.getElementById("personView");
    var persEditBtn = document.createElement("button");
    persEditBtn.setAttribute("type", "button");
    persEditBtn.setAttribute("id", "persList");
    persEditBtn.innerHTML = "Return to Results";
    persEditBtn.addEventListener("click", function(ev){
        // resetLists();
        var remView = document.getElementById("personView");
        while(remView.firstChild)
            remView.removeChild(remView.firstChild);
        document.getElementById("personSearch").classList.remove("hidden");
        document.getElementById("searchResults").classList.remove("hidden");
    });
    oBDiv.appendChild(persEditBtn);
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
var newSmallShirt = 0;
var newMediumShirt = 0;
var newLargeShirt = 0;
var newXLShirt = 0;
var newXXLShirt = 0;
var newXXXLShirt = 0;
var newXXXXLShirt = 0;
var newShirtOrder =0;
var deleteKeys = [];

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
        
        updateFirstName(fName);
        updateLastName(lName);
        updateAddress(addre);
        updateCity(cty);
        updateState(st);
        updateZip(zp);
        updatePhone(phn);
        updateEmail(emal);
        var infoKey = childSnapshot.key();
        renderPersonEdit(infoKey);
      });
  });  
};

var getPersonShirtEditOrder = function(){
  shirtsDB.orderByChild("account").equalTo(userAcct).on("value", function(snapshot){
     snapshot.forEach(function(childSnapshot){
         var persSma = childSnapshot.val().small;
         var persMed = childSnapshot.val().medium;
         var persLag = childSnapshot.val().large;
         var persXLa = childSnapshot.val().xL;
         var persxxLa = childSnapshot.val().xxLarge;
         var persxxxLa = childSnapshot.val().xxxLarge;
         var persxxxxLa = childSnapshot.val().xxxxLarge;
         var perKey = childSnapshot.key();
         updateSmallShirt(persSma);
         updateMediumShirt(persMed);
         updateLgShirt(persLag);
         updateXLShirt(persXLa);
         updateXXLShirt(persxxLa);
         updateXXXLShirt(persxxxLa);
         updateXXXXLShirt(persxxxxLa);
         renderShirtEditOrder(perKey);
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

var getAssocFood = function(){
    renderFoodEditHeader();
  foodDB.orderByChild("user").equalTo(userAcct).on("value", function(snapshot){
       snapshot.forEach(function(childSnapshot){
           var fdNm = childSnapshot.val().food;
           var fdCat = childSnapshot.val().category;
           var fdKey = childSnapshot.key();
           renderIndFood(fdNm, fdCat, fdKey);
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
    var divS = document.getElementById("personEdit");
    while(divS.firstChild)
        divS.removeChild(divS.firstChild);
    
    headerButtons();
    getPersonEditInfo();
    getPersonShirtEditOrder();
    getAssocAttend();
    renderNewAttendant();
    getAssocFood();
    renderNewFood();
};

var updateAccountInfo = function(key){
  accountDB.child(key).update({firstname:newFirstName,
                                lastname:newLastName,
                                address:newAddress,
                                city:newCity,
                                state:newState,
                                zip:newZipCode,
                                email:newEmail,
                                phone:newPhone
  });    
};

var updateShirtInfo = function(key){
  shirtsDB.child(key).update({small:newSmallShirt,
                              medium:newMediumShirt,
                              large:newLargeShirt,
                              xL:newXLShirt,
                              xxLarge:newXXLShirt,
                              xxxLarge:newXXXLShirt,
                              xxxxLarge:newXXXXLShirt
  });  
};

var updateShirtInfo = function(key){
  feeDB.child(key).update({shirtDue:newShirtOrder
  });  
};

var pushContactKey = function(){
    accountDB.orderByChild("userName").equalTo(userAcct).on("value", function(snapshot){
     snapshot.forEach(function(childSnapshot){
         var accountKey = childSnapshot.key();
         console.log(accountKey);
        //  deleteKeys.push(accountKey);
     });
    });
};

var pushShirtKey = function(){
    shirtsDB.orderByChild("account").equalTo(userAcct).on("value", function(snapshot){
     snapshot.forEach(function(childSnapshot){
         var shirtKey = childSnapshot.key();
         console.log(shirtKey);
        //  deleteKeys.push(shirtKey);
     });
    });
};

var pushAttendeesKeys = function(){
    // var attendKeys = [];
    attendDB.orderByChild("account").equalTo(userAcct).on("value", function(snapshot){
     snapshot.forEach(function(childSnapshot){
        var attKey = childSnapshot.key();
        console.log(attKey);
        // attendKeys.push(attKey);
     });
  });
//   deleteKeys.push(attendKeys);
};

var pushFoodKeys = function(){
    // var foodKeys = [];
    foodDB.orderByChild("user").equalTo(userAcct).on("value", function(snapshot){
       snapshot.forEach(function(childSnapshot){
           var fdKey = childSnapshot.key();
           console.log(fdKey);
        //   foodKeys.push(fdKey);
       });
    });
    // deleteKeys.push(foodKeys);
};

var pushUserKey = function(){
    var userData = DB.child("Users");
    userData.orderByChild("userName").equalTo(userAcct).on("value", function(snapshot){
     snapshot.forEach(function(childSnapshot){
         var urKy = childSnapshot.key();
         console.log(urKy);
         
         
        //  deleteKeys.push(urKy);
     });
    });
};

var pushFeesKey = function(){
    
    feeDB.orderByChild("userName").equalTo(userAcct).once("value").then(function(snapshot){
     snapshot.forEach(function(childSnapshot){
         var feesKey = childSnapshot.key();
         console.log(feesKey);
        //  deleteKeys.push(feesKey);
     });
    });
};

var shirtFeesKey = function(){
    
    feeDB.orderByChild("userName").equalTo(userAcct).once("value").then(function(snapshot){
     snapshot.forEach(function(childSnapshot){
         var shirtKey = childSnapshot.key();
        updateShirtsOrder(shirtKey);
     });
    });
};

var getDeleteKeys = function(){
    // deleteKeys = [];
  pushContactKey();
  pushShirtKey();
  pushAttendeesKeys();
  pushFoodKeys();
  pushUserKey();
  pushFeesKey();
//   console.log(deleteKeys);
};

var deleteContact = function(){
    var conta = deleteKeys[0];
    accountDB.child(conta).remove();
};

var deleteShirt = function(){
    var shrt = deleteKeys[1];
    shirtsDB.child(shrt).remove();
};

var deleteAttendees = function(){
    var attnd = deleteKeys[2];
    attnd.forEach(function(atKey){
       attendDB.child(atKey).remove(); 
    });
};

var deleteFood = function(){
    var fod = deleteKeys[3];
    fod.forEach(function(foKy){
       foodDB.child(foKy).remove(); 
    });
};

var deleteUser = function(){
    var usrKy = deleteKeys[4];
    useDB.child(usrKy).remove();
};

var deleteFees = function(){
    var feKy = deleteKeys[5];
    feeDB.child(feKy).remove();
};


var deleteRecord = function(){
  deleteContact();
  deleteShirt();
  deleteAttendees();
  deleteFood();
  deleteUser();
  deleteFees();
};

var headerButtons = function(){
    renderPersonBackButton();
    getDeleteKeys();
    // console.log(deleteKeys);
    renderDeleteRecordButton();
};

var renderPersonEdit = function(ky){
    renderPersonEditHeader();
    var persoDiv = document.getElementById("personEdit");
    var perEditDv = document.createElement("div");
    renderPersEditName(perEditDv);
    renderPersEditAddr(perEditDv);
    renderPersEditAddrInfo(perEditDv);
    renderPersEditContactInfo(perEditDv);
    renderUpdateEditPerson(perEditDv, ky);
    persoDiv.appendChild(perEditDv);
};

var renderPersonEditHeader = function(){
  var editContactHead = document.getElementById("personEdit");
  var editHead = document.createElement("h2");
  editHead.innerHTML = "Contact Information";
  editContactHead.appendChild(editHead);
};

var renderAttendeesEditHeader = function(){
  var editContactHead = document.getElementById("personEdit");
  var editHead = document.createElement("h2");
  editHead.innerHTML = "Attendees";
  editContactHead.appendChild(editHead);
};

var renderFoodEditHeader = function(){
  var editContactHead = document.getElementById("personEdit");
  var editHead = document.createElement("h2");
  editHead.innerHTML = "Food Brought";
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

var renderShirtEditOrder = function(aky){
    renderPersonShirtHeader();
  var shirtDiv = document.getElementById("personEdit");
  var shirtEditDiv = document.createElement("div");
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
  var editShirtHead = document.getElementById("personEdit");
  var editHead = document.createElement("h2");
  editHead.innerHTML = "Shirt Ordering Information";
  editShirtHead.appendChild(editHead);
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
  var normShtTot = newSmallShirt + newMediumShirt + newLargeShirt + newXLShirt + newXXLShirt;
  var largShtTot = newXXXLShirt + newXXXXLShirt;
  var normTot = normShtTot * 10;
  var largTot = largShtTot * 12;
    newShirtOrder = normTot + largTot;
};

var updateShirtsOrder = function(shtKy){
  setShirtCost();
  updateShirtInfo(shtKy);
};


var renderUpdateEditShirt = function(ataDv, shKy){
    var updateShirtButton = document.createElement("button");
  updateShirtButton.classList.add("individual_block");
  updateShirtButton.setAttribute("id","UpdateShirtButton");
  updateShirtButton.innerHTML = "Update Person Info";
  updateShirtButton.addEventListener("click",function(ev){
   updateShirtInfo(shKy);
   
  });
  ataDv.appendChild(updateShirtButton);
};

var renderIndAttend = function(ifirst, iLast, iAge, iKey){
  var indDiv = document.getElementById("personEdit");
  var attendDiv = document.createElement("div");
  var attendDivName = ifirst.concat(iLast);
  renderAttendFirstEdit(ifirst, attendDiv,attendDivName);
  renderAttendLastEdit(iLast,attendDiv, attendDivName);
  renderAttendAgeEdit(iAge, attendDiv, attendDivName);
  renderAttendUpdateButton(iKey,attendDiv, attendDivName);
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
    
    var attendageInput = document.createElement("input");
    var attendageLabel = document.createElement("label");
      attendageLabel.setAttribute("for", "attendageInput");
  attendageLabel.innerHTML = "Age";
  atedDiv.appendChild(attendageLabel);  
    
    attendAge(age, attAgeName,atedDiv);
    
//   attendageInput.setAttribute("type", "text");
//   attendageInput.setAttribute("id", attAgeName);
//   attendageInput.setAttribute("value", age);
//   attendageInput.innerHTML = age;
//  atedDiv.appendChild(attendageInput);
    
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
                            age: document.getElementById(attAgeName).value
      });
      renderEditScreen();
  });
    butDiv.appendChild(attSubmit);
    atDiv.appendChild(butDiv);
};

var renderIndFood = function(foodName, foodCat, foodKey){
    var fdDiv = document.getElementById("personEdit");
    var foodDiv = document.createElement("div");
    var foodDivName = foodName.concat(foodCat);
    renderFoodNameEdit(foodName,foodDiv,foodDivName);
    renderFoodCatEdit(foodCat, foodDiv, foodDivName);
    renderFoodUpdateButton(foodKey,foodDiv, foodDivName);
    fdDiv.appendChild(foodDiv);
};

var renderFoodNameEdit = function(fdNme, fdDiv,fdDvNm){
    var foodNm = fdDvNm.concat("Food");
    var fodDiv = document.createElement("div");
    fodDiv.classList.add("individual_block_first");

    var foodnameInput = document.createElement("input");
    var foodnameLabel = document.createElement("label");
      foodnameLabel.setAttribute("for", "foodnameInput");
  foodnameLabel.innerHTML = "Food Name";
  fodDiv.appendChild(foodnameLabel);  
    
  foodnameInput.setAttribute("type", "text");
  foodnameInput.setAttribute("id", foodNm);
  foodnameInput.setAttribute("value", fdNme);
  foodnameInput.innerHTML = fdNme;
 fodDiv.appendChild(foodnameInput);

    fdDiv.appendChild(fodDiv);
};

var renderFoodCatEdit = function(fdCate, fdDiv, fdDivNm){
    var foodCt = fdDivNm.concat("Cat");
    var fodDiv = document.createElement("div");
    fodDiv.classList.add("individual_block");

    var foodCatInput = document.createElement("input");
    var foodCatLabel = document.createElement("label");
      foodCatLabel.setAttribute("for", "foodCatInput");
  foodCatLabel.innerHTML = "Food Category";
  fodDiv.appendChild(foodCatLabel);  
    
    foodCatSelection(fdCate,foodCt,fodDiv);
    
  foodCatInput.setAttribute("type", "text");
  foodCatInput.setAttribute("id", foodCt);
  foodCatInput.setAttribute("value", fdCate);
  foodCatInput.innerHTML = fdCate;
 fodDiv.appendChild(foodCatInput);

    fdDiv.appendChild(fodDiv);
};

var foodCatSelection = function(fdCategory, foodId, attachmDv){
    var foodCategoryClassification = document.createElement("select");
  foodCategoryClassification.setAttribute("name", "foodCat");
  foodCategoryClassification.setAttribute("id", foodId);
  
   var defCat = document.createElement("option");
  defCat.setAttribute("value", "Select Category");
  defCat.setAttribute("id", "defCategory");
  defCat.innerHTML = "Select Category";
  foodCategoryClassification.appendChild(defCat);
  
  var saladCat = document.createElement("option");
  saladCat.setAttribute("value", "Salad");
  saladCat.setAttribute("id", "saladCategory");
  saladCat.innerHTML = "Salad";
  foodCategoryClassification.appendChild(saladCat);
  
  var sideDishCat = document.createElement("option");
  sideDishCat.setAttribute("value", "Side Dish");
  sideDishCat.setAttribute("id", "sideDishCategory");
  sideDishCat.innerHTML = "Side Dish";
  foodCategoryClassification.appendChild(sideDishCat);
  
  var meatCat = document.createElement("option");
  meatCat.setAttribute("value", "Meat");
  meatCat.setAttribute("id", "meatCategory");
  meatCat.innerHTML = "Meat";
  foodCategoryClassification.appendChild(meatCat);
  
    attachmDv.appendChild(foodCategoryClassification);
};

var renderFoodUpdateButton = function(fKey,fDiv, fDName){
    var foodNm = fDName.concat("Food");
    var fodCt = fDName.concat("Cat");
    var fdUpButDiv = document.createElement("div");
    fdUpButDiv.classList.add("individual_block");
    var fdSubmit = document.createElement("button");
     fdSubmit.setAttribute("id", "updateFoodSubmit");
  fdSubmit.innerHTML = "Update Food Item";
  fdSubmit.addEventListener("click", function(ev){
      foodDB.child(fKey).update({user: userAcct,
                            food: document.getElementById(foodNm).value,
                            category: document.getElementById(fodCt).value
      });
      renderEditScreen();
  });
    fdUpButDiv.appendChild(fdSubmit);
    fDiv.appendChild(fdUpButDiv);
};

var renderNewAttendant = function(){
    var nAttSrc = document.getElementById("personEdit");
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
  $ageClassify.setAttribute("id", "ageOption");  
 
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
    attendButton.innerHTML = "Add Attendee to this person's record";
    attendButton.addEventListener("click", function(ev){
       
       
       
    });
    attachm.appendChild(attendButton);
};

var renderNewFood = function(){
    var nFoodSrc = document.getElementById("personEdit");
    var nFoodDiv = document.createElement("div");
    renderFoodHeader(nFoodDiv);
  renderNewFoodName(nFoodDiv);
  renderNewFoodCat(nFoodDiv);
  renderNewFoodSubmit(nFoodDiv);
    nFoodSrc.appendChild(nFoodDiv);
};

var renderFoodHeader = function(fdDivm){
    var atteHead = document.createElement("h1");
    atteHead.innerHTML = "Add a new Food";
    fdDivm.appendChild(atteHead);
};

var renderNewFoodName = function(attch){
  
  var fdNameDiv = document.createElement("div");
    fdNameDiv.classList.add("individual_block_first");
var foodNamLbl = document.createElement("label");
    foodNamLbl.setAttribute("for", foodNamInput);
    foodNamLbl.innerHTML = "Food Name: ";
    fdNameDiv.appendChild(foodNamLbl);
    
    var foodNamInput = document.createElement("input");
   foodNamInput.setAttribute("type", "text");
    foodNamInput.setAttribute("id", "foodNamText");
  fdNameDiv.appendChild(foodNamInput);
  attch.appendChild(fdNameDiv);
};

var renderNewFoodCat = function(atch){
     var newFoodCategoryClassification = document.createElement("select");
  newFoodCategoryClassification.setAttribute("name", "otherCat");
  newFoodCategoryClassification.setAttribute("id", "newFoodCategorySelection");
  
   var defCat = document.createElement("option");
  defCat.setAttribute("value", "Select Category");
  defCat.setAttribute("id", "defCategory");
  defCat.innerHTML = "Select Category";
  newFoodCategoryClassification.appendChild(defCat);
  
  var saladCat = document.createElement("option");
  saladCat.setAttribute("value", "Salad");
  saladCat.setAttribute("id", "saladCategory");
  saladCat.innerHTML = "Salad";
  newFoodCategoryClassification.appendChild(saladCat);
  
  var sideDishCat = document.createElement("option");
  sideDishCat.setAttribute("value", "Side Dish");
  sideDishCat.setAttribute("id", "sideDishCategory");
  sideDishCat.innerHTML = "Side Dish";
  newFoodCategoryClassification.appendChild(sideDishCat);
  
  var meatCat = document.createElement("option");
  meatCat.setAttribute("value", "Meat");
  meatCat.setAttribute("id", "meatCategory");
  meatCat.innerHTML = "Meat";
  newFoodCategoryClassification.appendChild(meatCat);
  
    atch.appendChild(newFoodCategoryClassification);
};

var renderNewFoodSubmit = function(attachme){
    var foodButton = document.createElement("button");
  foodButton.setAttribute("id","newFoodSubmit");
    foodButton.innerHTML = "Add Food to this person's record";
    foodButton.addEventListener("click", function(ev){
       
       
       
    });
    attachme.appendChild(foodButton);
};

var renderPersonBackButton = function(){
    var oBDiv = document.getElementById("personEdit");
    var persEditBtn = document.createElement("button");
    persEditBtn.setAttribute("type", "button");
    persEditBtn.setAttribute("id", "persEditBck");
    persEditBtn.innerHTML = "Return to Person Information";
    persEditBtn.addEventListener("click", function(ev){
        // resetLists();
        var remView = document.getElementById("personEdit");
        while(remView.firstChild)
            remView.removeChild(remView.firstChild);
        document.getElementById("personView").classList.remove("hidden");
        getRecord();
    });
    oBDiv.appendChild(persEditBtn);
};

var renderDeleteRecordButton = function(){
     var oBDiv = document.getElementById("personEdit");
    var persDelBtn = document.createElement("button");
    persDelBtn.setAttribute("type", "button");
    persDelBtn.setAttribute("id", "persDelete");
    persDelBtn.innerHTML = "Delete Entire Record";
    persDelBtn.addEventListener("click", function(ev){
        // resetLists();
        
        
        
        
        var remView = document.getElementById("personEdit");
        while(remView.firstChild)
            remView.removeChild(remView.firstChild);
        document.getElementById("personSearch").classList.remove("hidden");
        document.getElementById("personResults").classList.remove("hidden");
    });
    oBDiv.appendChild(persDelBtn);
};


var adminSearchStart = function(){
    renderPersonSearchView();
    // document.getElementById("persEditBtn").addEventListener("click", getDeleteKeys);
};

document.addEventListener("DOMContentLoaded", adminSearchStart);