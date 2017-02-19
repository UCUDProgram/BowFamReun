var smallTShirt = 0;
var mediumTShirt = 0;
var largeTShirt = 0;
var xLgTShirt = 0;
var xXLTShirt = 0;
var tripXLTShirt = 0;
var quadXLTShirt = 0;
var userAccount = "";

var regShirtCost = 10;
var largerShirtCost = 12;
var totalShirtCost = 0;

var tShirtDB = new Firebase("https://bowmanfamreun.firebaseio.com/TShirt");
var DB = new Firebase("https://bowmanfamreun.firebaseio.com/");

var updateSmallTShirt= function(sm){
    smallTShirt = sm;  
};

var updateMediumTShirt= function(med){
    mediumTShirt = med;  
};

var updateLargeTShirt= function(lg){
    largeTShirt = lg;  
};

var updateXLTShirt= function(xLg){
    xLgTShirt = xLg;  
};

var updateXXLTShirt= function(xxL){
    xXLTShirt = xxL;
};

var updateXXXLTShirt= function(xxxL){
    tripXLTShirt = xxxL;
};

var updateXXXXLTShirt= function(xxxxL){
    quadXLTShirt = xxxxL;
};

var initShirtSubmit = function(){
  var regData = DB.child("TShirt");
  regData.push().set({account:userAccount, 
                      small: smallTShirt,
                      medium: mediumTShirt,
                      large: largeTShirt,
                      xL: xLgTShirt,
                      xxLarge: xXLTShirt,
                      xxxLarge: tripXLTShirt,
                      xxxxLarge: quadXLTShirt
                    });
    getTShirtData();
};

var getShirtUser = function(){
    userAccount = localStorage.getItem("user");
     if(userAccount == null){
      showLoginScreen();
     }
};

var getTShirtData = function(){
    tShirtDB.orderByChild("account").equalTo(userAccount).on("value", function(snapshot){
        if(snapshot.val() == null){
            renderNewTShirtOrder();
            renderNewTShirtButton();
        } else {
        snapshot.forEach(function (childSnapshot){
          var key = childSnapshot.key();
          var small = childSnapshot.val().small;
          var medium = childSnapshot.val().medium;
          var large = childSnapshot.val().large;
          var xLG = childSnapshot.val().xL;
          var doubleXLarge = childSnapshot.val().xxLarge;
          var tripXLarge = childSnapshot.val().xxxLarge;
          var quadXLarge = childSnapshot.val().xxxxLarge;
        updateTShirtOrder(small,medium,large,xLG, doubleXLarge,tripXLarge,quadXLarge);
        renderUserTShirtOrder(key);
        renderShirtCost();
      })
      }});
};

var updateTShirtOrder = function(sma,medi,lar,xlarge, doubXLg, tripXLg, quadXLg){
    updateSmallTShirt(sma);
    updateMediumTShirt(medi);
    updateLargeTShirt(lar);
    updateXLTShirt(xlarge);
    updateXXLTShirt(doubXLg);
    updateXXXLTShirt(tripXLg);
    updateXXXXLTShirt(quadXLg);
};

//  RENDERING THE SCREEN (VIEW)
var renderMemberTShirtScreen = function(){
    renderTShirtOrderHeader();
    renderTShirtOrderLook();
};

var renderTShirtOrderHeader = function(){
    var $tShHd = document.getElementById("teeShirtLogin");
    var tShirtHead = document.getElementById("tShirtHeader");
    var $tShirtOrdHead = document.createElement("h1");
    $tShirtOrdHead.innerHTML = userAccount + " Member TShirt Ordering";
    tShirtHead.appendChild($tShirtOrdHead);
    $tShHd.appendChild(tShirtHead);
};

