var adminAcct= "";
var newAdminPass="";
var newAdminPassVer="";
var newAdminPassWordVerify = false;
var adminUserCheckFail = false;
var adminEmailCheckFail = false;
var adminPassChgResult = false;
var adminPassChgMessage = "";

var admDB = new Firebase("https://bowmanfamreun.firebaseio.com/Admin");

var clrStrg = function(){
  localStorage.clear();  
};

var setAdminContact = function(){
    adminAcct = document.getElementById("admContact").value;
};

var setAdminNewPass = function(){
    newAdminPass = document.getElementById("adminPassReset").value;
};

var resetAdminNewPass = function(){
    document.getElementById("adminPassReset").value = "";
    setAdminNewPass();
};

var setAdminNewPassVer = function(){
    newAdminPassVer = document.getElementById("adminPassResetVerify").value;
};

var resetAdminNewPassVer = function(){
  document.getElementById("adminPassResetVerify").value = "";
  setAdminNewPassVer();
};

var adminUserTrue = function(){
  adminUserCheckFail = true;  
};

var adminEmailTrue = function(){
  adminEmailCheckFail = true;  
};

var setAdminPassRst = function(rst){
    adminPassChgResult = rst;
};

var setAdminPassMsg = function(messa){
  adminPassChgMessage = messa;  
};


var adminVariableReset = function(){
    adminUserCheckFail = false;
    adminEmailCheckFail = false;
};


var clearAdminPassResetFields = function(){
  document.getElementById("admContact").value = "";
  document.getElementById("adminPassReset").value = "";
  document.getElementById("adminPassResetVerify").value = "";
};

var adminPasswordSend = function(){
  var adminVald = JSON.stringify({password:newAdminPass});
  return adminVald;
};

var parseAdminResponse = function(chuckJSON){
    // console.log(chuckJSON);
  var admindata = JSON.parse(chuckJSON);
  var adminrst = admindata.response;
  setAdminPassRst(adminrst);
  var adminmsg = admindata.message;
  setAdminPassMsg(adminmsg);
  
  
  // console.log(pasdata);
  // console.log(pwdrst);
  // console.log(pwdmsg);
  // var pasdata = JSON.parse(chuckJSON);
  // passwordCheckResult = pasdata.response;
  // passwordCheckMessage = pasdata.message;
};

var adminVer = function(chuckJSON){
  parseAdminResponse(chuckJSON);
  if (adminPassChgResult){
    alert(adminPassChgMessage);
  } else {
    alert(adminPassChgMessage);  
    resetAdminNewPass();
    resetAdminNewPassVer();
  }
};

var getAdminPasswordCheck = function(){
  var URL = "../php/validPasswordCheck.php";
  // var URL = "https://bow-fam-reun-ucudprogram.c9users.io/php/validPasswordCheck.php";
  var xhr = new XMLHttpRequest();
  
  xhr.onload = function(){
    if (this.status == 200){
      adminVer(this.response);
    }
  };
  var data = adminPasswordSend();
  xhr.open("POST", URL);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(data);
};


var adminPasswordCheck = function(){
  if(newAdminPass != newAdminPassVer){
    alert("The Two Passwords do not match");
  } else{
    getAdminPasswordCheck();
    // alert("Thank You for checking to see if your Password is acceptable");
  }
};




var updateAdminPassword = function(){
        // variableReset();
        newAdminPasswordChangeVerification();
        if (newAdminPassWordVerify){
        userAdminPasswordChangeCheck();
        emailAdminPasswordChangeCheck();
        adminChangeDecision();
        } else {
            alert("The New Password Fields do not Match");
            clearAdminPassResetFields();
            showPasswordResetScreen();
        }
};

var userAdminPasswordChangeCheck = function(){
    admDB.orderByChild("userName").equalTo(adminAcct).on("value", function(snapshot) {
        if(snapshot.val() == null){
         adminUserTrue();   
        } else {
             snapshot.forEach(function(childSnapshot){
            admDB.child(childSnapshot.key()).update({passWord: newAdminPass
                });
        });
    }});
};

var emailAdminPasswordChangeCheck = function(){
    admDB.orderByChild("email").equalTo(adminAcct).on("value", function(eSnapshot) {
        if(eSnapshot.val() == null){
            adminEmailTrue();
        } else {
            eSnapshot.forEach(function(childSnap){
            admDB.child(childSnap.key()).update({passWord: newAdminPass
            });
      });
        }});
};

var newAdminPasswordChangeVerification = function(){
    if (newAdminPass == newAdminPassVer){
        newAdminPassWordVerify = true;
    }
};

var adminChangeDecision = function(){
    if(adminUserCheckFail && adminEmailCheckFail){
            alert("User Account and/or email are not valid"); 
            clearAdminPassResetFields();
            showAdminPasswordResetScreen();
        } else {
            alert("Your Password has been changed");
            clearAdminPassResetFields();
            showAdminLoginScreen(); 
            }
};

