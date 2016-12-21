var adminUserUser = "";
var adminUserPass = "";
var adminNameChk= false;
var adminAcct = "";
var adminPass = "";
var adminDB = new Firebase("https://bowmanfamreun.firebaseio.com/Admin");

var strgClr = function(){
  localStorage.clear();
};

var setAdminUserPassword = function(){
  adminUserPass = document.getElementById("adminPass").value;
  console.log(adminUserPass);
};

var setAdminAcct = function(account){
  adminAcct = account;
};

var setAdminPass = function(pass){
  adminPass = pass;
  console.log(adminPass);
};

var setAdminNameChk = function(bool){
  if(bool == "true")
    adminNameChk = true;
  else
    adminNameChk = false;
};

var clearAdminLoginFields = function(){
  document.getElementById("adminUser").value = "";
  document.getElementById("adminPass").value = "";
};


var adminCheck = function(){
    adminDB.orderByChild("userName").equalTo(adminUserUser).on("value", function(snapshot) {
     console.log(snapshot.val());
      if (snapshot.val() == null){
        setAdminNameChk("false");
      } else {
        setAdminNameChk("true");
      }
      console.log(adminNameChk);
    });
};

var setAdminVariables = function(){
  // console.log(adminUserUser);
  // adminDB.orderByChild("userName").equalTo(adminUserUser).on("value", function (snapshot){
    
  //   console.log(snapshot.val());
  // })
  
  
  if(adminNameChk){
      adminDB.orderByChild("userName").equalTo(adminUserUser).on("value", function(snapshot) {
      console.log(snapshot.val());
      snapshot.forEach(function(snap){
          setAdminPass(snap.val().passWord);
          setAdminAcct(snap.val().userName);
      });
  });  
  } else {
    adminDB.orderByChild("email").equalTo(adminUserUser).on("value", function(childSnapshot) {
        console.log(childSnapshot.val());
        childSnapshot.forEach(function(child){
            setAdminPass(child.val().passWord);
            setAdminAcct(child.val().userName);
        });
      });
}
};

var setAdminUser = function(){
  adminUserUser = document.getElementById("adminUser").value;
  console.log(adminUserUser);
  adminCheck();
  console.log(adminNameChk);
  setAdminVariables();
  console.log(adminPass);
};

var adminPasswordVerification = function(){
  adminCheck();
  setAdminVariables();
  console.log(adminPass);
  console.log(adminUserPass);
  if (adminUserPass == adminPass){
    localStorage.setItem("admin",adminAcct);
    showAdminHomeScreen();
  } else {
    alert("Administrator Username and/or Password does not match!")
  }
};

var adminLoginSubmission = function(){
    clearAdminLoginFields();
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
  var $admLoginHeader = document.getElementById("adminLogin");
  var adminLogHeader = document.createElement("h1");
  adminLogHeader.innerHTML = "Administrator Login";
  $admLoginHeader.appendChild(adminLogHeader);
};

var renderAdminLoginUser = function(){
  var $adLogHead = document.getElementById("adminLogin");
  var $adUsLogDiv = document.createElement("div");
  
  var adminLogLbl = document.createElement("label");
  adminLogLbl.setAttribute("for", "admName");
  adminLogLbl.innerHTML = "Username: ";
  $adUsLogDiv.appendChild(adminLogLbl);
  
  var adminLogInpt = document.createElement("input");
  adminLogInpt.setAttribute("type", "text");
  adminLogInpt.setAttribute("id", "adminUser");
  adminLogInpt.addEventListener("blur", function(ev){
    setAdminUser();
  });
  $adUsLogDiv.appendChild(adminLogInpt);
  
  $adLogHead.appendChild($adUsLogDiv);
};

var renderAdminLoginPass = function(){
  var $adLgHd = document.getElementById("adminLogin");
  var $adLogDiv = document.createElement("div");
  
  var adminPassLogLbl = document.createElement("label");
  adminPassLogLbl.setAttribute("for", "admPass");
  adminPassLogLbl.innerHTML = "Password: ";
  $adLogDiv.appendChild(adminPassLogLbl);
  
  var adminPassLogInpt = document.createElement("input");
  adminPassLogInpt.setAttribute("type", "text");
  adminPassLogInpt.setAttribute("id", "adminPass");
  adminPassLogInpt.addEventListener("blur", function(ev){
    setAdminUserPassword();
  });
  $adLogDiv.appendChild(adminPassLogInpt);
  
  $adLgHd.appendChild($adLogDiv);
};

var renderAdminLoginButtons = function(){
  var $admLogHdr = document.getElementById("adminLogin");
  var $admButDiv = document.createElement("div");
  $admButDiv.classList.add("screenButtons");
  
  var $adminLoginButton = document.createElement("button");
  $adminLoginButton.setAttribute("type", "button");
  $adminLoginButton.setAttribute("id", "loginSubmit");
  $adminLoginButton.innerHTML = "Login";
  $adminLoginButton.addEventListener("click", function(ev){
    adminLoginSubmission();
  });
  $admButDiv.appendChild($adminLoginButton);
  
   var $forgotAdminPassButton = document.createElement("button");
  $forgotAdminPassButton.setAttribute("type", "button");
  $forgotAdminPassButton.setAttribute("id", "adminPassForgot");
  $forgotAdminPassButton.innerHTML = "Forgot Your Admin Password";
  $forgotAdminPassButton.addEventListener("click", function(ev){
    showAdminPasswordResetScreen();
  });
  $admButDiv.appendChild($forgotAdminPassButton);
  
   var $adminHomeReturnButton = document.createElement("button");
  $adminHomeReturnButton.setAttribute("type", "button");
  $adminHomeReturnButton.setAttribute("id", "admLoginHomeReturn");
  $adminHomeReturnButton.innerHTML = "Return to Login Screen";
  $adminHomeReturnButton.addEventListener("click", function(ev){
    showLoginScreen();
  });
  $admButDiv.appendChild($adminHomeReturnButton);
  
  $admLogHdr.appendChild($admButDiv);
};

var adminLoginStart = function(){
  strgClr();
  renderAdminLoginScreen();
};

document.addEventListener('DOMContentLoaded',adminLoginStart);