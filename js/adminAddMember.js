var newOfflineUserName = "";
var shirtsCost = 0;
var registCost = 0;
var regShtCt = 10;
var lgShtCt = 12;
var childReg = 10;
var adultReg = 20;
var attendList = [];
var adminAct = "";
var DB = new Firebase("https://bowmanfamreun.firebaseio.com/");

var getAdminAcct = function(){
    adminAct = localStorage.getItem("admin");
    if(adminAct == null){
        showAdminLoginScreen();
    }
    if(adminAct != "LawAdmin"){
        alert("This website is in Archive mode. Your account has been permanently disabled.");
        showHomePageScreen();
    }
};

var setOfflineUserName = function(){
    var firstNa= document.getElementById("offlineFName").value;
    var lastNa = document.getElementById("offlineLName").value;
    var name = firstNa.concat(lastNa);
    newOfflineUserName = name;  
};

var setShirtCost = function(shtCt){
    shirtsCost = shtCt;  
};

var setRegCost = function(regCt){
    registCost = regCt;  
};

var setOfflineRegCost = function(){
    var chi = 0;
    var adu = 0;
    attendList.forEach(function(atten){
        var atAge = atten[2];
        if(atAge == "Child")
            chi +=1;
        if(atAge =="Adult")
            adu +=1;
    });
  
    var chiTot = chi * childReg;
    var aduTot = adu * adultReg;
  
    var regTot = chiTot + aduTot;
    setRegCost(regTot);
};

var setOfflineShirtCost = function(){
    var regShtCount = 0;
    var lgShtCount = 0;
    var smal =0;
    var medi =0;
    var larg = 0;
    var xlar =0;
    var xxla = 0;
    var xxxl = 0;
    var xxxx =0;
    
    smal = parseInt(document.getElementById("smallOrd").value,10);
    medi = parseInt(document.getElementById("mediumOrd").value,10);
    larg = parseInt(document.getElementById("largeOrd").value, 10);
    xlar = parseInt(document.getElementById("xlargeOrd").value,10);
    xxla = parseInt(document.getElementById("doubXXLOrd").value,10);
    xxxl = parseInt(document.getElementById("tripXLOrd").value,10);
    xxxx = parseInt(document.getElementById("quadXLOrd").value,10);
    regShtCount = smal + medi + larg + xlar + xxla;
    lgShtCount += xxxl + xxxx;
 
    var regShtTot = regShtCount * regShtCt;
    var lgShtTot = lgShtCount * lgShtCt;
    var shtTot = +regShtTot + +lgShtTot;
    setShirtCost(shtTot);
};

var pushMemInfo = function(){
    var regData = DB.child("Accounts");
    regData.push().set({firstname: document.getElementById("offlineFName").value,
                        lastname: document.getElementById("offlineLName").value,
                        address: document.getElementById("offlineAddr").value,
                        city: document.getElementById("offlineCity").value,
                        state: document.getElementById("offlineState").value,
                        zip: document.getElementById("offlineZip").value,
                        email: document.getElementById("offlineEmail").value,
                        phone: document.getElementById("offlinePhone").value,
                        userName: newOfflineUserName
  });
};

var pushMemUserInfo = function(){
    var regData = DB.child("Users");
    regData.push().set({userName:newOfflineUserName,
                        password: "changeMe",
                        email: document.getElementById("offlineEmail").value
    });
};

var pushPaymentInfo = function(){
    var regData = DB.child("Fees");
    regData.push().set({userName: newOfflineUserName,
                      regPaid:0,
                      regDue:registCost,
                      shirtPaid:0,
                      shirtDue:shirtsCost
  });
};

var pushShirtOrder = function(){
    var regData = DB.child("TShirt");
    regData.push().set({account:newOfflineUserName, 
                      small: document.getElementById("smallOrd").value,
                      medium: document.getElementById("mediumOrd").value,
                      large: document.getElementById("largeOrd").value,
                      xL: document.getElementById("xlargeOrd").value,
                      xxLarge: document.getElementById("doubXXLOrd").value,
                      xxxLarge: document.getElementById("tripXLOrd").value,
                      xxxxLarge: document.getElementById("quadXLOrd").value
                    });
};

var pushAttendees = function(){
    var regData = DB.child("Attendees");
    attendList.forEach(function(attende){
        regData.push().set({account:newOfflineUserName,
                            firstname:attende[0],
                            lastname:attende[1],
                            age:attende[2]
        });
    });
};

var updateAttendeeList = function(){
    var newAttendee = [];
    newAttendee.push(document.getElementById("attendFName").value);
    newAttendee.push(document.getElementById("attendLName").value);
    newAttendee.push(document.getElementById("ageSelection").value);
    attendList.push(newAttendee);
    renderAttendeeList();
};

