var bowChild = "";

// New Shirt Order
var smallTShirtOrder = 0;
var mediumTShirtOrder = 0;
var largeTShirtOrder = 0;
var xLgTShirtOrder = 0;
var xXLTShirtOrder = 0;
var tripXLTShirtOrder = 0;
var quadXLTShirtOrder = 0;

// Edit Shirt Order
var smallTShirtEdit= 0;
var mediumTShirtEdit = 0;
var largeTShirtEdit = 0;
var xLgTShirtEdit = 0;
var xXLTShirtEdit = 0;
var tripXLTShirtEdit = 0;
var quadXLTShirtEdit = 0;

// Total Shirt Order Count
var smallTShirtCount = 0;
var mediumTShirtCount = 0;
var largeTShirtCount = 0;
var xLgTShirtCount = 0;
var xXLTShirtCount = 0;
var tripXLTShirtCount = 0;
var quadXLTShirtCount = 0;

var userAccount = "";
var shirtCostOrdered = 0;

var shirtPaid = 0;
var shirtDe = 0;

var regShirtCost = 10;
var largerShirtCost = 12;
var totalShirtCost = 0;

var tShirtDB = new Firebase("https://bowmanfamreun.firebaseio.com/TShirt");
var DB = new Firebase("https://bowmanfamreun.firebaseio.com/");
var shirtFeeDB = new Firebase("https://bowmanfamreun.firebaseio.com/Fees");

var getShirtUser = function(){
    userAccount = localStorage.getItem("user");
    if(userAccount == null){
        showLoginScreen();
    }
    // if(userAccount != "LawUser"){
    //     alert("This website is in Archive mode. Your account has been permanently disabled.");
    //     showHomePageScreen();
    // }
};

var updateChild = function(childShirt){
    bowChild = childShirt;
};

var updateSmallTShirtOrder= function(sm){
    smallTShirtOrder = sm;  
};

var updateSmallTShirtEdit= function(sma){
    smallTShirtEdit = sma;  
};

var updateSmallTShirtCount= function(smal){
    smallTShirtCount += smal;  
};

var updateMediumTShirtOrder= function(med){
    mediumTShirtOrder = med;  
};

var updateMediumTShirtEdit= function(medi){
    mediumTShirtEdit = medi;  
};

var updateMediumTShirtCount= function(mediu){
    mediumTShirtCount += mediu;  
};

var updateLargeTShirtOrder = function(lg){
    largeTShirtOrder = lg;  
};

var updateLargeTShirtEdit = function(lag){
    largeTShirtEdit = lag;  
};

var updateLargeTShirtCount = function(larg){
    largeTShirtCount += larg;  
};

var updateXLTShirtOrder = function(xLg){
    xLgTShirtOrder = xLg;  
};

var updateXLTShirtEdit = function(xLag){
    xLgTShirtEdit = xLag;  
};

var updateXLTShirtCount = function(xLarg){
    xLgTShirtCount += xLarg;  
};

var updateXXLTShirtOrder = function(xxL){
    xXLTShirtOrder = xxL;
};

var updateXXLTShirtEdit = function(xxLa){
    xXLTShirtEdit = xxLa;
};

var updateXXLTShirtCount = function(xxLar){
    xXLTShirtCount += xxLar;
};

var updateXXXLTShirtOrder = function(xxxL){
    tripXLTShirtOrder = xxxL;
};

var updateXXXLTShirtEdit = function(xxxLa){
    tripXLTShirtEdit = xxxLa;
};

var updateXXXLTShirtCount = function(xxxLar){
    tripXLTShirtCount += xxxLar;
};

var updateXXXXLTShirtOrder = function(xxxxL){
    quadXLTShirtOrder = xxxxL;
};

var updateXXXXLTShirtEdit = function(xxxxLa){
    quadXLTShirtEdit = xxxxLa;
};

var updateXXXXLTShirtCount = function(xxxxLar){
    quadXLTShirtCount += xxxxLar;
};

var updateShirtPaid = function(pay){
  shirtPaid = pay;  
};

var updateShirtDue = function(rec){
    shirtDe = rec;
};

var resetCountVariables = function(){
    smallTShirtCount = 0;
    mediumTShirtCount = 0;
    largeTShirtCount = 0;
    xLgTShirtCount = 0;
    xXLTShirtCount = 0;
    tripXLTShirtCount = 0;
    quadXLTShirtCount = 0; 
};

var submitShirtOrder = function(){
  var shirtOrderData = DB.child("TShirt");
    shirtOrderData.push().set({childName: bowChild,
                            account: userAccount,
                            small: smallTShirtOrder,
                            medium: mediumTShirtOrder,
                            large: largeTShirtOrder,
                            xL: xLgTShirtOrder,
                            xxLarge: xXLTShirtOrder,
                            xxxLarge: tripXLTShirtOrder,
                            xxxxLarge: quadXLTShirtOrder});  
};

var getTShirtOrders = function(){
    var ordDivClr = document.getElementById("shirtOrders");
    while(ordDivClr.firstChild)
        ordDivClr.removeChild(ordDivClr.firstChild);
    renderOrdersHeader();
    tShirtDB.orderByChild("account").equalTo(userAccount).on("value", function(snapshot){
        snapshot.forEach(function (childSnapshot){
            if (childSnapshot == null){
                renderNoOrdersPlaced();
            } else {
                var key = childSnapshot.key();
                var chName = childSnapshot.val().childName;
                var small = childSnapshot.val().small;
                var medium = childSnapshot.val().medium;
                var large = childSnapshot.val().large;
                var xLG = childSnapshot.val().xL;
                var doubleXLarge = childSnapshot.val().xxLarge;
                var tripXLarge = childSnapshot.val().xxxLarge;
                var quadXLarge = childSnapshot.val().xxxxLarge;
                
                var shSmall = parseInt(small, 10);
                var shMedium = parseInt(medium, 10);
                var shLarge = parseInt(large,10);
                var shxLG = parseInt(xLG, 10);
                var shXXLg = parseInt(doubleXLarge,10);
                var shXXXLg = parseInt(tripXLarge,10);
                var shXXXXLg = parseInt(quadXLarge,10);
                
                renderTShirtOrder(chName,shSmall,shMedium,shLarge,shxLG, shXXLg,shXXXLg,shXXXXLg,key);
                updateShirtCount(shSmall,shMedium,shLarge,shxLG, shXXLg,shXXXLg,shXXXXLg);
                renderShirtCost(); 
            }
            
           
        });
    });
};


