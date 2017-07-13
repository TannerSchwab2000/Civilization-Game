var selection;
var gold = 10;
var maximumUnits = 10;


function mapPoint(x,y){
    this.x = x;
    this.y = y;
}

function adjacent(x1,y1,x2,y2){
    if(x1==100 && y1==340){
        if(x2==355 && y2==233){
            return true;
        }else{
            return false;
        }
    }else if(x1==240 && y1==90){
        if(x2==355 && y2==233){
            return true;
        }else{
            return false;
        }
    }else if(x1==355 && y1==233){
        if(x2==100 && y2==340 || x2==240 && y2==90 || x2==550 && y2==30 || x2==695 && y2==400){
            return true;
        }else{
            return false;
        }
    }else if(x1==550 && y1==30){
        if(x2==355 && y2==233){
            return true;
        }else{
            return false;
        }
    }else if(x1==695 && y1==400){
        if(x2==355 && y2==233|| x2==1080 && y2==330){
            return true;
        }else{
            return false;
        }
    }else if(x1==1080 && y1==330){
        if(x2==695 && y2==400 || x2==1085 && y2==100||x2==1320 && y2==260){
            return true;
        }else{
            return false;
        }
    }else if(x1==1085 && y1==100){
        if(x2==1080 && y2==330){
            return true;
        }else{
            return false;
        }
    }
    else if(x1==1320 && y1==260){
        if(x2==1080 && y2==330){
            return true;
        }else{
            return false;
        }
    }
}

function angleBetween(x1,y1,x2,y2){
    var p1 = {
        x: x1,
        y: y1
    };

    var p2 = {
        x: x2,
        y: y2
    };

    var angleRadians = Math.atan2(p2.y - p1.y, p2.x - p1.x);
    var angleDeg = Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI;  
    return(angleDeg);  
}


function mouseIsContainedIn(x1,y1,x2,y2){
    if(mouseX>x1 && (mouseY+800)>y1 && mouseX<x2 && (mouseY+800)<y2){
            return true;
        }else{
            return false;
        }
}

function renderSquads(){
    for(var a=0;a<squads.length;a++){
        if(squads[a].units[0] != null){
            if(squads[a].units[squads[a].units.length-1].unitType == 1){
                document.getElementById("MapUnit" + (a+1)).src = "graphics/SwordsmanUnit.png"; 
                document.getElementById("MapUnit" + (a+1)).style.left = squads[a].x; 
                document.getElementById("MapUnit" + (a+1)).style.top = squads[a].y; 
            }else if(squads[a].units[squads[a].units.length-1].unitType == 2){
                document.getElementById("MapUnit" + (a+1)).src = "graphics/KnightUnit.png"; 
                document.getElementById("MapUnit" + (a+1)).style.left = squads[a].x; 
                document.getElementById("MapUnit" + (a+1)).style.top = squads[a].y; 
            }else if(squads[a].units[squads[a].units.length-1].unitType == 3){
                document.getElementById("MapUnit" + (a+1)).src = "graphics/CavalryUnit.png"; 
                document.getElementById("MapUnit" + (a+1)).style.left = squads[a].x; 
                document.getElementById("MapUnit" + (a+1)).style.top = squads[a].y; 
            }else if(squads[a].units[squads[a].units.length-1].unitType == 4){
                document.getElementById("MapUnit" + (a+1)).src = "graphics/PeasantUnit.png"; 
                document.getElementById("MapUnit" + (a+1)).style.left = squads[a].x; 
                document.getElementById("MapUnit" + (a+1)).style.top = squads[a].y; 
            }else if(squads[a].units[squads[a].units.length-1].unitType == 5){
                document.getElementById("MapUnit" + (a+1)).src = "graphics/SlaveUnit.png"; 
                document.getElementById("MapUnit" + (a+1)).style.left = squads[a].x; 
                document.getElementById("MapUnit" + (a+1)).style.top = squads[a].y; 
            }
            if(mapUnitIsHeld==true && mapUnitNumber==(a+1)){
                document.getElementById("MapUnit" + (a+1)).style.left = mouseX-60; 
                document.getElementById("MapUnit" + (a+1)).style.top = mouseY+750;
            }
        }
    }
}


