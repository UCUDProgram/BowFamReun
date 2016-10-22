var member = "";
var acctUser = "";
var acctPass = "";
var useDB = new Firebase("https://bowmanfamreun.firebaseio.com/Users");


var setAcctUser = function(){
  acctUser = document.getElementById("user").value;
  // console.log(acctUser);
  getUsers();
};

var setAcctPass = function(){
  acctPass = document.getElementById("pass").value;
};

var clearLoginFields = function(){
  document.getElementById("user").value = "";
  document.getElementById("pass").value = "";
};

var getUsers = function(){
   useDB.orderByChild("userName").equalTo(acctUser).on("value", function(snapshot) {
      var results = snapshot.val();
    if(results == null) {
      console.log("No Results Found")
    } else {
      console.log("Results Found");
    }
   });
};


var passwordVerification = function(passAct){
  if (passAct == acctPass){
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
  document.getElementById("user").addEventListener("blur",setAcctUser);
  document.getElementById("pass").addEventListener("blur",setAcctPass);
  document.getElementById("loginSubmit").addEventListener("click",loginSubmission);

};

document.addEventListener('DOMContentLoaded',loginStart);