var renderTShirtOrderLook = function(){
    var memTShirtSource = document.getElementById("teeShirtLogin");
     var tShirtOrigDiv = document.getElementById("tShirtPicture");
    var tShirtFirstDiv = document.createElement("div");

    var tShirtImage1Div = document.createElement("div");
    tShirtImage1Div.setAttribute("id","tshirt");
    
    var tShirtFrontText = document.createElement("div");
    tShirtFrontText.classList.add("textCentered");
    tShirtFrontText.innerHTML = "Front";
    tShirtImage1Div.appendChild(tShirtFrontText);
    
    var tShirtFrontImage = document.createElement("img");
    tShirtFrontImage.setAttribute("src", "../images/BFR Tee Shirt Front 2.jpg");
    tShirtFrontImage.setAttribute("id","tshirt");
    tShirtImage1Div.appendChild(tShirtFrontImage);
    tShirtFirstDiv.appendChild(tShirtImage1Div);
    
    var tShirtImage2Div = document.createElement("div");
    tShirtImage2Div.setAttribute("id","tshirt");
    
    var tShirtBackText = document.createElement("div");
    tShirtBackText.classList.add("textCentered");
    tShirtBackText.innerHTML = "Back";
    tShirtImage2Div.appendChild(tShirtBackText);
    
    var tShirtBackImage = document.createElement("img");
    tShirtBackImage.setAttribute("src", "../images/BFR Tee Shirt Back.jpg");
    tShirtBackImage.setAttribute("id","tshirt");
    tShirtImage2Div.appendChild(tShirtBackImage);
    
    tShirtFirstDiv.appendChild(tShirtImage2Div);
    tShirtOrigDiv.appendChild(tShirtFirstDiv);
    memTShirtSource.appendChild(tShirtOrigDiv);
};

var renderUserTShirtOrder = function(userKey){
    document.getElementById("initTShirtOptions").classList.add("hidden");
    document.getElementById("updateTShirtOptions").classList.remove("hidden");
    var parDiv = document.getElementById("updateTShirtOptions");
    while(parDiv.firstChild)
        parDiv.removeChild(parDiv.firstChild);
    renderUserSmallTShirtOrder(userKey);
    renderUserMediumTShirtOrder(userKey);
    renderUserLargeTShirtOrder(userKey);
    renderUserXLargeTShirtOrder(userKey);
    renderUserXXLTShirtOrder(userKey);
    renderUserXXXLTShirtOrder(userKey);
    renderUserXXXXLTShirtOrder(userKey);
};

var renderNewTShirtOrder = function(){
  renderSmallTShirtOption();
  renderMediumTShirtOption();
  renderLargeTShirtOption();
  renderXLTShirtOption();
  renderXXLTShirtOption();
  renderXXXLTShirtOption();
  renderXXXXLTShirtOption();
};

var renderNewTShirtButton = function(){
    var $nTSDiv = document.getElementById("teeShirtLogin");
     var $div =document.getElementById("initTShirtOptions");
     var $orderSubmit = document.createElement("button");
     $orderSubmit.setAttribute("type","button");
    $orderSubmit.setAttribute("id","OrderShirts");
    $orderSubmit.innerHTML ="Order TShirts";
    $orderSubmit.addEventListener("click", function(ev){
        initShirtSubmit();
    });
    $div.appendChild($orderSubmit);
    $nTSDiv.appendChild($div);
};

var renderSmallTShirtOption = function(){
    var newSmall = 0;
    var $smOptDiv = document.getElementById("teeShirtLogin");
    var $div =document.getElementById("initTShirtOptions");
    var $smallDiv = document.createElement("div");
    $smallDiv.classList.add("individual_block_first");
$smallDiv.setAttribute("id", "smallShirtDiv");
  var $smallShirtLabel = document.createElement("div");
  $smallShirtLabel.setAttribute("id", "smallShirt");
  $smallShirtLabel.innerHTML = "Small";
  $smallDiv.appendChild($smallShirtLabel);
    
   var $selection = document.createElement("select");
    $selection.setAttribute("name","smallOrder");
    $selection.setAttribute("id","smallTSh");
    for(var i =0; i<11;i++){
        var $iOption = document.createElement("option");
        $iOption.setAttribute("value",i);
        var itemId = i + "Option";
        $iOption.setAttribute("id", itemId);
        $iOption.innerHTML = i;
        if($iOption.value == smallTShirt){
            $iOption.setAttribute("selected",true);
        }
        $selection.appendChild($iOption);
    }
    
    $selection.addEventListener("change", function(ev){
       newSmall = document.getElementById("smallTSh").value;
       updateSmallTShirt(newSmall);
    });
    
    $smallDiv.appendChild($selection);
    $div.appendChild($smallDiv);
    $smOptDiv.appendChild($div);
};

