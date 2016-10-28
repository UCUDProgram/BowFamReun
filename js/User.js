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


var deletePerson = function(aKey){
    attendeeDB.child(aKey).remove();
    getPeople();
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
    // console.log(ageStatus);
    
  var regData = DB.child("Attendees");
  regData.push().set({firstname: first,
                        account:"LawAdmin", 
                        // userAccount.name
                      lastname: last,
                      age: ageStatus
                    });
    getPeople();
    renderFamReg();
    // inputReset();
};

var updateAgeStatus = function(anAgeOption){
    ageStatus = anAgeOption;
};


var inputReset = function(){
  document.getElementById("fName").value = "";
  document.getElementById("lName").value = "";
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
        // console.log(newFirst);
    });
 $div.appendChild($fnameInput);
 
  var $lnameInput = document.createElement("input");
  $lnameInput.setAttribute("type", "text");
  $lnameInput.setAttribute("id", "lnameText");
  $lnameInput.setAttribute("value", last);
  $lnameInput.addEventListener("blur", function(ev){
        newLast = document.getElementById("lnameText").value;
        // console.log(newLast);
    });
      $div.appendChild($lnameInput);

    //   renderAgeClassify($div);
      
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

var getPeople = function(){
    var $div = document.getElementById("attendants");
    var parDiv = document.getElementById("attendants");
    while(parDiv.firstChild)
        parDiv.removeChild(parDiv.firstChild);
    resetAges();
    // $div.innerHTML = '';
    // LawAdmin"
    // var user = userAccount.getName();
    // console.log(user);
    // console.log(useAcct);
    // "LawAdmin"
     attendeeDB.orderByChild("account").equalTo("LawAdmin").on("value", function(snapshot){
        // console.log(snapshot);
        // var index =0;
        snapshot.forEach(function (childSnapshot){
            var itemKey = childSnapshot.key();
          var aFirst = childSnapshot.val().firstname;
          var aLast = childSnapshot.val().lastname;
          var anAge = childSnapshot.val().age
          console.log(anAge);
        renderPerson(aFirst,aLast,anAge,itemKey);
        updateAttendees(anAge);
        // index++;
      });
});
    // renderFamReg();
}; 

var updateAttendees = function(aPersAge){
  if (aPersAge == "Infant"){
      updateInfantAge();
      console.log(infantAttend);
  } else if(aPersAge == "Child"){
      updateChildAge();
      console.log(childAttend);
  } else if(aPersAge == "Adult"){
      updateAdultAge();
      console.log(adultAttend);
  } else {
      updateSeniorAge();
      console.log(seniorAttend);
  }
};

var renderPerson = function(firstName, lastName,aAge,itemKey){
    var $div = document.getElementById("attendants");
     var divName = firstName.concat(lastName); 
    var $namediv = document.createElement("div");
    $namediv.setAttribute("id",divName);
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


// var $indAgeDiv = document.createElement("div");
//     // $indAgeDiv.innerHTML = aAge;
//     var divNameAge = divName.concat("Age");
//     $indAgeDiv.classList.add('individual_block');
//     $indAgeDiv.setAttribute("id",divNameAge);
//     renderChangeAge(divNameAge,$namediv,itemKey); 
//     $namediv.appendChild($indAgeDiv);


    //  var $indAgeDiv = document.createElement("div");
    //  var divNameAge = divName.concat("Age");
    // // $indAgeDiv.innerHTML = aAge;
    // $indAgeDiv.classList.add('individual_block');
    // $indAgeDiv.setAttribute("id",divNameAge);
    renderChangeAge(divName,$namediv,aAge, itemKey); 
    // $namediv.appendChild($indAgeDiv);



    
    
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
   var $titleHead = document.getElementById("loginWelcome");
   var $tHeader =document.createElement("h1");
  $tHeader.innerHTML = "Welcome Kinfolk ";
   $titleHead.appendChild($tHeader);
};

var renderTitle = function(){
    var $head = document.getElementById("logHead");
   var $header =document.createElement("h2");
  $header.innerHTML = "Attendees for the Bowman Family Reunion";
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
  $defaultClassify.innerHTML = "Choose Person's Age";
       $ageClassify.appendChild($defaultClassify);
    
    var $infantClassify = document.createElement("option");
  $infantClassify.setAttribute("value", "Infant");
  $infantClassify.setAttribute("id", "infantAge");
  $infantClassify.innerHTML = "Infant";
//   $infantClassify.addEventListener("change", function(ev){
    // document.getElementById("ageOption").value = document.getElementById("infantAge").value;
    // console.log(document.getElementById("ageOption").value);
    // });
      $ageClassify.appendChild($infantClassify);
      
      
    var $childClassify = document.createElement("option");
$childClassify.setAttribute("value", "Child");
$childClassify.setAttribute("id", "childAge");
  $childClassify.innerHTML = "Child";
//   $childClassify.addEventListener("onchange", function(ev){
        // ageStatus ="Child";
    // });
      $ageClassify.appendChild($childClassify);
      
      
  var $adultClassify = document.createElement("option");
  $adultClassify.setAttribute("value", "Adult");
  $adultClassify.setAttribute("id", "adultAge");
  $adultClassify.innerHTML = "Adult";
  $adultClassify.classList.add("Adult");
    // $adultClassify.addEventListener("change", function(ev){
    // document.getElementById("ageOption").value = document.getElementById("adultAge").value;
    // ageStatus = document.getElementById("ageClassify").value;
    // });
      $ageClassify.appendChild($adultClassify);
      
      
  var $seniorClassify = document.createElement("option");
  $seniorClassify.setAttribute("value", "Senior");
  $seniorClassify.setAttribute("id", "seniorAge");
  $seniorClassify.innerHTML = "Distinguished Adult";
//   $seniorClassify.addEventListener("change", function(ev){
        // ageStatus = document.getElementById("seniorAge").value;
    // });
      $ageClassify.appendChild($seniorClassify);
      
   $ageDiv.appendChild($ageClassify);
   $nPAHead.appendChild($ageDiv);
};