var updateShirtCount = function(smal,mediu,larg,xLrG, doubleXLrg,tripXLrg,quadXLrg){
    updateSmallTShirtCount(smal);
    updateMediumTShirtCount(mediu);
    updateLargeTShirtCount(larg);
    updateXLTShirtCount(xLrG);
    updateXXLTShirtCount(doubleXLrg);
    updateXXXLTShirtCount(tripXLrg);
    updateXXXXLTShirtCount(quadXLrg);
};


var getShirtCosts = function(){
    var shirtFee = DB.child("Fees");
    shirtFee.orderByChild("userName").equalTo(userAccount).on("value", function(snapshot){
        snapshot.forEach(function(childSnapshot){
            var shtPaidCost = childSnapshot.val().shirtPaid;
            var shirtDueCost = childSnapshot.val().shirtDue;
            updateShirtPaid(shtPaidCost);
            updateShirtDue(shirtDueCost);
        });
    });
};

var initGetShirtCosts = function(){
    var shirtFee = DB.child("Fees");
    shirtFee.orderByChild("userName").equalTo(userAccount).once("value").then(function(snapshot){
        snapshot.forEach(function(childSnapshot){
            var shtPaidCost = childSnapshot.val().shirtPaid;
            var shirtDueCost = childSnapshot.val().shirtDue;
            updateShirtPaid(shtPaidCost);
            updateShirtDue(shirtDueCost);
            renderShirtsCosts();
        });
    });
};

var updateShirtCost = function(){
    shirtFeeDB.orderByChild("account").equalTo(userAccount).on("value", function(snapshot){
        snapshot.forEach(function (childSnapshot){
            var regKey = childSnapshot.key();
            shirtFeeDB.child(regKey).update({shirtDue: totalShirtCost});  
        });
    });
};

var updateChildIndShirtOrder = function(sK){
    tShirtDB.child(sK).update({small: smallTShirtEdit,
                            medium: mediumTShirtEdit,
                            large: largeTShirtEdit,
                            xL: xLgTShirtEdit,
                            xxLarge: xXLTShirtEdit,
                            xxxLarge: tripXLTShirtEdit,
                            xxxxLarge: quadXLTShirtEdit});  
};


var setChildShirtOrders = function(shK){
    tShirtDB.orderByKey().equalTo(shK).on("value", function(snapshot){
        snapshot.forEach(function(shirtSnapshot){
                var chSmall = shirtSnapshot.val().small;
                var chMedium = shirtSnapshot.val().medium;
                var chLarge = shirtSnapshot.val().large;
                var chXLG = shirtSnapshot.val().xL;
                var chXXLarge = shirtSnapshot.val().xxLarge;
                var chXXXLarge = shirtSnapshot.val().xxxLarge;
                var chXXXXLarge = shirtSnapshot.val().xxxxLarge;
                
                var shSmall = parseInt(chSmall, 10);
                var shMedium = parseInt(chMedium, 10);
                var shLarge = parseInt(chLarge,10);
                var shxLG = parseInt(chXLG, 10);
                var shXXLg = parseInt(chXXLarge,10);
                var shXXXLg = parseInt(chXXXLarge,10);
                var shXXXXLg = parseInt(chXXXXLarge,10);
                
                updateSmallTShirtEdit(shSmall);
                updateMediumTShirtEdit(shMedium);
                updateLargeTShirtEdit(shLarge);
                updateXLTShirtEdit(shxLG);
                updateXXLTShirtEdit(shXXLg);
                updateXXXLTShirtEdit(shXXXLg);
                updateXXXXLTShirtEdit(shXXXXLg);
        });
    });
};

var shirtChangeUpdate = function(){
    resetCountVariables();
    getTShirtOrders();
    determineShirtCost();
    updateShirtCost();
    getShirtCosts();
    renderShirtCost();
    renderShirtsCosts();
};

var determineShirtCost = function(){
    var smShirt = +smallTShirtCount * regShirtCost;
    var mShirt = +mediumTShirtCount * regShirtCost;
    var lgShirt = +largeTShirtCount * regShirtCost;
    var xLgShirt = +xLgTShirtCount * regShirtCost;
    var xXLShirt = +xXLTShirtCount * regShirtCost;
    var xXXLShirt = +tripXLTShirtCount * largerShirtCost;
    var xXXXLShirt = +quadXLTShirtCount * largerShirtCost;
    totalShirtCost = smShirt + mShirt + lgShirt + xLgShirt + xXLShirt + xXXLShirt + xXXXLShirt;
};

//  RENDERING THE SCREEN (VIEW)
var renderMemberTShirtScreen = function(){
    renderTShirtOrderHeader();
    renderTShirtOrderLook();
    getTShirtOrders();
    renderShirtNavButtons();
    renderMemberTShirtInfo();
    renderShirtPaymentInfo();
    renderShirtPaymentNews();
    renderShirtsCosts();
};

var renderTShirtOrderHeader = function(){
    var shrtHedClr = document.getElementById("tShirtHeader");
    while (shrtHedClr.firstChild)
        shrtHedClr.removeChild(shrtHedClr.firstChild);
    
    var tShirtHead = document.getElementById("tShirtHeader");
    var $tShirtOrdHead = document.createElement("h1");
    $tShirtOrdHead.innerHTML = userAccount + " Member TShirt Ordering";
    tShirtHead.appendChild($tShirtOrdHead);
};