var resetAttendeesFields = function(){
    document.getElementById("attendFName").value = "";
    document.getElementById("attendLName").value = "";
    document.getElementById("ageSelection").selectedIndex = 0;
};

var resetAllFields = function(){
    document.getElementById("offlineFName").value = "";
    document.getElementById("offlineLName").value = "";
    document.getElementById("offlineAddr").value = "";
    document.getElementById("offlineCity").value = "";
    document.getElementById("offlineState").value = "";
    document.getElementById("offlineZip").value = "";
    document.getElementById("offlinePhone").value = "";
    document.getElementById("offlineEmail").value = "";
    document.getElementById("attendFName").value = "";
    document.getElementById("attendLName").value = "";
    document.getElementById("ageSelection").selectedIndex = 0;
    document.getElementById("smallOrd").selectedIndex = 0;
    document.getElementById("mediumOrd").selectedIndex = 0;
    document.getElementById("largeOrd").selectedIndex = 0;
    document.getElementById("xlargeOrd").selectedIndex = 0;
    document.getElementById("doubXXLOrd").selectedIndex = 0;
    document.getElementById("tripXLOrd").selectedIndex = 0;
    document.getElementById("quadXLOrd").selectedIndex = 0;
    attendList = [];
    registCost =0;
    shirtsCost=0;
};

// RENDERING THE SCREEN (VIEW)
var renderMembHead = function(){
    var $div = document.getElementById("addMemberHeader");
    var head = document.createElement("h1");
    head.innerHTML = "Register an offline Member";
    $div.appendChild(head);
};

var renderMemberInfo = function(){
    renderMemContact();
    renderNewMembAttend();
    renderAttendeeList();
    renderMemShirts();
};

var renderMemContact = function(){
    var div = document.getElementById("addMemberContact");
    var contaHead = document.createElement("h1");
    contaHead.innerHTML = "Basic Information";
    div.appendChild(contaHead);
    renderMemConRow1(div);
    renderMemConRow2(div);
    renderMemConRow3(div);
    renderMemConRow4(div);
};

var renderMemConRow1 = function(aDiv){
    var $row1div = document.createElement("div");
    $row1div.classList.add("row_block");
    var fNamediv = document.createElement("div");
    fNamediv.classList.add("individual_block_first");
    
    var fnameLab = document.createElement("label");
    fnameLab.setAttribute("for", "fName");
    fnameLab.innerHTML = "First Name: ";
    fNamediv.appendChild(fnameLab);
  
    var fnameIpt = document.createElement("input");
    fnameIpt.setAttribute("type", "text");
    fnameIpt.setAttribute("id", "offlineFName");
 
    fNamediv.appendChild(fnameIpt);
    $row1div.appendChild(fNamediv);
   
    var lNamediv = document.createElement("div");
    lNamediv.classList.add("individual_block");
  
    var lnameLab = document.createElement("label");
    lnameLab.setAttribute("for", "lName");
    lnameLab.innerHTML = "Last Name: ";
    lNamediv.appendChild(lnameLab);
  
    var lnameIpt = document.createElement("input");
    lnameIpt.setAttribute("type", "text");
    lnameIpt.setAttribute("id", "offlineLName");
 
    lNamediv.appendChild(lnameIpt);
    $row1div.appendChild(lNamediv);
    aDiv.appendChild($row1div);
};

var renderMemConRow2 = function(aDV){
    var $row2div = document.createElement("div");
    $row2div.classList.add("row_block");
  
    var addDiv = document.createElement("div");
    var addrLbl = document.createElement("label");
    addrLbl.setAttribute("for", "addr");
    addrLbl.innerHTML = "Address: ";
    addDiv.appendChild(addrLbl);
  
    var addrIpt = document.createElement("input");
    addrIpt.setAttribute("type", "text");
    addrIpt.setAttribute("id", "offlineAddr");
    addDiv.appendChild(addrIpt);
    $row2div.appendChild(addDiv);
    aDV.appendChild($row2div);    
};