var renderMediumTShirtOption = function(){
    var newMedium = 0;
    var $mdOptDiv = document.getElementById("teeShirtLogin");
     var $div =document.getElementById("initTShirtOptions");
    var $mediumDiv = document.createElement("div");
    $mediumDiv.classList.add("individual_block");
  var $mediumShirtLabel = document.createElement("div");
  $mediumShirtLabel.setAttribute("id", "mediumShirt");
  $mediumShirtLabel.innerHTML = "Medium";
  $mediumDiv.appendChild($mediumShirtLabel);
    
   var $mediumselection = document.createElement("select");
    $mediumselection.setAttribute("name","mediumOrder");
    $mediumselection.setAttribute("id","mediumTSh");
    for(var i =0; i<11;i++){
        var $iOption = document.createElement("option");
        $iOption.setAttribute("value",i);
        var itemId = i + "Option";
        $iOption.setAttribute("id", itemId);
        $iOption.innerHTML = i;
        $mediumselection.appendChild($iOption);
    }
    $mediumselection.addEventListener("change", function(ev){
       newMedium = document.getElementById("mediumTSh").value;
       updateMediumTShirt(newMedium);
    });
    $mediumDiv.appendChild($mediumselection);
    $div.appendChild($mediumDiv);
    $mdOptDiv.appendChild($div);
};

var renderLargeTShirtOption = function(){
    var newLarge = 0;
    var $lgOptDiv = document.getElementById("teeShirtLogin");
     var $div =document.getElementById("initTShirtOptions");
    var $largeDiv = document.createElement("div");
    $largeDiv.classList.add("individual_block");
    
  var $largeShirtLabel = document.createElement("div");
  $largeShirtLabel.setAttribute("id", "largeShirt");
  $largeShirtLabel.innerHTML = "Large";
  $largeDiv.appendChild($largeShirtLabel);
    
   var $largeselection = document.createElement("select");
    $largeselection.setAttribute("name","largeOrder");
    $largeselection.setAttribute("id","largeTSh");
    for(var i =0; i<11;i++){
        var $iOption = document.createElement("option");
        $iOption.setAttribute("value",i);
        var itemId = i + "Option";
        $iOption.setAttribute("id", itemId);
        $iOption.innerHTML = i;
        $largeselection.appendChild($iOption);
    }
    $largeselection.addEventListener("change", function(ev){
       newLarge = document.getElementById("largeTSh").value;
       updateLargeTShirt(newLarge);
    });
    $largeDiv.appendChild($largeselection);
    $div.appendChild($largeDiv);
    $lgOptDiv.appendChild($div)
};

var renderXLTShirtOption = function(){
    var newXLarge = 0;
    var $xlgOptDiv = document.getElementById("teeShirtLogin");
     var $div =document.getElementById("initTShirtOptions");
    var $xlargeDiv = document.createElement("div");
    $xlargeDiv.classList.add("individual_block");
    
  var $xlargeShirtLabel = document.createElement("div");
  $xlargeShirtLabel.setAttribute("id", "xlargeShirt");
  $xlargeShirtLabel.innerHTML = "XLarge";
  $xlargeDiv.appendChild($xlargeShirtLabel);
    
   var $xlargeselection = document.createElement("select");
    $xlargeselection.setAttribute("name","xlargeOrder");
    $xlargeselection.setAttribute("id","xlargeTSh");
    for(var i =0; i<11;i++){
        var $iOption = document.createElement("option");
        $iOption.setAttribute("value",i);
        var itemId = i + "Option";
        $iOption.setAttribute("id", itemId);
        $iOption.innerHTML = i;
        $xlargeselection.appendChild($iOption);
    }
    $xlargeselection.addEventListener("change", function(ev){
       newXLarge = document.getElementById("largeTSh").value;
       updateXLTShirt(newXLarge);
    });
    $xlargeDiv.appendChild($xlargeselection);
    $div.appendChild($xlargeDiv);
    $xlgOptDiv.appendChild($div)
};

