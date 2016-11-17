var adminUserUser = "";
var adminUserPass = "";
var adminNameChk= false;
var adminAcct = "";
var adminPass = "";

var useDB = new Firebase("https://bowmanfamreun.firebaseio.com/Admin");

var setAdminUser = function(){
  adminUserUser = document.getElementById("adminUser").value;
  adminCheck();
  setAdminVariables();
};

var setAdminPass = function(){
  adminUserPass = document.getElementById("adminPass").value;
};

var setAdminAcct = function(account){
  adminAcct = account;
};

var setAdminPass = function(pass){
  adminPass = pass;
};

var setAdminNameChk = function(bool){
  if(bool == "true")
    adminNameChk = true;
  else
    adminNameChk = false;
};

var clearLoginFields = function(){
  document.getElementById("adminUser").value = "";
  document.getElementById("adminPass").value = "";
};


var adminCheck = function(){
    useDB.orderByChild("userName").equalTo(adminUserUser).on("value", function(snapshot) {
      if (snapshot.val() == null){
        setAdminNameChk("false");
      } else {
        setAdminNameChk("true");
      }
    });
};

var setAdminVariables = function(){
  if(adminNameChk){
      useDB.orderByChild("userName").equalTo(adminUserUser).on("value", function(snapshot) {
      snapshot.forEach(function(snap){
          setAdminPass(snap.val().password);
          setAdminAcct(snap.val().userName);
      });
  });  
  } else {
  useDB.orderByChild("email").equalTo(adminUserUser).on("value", function(childSnapshot) {
        childSnapshot.forEach(function(child){
            setAdminPass(child.val().password);
            setAdminAcct(child.val().userName);
        });
      });
}
};

var adminPasswordVerification = function(){
  if (adminUserPass == adminPass){
    localStorage.setItem("admin",adminAcct);
    showAdminLoginHomeScreen();
  } else {
    alert("Administrator Username and/or Password does not match!")
  }
};

var loginSubmission = function(){
    clearLoginFields();
    adminPasswordVerification();
};

// RENDERING THE SCREEN (VIEW)
var renderAdminLoginScreen = function(){
  renderAdminLoginHeader();
  renderAdminLoginUser();
  renderAdminLoginPass();
  renderAdminLoginButtons();
};

var renderAdminLoginHeader = function(){
  var $loginHeader = document.getElementById("adminLogin");
  var logHeader = document.createElement("h1");
  logHeader.innerHTML = "Administrator Login";
  $loginHeader.appendChild(logHeader);
};

var renderAdminLoginUser = function(){
  var $logHead = document.getElementById("adminLogin");
  var $logInfDiv = document.createElement("div");
  
  var userLogLbl = document.createElement("label");
  userLogLbl.setAttribute("for", "uname");
  userLogLbl.innerHTML = "Username: ";
  $logInfDiv.appendChild(userLogLbl);
  
  var userLogInpt = document.createElement("input");
  userLogInpt.setAttribute("type", "text");
  userLogInpt.setAttribute("id", "adminUser");
  userLogInpt.addEventListener("blur", function(ev){
    setAdminUser();
  });
  $logInfDiv.appendChild(userLogInpt);
  
  $logHead.appendChild($logInfDiv);
};

var renderAdminLoginPass = function(){
  var $lgHd = document.getElementById("adminLogin");
  var $logInfoDiv = document.createElement("div");
  
  var passLogLbl = document.createElement("label");
  passLogLbl.setAttribute("for", "upass");
  passLogLbl.innerHTML = "Password: ";
  $logInfoDiv.appendChild(passLogLbl);
  
  var passLogInpt = document.createElement("input");
  passLogInpt.setAttribute("type", "text");
  passLogInpt.setAttribute("id", "adminPass");
  passLogInpt.addEventListener("blur", function(ev){
    setAdminPass();
  });
  $logInfoDiv.appendChild(passLogInpt);
  
  $lgHd.appendChild($logInfoDiv);
};

var renderAdminLoginButtons = function(){
  var $logHdr = document.getElementById("adminLogin");
  var $butDiv = document.createElement("div");
  $butDiv.classList.add("screenButtons");
  
  var $adminLoginButton = document.createElement("button");
  $adminLoginButton.setAttribute("type", "button");
  $adminLoginButton.setAttribute("id", "loginSubmit");
  $adminLoginButton.innerHTML = "Login";
  $adminLoginButton.addEventListener("click", function(ev){
    loginSubmission();
  });
  $butDiv.appendChild($adminLoginButton);
  
   var $forgotAdminPassButton = document.createElement("button");
  $forgotAdminPassButton.setAttribute("type", "button");
  $forgotAdminPassButton.setAttribute("id", "passForgotten");
  $forgotAdminPassButton.innerHTML = "Forgot Your Admin Password";
  $forgotAdminPassButton.addEventListener("click", function(ev){
    showPasswordResetScreen();
  });
  $butDiv.appendChild($forgotAdminPassButton);
  
   var $homeReturnButton = document.createElement("button");
  $homeReturnButton.setAttribute("type", "button");
  $homeReturnButton.setAttribute("id", "loginHomeReturn");
  $homeReturnButton.innerHTML = "Return to Home Screen";
  $homeReturnButton.addEventListener("click", function(ev){
    showHomePageScreen();
  });
  $butDiv.appendChild($homeReturnButton);
  
  $logHdr.appendChild($butDiv);
};

var adminLoginStart = function(){
  renderAdminLoginScreen();
};

document.addEventListener('DOMContentLoaded',adminLoginStart);