var renderMemConRow3 = function(dv){
    var $row3div = document.createElement("div");
    $row3div.classList.add("row_block");
  
    var citydiv = document.createElement("div");
    citydiv.classList.add("individual_block_first");
  
    var cityLab = document.createElement("label");
    cityLab.setAttribute("for", "city");
    cityLab.innerHTML = "City: ";
    citydiv.appendChild(cityLab);
  
    var cityIpt = document.createElement("input");
    cityIpt.setAttribute("type", "text");
    cityIpt.setAttribute("id", "offlineCity");
  
    citydiv.appendChild(cityIpt);
    $row3div.appendChild(citydiv);
  
    var statediv = document.createElement("div");
    statediv.classList.add("individual_block");
  
    var stateLab = document.createElement("label");
    stateLab.setAttribute("for", "state");
    stateLab.innerHTML = "State: ";
    statediv.appendChild(stateLab);
  
    var stateIpt = document.createElement("input");
    stateIpt.setAttribute("type", "text");
    stateIpt.setAttribute("size","4");
    stateIpt.setAttribute("id", "offlineState");
  
    statediv.appendChild(stateIpt);
    $row3div.appendChild(statediv);
 
    var zipdiv = document.createElement("div");
    zipdiv.classList.add("individual_block");
  
    var zipLab = document.createElement("label");
    zipLab.setAttribute("for", "zip");
    zipLab.innerHTML = "ZipCode: ";
    zipdiv.appendChild(zipLab);
  
    var zipIpt = document.createElement("input");
    zipIpt.setAttribute("type", "text");
    zipIpt.setAttribute("size","7");
    zipIpt.setAttribute("id", "offlineZip");
  
    zipdiv.appendChild(zipIpt);
    $row3div.appendChild(zipdiv);
    dv.appendChild($row3div);
};

var renderMemConRow4 = function(aD){
    var $row4div = document.createElement("div");
    $row4div.classList.add("row_block");
    
    var phonediv = document.createElement("div");
    phonediv.classList.add("individual_block");
  
    var phoneLab = document.createElement("label");
    phoneLab.setAttribute("for", "phone");
    phoneLab.innerHTML = "Phone Number: ";
    phonediv.appendChild(phoneLab);
  
    var phoneIpt = document.createElement("input");
    phoneIpt.setAttribute("type", "text");
    phoneIpt.setAttribute("id", "offlinePhone");
    phonediv.appendChild(phoneIpt);
  
    $row4div.appendChild(phonediv);
    
    var emaildiv = document.createElement("div");
    emaildiv.classList.add("individual_block_first");
  
    var emailLab = document.createElement("label");
    emailLab.setAttribute("for", "email");
    emailLab.innerHTML = "Email: ";
    emaildiv.appendChild(emailLab);
  
    var emailIpt = document.createElement("input");
    emailIpt.setAttribute("type", "email");
    emailIpt.setAttribute("id", "offlineEmail");
    emaildiv.appendChild(emailIpt);
    $row4div.appendChild(emaildiv);
    aD.appendChild($row4div);
};

var renderNewMembAttend = function(){
    var div = document.getElementById("addNewMemberAttendee");
    var attHead = document.createElement("h1");
    attHead.innerHTML = "Register Attendees";
    div.appendChild(attHead);
    
    renderAttendeeName(div);
    renderAttendeeAgeCat(div);
    renderAttendeeAddButton(div);
};

var renderAttendeeName = function(AttDiv){
    var fNamediv = document.createElement("div");
    fNamediv.classList.add("individual_block_first");
  
    var fnameLab = document.createElement("label");
    fnameLab.setAttribute("for", "attendFName");
    fnameLab.innerHTML = "First Name: ";
    fNamediv.appendChild(fnameLab);
  
    var fnameIpt = document.createElement("input");
    fnameIpt.setAttribute("type", "text");
    fnameIpt.setAttribute("id", "attendFName");
  
    fNamediv.appendChild(fnameIpt);
    AttDiv.appendChild(fNamediv); 
  
    var lNamediv = document.createElement("div");
    lNamediv.classList.add("individual_block");
  
    var lnameLab = document.createElement("label");
    lnameLab.setAttribute("for", "attendLName");
    lnameLab.innerHTML = "Last Name: ";
    lNamediv.appendChild(lnameLab);
  
    var lnameIpt = document.createElement("input");
    lnameIpt.setAttribute("type", "text");
    lnameIpt.setAttribute("id", "attendLName");
    lNamediv.appendChild(lnameIpt);
    AttDiv.appendChild(lNamediv);
}; 

var renderAttendeeAgeCat = function(atDiv){
    var ageClassify = document.createElement("select");
    ageClassify.setAttribute("name", "age");
    ageClassify.setAttribute("id", "ageSelection");  
 
    var defaultClassify = document.createElement("option");
    defaultClassify.setAttribute("value", "Choose Age");
    defaultClassify.setAttribute("selected", true);
    defaultClassify.setAttribute("id", "defaultOption");
    defaultClassify.innerHTML = "Choose Person's Age";
    ageClassify.appendChild(defaultClassify);
    
    var infantClassify = document.createElement("option");
    infantClassify.setAttribute("value", "Infant");
    infantClassify.setAttribute("id", "infantAge");
    infantClassify.innerHTML = "Infant";
    ageClassify.appendChild(infantClassify);
      
    var childClassify = document.createElement("option");
    childClassify.setAttribute("value", "Child");
    childClassify.setAttribute("id", "childAge");
    childClassify.innerHTML = "Child";
    ageClassify.appendChild(childClassify);
      
    var adultClassify = document.createElement("option");
    adultClassify.setAttribute("value", "Adult");
    adultClassify.setAttribute("id", "adultAge");
    adultClassify.innerHTML = "Adult";
    adultClassify.classList.add("Adult");
    ageClassify.appendChild(adultClassify);
      
    var seniorClassify = document.createElement("option");
    seniorClassify.setAttribute("value", "Senior");
    seniorClassify.setAttribute("id", "seniorAge");
    seniorClassify.innerHTML = "Distinguished Adult";
    ageClassify.appendChild(seniorClassify);
    atDiv.appendChild(ageClassify);
};

