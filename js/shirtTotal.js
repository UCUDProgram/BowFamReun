var administ = "";

var albertaSmall = 0;
var albertaMedium = 0;
var albertaLarge = 0;
var albertaXL = 0;
var albertaXXL = 0;
var albertaXXXL = 0;
var albertaXXXXL = 0;
var albertaTotal=0;

var lillianSmall = 0;
var lillianMedium = 0;
var lillianLarge = 0;
var lillianXL = 0;
var lillianXXL = 0;
var lillianXXXL = 0;
var lillianXXXXL = 0;
var lillianTotal=0;

var elizabethSmall = 0;
var elizabethMedium = 0;
var elizabethLarge = 0;
var elizabethXL = 0;
var elizabethXXL = 0;
var elizabethXXXL = 0;
var elizabethXXXXL = 0;
var elizabethTotal=0;

var maryLueSmall = 0;
var maryLueMedium = 0;
var maryLueLarge = 0;
var maryLueXL = 0;
var maryLueXXL = 0;
var maryLueXXXL = 0;
var maryLueXXXXL = 0;
var maryLueTotal = 0;

var ednaSmall = 0;
var ednaMedium = 0;
var ednaLarge = 0;
var ednaXL = 0;
var ednaXXL = 0;
var ednaXXXL = 0;
var ednaXXXXL = 0;
var ednaTotal=0;

var dulceniaSmall = 0;
var dulceniaMedium = 0;
var dulceniaLarge = 0;
var dulceniaXL = 0;
var dulceniaXXL = 0;
var dulceniaXXXL = 0;
var dulceniaXXXXL = 0;
var dulceniaTotal = 0;

var ireneSmall = 0;
var ireneMedium = 0;
var ireneLarge = 0;
var ireneXL = 0;
var ireneXXL = 0;
var ireneXXXL = 0;
var ireneXXXXL = 0;
var ireneTotal = 0;

var jimmieSmall = 0;
var jimmieMedium = 0;
var jimmieLarge = 0;
var jimmieXL = 0;
var jimmieXXL = 0;
var jimmieXXXL = 0;
var jimmieXXXXL = 0;
var jimmieTotal = 0;

var wardellSmall = 0;
var wardellMedium = 0;
var wardellLarge = 0;
var wardellXL = 0;
var wardellXXL = 0;
var wardellXXXL = 0;
var wardellXXXXL = 0;
var wardellTotal = 0;

var commemorativeSmall = 0;
var commemorativeMedium = 0;
var commemorativeLarge = 0;
var commemorativeXL = 0;
var commemorativeXXL = 0;
var commemorativeXXXL = 0;
var commemorativeXXXXL = 0;
var commemorativeTotal = 0;

var smallShirtTotal = 0;
var mediumShirtTotal = 0;
var lgShirtTotal = 0;
var xLGShirtTotal = 0;
var doubXLShirtTotal = 0;
var tripXLShirtTotal = 0;
var quadXLShirtTotal = 0;
var shirtTotal = 0;
var shirtDB = new Firebase("https://bowmanfamreun.firebaseio.com/TShirt");

var getAdmUser = function(){
    administ = localStorage.getItem("admin");
    if(administ == null){
        showAdminLoginScreen();
    }
    // if(administ != "LawAdmin"){
    //     alert("This website is in Archive mode. Your account has been permanently disabled.");
    //     showHomePageScreen();
    // }
};

var updateAlbertaSmallCount = function(alSm){
    albertaSmall += alSm;
};

var updateAlbertaMediumCount = function(alMd){
    albertaMedium += alMd;
};

var updateAlbertaLargeCount = function(alLg){
    albertaLarge += alLg;
};

var updateAlbertaXLCount = function(alXL){
    albertaXL += alXL;  
};

var updateAlbertaXXLCount = function(alXXL){
    albertaXXL += alXXL;
};

var updateAlbertaXXXLCount = function(alXXXL){
    albertaXXXL += alXXXL;
};

var updateAlbertaXXXXLCount = function(alXXXXL){
    albertaXXXXL += alXXXXL;
};

var updateAlbertaTotalCount = function(alTot){
    albertaTotal += alTot;
};


var updateLillianSmallCount = function(liSm){
    lillianSmall += liSm;
};

var updateLillianMediumCount = function(liMd){
    lillianMedium += liMd;
};

var updateLillianLargeCount = function(liLg){
    lillianLarge += liLg;
};

var updateLillianXLCount = function(liXL){
    lillianXL += liXL;
};

var updateLillianXXLCount = function(liXXL){
    lillianXXL += liXXL;
};

var updateLillianXXXLCount = function(liXXXL){
    lillianXXXL += liXXXL;
};

var updateLillianXXXXLCount = function(liXXXXL){
    lillianXXXXL += liXXXXL;
};

var updateLillianTotalCount = function(liTot){
    lillianTotal += liTot;
};

var updateElizabethSmallCount = function(elSm){
    elizabethSmall += elSm;
};

var updateElizabethMediumCount = function(elMd){
    elizabethMedium += elMd;
};

var updateElizabethLargeCount = function(elLg){
    elizabethLarge += elLg;
};

var updateElizabethXLCount = function(elXL){
    elizabethXL += elXL;
};

var updateElizabethXXLCount = function(elXXL){
    elizabethXXL += elXXL;
};

