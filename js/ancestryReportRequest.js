var first = "";
var last = "";
var reportOrig = "";
var reportGen = "";
var mailName = "";
var mailAddress = "";
var mailCity = "";
var mailState = "";
var mailZip = "";
var emailName = "";
var emailAddress = "";
var mailOnly = false;
var emailOnly = false;
var pickupOnly = false;
var emptyValue = "N/A";
var DB = new Firebase("https://bowmanfamreun.firebaseio.com/");

var setFirst = function(firNm){
    first = firNm;  
};

var setLast = function(lasNm){
    last = lasNm;  
};

var setReportOrig = function(start){
    reportOrig = start;  
};

var setReportGeneration = function(gen){
    reportGen = gen;  
};

var setMailName = function(mName){
    mailName = mName;
};

var setMailAddress = function(mAddress){
    mailAddress = mAddress;  
};

var setMailCity = function(mCity){
    mailCity = mCity;  
};

var setMailState = function(mState){
    mailState = mState;  
};

var setMailZip = function(mZip){
    mailZip = mZip;  
};

var setEmailName = function(eName){
    emailName = eName;  
};

var setEmailAddress = function(eAddress){
    emailAddress = eAddress;  
};

var mailOnlyReport = function(){
    setEmailName(emptyValue);
    setEmailAddress(emptyValue);
    mailOnly = true;
    emailOnly = false;
    pickupOnly = false;
};

var emailOnlyReport = function(){
    setMailName(emptyValue);
    setMailAddress(emptyValue);
    setMailCity(emptyValue);
    setMailState(emptyValue);
    setMailZip(emptyValue);
    mailOnly = false;
    emailOnly = true;
    pickupOnly = false;
};

var bothReport = function(){
    mailOnly = true;
    emailOnly = true;
    pickupOnly = false;
};

var pickupReport = function(){
    setMailName(emptyValue);
    setMailAddress(emptyValue);
    setMailCity(emptyValue);
    setMailState(emptyValue);
    setMailZip(emptyValue);
    setEmailName(emptyValue);
    setEmailAddress(emptyValue);
    mailOnly = false;
    emailOnly = false;
    pickupOnly = true;
};

var pushReportOrder = function(){
    var repData = DB.child("AncestryRpt");
    repData.push().set({firstName:first,
                        lastName:last,
                        rptName:reportOrig,
                        rptGen:reportGen,
                        mailName:mailName,
                        mailAddress:mailAddress,
                        mailCity:mailCity,
                        mailState:mailState,
                        mailZip:mailZip,
                        emailName:emailName,
                        emailAddress:emailAddress,
                        mailPick:mailOnly,
                        emailPick:emailOnly,
                        pickup:pickupOnly});
};

var resetScreen = function(){
    document.getElementById("yourFName").value = "";
    document.getElementById("yourLName").value = "";
    document.getElementById("rptSt").value = "";
    document.getElementById("rptGen").value = "";
    document.getElementById("mailN").value = "";
    document.getElementById("mailA").value = "";
    document.getElementById("mailC").value = "";
    document.getElementById("mailS").value = "";
    document.getElementById("mailZ").value = "";
    document.getElementById("emailN").value = "";
    document.getElementById("emailAdd").value = "";
    mailOnly = false;
    emailOnly = false;
    pickupOnly = false;
};

var registerSubmission = function(){
    resetScreen();
    alert("Thank You for submitting an ancestry Report.");
};

// RENDERING THE SCREEN
var renderReportHead = function(){
    var rptHd = document.getElementById("reportHeader");
    var rptTitle = document.createElement("h1");
    rptTitle.innerHTML = "Ancestry Report Request";
    rptHd.appendChild(rptTitle);
};

var renderExplanation = function(){
    var expDv = document.getElementById("reportExplain");
    reportExp(expDv);
    nameExplain(expDv);
    rptStartExplain(expDv);
    rptGenExplain(expDv);
    rptDeliveryExplain(expDv);
};

var reportExp = function(exDv){
    var repEx = document.createElement("h2");
    repEx.innerHTML = "This report gives an ancestry breakdown of a person going backward a specified number of generations.";
    exDv.appendChild(repEx);
};

var nameExplain = function(expD){
    var nmExp = document.createElement("h3");
    nmExp.innerHTML = "Enter your First & Last name to indicate who is making a report Request";
    expD.appendChild(nmExp);
};

var rptStartExplain = function(eD){
    var startExp = document.createElement("h3");
    startExp.innerHTML = "Indicate who you want to generate the report on, in the Person start report area.";
    eD.appendChild(startExp);
};