var renderTShirtOrderLook = function(){
    
    var shtSelClr = document.getElementById("tShirtSelection");
    while (shtSelClr.firstChild)
        shtSelClr.removeChild(shtSelClr.firstChild);
    
    // Drop Box to Select The Child
    var tShirtOrigDiv = document.getElementById("tShirtSelection");
    var tShirtSelectDiv = document.createElement("div");
    renderChildSelection(tShirtSelectDiv);
    tShirtOrigDiv.appendChild(tShirtSelectDiv);
};

var renderChildSelection = function(selectAppend){
    var childSelectDiv = document.createElement("div");

    var childSelectName = document.createElement("div");
    childSelectName.innerHTML = "Select the Bowman Child You would like to see their TShirt Design";
    childSelectDiv.appendChild(childSelectName);
    
    var $childShirtSelect = document.createElement("select");
    $childShirtSelect.setAttribute("name","childShirtSelect");
    $childShirtSelect.setAttribute("id","childShirtSelect");
    
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
        
    $childShirtSelect.addEventListener("change", function(ev){
        var setOrderName = document.getElementById("childShirtSelect").value;
        updateChild(setOrderName);
        renderShirtView();
        renderIndShirtOrder();
    });
    childSelectDiv.appendChild($childShirtSelect);
    selectAppend.appendChild(childSelectDiv);
};

var renderShirtView = function(){
    var tShirtImgOrigDiv = document.getElementById("tShirtImages");
    var tShirtImgDiv = document.createElement("div");
    while(tShirtImgOrigDiv.firstChild)
        tShirtImgOrigDiv.removeChild(tShirtImgOrigDiv.firstChild);
    if(bowChild == "Alberta"){
        renderAlbertaShirt(tShirtImgDiv);
    } 
    if(bowChild == "Lillian") {
        renderLillianShirt(tShirtImgDiv);
    }
    if (bowChild == "Edna"){
        renderEdnaShirt(tShirtImgDiv);
    }
    if (bowChild == "Elizabeth"){
        renderElizabethShirt(tShirtImgDiv);
    }
    if (bowChild == "MaryLue"){
        renderMaryLueShirt(tShirtImgDiv);
    }
    if (bowChild == "Dulcenia"){
        renderDulceniaShirt(tShirtImgDiv);
    }
    if (bowChild == "Irene"){
        renderIreneShirt(tShirtImgDiv);
    }
    if (bowChild == "Jimmie"){
        renderJimmieShirt(tShirtImgDiv);
    }
    if (bowChild == "Blaine"){
        renderBlaineShirt(tShirtImgDiv);
    }
    if (bowChild == "Commemorative"){
        renderCommemmorativeShirt(tShirtImgDiv);
    }
    tShirtImgOrigDiv.appendChild(tShirtImgDiv);
};

var renderAlbertaShirt = function(alShDiv){
    var shrDv = document.createElement("div");
    var albertaTShirtImage = document.createElement("img");
    albertaTShirtImage.setAttribute("src", "../images/Alberta Tee Shirt Design.jpeg");
    albertaTShirtImage.setAttribute("id","childTshirt");
    shrDv.appendChild(albertaTShirtImage);
    var zoomDiv = document.createElement("div");
    zoomDiv.setAttribute("id","heartTShirtZoom");
    var albertaTShirtImageZoom = document.createElement("img");
    albertaTShirtImageZoom.setAttribute("src", "../images/Alberta Shirt Heart Closeup.jpeg");
    albertaTShirtImageZoom.setAttribute("id","heartTShirtZoom");
    zoomDiv.appendChild(albertaTShirtImageZoom);
    shrDv.appendChild(albertaTShirtImageZoom);
    alShDiv.appendChild(shrDv);
};

var renderLillianShirt = function(liShDiv){
    var shirDv = document.createElement("div");
    var lillianTShirtImage = document.createElement("img");
    lillianTShirtImage.setAttribute("src", "../images/Lillian Bowman Tee Shirt Design.png");
    lillianTShirtImage.setAttribute("id","childTshirt");
    shirDv.appendChild(lillianTShirtImage);
    var zoomDiv = document.createElement("div");
    zoomDiv.setAttribute("id","heartTShirtZoom");
    var lillianTShirtImageZoom = document.createElement("img");
    lillianTShirtImageZoom.setAttribute("src", "../images/Lillian Tee Shirt Heart Closeup.png");
    lillianTShirtImageZoom.setAttribute("id","heartTShirtZoom");
    zoomDiv.appendChild(lillianTShirtImageZoom);
    shirDv.appendChild(zoomDiv);
    liShDiv.appendChild(shirDv);
};

var renderEdnaShirt = function(edShDiv){
    var shiDv = document.createElement("div");
    var ednaTShirtImage = document.createElement("img");
    ednaTShirtImage.setAttribute("src", "../images/Edna Tee Shirt Design.jpeg");
    ednaTShirtImage.setAttribute("id","childTshirt");
    shiDv.appendChild(ednaTShirtImage);
    var zoomDiv = document.createElement("div");
    zoomDiv.setAttribute("id","heartTShirtZoom");
    var ednaTShirtImageZoom = document.createElement("img");
    ednaTShirtImageZoom.setAttribute("src", "../images/Edna Shirt Heart Closeup.png");
    ednaTShirtImageZoom.setAttribute("id","heartTShirtZoom");
    zoomDiv.appendChild(ednaTShirtImageZoom);
    shiDv.appendChild(zoomDiv);
    edShDiv.appendChild(shiDv);
};