var updateElizabethXXXLCount = function(elXXXL){
    elizabethXXXL += elXXXL;
};

var updateElizabethXXXXLCount = function(elXXXXL){
    elizabethXXXXL += elXXXXL;
};

var updateElizabethTotalCount = function(elTot){
     elizabethTotal += elTot; 
};

var updateMaryLueSmallCount = function(mlSm){
    maryLueSmall += mlSm;
};

var updateMaryLueMediumCount = function(mlMed){
    maryLueMedium += mlMed;
};

var updateMaryLueLargeCount = function(mlLg){
    maryLueLarge += mlLg;
};

var updateMaryLueXLCount = function(mlXL){
    maryLueXL += mlXL;
};

var updateMaryLueXXLCount = function(mlXXL){
    maryLueXXL += mlXXL;
};

var updateMaryLueXXXLCount = function(mlXXXL){
    maryLueXXXL += mlXXXL;
};

var updateMaryLueXXXXLCount = function(mlXXXXL){
    maryLueXXXXL += mlXXXXL;
};

var updateMaryLueTotalCount = function(mlTot){
    maryLueTotal += mlTot;
};

var updateEdnaSmallCount = function(edSm){
    ednaSmall += edSm;
};

var updateEdnaMediumCount = function(edMd){
    ednaMedium += edMd;
};

var updateEdnaLargeCount = function(edLg){
    ednaLarge += edLg;
};

var updateEdnaXLCount = function(edXL){
    ednaXL += edXL;
};

var updateEdnaXXLCount = function(edXXL){
    ednaXXL += edXXL;
};

var updateEdnaXXXLCount = function(edXXXL){
    ednaXXXL += edXXXL;
};

var updateEdnaXXXXLCount = function(edXXXXL){
    ednaXXXXL += edXXXXL;
};

var updateEdnaTotalCount = function(edTot){
    ednaTotal += edTot;
};

var updateDulceniaSmallCount = function(duSm){
    dulceniaSmall += duSm;
};

var updateDulceniaMediumCount = function(duMd){
    dulceniaMedium += duMd;
};

var updateDulceniaLargeCount = function(duLg){
    dulceniaLarge += duLg;
};

var updateDulceniaXLCount = function(duXL){
    dulceniaXL += duXL;
};

var updateDulceniaXXLCount = function(duXXL){
    dulceniaXXL += duXXL;
};

var updateDulceniaXXXLCount = function(duXXXL){
    dulceniaXXXL += duXXXL;
};

var updateDulceniaXXXXLCount = function(duXXXXL){
    dulceniaXXXXL += duXXXXL;
};

var updateDulceniaTotalCount = function(duTot){
    dulceniaTotal += duTot;
};

var updateIreneSmallCount = function(irSm){
    ireneSmall += irSm;
};

var updateIreneMediumCount = function(irMd){
    ireneMedium += irMd;
};

var updateIreneLargeCount = function(irLg){
    ireneLarge += irLg;
};

var updateIreneXLCount = function(irXL){
    ireneXL += irXL;
};

var updateIreneXXLCount = function(irXXL){
    ireneXXL += irXXL;
};

var updateIreneXXXLCount = function(irXXXL){
    ireneXXXL += irXXXL;
};

var updateIreneXXXXLCount = function(irXXXXL){
    ireneXXXXL += irXXXXL;
};

var updateIreneTotalCount = function(irTot){
    ireneTotal += irTot;
};

var updateJimmieSmallCount = function(jiSm){
    jimmieSmall += jiSm;
};

var updateJimmieMediumCount = function(jiMd){
    jimmieMedium += jiMd;
};

var updateJimmieLargeCount = function(jiLg){
    jimmieLarge += jiLg;
};

var updateJimmieXLCount = function(jiXL){
    jimmieXL += jiXL;
};

var updateJimmieXXLCount = function(jiXXL){
    jimmieXXL += jiXXL;
};

var updateJimmieXXXLCount = function(jiXXXL){
    jimmieXXXL += jiXXXL;
};

var updateJimmieXXXXLCount = function(jiXXXXL){
    jimmieXXXXL += jiXXXXL;
};

var updateJimmieTotalCount = function(jiTot){
    jimmieTotal += jiTot;
};

var updateWardellSmallCount = function(waSm){
    wardellSmall += waSm;
};

var updateWardellMediumCount = function(waMd){
    wardellMedium += waMd;
};

var updateWardellLargeCount = function(waLg){
    wardellLarge += waLg;
};

var updateWardellXLCount = function(waXL){
    wardellXL += waXL;
};

var updateWardellXXLCount = function(waXXL){
    wardellXXL += waXXL;
};
 
var updateWardellXXXLCount = function(waXXXL){
    wardellXXXL += waXXXL;
};

var updateWardellXXXXLCount = function(waXXXXL){
    wardellXXXXL += waXXXXL;
};

var updateWardellTotalCount = function(waTot){
    wardellTotal += waTot;
};

var updateCommemorativeSmallCount = function(coSm){
    commemorativeSmall += coSm;
};

var updateCommemorativeMediumCount = function(coMd){
    commemorativeMedium += coMd;
};

var updateCommemorativeLargeCount = function(coLg){
    commemorativeLarge += coLg;
};

var updateCommemorativeXLCount = function(coXL){
    commemorativeXL += coXL;
};

