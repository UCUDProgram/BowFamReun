var userAcct = "";
var newFoodItem = "";
var newFoodCat = "";

var foodDB = new Firebase("https://bowmanfamreun.firebaseio.com/Food");
var DB = new Firebase("https://bowmanfamreun.firebaseio.com/");

// var setNewFood = function(){
// };

var setNewFoodCat = function(){
    newFoodCat = document.getElementById("foodOption").value;
};

var getFoodUser = function(){
    userAcct = localStorage.getItem("user");
     if(userAcct == null){
      showLoginScreen();
     }
};

var deleteFood = function(aKey){
    foodDB.child(aKey).remove();
    getFood();
};

var foodSubmit = function(){
  setNewFoodCat();
  
  var foodData = DB.child("Food");
  foodData.push().set({user:userAcct,
                        food:newFoodItem,
                        category:newFoodCat
  });
  foodInputReset();
};

var foodInputReset = function(){
  document.getElementById("newFoodText").value = "";
    document.getElementById("foodOption").selectedIndex = 0;
};

var getFood = function(){
     var parDiv = document.getElementById("foodList");
    // parDiv.classList.add("attendSpace");
    
    while(parDiv.firstChild)
        parDiv.removeChild(parDiv.firstChild);
     foodDB.orderByChild("user").equalTo(userAcct).on("value", function(snapshot){
        snapshot.forEach(function (childSnapshot){
            // console.log(childSnapshot.key());
            var foodKey = childSnapshot.key();
          var foodName = childSnapshot.val().food;
          console.log(foodName);
          var foodCat = childSnapshot.val().category;
          console.log(foodCat);
        renderFood(foodName,foodCat,foodKey);
      });
});
    
};

//  RENDERING THE SCREEN (VIEW)
var renderFoodScreen = function(){
    renderFoodOrderHeader();
    renderNewFoodItem();
    renderRegisteredFood();
};

var renderFoodOrderHeader = function(){
  var $fdHead = document.getElementById("foodHeader");
  var fdHeadText = document.createElement("h1");
  fdHeadText.innerHTML = "Enter the food that you will bring to the Family Renunion";
  
  var fdHeadInfo = document.createElement("h2");
  fdHeadInfo.innerHTML = "Keep in mind the food needs to be able to feed AT LEAST 15 People";
  
  $fdHead.appendChild(fdHeadText);
  $fdHead.appendChild(fdHeadInfo);
};

var renderNewFoodItem = function(){
    renderNewFoodName();
    renderNewFoodCat();
    renderFoodSubmission();
};

var renderNewFoodName = function(){
    var $newFd = document.getElementById("newFood");
    var newfdDiv = document.createElement("div");
    newfdDiv.classList.add("individual_block_first");
    
    var newfdLbl = document.createElement("label");
    newfdLbl.setAttribute("for", newNameInput);
    newfdLbl.innerHTML = "Food You will Bring";
    newfdDiv.appendChild(newfdLbl);
    
    var newNameInput = document.createElement("input");
    newNameInput.setAttribute("type", "text");
    newNameInput.setAttribute("id", "newFoodText");
    newNameInput.addEventListener("blur", function(ev){
        newFoodItem = document.getElementById("newFoodText").value;
    });

    newfdDiv.appendChild(newNameInput);
    $newFd.appendChild(newfdDiv);
    
};

