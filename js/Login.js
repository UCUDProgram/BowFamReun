var acctUser = "";
var acctPass = "";
var userNameChk= false;
var userAcct = "";
var userPassword = "";

var useDB = new Firebase("https://bowmanfamreun.firebaseio.com/Users");
var emailDB = new Firebase("https://bowmanfamreun.firebaseio.com/Users");

var setAcctPass = function(){
  acctPass = document.getElementById("userPass").value;
  console.log(acctPass);
};

var setUserAcct = function(account){
  userAcct = account;
};

var setUserPass = function(pass){
  userPassword = pass;
};

var setUserNameChk = function(bool){
  if(bool == "true")
    userNameChk = true;
  else
    userNameChk = false;
};

var clearLoginFields = function(){
  document.getElementById("userUser").value = "";
  document.getElementById("userPass").value = "";
};

var userCheck = function(){
    useDB.orderByChild("userName").equalTo(acctUser).on("value", function(snapshot) {
      if (snapshot.val() == null){
        setUserNameChk("false");
      } else {
        setUserNameChk("true");
      }
    });
};

var setVariables = function(){
  if(userNameChk){
      useDB.orderByChild("userName").equalTo(acctUser).on("value", function(snapshot) {
      snapshot.forEach(function(snap){
          setUserPass(snap.val().password);
          setUserAcct(snap.val().userName);
      });
  });  
  } else {
  emailDB.orderByChild("email").equalTo(acctUser).on("value", function(childSnapshot) {
        childSnapshot.forEach(function(child){
            setUserPass(child.val().password);
            setUserAcct(child.val().userName);
        });
      });
}
};

var setAcctUser = function(){
  acctUser = document.getElementById("userUser").value;
  console.log(acctUser);
  
  userCheck();
  console.log(userNameChk);
  setVariables();
  console.log(userPassword);
};

var passwordUserVerification = function(){
  userCheck();
  // console.log(userNameChk);
  setVariables();
  
  if (userPassword == acctPass){
    localStorage.setItem("user",userAcct);
    showLoginHomeScreen();
  } else {
    alert("Username and/or Password does not match!")
  }
};

var loginSubmission = function(){
    clearLoginFields();
    passwordUserVerification();
};

// RENDERING THE SCREEN (VIEW)
var renderLoginScreen = function(){
  renderLoginHeader();
  renderLoginUser();
  renderLoginPass();
  renderLoginButtons();
};

var renderLoginHeader = function(){
  var $loginHeader = document.getElementById("login");
  var logHeader = document.createElement("h1");
  logHeader.innerHTML = "User Login";
  $loginHeader.appendChild(logHeader);
};

var renderLoginUser = function(){
  var $logHead = document.getElementById("login");
  var $logInfDiv = document.createElement("div");
  
  var userLogLbl = document.createElement("label");
  userLogLbl.setAttribute("for", "logName");
  userLogLbl.innerHTML = "Username: ";
  $logInfDiv.appendChild(userLogLbl);
  
  var userLogInpt = document.createElement("input");
  userLogInpt.setAttribute("type", "text");
  userLogInpt.setAttribute("id", "userUser");
  userLogInpt.addEventListener("blur", function(ev){
    setAcctUser();
  //   userCheck();
  // setVariables();
  // console.log(userPassword);
  });
  $logInfDiv.appendChild(userLogInpt);
  
  $logHead.appendChild($logInfDiv);
};

var renderLoginPass = function(){
  var $lgHd = document.getElementById("login");
  var $logInfoDiv = document.createElement("div");
  
  var passLogLbl = document.createElement("label");
  passLogLbl.setAttribute("for", "logPass");
  passLogLbl.innerHTML = "Password: ";
  $logInfoDiv.appendChild(passLogLbl);
  
  var passLogInpt = document.createElement("input");
  passLogInpt.setAttribute("type", "text");
  passLogInpt.setAttribute("id", "userPass");
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
  $loginButton.setAttribute("id", "loginSubmission");
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
  
  var $adminLoginButton = document.createElement("button");
  $adminLoginButton.setAttribute("type", "button");
  $adminLoginButton.setAttribute("id", "adminlogin");
  $adminLoginButton.innerHTML = "Administer login";
  $adminLoginButton.addEventListener("click", function(ev){
    showAdminLoginScreen();
  });
  $buttDiv.appendChild($adminLoginButton);
  
  
  
  
  $logHdr.appendChild($buttDiv);
};

var loginStart = function(){
  renderLoginScreen();
};

document.addEventListener('DOMContentLoaded',loginStart);