var updateCommemorativeXXLCount = function(coXXL){
    commemorativeXXL += coXXL;
};

var updateCommemorativeXXXLCount = function(coXXXL){
    commemorativeXXXL += coXXXL;
};

var updateCommemorativeXXXXLCount = function(coXXXXL){
    commemorativeXXXXL += coXXXXL;
};

var updateCommemorativeTotalCount = function(coTot){
    commemorativeTotal += coTot;
};

var updateSmallCount = function(sm){
    smallShirtTotal += sm;  
};

var updateMediumCount = function(med){
    mediumShirtTotal += med;  
};

var updateLargeCount = function(lg){
    lgShirtTotal += lg;  
};

var updateXLCount = function(xlg){
    xLGShirtTotal += xlg;  
};

var updateXXLShirtCount = function(xxl){
    doubXLShirtTotal += xxl;  
};

var updateXXXLShirtCount = function(xxxl){
    tripXLShirtTotal += xxxl;
};

var updateXXXXLShirtCount = function(xxxxl){
    quadXLShirtTotal += xxxxl;  
};

var updateShirtTotal = function(aShOrder){
    shirtTotal += aShOrder;
};

var resetVariables = function(){
    albertaSmall = 0;
    albertaMedium = 0;
    albertaLarge = 0;
    albertaXL = 0;
    albertaXXL = 0;
    albertaXXXL = 0;
    albertaXXXXL = 0;
    albertaTotal=0;

    lillianSmall = 0;
    lillianMedium = 0;
    lillianLarge = 0;
    lillianXL = 0;
    lillianXXL = 0;
    lillianXXXL = 0;
    lillianXXXXL = 0;
    lillianTotal=0;

    elizabethSmall = 0;
    elizabethMedium = 0;
    elizabethLarge = 0;
    elizabethXL = 0;
    elizabethXXL = 0;
    elizabethXXXL = 0;
    elizabethXXXXL = 0;
    elizabethTotal=0;

    maryLueSmall = 0;
    maryLueMedium = 0;
    maryLueLarge = 0;
    maryLueXL = 0;
    maryLueXXL = 0;
    maryLueXXXL = 0;
    maryLueXXXXL = 0;
    maryLueTotal = 0;

    ednaSmall = 0;
    ednaMedium = 0;
    ednaLarge = 0;
    ednaXL = 0;
    ednaXXL = 0;
    ednaXXXL = 0;
    ednaXXXXL = 0;
    ednaTotal=0;

    dulceniaSmall = 0;
    dulceniaMedium = 0;
    dulceniaLarge = 0;
    dulceniaXL = 0;
    dulceniaXXL = 0;
    dulceniaXXXL = 0;
    dulceniaXXXXL = 0;
    dulceniaTotal = 0;

    ireneSmall = 0;
    ireneMedium = 0;
    ireneLarge = 0;
    ireneXL = 0;
    ireneXXL = 0;
    ireneXXXL = 0;
    ireneXXXXL = 0;
    ireneTotal = 0;

    jimmieSmall = 0;
    jimmieMedium = 0;
    jimmieLarge = 0;
    jimmieXL = 0;
    jimmieXXL = 0;
    jimmieXXXL = 0;
    jimmieXXXXL = 0;
    jimmieTotal = 0;

    wardellSmall = 0;
    wardellMedium = 0;
    wardellLarge = 0;
    wardellXL = 0;
    wardellXXL = 0;
    wardellXXXL = 0;
    wardellXXXXL = 0;
    wardellTotal = 0;

    commemorativeSmall = 0;
    commemorativeMedium = 0;
    commemorativeLarge = 0;
    commemorativeXL = 0;
    commemorativeXXL = 0;
    commemorativeXXXL = 0;
    commemorativeXXXXL = 0;
    commemorativeTotal = 0;

    smallShirtTotal = 0;
    mediumShirtTotal = 0;
    lgShirtTotal = 0;
    xLGShirtTotal = 0;
    doubXLShirtTotal = 0;
    tripXLShirtTotal = 0;
    quadXLShirtTotal = 0;
    shirtTotal = 0;
};

