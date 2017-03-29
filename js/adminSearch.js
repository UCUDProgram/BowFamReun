// var pages = ["personSearch", "searchResults","personView", "personEdit"];
var userAcct = "";

var accountDB = new Firebase("https://bowmanfamreun.firebaseio.com/Accounts");
var shirtsDB = new Firebase("https://bowmanfamreun.firebaseio.com/TShirt");
var attendDB = new Firebase("https://bowmanfamreun.firebaseio.com/Attendees");
var foodDB = new Firebase("https://bowmanfamreun.firebaseio.com/Food");

var setUserAccount = function(usAct){
  userAcct = usAct;  
};


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
    renderPersonFirstSearch();
    renderPersonLastSearch();
    renderPersonSearchButton();
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
    infoHead.innerHTML = "Basic Person Information";
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
  phonDv.innerHTML = "Phone Number " + phon;
  conDv.appendChild(phonDv);
  
  var emalDv = document.createElement("div");
  emalDv.classList.add("individual_block");
  emalDv.innerHTML = "Email Address " + emai;
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
    persEditBtn.setAttribute("id", "personEdit");
    persEditBtn.innerHTML = "Edit Person";
    persEditBtn.addEventListener("click", function(ev){
        getEditRecord();
    });
    oBDiv.appendChild(persEditBtn);
};

var renderBackButton = function(){
    var oBDiv = document.getElementById("personView");
    var persEditBtn = document.createElement("button");
    persEditBtn.setAttribute("type", "button");
    persEditBtn.setAttribute("id", "personEdit");
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




var getEditRecord = function(){
    document.getElementById("personView").classList.add("hidden");
    getPersonEditInfo();
    getPersonShirtEditOrder();
    
    
    
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

var renderPersonEdit = function(ky){
    var sourceDiv = document.getElementById("personEdit");
    var perEditDv = document.createElement("div");
    
    renderPersEditName(perEditDv);
    renderPersEditAddr(perEditDv);
    renderPersEditAddrInfo(perEditDv);
    renderPersEditContactInfo(perEditDv);
    renderUpdateEditPerson(perEditDv, ky);
    sourceDiv.appendChild(perEditDv);
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
    
    var $newFnameInput = document.createElement("input");
  var $newFnameLabel = document.createElement("label");
      $newFnameLabel.setAttribute("for", "$newFnameInput");
  $newFnameLabel.setAttribute("value", "First Name");
  $newFnameLabel.innerHTML = "First Name";
  $fNameDiv.appendChild($newFnameLabel);  
    
  $newFnameInput.setAttribute("type", "text");
  $newFnameInput.setAttribute("id", "newFnameText");
  $newFnameInput.innerHTML = newFirstName;
  $newFnameInput.addEventListener("blur", function(ev){
         updateFirstName(document.getElementById("newFnameText").value);
  });
 $fNameDiv.appendChild($newFnameInput);
    
  adV.appendChild($fNameDiv);  
    
};

var renderPersEditLastName = function(adV){
    
    var $fNameDiv = document.createElement("div");
    $fNameDiv.classList.add("individual_block");
    
    var $newFnameInput = document.createElement("input");
  var $newFnameLabel = document.createElement("label");
      $newFnameLabel.setAttribute("for", "$newFnameInput");
  $newFnameLabel.setAttribute("value", "First Name");
  $newFnameLabel.innerHTML = "Last Name";
  $fNameDiv.appendChild($newFnameLabel);  
    
  $newFnameInput.setAttribute("type", "text");
  $newFnameInput.setAttribute("id", "newFnameText");
  $newFnameInput.innerHTML = newLastName;
  $newFnameInput.addEventListener("blur", function(ev){
         updateFirstName(document.getElementById("newFnameText").value);
  });
 $fNameDiv.appendChild($newFnameInput);
    
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
   
  });
  adiv.appendChild(updatePersInfoButton);
};

var renderShirtEditOrder = function(aky){
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




var adminSearchStart = function(){
    renderPersonSearchView();
};

document.addEventListener("DOMContentLoaded", adminSearchStart);