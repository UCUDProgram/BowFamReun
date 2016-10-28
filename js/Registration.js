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
var DB = new Firebase("https://bowmanfamreun.firebaseio.com/");
var useDB = new Firebase("https://bowmanfamreun.firebaseio.com/Users");

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

var clearInputFields = function(){
    document.getElementById("fName").value = "";
    document.getElementById("lName").value = "";
    document.getElementById("addr").value = "";
    document.getElementById("city").value = "";
    document.getElementById("state").value = "";
    document.getElementById("zip").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("uname").value = "";
    document.getElementById("pword").value = "";
    document.getElementById("pword_Verify").value = "";

};

var validUserCheck = function(){
   useDB.orderByChild("userName").equalTo(uUName).on("value", function(snapshot) {
    var results = snapshot.val();
    if(results == null) {
      console.log("No Results Found")
      alert("Username is acceptable")
    } else {
      console.log(results.key);
      console.log("Results Found");
      alert("Username exists.  Choose a different Username");
    }
    
   });
};


var pushAccountData = function(){
  var regData = DB.child("Accounts");
  regData.push().set({firstname: uFirst, 
                      lastname: uLast,
                      address: uAddress,
                      city: uCity,
                      state: uState,
                      zip: uZip,
                      email: uEmail,
                      phone: uPhone,
                      userName: uUName
  });
};

var pushUsersData = function(){
  var regData = DB.child("Users");
  regData.push().set({userName: uUName,
                      password: uPass,
                      email:uEmail
  });
};

// var userNameCheck = function(){
  
//     alert("Thank You for Checking if Your Username is acceptable");
// };

var userPasswordCheck = function(){
  if(uPass != uPassVer){
    alert("The two passwords do not match");
  } else{
    
    alert("Thank You for checking to see if your Password is acceptable");
  }
};

var registerAccount = function(){
    var regCont = false;
    
    if(regCont){
    pushAccountData();
    pushUsersData();
    alert("Thank You for Registering.  You can now login to your account.");
    clearInputFields();
    showHomePageScreen();
    } else {
      showSignUpScreen
    }
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
    
    document.getElementById("userCheck").addEventListener("click",validUserCheck);
    document.getElementById("passCheck").addEventListener("click",userPasswordCheck);
    document.getElementById("acctSubmit").addEventListener("click",registerAccount);
};

document.addEventListener('DOMContentLoaded',registerStart);