var getShirtCount = function(){
    resetVariables();
    shirtDB.orderByKey().on("value", function(snapshot){
        snapshot.forEach(function (child){
            
            var parDiv = document.getElementById("shirtTotals");
            while(parDiv.firstChild)
                parDiv.removeChild(parDiv.firstChild);
            
            var childNa = child.val().childName;    
            var shSm = child.val().small;
            var shMed = child.val().medium;
            var shLg = child.val().large;
            var shXL = child.val().xL;
            var shXXL = child.val().xxLarge;
            var shXXXL = child.val().xxxLarge;
            var shXXXXL = child.val().xxxxLarge;
       
            var shirtSmall = parseInt(shSm,10);
            var shirtMedium = parseInt(shMed,10);
            var shirtLarge = parseInt(shLg,10);
            var shirtXL = parseInt(shXL, 10);
            var shirtXXL = parseInt(shXXL,10);
            var shirtXXXL = parseInt(shXXXL,10);
            var shirtXXXXL = parseInt(shXXXXL,10);
            
            var childTot = +shirtSmall + +shirtMedium + +shirtLarge + +shirtXL + +shirtXXL + +shirtXXXL + +shirtXXXXL;
            
            if (childNa != undefined){
                if(childNa == "Alberta"){
                    updateAlbertaSmallCount(shirtSmall);
                    updateAlbertaMediumCount(shirtMedium);
                    updateAlbertaLargeCount(shirtLarge);
                    updateAlbertaXLCount(shirtXL);
                    updateAlbertaXXLCount(shirtXXL);
                    updateAlbertaXXXLCount(shirtXXXL);
                    updateAlbertaXXXXLCount(shirtXXXXL);
                    updateAlbertaTotalCount(childTot);
                }
                if (childNa == "Lillian"){
                    updateLillianSmallCount(shirtSmall);
                    updateLillianMediumCount(shirtMedium);
                    updateLillianLargeCount(shirtLarge);
                    updateLillianXLCount(shirtXL);
                    updateLillianXXLCount(shirtXXL);
                    updateLillianXXXLCount(shirtXXXL);
                    updateLillianXXXXLCount(shirtXXXXL);
                    updateLillianTotalCount(childTot);
                }
                if (childNa == "Elizabeth"){
                    updateElizabethSmallCount(shirtSmall);
                    updateElizabethMediumCount(shirtMedium);
                    updateElizabethLargeCount(shirtLarge);
                    updateElizabethXLCount(shirtXL);
                    updateElizabethXXLCount(shirtXXL);
                    updateElizabethXXXLCount(shirtXXXL);
                    updateElizabethXXXXLCount(shirtXXXXL);
                    updateElizabethTotalCount(childTot);
                }
                if (childNa == "Marylue"){
                    updateMaryLueSmallCount(shirtSmall);
                    updateMaryLueMediumCount(shirtMedium);
                    updateMaryLueLargeCount(shirtLarge);
                    updateMaryLueXLCount(shirtXL);
                    updateMaryLueXXLCount(shirtXXL);
                    updateMaryLueXXXLCount(shirtXXXL);
                    updateMaryLueXXXXLCount(shirtXXXXL);
                    updateMaryLueTotalCount(childTot);
                }
                if (childNa == "Edna"){
                    updateEdnaSmallCount(shirtSmall);
                    updateEdnaMediumCount(shirtMedium);
                    updateEdnaLargeCount(shirtLarge);
                    updateEdnaXLCount(shirtXL);
                    updateEdnaXXLCount(shirtXXL);
                    updateEdnaXXXLCount(shirtXXXL);
                    updateEdnaXXXXLCount(shirtXXXXL);
                    updateEdnaTotalCount(childTot);
                }
                if (childNa == "Dulcenia"){
                    updateDulceniaSmallCount(shirtSmall);
                    updateDulceniaMediumCount(shirtMedium);
                    updateDulceniaLargeCount(shirtLarge);
                    updateDulceniaXLCount(shirtXL);
                    updateDulceniaXXLCount(shirtXXL);
                    updateDulceniaXXXLCount(shirtXXXL);
                    updateDulceniaXXXXLCount(shirtXXXXL);
                    updateDulceniaTotalCount(childTot);
                }
                if (childNa == "Irene"){
                    updateIreneSmallCount(shirtSmall);
                    updateIreneMediumCount(shirtMedium);
                    updateIreneLargeCount(shirtLarge);
                    updateIreneXLCount(shirtXL);
                    updateIreneXXLCount(shirtXXL);
                    updateIreneXXXLCount(shirtXXXL);
                    updateIreneXXXXLCount(shirtXXXXL);
                    updateIreneTotalCount(childTot);
                }
                if (childNa == "James"){
                    updateJimmieSmallCount(shirtSmall);
                    updateJimmieMediumCount(shirtMedium);
                    updateJimmieLargeCount(shirtLarge);
                    updateJimmieXLCount(shirtXL);
                    updateJimmieXXLCount(shirtXXL);
                    updateJimmieXXXLCount(shirtXXXL);
                    updateJimmieXXXXLCount(shirtXXXXL);
                    updateJimmieTotalCount(childTot);
                }
                if (childNa == "Wardell"){
                    updateWardellSmallCount(shirtSmall);
                    updateWardellMediumCount(shirtMedium);
                    updateWardellLargeCount(shirtLarge);
                    updateWardellXLCount(shirtXL);
                    updateWardellXXLCount(shirtXXL);
                    updateWardellXXXLCount(shirtXXXL);
                    updateWardellXXXXLCount(shirtXXXXL);
                    updateWardellTotalCount(childTot);
                }
                if (childNa == "Commemorative"){
                    updateCommemorativeSmallCount(shirtSmall);
                    updateCommemorativeMediumCount(shirtMedium);
                    updateCommemorativeLargeCount(shirtLarge);
                    updateCommemorativeXLCount(shirtXL);
                    updateCommemorativeXXLCount(shirtXXL);
                    updateCommemorativeXXXLCount(shirtXXXL);
                    updateCommemorativeXXXXLCount(shirtXXXXL);
                    updateCommemorativeTotalCount(childTot);
                }
                updateSmallCount(+shirtSmall);
                updateMediumCount(+shirtMedium);
                updateLargeCount(+shirtLarge);   
                updateXLCount(+shirtXL);
                updateXXLShirtCount(+shirtXXL);
                updateXXXLShirtCount(+shirtXXXL);
                updateXXXXLShirtCount(+shirtXXXXL);
                updateShirtTotal(+childTot);
            }
            renderShirtTotal();
        });
    });
};

