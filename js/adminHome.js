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
    adminHead.innerHTML= "Welcome Administer " + adminUser;
    div.appendChild(adminHead);
};

var renderAdminMembers = function(){
  var admMem = document.getElementById("adminMembers");
  
  var admHead = document.createElement("h1");
  admHead.innerHTML = "Membership Information";
  admMem.appendChild(admHead);
  
  var memDiv = document.createElement("div");
  
   var adminContactButton = document.createElement("button");
  adminContactButton.setAttribute("id","adminContactButton");
  adminContactButton.innerHTML = "Contact Information";
  adminContactButton.addEventListener("click",function(ev){
      showAdminContactsScreen();
  });
    memDiv.appendChild(adminContactButton);
    
     var adminAttendeesListButton = document.createElement("button");
  adminAttendeesListButton.setAttribute("id","adminAttendeesListButton");
  adminAttendeesListButton.innerHTML = "Attendees List";
  adminAttendeesListButton.addEventListener("click",function(ev){
      showAdminAttendeesListScreen();
  });
    memDiv.appendChild(adminAttendeesListButton);
    
    var adminAddNewMemberButton = document.createElement("button");
  adminAddNewMemberButton.setAttribute("id","adminAddNewMemberButton");
  adminAddNewMemberButton.innerHTML = "Add a New Member's Information";
  adminAddNewMemberButton.addEventListener("click",function(ev){
      showAdminNewMemberInputScreen();
  });
    memDiv.appendChild(adminAddNewMemberButton);
    
    var adminPaymentUpdateButton = document.createElement("button");
  adminPaymentUpdateButton.setAttribute("id","adminPaymentUpdateButton");
  adminPaymentUpdateButton.innerHTML = "Update a Member's Payment Record";
  adminPaymentUpdateButton.addEventListener("click",function(ev){
      showAdminPaymentUpdateScreen();
  });
    memDiv.appendChild(adminPaymentUpdateButton);

 var adminSearchButton = document.createElement("button");
  adminSearchButton.setAttribute("id","adminSearchButton");
  adminSearchButton.innerHTML = "Search Member Records";
  adminSearchButton.addEventListener("click",function(ev){
      showAdminSearchScreen();
  });
    memDiv.appendChild(adminSearchButton);

  admMem.appendChild(memDiv);
};

var renderAdminReports = function(){
  
  var admRpt = document.getElementById("adminReports");
  
  var rptHead = document.createElement("h1");
  rptHead.innerHTML = "Reports";
  admRpt.appendChild(rptHead);
  
  var rptDiv = document.createElement("div");
  
    var adminTShirtButton = document.createElement("button");
  adminTShirtButton.setAttribute("id","adminTShirtsButton");
  adminTShirtButton.innerHTML = "T-Shirt Ordering Total";
  adminTShirtButton.addEventListener("click",function(ev){
      showAdminShirtsScreen();
  });
    rptDiv.appendChild(adminTShirtButton);
    
    var adminAttendeesButton = document.createElement("button");
  adminAttendeesButton.setAttribute("id","adminAttendeesButton");
  adminAttendeesButton.innerHTML = "Attendees Total";
  adminAttendeesButton.addEventListener("click",function(ev){
      showAdminAttendeesScreen();
  });
    rptDiv.appendChild(adminAttendeesButton);
  
   var adminRegReportButton = document.createElement("button");
  adminRegReportButton.setAttribute("id","adminRegistrationReportButton");
  adminRegReportButton.innerHTML = "Registration Report";
  adminRegReportButton.addEventListener("click",function(ev){
      showAdminRegistrationReportScreen();
  });
    rptDiv.appendChild(adminRegReportButton);
  
   var adminAttendRegLstButton = document.createElement("button");
  adminAttendRegLstButton.setAttribute("id","adminAttendRegLstButton");
  adminAttendRegLstButton.innerHTML = "Attendees Report";
  adminAttendRegLstButton.addEventListener("click",function(ev){
      showAdminAttendRptScreen();
  });
    rptDiv.appendChild(adminAttendRegLstButton);
  
  var adminExpensesButton = document.createElement("button");
  adminExpensesButton.setAttribute("id","adminExpensesButton");
  adminExpensesButton.innerHTML = "Expense Report";
  adminExpensesButton.addEventListener("click",function(ev){
      showAdminExpenseScreen();
  });
    rptDiv.appendChild(adminExpensesButton);
  
      var adminShirtReportButton = document.createElement("button");
  adminShirtReportButton.setAttribute("id","adminShirtReportButton");
  adminShirtReportButton.innerHTML = "Shirt Report";
  adminShirtReportButton.addEventListener("click",function(ev){
      showAdminShirtReportScreen();
  });
    rptDiv.appendChild(adminShirtReportButton);
  admRpt.appendChild(rptDiv);
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
    renderAdminLogoutButton();
    renderAdminMembers();
    renderAdminReports();
};

document.addEventListener('DOMContentLoaded', adminHomeStart);