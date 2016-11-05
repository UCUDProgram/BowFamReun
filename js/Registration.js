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
      alert("Username is acceptable")
    } else {
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


var userPasswordCheck = function(){
  if(uPass != uPassVer){
    alert("The two passwords do not match");
  } else{
    
    alert("Thank You for checking to see if your Password is acceptable");
  }
};

var registerAccount = function(){
    // var regCont = false;
    
    // if(regCont){
    pushAccountData();
    pushUsersData();
    alert("Thank You for Registering.  You can now login to your account.");
    clearInputFields();
    showHomePageScreen();
    // } else {
    //   showSignUpScreen
    // }
};

var renderRegistrationScreen = function(){
  renderHeader();
  renderPersonInfo();
  renderUserInfo();
};

var renderHeader = function(){
  var $div = document.getElementById("signup");
  var $head = document.createElement("h1");
  $head.innerHTML = "Registration for a Free Account";
  $div.appendChild($head);
};

var renderPersonInfo = function(){
  renderPersonRow1();
  renderPersonRow2();
  renderPersonRow3();
  renderPersonRow4();
};

var renderPersonRow1 = function(){
  var $div = document.getElementById("regInfo");
  var $row1div = document.createElement("div");
  var fNamediv = document.createElement("div");
  var fnameLab = document.createElement("label")
  fnameLab.setAttribute("for", "fName");
  // fnameLab.setAttribute("")
  
  $div.appendChild($row1div);
  
};

var renderPersonRow2 = function(){
  
};

var renderPersonRow3 = function(){
  
};

var renderPersonRow4 = function(){
  
};

var renderUserInfo = function(){
  renderUserRow();
  renderPassRow();
  
};

var renderUserRow = function(){
  
};

var renderPassRow = function(){
  
};


var registerStart = function(){
    // renderRegistrationScreen();

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