// RENDERING THE SCREEN (VIEW)
var renderShirtOrderHeader = function(){
    var ordHead = document.getElementById("shirtHead");
    var ordTitle = document.createElement("h1");
    ordTitle.innerHTML = "T-Shirt Totals";
    ordHead.appendChild(ordTitle);
};

var renderShirtTotal = function(){
    var shirtDiv = document.getElementById("shirtTotals");
    
    var childShtTbl = document.createElement("table");
    renderShirtKeyRow(childShtTbl);
    renderAlbertaShirtRow(childShtTbl);
    renderLillianShirtRow(childShtTbl);
    renderElizabethShirtRow(childShtTbl);
    renderMarylueShirtRow(childShtTbl);
    renderEdnaShirtRow(childShtTbl);
    renderDulceniaShirtRow(childShtTbl);
    renderIreneShirtRow(childShtTbl);
    renderJimmyShirtRow(childShtTbl);
    renderWardellShirtRow(childShtTbl);
    renderCommemorativeShirtRow(childShtTbl);
    renderTotalShirtRow(childShtTbl);
    shirtDiv.appendChild(childShtTbl);
};

var renderShirtKeyRow = function(shtT){
    var shirtRow = document.createElement("tr");
    
    var childName = document.createElement("td");
    childName.innerHTML = "Child's Name";
    shirtRow.appendChild(childName);
    
    var smallOrd = document.createElement("td");
    smallOrd.innerHTML = "Small Shirts";
    shirtRow.appendChild(smallOrd);
    
    var mediumOrd = document.createElement("td");
    mediumOrd.innerHTML = "Medium Shirts";
    shirtRow.appendChild(mediumOrd);
    
    var largeOrd = document.createElement("td");
    largeOrd.innerHTML = "Large Shirts";
    shirtRow.appendChild(largeOrd);
    
    var xLOrd = document.createElement("td");
    xLOrd.innerHTML = "XL Shirts";
    shirtRow.appendChild(xLOrd);
    
    var xxLOrd = document.createElement("td");
    xxLOrd.innerHTML = "XXL Shirts";
    shirtRow.appendChild(xxLOrd);
    
    var xxxLOrd = document.createElement("td");
    xxxLOrd.innerHTML = "XXXL Shirts";
    shirtRow.appendChild(xxxLOrd);
    
    var xxxxLOrd = document.createElement("td");
    xxxxLOrd.innerHTML = "XXXXL Shirts";
    shirtRow.appendChild(xxxxLOrd);
    
    var ordTot = document.createElement("td");
    ordTot.innerHTML = "Total Shirts";
    shirtRow.appendChild(ordTot);
    
    shtT.appendChild(shirtRow);
};

var renderAlbertaShirtRow = function(shTa){
    var albertaRow = document.createElement("tr");

    var childName = document.createElement("td");
    childName.innerHTML = "Alberta";
    albertaRow.appendChild(childName);
    
    var smallOrd = document.createElement("td");
    smallOrd.innerHTML = albertaSmall + " Shirts";
    albertaRow.appendChild(smallOrd);
    
    var mediumOrd = document.createElement("td");
    mediumOrd.innerHTML = albertaMedium +" Shirts";
    albertaRow.appendChild(mediumOrd);
    
    var largeOrd = document.createElement("td");
    largeOrd.innerHTML = albertaLarge +" Shirts";
    albertaRow.appendChild(largeOrd);
    
    var xLOrd = document.createElement("td");
    xLOrd.innerHTML = albertaXL + " Shirts";
    albertaRow.appendChild(xLOrd);
    
    var xxLOrd = document.createElement("td");
    xxLOrd.innerHTML = albertaXXL + " Shirts";
    albertaRow.appendChild(xxLOrd);
    
    var xxxLOrd = document.createElement("td");
    xxxLOrd.innerHTML = albertaXXXL + " Shirts";
    albertaRow.appendChild(xxxLOrd);
    
    var xxxxLOrd = document.createElement("td");
    xxxxLOrd.innerHTML =albertaXXXXL +  " Shirts";
    albertaRow.appendChild(xxxxLOrd);
    
    var ordTotal = document.createElement("td");
    ordTotal.innerHTML =albertaTotal +  " Shirts";
    albertaRow.appendChild(ordTotal);
    
    shTa.appendChild(albertaRow);
};

var renderLillianShirtRow = function(shiTab){
    var lillianRow = document.createElement("tr");
    
    var childName = document.createElement("td");
    childName.innerHTML = "Lillian";
    lillianRow.appendChild(childName);
    
    var smallOrd = document.createElement("td");
    smallOrd.innerHTML = lillianSmall + " Shirts";
    lillianRow.appendChild(smallOrd);
    
    var mediumOrd = document.createElement("td");
    mediumOrd.innerHTML = lillianMedium + " Shirts";
    lillianRow.appendChild(mediumOrd);
    
    var largeOrd = document.createElement("td");
    largeOrd.innerHTML = lillianLarge + " Shirts";
    lillianRow.appendChild(largeOrd);
    
    var xLOrd = document.createElement("td");
    xLOrd.innerHTML = lillianXL + " Shirts";
    lillianRow.appendChild(xLOrd);
    
    var xxLOrd = document.createElement("td");
    xxLOrd.innerHTML = lillianXXL + " Shirts";
    lillianRow.appendChild(xxLOrd);

    var xxxLOrd = document.createElement("td");
    xxxLOrd.innerHTML = lillianXXXL + " Shirts";
    lillianRow.appendChild(xxxLOrd);
    
    var xxxxLOrd = document.createElement("td");
    xxxxLOrd.innerHTML = lillianXXXXL + " Shirts";
    lillianRow.appendChild(xxxxLOrd);
    
     var ordTot = document.createElement("td");
    ordTot.innerHTML = lillianTotal + " Shirts";
    lillianRow.appendChild(ordTot);
    
    shiTab.appendChild(lillianRow);
};