var renderXXLTShirtOption = function(){
    var newXXL = 0;
    var $xxlOptDiv = document.getElementById("teeShirtLogin");
     var $div =document.getElementById("initTShirtOptions");
    var $doubXXLDiv = document.createElement("div");
    $doubXXLDiv.classList.add("individual_block");
  var $doubXXLShirtLabel = document.createElement("div");
  $doubXXLShirtLabel.setAttribute("id", "doubXXLShirt");
  $doubXXLShirtLabel.innerHTML = "XXL";
  $doubXXLDiv.appendChild($doubXXLShirtLabel);
    
   var $doubXXLselection = document.createElement("select");
    $doubXXLselection.setAttribute("name","doubXXLOrder");
    $doubXXLselection.setAttribute("id","doubXXLTSh");
    for(var i =0; i<11;i++){
        var $iOption = document.createElement("option");
        $iOption.setAttribute("value",i);
        var itemId = i + "Option";
        $iOption.setAttribute("id", itemId);
        $iOption.innerHTML = i;
        $doubXXLselection.appendChild($iOption);
    }
    $doubXXLselection.addEventListener("change", function(ev){
       newXXL = document.getElementById("doubXXLTSh").value;
       updateXXLTShirt(newXXL);
    });
    $doubXXLDiv.appendChild($doubXXLselection);
    $div.appendChild($doubXXLDiv);
    $xxlOptDiv.appendChild($div);
};

var renderXXXLTShirtOption = function(){
    var newXXXL = 0;
    var $xxxlOptDiv = document.getElementById("teeShirtLogin");
     var $div =document.getElementById("initTShirtOptions");
    var $tripXLDiv = document.createElement("div");
    $tripXLDiv.classList.add("individual_block");
  var $tripXLShirtLabel = document.createElement("div");
  $tripXLShirtLabel.setAttribute("id", "tripXLShirt");
  $tripXLShirtLabel.innerHTML = "XXXL";
  $tripXLDiv.appendChild($tripXLShirtLabel);
    
   var $tripXLselection = document.createElement("select");
    $tripXLselection.setAttribute("name","tripXLOrder");
    $tripXLselection.setAttribute("id","tripXLTSh");
    for(var i =0; i<11;i++){
        var $iOption = document.createElement("option");
        $iOption.setAttribute("value",i);
        var itemId = i + "Option";
        $iOption.setAttribute("id", itemId);
        $iOption.innerHTML = i;
        $tripXLselection.appendChild($iOption);
    }
    $tripXLselection.addEventListener("change", function(ev){
       newXXXL = document.getElementById("tripXLTSh").value;
       updateXXXLTShirt(newXXXL);
    });
    $tripXLDiv.appendChild($tripXLselection);
    $div.appendChild($tripXLDiv);
    $xxxlOptDiv.appendChild($div);
};

var renderXXXXLTShirtOption = function(){
    var newXXXXL = 0;
    var $xxxxlOptDiv = document.getElementById("teeShirtLogin");
     var $div =document.getElementById("initTShirtOptions");
    var $quadXLDiv = document.createElement("div");
    $quadXLDiv.classList.add("individual_block");
  var $quadXLShirtLabel = document.createElement("div");
  $quadXLShirtLabel.setAttribute("id", "quadXLShirt");
  $quadXLShirtLabel.innerHTML = "XXXXL";
  $quadXLDiv.appendChild($quadXLShirtLabel);
    
   var $quadXLselection = document.createElement("select");
    $quadXLselection.setAttribute("name","quadXLOrder");
    $quadXLselection.setAttribute("id","quadXLTSh");
    for(var i =0; i<11;i++){
        var $iOption = document.createElement("option");
        $iOption.setAttribute("value",i);
        var itemId = i + "Option";
        $iOption.setAttribute("id", itemId);
        $iOption.innerHTML = i;
        $quadXLselection.appendChild($iOption);
    }
    $quadXLselection.addEventListener("change", function(ev){
       newXXXXL = document.getElementById("quadXLTSh").value;
       updateXXXXLTShirt(newXXXXL);
    });
    $quadXLDiv.appendChild($quadXLselection);
    $div.appendChild($quadXLDiv);
    $xxxxlOptDiv.appendChild($div);
};

var renderUserSmallTShirtOrder = function(key){
    var newUserSmall = 0;
    var $smdiv = document.getElementById("teeShirtLogin");
     var $div =document.getElementById("updateTShirtOptions");
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
        if(i == smallTShirt){
            $iOption.setAttribute("selected", true);
        }
    }
    $smallselection.addEventListener("change", function(ev){
       newUserSmall = document.getElementById("userSmallTSh").value;
       tShirtDB.child(key).update({small: newUserSmall
                    } );
        renderShirtCost();
    });
    $smallDiv.appendChild($smallselection);
    $div.appendChild($smallDiv);
    $smdiv.appendChild($div);
};

