var pages = ["personSearch", "searchResults","personView", "personEdit"];

var accountDB = new Firebase("https://bowmanfamreun.firebaseio.com/Accounts");
var shirtsDB = new Firebase("https://bowmanfamreun.firebaseio.com/TShirt");
var attendDB = new Firebase("https://bowmanfamreun.firebaseio.com/Attendees");
var foodDB = new Firebase("https://bowmanfamreun.firebaseio.com/Food");
//THIS SECTION ADDRESSES THE SEARCH PAGE VIEW




//THIS SECTION ADDRESSES THE RESULTS PAGE VIEW




//THIS SECTION ADDRESSES THE VIEWING OF AN ACCOUNT


var renderPersName = function(first, last){
    
    
    var namDv = document.createElement("div");
    
    var fnmDv = document.createElement("div");
    fnmDv.innerHTML = "First Name: " + first;
    namDv.appendChild(fnmDv);
    
    var lnmDv = document.createElement("div");
    lnmDv.innerHTML = "Last Name: " + last;
    namDv.appendChild(lnmDv);
    
};

var renderPersAddr = function(addre){
  
  
  var addrDv = document.createElement("div");
  addrDv.innerHTML = "Address: " + addre;
  
  
    
};

var renderPersMailAddr = function(cit,sta,zipC){
  
  
  var mailDv = document.createElement("div");
  
  var citDv = document.createElement("div");
  citDv.innerHTML = "City: " + cit;
  mailDv.appendChild(citDv);
  
  var stDv = document.createElement("div");
  stDv.innerHTML = "State: " + sta;
  mailDv.appendChild(stDv);
  
  var zpDv = document.createElement("div");
  zpDv.innerHTML = "Zipcode: " + zipC;
  mailDv.appendChild(zpDv);
  
};

var renderPersContact = function(phon, emai){
  
  
  var conDv = document.createElement("div");
  
  var phonDv = document.createElement("div");
  phonDv.innerHTML = "Phone Number " + phon;
  conDv.appendChild(phonDv);
  
  var emalDv = document.createElement("div");
  emalDv.innerHTML = "Email Address " + emai;
  conDv.appendChild(emalDv);
  
    
};

var renderShirtOrder = function(sm, me, lg, xl, xxl, xxxl, xxxxl){
  
  var smll = document.createElement("div");
  smll.innerHTML = sm + " Small Shirts";
  
  
  var mdm = document.createElement("div");
  mdm.innerHTML = me + " Medium Shirts";
  
  
  var lrg = document.createElement("div");
  lrg.innerHTML = lg + " Large Shirts";
  
  
  var xlrg = document.createElement("div");
  xlrg.innerHTML = xl + " XL Shirts";
  
  
  var xxlrg = document.createElement("div");
  xxlrg.innerHTML = xxl + " XXL Shirts";
  
  
  var xxxlrg = document.createElement("div");
  xxxlrg.innerHTML = xxxl + " XXXL Shirts";
  
  
  var xxxxlrg = document.createElement("div");
  xxxxlrg.innerHTML = xxxxl + " XXXXL Shirts";
    
};

var renderFd = function(fdNam, fdCateg){
  
  
  var fdNmDv = document.createElement("div");
  fdNmDv.innerHTML = "Food Name: " + fdNam;
  
  
  var fdCtDv = document.createElement("div");
  fdCtDv.innerHTML = "Category: " + fdCateg;
  
    
};

var renderAttendent = function(attFirst, attLast, attAge){
  
  var atFirDv = document.createElement("div");
  atFirDv.innerHTML = attFirst + " " + attLast;
    
};



// THIS SECTION ADDRESSES THE EDIT VIEW OF AN ACCOUNT
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

var updateAccountInfo = function(key){
      
};



var renderPersEditName = function(first, last){
    
    
    var namDv = document.createElement("div");
    
    var fnmDv = document.createElement("div");
    fnmDv.innerHTML = "First Name: " + first;
    namDv.appendChild(fnmDv);
    
    var lnmDv = document.createElement("div");
    lnmDv.innerHTML = "Last Name: " + last;
    namDv.appendChild(lnmDv);
    
};

var editAddress = function(addres){
  
  
  
  var addDiv = document.createElement("div");
  var addrLbl = document.createElement("label");
  addrLbl.setAttribute("for", "editAddr");
  addrLbl.innerHTML = "Address: ";
  addDiv.appendChild(addrLbl);
  
  var addrIpt = document.createElement("input");
  addrIpt.setAttribute("type", "text");
  addrIpt.setAttribute("id", "editAddr");
    addrIpt.setAttribute("value", addres);
    addrIpt.addEventListener("blur", function(ev){
       newAddress = document.getElementById("editAddr").value; 
    });
  addDiv.appendChild(addrIpt);


};

var editCity = function(ciy){
  
  
  
  var addDiv = document.createElement("div");
  var addrLbl = document.createElement("label");
  addrLbl.setAttribute("for", "editCity");
  addrLbl.innerHTML = "City: ";
  addDiv.appendChild(addrLbl);
  
  var addrIpt = document.createElement("input");
  addrIpt.setAttribute("type", "text");
  addrIpt.setAttribute("id", "editCity");
    addrIpt.setAttribute("value", ciy);
    addrIpt.addEventListener("blur", function(ev){
       newCity = document.getElementById("editCity").value; 
    });
  addDiv.appendChild(addrIpt);


};