var renderElizabethShirtRow = function(shirTabl){
    var elizabethRow = document.createElement("tr");
    
    var childName = document.createElement("td");
    childName.innerHTML = "Elizabeth";
    elizabethRow.appendChild(childName);
    
    var smallOrd = document.createElement("td");
    smallOrd.innerHTML = elizabethSmall + " Shirts";
    elizabethRow.appendChild(smallOrd);
    
    var mediumOrd = document.createElement("td");
    mediumOrd.innerHTML = elizabethMedium + " Shirts";
    elizabethRow.appendChild(mediumOrd);
    
    var largeOrd = document.createElement("td");
    largeOrd.innerHTML = elizabethLarge + " Shirts";
    elizabethRow.appendChild(largeOrd);
    
    var xLOrd = document.createElement("td");
    xLOrd.innerHTML = elizabethXL + " Shirts";
    elizabethRow.appendChild(xLOrd);
    
    var xxLOrd = document.createElement("td");
    xxLOrd.innerHTML = elizabethXXL + " Shirts";
    elizabethRow.appendChild(xxLOrd);
    
    var xxxLOrd = document.createElement("td");
    xxxLOrd.innerHTML = elizabethXXXL + " Shirts";
    elizabethRow.appendChild(xxxLOrd);
    
    var xxxxLOrd = document.createElement("td");
    xxxxLOrd.innerHTML = elizabethXXXXL + " Shirts";
    elizabethRow.appendChild(xxxxLOrd);
    
    var ordTotal = document.createElement("td");
    ordTotal.innerHTML = elizabethTotal + " Shirts";
    elizabethRow.appendChild(ordTotal);
    
    shirTabl.appendChild(elizabethRow);
};

var renderMarylueShirtRow = function(shirtTable){
    var maryLueRow = document.createElement("tr");
    
    var childName = document.createElement("td");
    childName.innerHTML = "MaryLue";
    maryLueRow.appendChild(childName);
    
    var smallOrd = document.createElement("td");
    smallOrd.innerHTML =maryLueSmall + " Shirts";
    maryLueRow.appendChild(smallOrd);
    
    var mediumOrd = document.createElement("td");
    mediumOrd.innerHTML = maryLueMedium + " Shirts";
    maryLueRow.appendChild(mediumOrd);
    
    var largeOrd = document.createElement("td");
    largeOrd.innerHTML = maryLueLarge + " Shirts";
    maryLueRow.appendChild(largeOrd);
    
    var xLOrd = document.createElement("td");
    xLOrd.innerHTML = maryLueXL + " Shirts";
    maryLueRow.appendChild(xLOrd);
    
    var xxLOrd = document.createElement("td");
    xxLOrd.innerHTML = maryLueXXL + " Shirts";
    maryLueRow.appendChild(xxLOrd);
    
    var xxxLOrd = document.createElement("td");
    xxxLOrd.innerHTML = maryLueXXXL + " Shirts";
    maryLueRow.appendChild(xxxLOrd);
    
    var xxxxLOrd = document.createElement("td");
    xxxxLOrd.innerHTML = maryLueXXXXL + " Shirts";
    maryLueRow.appendChild(xxxxLOrd);
    
    var ordTotal = document.createElement("td");
    ordTotal.innerHTML = maryLueTotal + " Shirts";
    maryLueRow.appendChild(ordTotal);
    
    shirtTable.appendChild(maryLueRow);
};

var renderEdnaShirtRow = function(shtb){
    var ednaRow = document.createElement("tr");
    
    var childName = document.createElement("td");
    childName.innerHTML = "Edna";
    ednaRow.appendChild(childName);
    
    var smallOrd = document.createElement("td");
    smallOrd.innerHTML = ednaSmall + " Shirts";
    ednaRow.appendChild(smallOrd);
    
    var mediumOrd = document.createElement("td");
    mediumOrd.innerHTML = ednaMedium + " Shirts";
    ednaRow.appendChild(mediumOrd);
    
    var largeOrd = document.createElement("td");
    largeOrd.innerHTML = ednaLarge + " Shirts";
    ednaRow.appendChild(largeOrd);
    
    var xLOrd = document.createElement("td");
    xLOrd.innerHTML = ednaXL + " Shirts";
    ednaRow.appendChild(xLOrd);
    
    var xxLOrd = document.createElement("td");
    xxLOrd.innerHTML = ednaXXL + " Shirts";
    ednaRow.appendChild(xxLOrd);
    
    var xxxLOrd = document.createElement("td");
    xxxLOrd.innerHTML = ednaXXXL + " Shirts";
    ednaRow.appendChild(xxxLOrd);
    
    var xxxxLOrd = document.createElement("td");
    xxxxLOrd.innerHTML = ednaXXXXL + " Shirts";
    ednaRow.appendChild(xxxxLOrd);
    
    var ordTotal = document.createElement("td");
    ordTotal.innerHTML = ednaTotal + " Shirts";
    ednaRow.appendChild(ordTotal);
    
    shtb.appendChild(ednaRow);
};

