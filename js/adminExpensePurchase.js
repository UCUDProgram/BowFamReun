var adminuse = "";
var purchaseName = "";
var purchaseCat = "";
var purchaseCost = 0;
var purchaseImage = "";
var purchaseLocation = "";
// var storage = new Firebase("gs://bowmanfamreun.appspot.com/");
var storage = firebase.storage();
var DB = new Firebase("https://bowmanfamreun.firebaseio.com/");

var getAdminist = function(){
    adminuse = localStorage.getItem("admin");
    if(adminuse == null){
        showAdminLoginScreen();
    }
    // if(adminuse != "LawAdmin"){
    //     alert("This website is in Archive mode. Your account has been permanently disabled.");
    //     showHomePageScreen();
    // }
};

var setPurchaseName = function(Nam){
    purchaseName = Nam;  
};

var setPurchaseCategory = function(cat){
    purchaseCat = cat;  
};

var setPurchaseCost = function(cos){
    purchaseCost = cos;  
};

var setPurchaseImg = function(imgNam){
    purchaseImage = imgNam;  
};

var setPurchaseLoc = function(loc){
    purchaseLocation = loc;  
};

var setImageName = function(imgNa, imgNu){
    var date = new Date();
    console.log(date);
    var mont = date.getMonth() +1;
    var da = date.getDate();
    var hr = date.getHours();
    var min = date.getMinutes();
    var imageName = "Receipts/" + mont + da + hr + min + imgNa + imgNu;
    setPurchaseImg(imageName);
    // console.log(purchaseImage);
};

var expenseDBSubmit = function(){
    var expData = DB.child("Expenses");
    expData.push().set({purName: purchaseName,
                        purCost: purchaseCost, 
                        purCat: purchaseCat,
                        purLoc: purchaseLocation,
                        purSubmit: adminuse,
                        purImgName: purchaseImage});
};

var submitExpense = function(){
    
    var expCat = document.getElementById("expenseCategory").value;
    setPurchaseCategory(expCat);
    var fileLength = document.getElementById("receipt").files.length;
    // console.log(fileLength);
    for(var i = 0; i < fileLength; i++){
        var imgName = document.getElementById("receipt").files[i].name;
        var imgNumber = i +1;
        setImageName(imgName,imgNumber);
        expenseDBSubmit();
        
        var storageRef = storage.ref();
        var getImg = document.getElementById("receipt").files[i];
        storageRef.child(purchaseImage).put(getImg); 
    }
    
    alert("Your Expense Report has been recorded");
    resetPage();
    
};

var resetPage = function(){
    document.getElementById("expNameText").value = "";
    document.getElementById("expenseCategory").selectedIndex = 0;
    document.getElementById("expCostText").value = "";
    document.getElementById("expLocText").value = "";
    document.getElementById("receipt").value = "";
};
// RENDERING THE SCREEN
var renderExpenseHeader = function(){
    var $head = document.getElementById("admExpHeader");
    var $header =document.createElement("h2");
    $header.innerHTML = "Purchases/Expenses for the Bowman Family Reunion";
    $head.appendChild($header);
};

var renderExpenseScreen = function(){
    renderExpenseName();
    renderExpenseCategory();
    renderExpenseCost();
    renderExpenseLocation();
    renderExpenseImageOptions();
    renderExpenseSubmit();
};

var renderExpenseName = function(){
    var $expPurHead = document.getElementById("expensePurchase");
    var $expPurDiv = document.createElement("div");
    $expPurDiv.classList.add("individual_block_first");
    
     var $expNameLabel = document.createElement("label");
    $expNameLabel.setAttribute("for", "$expNameInput");
    $expNameLabel.setAttribute("value", "Expense Name");
    $expNameLabel.innerHTML = "Expense Name";
    $expPurDiv.appendChild($expNameLabel);  
    
    var $expNameInput = document.createElement("input");
    $expNameInput.setAttribute("type", "text");
    $expNameInput.setAttribute("id", "expNameText");
    $expNameInput.innerHTML = null;
    $expNameInput.addEventListener("blur", function(ev){
         var expNam = document.getElementById("expNameText").value;
         setPurchaseName(expNam);
    });
    
    $expPurDiv.appendChild($expNameInput);
    $expPurHead.appendChild($expPurDiv);
};