var renderElizabethShirt = function(elShDiv){
    var shirD = document.createElement("div");
    var elizabethTShirtImage = document.createElement("img");
    elizabethTShirtImage.setAttribute("src", "../images/Elizabeth Bowman Tee Shirt Design.png");
    elizabethTShirtImage.setAttribute("id","childTshirt");
    shirD.appendChild(elizabethTShirtImage);
    var zoomDiv = document.createElement("div");
    zoomDiv.setAttribute("id","heartTShirtZoom");
    var elizabethTShirtImageZoom = document.createElement("img");
    elizabethTShirtImageZoom.setAttribute("src", "../images/Elizabeth Shirt Heart Closeup.png");
    elizabethTShirtImageZoom.setAttribute("id","heartTShirtZoom");
    zoomDiv.appendChild(elizabethTShirtImageZoom);
    shirD.appendChild(zoomDiv);
    elShDiv.appendChild(shirD);
};

var renderMaryLueShirt = function(maShDiv){
    var shrD = document.createElement("div");
    var marylueTShirtImage = document.createElement("img");
    marylueTShirtImage.setAttribute("src", "../images/Marylue Tee Shirt Design.jpeg");
    marylueTShirtImage.setAttribute("id","childTshirt");
    shrD.appendChild(marylueTShirtImage);
    var zoomDiv = document.createElement("div");
    zoomDiv.setAttribute("id","heartTShirtZoom");
    var marylueTShirtImageZoom = document.createElement("img");
    marylueTShirtImageZoom.setAttribute("src", "../images/MaryLue Shirt Heart Closeup.png");
    marylueTShirtImageZoom.setAttribute("id","heartTShirtZoom");
    zoomDiv.appendChild(marylueTShirtImageZoom);
    shrD.appendChild(zoomDiv);
    maShDiv.appendChild(shrD);
};

var renderDulceniaShirt = function(duShDiv){
    var shD = document.createElement("div");
    var dulceniaTShirtImage = document.createElement("img");
    dulceniaTShirtImage.setAttribute("src", "../images/Dulcenia Bowman Tee Shirt Design.png");
    dulceniaTShirtImage.setAttribute("id","childTshirt");
    shD.appendChild(dulceniaTShirtImage);
    var zoomDiv = document.createElement("div");
    zoomDiv.setAttribute("id","heartTShirtZoom");
    var dulceniaTShirtImageZoom = document.createElement("img");
    dulceniaTShirtImageZoom.setAttribute("src", "../images/Dulcenia Shirt Heart Closeup.png");
    dulceniaTShirtImageZoom.setAttribute("id","heartTShirtZoom");
    zoomDiv.appendChild(dulceniaTShirtImageZoom);
    shD.appendChild(zoomDiv);
    duShDiv.appendChild(shD);
};

var renderIreneShirt = function(irShDiv){
    var sD = document.createElement("div");
    var ireneTShirtImage = document.createElement("img");
    ireneTShirtImage.setAttribute("src", "../images/Irene Bowman Tee Shirt Design.png");
    ireneTShirtImage.setAttribute("id","childTshirt");
    sD.appendChild(ireneTShirtImage);
    var zoomDiv = document.createElement("div");
    zoomDiv.setAttribute("id","heartTShirtZoom");
    var ireneTShirtImageZoom = document.createElement("img");
    ireneTShirtImageZoom.setAttribute("src", "../images/Irene Shirt Heart Closeup.png");
    ireneTShirtImageZoom.setAttribute("id","heartTShirtZoom");
    zoomDiv.appendChild(ireneTShirtImageZoom);
    sD.appendChild(zoomDiv);
    irShDiv.appendChild(sD);
};

var renderJimmieShirt = function(jiShDiv){
    var shDi = document.createElement("div");
    var jimmieTShirtImage = document.createElement("img");
    jimmieTShirtImage.setAttribute("src", "../images/Jimmie Bowman Tee Shirt Design.png");
    jimmieTShirtImage.setAttribute("id","childTshirt");
    shDi.appendChild(jimmieTShirtImage);
    var zoomDiv = document.createElement("div");
    zoomDiv.setAttribute("id","heartTShirtZoom");
    var jimmieTShirtImageZoom = document.createElement("img");
    jimmieTShirtImageZoom.setAttribute("src", "../images/Jimmie Shirt Heart Closeup.png");
    jimmieTShirtImageZoom.setAttribute("id","heartTShirtZoom");
    zoomDiv.appendChild(jimmieTShirtImageZoom);
    shDi.appendChild(zoomDiv);
    jiShDiv.appendChild(shDi);
};

var renderBlaineShirt = function(blShDiv){
    var shiDi = document.createElement("div");
    var blaineTShirtImage = document.createElement("img");
    blaineTShirtImage.setAttribute("src", "../images/Blaine Bowman Tee Shirt Design.png");
    blaineTShirtImage.setAttribute("id","childTshirt");
    shiDi.appendChild(blaineTShirtImage);
    var zoomDiv = document.createElement("div");
    zoomDiv.setAttribute("id","heartTShirtZoom");
    var blaineTShirtImageZoom = document.createElement("img");
    blaineTShirtImageZoom.setAttribute("src", "../images/Blaine Shirt Heart Closeup.png");
    blaineTShirtImageZoom.setAttribute("id","heartTShirtZoom");
    zoomDiv.appendChild(blaineTShirtImageZoom);
    shiDi.appendChild(zoomDiv);
    blShDiv.appendChild(shiDi);
};

var renderCommemmorativeShirt = function(coShDiv){
    var shirDv = document.createElement("div");
    var commemorativeTShirtImage = document.createElement("img");
    commemorativeTShirtImage.setAttribute("src", "../images/Commemorative Tee Shirt Design.jpeg");
    commemorativeTShirtImage.setAttribute("id","childTshirt");
    shirDv.appendChild(commemorativeTShirtImage);
    var zoomDiv = document.createElement("div");
    zoomDiv.setAttribute("id","heartTShirtZoom");
    var comemmorativeTShirtImageZoom = document.createElement("img");
    comemmorativeTShirtImageZoom.setAttribute("src", "../images/Comemmorative Shirt.png");
    comemmorativeTShirtImageZoom.setAttribute("id","heartTShirtZoom");
    zoomDiv.appendChild(comemmorativeTShirtImageZoom);
    shirDv.appendChild(zoomDiv);
    coShDiv.appendChild(shirDv);
};

