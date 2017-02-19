var acct = "";
var first = "";
var last = "";
var ageStatus = "";
var DB = new Firebase("https://bowmanfamreun.firebaseio.com/");
var attendeeDB = new Firebase("https://bowmanfamreun.firebaseio.com/Attendees");
var adultAttend = 0;
var childAttend = 0;
var infantAttend = 0;
var seniorAttend = 0;
var famCost= 0;

var logout = function(){
    localStorage.clear();
};

var deletePerson = function(aKey){
    attendeeDB.child(aKey).remove();
    getPeople();
};

var setAcct = function(){
  acct = localStorage.getItem("user");
  console.log(acct);
  if(acct == null){
      showLoginScreen();
  }
};

var setAge= function(){
    ageStatus = document.getElementById("ageOption").value;  
};

var updateInfantAge= function(){
    infantAttend += 1;  
};

var updateChildAge= function(){
    childAttend += 1;  
};

var updateAdultAge= function(){
    adultAttend += 1;  
};

var updateSeniorAge= function(){
    seniorAttend += 1;
};

var resetAges = function(){
    infantAttend = 0;
    childAttend = 0;
    adultAttend = 0;
    seniorAttend = 0;
}

var personSubmit = function(){
    setAge();
    
  var regData = DB.child("Attendees");
  regData.push().set({firstname: first,
                        account: acct, 
                      lastname: last,
                      age: ageStatus
                    });
    getPeople();
    renderFamReg();
    inputReset();
};

var updateAgeStatus = function(anAgeOption){
    ageStatus = anAgeOption;
};


var inputReset = function(){
  document.getElementById("newFnameText").value = "";
  document.getElementById("newLnameText").value = "";
    // document.getElementById("ageOption").value = "Choose Person's Age";
    document.getElementById("ageOption").selectedIndex = 0;

};

var getPeople = function(){
    var parDiv = document.getElementById("attendants");
    parDiv.classList.add("attendSpace");
    
    while(parDiv.firstChild)
        parDiv.removeChild(parDiv.firstChild);
    resetAges();
     attendeeDB.orderByChild("account").equalTo(acct).on("value", function(snapshot){
        snapshot.forEach(function (childSnapshot){
            var itemKey = childSnapshot.key();
          var aFirst = childSnapshot.val().firstname;
          var aLast = childSnapshot.val().lastname;
          var anAge = childSnapshot.val().age;
        renderPerson(aFirst,aLast,anAge,itemKey);
        updateAttendees(anAge);
        renderFamReg();
      });
});
}; 

var setPeopleCount = function(){
    attendeeDB.orderByChild("account").equalTo(acct).on("value", function(snapshot){
        snapshot.forEach(function (childSnapshot){
          var anAge = childSnapshot.val().age;
        updateAttendees(anAge);
      });
});
};

var updateAttendees = function(aPersAge){
  if (aPersAge == "Infant"){
      updateInfantAge();
  } else if(aPersAge == "Child"){
      updateChildAge();
  } else if(aPersAge == "Adult"){
      updateAdultAge();
  } else {
      updateSeniorAge();
  }
};

var determineFamCost = function(){
    var infantCost = infantAttend * 0;
    var seniorCost = seniorAttend * 0;
    var childCost = childAttend * 5;
    var adultCost = adultAttend * 20;
    famCost = infantCost + seniorCost + childCost + adultCost;
};


//  RENDERING THE SCREEN (VIEW)
var renderNewPersonHeader = function(){
    var divHead = document.getElementById("newPersonHead");
    var newHead = document.createElement("h3");
    newHead.innerHTML = "Register a new person that will be attending the reunion";
    divHead.appendChild(newHead);
};

