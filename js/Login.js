var acctUser = "";
var acctPass = "";

var setAcctUser = function(){
  acctUser = document.getElementById("user").value;
};

var setAcctPass = function(){
  acctPass = document.getElementById("pass").value;
};

var loginSubmission = function(){
    alert("Thank You for attempting to login");
};
    

var loginStart = function(){
  document.getElementById("user").addEventListener("blur",setAcctUser);
  document.getElementById("pass").addEventListener("blur",setAcctPass);
  document.getElementById("loginSubmit").addEventListener("click",loginSubmission);

};

document.addEventListener('DOMContentLoaded',loginStart);