var renderDulceniaShirtRow = function(shrtbl){
    var dulceniaRow = document.createElement("tr");
    
    var childName = document.createElement("td");
    childName.innerHTML = "Dulcenia";
    dulceniaRow.appendChild(childName);
    
    var smallOrd = document.createElement("td");
    smallOrd.innerHTML = dulceniaSmall + " Shirts";
    dulceniaRow.appendChild(smallOrd);
    
    var mediumOrd = document.createElement("td");
    mediumOrd.innerHTML = dulceniaMedium + " Shirts";
    dulceniaRow.appendChild(mediumOrd);
    
    var largeOrd = document.createElement("td");
    largeOrd.innerHTML = dulceniaLarge + " Shirts";
    dulceniaRow.appendChild(largeOrd);
    
    var xLOrd = document.createElement("td");
    xLOrd.innerHTML =dulceniaXL + " Shirts";
    dulceniaRow.appendChild(xLOrd);

    var xxLOrd = document.createElement("td");
    xxLOrd.innerHTML =dulceniaXXL + " Shirts";
    dulceniaRow.appendChild(xxLOrd);
    
    var xxxLOrd = document.createElement("td");
    xxxLOrd.innerHTML = dulceniaXXXL + " Shirts";
    dulceniaRow.appendChild(xxxLOrd);
    
    var xxxxLOrd = document.createElement("td");
    xxxxLOrd.innerHTML = dulceniaXXXXL + " Shirts";
    dulceniaRow.appendChild(xxxxLOrd);
    
    var ordTotal = document.createElement("td");
    ordTotal.innerHTML = dulceniaTotal + " Shirts";
    dulceniaRow.appendChild(ordTotal);
    
    shrtbl.appendChild(dulceniaRow);
};

var renderIreneShirtRow = function(srtTl){
    var ireneRow = document.createElement("tr");
    
    var childName = document.createElement("td");
    childName.innerHTML = "Irene";
    ireneRow.appendChild(childName);
    
    var smallOrd = document.createElement("td");
    smallOrd.innerHTML = ireneSmall + " Shirts";
    ireneRow.appendChild(smallOrd);
    
    var mediumOrd = document.createElement("td");
    mediumOrd.innerHTML = ireneMedium + " Shirts";
    ireneRow.appendChild(mediumOrd);
    
    var largeOrd = document.createElement("td");
    largeOrd.innerHTML = ireneLarge + " Shirts";
    ireneRow.appendChild(largeOrd);
    
    var xLOrd = document.createElement("td");
    xLOrd.innerHTML = ireneXL + " Shirts";
    ireneRow.appendChild(xLOrd);
    
    var xxLOrd = document.createElement("td");
    xxLOrd.innerHTML = ireneXXL + " Shirts";
    ireneRow.appendChild(xxLOrd);

    var xxxLOrd = document.createElement("td");
    xxxLOrd.innerHTML = ireneXXXL + " Shirts";
    ireneRow.appendChild(xxxLOrd);
    
    var xxxxLOrd = document.createElement("td");
    xxxxLOrd.innerHTML = ireneXXXXL + " Shirts";
    ireneRow.appendChild(xxxxLOrd);
    
    var ordTotal = document.createElement("td");
    ordTotal.innerHTML = ireneTotal + " Shirts";
    ireneRow.appendChild(ordTotal);
    
    srtTl.appendChild(ireneRow);
};

var renderJimmyShirtRow = function(shTb){
    var jimmyRow = document.createElement("tr");
    
    var childName = document.createElement("td");
    childName.innerHTML = "James";
    jimmyRow.appendChild(childName);
    
    var smallOrd = document.createElement("td");
    smallOrd.innerHTML = jimmieSmall + " Shirts";
    jimmyRow.appendChild(smallOrd);
    
    var mediumOrd = document.createElement("td");
    mediumOrd.innerHTML = jimmieMedium + " Shirts";
    jimmyRow.appendChild(mediumOrd);
    
    var largeOrd = document.createElement("td");
    largeOrd.innerHTML = jimmieLarge + " Shirts";
    jimmyRow.appendChild(largeOrd);
    
    var xLOrd = document.createElement("td");
    xLOrd.innerHTML = jimmieXL + " Shirts";
    jimmyRow.appendChild(xLOrd);
    
    var xxLOrd = document.createElement("td");
    xxLOrd.innerHTML = jimmieXXL + " Shirts";
    jimmyRow.appendChild(xxLOrd);

    var xxxLOrd = document.createElement("td");
    xxxLOrd.innerHTML = jimmieXXXL + " Shirts";
    jimmyRow.appendChild(xxxLOrd);
    
    var xxxxLOrd = document.createElement("td");
    xxxxLOrd.innerHTML = jimmieXXXXL + " Shirts";
    jimmyRow.appendChild(xxxxLOrd);
    
    var ordTotal = document.createElement("td");
    ordTotal.innerHTML = jimmieTotal + " Shirts";
    jimmyRow.appendChild(ordTotal);
    
    shTb.appendChild(jimmyRow);
};

