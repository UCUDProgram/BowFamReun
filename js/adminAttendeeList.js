var attendDB = new Firebase("https://bowmanfamreun.firebaseio.com/Attendees");

var getAttendList = function(){
    attendDB.orderByKey().on("value", function(snapshot){
        snapshot.forEach(function (snap){
            var persFirst = snap.val().firstname;
            var persLast = snap.val().lastname;
            renderPerson(persFirst,persLast);
        });
    });
};

// RENDERING THE SCREEN (VIEW)
var renderPerson = function(firstN, lastN){
    var adDiv = document.getElementById("adminAttend");
    
    var persDiv = document.createElement("div");
    var persName = firstN.concat(lastN);
    persDiv.setAttribute("id", persName);
    
    var fNDiv = document.createElement("div");
    fNDiv.classList.add("individual_block_first");
    fNDiv.innerHTML = firstN;
    persDiv.appendChild(fNDiv);
    
    var lNDiv = document.createElement("div");
    lNDiv.classList.add("individual_block");
    lNDiv.innerHTML = lastN;
    persDiv.appendChild(lNDiv);
    
    adDiv.appendChild(persDiv);
};

var renderListHeader = function(){
    var ori = document.getElementById("adminListHeader");
    var oriTitle = document.createElement("h2");
    oriTitle.innerHTML = "Attendees for the Bowman Family Reunion";
    ori.appendChild(oriTitle);
};

var attendStart = function(){
    renderListHeader();
    getAttendList();
};

document.addEventListener('DOMContentLoaded',attendStart);