var renderUserMediumTShirtOrder = function(key){
    var newUserMedium = 0;
    var $mediv = document.getElementById("teeShirtLogin");
     var $div =document.getElementById("updateTShirtOptions");
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
        if(i == mediumTShirt){
            $iOption.setAttribute("selected", true);
        }
        $mediumselection.appendChild($iOption);
    }
    $mediumselection.addEventListener("change", function(ev){
       newUserMedium = document.getElementById("userMediumTSh").value;
       tShirtDB.child(key).update({medium: newUserMedium
                    } );
        renderShirtCost();
    });
    $mediumDiv.appendChild($mediumselection);
    $div.appendChild($mediumDiv);
    $mediv.appendChild($div);
};

var renderUserLargeTShirtOrder = function(key){
    var newUserLarge = 0;
    var largediv = document.getElementById("teeShirtLogin");
     var $div =document.getElementById("updateTShirtOptions");
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
        if(i == largeTShirt){
            $iOption.setAttribute("selected", true);
        }
    }
    $largeselection.addEventListener("change", function(ev){
       newUserLarge = document.getElementById("userLargeTSh").value;
       tShirtDB.child(key).update({large: newUserLarge
                    } );
        renderShirtCost();
    });
    $largeDiv.appendChild($largeselection);
    $div.appendChild($largeDiv);
    largediv.appendChild($div);
};

var renderUserXLargeTShirtOrder = function(key){
    var newUserXLarge = 0;
    var xlargediv = document.getElementById("teeShirtLogin");
     var $div =document.getElementById("updateTShirtOptions");
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
        if(i == xLgTShirt){
            $iOption.setAttribute("selected", true);
        }
    }
    $xlargeselection.addEventListener("change", function(ev){
       newUserXLarge = document.getElementById("userXLargeTSh").value;
       tShirtDB.child(key).update({xlarge: newUserXLarge
                    } );
        renderShirtCost();
    });
    $xlargeDiv.appendChild($xlargeselection);
    $div.appendChild($xlargeDiv);
    xlargediv.appendChild($div);
};

var renderUserXXLTShirtOrder = function(key){
    var newUserXXL = 0;
    var $xxldiv = document.getElementById("teeShirtLogin");
     var $div =document.getElementById("updateTShirtOptions");
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
        if(i == xXLTShirt){
            $iOption.setAttribute("selected", true);
        }
    }
    $xXLselection.addEventListener("change", function(ev){
       newUserXXL = document.getElementById("userXXLTSh").value;
       tShirtDB.child(key).update({xxLarge: newUserXXL
                    } );
        renderShirtCost();
    });
    $xXLDiv.appendChild($xXLselection);
    $div.appendChild($xXLDiv);
    $xxldiv.appendChild($div);
};

var renderUserXXXLTShirtOrder = function(key){
    var newUserXXXL = 0;
    var $xxxldiv = document.getElementById("teeShirtLogin");
     var $div =document.getElementById("updateTShirtOptions");
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
        if(i == tripXLTShirt){
            $iOption.setAttribute("selected", true);
        }
    }
    $xXXLselection.addEventListener("change", function(ev){
       newUserXXXL = document.getElementById("userXXXLTSh").value;
       tShirtDB.child(key).update({xxxLarge: newUserXXXL
                    } );
        renderShirtCost();
    });
    $xXXLDiv.appendChild($xXXLselection);
    $div.appendChild($xXXLDiv);
    $xxxldiv.appendChild($div);
};

var renderUserXXXXLTShirtOrder = function(key){
    var newUserXXXXL = 0;
    var $xxxxldiv = document.getElementById("teeShirtLogin");
     var $div =document.getElementById("updateTShirtOptions");
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
        if(i == quadXLTShirt){
            $iOption.setAttribute("selected", true);
        }
    }
    $xXXXLselection.addEventListener("change", function(ev){
       newUserXXXXL = document.getElementById("userXXXLTSh").value;
       tShirtDB.child(key).update({xxxxLarge: newUserXXXXL
                    } );
        renderShirtCost();
    });
    $xXXXLDiv.appendChild($xXXXLselection);
    $div.appendChild($xXXXLDiv);
    $xxxxldiv.appendChild($div);
};

