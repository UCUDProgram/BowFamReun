var raffStart = 0;
var raffEnd = 0;
var prizeName = "";
var winningNum = 0;
var prizeNumber = 0;
var exclusionNumbers = [];
var possibleNumbers = [];
var DB = new Firebase("https://bowmanfamreun.firebaseio.com/");

var clarStrData = function(){
    localStorage.clear();  
};
// var prizeDB = new Firebase("https://bowmanfamreun.firebaseio.com/Prizes");

//   console.log(exclusionNumbers);
//   exclusionNumbers.forEach(function (aNum){
//       var index_of_Number = exclusionNumbers.indexOf(aNum);
//       console.log(index_of_Number);
//       exclusionNumbers.splice(index_of_Number, 1);
//   });  
// var st = raffStart;
    // var ed = raffEnd;
     //   console.log(i);
     //   console.log(number_index);
     //   console.log(possibleNumbers);


var setRaffStart = function(rStart){
    raffStart = rStart;  
};

var setRaffEnd = function(rEnd){
    raffEnd = rEnd;  
};

var setWinningNumber = function(wNum){
    winningNum = wNum;    
};

var setPrizeName = function(prizeNam){
    prizeName = prizeNam;  
};

var setPrizeNumber = function(pNumbe){
    prizeNumber = pNumbe;    
};

var updateExclusionNumbers = function(rNum){
    exclusionNumbers.push(rNum);
};

var updatePossibleNumbers = function(posNum){
    possibleNumbers.push(posNum);
};

var clearExclusionNumbers = function(){
    exclusionNumbers.splice(0,exclusionNumbers.length);
};

var clearPossibleNumbers = function(){
    possibleNumbers.splice(0, possibleNumbers.length);  
};

var pushPrizeData = function(){
    var prizeData = DB.child("Prizes");
    prizeData.push().set({prizeName:prizeName,
                          prizeWinNumber: prizeNumber});
};

var setWinNumberOptions = function(){
    for(var i= raffStart; i <= raffEnd; i++){
        var number_index = exclusionNumbers.indexOf(i);
        if (number_index == -1){
            updatePossibleNumbers(+i);
        }
    }
}; 

var getWinningNumber = function(){
    var keyNumber = Math.floor(Math.random() * possibleNumbers.length);
    var winNum = possibleNumbers[keyNumber];
    setWinningNumber(winNum);
};

var getRaffleWinners = function(){
    var prizeDB = DB.child("Prizes");
    prizeDB.orderByKey().on("value", function(snapshot){
        snapshot.forEach(function(childSnapshot){
            var prize = childSnapshot.val().prizeName;
            var winnerTxt = childSnapshot.val().prizeWinNumber;
            console.log(prize);
            if(prize != undefined && winnerTxt != undefined)
                renderPastWinners(prize, winnerTxt);
        });
    });
};

// RENDERING THE SCREEN (VIEW)
var showRafflePage = function(){
    raffleHeader();
    raffleOptions();
    renderExemptList();
    renderPrizeList();
    renderGenWinNum();
    renderRaffleWinners();
};

var raffleHeader = function(){
    var rHead = document.getElementById("raffHead");
    var rafHd = document.createElement("h1");
    rafHd.innerHTML = "Raffle";
    rHead.appendChild(rafHd);
};

var raffleOptions = function(){
    var rafOpt = document.getElementById("raffOptions");
    renderRafStart(rafOpt);
    renderRafEnd(rafOpt);
};

var renderRafStart =function(rafD){
     var rafStartdiv = document.createElement("div");
    rafStartdiv.classList.add("individual_block_first");
  
    var rafStartLab = document.createElement("label");
    rafStartLab.setAttribute("for", "refStart");
    rafStartLab.innerHTML = "Raffle Starting Number: ";
    rafStartdiv.appendChild(rafStartLab);
  
    var rafStartIpt = document.createElement("input");
    rafStartIpt.setAttribute("type", "text");
    rafStartIpt.setAttribute("id", "refStart");
    rafStartIpt.addEventListener("blur", function(ev){
       var star = document.getElementById("refStart").value;
       setRaffStart(star);
    });
    rafStartdiv.appendChild(rafStartIpt);
    rafD.appendChild(rafStartdiv);
};