var editItemName = function(personDiv, first, last,pKey){
    var newFirst = first;
    var newLast = last;
  var $div =document.getElementById(personDiv);
  $div.innerHTML = "";
  var $fnameInput = document.createElement("input");
  $fnameInput.setAttribute("type", "text");
  $fnameInput.setAttribute("id", "fnameText");
  $fnameInput.setAttribute("value", first);
  $fnameInput.innerHTML = first;
  $fnameInput.addEventListener("blur", function(ev){
         newFirst = document.getElementById("fnameText").value;
    });
 $div.appendChild($fnameInput);
 
  var $lnameInput = document.createElement("input");
  $lnameInput.setAttribute("type", "text");
  $lnameInput.setAttribute("id", "lnameText");
  $lnameInput.setAttribute("value", last);
  $lnameInput.addEventListener("blur", function(ev){
        newLast = document.getElementById("lnameText").value;
    });
      $div.appendChild($lnameInput);

    var $updateButton = document.createElement("button");
    $updateButton.setAttribute("type","button");
    var buttonName = first.concat(last).concat("Update"); 
    $updateButton.setAttribute("id",buttonName);
    $updateButton.innerHTML ="Update";
    $updateButton.addEventListener("click", function(ev){
        attendeeDB.child(pKey).update({firstname: newFirst, 
                      lastname: newLast
                    } );
        getPeople();
        renderFamReg();
    });
    $div.appendChild($updateButton);
    
    var $cancelButton = document.createElement("button");
    $cancelButton.setAttribute("type","button");
    $cancelButton.setAttribute("id","cancel");
    $cancelButton.innerHTML ="Cancel";
    $cancelButton.addEventListener("click", function(ev){
        getPeople();
    });
    $div.appendChild($cancelButton);
};

var renderPerson = function(firstName, lastName,aAge,itemKey){
    var $div = document.getElementById("attendants");
     var divName = firstName.concat(lastName); 
    var $namediv = document.createElement("div");
    $namediv.setAttribute("id",divName);
    $namediv.classList.add("personSpace");
    
    var $fnamediv = document.createElement("div");
    $fnamediv.innerHTML = firstName;
    $fnamediv.classList.add('individual_block_first');
    var divNameFirst = divName.concat("First");
    $fnamediv.setAttribute("id",divNameFirst);
    $namediv.appendChild($fnamediv);
    
    var $lnamediv = document.createElement("div");
    var divNameLast = divName.concat("Last");
    $lnamediv.innerHTML = lastName;
    $lnamediv.classList.add('individual_block');
    $lnamediv.setAttribute("id",divNameLast);
    $namediv.appendChild($lnamediv);
    
    renderChangeAge(divName,$namediv,aAge, itemKey); 
    
    var $editButton = document.createElement("button");
    $editButton.setAttribute("type","button");
    var buttonName = firstName.concat(lastName).concat("Edit"); 
    $editButton.setAttribute("id",buttonName);
    $editButton.innerHTML ="Edit Name";
    $editButton.addEventListener("click", function(ev){
        editItemName(divName,firstName,lastName, itemKey);
    });
    $namediv.appendChild($editButton);
    
    var $deleteButton = document.createElement("button");
    $deleteButton.setAttribute("type","button");
    var buttonName = firstName.concat(lastName).concat("Delete"); 
    $deleteButton.setAttribute("id",buttonName);
    $deleteButton.innerHTML ="Delete";
    $deleteButton.addEventListener("click", function(ev){
        deletePerson(itemKey);
    });
    $namediv.appendChild($deleteButton);
    
    $div.appendChild($namediv);
};

var renderWelcome= function(){
//   var $titleHead = document.getElementById("loginWelcome");
   var $titleHead = document.getElementById("loginHeader");
   var $tHeader =document.createElement("h1");
   $tHeader.classList.add("individual_block_first");
  $tHeader.innerHTML = "Welcome " + acct;
   $titleHead.appendChild($tHeader);
};

var renderTitle = function(){
    var $head = document.getElementById("logHead");
   var $header =document.createElement("h2");
  $header.innerHTML = "Your attendees for the Bowman Family Reunion";
   $head.appendChild($header);
};