function clearMap(){
    document.getElementById("town1").src = "";
    document.getElementById("town2").src = "";
    document.getElementById("town3").src = "";
    document.getElementById("town4").src = "";
    document.getElementById("town5").src = "";
    document.getElementById("town6").src = "";
    document.getElementById("town7").src = "";
    document.getElementById("town8").src = "";
    document.getElementById("town9").src = "";
    document.getElementById("town10").src = "";
    document.getElementById("town11").src = "";
    document.getElementById("town12").src = "";    
    document.getElementById("ConvertUnitsButton").src = "";    
    document.getElementById("GarrisonButton").src = "";    
    document.getElementById("ConstructionsButton").src = "";    
    document.getElementById("TaxRatesButton").src = "";   
    document.getElementById("Conversion1").src = ""; 
    document.getElementById("Conversion2").src = ""; 
    document.getElementById("Conversion3").src = ""; 
    document.getElementById("Conversion4").src = ""; 
    document.getElementById("Construction1").src = ""; 
    document.getElementById("Construction2").src = ""; 
    document.getElementById("SquadListBackground1").src = ""; 
    document.getElementById("SquadListBackground2").src = ""; 
    document.getElementById("SquadListBackground3").src = ""; 
    document.getElementById("GarrisonUnit1").src = "";
    document.getElementById("GarrisonUnit2").src = "";
    document.getElementById("GarrisonUnit3").src = "";
    document.getElementById("GarrisonUnit4").src = "";
    document.getElementById("GarrisonUnit5").src = "";
    document.getElementById("GarrisonUnit6").src = "";
    document.getElementById("GarrisonUnit7").src = "";
    document.getElementById("GarrisonUnit8").src = "";
    document.getElementById("GarrisonUnit9").src = "";
    document.getElementById("GarrisonUnit10").src = "";
    document.getElementById("SquadUnit1").src = "";
    document.getElementById("SquadUnit2").src = "";
    document.getElementById("SquadUnit3").src = "";
    document.getElementById("SquadUnit4").src = "";
    document.getElementById("SquadUnit5").src = "";
    document.getElementById("SquadUnit6").src = "";
    document.getElementById("SquadUnit7").src = "";
    document.getElementById("SquadUnit8").src = "";
    document.getElementById("SquadUnit9").src = "";
    document.getElementById("SquadUnit10").src = "";
    document.getElementById("Slider1").src = "";
    document.getElementById("Slider2").src = "";
    document.getElementById("SliderBackground1").src = "";
    document.getElementById("SliderBackground2").src = "";
    document.getElementById("MapUnit1").src = "";
    document.getElementById("MapUnit2").src = "";
    document.getElementById("Arrow").src = ("");
    document.getElementById("SquadTroops").innerHTML = ("");
    document.getElementById("TownTroops").innerHTML = ("");
    document.getElementById("TowerTroops").innerHTML = ("");   
}






function setup() {
    towns = [];
    squads = [];
    mapPoints = [];
    towns.push(new Town(100,340,1));
    towns.push(new Town(240,90,2));
    towns.push(new Town(355,233,3));
    towns.push(new Town(550,30,4));
    towns.push(new Town(695,400,5));
    towns.push(new Town(1080,330,6));
    towns.push(new Town(1085,100,7));
    towns.push(new Town(1320,260,8));
    document.getElementById("Slider1").style.left=1229;
    document.getElementById("Slider1").style.top=811;
    document.getElementById("Slider2").style.left=1529;
    document.getElementById("Slider2").style.top=811;
    document.getElementById("MapUnit1").style.left=0;
    document.getElementById("MapUnit1").style.top=0;
    document.getElementById("MapUnit2").style.left=0;
    document.getElementById("MapUnit2").style.top=0;
    mapPoints.push(new mapPoint(100,340));
    mapPoints.push(new mapPoint(240,90));
    mapPoints.push(new mapPoint(355,233));
    mapPoints.push(new mapPoint(550,30));
    mapPoints.push(new mapPoint(695,400));
    mapPoints.push(new mapPoint(1080,330));
    mapPoints.push(new mapPoint(1085,100));
    mapPoints.push(new mapPoint(1320,260));

    for(var a=0;a<maximumUnits;a++){
        document.getElementById("GarrisonUnit"+(a+1)).style.left = 1325;
        document.getElementById("GarrisonUnit"+(a+1)).style.top = 0;
        document.getElementById("SquadUnit"+(a+1)).style.left = 1025;
        document.getElementById("SquadUnit"+(a+1)).style.top = 0;
    }
}


function draw() {
    clearMap();
    renderSquads();
    document.getElementById("gold").innerHTML = ("Gold:"+gold);

    for(var a=0;a<squads.length;a++){
        if(squads[a].targetX != squads[a].x){
            for(var b=0;b<mapPoints.length;b++){
                if(mapPoints[b].x==squads[a].targetX&&mapPoints[b].y==squads[a].targetY){
                    if(adjacent(squads[a].x,squads[a].y,squads[a].targetX,squads[a].targetY)){
                        document.getElementById("Arrow").src = ("graphics/Arrow.png");
                        document.getElementById("Arrow").style.top = (squads[a].y + mapPoints[b].y)/2 +70;
                        document.getElementById("Arrow").style.left = (squads[a].x + mapPoints[b].x)/2;
                        console.log(angleBetween(squads[a].x,squads[a].y,mapPoints[b].x,mapPoints[b].y));
                        document.getElementById('Arrow').style.webkitTransform = "rotate("+angleBetween(squads[a].x,squads[a].y,mapPoints[b].x,mapPoints[b].y)+"deg)";
                    }
                }
            }  
        }
    }
    for (var i=0;i<towns.length;i++){
        towns[i].render();
        towns[i].update();
    }
    if(slider1IsHeld == true){
        document.getElementById("Slider1").style.top = mouseY + 790;       
        document.getElementById("Slider1").style.top = constrain(parseInt(document.getElementById("Slider1").style.top), 811, 939);
    }
    if(slider2IsHeld == true){
        document.getElementById("Slider2").style.top = mouseY + 790;       
        document.getElementById("Slider2").style.top = constrain(parseInt(document.getElementById("Slider2").style.top), 811, 939);
    }

}







