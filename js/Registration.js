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
var formIncompleteErrorString = "";
var allEntered = false;
var entries = ["First Name", "Last Name", "Address", "City", "State", "Zip Code", "Email", "Phone Number", "Username", "Password", "Password Verify"];
var DB = new Firebase("https://bowmanfamreun.firebaseio.com/");
var useDB = new Firebase("https://bowmanfamreun.firebaseio.com/Users");

var clearData = function(){
  localStorage.clear(;)
};

var setFirstName = function(){
  uFirst = document.getElementById("fName").value;
  firstNameValidation();
  // console.log(entries);
};

var setLastName = function(){
  uLast = document.getElementById("lName").value;
  lastNameValidation();
  // console.log(entries);
};

var setAddress = function(){
  uAddress = document.getElementById("addr").value;  
  addressValidation();
  // console.log(entries);
};

var setCity = function(){
  uCity = document.getElementById("city").value;  
  cityValidation();
  // console.log(entries);
};

var setState = function(){
  uState = document.getElementById("state").value;
  stateValidation();
  // console.log(entries);
};

var setZip = function(){
  uZip = document.getElementById("zip").value;
  zipValidation();
  // console.log(entries);
};

var setEMail = function(){
  uEmail = document.getElementById("email").value;  
  emailValidation();
  // console.log(entries);
};

var setPhone = function(){
  uPhone = document.getElementById("phone").value;
  phoneValidation();
  // console.log(entries);
};

var setUser = function(){
  uUName = document.getElementById("uname").value;
  userValidation();
  // console.log(entries);
};

var setPassword = function(){
  uPass = document.getElementById("pword").value;
  passwordValidation();
  // console.log(entries);
};

var setPassVer = function(){
  uPassVer = document.getElementById("pword_Verify").value;
  passVerValidation();
    // console.log(entries);
};

var firstNameValidation = function(){
  var firstString = "First Name";
  entriesUpdate(uFirst, firstString);
};

var lastNameValidation = function(){
  var lastString = "Last Name";
  entriesUpdate(uLast, lastString);
};

var addressValidation = function(){
  var addressString = "Address";
  entriesUpdate(uAddress, addressString);
};

var cityValidation = function(){
  var cityString = "City";
  entriesUpdate(uCity,cityString);
};

var stateValidation = function(){
  var stateString = "State";
  entriesUpdate(uState, stateString);
};

var zipValidation = function(){
  var zipString = "Zip Code";
  entriesUpdate(uZip, zipString);
};

var emailValidation = function(){
  var emailString = "Email";
  entriesUpdate(uEmail,emailString)
};

var phoneValidation = function(){
  var phoneString = "Phone Number";
  entriesUpdate(uPhone,phoneString);
};

var userValidation = function(){
  var userString = "Username";
  entriesUpdate(uUName,userString);
};

var passwordValidation = function(){
  var passString = "Password";
  entriesUpdate(uPass, passString);
};

var passVerValidation = function(){
  var passVerString = "Password Verify";
  entriesUpdate(uPassVer, passVerString);
};

var formErrorString = function(){
  formIncompleteErrorString = "The following fields are not set: ";
  entries.forEach(function(aValue){
    formIncompleteErrorString += aValue;
    formIncompleteErrorString += ", ";
  });
  formIncompleteErrorString += "."
};

var entriesUpdate = function(variable, varStr){
  if (variable == ""){
    var varIndex = entries.indexOf(varStr);
    if (varIndex == -1)
      entries.push(varStr);
  } else {
    var strInd = entries.indexOf(varStr);
    entries.splice(strInd,1);
  }
};

var completeRegistration = function(){
  if (entries.length == 0){
    allEntered = true;
  }
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
  completeRegistration();
  if(allEntered){
    pushAccountData();
    pushUsersData();
    alert("Thank You for Registering.  You can now login to your account.");
    clearInputFields();
    showHomePageScreen();
  } else{
    formErrorString();
    displayIncompleteForm();
  }
};



//  RENDERING THE SCREEN (VIEW)
var renderRegistrationScreen = function(){
  renderHeader();
  renderPersonInfo();
  renderUserInfo();
  renderRegNavButtons();
};

var displayIncompleteForm = function(){
  alert(formIncompleteErrorString);
}

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
  var source = document.getElementById("signup");
  var pDiv = document.getElementById("regInfo");
  var $row1div = document.createElement("div");
  $row1div.classList.add("row_block");
  
  var fNamediv = document.createElement("div");
  fNamediv.classList.add("individual_block_first");
  
  var fnameLab = document.createElement("label")
  fnameLab.setAttribute("for", "fName");
  fnameLab.innerHTML = "First Name: ";
  fNamediv.appendChild(fnameLab);
  
  var fnameIpt = document.createElement("input");
  fnameIpt.setAttribute("type", "text");
  fnameIpt.setAttribute("id", "fName");
  fnameIpt.addEventListener("blur", function(ev){
    setFirstName();
  });
  fNamediv.appendChild(fnameIpt);
   $row1div.appendChild(fNamediv);
  
   var lNamediv = document.createElement("div");
  lNamediv.classList.add("individual_block");
  
  var lnameLab = document.createElement("label")
  lnameLab.setAttribute("for", "lName");
  lnameLab.innerHTML = "Last Name: ";
  lNamediv.appendChild(lnameLab);
  
  var lnameIpt = document.createElement("input");
  lnameIpt.setAttribute("type", "text");
  lnameIpt.setAttribute("id", "lName");
  lnameIpt.addEventListener("blur", function(ev){
    setLastName();
  });
  lNamediv.appendChild(lnameIpt);
  
   $row1div.appendChild(lNamediv);
 
  pDiv.appendChild($row1div);
  source.appendChild(pDiv);
};