var renderMemberTShirtButton = function(){
    var pageSource = document.getElementById("teeShirtLogin");
    var $div = document.getElementById("memberTShirtCostButton");
  var costBut = document.createElement("button");
  costBut.setAttribute("id","costButton");
  costBut.innerHTML = "Calculate TShirt Cost";
  costBut.addEventListener("click",function(ev){
      document.getElementById("memberTShirtCostButton").classList.add("hidden");
      document.getElementById("memberTShirtCost").classList.remove("hidden");
      renderShirtCost();
  });
  $div.appendChild(costBut);
  pageSource.appendChild($div);
};

var renderShirtCost = function(){
    var $shirtCostOrig = document.getElementById("teeShirtLogin");
  var $shirtHead = document.getElementById("memberTShirtCost");
  $shirtHead.innerHTML = "";
  var $sCHeader = document.createElement("h2");
  var shirtStart = "You have ordered ";
  var smallCount = smallTShirt + " small T-Shirts, ";
  var mediumCount = mediumTShirt +  " medium T-Shirts, ";
  var largeCount = largeTShirt + " large T-Shirts, ";
  var xlargeCount = xLgTShirt + " XL T-Shirts, ";
  var doubXXL = xXLTShirt + " XXL TShirts, ";
  var tripXXXL =tripXLTShirt + " XXXL TShirts, ";
  var quadXXXXL = "and " + quadXLTShirt + " XXXXL TShirts.";
  var shirtOrderString = shirtStart.concat(smallCount).concat(mediumCount).concat(largeCount).concat(xlargeCount).concat(doubXXL).concat(tripXXXL).concat(quadXXXXL);
  determineShirtCost();
  var shirtCost = " The cost of the TShirts are ".concat(totalShirtCost).concat(".00 dollars");
  $sCHeader.innerHTML = shirtOrderString.concat(shirtCost);
  $shirtHead.appendChild($sCHeader);
    $shirtCostOrig.appendChild($shirtHead);
};

var determineShirtCost = function(){
  var smShirt = smallTShirt * regShirtCost;
  var mShirt = mediumTShirt * regShirtCost;
  var lgShirt = largeTShirt * regShirtCost;
  var xLgShirt = xLgTShirt * regShirtCost;
  var xXLShirt = xXLTShirt * largerShirtCost;
  var xXXLShirt = tripXLTShirt * largerShirtCost;
  var xXXXLShirt = quadXLTShirt * largerShirtCost;
  totalShirtCost = smShirt + mShirt + lgShirt + xLgShirt + xXLShirt + xXXLShirt + xXXXLShirt;
  console.log(totalShirtCost);
};

var renderShirtPaymentInfo = function(){
    var div = document.getElementById("tShirtPayment");
    var paymentDiv = document.createElement("div");
    paymentDiv.setAttribute("id","payDiv");
    paymentDiv.innerHTML = "";
    
    var payhead = document.createElement("div");
    payhead.innerHTML = "Send T-Shirt Payment to the following Address";
    paymentDiv.appendChild(payhead);
    
    var payContact = document.createElement("div");
    payContact.innerHTML = "Delores Law";
    paymentDiv.appendChild(payContact);
    
    var payAddress = document.createElement("div");
    payAddress.innerHTML = "1 Lisa Drive";
    paymentDiv.appendChild(payAddress);
    
    var payCity = document.createElement("div");
    payCity.innerHTML = "Newark, DE 19702";
    paymentDiv.appendChild(payCity);
    
    div.appendChild(paymentDiv);
}

var renderShirtNavButtons = function(){
  var $nav = document.getElementById("shirtNav");
  var $buttDiv = document.createElement("div");
  var $homeButton = document.createElement("button");
  $homeButton.setAttribute("type", "button");
  $homeButton.setAttribute("id", "memberHome");
  $homeButton.innerHTML = "Return to User Home Screen";
  $homeButton.addEventListener("click", function(ev){
    showLoginHomeScreen();
  });
  $buttDiv.appendChild($homeButton);
  
  $nav.appendChild($buttDiv);
};

var memTShirtStart = function(){
    getShirtUser();
    renderMemberTShirtScreen();
    getTShirtData();
    // renderMemberTShirtButton();
    renderShirtPaymentInfo();
    renderShirtNavButtons();
};

document.addEventListener('DOMContentLoaded',memTShirtStart);