var renderFirstNew = function(){
    var $nPFHead = document.getElementById("newPersonInput");
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
  $newFnameInput.innerHTML = null;
  $newFnameInput.addEventListener("blur", function(ev){
         first = document.getElementById("newFnameText").value;
  });
 $fNameDiv.appendChild($newFnameInput);
  $nPFHead.appendChild($fNameDiv);
};

var renderLastNew = function(){
    
    var $nPLHead = document.getElementById("newPersonInput");
    var $lNameDiv = document.createElement("div");
    $lNameDiv.classList.add("individual_block");
    
    
 var $newLnameLabel = document.createElement("label");
  $newLnameLabel.setAttribute("for", $newLnameInput);
  $newLnameLabel.innerHTML = "Last Name";
      $lNameDiv.appendChild($newLnameLabel);
    
    var $newLnameInput = document.createElement("input");
    $newLnameInput.setAttribute("type", "text");
    $newLnameInput.setAttribute("id", "newLnameText");
    $newLnameInput.addEventListener("blur", function(ev){
        last = document.getElementById("newLnameText").value;
    });
    
   $lNameDiv.appendChild($newLnameInput);
   $nPLHead.appendChild($lNameDiv);
};

var renderAgeNew = function(){
    var $nPAHead = document.getElementById("newPersonInput");
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
   $nPAHead.appendChild($ageDiv);
};

var renderChangeAge = function(apersonDiv, attachDiv, persAge,itemK){
    var newAge = "";
   var $indAgeDiv = document.createElement("div");
     var divNameAge = apersonDiv.concat("Age");
    $indAgeDiv.classList.add('individual_block');
    $indAgeDiv.setAttribute("id",divNameAge);
    
    var $ageClassification = document.createElement("select");
  $ageClassification.setAttribute("name", "age");
  var nameSelect = apersonDiv.concat("Select");
  $ageClassification.setAttribute("id", nameSelect);
  
    var $infantClassification = document.createElement("option");
  $infantClassification.setAttribute("value", "Infant");
  $infantClassification.setAttribute("id", "newInfantAge");
  $infantClassification.innerHTML = "Infant";
      if(persAge == "Infant"){
          $infantClassification.setAttribute("selected",true);
      }
      $ageClassification.appendChild($infantClassification);

    var $childClassification = document.createElement("option");
$childClassification.setAttribute("value", "Child");
$childClassification.setAttribute("id", "newChildAge");
  $childClassification.innerHTML = "Child";
     if(persAge == "Child"){
          $childClassification.setAttribute("selected",true)
      }
      $ageClassification.appendChild($childClassification);
      
      
  var $adultClassification = document.createElement("option");
  $adultClassification.setAttribute("value", "Adult");
  $adultClassification.setAttribute("id", "newAdultAge");
  $adultClassification.innerHTML = "Adult";
     if(persAge == "Adult"){
          $adultClassification.setAttribute("selected",true);
      }
      $ageClassification.appendChild($adultClassification);
      
     
  var $seniorClassification = document.createElement("option");
  $seniorClassification.setAttribute("value", "Senior");
  $seniorClassification.setAttribute("id", "newSeniorAge");
  $seniorClassification.innerHTML = "Distinguished Adult";
    if(persAge == "Senior"){
          $seniorClassification.setAttribute("selected",true)
      }
    
      $ageClassification.appendChild($seniorClassification);
      $ageClassification.addEventListener("change",function(ev){
         newAge =  document.getElementById(nameSelect).value;
         attendeeDB.child(itemK).update({age: newAge
                    } );
         getPeople();
         renderFamReg();
      });
       
   $indAgeDiv.appendChild($ageClassification);
   attachDiv.appendChild($indAgeDiv);
};

var renderSubmission = function(){
     var $nPLHead = document.getElementById("newPersonInput");
    var $buttSubmit = document.createElement("button");
     $buttSubmit.setAttribute("id", "personSubmit");
  $buttSubmit.innerHTML = "Add New Person";
  $buttSubmit.addEventListener("click", function(ev){
      personSubmit();
  });
  $nPLHead.appendChild($buttSubmit);
};