var renderPersonRow2 = function(){
  var $signSource = document.getElementById("signup");
  var $addrDiv = document.getElementById("regInfo");
  var $row2div = document.createElement("div");
  $row2div.classList.add("row_block");
  
  var addDiv = document.createElement("div");
  var addrLbl = document.createElement("label");
  addrLbl.setAttribute("for", "addr");
  addrLbl.innerHTML = "Address: ";
  addDiv.appendChild(addrLbl);
  
  var addrIpt = document.createElement("input");
  addrIpt.setAttribute("type", "text");
  addrIpt.setAttribute("id", "addr");
  addrIpt.addEventListener("blur", function(ev){
    setAddress();
  });
  
  addDiv.appendChild(addrIpt);
  $row2div.appendChild(addDiv);
  $addrDiv.appendChild($row2div);
  $signSource.appendChild($addrDiv);
};

var renderPersonRow3 = function(){
  var $source = document.getElementById("signup");
  var $div = document.getElementById("regInfo");
  var $row3div = document.createElement("div");
  $row3div.classList.add("row_block");
  
  var citydiv = document.createElement("div");
  citydiv.classList.add("individual_block_first");
  
  var cityLab = document.createElement("label")
  cityLab.setAttribute("for", "city");
  cityLab.innerHTML = "City: ";
  citydiv.appendChild(cityLab);
  
  var cityIpt = document.createElement("input");
  cityIpt.setAttribute("type", "text");
  cityIpt.setAttribute("id", "city");
  cityIpt.addEventListener("blur", function(ev){
    setCity();
  });
  citydiv.appendChild(cityIpt);
   $row3div.appendChild(citydiv);
  
   var statediv = document.createElement("div");
  statediv.classList.add("individual_block");
  
  var stateLab = document.createElement("label")
  stateLab.setAttribute("for", "state");
  stateLab.innerHTML = "State: ";
  statediv.appendChild(stateLab);
  
  var stateIpt = document.createElement("input");
  stateIpt.setAttribute("type", "text");
  stateIpt.setAttribute("size","4");
  stateIpt.setAttribute("id", "state");
  stateIpt.addEventListener("blur", function(ev){
    setState();
  });
  statediv.appendChild(stateIpt);
   $row3div.appendChild(statediv);
 
 var zipdiv = document.createElement("div");
  zipdiv.classList.add("individual_block");
  
  var zipLab = document.createElement("label")
  zipLab.setAttribute("for", "zip");
  zipLab.innerHTML = "ZipCode: ";
  zipdiv.appendChild(zipLab);
  
  var zipIpt = document.createElement("input");
  zipIpt.setAttribute("type", "text");
  zipIpt.setAttribute("size","7");
  zipIpt.setAttribute("id", "zip");
  zipIpt.addEventListener("blur", function(ev){
    setZip();
  });
  zipdiv.appendChild(zipIpt);
  $row3div.appendChild(zipdiv);
   
  $div.appendChild($row3div);
  $source.appendChild($div);
};

var renderPersonRow4 = function(){
  var $source = document.getElementById("signup");
  var $div = document.getElementById("regInfo");
  var $row4div = document.createElement("div");
  $row4div.classList.add("row_block");
  
  var emaildiv = document.createElement("div");
  emaildiv.classList.add("individual_block_first");
  
  var emailLab = document.createElement("label")
  emailLab.setAttribute("for", "email");
  emailLab.innerHTML = "Email: ";
  emaildiv.appendChild(emailLab);
  
  var emailIpt = document.createElement("input");
  emailIpt.setAttribute("type", "email");
  emailIpt.setAttribute("id", "email");
  emailIpt.addEventListener("blur", function(ev){
    setEMail();
  });
  emaildiv.appendChild(emailIpt);
   $row4div.appendChild(emaildiv);
  
   var phonediv = document.createElement("div");
  phonediv.classList.add("individual_block");
  
  var phoneLab = document.createElement("label")
  phoneLab.setAttribute("for", "phone");
  phoneLab.innerHTML = "Phone Number: ";
  phonediv.appendChild(phoneLab);
  
  var phoneIpt = document.createElement("input");
  phoneIpt.setAttribute("type", "text");
  phoneIpt.setAttribute("id", "phone");
  phoneIpt.addEventListener("blur", function(ev){
    setPhone();
  });
  phonediv.appendChild(phoneIpt);
  
   $row4div.appendChild(phonediv);
 
  $div.appendChild($row4div);
  $source.appendChild($div);
};

