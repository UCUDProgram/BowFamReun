var acct = "";
var first = "";
var last = "";
var ageStatus = "";
var DB = new Firebase("https://bowmanfamreun.firebaseio.com/");
var attendeeDB = new Firebase("https://bowmanfamreun.firebaseio.com/Attendee");
var ages = ["Infant","Child","Adult","Senior"];

var setFirst = function(){
    first = document.getElementById("fName").value;
};

var setLast = function(){
    last = document.getElementById("lName").value;
};

var deletePerson = function(aKey){
    attendeeDB.child(aKey).remove();
    getPeople();
};

var personSubmit = function(){
  var regData = DB.child("Names");
  regData.push().set({firstname: first, 
                      lastname: last,
                      age: ageStatus
                    });
    getPeople();
    inputReset();
};

var inputReset = function(){
  document.getElementById("fName").value = "";
  document.getElementById("lName").value = "";
};

var renderAgeClassify = function(adiv){
  var newAge = "";
var $ageClassify = document.createElement("select");
//   $ageClassify.setAttribute("type", "text");
  $ageClassify.setAttribute("name", "age");
  // $ageClassify.addEventListener("change", function(ev){
  //   });
  ages.forEach(function(ageOption){
      var $ageClass = document.createElement("option");
//   $ageClassify.setAttribute("type", "text");
  $ageClass.setAttribute("value", ageOption);
  $ageClass.innerHTML = ageOption;
  $ageClass.classList.add(ageOption);
  $ageClass.addEventListener("change", function(ev){
      newAge = ageOption;
    });
      $ageClassify.appendChild($ageClass);
  });
  
  var $defaultClass = document.createElement("option");
//   $ageClassify.setAttribute("type", "text");
  $defaultClass.setAttribute("value", "Default");
  $defaultClass.innerHTML = "Set the age of the Person";
  $defaultClass.classList.add("Default");
  $defaultClass.addEventListener("change", function(ev){
      // newAge = ageOption;
    });
      $ageClassify.appendChild($defaultClass);
  
  adiv.appendChild($ageClassify);
};
      
//       var $infantClassify = document.createElement("option");
// //   $ageClassify.setAttribute("type", "text");
//   $infantClassify.setAttribute("value", "Infant");
//   $infantClassify.innerHTML = "Infant";
//   $infantClassify.classList.add("Infant");
//   $infantClassify.addEventListener("change", function(ev){
//       newAge = "Infant";
//     });
//       $ageClassify.appendChild($infantClassify);
      
      
//       var $childClassify = document.createElement("option");
// //   $ageClassify.setAttribute("type", "text");
// $infantClassify.setAttribute("value", "Child");
//   $infantClassify.innerHTML = "Child";
//   $infantClassify.classList.add("Child");
//   $childClassify.addEventListener("blur", function(ev){
//         newAge="Child";
//     });
//       $ageClassify.appendChild($childClassify);
      
      
//       var $adultClassify = document.createElement("option");
// //   $ageClassify.setAttribute("type", "text");
//   $adultClassify.setAttribute("value", "Adult");
//   $adultClassify.innerHTML = "Adult";
//   $adultClassify.classList.add("Adult");
//     $adultClassify.addEventListener("blur", function(ev){
//         newAge = "Adult";
//     });
//       $ageClassify.appendChild($adultClassify);
      
      
//       var $seniorClassify = document.createElement("option");
// //   $ageClassify.setAttribute("type", "text");
//   $seniorClassify.setAttribute("value", "Senior");
//   $seniorClassify.innerHTML = "Distinguished";
//   $seniorClassify.classList.add("Senior");
//   $ageClassify.addEventListener("blur", function(ev){
//         newAge="Senior";
//     });
//       $ageClassify.appendChild($seniorClassify);
      
      
//       var $defaultClassify = document.createElement("optiont");
// //   $ageClassify.setAttribute("type", "text");
// $seniorClassify.setAttribute("value", "Choose Age");
//   $seniorClassify.innerHTML = "Choose Person's Age";
//   $seniorClassify.classList.add("Choose Person's Age");
  // $ageClassify.addEventListener("blur", function(ev){
       
       
  //   });
  //     $ageClassify.appendChild($defaultClassify);
  
  // adiv.appendChild($ageClassify);
  


var editItem = function(personDiv, first, last,pKey){
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

      renderAgeClassify($div);
      
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
    $div.innerHTML = '';
     DB.on("value", function(snapshot){
        var index =0;
        snapshot.forEach(function (childSnapshot){
            var itemKey = childSnapshot.key();
          var aFirst = childSnapshot.val().firstname;
          var aLast = childSnapshot.val().lastname;
        renderPerson(aFirst,aLast,itemKey);
        index++;
      });
})}; 

var renderPerson = function(firstName, lastName,itemKey){
    var $div = document.getElementById("names");
     var divName = firstName.concat(lastName); 
    var $namediv = document.createElement("div");
    $namediv.setAttribute("id",divName);
    var $fnamediv = document.createElement("div");
    $fnamediv.innerHTML = firstName;
    $fnamediv.classList.add('rowBlockFirst');
    $namediv.appendChild($fnamediv);
    
    var $lnamediv = document.createElement("div");
    $lnamediv.innerHTML = lastName;
    $lnamediv.classList.add('rowBlock');
    $namediv.appendChild($lnamediv);
    
    
    var $editButton = document.createElement("button");
    $editButton.setAttribute("type","button");
    var buttonName = firstName.concat(lastName).concat("Edit"); 
    $editButton.setAttribute("id",buttonName);
    $editButton.innerHTML ="Edit";
    $editButton.addEventListener("click", function(ev){
        editItem(divName,firstName,lastName, itemKey);
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
   var $head = document.getElementById("loginHome");
   var $header =document.createElement("h2");
   $header.innerHTML = "Welcome ".concat(member);
   $head.appendChild($header);
};


var userStart = function(){
    getPeople();
    // renderWelcome();
    
    
    // document.getElementById("fName").addEventListener("blur",setFirst);
    // document.getElementById("lName").addEventListener("blur",setLast);
    // document.getElementById("addPerson").addEventListener("click",personSubmit);

    
};

document.addEventListener('DOMContentLoaded',userStart);