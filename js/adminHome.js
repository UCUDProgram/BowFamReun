var adminUser = "";

var getAdministrator = function(){
    adminUser = localStorage.getItem("admin");
    if (adminUser == null){
        showAdminLoginScreen();
    }
};

// RENDERING THE SCREEN (VIEW)
var renderAdminHeader = function(){
    var div = document.getElementById("adminHeader");
    var adminHead = document.createElement("h1");
    
    // adminHead.innerHTML= "Welcome Administer";
    adminHead.innerHTML= "Welcome Administer " + adminUser;
    
    div.appendChild(adminHead);
};

var renderAdminNavigationButtons = function(){
    var adminNav = document.getElementById("adminNavigation");
    
    var adminContactButton = document.createElement("button");
  adminContactButton.setAttribute("id","adminContactButton");
  adminContactButton.innerHTML = "Contact Information";
  adminContactButton.addEventListener("click",function(ev){
      window.location.href = "adminContacts.html";
  });
    adminNav.appendChild(adminContactButton);
    
    
    var adminTShirtButton = document.createElement("button");
  adminTShirtButton.setAttribute("id","adminTShirtsButton");
  adminTShirtButton.innerHTML = "T-Shirt Ordering Total";
  adminTShirtButton.addEventListener("click",function(ev){
      window.location.href = "adminShirts.html";
  });
    adminNav.appendChild(adminTShirtButton);
    
    
};

var renderAdminLogoutButton = function(){
    var logDiv = document.getElementById("adminLogout");
    var adminLogoutButton = document.createElement("button");
  adminLogoutButton.setAttribute("id","adminLogOutButton");
  adminLogoutButton.innerHTML = "Logout";
  adminLogoutButton.addEventListener("click",function(ev){
        localStorage.clear();
      window.location.href = "index.html";
  });
    logDiv.appendChild(adminLogoutButton);  
};

var adminHomeStart = function(){
    getAdministrator();
    renderAdminHeader();
    renderAdminNavigationButtons();
    renderAdminLogoutButton();
};

document.addEventListener('DOMContentLoaded', adminHomeStart);