var renderRafEnd = function(rafDi){
    var rafEnddiv = document.createElement("div");
    rafEnddiv.classList.add("individual_block");
  
    var rafEndLab = document.createElement("label");
    rafEndLab.setAttribute("for", "refEnd");
    rafEndLab.innerHTML = "Raffle Ending Number: ";
    rafEnddiv.appendChild(rafEndLab);
  
    var rafEndIpt = document.createElement("input");
    rafEndIpt.setAttribute("type", "text");
    rafEndIpt.setAttribute("id", "refEnd");
    rafEndIpt.addEventListener("blur", function(ev){
        var en = document.getElementById("refEnd").value;
        setRaffEnd(en);
    });
    rafEnddiv.appendChild(rafEndIpt);
    rafDi.appendChild(rafEnddiv);
};

var renderRafExempt = function(rafDiv){
    var rafExemptdiv = document.createElement("div");
    rafExemptdiv.classList.add("individual_block_first");
  
    var rafExemptLab = document.createElement("label");
    rafExemptLab.setAttribute("for", "refExempt");
    rafExemptLab.innerHTML = "Raffle Numbers to Exempt: ";
    rafExemptdiv.appendChild(rafExemptLab);
  
    var rafExemptIpt = document.createElement("input");
    rafExemptIpt.setAttribute("type", "text");
    rafExemptIpt.setAttribute("id", "refExempt");
    rafExemptdiv.appendChild(rafExemptIpt);
    rafDiv.appendChild(rafExemptdiv);
};

var renderRafExemptBtn = function(raffDv){
    var exemDiv = document.createElement("div");
    exemDiv.classList.add("individual_block");
    var exemptBut = document.createElement("button");
    exemptBut.setAttribute("type", "button");
    exemptBut.setAttribute("id", "rafExemptBtn");
    exemptBut.innerHTML = "Remove this number";
    exemptBut.addEventListener("click", function(ev){
        var exemNum = +document.getElementById("refExempt").value;
        updateExclusionNumbers(exemNum);
        exemptNumberListChange();
    });
    exemDiv.appendChild(exemptBut);
    raffDv.appendChild(exemDiv);
};

var renderExemptList = function(){
    var rafExDiv = document.getElementById("raffExempt");
    renderRafExempt(rafExDiv);
    renderRafExemptBtn(rafExDiv);
    renderExemptNumber(rafExDiv);
};

var exemptNumberListChange = function(){
    var clrDv = document.getElementById("raffExempt");
    while (clrDv.firstChild)
        clrDv.removeChild(clrDv.firstChild);
    renderExemptList();
};

var renderExemptNumber = function(raD){
    var eDiv = document.createElement("div");
    if (exclusionNumbers.length == 0){
        var noExcl = document.createElement("div");
        noExcl.classList.add("individual_block");
        noExcl.innerHTML = "No Numbers are being excluded";
        eDiv.appendChild(noExcl);
    } else {
        exclusionNumbers.forEach(function (aN){
            var aDi = document.createElement("div");
            aDi.classList.add("individual_block");
            aDi.innerHTML = aN;
            eDiv.appendChild(aDi);
        });
    }
    raD.appendChild(eDiv);
};

var renderGenWinNum = function(){
    var genDiv = document.getElementById("generateWinNum");
    
    var genNumBut = document.createElement("button");
    genNumBut.setAttribute("type", "button");
    genNumBut.setAttribute("id", "genNumButton");
    genNumBut.innerHTML = "Generate Winning Number";
    genNumBut.addEventListener("click", function(ev){
        setWinNumberOptions();
        getWinningNumber();
        renderWinningNumber();
    });
    genDiv.appendChild(genNumBut);
};

var renderWinningNumber = function(){
    var winDv = document.getElementById("winningRaffleNumber");
    while (winDv.firstChild)
        winDv.removeChild(winDv.firstChild);
    var winSrc = document.createElement("div");
    winSrc.classList.add("individual_block_first");
    winSrc.innerHTML = "Winning Raffle Number is: ";
    winDv.appendChild(winSrc);
    
    var winN = document.createElement("div");
    winN.classList.add("individual_block");
    winN.innerHTML = winningNum;
    winDv.appendChild(winN);
};

