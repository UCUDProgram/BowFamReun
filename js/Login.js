var acctUser = "";
var acctPass = "";

var setAcctUser = function(){
  acctUser = document.getElementById("user").value;
};

var setAcctPass = function(){
  acctPass = document.getElementById("pass").value;
};

var loginStart = function(){
  document.getElementById("user").addEventListener("blur",setAcctUser);
  document.getElementById("pass").addEventListener("blur",setAcctPass);
  
};


document.addEventListener('DOMContentLoaded',loginStart);