var renderWardellShirtRow = function(sTb){
    var wardellRow = document.createElement("tr");
    
    var childName = document.createElement("td");
    childName.innerHTML = "Wardell";
    wardellRow.appendChild(childName);
    
    var smallOrd = document.createElement("td");
    smallOrd.innerHTML = wardellSmall + " Shirts";
    wardellRow.appendChild(smallOrd);
    
    var mediumOrd = document.createElement("td");
    mediumOrd.innerHTML = wardellMedium + " Shirts";
    wardellRow.appendChild(mediumOrd);
    
    var largeOrd = document.createElement("td");
    largeOrd.innerHTML = wardellLarge + " Shirts";
    wardellRow.appendChild(largeOrd);
    
    var xLOrd = document.createElement("td");
    xLOrd.innerHTML = wardellXL + " Shirts";
    wardellRow.appendChild(xLOrd);
    
    var xxLOrd = document.createElement("td");
    xxLOrd.innerHTML = wardellXXL + " Shirts";
    wardellRow.appendChild(xxLOrd);

    var xxxLOrd = document.createElement("td");
    xxxLOrd.innerHTML = wardellXXXL + " Shirts";
    wardellRow.appendChild(xxxLOrd);
    
    var xxxxLOrd = document.createElement("td");
    xxxxLOrd.innerHTML = wardellXXXXL + " Shirts";
    wardellRow.appendChild(xxxxLOrd);
    
    var ordTotal = document.createElement("td");
    ordTotal.innerHTML = wardellTotal + " Shirts";
    wardellRow.appendChild(ordTotal);
    
    sTb.appendChild(wardellRow);
};

var renderCommemorativeShirtRow = function(sbl){
    var commemorativeRow = document.createElement("tr");
    
    var childName = document.createElement("td");
    childName.innerHTML = "Commemorative";
    commemorativeRow.appendChild(childName);
    
    var smallOrd = document.createElement("td");
    smallOrd.innerHTML = commemorativeSmall + " Shirts";
    commemorativeRow.appendChild(smallOrd);
    
    var mediumOrd = document.createElement("td");
    mediumOrd.innerHTML = commemorativeMedium + " Shirts";
    commemorativeRow.appendChild(mediumOrd);
    
    var largeOrd = document.createElement("td");
    largeOrd.innerHTML = commemorativeLarge + " Shirts";
    commemorativeRow.appendChild(largeOrd);
    
    var xLOrd = document.createElement("td");
    xLOrd.innerHTML = commemorativeXL + " Shirts";
    commemorativeRow.appendChild(xLOrd);
    
    var xxLOrd = document.createElement("td");
    xxLOrd.innerHTML = commemorativeXXL + " Shirts";
    commemorativeRow.appendChild(xxLOrd);
    
    var xxxLOrd = document.createElement("td");
    xxxLOrd.innerHTML = commemorativeXXXL + " Shirts";
    commemorativeRow.appendChild(xxxLOrd);
    
    var xxxxLOrd = document.createElement("td");
    xxxxLOrd.innerHTML = commemorativeXXXXL + " Shirts";
    commemorativeRow.appendChild(xxxxLOrd);
    
    var ordTotal = document.createElement("td");
    ordTotal.innerHTML = commemorativeTotal + " Shirts";
    commemorativeRow.appendChild(ordTotal);
    
    sbl.appendChild(commemorativeRow);
};

var renderTotalShirtRow = function(stbl){
    var totalRow = document.createElement("tr");
    
    var childName = document.createElement("td");
    childName.innerHTML = "Total";
    totalRow.appendChild(childName);
    
    var smallOrd = document.createElement("td");
    smallOrd.innerHTML = smallShirtTotal + " Shirts";
    totalRow.appendChild(smallOrd);
    
    var mediumOrd = document.createElement("td");
    mediumOrd.innerHTML = mediumShirtTotal + " Shirts";
    totalRow.appendChild(mediumOrd);
    
    var largeOrd = document.createElement("td");
    largeOrd.innerHTML = lgShirtTotal + " Shirts";
    totalRow.appendChild(largeOrd);
    
    var xLOrd = document.createElement("td");
    xLOrd.innerHTML = xLGShirtTotal + " Shirts";
    totalRow.appendChild(xLOrd);

    var xxLOrd = document.createElement("td");
    xxLOrd.innerHTML = doubXLShirtTotal + " Shirts";
    totalRow.appendChild(xxLOrd);
    
    var xxxLOrd = document.createElement("td");
    xxxLOrd.innerHTML = tripXLShirtTotal + " Shirts";
    totalRow.appendChild(xxxLOrd);
    
    var xxxxLOrd = document.createElement("td");
    xxxxLOrd.innerHTML = quadXLShirtTotal + " Shirts";
    totalRow.appendChild(xxxxLOrd);
    
    var ordTotal = document.createElement("td");
    ordTotal.innerHTML = shirtTotal + " Shirts";
    totalRow.appendChild(ordTotal);
    
    stbl.appendChild(totalRow);
};

var shirtStart = function(){
    getAdmUser();
    renderShirtOrderHeader();
    getShirtCount();
};

document.addEventListener('DOMContentLoaded',shirtStart);