var renderOrdersHeader = function(){
    
    var tShirtHead = document.getElementById("shirtOrders");
    var $tShirtOrdHead = document.createElement("h1");
    $tShirtOrdHead.innerHTML = userAccount + " Your TShirt Orders";
    tShirtHead.appendChild($tShirtOrdHead);
};

var renderNoOrdersPlaced = function(){
    var ordSrcDiv = document.getElementById("indShirtOrder");
    var ordHead = document.createElement("h1");
    ordHead.innerHTML= "No TShirt Orders Have been Placed";
    ordSrcDiv.appendChild(ordHead);
};


var renderIndShirtOrder = function(){
    
    var indOrdDivClr = document.getElementById("indShirtOrder");
    while(indOrdDivClr.firstChild)
        indOrdDivClr.removeChild(indOrdDivClr.firstChild);
    
    var orderSourceDiv = document.getElementById("indShirtOrder");
    var orderDiv = document.createElement("div");
    renderSmallShirtOrder(1,orderDiv);
    renderMediumShirtOrder(1,orderDiv);
    renderLargeShirtOrder(1,orderDiv);
    renderXLShirtOrder(1,orderDiv);
    renderXXLShirtOrder(1,orderDiv);
    renderXXXLShirtOrder(1,orderDiv);
    renderXXXXLShirtOrder(1,orderDiv);
    var shirtSubmitDiv = document.createElement("div");
    renderShirtOrderButton(shirtSubmitDiv);
    orderSourceDiv.appendChild(orderDiv);
    orderSourceDiv.appendChild(shirtSubmitDiv);
};

var renderSmallShirtOrder = function(stype, attDv){
    var $smallDiv = document.createElement("div");
    $smallDiv.classList.add("individual_block");
    var $smallShirtLabel = document.createElement("div");
    $smallShirtLabel.setAttribute("id", "userSmallShirt");
    $smallShirtLabel.innerHTML = "Small";
    $smallDiv.appendChild($smallShirtLabel);
    var $smallselection = document.createElement("select");
    $smallselection.setAttribute("name","userSmallOrder");
    $smallselection.setAttribute("id","userSmallTSh");
    var smallVar = 0;
    if (stype == 2)
        smallVar = smallTShirtEdit;
    for(var i =0; i<11;i++){
        var $iOption = document.createElement("option");
        $iOption.setAttribute("value",i);
        var itemId = i + "Option";
        $iOption.setAttribute("id", itemId);
        $iOption.innerHTML = i;
        $smallselection.appendChild($iOption);
        if(i == smallVar){
            $iOption.setAttribute("selected", true);
        }
    }
    $smallselection.addEventListener("change", function(ev){
        var smallOrder = document.getElementById("userSmallTSh").value;
        if(stype == 1)
            updateSmallTShirtOrder(smallOrder);
        if (stype == 2)
            updateSmallTShirtEdit(smallOrder);
    });
    $smallDiv.appendChild($smallselection);
    attDv.appendChild($smallDiv);
};

var renderMediumShirtOrder = function(shty, attDiv){
    var $mediumDiv = document.createElement("div");
    $mediumDiv.classList.add("individual_block");
    var $mediumShirtLabel = document.createElement("div");
    $mediumShirtLabel.setAttribute("id", "userMediumShirt");
    $mediumShirtLabel.innerHTML = "Medium";
    $mediumDiv.appendChild($mediumShirtLabel);
    var $mediumselection = document.createElement("select");
    $mediumselection.setAttribute("name","userMediumOrder");
    $mediumselection.setAttribute("id","userMediumTSh");
    var mediumVar = 0;
    if (shty == 2)
        mediumVar = mediumTShirtEdit;
    for(var i =0; i<11;i++){
        var $iOption = document.createElement("option");
        $iOption.setAttribute("value",i);
        var itemId = i + "Option";
        $iOption.setAttribute("id", itemId);
        $iOption.innerHTML = i;
        if(i == mediumVar){
            $iOption.setAttribute("selected", true);
        }
        $mediumselection.appendChild($iOption);
    }
    $mediumselection.addEventListener("change", function(ev){
        var mediumOrder = document.getElementById("userMediumTSh").value;
        if (shty == 1)
            updateMediumTShirtOrder(mediumOrder);
        if (shty == 2)
            updateMediumTShirtEdit(mediumOrder);
    });
    $mediumDiv.appendChild($mediumselection);
    attDiv.appendChild($mediumDiv);
};

var renderLargeShirtOrder = function(sty, appDiv){
    var $largeDiv = document.createElement("div");
    $largeDiv.classList.add("individual_block");
    var $largeShirtLabel = document.createElement("div");
    $largeShirtLabel.setAttribute("id", "userLargeShirt");
    $largeShirtLabel.innerHTML = "Large";
    $largeDiv.appendChild($largeShirtLabel);
    var $largeselection = document.createElement("select");
    $largeselection.setAttribute("name","userLargeOrder");
    $largeselection.setAttribute("id","userLargeTSh");
   var largeVar = 0;
    if (sty == 2)
        largeVar = largeTShirtEdit;
    for(var i =0; i<11;i++){
        var $iOption = document.createElement("option");
        $iOption.setAttribute("value",i);
        var itemId = i + "Option";
        $iOption.setAttribute("id", itemId);
        $iOption.innerHTML = i;
        $largeselection.appendChild($iOption);
        if(i == largeVar){
            $iOption.setAttribute("selected", true);
        }
    }
    $largeselection.addEventListener("change", function(ev){
        var largeOrdered = document.getElementById("userLargeTSh").value;
        if (sty == 1)
            updateLargeTShirtOrder(largeOrdered);
        if (sty == 2)
            updateLargeTShirtEdit(largeOrdered);
    });
    $largeDiv.appendChild($largeselection);
    appDiv.appendChild($largeDiv);
};