//  RENDERING THE SCREEN (VIEW)
var renderAdminPassResetScreen = function(){
  renderAdminPassHeader();
  renderAdminPassReset();
};

var renderAdminPassHeader = function(){
     var $div = document.getElementById("admin_pass_reset");
  var $head = document.createElement("h1");
  $head.innerHTML = "Administer Password Reset";
  $div.appendChild($head);
};

var renderAdminPassReset = function(){
    renderAdminPassResetUser();
    renderAdminPassResetPass();
    renderAdminPassResetButt();
};

var renderAdminPassResetUser = function(){
    var $div = document.getElementById("admin_pass_reset");
    var $adminDiv = document.createElement("div");
    
    var adminContactLbl = document.createElement("label");
    adminContactLbl.setAttribute("for", "admContact");
    adminContactLbl.innerHTML = "Username or email address "; 
    $adminDiv.appendChild(adminContactLbl);
    
    var admintxt = document.createElement("input");
    admintxt.setAttribute("type", "text");
    admintxt.setAttribute("id","admContact");
    admintxt.addEventListener("blur",function(ev){
        setAdminContact();
    });
    $adminDiv.appendChild(admintxt);
    $div.appendChild($adminDiv);
};

var renderAdminPassResetPass = function(){
    var $admDiv = document.getElementById("admin_pass_reset");
    var $adminDiv = document.createElement("div");
    
    var $adminInputDiv = document.createElement("div");
    $adminInputDiv.classList.add("individual_block_first");
    
    
    var adminPassDiv = document.createElement("div");
    var adminPassLbl = document.createElement("label");
    adminPassLbl.setAttribute("for", "adminPassReset");
    adminPassLbl.innerHTML = "New Password: "; 
    adminPassDiv.appendChild(adminPassLbl);
    
    var newAdminPassTxt = document.createElement("input");
    newAdminPassTxt.setAttribute("type", "text");
    newAdminPassTxt.setAttribute("id","adminPassReset");
    newAdminPassTxt.addEventListener("blur",function(ev){
        setAdminNewPass();
    });
    adminPassDiv.appendChild(newAdminPassTxt);
    $adminInputDiv.appendChild(adminPassDiv);
    
     var AdminPassVerDiv = document.createElement("div");
    var AdminPassVerLbl = document.createElement("label");
    AdminPassVerLbl.setAttribute("for", "adminPassResetVerify");
    AdminPassVerLbl.innerHTML = "New Password Verify: "; 
    AdminPassVerDiv.appendChild(AdminPassVerLbl);
    
    var newAdminPassVerTxt = document.createElement("input");
    newAdminPassVerTxt.setAttribute("type", "text");
    newAdminPassVerTxt.setAttribute("id","adminPassResetVerify");
    newAdminPassVerTxt.addEventListener("blur",function(ev){
        setAdminNewPassVer();
    });
    AdminPassVerDiv.appendChild(newAdminPassVerTxt);
    $adminInputDiv.appendChild(AdminPassVerDiv);
    $adminDiv.appendChild($adminInputDiv);


  var adminButtDiv = document.createElement("div");
  adminButtDiv.classList.add("individual_block");
  
  var adminChkBut = document.createElement("button");
 adminChkBut.setAttribute("type", "button");
 adminChkBut.setAttribute("id", "adminCheck");
 adminChkBut.innerHTML = "New Admin Password Check";
 adminChkBut.addEventListener("click", function(ev){
  adminPasswordCheck();
 });
 adminButtDiv.appendChild(adminChkBut);
 
$adminDiv.appendChild(adminButtDiv);


    $admDiv.appendChild($adminDiv);
};

var renderAdminPassResetButt = function(){
    var $div = document.getElementById("admin_pass_reset");
    var $buttonDiv = document.createElement("div");
    $buttonDiv.classList.add("screenButtons");
    
    
    var passSubmit = document.createElement("button");
    passSubmit.setAttribute("type", "button");
    passSubmit.setAttribute("id","adminPassResetSubmit");
    passSubmit.innerHTML = "Reset Password";
    passSubmit.addEventListener("click",function(ev){
        updateAdminPassword();
    });
    $buttonDiv.appendChild(passSubmit);
    
    var loginSwitch = document.createElement("button");
    loginSwitch.setAttribute("type", "button");
    loginSwitch.setAttribute("id","loginPageReturn");
    loginSwitch.innerHTML = "Return to Administer Login Page";
    loginSwitch.addEventListener("click",function(ev){
        showAdminLoginScreen();
    });
    $buttonDiv.appendChild(loginSwitch);
    
    $div.appendChild($buttonDiv);
};

var passAdminResetStart = function(){
    clrStrg();
    renderAdminPassResetScreen();
};

document.addEventListener('DOMContentLoaded',passAdminResetStart);