var renderNewFoodCat = function(){
    var newFd = document.getElementById("newFood");
    
    var $foodDiv = document.createElement("div");
    $foodDiv.classList.add("individual_block");
    
    var $foodClassify = document.createElement("select");
  $foodClassify.setAttribute("name", "food");
  $foodClassify.setAttribute("id", "foodOption");  
    
    var $defaultOpt = document.createElement("option");
    $defaultOpt.setAttribute("value", "Choose Food Classification");
    $defaultOpt.setAttribute("selected", true);
    $defaultOpt.setAttribute("id", "defaultOpt");
    $defaultOpt.innerHTML = "Choose Food Classification";
    $foodClassify.appendChild($defaultOpt);
    
    var $saladOpt = document.createElement("option");
    $saladOpt.setAttribute("value", "Salad");
    $saladOpt.setAttribute("id", "saladOpt");
    $saladOpt.innerHTML = "Salad";
    $foodClassify.appendChild($saladOpt);
    
     var $sideOpt = document.createElement("option");
    $sideOpt.setAttribute("value", "Side Dish");
    $sideOpt.setAttribute("id", "sideOpt");
    $sideOpt.innerHTML = "Side Dish";
    $foodClassify.appendChild($sideOpt);
    
    var $veggiesOpt = document.createElement("option");
    $veggiesOpt.setAttribute("value", "Veggies");
    $veggiesOpt.setAttribute("id", "veggiesOpt");
    $veggiesOpt.innerHTML = "Veggies";
    $foodClassify.appendChild($veggiesOpt);
    
    var $meatOpt = document.createElement("option");
    $meatOpt.setAttribute("value", "Meat");
    $meatOpt.setAttribute("id", "meatOpt");
    $meatOpt.innerHTML = "Meat";
    $foodClassify.appendChild($meatOpt);
    
    var $dessertOpt = document.createElement("option");
    $dessertOpt.setAttribute("value", "Dessert");
    $dessertOpt.setAttribute("id", "dessertOpt");
    $dessertOpt.innerHTML = "Dessert";
    $foodClassify.appendChild($dessertOpt);
    
    
    $foodDiv.appendChild($foodClassify);
    newFd.appendChild($foodDiv);
};

var renderFoodSubmission = function(){
    var $newFdItm = document.getElementById("newFood");
    var fdSubmit = document.createElement("button");
    fdSubmit.setAttribute("id", "newfoodSubmit");
    fdSubmit.innerHTML = "Add New Food Item";
    fdSubmit.addEventListener("click", function(ev){
        foodSubmit();
    });
    $newFdItm.appendChild(fdSubmit);
};

var renderRegisteredFood = function(){
    foodHead();
    getFood();
};

var foodHead = function(){
  var fdHd = document.getElementById("foodBroughtHead");
  var fdHdTxt = document.createElement("h3");
  fdHdTxt.innerHTML = "The List of Foods that Your Family said you will bring";
  fdHd.appendChild(fdHdTxt);
};

var editFoodItemName = function(afdDiv, afdName, afoodKey){
    var newName = afdName;
    var $fddiv = document.getElementById(afdDiv);
    $fddiv.innerHTML = "";
    var $fdnameInput = document.createElement("input");
  $fdnameInput.setAttribute("type", "text");
  $fdnameInput.setAttribute("id", "foodNameText");
  $fdnameInput.setAttribute("value", afdName);
  $fdnameInput.innerHTML = afdName;
  $fdnameInput.addEventListener("blur", function(ev){
         newName = document.getElementById("foodNameText").value;
    });
 $fddiv.appendChild($fdnameInput);
    
    var $foodUpdateButton = document.createElement("button");
    $foodUpdateButton.setAttribute("type","button");
    var foodUpdateName = afdDiv.concat("Update"); 
    $foodUpdateButton.setAttribute("id",foodUpdateName);
    $foodUpdateButton.innerHTML ="Update";
    $foodUpdateButton.addEventListener("click", function(ev){
        foodDB.child(afoodKey).update({food: newName
                    } );
        getFood();
    });
    $fddiv.appendChild($foodUpdateButton);
    
     var $foodCancelButton = document.createElement("button");
    $foodCancelButton.setAttribute("type","button");
    $foodCancelButton.setAttribute("id","cancel");
    $foodCancelButton.innerHTML ="Cancel";
    $foodCancelButton.addEventListener("click", function(ev){
        getFood();
    });
    $fddiv.appendChild($foodCancelButton);
    
};


var renderFood = function(fdName, fdCat, fdKey){
    var $fdItmDiv = document.getElementById("foodList");
    var fdDivName = fdName.concat(fdCat);
    var $foodNameDiv = document.createElement("div");
    $foodNameDiv.setAttribute("id", fdDivName);

    // $foodNameDiv.classList.add("foodSpace");

    var fdNmDv = document.createElement("div");
    fdNmDv.innerHTML = fdName;
    fdNmDv.classList.add("individual_block_first");
    var fdText = fdDivName.concat("Food");
    fdNmDv.setAttribute("id", fdText);
    $foodNameDiv.appendChild(fdNmDv);
    
    renderCatChange(fdDivName,$foodNameDiv,fdCat,fdKey);
    
    var $foodNameEditButton = document.createElement("button");
    $foodNameEditButton.setAttribute("type","button");
    var fdEditName = fdDivName.concat("Edit"); 
    $foodNameEditButton.setAttribute("id",fdEditName);
    $foodNameEditButton.innerHTML ="Edit Food";
    $foodNameEditButton.addEventListener("click", function(ev){
        editFoodItemName(fdDivName,fdName,fdKey);
    });
    $foodNameDiv.appendChild($foodNameEditButton);
    
    var $foodDeleteButton = document.createElement("button");
    $foodDeleteButton.setAttribute("type","button");
    var deleteButtonName = fdDivName.concat("Delete"); 
    $foodDeleteButton.setAttribute("id",deleteButtonName);
    $foodDeleteButton.innerHTML ="Delete";
    $foodDeleteButton.addEventListener("click", function(ev){
        deleteFood(fdKey);
    });
    $foodNameDiv.appendChild($foodDeleteButton);
    $fdItmDiv.appendChild($foodNameDiv);
};