var renderAttendeeAddButton = function(addDv){
    var $buttSubmit = document.createElement("button");
    $buttSubmit.setAttribute("id", "personSubmit");
    $buttSubmit.innerHTML = "Add Attendee";
    $buttSubmit.addEventListener("click", function(ev){
        updateAttendeeList();
        resetAttendeesFields();
    });
    addDv.appendChild($buttSubmit);
};

var renderAttendeeList= function(){
    var div = document.getElementById("addMemberAttendeeList");
  
    while(div.firstChild)
        div.removeChild(div.firstChild);
  
    var attendListTitl = document.createElement("h1");
    attendListTitl.innerHTML = "Person's Attendees";
    div.appendChild(attendListTitl);
  
    attendList.forEach(function (anAttendee){
        var persDv = document.createElement("div");
     
        var firstPers = document.createElement("div");
        firstPers.classList.add("individual_block_first");
        firstPers.innerHTML = anAttendee[0];
        persDv.appendChild(firstPers);
     
        var lastPers = document.createElement("div");
        lastPers.classList.add("individual_block");
        lastPers.innerHTML = anAttendee[1];
        persDv.appendChild(lastPers);
     
        var agePers = document.createElement("div");
        agePers.classList.add("individual_block");
        agePers.innerHTML = anAttendee[2]; 
        persDv.appendChild(agePers);
      
        var deletePers = document.createElement("button");
        deletePers.setAttribute("id", "personDelete");
        deletePers.innerHTML = "Delete Person";
        deletePers.addEventListener("click", function(ev){
            var persIndex = attendList.indexOf(anAttendee);
            attendList.splice(persIndex, 1);
            console.log(attendList);
            renderAttendeeList();
        });
        persDv.appendChild(deletePers);
        div.appendChild(persDv);
    });
};

var renderMemShirts = function(){
    var div = document.getElementById("addMemberShirts");
  
    var shtHead = document.createElement("h2");
    shtHead.innerHTML = "TShirt Ordering";
    div.appendChild(shtHead);
  
    renderMemSmall(div);
    renderMemMed(div);
    renderMemLg(div);
    renderMemXL(div);
    renderMem2XL(div);
    renderMem3XL(div);
    renderMem4XL(div);
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
    $selection.setAttribute("name","smallOrder");
    $selection.setAttribute("id","smallOrd");
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
    $mediumShirtLabel.setAttribute("id", "mediumShirt");
    $mediumShirtLabel.innerHTML = "Medium";
    $mediumDiv.appendChild($mediumShirtLabel);
    
    var $mediumselection = document.createElement("select");
    $mediumselection.setAttribute("name","mediumOrder");
    $mediumselection.setAttribute("id","mediumOrd");
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
    $largeselection.setAttribute("id","largeOrd");
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
    $xlargeselection.setAttribute("id","xlargeOrd");
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
    $doubXXLselection.setAttribute("id","doubXXLOrd");
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
    $tripXLselection.setAttribute("id","tripXLOrd");
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
    $quadXLselection.setAttribute("id","quadXLOrd");
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

var renderAddMemberButtons = function(){
    var div = document.getElementById("addMemberButtons");
    var submitMember = document.createElement("button");
    submitMember.setAttribute("type", "button");
    submitMember.setAttribute("id", "memSubmit");
    submitMember.innerHTML = "Register this Member";
    submitMember.addEventListener("click", function(ev){
        setOfflineUserName();
        var firNam = document.getElementById("offlineFName").value;
        var lasNam = document.getElementById("offlineLName").value;
        var regisName = firNam.concat(" ").concat(lasNam);
        pushMemInfo();
        pushMemUserInfo();
        pushAttendees();
        pushShirtOrder();
        setOfflineRegCost();
        setOfflineShirtCost();
        pushPaymentInfo();
        resetAllFields();
        alert("You have registered " + regisName);
        renderMemberInfo();
    });
    div.appendChild(submitMember);
};

var addMemberStart = function(){
    getAdminAcct();
    renderMembHead();
    renderMemberInfo();
    renderAddMemberButtons();
};

document.addEventListener('DOMContentLoaded', addMemberStart);