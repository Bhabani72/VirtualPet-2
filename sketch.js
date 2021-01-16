var dog, happyDog, database;
var foodS, foodStock, foodObj;
var happyDogimg,dogimg;
var feedb,addb;
var fedTime,lastFed;

function preload(){
  happyDogimg=loadImage("images/dogImg1.png",happyDogimg);
  dogimg=loadImage("images/dogImg.png",dogimg);
}

function setup() {
  database=firebase.database();
  createCanvas(1350, 600);

  foodObj = new Food();

  foodStock=database.ref('Food');
foodStock.on("value",readStock);
  
  dog=createSprite(800,200);
  dog.addImage(dogimg);
  dog.scale=0.2;

  feedb=createButton("Feed the dog");
  feedb.position(400,200);
  feedb.mousePressed(feedDog);

  addb=createButton("Add Food");
  addb.position(400,250);
  addb.mousePressed(addFoods);
}

function draw() {  
background("yellow");

textSize(25);
if(lastFed>=12){
  fill("blue");
  text("Last Feed : "+ lastFed%12 + " PM", 350,30);
 }else if(lastFed==0){
   fill("blue")
   text("Last Feed : 12 AM",350,30);
 }else{
   fill("blue");
   text("Last Feed : "+ lastFed + " AM", 350,30);
 }
 
  drawSprites();
}

function readStock(data){
foodS=data.val();
foodObj.updateFoodStock(foodS);
}

function feedDog(){
  dog.addImage(happyDog);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}