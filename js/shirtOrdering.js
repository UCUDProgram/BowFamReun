var shrFirst ="";
var shrLast = "";
var shrAddress = "";
var shrCity = "";
var shrState = "";
var shrZip = "";
var shrEmail = "";
var shrPh = "";
var shirtSmall = 0;
var shirtMedium = 0;
var shirtLarge = 0;
var shirtXL = 0;
var shirtXXL = 0;
var shirtXXXL = 0;
var shirtXXXXL = 0;
var DB = new Firebase("https://bowmanfamreun.firebaseio.com/");


var setFirst = function(fN){
    shrFirst = fN;
};

var setLast = function(lN){
  shrLast = lN;  
};

var setAdd = function(ad){
  shrAddress = ad;  
};

var setCy = function(cy){
    shrCity = cy;
};

var setSt = function(st){
    shrState = st;
};

var setZp = function(zi){
    shrZip = zi;
};

var setPh = function(ph){
  shrPh = ph;  
};

var setEm = function(ema){
    shrEmail = ema;
};

var setSmallOrder = function(sOrd){
  shirtSmall = sOrd;  
};

var setMedOrder = function(mOrd){
  shirtMedium = mOrd;  
};

var setLargeOrder = function(lgOrd){
  shirtLarge = lgOrd;  
};

var setXLOrder = function(xlgOrd){
  shirtXL = xlgOrd;  
};

var setXXLOrder = function(xxlOrd){
  shirtXXL = xxlOrd;  
};

var setXXXLOrder = function(xxxlOrd){
  shirtXXXL = xxxlOrd;  
};

var setXXXXLOrder = function(xxxxlOrd){
  shirtXXXXL = xxxxlOrd;  
};

var pushNewShirtOrder = function(){
    var shirtOrder = DB.child("ShirtOrder");
    shirtOrder.push().set({firstName:shrFirst,
                           lastName: shrLast,
                           addr: shrAddress,
                           city: shrCity,
                           state: shrState,
                           zip: shrZip,
                           phone: shrPh,
                           email: shrEmail,
                           SmallShirt: shirtSmall,
                           MedShirt: shirtMedium,
                           LgShirt: shirtLarge,
                           XLShirt: shirtXL,
                           XXLShirt:shirtXXL,
                           XXXLShirt:shirtXXXL,
                           XXXXLShirt: shirtXXXXL
    });
};

var setShirtOrder = function(){
    var sa = document.getElementById("sSmallOrd").value;
    setSmallOrder(+sa);
    var me = document.getElementById("sMediumOrd").value;
    setMedOrder(+me);
    var la = document.getElementById("sLargeOrd").value;
    setLargeOrder(+la);
    var xla = document.getElementById("sXlargeOrd").value;
    setXLOrder(+xla);
    var xxla = document.getElementById("sDoubXXLOrd").value;
    setXXLOrder(+xxla);
    var xxxla = document.getElementById("sTripXLOrd").value;
    setXXXLOrder(+xxxla);
    var xxxxla = document.getElementById("sQuadXLOrd").value;
    setXXXXLOrder(+xxxxla);
};

var resetPageTextFields = function(){
    document.getElementById("sFName").value
    document.getElementById("sLName").value
    document.getElementById("sMailAddr").value
    document.getElementById("sCity").value
    document.getElementById("sState").value
    document.getElementById("sZip").value
    document.getElementById("sPhone").value;
    document.getElementById("sEmail").value;
    
  document.getElementById("sSmallOrd").selectedIndex = 0;
  document.getElementById("sMediumOrd").selectedIndex = 0;
  document.getElementById("sLargeOrd").selectedIndex = 0;
  document.getElementById("sXlargeOrd").selectedIndex = 0;
  document.getElementById("sDoubXXLOrd").selectedIndex = 0;
  document.getElementById("sTripXLOrd").selectedIndex = 0;
  document.getElementById("sQuadXLOrd").selectedIndex = 0;
};


//  RENDERING THE SCREEN (VIEW)
var renderShirtOrderingScreen = function(){
    renderHeader();
    renderOrderInfo();
    renderPersonOrderInfo();
    renderPersonShirtOrder();
    renderOrderButtons();
};