var rptGenExplain = function(exDi){
    var genExp = document.createElement("h3");
    genExp.innerHTML = "Indicate, in the generations section, the number of generations (Between 1 & 12, inclusively) to create a report on";
    exDi.appendChild(genExp);
};

var rptDeliveryExplain = function(expDi){
    var delExp = document.createElement("h3");
    delExp.innerHTML = "The report can be sent to you via email, mail or both";
    expDi.appendChild(delExp);
};

var renderReportOrder = function(){
    var rptOrd = document.getElementById("reportOrder");
    rptOrd.classList.add("reportPad");
    renderOrderName(rptOrd);
    renderAncestStart(rptOrd);
};

var renderOrderName = function(attach){
    var namDv = document.createElement("div");
    renderFirstName(namDv);
    renderLastName(namDv);
    attach.appendChild(namDv);
};

var renderFirstName = function(nameDiv){
    var ancestFNamediv = document.createElement("div");
    ancestFNamediv.classList.add("individual_block_first");
  
    var fnameLab = document.createElement("label");
    fnameLab.setAttribute("for", "yourFName");
    fnameLab.innerHTML = "First Name: ";
    ancestFNamediv.appendChild(fnameLab);
  
    var fnameIpt = document.createElement("input");
    fnameIpt.setAttribute("type", "text");
    fnameIpt.setAttribute("id", "yourFName");
    fnameIpt.addEventListener("blur", function(ev){
        var firstN = document.getElementById("yourFName").value;
        setFirst(firstN);
    });
    ancestFNamediv.appendChild(fnameIpt);
    nameDiv.appendChild(ancestFNamediv);
};

var renderLastName = function(namDiv){
    var lNamediv = document.createElement("div");
    lNamediv.classList.add("individual_block");
  
    var lnameLab = document.createElement("label");
    lnameLab.setAttribute("for", "yourLName");
    lnameLab.innerHTML = "Last Name: ";
    lNamediv.appendChild(lnameLab);
  
    var lnameIpt = document.createElement("input");
    lnameIpt.setAttribute("type", "text");
    lnameIpt.setAttribute("id", "yourLName");
    lnameIpt.addEventListener("blur", function(ev){
        var lastN = document.getElementById("yourLName").value;
        setLast(lastN);
    });
    lNamediv.appendChild(lnameIpt);
    namDiv.appendChild(lNamediv);
};

var renderAncestStart = function(atmt){
    var ancestDiv = document.createElement("div");
    renderReportStart(ancestDiv);
    renderReportGen(ancestDiv);
    atmt.appendChild(ancestDiv);
};

var renderReportStart = function(anDv){
    var reportStartdiv = document.createElement("div");
    reportStartdiv.classList.add("individual_block");
  
    var reportStartLab = document.createElement("label");
    reportStartLab.setAttribute("for", "rptSt");
    reportStartLab.innerHTML = "Person to Start the Report: ";
    reportStartdiv.appendChild(reportStartLab);
  
    var reportStartIpt = document.createElement("input");
    reportStartIpt.setAttribute("type", "text");
    reportStartIpt.setAttribute("id", "rptSt");
    reportStartIpt.addEventListener("blur", function(ev){
        var rSt = document.getElementById("rptSt").value;
        setReportOrig(rSt);
    });
    reportStartdiv.appendChild(reportStartIpt);
    anDv.appendChild(reportStartdiv);
};

var renderReportGen = function(ancDiv){
    var reportGendiv = document.createElement("div");
    reportGendiv.classList.add("individual_block");
  
    var reportGenLab = document.createElement("label");
    reportGenLab.setAttribute("for", "rptGen");
    reportGenLab.innerHTML = "Generations: ";
    reportGendiv.appendChild(reportGenLab);
  
    var reportGenIpt = document.createElement("input");
    reportGenIpt.setAttribute("type", "text");
    reportGenIpt.setAttribute("id", "rptGen");
    reportGenIpt.addEventListener("blur", function(ev){
        var rptGn = document.getElementById("rptGen").value;
        setReportGeneration(rptGn);
    });
    reportGendiv.appendChild(reportGenIpt);
    ancDiv.appendChild(reportGendiv);
};

var renderReportOptions = function(){
    var rptOpt = document.getElementById("reportOptions");
    renderMailOption(rptOpt);
    renderEmailOption(rptOpt);
};

var renderMailOption = function(rpOp){
    var mailDv = document.createElement("div");
    mailDv.classList.add("individual_block_first");
    renderMailTitle(mailDv);
    renderMailName(mailDv);
    renderMailAddr(mailDv);
    renderMailDest(mailDv);
    rpOp.appendChild(mailDv);
};

