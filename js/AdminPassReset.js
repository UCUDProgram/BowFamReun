var adminAcct= "";
var newAdminPass="";
var newAdminPassVer="";
var newAdminPassWordVerify = false;
var adminUserCheckFail = false;
var adminEmailCheckFail = false;

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

var setAdminNewPassVer = function(){
    newAdminPassVer = document.getElementById("adminPassResetVerify").value;
};

var adminUserTrue = function(){
  adminUserCheckFail = true;  
};

var adminEmailTrue = function(){
  adminEmailCheckFail = true;  
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

var updateAdminPassword = function(){
        // variableReset();
        newAdminPasswordChangeVerification();
        if (newAdminPassWordVerify){
        userAdminPasswordChangeCheck();
        emailAdminPasswordChangeCheck();
        adminChangeDecision();
        } else {
            alert("The New Password Fields do not Match");
            clearPassResetFields();
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
    $adminInputDiv.classList.add("individual_block");
    
    
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