var renderHeader = function(){
    var sorc = document.getElementById("orderHeader");
    var shrHead = document.createElement("h1");
    shrHead.innerHTML = "T-Shirt Ordering";
    sorc.appendChild(shrHead);
};

var renderOrderInfo = function(){
    var souc = document.getElementById("orderInfo");
    var shrNews = document.createElement("h3");
    shrNews.innerHTML = "Shirts are limited.  If you would like to order a shirt, place a request below";
    souc.appendChild(shrNews);
    
    var shrNewsInf = document.createElement("h3");
    shrNewsInf.innerHTML = "Shirts will be ordered and shipped after payment has been received";
    souc.appendChild(shrNewsInf);
    
    var shrOrdCost = document.createElement("div");
    var shrOrdOrigCost = document.createElement("h3");
    shrOrdOrigCost.innerHTML = "Shirts from Small to XXL will cost $15 per shirt.";
    shrOrdCost.appendChild(shrOrdOrigCost);
    
    var shrOrdBigCost = document.createElement("h3");
    shrOrdBigCost.innerHTML = "Triple & Quad Large Shirts will cost $20 per shirt.";
    shrOrdCost.appendChild(shrOrdBigCost);
    souc.appendChild(shrOrdCost);
};

var renderPersonOrderInfo = function(){
    var shirtInf = document.getElementById("orderContact");
    
     var shirtNameDiv = document.createElement("div");
    renderShirtFirstName(shirtNameDiv);
    renderShirtLastName(shirtNameDiv);
    shirtInf.appendChild(shirtNameDiv);
    var shirtAddressDiv = document.createElement("div");
    renderShirtAddress(shirtAddressDiv);
    shirtInf.appendChild(shirtAddressDiv);
    var shirtContactDiv = document.createElement("div");
    renderShirtPhone(shirtContactDiv);
    renderShirtEmail(shirtContactDiv);
    shirtInf.appendChild(shirtContactDiv);
};

var renderShirtFirstName = function(naD){
    var fNamediv = document.createElement("div");
    fNamediv.classList.add("individual_block_first");
  
    var fnameLab = document.createElement("label");
    fnameLab.setAttribute("for", "sFName");
    fnameLab.innerHTML = "First Name: ";
    fNamediv.appendChild(fnameLab);
  
    var fnameIpt = document.createElement("input");
    fnameIpt.setAttribute("type", "text");
    fnameIpt.setAttribute("id", "sFName");
    fnameIpt.addEventListener("blur", function(ev){
        var sFir =document.getElementById("sFName").value;
        setFirst(sFir);
    });
    fNamediv.appendChild(fnameIpt);
    naD.appendChild(fNamediv);
};

var renderShirtLastName = function(nD){
    var lNamediv = document.createElement("div");
    lNamediv.classList.add("individual_block");
  
    var lnameLab = document.createElement("label");
    lnameLab.setAttribute("for", "sLName");
    lnameLab.innerHTML = "Last Name: ";
    lNamediv.appendChild(lnameLab);
  
    var lnameIpt = document.createElement("input");
    lnameIpt.setAttribute("type", "text");
    lnameIpt.setAttribute("id", "sLName");
    lnameIpt.addEventListener("blur", function(ev){
        var sLas = document.getElementById("sLName").value;
        setLast(sLas);
    });
    lNamediv.appendChild(lnameIpt);
  
    nD.appendChild(lNamediv);
};

var renderShirtAddress = function(atttaD){
    renderShirtAddr(atttaD);
    var addrL2 = document.createElement("div");
    renderShirtCity(addrL2);
    renderShirtState(addrL2);
    renderShirtZip(addrL2);
    atttaD.appendChild(addrL2);
};

var renderShirtAddr = function(mD){
    var mailAddDiv = document.createElement("div");
    var mailAddrLbl = document.createElement("label");
    mailAddrLbl.setAttribute("for", "sMailAddr");
    mailAddrLbl.innerHTML = "Address: ";
    mailAddDiv.appendChild(mailAddrLbl);
  
    var mailAddrIpt = document.createElement("input");
    mailAddrIpt.setAttribute("type", "text");
    mailAddrIpt.setAttribute("id", "sMailAddr");
    mailAddrIpt.addEventListener("blur", function(ev){
        var maAdd = document.getElementById("sMailAddr").value;
        setAdd(maAdd);
    });
  
    mailAddDiv.appendChild(mailAddrIpt);
    mD.appendChild(mailAddDiv);
};