var renderMailTitle = function(maD){
    var mTitle = document.createElement("h1");
    mTitle.innerHTML = "Mailing Information";
    maD.appendChild(mTitle);
};

var renderMailName = function(mD){
    var mailNamediv = document.createElement("div");
    // mailNamediv.classList.add("individual_block");
  
    var mailnameLab = document.createElement("label");
    mailnameLab.setAttribute("for", "mailN");
    mailnameLab.innerHTML = "Mailing Name: ";
    mailNamediv.appendChild(mailnameLab);
  
    var mailnameIpt = document.createElement("input");
    mailnameIpt.setAttribute("type", "text");
    mailnameIpt.setAttribute("id", "mailN");
    mailnameIpt.addEventListener("blur", function(ev){
        var malNam = document.getElementById("mailN").value;
        setMailName(malNam);
    });
    mailNamediv.appendChild(mailnameIpt);
    mD.appendChild(mailNamediv);
};

var renderMailAddr = function(maDi){
    var mailAddrdiv = document.createElement("div");
    // mailAddrdiv.classList.add("individual_block");
  
    var mailAddrLab = document.createElement("label");
    mailAddrLab.setAttribute("for", "mailA");
    mailAddrLab.innerHTML = "Address: ";
    mailAddrdiv.appendChild(mailAddrLab);
  
    var mailAddrIpt = document.createElement("input");
    mailAddrIpt.setAttribute("type", "text");
    mailAddrIpt.setAttribute("id", "mailA");
    mailAddrIpt.addEventListener("blur", function(ev){
        var malAdd = document.getElementById("mailA").value;
        setMailAddress(malAdd);
    });
    mailAddrdiv.appendChild(mailAddrIpt);
    maDi.appendChild(mailAddrdiv);
};

var renderMailDest = function(maiDiv){
    var destDiv = document.createElement("div");
    renderDestCity(destDiv);
    renderDestState(destDiv);
    renderDestZip(destDiv);
    maiDiv.appendChild(destDiv);
};

var renderDestCity = function(dD){
    var mailCitydiv = document.createElement("div");
    mailCitydiv.classList.add("individual_block");
  
    var mailCityLab = document.createElement("label");
    mailCityLab.setAttribute("for", "mailC");
    mailCityLab.innerHTML = "City: ";
    mailCitydiv.appendChild(mailCityLab);
  
    var mailCityIpt = document.createElement("input");
    mailCityIpt.setAttribute("type", "text");
    mailCityIpt.setAttribute("id", "mailC");
    mailCityIpt.addEventListener("blur", function(ev){
        var malCty = document.getElementById("mailC").value;
        setMailCity(malCty);
    });
    mailCitydiv.appendChild(mailCityIpt);
    dD.appendChild(mailCitydiv);
};

var renderDestState = function(deDi){
    var mailStatediv = document.createElement("div");
    mailStatediv.classList.add("individual_block");
  
    var mailStateLab = document.createElement("label");
    mailStateLab.setAttribute("for", "mailS");
    mailStateLab.innerHTML = "State: ";
    mailStatediv.appendChild(mailStateLab);
  
    var mailStateIpt = document.createElement("input");
    mailStateIpt.setAttribute("type", "text");
    mailStateIpt.setAttribute("id", "mailS");
    mailStateIpt.addEventListener("blur", function(ev){
        var malStt = document.getElementById("mailS").value;
        setMailState(malStt);
    });
    mailStatediv.appendChild(mailStateIpt);
    deDi.appendChild(mailStatediv);
};

var renderDestZip = function(desDiv){
    var mailZipdiv = document.createElement("div");
    mailZipdiv.classList.add("individual_block");
  
    var mailZipLab = document.createElement("label");
    mailZipLab.setAttribute("for", "mailZ");
    mailZipLab.innerHTML = "ZipCode: ";
    mailZipdiv.appendChild(mailZipLab);
  
    var mailZipIpt = document.createElement("input");
    mailZipIpt.setAttribute("type", "text");
    mailZipIpt.setAttribute("id", "mailZ");
    mailZipIpt.addEventListener("blur", function(ev){
        var malZip = document.getElementById("mailZ").value;
        setMailZip(malZip);
    });
    mailZipdiv.appendChild(mailZipIpt);
    desDiv.appendChild(mailZipdiv);
};

var renderEmailOption = function(repOpt){
    var emalDv = document.createElement("div");
    emalDv.classList.add("individual_block");
    renderEmailTitle(emalDv);
    renderEmailName(emalDv);
    renderEmailAddr(emalDv);
    repOpt.appendChild(emalDv);
};

