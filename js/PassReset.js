var userAcct= "";
var newPass="";
var newPassVer="";
var userDB = new Firebase("https://bowmanfamreun.firebaseio.com/Users");


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
      snapshot.forEach(function(childSnapshot){
        userDB.child(childSnapshot.key()).update({password: newPass
                    } );
      });
   });
};

var changePassword = function(){
    alert("Your Password has been changed");
    updatePassword();
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