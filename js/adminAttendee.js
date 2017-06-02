var infantTotal=0;
var childTotal =0;
var adultTotal = 0;
var seniorTotal = 0;
var adminUse = "";
var attendeesDB = new Firebase("https://bowmanfamreun.firebaseio.com/Attendees");

var getAdministratorUser = function(){
    adminUse = localStorage.getItem("admin");
    if (adminUse == null){
        showAdminLoginScreen();
    }
};

var updateInfant = function(){
    infantTotal += 1;  
}; 

var updateChild = function(){
    childTotal += 1;
};

var updateAdult = function(){
    adultTotal += 1;
};

var updateSenior = function(){
    seniorTotal += 1;
};

var personDetermination = function(aPerson){
    if (aPerson == "Infant"){
        updateInfant();
    } else if (aPerson == "Child"){
        updateChild();
    } else if (aPerson == "Adult"){
        updateAdult();
    } else {
        updateSenior();
    }
};

var getAttendees = function(){
    attendeesDB.orderByKey().on("value", function(snapshot){
        snapshot.forEach(function (snap){
            var attDiv = document.getElementById("attendCount");
            while(attDiv.firstChild)
                attDiv.removeChild(attDiv.firstChild);
            var attendeePerson = snap.val().age;
            personDetermination(attendeePerson);
            renderAttendeeTotal();
        });
    });
};

// RENDERING THE SCREEN (VIEW)
var renderAttendeeTotal = function(){
    var attendeeDiv = document.getElementById("attendCount");
    
    var infantTot = document.createElement("h3");
    infantTot.innerHTML = "Total Infants attending: " + infantTotal;
    attendeeDiv.appendChild(infantTot);
    
    var childTot = document.createElement("h3");
    childTot.innerHTML = "Total Children attending: " + childTotal;
    attendeeDiv.appendChild(childTot);
    
    var adultTot = document.createElement("h3");
    adultTot.innerHTML = "Total Adults attending " + adultTotal;
    attendeeDiv.appendChild(adultTot);
    
    var seniorTot = document.createElement("h3");
    seniorTot.innerHTML = "Total Seniors attending: " + seniorTotal;
    attendeeDiv.appendChild(seniorTot);
};

var renderAttendHead = function(){
    var attHead = document.getElementById("totHead");
    var attTitle = document.createElement("h2");
    attTitle.innerHTML = "Bowman Family Reunion Attendee Totals";
    attHead.appendChild(attTitle);
};

var attendeeTotalStart = function(){
    getAdministratorUser();
    getAttendees();
    renderAttendHead();
};

document.addEventListener('DOMContentLoaded',attendeeTotalStart);