var renderEmailTitle = function(emaD){
    var eTitle = document.createElement("h1");
    eTitle.innerHTML = "E-Mail Information";
    emaD.appendChild(eTitle);
};

var renderEmailName = function(emDv){
    var emailNamediv = document.createElement("div");
    // emailNamediv.classList.add("individual_block_first");
  
    var emailNameLab = document.createElement("label");
    emailNameLab.setAttribute("for", "emailN");
    emailNameLab.innerHTML = "Name to Email Report to: ";
    emailNamediv.appendChild(emailNameLab);
  
    var emailNameIpt = document.createElement("input");
    emailNameIpt.setAttribute("type", "text");
    emailNameIpt.setAttribute("id", "emailN");
    emailNameIpt.addEventListener("blur", function(ev){
        var emalNm = document.getElementById("emailN").value;
        setEmailName(emalNm);
    });
    emailNamediv.appendChild(emailNameIpt);
    emDv.appendChild(emailNamediv);
};

var renderEmailAddr = function(emlDv){
    var emailAddrdiv = document.createElement("div");
    // emailAddrdiv.classList.add("individual_block");
  
    var emailAddrLab = document.createElement("label");
    emailAddrLab.setAttribute("for", "emailAdd");
    emailAddrLab.innerHTML = "Email Address to email Report to: ";
    emailAddrdiv.appendChild(emailAddrLab);
  
    var emailAddrIpt = document.createElement("input");
    emailAddrIpt.setAttribute("type", "text");
    emailAddrIpt.setAttribute("id", "emailAdd");
    emailAddrIpt.addEventListener("blur", function(ev){
        var emalAd = document.getElementById("emailAdd").value;
        setEmailAddress(emalAd);
    });
    emailAddrdiv.appendChild(emailAddrIpt);
    emlDv.appendChild(emailAddrdiv);
};

var renderReportSelection = function(){
    var rptSel = document.getElementById("reportSelection");
    rptSel.classList.add("buttonPad");
    renderMailOrderOption(rptSel);
    renderEmailOrderOption(rptSel);
    renderBothOrderOption(rptSel);
    // renderPickupOrderOption(rptSel);
};

var renderMailOrderOption = function(attmen){
    var mailDiv = document.createElement("div");
    mailDiv.classList.add("individual_block_first");
    var mailOrder = document.createElement("button");
    mailOrder.setAttribute("type", "button");
    mailOrder.setAttribute("id", "mailOrderSubmit");
    mailOrder.innerHTML = "Mail my Order";
    mailOrder.addEventListener("click", function(ev){
        mailOnlyReport();
        pushReportOrder();
        registerSubmission();
    });
    mailDiv.appendChild(mailOrder);
    attmen.appendChild(mailDiv);
};

var renderEmailOrderOption = function(attament){
    var emailDiv = document.createElement("div");
    emailDiv.classList.add("individual_block");
    var emailOrder = document.createElement("button");
    emailOrder.setAttribute("type", "button");
    emailOrder.setAttribute("id", "emailOrderSubmit");
    emailOrder.innerHTML = "Email my order";
    emailOrder.addEventListener("click", function(ev){
        emailOnlyReport();
        pushReportOrder();
        registerSubmission();
    });
    emailDiv.appendChild(emailOrder);
    attament.appendChild(emailDiv);
};

var renderBothOrderOption = function(am){
    var bothDv = document.createElement("div");
    bothDv.classList.add("individual_block");
  var bothOrder = document.createElement("button");
    bothOrder.setAttribute("type", "button");
    bothOrder.setAttribute("id", "bothOrderSubmit");
    bothOrder.innerHTML = "Email & Mail my Order";
    bothOrder.addEventListener("click", function(ev){
        bothReport();
        pushReportOrder();
        registerSubmission();
    });
    bothDv.appendChild(bothOrder);
    am.appendChild(bothDv);
};

var renderPickupOrderOption = function(attmnt){
    var pupDv = document.createElement("div");
    pupDv.classList.add("individual_block");
    var pickupOrder = document.createElement("button");
    pickupOrder.setAttribute("type", "button");
    pickupOrder.setAttribute("id", "pickupOrderSubmit");
    pickupOrder.innerHTML = "Pickup my Order";
    pickupOrder.addEventListener("click", function(ev){
        pickupReport();
        pushReportOrder();
        registerSubmission();
    });
    pupDv.appendChild(pickupOrder);
    attmnt.appendChild(pupDv);
};

var ancestryRptStart = function(){
    renderReportHead();
    renderExplanation();
    renderReportOrder();
    renderReportOptions();
    renderReportSelection();
};

document.addEventListener('DOMContentLoaded', ancestryRptStart);