var renderShirtCity = function(sDi){
    var mailCitydiv = document.createElement("div");
    mailCitydiv.classList.add("individual_block_first");
  
    var mailCityLab = document.createElement("label");
    mailCityLab.setAttribute("for", "sCity");
    mailCityLab.innerHTML = "City: ";
    mailCitydiv.appendChild(mailCityLab);
  
    var mailCityIpt = document.createElement("input");
    mailCityIpt.setAttribute("type", "text");
    mailCityIpt.setAttribute("id", "sCity");
    mailCityIpt.addEventListener("blur", function(ev){
        var maCi = document.getElementById("sCity").value;
        setCy(maCi);
    });
    mailCitydiv.appendChild(mailCityIpt);
    sDi.appendChild(mailCitydiv);
};

var renderShirtState = function(sD){
    var mailStatediv = document.createElement("div");
    mailStatediv.classList.add("individual_block");
  
    var mailStateLab = document.createElement("label");
    mailStateLab.setAttribute("for", "sState");
    mailStateLab.innerHTML = "State: ";
    mailStatediv.appendChild(mailStateLab);
  
    var mailStateIpt = document.createElement("input");
    mailStateIpt.setAttribute("type", "text");
    mailStateIpt.setAttribute("size","7");
    mailStateIpt.setAttribute("id", "sState");
    mailStateIpt.addEventListener("blur", function(ev){
        var maSt = document.getElementById("sState").value;
        setSt(maSt);
    });
    mailStatediv.appendChild(mailStateIpt);
    sD.appendChild(mailStatediv);
};

var renderShirtZip = function(sDiv){
    var mailZipdiv = document.createElement("div");
    mailZipdiv.classList.add("individual_block");
  
    var mailZipLab = document.createElement("label");
    mailZipLab.setAttribute("for", "sZip");
    mailZipLab.innerHTML = "ZipCode: ";
    mailZipdiv.appendChild(mailZipLab);
  
    var mailZipIpt = document.createElement("input");
    mailZipIpt.setAttribute("type", "text");
    mailZipIpt.setAttribute("size","9");
    mailZipIpt.setAttribute("id", "sZip");
    mailZipIpt.addEventListener("blur", function(ev){
        var sZp = document.getElementById("sZip").value;
        setZp(sZp);
    });
    mailZipdiv.appendChild(mailZipIpt);
    sDiv.appendChild(mailZipdiv);
};

var renderShirtPhone = function(shD){
  var mailPhonediv = document.createElement("div");
    mailPhonediv.classList.add("individual_block_first");
  
    var mailPhoneLab = document.createElement("label");
    mailPhoneLab.setAttribute("for", "sPhone");
    mailPhoneLab.innerHTML = "Phone Number: ";
    mailPhonediv.appendChild(mailPhoneLab);
  
    var mailPhoneIpt = document.createElement("input");
    mailPhoneIpt.setAttribute("type", "text");
    mailPhoneIpt.setAttribute("id", "sPhone");
    mailPhoneIpt.addEventListener("blur", function(ev){
        var sPh = document.getElementById("sPhone").value;
        setPh(sPh);
    });
    mailPhonediv.appendChild(mailPhoneIpt);
    shD.appendChild(mailPhonediv);  
};

var renderShirtEmail = function(shDi){
    var mailEmaildiv = document.createElement("div");
    mailEmaildiv.classList.add("individual_block");
  
    var mailEmailLab = document.createElement("label");
    mailEmailLab.setAttribute("for", "sEmail");
    mailEmailLab.innerHTML = "Email Address: ";
    mailEmaildiv.appendChild(mailEmailLab);
  
    var mailEmailIpt = document.createElement("input");
    mailEmailIpt.setAttribute("type", "email");
    mailEmailIpt.setAttribute("id", "sEmail");
    mailEmailIpt.addEventListener("blur", function(ev){
        var sEm = document.getElementById("sEmail").value;
        setEm(sEm);
    });
    mailEmaildiv.appendChild(mailEmailIpt);
    shDi.appendChild(mailEmaildiv);
};

