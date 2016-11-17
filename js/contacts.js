var DB = new Firebase("https://bowmanfamreun.firebaseio.com/Accounts");


var getContactList = function(){
    DB.orderByChild().equalTo().on("value", function(snapshot){
        snapshot.forEach(function (childSnapshot){
            var aFirst = childSnapshot.val().firstname;
            var aLast = childSnapshot.val().lastname;
            var aAddress = childSnapshot.val().address;
            var aCity = childSnapshot.val().city;
            var aState = childSnapshot.val().state;
            var aZip = childSnapshot.val().zip;
            var aPhone = childSnapshot.val().phone;
            var aEmail = childSnapshot.val().email;
            renderUser(aFirst,aLast,aAddress,aCity,aState,aZip,aPhone,aEmail);
        });
    });
};


// RENDERING THE SCREEN (VIEW)
var renderContactHeader = function(){
    
};


var renderUser = function(first,last,addr,city,state,zip,phone,email){
    
    var contactDiv = document.createElement("div");
    
    renderUserFirstName(first);
    renderUserLastName(last);
    renderUserAddress(addr);
    renderUserCity(city);
    renderUserState(state);
    renderUserZip(zip);
    renderUserPhone(phone);
    renderUserEmail(email);
};

var renderUserFirstName = function(perFirst){
    
};

var renderUserLastName = function(perLast){
    
};

var renderUserAddress = function(perAddr){
    
};

var renderUserCity = function(perCity){
    
};

var renderUserState = function(perState){
    
};

var renderUserZip = function(perZip){
    
};

var renderUserPhone = function(perPhone){
    
};

var renderUserEmail = function(perEmail){
    
};

var contactStart = function(){
    
};

document.addEventListener('DOMContentLoaded', contactStart);