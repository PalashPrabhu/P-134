img="";
status="";
objects = [];
song = "";

function preload(){
    song = loadSound("alarm.mp3");
}


function setup(){
    canvas = createCanvas(380,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
}

function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects"
}

function modelLoaded(){
    console.log("Model Loaded!");
    status = true;
    
}

function gotResults(error,results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function draw(){
    image(video,0,0,380,380);
  
    if(status !=""){
        objectDetector.detect(video, gotResults);
        r=random(255);
        g=random(255);
        b=random(255);
        for(i=0; i<objects.length; i++){
            document.getElementById("status").innerHTML = "Status : Object Detected";
            document.getElementById("number_of_objects").innerHTML = "Number of objects are : " + objects.length;
            if(objects[i].label!=="person"){
                song.play();
            }    
            
            fill(r,g,b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x+15, objects[i].y+15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            
      }
      
    }



}