var renderChangeAge = function(apersonDiv, attachDiv, persAge,itemK){
    var newAge = "";
    // var $div = document.getElementById(apersonDivName);
   var $indAgeDiv = document.createElement("div");
     var divNameAge = apersonDiv.concat("Age");
    // $indAgeDiv.innerHTML = aAge;
    $indAgeDiv.classList.add('individual_block');
    $indAgeDiv.setAttribute("id",divNameAge);
    
    
    var $ageClassification = document.createElement("select");
  $ageClassification.setAttribute("name", "age");
  var nameSelect = apersonDiv.concat("Select");
//   $ageClassification.setAttribute("id", "newAgeOption");
  $ageClassification.setAttribute("id", nameSelect);
  
//  $ageClassification.setAttribute("value",persAge);
//  document.getElementById("newAgeOption").value = persAge;
 
    var $infantClassification = document.createElement("option");
  $infantClassification.setAttribute("value", "Infant");
  $infantClassification.setAttribute("id", "newInfantAge");
  $infantClassification.innerHTML = "Infant";
//   $infantClassification.addEventListener("change", function(ev){
    // document.getElementById("ageOption").value = document.getElementById("infantAge").value;
    // console.log(document.getElementById("ageOption").value);
    // });
      if(persAge == "Infant"){
          $infantClassification.setAttribute("selected",true);
      }
      
      $ageClassification.appendChild($infantClassification);

      
    var $childClassification = document.createElement("option");
$childClassification.setAttribute("value", "Child");
$childClassification.setAttribute("id", "newChildAge");
  $childClassification.innerHTML = "Child";
//   $childClassification.addEventListener("onchange", function(ev){
//         ageStatus ="Child";
//     });
     if(persAge == "Child"){
          $childClassification.setAttribute("selected",true)
      }
      
      $ageClassification.appendChild($childClassification);
      
      
  var $adultClassification = document.createElement("option");
  $adultClassification.setAttribute("value", "Adult");
  $adultClassification.setAttribute("id", "newAdultAge");
  $adultClassification.innerHTML = "Adult";
//   $adultClassification.classList.add("Adult");
    // $adultClassification.addEventListener("change", function(ev){
    // document.getElementById("ageOption").value = document.getElementById("adultAge").value;
    // ageStatus = document.getElementById("ageClassify").value;
    // });
     if(persAge == "Adult"){
          $adultClassification.setAttribute("selected",true);
      }
      
      $ageClassification.appendChild($adultClassification);
      
      
  var $seniorClassification = document.createElement("option");
  $seniorClassification.setAttribute("value", "Senior");
  $seniorClassification.setAttribute("id", "newSeniorAge");
  $seniorClassification.innerHTML = "Distinguished Adult";
//   $seniorClassification.addEventListener("change", function(ev){
        // ageStatus = document.getElementById("seniorAge").value;
    // });
    if(persAge == "Senior"){
          $seniorClassification.setAttribute("selected",true)
      }
    
      $ageClassification.appendChild($seniorClassification);
      $ageClassification.addEventListener("change",function(ev){
        //  newAge =  document.getElementById("newAgeOption").value;
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

var determineFamCost = function(){
    var infantCost = infantAttend * 0;
    var seniorCost = seniorAttend * 0;
    var childCost = childAttend * 5;
    var adultCost = adultAttend * 20;
    famCost = infantCost + seniorCost + childCost + adultCost;
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


var userStart = function(){
    //   document.getElementById("loginHome").classList.remove('hidden');

    // var user = document.getElementById("user").value;
    // console.log(user);
    
    getPeople();
    renderWelcome();
    renderTitle();
    renderNewPerson();
    renderFamReg();
    // document.getElementById("fName").addEventListener("blur",setFirst);
    // document.getElementById("lName").addEventListener("blur",setLast);
    // document.getElementById("addPerson").addEventListener("click",personSubmit);

    
};

document.addEventListener('DOMContentLoaded',userStart);