var renderNewPerson = function(){
    renderFirstNew();
    renderLastNew();
    renderAgeNew();
    renderSubmission();
};

var renderFamReg = function(){
    var $costHead = document.getElementById("registrationCost");
    $costHead.innerHTML = "";
   var $cHeader =document.createElement("h4");
   var stringBeg = "Your family has ";
   var infantString = infantAttend + " Infants, ";
   var childString = " " + childAttend + " Children, ";
   var adultString = " " + adultAttend + " Adults ";
   var seniorString = " and " + seniorAttend + " Seniors attending.";
    var attendanceString = stringBeg.concat(infantString).concat(childString).concat(adultString).concat(seniorString);   
  determineFamCost();
   var costString = "  The cost for your family to attend is ".concat(famCost).concat(".00 dollars.");
  $cHeader.innerHTML = attendanceString.concat(costString);
   $costHead.appendChild($cHeader);
};

var renderMemberNav = function(){
  var $div = document.getElementById("memberNav");
  var $butt = document.createElement("button");
  $butt.setAttribute("id", "tShirtMem");
  $butt.innerHTML = "TShirt Ordering";
  $butt.addEventListener("click", function(ev){
      showMemberShirtScreen();
  });
  $div.appendChild($butt);
  
   var $foodButt = document.createElement("button");
  $foodButt.setAttribute("id", "foodMem");
  $foodButt.innerHTML = "Food You Will Bring";
  $foodButt.addEventListener("click", function(ev){
      showMemberFoodScreen();
  });
  $div.appendChild($foodButt);
    
};

var renderCostButton = function(){
  var $div = document.getElementById("regButton");
  var costBut = document.createElement("button");
  costBut.setAttribute("id","costButton");
  costBut.innerHTML = "Calculate Registration Cost";
  costBut.addEventListener("click",function(ev){
      document.getElementById("regButton").classList.add("hidden");
      document.getElementById("registrationCost").classList.remove("hidden");
      renderFamReg();
  });
  $div.appendChild(costBut);
};

var renderLogoutButton = function(){
    //  var $div = document.getElementById("accountButtons");
     var $div = document.getElementById("loginHeader");
  var logoutButton = document.createElement("button");
  logoutButton.classList.add("individual_block");
  logoutButton.setAttribute("id","logOutButton");
  logoutButton.innerHTML = "Logout";
  logoutButton.addEventListener("click",function(ev){
      logout();
      showHomePageScreen();
  });
  $div.appendChild(logoutButton);
};

var renderMemberInformation = function(){
  var memDiv = document.getElementById("memberNews");
  var payChgDiv = document.createElement("h2");
  payChgDiv.innerHTML = "Before sending the money in make sure that you have the right address to send the money.";
  memDiv.appendChild(payChgDiv);
};


var renderPaymentInfo = function(){
    var div = document.getElementById("registrationPayment");
    div.classList.add("paymCont");
    var paymentDiv = document.createElement("div");
    paymentDiv.setAttribute("id","payDiv");
    paymentDiv.innerHTML = "";
    
    var payhead = document.createElement("div");
    payhead.innerHTML = "Send Registration Payment to the following Address: ";
    paymentDiv.appendChild(payhead);
    
    var payContact = document.createElement("div");
    payContact.innerHTML = "Delores Law";
    paymentDiv.appendChild(payContact);
    
    var payAddress = document.createElement("div");
    payAddress.innerHTML = "1 Lisa Drive";
    paymentDiv.appendChild(payAddress);
    
    var payCity = document.createElement("div");
    payCity.innerHTML = "Newark, DE, 19702";
    paymentDiv.appendChild(payCity);
    
    div.appendChild(paymentDiv);
    
}


var userStart = function(){
    setAcct();
    getPeople();
    // renderFamReg();
    renderWelcome();
    renderLogoutButton();
    renderTitle();
    renderNewPersonHeader();
    renderNewPerson();
    // renderCostButton();
    renderMemberInformation();
    renderPaymentInfo();
    renderMemberNav();
};

document.addEventListener('DOMContentLoaded',userStart);