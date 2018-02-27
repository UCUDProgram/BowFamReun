var adminUser = "";

var getAdministrator = function(){
    adminUser = localStorage.getItem("admin");
    if (adminUser == null){
        showAdminLoginScreen();
    }
    if(adminUser != "LawAdmin"){
        alert("This website is in Archive mode. Your account has been permanently disabled.");
        showHomePageScreen();
    }
};

// RENDERING THE SCREEN (VIEW)
var renderAdminHomePage = function(){
     renderAdminHeader();
     renderAdminLogoutButton();
     renderAdminContactInfo();
     renderAdminMembers();
     renderAdminTotals();
     renderAdminReports();
};

var renderAdminHeader = function(){
    var div = document.getElementById("adminHeader");
    var adminHead = document.createElement("h1");
    adminHead.classList.add("individual_block_first");
    adminHead.innerHTML= "Welcome Administer " + adminUser;
    div.appendChild(adminHead);
};

var renderAdminContactInfo = function(){
     var contMem = document.getElementById("adminContacts");
  
    var contHead = document.createElement("h1");
    contHead.innerHTML = "Contact Information";
    contMem.appendChild(contHead);
  
    var contDiv = document.createElement("div");

     var adminContactButton = document.createElement("button");
    adminContactButton.setAttribute("id","adminContactButton");
    adminContactButton.innerHTML = "Contact Information";
    adminContactButton.addEventListener("click",function(ev){
      showAdminContactsScreen();
    });
    contDiv.appendChild(adminContactButton);
    
    var adminMailingListButton = document.createElement("button");
    adminMailingListButton.setAttribute("id","adminMailingListButton");
    adminMailingListButton.innerHTML = "Mailing List";
    adminMailingListButton.addEventListener("click",function(ev){
      showAdminMailingListScreen();
    });
    contDiv.appendChild(adminMailingListButton);
    
    var adminCommitteeButton = document.createElement("button");
    adminCommitteeButton.setAttribute("id","adminCommitteeButton");
    adminCommitteeButton.innerHTML = "Committee Members";
    adminCommitteeButton.addEventListener("click",function(ev){
      showAdminCommitteeScreen();
    });
    contDiv.appendChild(adminCommitteeButton);
    
    contMem.appendChild(contDiv);
};

var renderAdminMembers = function(){
    var admMem = document.getElementById("adminMembers");
  
    var admHead = document.createElement("h1");
    admHead.innerHTML = "Membership Information";
    admMem.appendChild(admHead);
  
    var memDiv = document.createElement("div");
  
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

     var adminShirtOrderButton = document.createElement("button");
    adminShirtOrderButton.setAttribute("id","adminShirtOrderButton");
    adminShirtOrderButton.innerHTML = "Shirt Orders";
    adminShirtOrderButton.addEventListener("click",function(ev){
      showAdminShirtOrderingScreen();
    });
    memDiv.appendChild(adminShirtOrderButton);
    
    admMem.appendChild(memDiv);
};

var renderAdminTotals = function(){
    var admTot = document.getElementById("adminTotals");
  
    var totHead = document.createElement("h1");
    totHead.innerHTML = "Totals/Counts";
    admTot.appendChild(totHead);
  
    var totDiv = document.createElement("div");
  
    var adminTShirtButton = document.createElement("button");
    adminTShirtButton.setAttribute("id","adminTShirtsButton");
    adminTShirtButton.innerHTML = "T-Shirt Ordering Total";
    adminTShirtButton.addEventListener("click",function(ev){
      showAdminShirtsScreen();
    });
    totDiv.appendChild(adminTShirtButton);
    
    var adminAttendeesButton = document.createElement("button");
    adminAttendeesButton.setAttribute("id","adminAttendeesButton");
    adminAttendeesButton.innerHTML = "Attendees Total";
    adminAttendeesButton.addEventListener("click",function(ev){
      showAdminAttendeesScreen();
    });
    totDiv.appendChild(adminAttendeesButton);
    admTot.appendChild(totDiv);
};

var renderAdminReports = function(){
  
    var admRpt = document.getElementById("adminReports");
  
    var rptHead = document.createElement("h1");
    rptHead.innerHTML = "Reports";
    admRpt.appendChild(rptHead);
  
    var rptDiv = document.createElement("div");
  
    var adminRegReportButton = document.createElement("button");
    adminRegReportButton.setAttribute("id","adminRegistrationReportButton");
    adminRegReportButton.innerHTML = "Registration Report";
    adminRegReportButton.addEventListener("click",function(ev){
      showAdminRegistrationReportScreen();
    });
    rptDiv.appendChild(adminRegReportButton);
  
    var adminAttendeeRegistrationtListButton = document.createElement("button");
    adminAttendeeRegistrationtListButton.setAttribute("id","adminAttendeeRegistrationtListButton");
    adminAttendeeRegistrationtListButton.innerHTML = "Attendees Report";
    adminAttendeeRegistrationtListButton.addEventListener("click",function(ev){
      showAdminAttendRptScreen();
    });
    rptDiv.appendChild(adminAttendeeRegistrationtListButton);
  
    var adminRevenueButton = document.createElement("button");
    adminRevenueButton.setAttribute("id","adminRevenueButton");
    adminRevenueButton.innerHTML = "Revenue Report";
    adminRevenueButton.addEventListener("click",function(ev){
      showAdminRevenueScreen();
    });
    rptDiv.appendChild(adminRevenueButton);
    
    var adminExpenseButton = document.createElement("button");
    adminExpenseButton.setAttribute("id","adminExpenseButton");
    adminExpenseButton.innerHTML = "Expense Report";
    adminExpenseButton.addEventListener("click",function(ev){
      showAdminExpenseScreen();
    });
    rptDiv.appendChild(adminExpenseButton);
    
  
  var adminExpensePurchaseButton = document.createElement("button");
    adminExpensePurchaseButton.setAttribute("id","adminExpensePurchaseButton");
    adminExpensePurchaseButton.innerHTML = "Expense Purchase Submission";
    adminExpensePurchaseButton.addEventListener("click",function(ev){
      showAdminExpensePurchaseScreen();
    });
    rptDiv.appendChild(adminExpensePurchaseButton);
  
    var adminShirtReportButton = document.createElement("button");
    adminShirtReportButton.setAttribute("id","adminShirtReportButton");
    adminShirtReportButton.innerHTML = "Shirt Report";
    adminShirtReportButton.addEventListener("click",function(ev){
      showAdminShirtReportScreen();
    });
    rptDiv.appendChild(adminShirtReportButton);
    
    var adminAncestryRptButton = document.createElement("button");
    adminAncestryRptButton.setAttribute("id","adminAncestryRptButton");
    adminAncestryRptButton.innerHTML = "Ancestry Report Requests";
    adminAncestryRptButton.addEventListener("click",function(ev){
      showAdminAncestryRptScreen();
    });
    rptDiv.appendChild(adminAncestryRptButton);
    
    admRpt.appendChild(rptDiv);
};

var renderAdminLogoutButton = function(){
    var logDiv = document.getElementById("adminHeader");
    
    var adminLogoutButton = document.createElement("button");
    adminLogoutButton.classList.add("individual_block");
    adminLogoutButton.setAttribute("id","adminLogOutButton");
    adminLogoutButton.innerHTML = "Logout";
    adminLogoutButton.addEventListener("click",function(ev){
        localStorage.clear();
        showHomePageScreen();
    });
    logDiv.appendChild(adminLogoutButton);  
};

var adminHomeStart = function(){
    getAdministrator();
    renderAdminHomePage();
};

document.addEventListener('DOMContentLoaded', adminHomeStart);