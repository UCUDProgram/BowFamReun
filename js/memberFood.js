var saladChoice = "None";
var sideDishChoice = "None";
var meatChoice = "None";
var dessertChoice = "None";
var otherFoodChoice = "None";
var otherFoodCat = "None";
var userAcct = "";
var foodDB = new Firebase("https://bowmanfamreun.firebaseio.com/Food");
var DB = new Firebase("https://bowmanfamreun.firebaseio.com/");

var setSaladChoice = function(salad){
    saladChoice = salad;  
};

var setSideDishChoice = function(side){
    sideDishChoice = side;  
};

var setMeatChoice = function(meat){
    meatChoice = meat;  
};

var setDessertChoice = function(dessert){
    dessertChoice = dessert;  
};

var setOtherFoodChoice = function(other){
    otherFoodChoice = other;  
};

var setOtherFoodCat = function(oCat){
    otherFoodCat = oCat;  
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

var saladSubmit = function(){
  foodDB.push().set({user:userAcct,
                        food:saladChoice,
                        category:"Salad"
  });
};

var sideDishSubmit = function(){
  foodDB.push().set({user:userAcct,
                        food:sideDishChoice,
                        category:"Side Dish"
  });
};

var meatSubmit = function(){
  foodDB.push().set({user:userAcct,
                        food:meatChoice,
                        category:"Meat"
  });
};

var dessertSubmit = function(){
  foodDB.push().set({user:userAcct,
                        food:dessertChoice,
                        category:"Dessert"
  });
};

var otherFoodSubmit = function(){
  foodDB.push().set({user:userAcct,
                        food:otherFoodChoice,
                        category:otherFoodCat
  });
};

var getFood = function(){
     var parDiv = document.getElementById("foodList");
    while(parDiv.firstChild)
        parDiv.removeChild(parDiv.firstChild);
     foodDB.orderByChild("user").equalTo(userAcct).on("value", function(snapshot){
        snapshot.forEach(function (childSnapshot){
          var foodName = childSnapshot.val().food;
          var foodCat = childSnapshot.val().category;
          var foodKey = childSnapshot.key();
        renderFood(foodName,foodCat,foodKey);
      });
});
};

//  RENDERING THE SCREEN (VIEW)
var renderFoodScreen = function(){
    renderFoodOrderHeader();
    renderSaladOptions();
    renderSideDishOptions();
    renderMeatOptions();
    renderDessertOptions();
    renderOtherFoodOptions();
    renderFoodHead();
};

var renderFoodOrderHeader = function(){
  var $fdHead = document.getElementById("foodHeader");
  var fdHeadText = document.createElement("h1");
  fdHeadText.innerHTML = "Enter the food that you will bring to the Family Renunion";
  
  var fdHeadInfo = document.createElement("h2");
  fdHeadInfo.innerHTML = "Keep in mind the food needs to be able to feed AT LEAST 15 People";
  
  var fdHeadOther = document.createElement("h2");
  fdHeadOther.innerHTML = "If you do not see the food you are bringing, you can enter it in other food Item Area.  For Example, enter Macaroni Salad in the Textbox and select the Salad option in the accompanying Checkbox.";
  
  $fdHead.appendChild(fdHeadText);
  $fdHead.appendChild(fdHeadInfo);
  $fdHead.appendChild(fdHeadOther);
};

var renderSaladOptions = function(){
    var sdDiv = document.getElementById("saladOption");
    var saladDiv = document.createElement("div");
    
    var saladName = document.createElement("div");
    saladName.classList.add("individual_block");
    saladName.innerHTML = "Salad: ";
    saladDiv.appendChild(saladName);
    renderSaladList(saladDiv);
    renderSaladSubmitButton(saladDiv);
    sdDiv.appendChild(saladDiv);
};

var renderSaladList = function(sldDiv){
  var saladClassification = document.createElement("select");
  saladClassification.setAttribute("name", "salad");
  saladClassification.setAttribute("id", "saladSelection");
  
  var defSaladOpt = document.createElement("option");
  defSaladOpt.setAttribute("value", "Select Salad");
  defSaladOpt.setAttribute("id", "defSalOpt");
  defSaladOpt.innerHTML = "Select Salad";
  saladClassification.appendChild(defSaladOpt);
  
  var fruitOpt = document.createElement("option");
  fruitOpt.setAttribute("value", "Fruit Salad");
  fruitOpt.setAttribute("id", "fruitOption");
  fruitOpt.innerHTML = "Fruit Salad";
  saladClassification.appendChild(fruitOpt);
  
  var pastaOpt = document.createElement("option");
  pastaOpt.setAttribute("value", "Pasta Salad");
  pastaOpt.setAttribute("id", "pastaOption");
  pastaOpt.innerHTML = "Pasta Salad";
  saladClassification.appendChild(pastaOpt);
  
  var potatoOpt = document.createElement("option");
  potatoOpt.setAttribute("value", "Potato Salad");
  potatoOpt.setAttribute("id", "potatoOption");
  potatoOpt.innerHTML = "Potato Salad";
  saladClassification.appendChild(potatoOpt);
    
  var greenOpt = document.createElement("option");
  greenOpt.setAttribute("value", "Green Salad");
  greenOpt.setAttribute("id", "greenOption");
  greenOpt.innerHTML = "Green Salad";
  saladClassification.appendChild(greenOpt);

saladClassification.addEventListener("change",function(ev){
   setSaladChoice(document.getElementById("saladSelection").value); 
});

    sldDiv.appendChild(saladClassification);
};

var renderSaladSubmitButton = function(sldDv){
  var saladButton = document.createElement("button");
  saladButton.setAttribute("id","saladSubmit");
    saladButton.innerHTML = "Register the Salad";
    saladButton.addEventListener("click", function(ev){
        saladSubmit();
        getFood();
    });
    sldDv.appendChild(saladButton);
};

var renderSideDishOptions = function(){
    var sDishDiv = document.getElementById("sideDishOption");
    sDishDiv.classList.add("optionSeperation");
    var sDishOpt = document.createElement("div");
    
    var sideName = document.createElement("div");
    sideName.classList.add("individual_block");
    sideName.innerHTML = "Side Dish: ";
    sDishOpt.appendChild(sideName);
    renderSideDishList(sDishOpt);
    renderSideDishSubmitButton(sDishOpt);
    sDishDiv.appendChild(sDishOpt);
};

var renderSideDishList = function(sdDiv){
  var sideDishClassification = document.createElement("select");
  sideDishClassification.setAttribute("name", "sideDish");
  sideDishClassification.setAttribute("id", "sideDishSelection");
    
    var defSideOpt = document.createElement("option");
  defSideOpt.setAttribute("value", "Select Side Dish");
  defSideOpt.setAttribute("id", "defSidOpt");
  defSideOpt.innerHTML = "Select Side Dish";
  sideDishClassification.appendChild(defSideOpt);
      
    var bakedBeansOpt = document.createElement("option");
  bakedBeansOpt.setAttribute("value", "Baked Beans");
  bakedBeansOpt.setAttribute("id", "bakedBeansOption");
  bakedBeansOpt.innerHTML = "Baked Beans";
  sideDishClassification.appendChild(bakedBeansOpt);

    var cornOpt = document.createElement("option");
  cornOpt.setAttribute("value", "Corn");
  cornOpt.setAttribute("id", "cornOption");
  cornOpt.innerHTML = "Corn";
  sideDishClassification.appendChild(cornOpt);
  
  var devilEggOpt = document.createElement("option");
  devilEggOpt.setAttribute("value", "Deviled Eggs");
  devilEggOpt.setAttribute("id", "devilEggOption");
  devilEggOpt.innerHTML = "Deviled Eggs";
  sideDishClassification.appendChild(devilEggOpt);
  
   var stringBeansOpt = document.createElement("option");
  stringBeansOpt.setAttribute("value", "String Beans");
  stringBeansOpt.setAttribute("id", "stringBeansOption");
  stringBeansOpt.innerHTML = "String Beans";
  sideDishClassification.appendChild(stringBeansOpt);
      
    var macaroniOpt = document.createElement("option");
  macaroniOpt.setAttribute("value", "Macaroni");
  macaroniOpt.setAttribute("id", "macaroniOption");
  macaroniOpt.innerHTML = "Macaroni";
  sideDishClassification.appendChild(macaroniOpt);
  
  sideDishClassification.addEventListener("change",function(ev){
     setSideDishChoice(document.getElementById("sideDishSelection").value); 
  });
  
  sdDiv.appendChild(sideDishClassification);
};

var renderSideDishSubmitButton = function(sideDiv){
  var sideDishButton = document.createElement("button");
  sideDishButton.setAttribute("id","sideSubmit");
    sideDishButton.innerHTML = "Register the Side Dish";
    sideDishButton.addEventListener("click", function(ev){
        sideDishSubmit();
        getFood();
    });
    sideDiv.appendChild(sideDishButton);
};

var renderMeatOptions = function(){
    var meatDiv = document.getElementById("meatOption");
    meatDiv.classList.add("optionSeperation");
    var meatOpt = document.createElement("div");
    
    var meatName = document.createElement("div");
    meatName.classList.add("individual_block");
    meatName.innerHTML = "Meat: ";
    meatOpt.appendChild(meatName);
    renderMeatList(meatOpt);
   renderMeatSubmitButton(meatOpt);
    meatDiv.appendChild(meatOpt);
};

var renderMeatList = function(meatOpt){
   var meatClassification = document.createElement("select");
  meatClassification.setAttribute("name", "meat");
  meatClassification.setAttribute("id", "meatSelection");
  
  var defMeatOpt = document.createElement("option");
  defMeatOpt.setAttribute("value", "Select Meat Option");
  defMeatOpt.setAttribute("id", "defMeatOpt");
  defMeatOpt.innerHTML = "Select Meat Option";
  meatClassification.appendChild(defMeatOpt);
  
  var chickenOpt = document.createElement("option");
  chickenOpt.setAttribute("value", "Chicken");
  chickenOpt.setAttribute("id", "chickenOption");
  chickenOpt.innerHTML = "Chicken";
  meatClassification.appendChild(chickenOpt);
  
    var hamOpt = document.createElement("option");
  hamOpt.setAttribute("value", "Ham");
  hamOpt.setAttribute("id", "hamOption");
  hamOpt.innerHTML = "Ham";
  meatClassification.appendChild(hamOpt);
  
    var ribsOpt = document.createElement("option");
  ribsOpt.setAttribute("value", "Ribs");
  ribsOpt.setAttribute("id", "ribsOption");
  ribsOpt.innerHTML = "Ribs";
  meatClassification.appendChild(ribsOpt);
    
    meatClassification.addEventListener("change", function(ev){
       if(document.getElementById("meatSelection").value == "Chicken"){
           renderChickenOptions();
       } else {
           document.getElementById("chickenChoice").classList.add("hidden");
           setMeatChoice(document.getElementById("meatSelection").value);
       } 
    });
    meatOpt.appendChild(meatClassification);
};

var renderChickenOptions = function(){
    var chickenOpt = document.getElementById("chickenChoice");
    chickenOpt.classList.remove("hidden");
    
    while(chickenOpt.firstChild)
        chickenOpt.removeChild(chickenOpt.firstChild);
    
    var chickenClassification = document.createElement("select");
  chickenClassification.setAttribute("name", "chicken");
  chickenClassification.setAttribute("id", "chickenSelection");
  
  var bbqChickenOpt = document.createElement("option");
  bbqChickenOpt.setAttribute("value", "BBQ Chicken");
  bbqChickenOpt.setAttribute("id", "bbqChickenOption");
  bbqChickenOpt.innerHTML = "BBQ Chicken";
  chickenClassification.appendChild(bbqChickenOpt);
  
  var bakedChickenOpt = document.createElement("option");
  bakedChickenOpt.setAttribute("value", "Baked Chicken");
  bakedChickenOpt.setAttribute("id", "bakedChickenOption");
  bakedChickenOpt.innerHTML = "Baked Chicken";
  chickenClassification.appendChild(bakedChickenOpt);
  
   var friedChickenOpt = document.createElement("option");
  friedChickenOpt.setAttribute("value", "Fried Chicken");
  friedChickenOpt.setAttribute("id", "friedChickenOption");
  friedChickenOpt.innerHTML = "Fried Chicken";
  chickenClassification.appendChild(friedChickenOpt);
  
  chickenClassification.addEventListener("change", function(ev){
      setMeatChoice(document.getElementById("chickenSelection").value);
  });
  
  chickenOpt.appendChild(chickenClassification);
};

var renderMeatSubmitButton = function(meatDiv){
  var meatButton = document.createElement("button");
  meatButton.setAttribute("id","meatSubmit");
    meatButton.innerHTML = "Register the Meat";
    meatButton.addEventListener("click", function(ev){
        meatSubmit();
        getFood();
    });
    meatDiv.appendChild(meatButton);
};

var renderDessertOptions = function(){
    var $newDessert = document.getElementById("dessertOption");
    $newDessert.classList.add("optionSeperation");
    var newDessertDiv = document.createElement("div");
    newDessertDiv.classList.add("individual_block_first");
    
    var newDessertLbl = document.createElement("label");
    newDessertLbl.setAttribute("for", newDessertInput);
    newDessertLbl.innerHTML = "Dessert: ";
    newDessertDiv.appendChild(newDessertLbl);
    
    var newDessertInput = document.createElement("input");
    newDessertInput.setAttribute("type", "text");
    newDessertInput.setAttribute("id", "newDessertText");
    newDessertInput.addEventListener("blur", function(ev){
        setDessertChoice(document.getElementById("newDessertText").value);
    });

    newDessertDiv.appendChild(newDessertInput);
    renderDessertSubmitButton(newDessertDiv);
    $newDessert.appendChild(newDessertDiv);
};

var renderDessertSubmitButton = function(dessDiv){
    var dessertButton = document.createElement("button");
  dessertButton.setAttribute("id","dessertSubmit");
    dessertButton.innerHTML = "Register the Dessert";
    dessertButton.addEventListener("click", function(ev){
        dessertSubmit();
        getFood();
    });
    dessDiv.appendChild(dessertButton);
};

var renderOtherFoodOptions = function(){
var $otherFood = document.getElementById("otherOption");
    $otherFood.classList.add("optionSeperation");
    var otherDiv = document.createElement("div");
    otherDiv.classList.add("individual_block_first");
    
    var otherLbl = document.createElement("label");
    otherLbl.setAttribute("for", otherInput);
    otherLbl.innerHTML = "Other Food Item: ";
    otherDiv.appendChild(otherLbl);
    
    var otherInput = document.createElement("input");
    otherInput.setAttribute("type", "text");
    otherInput.setAttribute("id", "otherText");
    otherInput.addEventListener("blur", function(ev){
        setOtherFoodChoice(document.getElementById("otherText").value);
    });

    otherDiv.appendChild(otherInput);
    renderOtherFoodCategory(otherDiv);
    renderOtherFoodSubmitButton(otherDiv);
    $otherFood.appendChild(otherDiv);
};

var renderOtherFoodCategory = function(otDv){
   var otherFoodCategoryClassification = document.createElement("select");
  otherFoodCategoryClassification.setAttribute("name", "otherCat");
  otherFoodCategoryClassification.setAttribute("id", "otherCategorySelection");
  
   var defCat = document.createElement("option");
  defCat.setAttribute("value", "Select Category");
  defCat.setAttribute("id", "defCategory");
  defCat.innerHTML = "Select Category";
  otherFoodCategoryClassification.appendChild(defCat);
  
  var saladCat = document.createElement("option");
  saladCat.setAttribute("value", "Salad");
  saladCat.setAttribute("id", "saladCategory");
  saladCat.innerHTML = "Salad";
  otherFoodCategoryClassification.appendChild(saladCat);
  
  var sideDishCat = document.createElement("option");
  sideDishCat.setAttribute("value", "Side Dish");
  sideDishCat.setAttribute("id", "sideDishCategory");
  sideDishCat.innerHTML = "Side Dish";
  otherFoodCategoryClassification.appendChild(sideDishCat);
  
  var meatCat = document.createElement("option");
  meatCat.setAttribute("value", "Meat");
  meatCat.setAttribute("id", "meatCategory");
  meatCat.innerHTML = "Meat";
  otherFoodCategoryClassification.appendChild(meatCat);
  
    otherFoodCategoryClassification.addEventListener("change", function(ev){
      setOtherFoodCat(document.getElementById("otherCategorySelection").value);
      console.log(otherFoodCat);
  });
    otDv.appendChild(otherFoodCategoryClassification);
};

var renderOtherFoodSubmitButton = function(otherDiv){
    var otherButton = document.createElement("button");
  otherButton.setAttribute("id","otherSubmit");
    otherButton.innerHTML = "Register this Food Item";
    otherButton.addEventListener("click", function(ev){
        otherFoodSubmit();
        getFood();
    });
    otherDiv.appendChild(otherButton);
};

var renderFoodHead = function(){
  var fdHd = document.getElementById("foodBroughtHead");
  var fdHdTxt = document.createElement("h3");
  fdHdTxt.innerHTML = "The List of Foods selected by your Family.";
  fdHd.appendChild(fdHdTxt);
};

var editFoodItem = function(afdDiv, afdName, afdCat, afoodKey){
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

    var fdNmDv = document.createElement("div");
    fdNmDv.innerHTML = fdName;
    fdNmDv.classList.add("individual_block_first");
    var fdText = fdDivName.concat("Food");
    fdNmDv.setAttribute("id", fdText);
    $foodNameDiv.appendChild(fdNmDv);

    renderCatChange(fdDivName,$foodNameDiv,fdCat, fdKey);

    var $foodNameEditButton = document.createElement("button");
    $foodNameEditButton.setAttribute("type","button");
    var fdEditName = fdDivName.concat("Edit"); 
    $foodNameEditButton.setAttribute("id",fdEditName);
    $foodNameEditButton.innerHTML ="Edit Food";
    $foodNameEditButton.addEventListener("click", function(ev){
        editFoodItem(fdDivName,fdName,fdCat, fdKey);
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

var renderCatChange = function(afoodDiv,attachDiv, foodCateg,indFoodKey){
    var newCat = "";
   var $indCatDiv = document.createElement("div");
     var divNameCat = afoodDiv.concat("Category");
    $indCatDiv.classList.add('individual_block');
    $indCatDiv.setAttribute("id",divNameCat);
    
    var $catClassification = document.createElement("select");
  $catClassification.setAttribute("name", "categ");
  var foodCatSelect = afoodDiv.concat("Select");
  $catClassification.setAttribute("id", foodCatSelect);
  
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
      
    var $meatClassification = document.createElement("option");
$meatClassification.setAttribute("value", "Meat");
$meatClassification.setAttribute("id", "newmeat");
  $meatClassification.innerHTML = "Meat";
     if(foodCateg == "Meat"){
          $meatClassification.setAttribute("selected",true);
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
         newCat =  document.getElementById(foodCatSelect).value;
         foodDB.child(indFoodKey).update({category: newCat
                    } );
         getFood();
      });
   $indCatDiv.appendChild($catClassification);
   attachDiv.appendChild($indCatDiv);
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
    getFood();
    renderFoodNavButtons();
};

document.addEventListener('DOMContentLoaded',memFoodStart);