var renderCatChange = function(afoodDiv, attachmentDiv, foodCateg,indFoodKey){
    var newCat = "";
   var $indCatDiv = document.createElement("div");
     var divNameCat = afoodDiv.concat("Category");
    $indCatDiv.classList.add('individual_block');
    $indCatDiv.setAttribute("id",divNameCat);
    
    var $catClassification = document.createElement("select");
  $catClassification.setAttribute("name", "age");
  var foodNameSelect = afoodDiv.concat("Select");
  $catClassification.setAttribute("id", foodNameSelect);
  
        var $saladClassification = document.createElement("option");
  $saladClassification.setAttribute("value", "Salad");
  $saladClassification.setAttribute("id", "newSalad");
  $saladClassification.innerHTML = "Salad";
      if(foodCateg == "Salad"){
          $saladClassification.setAttribute("selected",true);
      }
      $catClassification.appendChild($saladClassification);
      
        var $sideDishClassification = document.createElement("option");
  $sideDishClassification.setAttribute("value", "Side Dish");
  $sideDishClassification.setAttribute("id", "newSideDish");
  $sideDishClassification.innerHTML = "Side Dish";
      if(foodCateg == "Side Dish"){
          $sideDishClassification.setAttribute("selected",true);
      }
      $catClassification.appendChild($sideDishClassification);
      
var $veggiesClassification = document.createElement("option");
  $veggiesClassification.setAttribute("value", "Veggies");
  $veggiesClassification.setAttribute("id", "newVeggies");
  $veggiesClassification.innerHTML = "Veggies";
      if(foodCateg == "Veggies"){
          $veggiesClassification.setAttribute("selected",true);
      }
      $catClassification.appendChild($veggiesClassification);

    var $meatClassification = document.createElement("option");
$meatClassification.setAttribute("value", "Meat");
$meatClassification.setAttribute("id", "newmeat");
  $meatClassification.innerHTML = "Meat";
     if(foodCateg == "Meat"){
          $meatClassification.setAttribute("selected",true)
      }
      $catClassification.appendChild($meatClassification);
      
      
  var $dessertClassification = document.createElement("option");
  $dessertClassification.setAttribute("value", "Dessert");
  $dessertClassification.setAttribute("id", "newDessert");
  $dessertClassification.innerHTML = "Dessert";
     if(foodCateg == "Dessert"){
          $dessertClassification.setAttribute("selected",true);
      }
      $catClassification.appendChild($dessertClassification);
      
      $catClassification.addEventListener("change",function(ev){
         newCat =  document.getElementById(foodNameSelect).value;
         foodDB.child(indFoodKey).update({category: newCat
                    } );
         getFood();

      });
       
   $indCatDiv.appendChild($catClassification);
   attachmentDiv.appendChild($indCatDiv);
};

var renderFoodNavButtons = function(){
    var $fdnav = document.getElementById("foodNav");
  var $foodNavDiv = document.createElement("div");
  var $rtnHomeButton = document.createElement("button");
  $rtnHomeButton.setAttribute("type", "button");
  $rtnHomeButton.setAttribute("id", "memberHomeRtn");
  $rtnHomeButton.innerHTML = "Return to User Home Screen";
  $rtnHomeButton.addEventListener("click", function(ev){
    showLoginHomeScreen();
  });
  $foodNavDiv.appendChild($rtnHomeButton);
  
  $fdnav.appendChild($foodNavDiv);
};

var memFoodStart = function(){
    getFoodUser();
    renderFoodScreen();
    // getFood();
    renderFoodNavButtons();
};

document.addEventListener('DOMContentLoaded',memFoodStart);