var renderXLShirtOrder = function(shyp, apDv){
    var $xlargeDiv = document.createElement("div");
    $xlargeDiv.classList.add("individual_block");
    var $xlargeShirtLabel = document.createElement("div");
    $xlargeShirtLabel.setAttribute("id", "userXLargeShirt");
    $xlargeShirtLabel.innerHTML = "XL";
    $xlargeDiv.appendChild($xlargeShirtLabel);
    var $xlargeselection = document.createElement("select");
    $xlargeselection.setAttribute("name","userXLargeOrder");
    $xlargeselection.setAttribute("id","userXLargeTSh");
    var xLVar = 0;
    if (shyp == 2)
        xLVar = xLgTShirtEdit;
    for(var i =0; i<11;i++){
        var $iOption = document.createElement("option");
        $iOption.setAttribute("value",i);
        var itemId = i + "Option";
        $iOption.setAttribute("id", itemId);
        $iOption.innerHTML = i;
        $xlargeselection.appendChild($iOption);
        if(i == xLVar){
            $iOption.setAttribute("selected", true);
        }
    }
    $xlargeselection.addEventListener("change", function(ev){
        var xLargeOrdered = document.getElementById("userXLargeTSh").value;
        if (shyp == 1)
            updateXLTShirtOrder(xLargeOrdered);
        if (shyp == 2)
            updateXLTShirtEdit(xLargeOrdered);    
    });
    $xlargeDiv.appendChild($xlargeselection);
    apDv.appendChild($xlargeDiv);
};

var renderXXLShirtOrder = function(stp,aDi){
    var $xXLDiv = document.createElement("div");
    $xXLDiv.classList.add("individual_block");
    var $xXLShirtLabel = document.createElement("div");
    $xXLShirtLabel.setAttribute("id", "userXXLShirt");
    $xXLShirtLabel.innerHTML = "XXL";
    $xXLDiv.appendChild($xXLShirtLabel);
    var $xXLselection = document.createElement("select");
    $xXLselection.setAttribute("name","userXXLOrder");
    $xXLselection.setAttribute("id","userXXLTSh");
    var xxLVar = 0;
    if (stp == 2)
        xxLVar = xXLTShirtEdit;
    for(var i =0; i<11;i++){
        var $iOption = document.createElement("option");
        $iOption.setAttribute("value",i);
        var itemId = i + "Option";
        $iOption.setAttribute("id", itemId);
        $iOption.innerHTML = i;
        $xXLselection.appendChild($iOption);
        if(i == xxLVar){
            $iOption.setAttribute("selected", true);
        }
    }
    $xXLselection.addEventListener("change", function(ev){
        var xXLOrdered = document.getElementById("userXXLTSh").value;
        if (stp == 1)
            updateXXLTShirtOrder(xXLOrdered);
        if (stp == 2)
            updateXXLTShirtEdit(xXLOrdered);
            
    });
    $xXLDiv.appendChild($xXLselection);
    aDi.appendChild($xXLDiv);
};

var renderXXXLShirtOrder = function(shp,apDi){
   var $xXXLDiv = document.createElement("div");
    $xXXLDiv.classList.add("individual_block");
    var $xXXLShirtLabel = document.createElement("div");
    $xXXLShirtLabel.setAttribute("id", "userXXXLShirt");
    $xXXLShirtLabel.innerHTML = "XXXL";
    $xXXLDiv.appendChild($xXXLShirtLabel);
    var $xXXLselection = document.createElement("select");
    $xXXLselection.setAttribute("name","userXXXLOrder");
    $xXXLselection.setAttribute("id","userXXXLTSh");
    var xxxLVar = 0;
    if (shp == 2)
        xxxLVar = tripXLTShirtEdit;
    for(var i =0; i<11;i++){
        var $iOption = document.createElement("option");
        $iOption.setAttribute("value",i);
        var itemId = i + "Option";
        $iOption.setAttribute("id", itemId);
        $iOption.innerHTML = i;
        $xXXLselection.appendChild($iOption);
        if(i == xxxLVar){
            $iOption.setAttribute("selected", true);
        }
    }
    $xXXLselection.addEventListener("change", function(ev){
        var xXXLOrdered = document.getElementById("userXXXLTSh").value;
        if (shp == 1)
            updateXXXLTShirtOrder(xXXLOrdered);
        if (shp == 2)
            updateXXXLTShirtEdit(xXXLOrdered);
            
    });
    $xXXLDiv.appendChild($xXXLselection);
    apDi.appendChild($xXXLDiv);
};

var renderXXXXLShirtOrder = function(shpe, aplDiv){
   var $xXXXLDiv = document.createElement("div");
    $xXXXLDiv.classList.add("individual_block");
    var $xXXXLShirtLabel = document.createElement("div");
    $xXXXLShirtLabel.setAttribute("id", "userXXXXLShirt");
    $xXXXLShirtLabel.innerHTML = "XXXXL";
    $xXXXLDiv.appendChild($xXXXLShirtLabel);
    var $xXXXLselection = document.createElement("select");
    $xXXXLselection.setAttribute("name","userXXXXLOrder");
    $xXXXLselection.setAttribute("id","userXXXXLTSh");
    var xxxxLVar = 0;
    if (shpe == 2)
        xxxxLVar = quadXLTShirtEdit;
    for(var i =0; i<11;i++){
        var $iOption = document.createElement("option");
        $iOption.setAttribute("value",i);
        var itemId = i + "Option";
        $iOption.setAttribute("id", itemId);
        $iOption.innerHTML = i;
        $xXXXLselection.appendChild($iOption);
        if(i == xxxxLVar){
            $iOption.setAttribute("selected", true);
        }
    }
    $xXXXLselection.addEventListener("change", function(ev){
        var xXXXLOrdered = document.getElementById("userXXXLTSh").value;
        if (shpe == 1)
            updateXXXXLTShirtOrder(xXXXLOrdered);
        if (shpe == 2)
            updateXXXXLTShirtEdit(xXXXLOrdered);
    });
    $xXXXLDiv.appendChild($xXXXLselection);
    aplDiv.appendChild($xXXXLDiv);
};

