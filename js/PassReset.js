var userAcct= "";
var newPass="";
var newPassVer="";
var newPassWordVerify = false;
var userCheckFail = false;
var emailCheckFail = false;
var userDB = new Firebase("https://bowmanfamreun.firebaseio.com/Users");
var passDB = new Firebase("https://bowmanfamreun.firebaseio.com/Users");

var setContact = function(){
    userAcct = document.getElementById("contact").value;
};

var setNewPass = function(){
    newPass = document.getElementById("passReset").value;
};

var setNewPassVer = function(){
    newPassVer = document.getElementById("passResetVerify").value;
};

var userTrue = function(){
  userCheckFail = true;  
};

var emailTrue = function(){
  emailCheckFail = true;  
};

var variableReset = function(){
    userCheckFail = false;
    emailCheckFail = false;
};


var clearPassResetFields = function(){
  document.getElementById("contact").value = "";
  document.getElementById("passReset").value = "";
  document.getElementById("passResetVerify").value = "";
};

var updatePassword = function(){
        // variableReset();
        newPasswordChangeVerification();
        if (newPassWordVerify){
        userPasswordChangeCheck();
        emailPasswordChangeCheck();
        changeDecision();
        } else {
            alert("The New Password Fields do not Match");
            clearPassResetFields();
            showPasswordResetScreen();
        }
};

var userPasswordChangeCheck = function(){
    userDB.orderByChild("userName").equalTo(userAcct).on("value", function(snapshot) {
        if(snapshot.val() == null){
         userTrue();   
        } else {
             snapshot.forEach(function(childSnapshot){
            userDB.child(childSnapshot.key()).update({password: newPass
                });
        });
    }});
};

var emailPasswordChangeCheck = function(){
    passDB.orderByChild("email").equalTo(userAcct).on("value", function(eSnapshot) {
        if(eSnapshot.val() == null){
            emailTrue();
        } else {
            eSnapshot.forEach(function(childSnap){
            userDB.child(childSnap.key()).update({password: newPass
            });
      });
        }});
};

var newPasswordChangeVerification = function(){
    if (newPass == newPassVer){
        newPassWordVerify = true;
    }
};

var changeDecision = function(){
    if(userCheckFail && emailCheckFail){
            alert("User Account and/or email are not valid"); 
            clearPassResetFields();
            showPasswordResetScreen();
        } else {
            alert("Your Password has been changed");
            clearPassResetFields();
            showHomePageScreen(); 
            }
};

//  RENDERING THE SCREEN (VIEW)
var renderPassResetScreen = function(){
  renderPassHeader();
  renderPassReset();
};

var renderPassHeader = function(){
     var $div = document.getElementById("pass_reset");
  var $head = document.createElement("h1");
  $head.innerHTML = "Password Reset";
  $div.appendChild($head);
};

var renderPassReset = function(){
    renderPassResetUser();
    renderPassResetPass();
    renderPassResetButt();
};

var renderPassResetUser = function(){
    var $div = document.getElementById("pass_reset");
    var $userDiv = document.createElement("div");
    
    var contactLbl = document.createElement("label");
    contactLbl.setAttribute("for", "contact");
    contactLbl.innerHTML = "Username or email address "; 
    $userDiv.appendChild(contactLbl);
    
    var usertxt = document.createElement("input");
    usertxt.setAttribute("type", "text");
    usertxt.setAttribute("id","contact");
    usertxt.addEventListener("blur",function(ev){
        setContact();
    });
    $userDiv.appendChild(usertxt);
    $div.appendChild($userDiv);
};

var renderPassResetPass = function(){
    var $div = document.getElementById("pass_reset");
    var $passDiv = document.createElement("div");
    
    var $inputDiv = document.createElement("div");
    $inputDiv.classList.add("individual_block");
    
    
    var nPassDiv = document.createElement("div");
    var passLbl = document.createElement("label");
    passLbl.setAttribute("for", "passReset");
    passLbl.innerHTML = "New Password: "; 
    nPassDiv.appendChild(passLbl);
    
    var newPassTxt = document.createElement("input");
    newPassTxt.setAttribute("type", "text");
    newPassTxt.setAttribute("id","passReset");
    newPassTxt.addEventListener("blur",function(ev){
        setNewPass();
    });
    nPassDiv.appendChild(newPassTxt);
    $inputDiv.appendChild(nPassDiv);
    
     var nPassVerDiv = document.createElement("div");
    var passVerLbl = document.createElement("label");
    passVerLbl.setAttribute("for", "passReset");
    passVerLbl.innerHTML = "New Password Verify: "; 
    nPassVerDiv.appendChild(passVerLbl);
    
    var newPassVerTxt = document.createElement("input");
    newPassVerTxt.setAttribute("type", "text");
    newPassVerTxt.setAttribute("id","passResetVerify");
    newPassVerTxt.addEventListener("blur",function(ev){
        setNewPassVer();
    });
    
    nPassVerDiv.appendChild(newPassVerTxt);
    $inputDiv.appendChild(nPassVerDiv);
    $passDiv.appendChild($inputDiv);
    
    // var $passCheckDiv = document.createElement("div");
    // $passCheckDiv.classList.add("individual_block");
    // var passChecktxt = document.createElement("button");
    // passChecktxt.setAttribute("type", "button");
    // passChecktxt.setAttribute("id","newPassCheck");
    // passChecktxt.innerHTML = "New Password Check";
    // passChecktxt.addEventListener("blur",function(ev){
    //     // setNewPass();
    // });
    
    // $passCheckDiv.appendChild(passChecktxt);
    // $passDiv.appendChild($passCheckDiv);
    
    
    $div.appendChild($passDiv);
};

var renderPassResetButt = function(){
    var $div = document.getElementById("pass_reset");
    var $buttonDiv = document.createElement("div");
    $buttonDiv.classList.add("screenButtons");
    
    
    var passSubmit = document.createElement("button");
    passSubmit.setAttribute("type", "button");
    passSubmit.setAttribute("id","passResetSubmit");
    passSubmit.innerHTML = "Reset Password";
    passSubmit.addEventListener("click",function(ev){
        updatePassword();
    });
    $buttonDiv.appendChild(passSubmit);
    
    var loginSwitch = document.createElement("button");
    loginSwitch.setAttribute("type", "button");
    loginSwitch.setAttribute("id","loginReturn");
    loginSwitch.innerHTML = "Return to Login Screen";
    loginSwitch.addEventListener("click",function(ev){
        showLoginScreen();
    });
    $buttonDiv.appendChild(loginSwitch);
    
    $div.appendChild($buttonDiv);
};

var passResetStart = function(){
    renderPassResetScreen();
};

document.addEventListener('DOMContentLoaded',passResetStart);