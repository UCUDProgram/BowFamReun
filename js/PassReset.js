var userAcct= "";
var newPass="";
var newPassVer="";


var setContact = function(){
    userAcct = document.getElementById("contact").value;
};

var setNewPass = function(){
    newPass = document.getElementById("passReset").value;
};

var setNewPassVer = function(){
    newPassVer = document.getElementById("passResetVerify").value;
};

var changePassword = function(){
    
};

var passResetStart = function(){
    document.getElementById("contact").addEventListener("blur",setContact);
    document.getElementById("passReset").addEventListener("blur",setNewPass);
    document.getElementById("passResetVerify").addEventListener("blur",setNewPassVer);
    document.getElementById("passResetSubmit").addEventListener("click",changePassword);
};

document.addEventListener('DOMContentLoaded',passResetStart);