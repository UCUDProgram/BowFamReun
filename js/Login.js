var acctUser = "";
var acctPass = "";
var useDB = new Firebase("https://bowmanfamreun.firebaseio.com/Users");


var setAcctUser = function(){
  acctUser = document.getElementById("user").value;
};

var setAcctPass = function(){
  acctPass = document.getElementById("pass").value;
};

var clearLoginFields = function(){
  document.getElementById("user").value = "";
  document.getElementById("pass").value = "";
};

var renderLoginScreen = function(){
  renderLoginHeader();
  renderLoginUser();
  renderLoginPass();
  renderLoginButtons();
};

var renderLoginHeader = function(){
  var $loginHeader = document.getElementById("login");
  var logHeader = document.createElement("h1");
  logHeader.innerHTML = "Login";
  $loginHeader.appendChild(logHeader);
};

var renderLoginUser = function(){
  var $logHead = document.getElementById("login");
  var $logInfDiv = document.createElement("div");
  
  var userLogLbl = document.createElement("label");
  userLogLbl.setAttribute("for", "uname");
  userLogLbl.innerHTML = "Username: ";
  $logInfDiv.appendChild(userLogLbl);
  
  var userLogInpt = document.createElement("input");
  userLogInpt.setAttribute("type", "text");
  userLogInpt.setAttribute("id", "user");
  userLogInpt.addEventListener("blur", function(ev){
    setAcctUser();
  });
  $logInfDiv.appendChild(userLogInpt);
  
  $logHead.appendChild($logInfDiv);
};

var renderLoginPass = function(){
  var $lgHd = document.getElementById("login");
  var $logInfoDiv = document.createElement("div");
  
  var passLogLbl = document.createElement("label");
  passLogLbl.setAttribute("for", "upass");
  passLogLbl.innerHTML = "Password: ";
  $logInfoDiv.appendChild(passLogLbl);
  
  var passLogInpt = document.createElement("input");
  passLogInpt.setAttribute("type", "text");
  passLogInpt.setAttribute("id", "pass");
  passLogInpt.addEventListener("blur", function(ev){
    setAcctPass();
  });
  $logInfoDiv.appendChild(passLogInpt);
  
  $lgHd.appendChild($logInfoDiv);
};

var renderLoginButtons = function(){
  var $logHdr = document.getElementById("login");
  var $buttDiv = document.createElement("div");
  $buttDiv.classList.add("screenButtons");
  
  var $loginButton = document.createElement("button");
  $loginButton.setAttribute("type", "button");
  $loginButton.setAttribute("id", "loginSubmit");
  $loginButton.innerHTML = "Login";
  $loginButton.addEventListener("click", function(ev){
    loginSubmission();
  });
  $buttDiv.appendChild($loginButton);
  
   var $forgotPassButton = document.createElement("button");
  $forgotPassButton.setAttribute("type", "button");
  $forgotPassButton.setAttribute("id", "passForgotten");
  $forgotPassButton.innerHTML = "Forgot Your Password";
  $forgotPassButton.addEventListener("click", function(ev){
    showPasswordResetScreen();
  });
  $buttDiv.appendChild($forgotPassButton);
  
   var $homeReturnButton = document.createElement("button");
  $homeReturnButton.setAttribute("type", "button");
  $homeReturnButton.setAttribute("id", "loginHomeReturn");
  $homeReturnButton.innerHTML = "Return to Home Screen";
  $homeReturnButton.addEventListener("click", function(ev){
    showHomePageScreen();
  });
  $buttDiv.appendChild($homeReturnButton);
  
  $logHdr.appendChild($buttDiv);
};

var passwordVerification = function(passAct){
  if (passAct == acctPass){
    localStorage.setItem("user",acctUser);
    showLoginHomeScreen();
  } else {
    alert("The password does not match!")
  }
};

var loggingIn = function(){
  var userActPass = "";
  useDB.orderByChild("userName").equalTo(acctUser).on("child_added", function(snapshot) {
  userActPass = snapshot.val().password;
});
  passwordVerification(userActPass);
};

var loginSubmission = function(){
    clearLoginFields();
    loggingIn();
};
    
var loginStart = function(){
  renderLoginScreen();
  // document.getElementById("user").addEventListener("blur",setAcctUser);
  // document.getElementById("pass").addEventListener("blur",setAcctPass);
  // document.getElementById("loginSubmit").addEventListener("click",loginSubmission);

};

document.addEventListener('DOMContentLoaded',loginStart);