var editState = function(stte){
  
  
  
  var addDiv = document.createElement("div");
  var addrLbl = document.createElement("label");
  addrLbl.setAttribute("for", "editState");
  addrLbl.innerHTML = "State: ";
  addDiv.appendChild(addrLbl);
  
  var addrIpt = document.createElement("input");
  addrIpt.setAttribute("type", "text");
  addrIpt.setAttribute("id", "editState");
    addrIpt.setAttribute("value", stte);
    addrIpt.addEventListener("blur", function(ev){
       newState = document.getElementById("editState").value; 
    });
  addDiv.appendChild(addrIpt);


};

var editZip = function(zpCd){
  
  
  
  var addDiv = document.createElement("div");
  var addrLbl = document.createElement("label");
  addrLbl.setAttribute("for", "editZip");
  addrLbl.innerHTML = "Zipcode: ";
  addDiv.appendChild(addrLbl);
  
  var addrIpt = document.createElement("input");
  addrIpt.setAttribute("type", "text");
  addrIpt.setAttribute("id", "editZip");
    addrIpt.setAttribute("value", zpCd);
    addrIpt.addEventListener("blur", function(ev){
       newZipCode = document.getElementById("editZip").value; 
    });
  addDiv.appendChild(addrIpt);


};

var editEmail = function(eml){
  
  
  
  var addDiv = document.createElement("div");
  var addrLbl = document.createElement("label");
  addrLbl.setAttribute("for", "editEmail");
  addrLbl.innerHTML = "Email Address: ";
  addDiv.appendChild(addrLbl);
  
  var addrIpt = document.createElement("input");
  addrIpt.setAttribute("type", "text");
  addrIpt.setAttribute("id", "editEmail");
    addrIpt.setAttribute("value", eml);
    addrIpt.addEventListener("blur", function(ev){
       newEmail = document.getElementById("editEmail").value; 
    });
  addDiv.appendChild(addrIpt);


};

var editPhone = function(phn){
  
  
  
  var addDiv = document.createElement("div");
  var addrLbl = document.createElement("label");
  addrLbl.setAttribute("for", "editPhone");
  addrLbl.innerHTML = "Phone Number: ";
  addDiv.appendChild(addrLbl);
  
  var addrIpt = document.createElement("input");
  addrIpt.setAttribute("type", "text");
  addrIpt.setAttribute("id", "editPhone");
    addrIpt.setAttribute("value", phn);
    addrIpt.addEventListener("blur", function(ev){
       newPhone = document.getElementById("editPhone").value; 
    });
  addDiv.appendChild(addrIpt);


};

var renderEditSmallShirt = function(smallSht){
  
  
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
        if(i == smallSht){
            $iOption.setAttribute("selected", true);
        }
    }
    $smallselection.addEventListener("change", function(ev){
       newSmallShirt = document.getElementById("userSmallTSh").value;
    });
    $smallDiv.appendChild($smallselection);
  
    
};

var renderEditMediumShirt = function(medSht){
  
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
        if(i == medSht){
            $iOption.setAttribute("selected", true);
        }
        $mediumselection.appendChild($iOption);
    }
    $mediumselection.addEventListener("change", function(ev){
       newMediumShirt = document.getElementById("userMediumTSh").value;
    });
    $mediumDiv.appendChild($mediumselection);
    
};

var renderEditLargeShirt = function(lgSht){


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
        if(i == lgSht){
            $iOption.setAttribute("selected", true);
        }
    }
    $largeselection.addEventListener("change", function(ev){
       newLargeShirt = document.getElementById("userLargeTSh").value;
    });
    $largeDiv.appendChild($largeselection);
    
    
};

var renderEditXLShirt = function (xlgSht){
    
    
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
        if(i == xlgSht){
            $iOption.setAttribute("selected", true);
        }
    }
    $xlargeselection.addEventListener("change", function(ev){
       newXLShirt = document.getElementById("userXLargeTSh").value;
    });
    $xlargeDiv.appendChild($xlargeselection);
    
    
};

var renderEditXXLShirt = function(xxlgSht){
    
    
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
        if(i == xxlgSht){
            $iOption.setAttribute("selected", true);
        }
    }
    $xXLselection.addEventListener("change", function(ev){
       newXXLShirt = document.getElementById("userXXLTSh").value;
    });
    $xXLDiv.appendChild($xXLselection);
    
    
};

var renderEditXXXLShirt = function(xxxlgSht){
    
    
    
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
        if(i == xxxlgSht){
            $iOption.setAttribute("selected", true);
        }
    }
    $xXXLselection.addEventListener("change", function(ev){
       newXXXLShirt = document.getElementById("userXXXLTSh").value;
    });
    $xXXLDiv.appendChild($xXXLselection);
    
    
    
};

var renderEditXXXXLShirt = function(xxxxlgSht){
    
    
    
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
        if(i == xxxxlgSht){
            $iOption.setAttribute("selected", true);
        }
    }
    $xXXXLselection.addEventListener("change", function(ev){
       newXXXXLShirt = document.getElementById("userXXXLTSh").value;
    });
    $xXXXLDiv.appendChild($xXXXLselection);
    
    
    
};

var adminSearchStart = function(){
    
};

document.addEventListener("DOMContentLoaded", adminSearchStart);