var renderUserInfo = function(){
  renderUserRow();
  renderPassRow();
  
};

var renderUserRow = function(){
   var $source = document.getElementById("signup");
  var $div = document.getElementById("regAcctInfo");
  var $row1div = document.createElement("div");
  $row1div.classList.add("row_block");
  
  var userNamediv = document.createElement("div");
  userNamediv.classList.add("individual_block_first");
  
  var userLab = document.createElement("label")
  userLab.setAttribute("for", "uname");
  userLab.innerHTML = "Username: ";
  userNamediv.appendChild(userLab);
  
  var userIpt = document.createElement("input");
  userIpt.setAttribute("type", "text");
  userIpt.setAttribute("id", "uname");
  userIpt.addEventListener("blur", function(ev){
    setUser();
  });
  userNamediv.appendChild(userIpt);
  $row1div.appendChild(userNamediv);
 
 var userChkdiv = document.createElement("div");
  userChkdiv.classList.add("individual_block");
 
 var userChkBut = document.createElement("button");
 userChkBut.setAttribute("type", "button");
 userChkBut.setAttribute("id", "userCheck");
 userChkBut.innerHTML = "Username Check";
 userChkBut.addEventListener("click", function(ev){
   
 });
 userChkdiv.appendChild(userChkBut);
  $row1div.appendChild(userChkdiv);
 
  $div.appendChild($row1div);
  $source.appendChild($div);
};

var renderPassRow = function(){
  var $source = document.getElementById("signup");
  var $div = document.getElementById("regAcctInfo");
  var $userRow1div = document.createElement("div");
  $userRow1div.classList.add("row_block");
  
  var userPassRegdiv = document.createElement("div");
  userPassRegdiv.classList.add("individual_block");
  
  
  var userPassRdiv = document.createElement("div");
  var userPassLab = document.createElement("label")
  userPassLab.setAttribute("for", "pword");
  userPassLab.innerHTML = "Password: ";
  userPassRdiv.appendChild(userPassLab);
  
  var userPassIpt = document.createElement("input");
  userPassIpt.setAttribute("type", "text");
  userPassIpt.setAttribute("id", "pword");
  userPassIpt.addEventListener("blur", function(ev){
    setPassword();
  });
  userPassRdiv.appendChild(userPassIpt);
  userPassRegdiv.appendChild(userPassRdiv);
  
  var userPassRVer = document.createElement("div");
  
  var userPassVLab = document.createElement("label")
  userPassVLab.setAttribute("for", "pword_Verify");
  userPassVLab.innerHTML = "Password Verify: ";
  userPassRVer.appendChild(userPassVLab);
  
  var userPassVIpt = document.createElement("input");
  userPassVIpt.setAttribute("type", "text");
  userPassVIpt.setAttribute("id", "pword_Verify");
  userPassVIpt.addEventListener("blur", function(ev){
    setPassVer();
  });
  userPassRVer.appendChild(userPassVIpt);
  userPassRegdiv.appendChild(userPassRVer);
  $userRow1div.appendChild(userPassRegdiv);
 
  
  var passButtDiv = document.createElement("div");
  passButtDiv.classList.add("individual_block");
  
  var userChkBut = document.createElement("button");
 userChkBut.setAttribute("type", "button");
 userChkBut.setAttribute("id", "passCheck");
 userChkBut.innerHTML = "Password Check";
 userChkBut.addEventListener("click", function(ev){
   
 });
 passButtDiv.appendChild(userChkBut);
  
  $userRow1div.appendChild(passButtDiv);
    $div.appendChild($userRow1div);
  $source.appendChild($div);
  
};


var renderRegNavButtons = function(){
  var $source = document.getElementById("signup");
  // var $div = document.getElementById("regAcctInfo");
  var regNavBut = document.createElement("div");
  regNavBut.classList.add("screenButtons");
  
   var regSubBut = document.createElement("button");
 regSubBut.setAttribute("type", "button");
 regSubBut.setAttribute("id", "acctSubmit");
 regSubBut.innerHTML = "Register";
 regSubBut.addEventListener("click", function(ev){
   registerAccount();
 });
 regNavBut.appendChild(regSubBut);
  
  
   var userChkBut = document.createElement("button");
 userChkBut.setAttribute("type", "button");
 userChkBut.setAttribute("id", "regHomeReturn");
 userChkBut.innerHTML = "Return to Home Screen";
 userChkBut.addEventListener("click", function(ev){
   showHomePageScreen();
 });
 regNavBut.appendChild(userChkBut);
  
  $source.appendChild(regNavBut);
};

var registerStart = function(){
  clearData();
  renderRegistrationScreen();
};

document.addEventListener('DOMContentLoaded',registerStart);