var renderPersonShirtOrder = function(){
    var souce = document.getElementById("orderShirtQuantity");
    
    var shtHead = document.createElement("h2");
  shtHead.innerHTML = "TShirt Ordering";
  souce.appendChild(shtHead);
  
  renderMemSmall(souce);
  renderMemMed(souce);
  renderMemLg(souce);
  renderMemXL(souce);
  renderMem2XL(souce);
  renderMem3XL(souce);
  renderMem4XL(souce);
};

var renderMemSmall = function(attaDv){
     var $smallDiv = document.createElement("div");
    $smallDiv.classList.add("individual_block_first");
    $smallDiv.setAttribute("id", "smallShirtDiv");
  var $smallShirtLabel = document.createElement("div");
  $smallShirtLabel.setAttribute("id", "shirtsmall");
  $smallShirtLabel.innerHTML = "Small";
  $smallDiv.appendChild($smallShirtLabel);
    
   var $selection = document.createElement("select");
    $selection.setAttribute("name","sSmallOrder");
    $selection.setAttribute("id","sSmallOrd");
    for(var i =0; i<11;i++){
        var $iOption = document.createElement("option");
        $iOption.setAttribute("value",i);
        var itemId = i + "Option";
        $iOption.setAttribute("id", itemId);
        $iOption.innerHTML = i;
        $selection.appendChild($iOption);
    }
    $smallDiv.appendChild($selection);
    attaDv.appendChild($smallDiv);
};

var renderMemMed = function(attacDv){
    var $mediumDiv = document.createElement("div");
    $mediumDiv.classList.add("individual_block");
  var $mediumShirtLabel = document.createElement("div");
  $mediumShirtLabel.setAttribute("id", "sMediumShirt");
  $mediumShirtLabel.innerHTML = "Medium";
  $mediumDiv.appendChild($mediumShirtLabel);
    
   var $mediumselection = document.createElement("select");
    $mediumselection.setAttribute("name","sMediumOrder");
    $mediumselection.setAttribute("id","sMediumOrd");
    for(var i =0; i<11;i++){
        var $iOption = document.createElement("option");
        $iOption.setAttribute("value",i);
        var itemId = i + "Option";
        $iOption.setAttribute("id", itemId);
        $iOption.innerHTML = i;
        $mediumselection.appendChild($iOption);
    }
    $mediumDiv.appendChild($mediumselection);
    attacDv.appendChild($mediumDiv);
};

var renderMemLg = function(attachDv){
    var $largeDiv = document.createElement("div");
    $largeDiv.classList.add("individual_block");
    
  var $largeShirtLabel = document.createElement("div");
  $largeShirtLabel.setAttribute("id", "largeShirt");
  $largeShirtLabel.innerHTML = "Large";
  $largeDiv.appendChild($largeShirtLabel);
    
   var $largeselection = document.createElement("select");
    $largeselection.setAttribute("name","largeOrder");
    $largeselection.setAttribute("id","sLargeOrd");
    for(var i =0; i<11;i++){
        var $iOption = document.createElement("option");
        $iOption.setAttribute("value",i);
        var itemId = i + "Option";
        $iOption.setAttribute("id", itemId);
        $iOption.innerHTML = i;
        $largeselection.appendChild($iOption);
    }
    $largeDiv.appendChild($largeselection);
    attachDv.appendChild($largeDiv);
};

var renderMemXL = function(attaDiv){
      var $xlargeDiv = document.createElement("div");
    $xlargeDiv.classList.add("individual_block");
    
  var $xlargeShirtLabel = document.createElement("div");
  $xlargeShirtLabel.setAttribute("id", "xlargeShirt");
  $xlargeShirtLabel.innerHTML = "XLarge";
  $xlargeDiv.appendChild($xlargeShirtLabel);
    
   var $xlargeselection = document.createElement("select");
    $xlargeselection.setAttribute("name","xlargeOrder");
    $xlargeselection.setAttribute("id","sXlargeOrd");
    for(var i =0; i<11;i++){
        var $iOption = document.createElement("option");
        $iOption.setAttribute("value",i);
        var itemId = i + "Option";
        $iOption.setAttribute("id", itemId);
        $iOption.innerHTML = i;
        $xlargeselection.appendChild($iOption);
    }
    $xlargeDiv.appendChild($xlargeselection);
    attaDiv.appendChild($xlargeDiv);
};

