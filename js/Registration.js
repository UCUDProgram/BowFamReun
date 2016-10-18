var uFirst ="";
var uLast = "";
var uAddress = "";
var uCity = "";
var uState = "";
var uZip = "";
var uEmail = "";
var uPhone = "";
var uUName="";
var uPass="";
var uPassVer = "";


var setFirstName = function(){
  uFirst = document.getElementById("fName").value;  
};
var setLastName = function(){
  uLast = document.getElementById("lName").value;  
};
var setAddress = function(){
  uAddress = document.getElementById("addr").value;  
};
var setCity = function(){
  uCity = document.getElementById("city").value;  
};
var setState = function(){
  uState = document.getElementById("state").value;  
};
var setZip = function(){
  uZip = document.getElementById("zip").value;  
};
var setEMail = function(){
  uEmail = document.getElementById("email").value;  
};
var setPhone = function(){
  uPhone = document.getElementById("phone").value;  
};
var setUser = function(){
  uUName = document.getElementById("uname").value;  
};
var setPassword = function(){
  uPass = document.getElementById("pword").value;  
};
var setPassVer = function(){
  uPassVer = document.getElementById("pword_Verify").value;  
};

var userNameCheck = function(){
    alert("Thank You for Checking if Your Username is acceptable");
};

var userPasswordCheck = function(){
    alert("Thank You for checking to see if your Password is acceptable");
};

var registerAccount = function(){
    alert("Thank You for Registering");
};

var registerStart = function(){

    document.getElementById("fName").addEventListener("blur",setFirstName);
    document.getElementById("lName").addEventListener("blur",setLastName);
    document.getElementById("addr").addEventListener("blur",setAddress);
    document.getElementById("city").addEventListener("blur",setCity);
    document.getElementById("state").addEventListener("blur",setState);
    document.getElementById("zip").addEventListener("blur",setZip);
    document.getElementById("email").addEventListener("blur",setEMail);
    document.getElementById("phone").addEventListener("blur",setPhone);
    document.getElementById("uname").addEventListener("blur",setUser);
    document.getElementById("pword").addEventListener("blur",setPassword);
    document.getElementById("pword_Verify").addEventListener("blur",setPassVer);
    
    document.getElementById("userCheck").addEventListener("click",userNameCheck);
    document.getElementById("passCheck").addEventListener("click",userPasswordCheck);
    document.getElementById("acctSubmit").addEventListener("click",registerAccount);
};

document.addEventListener('DOMContentLoaded',registerStart);