var renderShirtOrderButton = function(appeDiv){
    var shtDiv = document.createElement("div");
    shtDiv.classList.add("shirtButton");
    var shirtBut = document.createElement("button");
    shirtBut.setAttribute("type", "button");
    shirtBut.setAttribute("id", "shirtSubmitBtn");
    shirtBut.innerHTML = "Submit The Shirt Order";
    shirtBut.addEventListener("click", function(ev){
        submitShirtOrder();
        shirtChangeUpdate();
    });
    shtDiv.appendChild(shirtBut);
    appeDiv.appendChild(shtDiv);
};

var renderTShirtOrder = function(cNa,ssm, smed, slg, sxl, sxxl, sxxxl, sxxxxl,sky){
    var orderSrcDiv = document.getElementById("shirtOrders");

    var ordDv = document.createElement("div");
    var keylastfour = sky.substring(sky.length -4, sky.length);
    var chdDivNam = cNa.concat(keylastfour);
    ordDv.setAttribute("id",chdDivNam);
    
    renderChildName(cNa,ordDv);
    renderShirtOrderString(ssm, smed, slg, sxl, sxxl, sxxxl, sxxxxl, ordDv);
    setChildShirtOrders(sky);
    renderOrderUpdateButton(ordDv,cNa, sky);
    renderOrderDeleteButton(ordDv, sky);
    orderSrcDiv.appendChild(ordDv);
};

var renderChildName = function(chNa, aDiv){
    var cdiv = document.createElement("div");
    cdiv.classList.add("individual_block_first");
    cdiv.innerHTML = chNa;
    aDiv.appendChild(cdiv);
};

var renderShirtOrderString = function(shsm, shmd, shlg, shxlg, shxxlg, shxxxlg, shxxxxlg, aDv){
    var ordString = "";
    if(+shsm > 0){
        var shStr = shsm + " Small, ";
        ordString += shStr;
    }
    if (+shmd > 0){
        var mdStr = shmd + " Medium, ";
        ordString += mdStr;
    }
    if (+shlg > 0){
        var lgStr = shlg + " Large, ";
        ordString += lgStr;
    }
    if (+shxlg > 0){
        var xlStr = shxlg + " XL, ";
        ordString += xlStr;
    }
    if (+shxxlg > 0){
        var xxlStr = shxxlg + " XXL, ";
        ordString += xxlStr;
    }
    if (+shxxxlg > 0){
        var xxxlStr = shxxxlg + " XXXL, ";
        ordString += xxxlStr;
    }
    if (+shxxxxlg > 0){
        var xxxxStr = shxxxxlg + " XXXXL, ";
        ordString += xxxxStr;
    }
    ordString = ordString.substring(0, ordString.length -2);
    ordString += ".";
    var orderStr = document.createElement("div");
    orderStr.classList.add("individual_block");
    orderStr.innerHTML = ordString;
    aDv.appendChild(orderStr);
};

var renderOrderUpdateButton = function(orD,chN, shKe){
    var shtDiv = document.createElement("div");
    shtDiv.classList.add("shirtButton");
    var shirtBut = document.createElement("button");
    shirtBut.setAttribute("type", "button");
    shirtBut.setAttribute("id", "shirtUpdateBtn");
    shirtBut.innerHTML = "Update This Order";
    shirtBut.addEventListener("click", function(ev){
        setChildShirtOrders(shKe);
        renderChildOrderEdit(orD,chN, shKe);
    });
    shtDiv.appendChild(shirtBut);
    orD.appendChild(shtDiv);
};

var renderOrderDeleteButton = function(oD, sKe){
    var shtDiv = document.createElement("div");
    shtDiv.classList.add("shirtButton");
    var shirtBut = document.createElement("button");
    shirtBut.setAttribute("type", "button");
    shirtBut.setAttribute("id", "shirtDeleteBtn");
    shirtBut.innerHTML = "Delete This Shirt Order";
    shirtBut.addEventListener("click", function(ev){
        tShirtDB.child(sKe).remove();
        shirtChangeUpdate();
        renderMemberTShirtScreen();
    });
    shtDiv.appendChild(shirtBut);
    oD.appendChild(shtDiv);
};

var renderChildOrderEdit = function(chD,chDNam,userKey){
    var newDivId = chD.getAttribute("id");
    while(chD.firstChild)
        chD.removeChild(chD.firstChild);
    var newDv = document.createElement("div");
    var newId = newDivId;
    newDv.setAttribute("id", newId);
    setChildShirtOrders(userKey);
    renderChildName(chDNam, newDv);
    renderSmallShirtOrder(2,newDv);
    renderMediumShirtOrder(2,newDv);
    renderLargeShirtOrder(2,newDv);
    renderXLShirtOrder(2,newDv);
    renderXXLShirtOrder(2,newDv);
    renderXXXLShirtOrder(2,newDv);
    renderXXXXLShirtOrder(2,newDv);
    renderUserShirtUpdateButton(newDv, userKey);
    renderUserShirtCancelButton(newDv);
    chD.appendChild(newDv);
};