var renderExpenseCategory = function(){
     var $expHead = document.getElementById("expensePurchase");
    var $catDiv = document.createElement("div");
    $catDiv.classList.add("individual_block");
    
    var $expcatLabel = document.createElement("label");
    $expcatLabel.setAttribute("for", "$categoryClassify");
    $expcatLabel.setAttribute("value", "Expense Category");
    $expcatLabel.innerHTML = "Expense Category";
    $catDiv.appendChild($expcatLabel);
    
    
     var $categoryClassify = document.createElement("select");
    $categoryClassify.setAttribute("name", "expenseCategory");
    $categoryClassify.setAttribute("id", "expenseCategory");  
 
    var $defaultClassify = document.createElement("option");
    $defaultClassify.setAttribute("value", "Choose Age");
    $defaultClassify.setAttribute("selected", true);
    $defaultClassify.setAttribute("id", "defaultOption");
    $defaultClassify.innerHTML = "Choose Purchase Category";
    $categoryClassify.appendChild($defaultClassify);
    
    var $foodClassify = document.createElement("option");
    $foodClassify.setAttribute("value", "Food");
    $foodClassify.setAttribute("id", "FoodCat");
    $foodClassify.innerHTML = "Food";
    $categoryClassify.appendChild($foodClassify);
      
    var $cutleryClassify = document.createElement("option");
    $cutleryClassify.setAttribute("value", "Cutlery");
    $cutleryClassify.setAttribute("id", "cutleryCat");
    $cutleryClassify.innerHTML = "Cutlery";
    $categoryClassify.appendChild($cutleryClassify);
      
    var $entertainmentClassify = document.createElement("option");
    $entertainmentClassify.setAttribute("value", "Entertainment");
    $entertainmentClassify.setAttribute("id", "entertainmentCat");
    $entertainmentClassify.innerHTML = "Entertainment";
    $categoryClassify.appendChild($entertainmentClassify);
      
    var $setupClassify = document.createElement("option");
    $setupClassify.setAttribute("value", "Setup");
    $setupClassify.setAttribute("id", "setupCat");
    $setupClassify.innerHTML = "Setup";
    $categoryClassify.appendChild($setupClassify);
      
    var $distributionClassify = document.createElement("option");
    $distributionClassify.setAttribute("value", "Distribution");
    $distributionClassify.setAttribute("id", "distributionCat");
    $distributionClassify.innerHTML = "Distribution";
    $categoryClassify.appendChild($distributionClassify);
    
    var $ordersClassify = document.createElement("option");
    $ordersClassify.setAttribute("value", "Orders");
    $ordersClassify.setAttribute("id", "ordersCat");
    $ordersClassify.innerHTML = "Orders";
    $categoryClassify.appendChild($ordersClassify);
    
    var $otherClassify = document.createElement("option");
    $otherClassify.setAttribute("value", "Other");
    $otherClassify.setAttribute("id", "otherCat");
    $otherClassify.innerHTML = "Other";
    $categoryClassify.appendChild($otherClassify);
      
    $catDiv.appendChild($categoryClassify);
    $expHead.appendChild($catDiv);
};

var renderExpenseCost = function(){
    var $purHead = document.getElementById("expensePurchase");
    var $purDiv = document.createElement("div");
    $purDiv.classList.add("individual_block");
    
     var $expCostLabel = document.createElement("label");
    $expCostLabel.setAttribute("for", "$expCostInput");
    $expCostLabel.setAttribute("value", "Expense Cost");
    $expCostLabel.innerHTML = "Expense Cost";
    $purDiv.appendChild($expCostLabel);  
    
    var $expCostInput = document.createElement("input");
    $expCostInput.setAttribute("type", "text");
    $expCostInput.setAttribute("id", "expCostText");
    $expCostInput.innerHTML = null;
    $expCostInput.addEventListener("blur", function(ev){
         var expCost = document.getElementById("expCostText").value;
         setPurchaseCost(expCost);
    });
    
    $purDiv.appendChild($expCostInput);
    $purHead.appendChild($purDiv);
};

var renderExpenseLocation = function(){
    var $purLocHead = document.getElementById("expensePurchase");
    var $purLocDiv = document.createElement("div");
    $purLocDiv.classList.add("individual_block");
    
     var $expLocLabel = document.createElement("label");
    $expLocLabel.setAttribute("for", "$expLocInput");
    $expLocLabel.setAttribute("value", "Expense Location");
    $expLocLabel.innerHTML = "Store Name:";
    $purLocDiv.appendChild($expLocLabel);  
    
    var $expLocInput = document.createElement("input");
    $expLocInput.setAttribute("type", "text");
    $expLocInput.setAttribute("id", "expLocText");
    $expLocInput.innerHTML = null;
    $expLocInput.addEventListener("blur", function(ev){
         var expLoc = document.getElementById("expLocText").value;
         setPurchaseLoc(expLoc);
    });
    
    $purLocDiv.appendChild($expLocInput);
    $purLocHead.appendChild($purLocDiv);
};

var renderExpenseImageOptions = function(){
    var $purImgHead = document.getElementById("expenseImage");
    var $purImgDiv = document.createElement("div");
    
    var upload = document.createElement("input");
    upload.setAttribute("type", "file");
    upload.setAttribute("accept", "image/*");
    upload.setAttribute("accept", ".pdf");
    // upload.setAttribute("multiple", true);
    upload.setAttribute("id", "receipt");
    
    upload.classList.add("individual_block_first");
    upload.innerHTML = "Upload a file";
    $purImgDiv.appendChild(upload);
    
    // var camera = document.createElement("input");
    // camera.setAttribute("type", "file");
    // camera.setAttribute("capture", "camera");
    // camera.setAttribute("accept", "image/*");
    
    // camera.classList.add("individual_block");
    // camera.innerHTML = "Take a Picture";
    // $purImgDiv.appendChild(camera);
    
    $purImgHead.appendChild($purImgDiv);
};

var renderExpenseSubmit = function(){
    var $purSub = document.getElementById("expenseSubmit");
    var $purSubmit = document.createElement("div");
    
    var $purchaseSubmit = document.createElement("button");
    $purchaseSubmit.setAttribute("id", "purchaseSubmit");
    $purchaseSubmit.innerHTML = "Submit Purchase";
    $purchaseSubmit.addEventListener("click", function(ev){
        submitExpense();
    });
    $purSubmit.appendChild($purchaseSubmit);
    $purSub.appendChild($purSubmit);
};

var expensePurchaseStart = function(){
    getAdminist();
    renderExpenseHeader();
    renderExpenseScreen();
};

document.addEventListener('DOMContentLoaded',expensePurchaseStart);