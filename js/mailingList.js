var mailFir = "";
var mailLas = "";
var mailAdd = "";
var mailCit = "";
var mailSta = "";
var mailZp = "";
var mailPho = "";
var mailEma = "";
var DB = new Firebase("https://bowmanfamreun.firebaseio.com/");

var clrStraDta = function(){
    localStorage.clear();  
};

var setMailFirst = function(newF){
    mailFir = newF;    
};

var setMailLast = function(newL){
    mailLas = newL;  
};

var setMailAdd = function(newA){
    mailAdd = newA; 
};

var setMailCity = function(newC){
    mailCit = newC;  
};

var setMailState = function(newS){
    mailSta = newS;
};

var setMailZip = function(newZ){
    mailZp = newZ;
};

var setMailPhone = function(newP){
    mailPho = newP;
};

var setMailEmail = function(newE){
    mailEma = newE;
};

var pushMailData = function(){
    var mailData = DB.child("Mailing");
    mailData.push().set({mailFirst: mailFir,
                         mailLast: mailLas,
                         mailAddress: mailAdd,
                         mailCity: mailCit,
                         mailState: mailSta,
                         mailZip: mailZp,
                         mailPhone: mailPho,
                         mailEmail: mailEma});
};

var resetPageTextFields = function(){
    document.getElementById("firName").value = "";
    document.getElementById("lasName").value = "";
    document.getElementById("mailAddr").value = "";
    document.getElementById("mailCity").value = "";
    document.getElementById("mailState").value = "";
    document.getElementById("mailZip").value = "";
    document.getElementById("phoneNum").value = "";
    document.getElementById("eMail").value = "";
};


var submitMailingInfo = function(){
    alert("Thank You " + mailFir + " " + mailLas + " for adding your information to the mailing list");
    pushMailData();
    resetPageTextFields();
};

// RENDERING THE SCREEN (VIEW)

var renderMailingListPage = function(){
    renderMailHeader();
    renderMailNews();
    renderMailInformation();
};

var renderMailHeader = function(){
    var mailDv= document.getElementById("mailingHeader");
    var mailTitl = document.createElement("h1");
    mailTitl.innerHTML = "Join the Mailing List";
    mailDv.appendChild(mailTitl);
};

var renderMailNews = function(){
    var newsDv = document.getElementById("mailingNews");
    var newsText = document.createElement("h2");
    newsText.innerHTML = "Enter your information to be added to the mailing list, to be kept in the loop for information about the next Family Reunion";
    newsDv.appendChild(newsText);
};

var renderMailInformation = function(){
    var mailInf = document.getElementById("mailingInfo");
    
    var mailNameDiv = document.createElement("div");
    renderMailFirstName(mailNameDiv);
    renderMailLastName(mailNameDiv);
    mailInf.appendChild(mailNameDiv);
    var mailAddressDiv = document.createElement("div");
    renderMailingAddress(mailAddressDiv);
    mailInf.appendChild(mailAddressDiv);
    var mailContactDiv = document.createElement("div");
    renderMailPhone(mailContactDiv);
    renderMailEmail(mailContactDiv);
    mailInf.appendChild(mailContactDiv);
    var mailSub = document.createElement("div");
    renderMailingSubmit(mailSub);
    mailInf.appendChild(mailSub);
};

var renderMailFirstName = function(mDiv){
    var mailFNamediv = document.createElement("div");
    mailFNamediv.classList.add("individual_block_first");
  
    var mailFnameLab = document.createElement("label");
    mailFnameLab.setAttribute("for", "firName");
    mailFnameLab.innerHTML = "First Name: ";
    mailFNamediv.appendChild(mailFnameLab);
  
    var mailFnameIpt = document.createElement("input");
    mailFnameIpt.setAttribute("type", "text");
    mailFnameIpt.setAttribute("id", "firName");
    mailFnameIpt.addEventListener("blur", function(ev){
        var fiNa = document.getElementById("firName").value;
        setMailFirst(fiNa);
    });
    mailFNamediv.appendChild(mailFnameIpt);
    mDiv.appendChild(mailFNamediv);
};

var renderMailLastName = function(maDv){
    var mailLNamediv = document.createElement("div");
    mailLNamediv.classList.add("individual_block");
  
    var mailLnameLab = document.createElement("label");
    mailLnameLab.setAttribute("for", "lasName");
    mailLnameLab.innerHTML = "Last Name: ";
    mailLNamediv.appendChild(mailLnameLab);
  
    var mailLnameIpt = document.createElement("input");
    mailLnameIpt.setAttribute("type", "text");
    mailLnameIpt.setAttribute("id", "lasName");
    mailLnameIpt.addEventListener("blur", function(ev){
        var laNa = document.getElementById("lasName").value;
        setMailLast(laNa);
    });
    mailLNamediv.appendChild(mailLnameIpt);
    maDv.appendChild(mailLNamediv);
};

var renderMailingAddress = function(maiDiv){
    renderMailAddress(maiDiv);
    var mailAddrLineTwo = document.createElement("div");
    renderMailCity(mailAddrLineTwo);
    renderMailState(mailAddrLineTwo);
    renderMailZip(mailAddrLineTwo);
    maiDiv.appendChild(mailAddrLineTwo);
};

