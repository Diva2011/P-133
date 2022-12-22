status = "";
img = "";
objects = [];

function preload()
{
   img = loadImage('Living room.jpg'); 
}

function draw()
{
    image(img,0,0,640,420);
    if(status != "")
    {
      for(i=0 ; i < objects.length;  i++)
      {
         document.getElementById('status').innerHTML = "Status: Objects Detected";
         fill('#FF0000')
         percent = floor(objects[i].confidence * 100);
         text(objects[i].label + " " + percent + "%", objects[i].x , objects[i].y);
         noFill();
         stroke('#FF0000');
         rect(objects[i].x , objects[i].y ,objects[i].width , objects[i].height);
         document.getElementById('detected').innerHTML = "There are 3 big objects from which cocossd model has detected 1 object";

      }
    }
}
function setup()
{
   canvas = createCanvas(640,420);
   canvas.center();
   objectDetector = ml5.objectDetector('cocossd' , modelLoaded);    
   document.getElementById('status').innerHTML = "Status: Detecting Objects";   
}

function modelLoaded()
{
   status = true;
   objectDetector.detect(img,gotResults);
}

function gotResults(error,results)
{
   if(error)
   {
      console.log(error);
   } else{
      console.log(results);
      objects = results;
   }
} 

function back(){
   window.location = 'index.html';
}
