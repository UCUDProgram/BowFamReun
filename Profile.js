function Profile(){
  this.name ="guest"  
};

Profile.prototype.setName = function(newName){
  this.name = newName;  
};

Profile.prototype.getName = function(){
  return this.name;  
};