var renderMailAddress = function(md){
    var mailAddDiv = document.createElement("div");
    var mailAddrLbl = document.createElement("label");
    mailAddrLbl.setAttribute("for", "mailAddr");
    mailAddrLbl.innerHTML = "Address: ";
    mailAddDiv.appendChild(mailAddrLbl);
  
    var mailAddrIpt = document.createElement("input");
    mailAddrIpt.setAttribute("type", "text");
    mailAddrIpt.setAttribute("id", "mailAddr");
    mailAddrIpt.addEventListener("blur", function(ev){
        var maAdd = document.getElementById("mailAddr").value;
        setMailAdd(maAdd);
    });
  
    mailAddDiv.appendChild(mailAddrIpt);
    md.appendChild(mailAddDiv);
};

var renderMailCity = function(mAdr){
    var mailCitydiv = document.createElement("div");
    mailCitydiv.classList.add("individual_block_first");
  
    var mailCityLab = document.createElement("label");
    mailCityLab.setAttribute("for", "mailCity");
    mailCityLab.innerHTML = "City: ";
    mailCitydiv.appendChild(mailCityLab);
  
    var mailCityIpt = document.createElement("input");
    mailCityIpt.setAttribute("type", "text");
    mailCityIpt.setAttribute("id", "mailCity");
    mailCityIpt.addEventListener("blur", function(ev){
        var maCi = document.getElementById("mailCity").value;
        setMailCity(maCi);
    });
    mailCitydiv.appendChild(mailCityIpt);
    mAdr.appendChild(mailCitydiv);
};

var renderMailState = function(maAd){
    var mailStatediv = document.createElement("div");
    mailStatediv.classList.add("individual_block");
  
    var mailStateLab = document.createElement("label");
    mailStateLab.setAttribute("for", "mailState");
    mailStateLab.innerHTML = "State: ";
    mailStatediv.appendChild(mailStateLab);
  
    var mailStateIpt = document.createElement("input");
    mailStateIpt.setAttribute("type", "text");
    mailStateIpt.setAttribute("size","7");
    mailStateIpt.setAttribute("id", "mailState");
    mailStateIpt.addEventListener("blur", function(ev){
        var maSt = document.getElementById("mailState").value;
        setMailState(maSt);
    });
    mailStatediv.appendChild(mailStateIpt);
    maAd.appendChild(mailStatediv);
};

var renderMailZip = function(maiAdd){
    var mailZipdiv = document.createElement("div");
    mailZipdiv.classList.add("individual_block");
  
    var mailZipLab = document.createElement("label");
    mailZipLab.setAttribute("for", "mailZip");
    mailZipLab.innerHTML = "ZipCode: ";
    mailZipdiv.appendChild(mailZipLab);
  
    var mailZipIpt = document.createElement("input");
    mailZipIpt.setAttribute("type", "text");
    mailZipIpt.setAttribute("size","9");
    mailZipIpt.setAttribute("id", "mailZip");
    mailZipIpt.addEventListener("blur", function(ev){
        var maZp = document.getElementById("mailZip").value;
        setMailZip(maZp);
    });
    mailZipdiv.appendChild(mailZipIpt);
    maiAdd.appendChild(mailZipdiv);
};

var renderMailPhone = function(maDiv){
    var mailPhonediv = document.createElement("div");
    mailPhonediv.classList.add("individual_block_first");
  
    var mailPhoneLab = document.createElement("label");
    mailPhoneLab.setAttribute("for", "phoneNum");
    mailPhoneLab.innerHTML = "Phone Number: ";
    mailPhonediv.appendChild(mailPhoneLab);
  
    var mailPhoneIpt = document.createElement("input");
    mailPhoneIpt.setAttribute("type", "text");
    mailPhoneIpt.setAttribute("id", "phoneNum");
    mailPhoneIpt.addEventListener("blur", function(ev){
        var maPh = document.getElementById("phoneNum").value;
        setMailPhone(maPh);
    });
    mailPhonediv.appendChild(mailPhoneIpt);
    maDiv.appendChild(mailPhonediv);
};

var renderMailEmail = function(mDv){
    var mailEmaildiv = document.createElement("div");
    mailEmaildiv.classList.add("individual_block");
  
    var mailEmailLab = document.createElement("label");
    mailEmailLab.setAttribute("for", "eMail");
    mailEmailLab.innerHTML = "Email Address: ";
    mailEmaildiv.appendChild(mailEmailLab);
  
    var mailEmailIpt = document.createElement("input");
    mailEmailIpt.setAttribute("type", "email");
    mailEmailIpt.setAttribute("id", "eMail");
    mailEmailIpt.addEventListener("blur", function(ev){
        var maEm = document.getElementById("eMail").value;
        setMailEmail(maEm);
    });
    mailEmaildiv.appendChild(mailEmailIpt);
    mDv.appendChild(mailEmaildiv);
};

var renderMailingSubmit = function(mailDiv){
    var mailBut = document.createElement("div");
    mailBut.classList.add("buttAlignment");
    var mailSubBut = document.createElement("button");
    mailSubBut.setAttribute("type", "button");
    mailSubBut.setAttribute("id", "mailSubmit");
    mailSubBut.innerHTML = "Add to Mailing List";
    mailSubBut.addEventListener("click", function(ev){
        submitMailingInfo();
    });
    mailBut.appendChild(mailSubBut);
    mailDiv.appendChild(mailBut);
};

var mailingStart = function(){
    clrStraDta();
    renderMailingListPage();
};

document.addEventListener('DOMContentLoaded', mailingStart);