var renderUserShirtUpdateButton = function(atD, aKy){
     var shtUpDiv = document.createElement("div");
    var shirtUpBut = document.createElement("button");
    shirtUpBut.setAttribute("type", "button");
    shirtUpBut.setAttribute("id", "shirtUpdateBtn");
    shirtUpBut.innerHTML = "Update This Shirt Order";
    shirtUpBut.addEventListener("click", function(ev){
        updateChildIndShirtOrder(aKy);
        // shirtChangeUpdate();
        renderMemberTShirtScreen();
    });
    shtUpDiv.appendChild(shirtUpBut);
    atD.appendChild(shtUpDiv);
};

var renderUserShirtCancelButton = function(atDi){
  var shtCanDiv = document.createElement("div");
    var shirtCanBut = document.createElement("button");
    shirtCanBut.setAttribute("type", "button");
    shirtCanBut.setAttribute("id", "shirtCancelBtn");
    shirtCanBut.innerHTML = "Cancel This Shirt Update";
    shirtCanBut.addEventListener("click", function(ev){
        // shirtChangeUpdate();
        renderMemberTShirtScreen();
    });
    shtCanDiv.appendChild(shirtCanBut);
    atDi.appendChild(shtCanDiv);
};

var renderShirtCost = function(){
    determineShirtCost();
    var $shirtHead = document.getElementById("memberTShirtCost");
    while($shirtHead.firstChild)
        $shirtHead.removeChild($shirtHead.firstChild);

    var costDv = document.createElement("div");
    var $sCHeader = document.createElement("h2");
    var shirtStart = "You have ordered ";
    var smallCount = smallTShirtCount + " small T-Shirts, ";
    var mediumCount = mediumTShirtCount +  " medium T-Shirts, ";
    var largeCount = largeTShirtCount + " large T-Shirts, ";
    var xlargeCount = xLgTShirtCount + " XL T-Shirts, ";
    var doubXXL = xXLTShirtCount + " XXL TShirts, ";
    var tripXXXL =tripXLTShirtCount + " XXXL TShirts, ";
    var quadXXXXL = "and " + quadXLTShirtCount + " XXXXL TShirts.";
    var shirtOrderString = shirtStart.concat(smallCount).concat(mediumCount).concat(largeCount).concat(xlargeCount).concat(doubXXL).concat(tripXXXL).concat(quadXXXXL);
    var shirtCost = " The cost of the TShirts are ".concat(totalShirtCost).concat(".00 dollars");
    $sCHeader.innerHTML = shirtOrderString.concat(shirtCost);
    costDv.appendChild($sCHeader);
    $shirtHead.appendChild(costDv);
};

var renderShirtsCosts = function(){
    var shirtPayHead = document.getElementById("shirtPaymentCost");
    while(shirtPayHead.firstChild)
        shirtPayHead.removeChild(shirtPayHead.firstChild);
    
    getShirtCosts();
    var paymntDv = document.createElement("div");    
    var feePaid = document.createElement("h2");
    feePaid.innerHTML = "You have paid " + shirtPaid + " dollars.";
    paymntDv.appendChild(feePaid);

    shirtPayHead.appendChild(paymntDv);
};

var renderShirtPaymentNews = function(){
    var shtPayNewClr = document.getElementById("shirtPayNews");
    while (shtPayNewClr.firstChild)
        shtPayNewClr.removeChild(shtPayNewClr.firstChild);
    
    var sourD = document.getElementById("shirtPayNews");
    var announce = document.createElement("h2");
    announce.innerHTML = "If you have already sent your payment in, it may take a couple of days to be reflected.";
    sourD.appendChild(announce);
};

var renderShirtPaymentInfo = function(){
    var shtPayClr = document.getElementById("tShirtPayment");
    while (shtPayClr.firstChild)
        shtPayClr.removeChild(shtPayClr.firstChild);
    
    var div = document.getElementById("tShirtPayment");
    var paymentDiv = document.createElement("div");
    paymentDiv.setAttribute("id","payDiv");
    // paymentDiv.innerHTML = "";
    
    var payheadTitle = document.createElement("h1");
    payheadTitle.innerHTML = "PAYMENT INFORMATION";
    paymentDiv.appendChild(payheadTitle);
    
    var payhead = document.createElement("div");
    payhead.innerHTML = "Send T-Shirt Payment to the following Address";
    paymentDiv.appendChild(payhead);
    
    var payContact = document.createElement("div");
    payContact.innerHTML = "Delores F. Law";
    paymentDiv.appendChild(payContact);
    
    var payAddress = document.createElement("div");
    payAddress.innerHTML = "1 Lisa Drive";
    paymentDiv.appendChild(payAddress);
    
    var payCity = document.createElement("div");
    payCity.innerHTML = "Newark, DE 19702";
    paymentDiv.appendChild(payCity);
    
    div.appendChild(paymentDiv);
};

var renderMemberTShirtInfo = function(){
    var shtInfClr = document.getElementById("memTShirtInfo");
    while (shtInfClr.firstChild)
        shtInfClr.removeChild(shtInfClr.firstChild);
    
    var infoDiv = document.getElementById("memTShirtInfo");
    var head1 = document.createElement("h2");
    head1.innerHTML = "Tell us what T-Shirts you want, how many and the sizes.";
    infoDiv.appendChild(head1);
  
    var head2 = document.createElement("h2");
    head2.innerHTML = "The Commemorative Shirt has Lemuel & Christopher Bowman.";
    infoDiv.appendChild(head2);
  
    var head3 = document.createElement("h2");
    head3.innerHTML = "The Flexible deadline to order shirts is June 15 15th 2019, after which the TShirt Order will be submitted.";
    infoDiv.appendChild(head3);
};

var renderShirtNavButtons = function(){
    var shtNavClr = document.getElementById("shirtNav");
    while(shtNavClr.firstChild)
        shtNavClr.removeChild(shtNavClr.firstChild);
    
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
    // getTShirtOrders();
    determineShirtCost();
    initGetShirtCosts();
    renderShirtCost();
    renderShirtsCosts();
};

document.addEventListener('DOMContentLoaded',memTShirtStart);