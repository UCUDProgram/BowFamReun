var userAcct= "";
var newPass="";
var newPassVer="";
var userDB = new Firebase("https://bowmanfamreun.firebaseio.com/User");


var setContact = function(){
    userAcct = document.getElementById("contact").value;
};

var setNewPass = function(){
    newPass = document.getElementById("passReset").value;
};

var setNewPassVer = function(){
    newPassVer = document.getElementById("passResetVerify").value;
};

var clearPassResetFields = function(){
  document.getElementById("contact").value = "";
  document.getElementById("passReset").value = "";
  document.getElementById("passResetVerify").value = "";
};

var updatePassword = function(){
        userDB.orderByChild("userName").equalTo(userAcct).on("value", function(snapshot) {
      var keyVal = snapshot.key();
        userDB.child(keyVal).update({password: newPass
                    } );
   });
}

var changePassword = function(){
    
    clearPassResetFields();
    showHomePageScreen();
};

var passResetStart = function(){
    document.getElementById("contact").addEventListener("blur",setContact);
    document.getElementById("passReset").addEventListener("blur",setNewPass);
    document.getElementById("passResetVerify").addEventListener("blur",setNewPassVer);
    document.getElementById("passResetSubmit").addEventListener("click",changePassword);
};

document.addEventListener('DOMContentLoaded',passResetStart);