var renderPrizeList = function(){
    var przLst = document.getElementById("prizeSubmission");
    renderPrize(przLst);
    renderWinNum(przLst);
    renderPrizeSubmit(przLst);
};

var renderPrize = function(przDv){
    var prizediv = document.createElement("div");
    prizediv.classList.add("individual_block_first");
  
    var prizeLab = document.createElement("label");
    prizeLab.setAttribute("for", "prize");
    prizeLab.innerHTML = "Prize: ";
    prizediv.appendChild(prizeLab);
  
    var prizeIpt = document.createElement("input");
    prizeIpt.setAttribute("type", "text");
    prizeIpt.setAttribute("id", "prize");
    prizeIpt.addEventListener("blur", function(ev){
        var prz = document.getElementById("prize").value;
        setPrizeName(prz);
    });
    prizediv.appendChild(prizeIpt);
    przDv.appendChild(prizediv);
};

var renderWinNum = function(przDi){
    var windiv = document.createElement("div");
    windiv.classList.add("individual_block");
  
    var winLab = document.createElement("label");
    winLab.setAttribute("for", "winNum");
    winLab.innerHTML = "Winning Number: ";
    windiv.appendChild(winLab);
  
    var winIpt = document.createElement("input");
    winIpt.setAttribute("type", "text");
    winIpt.setAttribute("id", "winNum");
    winIpt.addEventListener("blur", function(ev){
        var przNm = document.getElementById("winNum").value;
        setPrizeNumber(przNm);
    });
    windiv.appendChild(winIpt);
    przDi.appendChild(windiv);
};

var resetRafflePage = function(){
    document.getElementById("refStart").value = "";
    document.getElementById("refEnd").value = "";
    document.getElementById("refExempt").value = "";
    document.getElementById("prize").value = "";
    document.getElementById("winNum").value = "";
    clearExclusionNumbers();
    exemptNumberListChange();
    clearPossibleNumbers();
    var prizeLst = document.getElementById("raffWinners");
    while (prizeLst.firstChild)
        prizeLst.removeChild(prizeLst.firstChild);
        
    var winRaf = document.getElementById("winningRaffleNumber");
    while(winRaf.firstChild)
        winRaf.removeChild(winRaf.firstChild);
    
    renderRaffleWinners();
};

var renderPrizeSubmit = function(prDi){
    var prDiv = document.createElement("div");
    // prDiv.classList.add("individual_block_first");
    var prizeSubmitBut = document.createElement("button");
    prizeSubmitBut.setAttribute("type", "button");
    prizeSubmitBut.setAttribute("id", "prizeSubmit");
    prizeSubmitBut.innerHTML = "Submit this winning Prize";
    prizeSubmitBut.addEventListener("click", function(ev){
        pushPrizeData();
        resetRafflePage();
    });
    prDiv.appendChild(prizeSubmitBut);
    prDi.appendChild(prDiv);
};

var renderRaffleWinners = function(){
    renderRaffleWinHead();
    getRaffleWinners();
};

var renderRaffleWinHead = function(){
    var rafWinHd = document.getElementById("raffWinners");
    var rafTitl = document.createElement("h1");
    rafTitl.innerHTML = "Raffle Winners";
    rafWinHd.appendChild(rafTitl);
};

var renderPastWinners = function(przName, przTix){
    var rafWi = document.getElementById("raffWinners");
    var rafSrc = document.createElement("div");
    renderWinPrize(przName, rafSrc);
    renderWinTxt(przTix, rafSrc);
    rafWi.appendChild(rafSrc);
};

var renderWinPrize = function(priz,atDi){
    var przDiv = document.createElement("div");
    przDiv.classList.add("individual_block_first");
    przDiv.innerHTML = "Prize: " + priz;
    atDi.appendChild(przDiv);
};

var renderWinTxt = function(prze, atDiv){
    var winTxtDv = document.createElement("div");
    winTxtDv.classList.add("individual_block");
    winTxtDv.innerHTML = "Winning Number: " + prze;
    atDiv.appendChild(winTxtDv);
};

var raffleStart = function(){
    clarStrData();
    showRafflePage();  
};

document.addEventListener('DOMContentLoaded', raffleStart);