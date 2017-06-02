var admini = "";
var DB = new Firebase("https://bowmanfamreun.firebaseio.com/Accounts");

var getAdmin = function(){
    admini = localStorage.getItem("admin");
    if(admini == null){
        showAdminLoginScreen();
    }
};

var getContactList = function(){
    DB.orderByKey().on("value", function(snapshot){
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
var renderContactPage = function(){
    renderContactHeader();
    getContactList();
};

var renderContactHeader = function(){
    var cont = document.getElementById("contactHead");
    var contHead = document.createElement("h1");
    contHead.innerHTML = "Registered Users";
    cont.appendChild(contHead);
};


var renderUser = function(first,last,addr,city,state,zip,phone,email){
    var contactSource = document.getElementById("contactList");
    
    var contactDiv = document.createElement("div");
    var contactName = first + last + "Contact";
    contactDiv.setAttribute("id", contactName);
    contactDiv.classList.add("contactDivSpace");
    
    renderContactRow1(first, last, contactDiv);
    renderContactRow2(addr, contactDiv);
    renderContactRow3(city, state, zip, contactDiv);
    renderContactRow4(phone,email,contactDiv);
    
    contactSource.appendChild(contactDiv);
};

var renderContactRow1 = function(perFirst, perLast, source){
    var rowOne = document.createElement("div");
    
    var firstN = document.createElement("div");
    firstN.classList.add("individual_block_first");
    firstN.innerHTML = perFirst;
    rowOne.appendChild(firstN);
    
    var lastN = document.createElement("div");
    lastN.classList.add("individual_block");
    lastN.innerHTML = perLast;
    rowOne.appendChild(lastN);
    
    source.appendChild(rowOne);
};

var renderContactRow2 = function(perAddr, div){
    var rowTwo = document.createElement("div");
    
    var addrN = document.createElement("div");
    addrN.innerHTML = perAddr;
    rowTwo.appendChild(addrN);
    
    div.appendChild(rowTwo);
};

var renderContactRow3 = function(perCity, perState, perZip, aDiv){
    var rowThree = document.createElement("div");
    
    var cityN = document.createElement("div");
    cityN.classList.add("individual_block_first");
    cityN.innerHTML = perCity;
    rowThree.appendChild(cityN);
    
    var stateN = document.createElement("div");
    stateN.classList.add("individual_block");
    stateN.innerHTML = perState;
    rowThree.appendChild(stateN);
    
    var zipN = document.createElement("div");
    zipN.classList.add("individual_block");
    zipN.innerHTML = perZip;
    rowThree.appendChild(zipN);
    
    aDiv.appendChild(rowThree);
};

var renderContactRow4 = function(perPhone, perEmail, orig){
    var rowFour = document.createElement("div");
    
    var phoneN = document.createElement("div");
    phoneN.classList.add("individual_block_first");
    phoneN.innerHTML = perPhone;
    rowFour.appendChild(phoneN);
    
    var emailN = document.createElement("div");
    emailN.classList.add("individual_block");
    emailN.innerHTML = perEmail;
    rowFour.appendChild(emailN);

    orig.appendChild(rowFour);
};

var contactStart = function(){
    getAdmin();
    renderContactPage();
};

document.addEventListener('DOMContentLoaded', contactStart);