var renderMem2XL = function(attacDiv){
    var $doubXXLDiv = document.createElement("div");
    $doubXXLDiv.classList.add("individual_block");
  var $doubXXLShirtLabel = document.createElement("div");
  $doubXXLShirtLabel.setAttribute("id", "doubXXLShirt");
  $doubXXLShirtLabel.innerHTML = "XXL";
  $doubXXLDiv.appendChild($doubXXLShirtLabel);
    
   var $doubXXLselection = document.createElement("select");
    $doubXXLselection.setAttribute("name","doubXXLOrder");
    $doubXXLselection.setAttribute("id","sDoubXXLOrd");
    for(var i =0; i<11;i++){
        var $iOption = document.createElement("option");
        $iOption.setAttribute("value",i);
        var itemId = i + "Option";
        $iOption.setAttribute("id", itemId);
        $iOption.innerHTML = i;
        $doubXXLselection.appendChild($iOption);
    }
    $doubXXLDiv.appendChild($doubXXLselection);
    attacDiv.appendChild($doubXXLDiv);
};

var renderMem3XL = function(ataDV){
    var $tripXLDiv = document.createElement("div");
    $tripXLDiv.classList.add("individual_block");
  var $tripXLShirtLabel = document.createElement("div");
  $tripXLShirtLabel.setAttribute("id", "tripXLShirt");
  $tripXLShirtLabel.innerHTML = "XXXL";
  $tripXLDiv.appendChild($tripXLShirtLabel);
    
   var $tripXLselection = document.createElement("select");
    $tripXLselection.setAttribute("name","tripXLOrder");
    $tripXLselection.setAttribute("id","sTripXLOrd");
    for(var i =0; i<11;i++){
        var $iOption = document.createElement("option");
        $iOption.setAttribute("value",i);
        var itemId = i + "Option";
        $iOption.setAttribute("id", itemId);
        $iOption.innerHTML = i;
        $tripXLselection.appendChild($iOption);
    }
    $tripXLDiv.appendChild($tripXLselection);
    ataDV.appendChild($tripXLDiv);
};

var renderMem4XL = function(ataDiv){
    var $quadXLDiv = document.createElement("div");
    $quadXLDiv.classList.add("individual_block");
  var $quadXLShirtLabel = document.createElement("div");
  $quadXLShirtLabel.setAttribute("id", "quadXLShirt");
  $quadXLShirtLabel.innerHTML = "XXXXL";
  $quadXLDiv.appendChild($quadXLShirtLabel);
    
   var $quadXLselection = document.createElement("select");
    $quadXLselection.setAttribute("name","quadXLOrder");
    $quadXLselection.setAttribute("id","sQuadXLOrd");
    for(var i =0; i<11;i++){
        var $iOption = document.createElement("option");
        $iOption.setAttribute("value",i);
        var itemId = i + "Option";
        $iOption.setAttribute("id", itemId);
        $iOption.innerHTML = i;
        $quadXLselection.appendChild($iOption);
    }
    $quadXLDiv.appendChild($quadXLselection);
    ataDiv.appendChild($quadXLDiv);
};

var renderOrderButtons = function(){
    var surce = document.getElementById("orderButtons");
    var submitMember = document.createElement("button");
    submitMember.setAttribute("type", "button");
    submitMember.setAttribute("id", "memSubmit");
    submitMember.innerHTML = "Submit Your Shirt Order";
    submitMember.addEventListener("click", function(ev){
        var firNam = document.getElementById("sFName").value;
        var lasNam = document.getElementById("sLName").value;
        var regisName = firNam.concat(" ").concat(lasNam);
        alert("You have registered your TShirt Order " + regisName);
        setShirtOrder();
        pushNewShirtOrder();
        resetPageTextFields();
    });
    surce.appendChild(submitMember);
    
};

var shirtOrderingStart = function(){
    // clearData();
    renderShirtOrderingScreen();
};

document.addEventListener('DOMContentLoaded',shirtOrderingStart);