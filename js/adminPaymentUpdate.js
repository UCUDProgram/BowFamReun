



// RENDERING THE SCREEN (VIEW)
var renderPayHeader = function(){
 var div = document.getElementById("payHeader");
 var regTitle = document.createElement("h1");
 regTitle.innerHTML = "Payment Received";
 div.appendChild(regTitle);
};

var admPayStart = function(){
    renderPayHeader();
};

document.addEventListener('DOMContentLoaded', admPayStart);