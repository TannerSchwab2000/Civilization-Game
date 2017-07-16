var selection;
var gold = 10;
var maximumUnits = 12;
var townCost = 3;
var turnFinished = true;
var turn = 1;
var turnAdvanced = false;
var redGold = 10;
var battle = 0;
var squad1;
var squad2;


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
    }else if(x1==1320 && y1==260){
        if(x2==1080 && y2==330 || x2==1415 && y2==125 || x2==1340 && y2==440){
            return true;
        }else{
            return false;
        }
    }else if(x1==1415 && y1==125){
        if(x2==1320 && y2==260){
            return true;
        }else{
            return false;
        }
    }else if(x1==1340 && y1==440){
        if(x2==1320 && y2==260 || x2==1730 && y2==500){
            return true;
        }else{
            return false;
        }
    }else if(x1==1730 && y1==500){
        if(x2==1340 && y2==440 || x2==1690 && y2==310){
            return true;
        }else{
            return false;
        }
    }else if(x1==1690 && y1==310){
        if(x2==1730 && y2==500){
            return true;
        }else{
            return false;
        }
    }
}

function advanceTurn(){
    if(turnAdvanced==false){
        turn++;
        console.log("Turn #"+turn);   
        console.log("Enemy Gold:"+redGold); 
        turnAdvanced=true; 

        for(var a=0;a<squads.length;a++){
            if(squads[a].team==2){
                squads[a].update();
                rand = round(random(0,squads[a].adjacentSpaces.length-1));
                squads[a].targetX = squads[a].adjacentSpaces[rand].x;
                squads[a].targetY = squads[a].adjacentSpaces[rand].y; 
            }
        }

        for(var a=0;a<mapPoints.length;a++){
            if(squadIsPresentAt(mapPoints[a].x,mapPoints[a].y,1)){
                if(squadIsPresentAt(mapPoints[a].x,mapPoints[a].y,2)){
                var presentSquads = [];
                for(var b=0;b<squads.length;b++){
                    if(squads[b].x == mapPoints[a].x && squads[b].y == mapPoints[a].y){
                        presentSquads.push(squads[b]);
                        console.log(presentSquads);
                        if(squads[b].team==1){
                            squad1=b;
                        }else if(squads[b].team==2){
                            squad2=b;
                        }
                    }
                }
                battle = 1;
            }
        }
    }
        
    }   
}

function removeSquadUnit(s,u){
    var removed = false;
    for(var a=0;a<squads[s].units.length;a++){
        if(squads[s].units[a].unitType==u){
            if(removed == false){
                squads[s].units.splice(a,1);   
                removed = true;
            }
        }
    }
    if(squads[s].units.length==0){
        squads.splice(s,1);
    } 
    
}

function removeTownUnit(t,u){
    var removed = false;
    if(u == 0){
       for(var a=0;a<towns[t].garrison.length;a++){
            if(towns[t].garrison[a].unitType==1 || towns[t].garrison[a].unitType==2 || towns[t].garrison[a].unitType==3){
                if(removed == false){
                    towns[t].garrison.splice(a,1);   
                    removed = true;
                }
            }
        }  
    }else{
        for(var a=0;a<towns[t].garrison.length;a++){
            if(towns[t].garrison[a].unitType==u){
                if(removed == false){
                    towns[t].garrison.splice(a,1);   
                    removed = true;
                }
            }
        }    
    }
    
    
}

function transferUnit(t,s,n){
    var removed = false;
    if(n == 0){
       for(var a=0;a<towns[t].garrison.length;a++){
            if(towns[t].garrison[a].unitType==1 || towns[t].garrison[a].unitType==2 || towns[t].garrison[a].unitType==3){
                if(removed == false){
                    squads[s].units.push(new Unit(towns[t].garrison[a].unitType));
                    towns[t].garrison.splice(a,1);   
                    removed = true;
                }
            }
        }  
    }else{
        for(var a=0;a<towns[t].garrison.length;a++){
            if(towns[t].garrison[a].unitType==n){
                if(removed == false){
                    squads[s].units.push(new Unit(n));
                    towns[t].garrison.splice(a,1);   
                    removed = true;
                }
            }
        }    
    }
    
    
}
function squadIsPresentAt(x,y,t){
    for(var a=0;a<squads.length;a++){
        if(squads[a].x == x && squads[a].y == y){
            if(squads[a].team == t){
                return true;    
            }
        }
    }
    return false;
}

function townIsPresentAt(x,y){
    for(var a=0;a<towns.length;a++){
        if(towns[a].x == x && towns[a].y == y){
            return true;
        }
    }
    return false;
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
    for(var a=1;a<13;a++){
        document.getElementById("town"+a).src = ""; 
        document.getElementById("Flag"+a).src = ""; 
    }  
    document.getElementById("ConvertUnitsButton").src = "";    
    document.getElementById("GarrisonButton").src = "";    
    document.getElementById("ConstructionsButton").src = "";    
    document.getElementById("TaxRatesButton").src = "";   
    document.getElementById("SettleTownButton").src = "";   
    document.getElementById("EndTurnButton").src = "";   
    document.getElementById("Conversion1").src = ""; 
    document.getElementById("Conversion2").src = ""; 
    document.getElementById("Conversion3").src = ""; 
    document.getElementById("Conversion4").src = ""; 
    document.getElementById("Construction1").src = ""; 
    document.getElementById("Construction2").src = ""; 
    document.getElementById("SquadListBackground1").src = ""; 
    document.getElementById("SquadListBackground2").src = ""; 
    document.getElementById("SquadListBackground3").src = ""; 
    for(var a=0;a<maximumUnits;a++){
        document.getElementById("GarrisonUnit"+(a+1)).src = "";  
        document.getElementById("SquadUnit"+(a+1)).src = "";  
    }
    document.getElementById("Slider1").src = "";
    document.getElementById("Slider2").src = "";
    document.getElementById("SliderBackground1").src = "";
    document.getElementById("SliderBackground2").src = "";
    document.getElementById("MapUnit1").src = "";
    document.getElementById("MapUnit2").src = "";
    document.getElementById("MapUnit3").src = "";
    document.getElementById("MapUnit4").src = "";
    document.getElementById("MapUnit5").src = "";
    document.getElementById("Arrow1").src = ("");
    document.getElementById("Arrow2").src = ("");
    document.getElementById("Arrow3").src = ("");
    document.getElementById("Arrow4").src = ("");
    document.getElementById("Arrow5").src = ("");
    document.getElementById("VS").src = ("");
    document.getElementById("MinusButton").src = ("");
    document.getElementById("PlusButton").src = ("");
    document.getElementById("NumberBackground").src = ("");
    document.getElementById("DividingLine").src = ("");
    document.getElementById("Map").src = ("");
    document.getElementById("SquadTroops").innerHTML = ("");
    document.getElementById("TownTroops").innerHTML = ("");
    document.getElementById("TowerTroops").innerHTML = ("");   
    document.getElementById("peasants").innerHTML = ("");   
    document.getElementById("slaves").innerHTML = (""); 
    document.getElementById("Number").innerHTML = ("");    
    document.getElementById("GoldPerTurn").innerHTML = (""); 
    document.getElementById("GrowthRate").innerHTML = ("");          
    document.getElementById("gold").innerHTML = ("");     
}






function setup() {
    towns = [];
    squads = [];
    mapPoints = [];
    
    
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
    mapPoints.push(new mapPoint(1415,125));
    mapPoints.push(new mapPoint(1340,440));
    mapPoints.push(new mapPoint(1730,500));
    mapPoints.push(new mapPoint(1690,310));

    var rand = round(random(0,11));
    towns.push(new Town(mapPoints[rand].x,mapPoints[rand].y,1,1));    

    rand = round(random(0,11));
    towns.push(new Town(mapPoints[rand].x,mapPoints[rand].y,2,2));     

    if(towns[1].x==towns[0].x&&towns[1].y==towns[0].y){
        rand = round(random(0,11));
        towns[1].x = mapPoints[rand].x;
        towns[1].y = mapPoints[rand].y;
    }

    for(var a=0;a<maximumUnits;a++){
        document.getElementById("GarrisonUnit"+(a+1)).style.left = 1325;
        document.getElementById("GarrisonUnit"+(a+1)).style.top = 0;
        document.getElementById("SquadUnit"+(a+1)).style.left = 1025;
        document.getElementById("SquadUnit"+(a+1)).style.top = 0;
    }
}


function draw() {
    turnAdvanced=false;
    clearMap();
    renderSquads();
    document.getElementById("Map").src = ("graphics/map.jpg");
    document.getElementById("gold").innerHTML = ("Gold:"+gold);
    document.getElementById("DividingLine").src = ("graphics/DividingLine.png");
    document.getElementById("EndTurnButton").src = ("graphics/EndTurnButton.png");

    for(var a=0;a<squads.length;a++){
        if(squads[a].targetX != squads[a].x){
            for(var b=0;b<mapPoints.length;b++){
                if(mapPoints[b].x==squads[a].targetX&&mapPoints[b].y==squads[a].targetY){
                    if(adjacent(squads[a].x,squads[a].y,squads[a].targetX,squads[a].targetY)){
                        if(squadIsPresentAt(squads[a].targetX,squads[a].targetY)==false){
                            document.getElementById("Arrow"+(a+1)).src = ("graphics/Arrow.png");
                            document.getElementById("Arrow"+(a+1)).style.top = (squads[a].y + mapPoints[b].y)/2 +70;
                            document.getElementById("Arrow"+(a+1)).style.left = (squads[a].x + mapPoints[b].x)/2;
                            document.getElementById('Arrow'+(a+1)).style.webkitTransform = "rotate("+angleBetween(squads[a].x,squads[a].y,mapPoints[b].x,mapPoints[b].y)+"deg)";    
                        }else{
                            for(var c=0;c<squads.length;c++){
                                if(squads[c].x == squads[a].targetX && squads[c].y == squads[a].targetY){
                                    if(squads[c].targetX != squads[c].x && squads[c].targetY != squads[c].y){
                                        document.getElementById("Arrow"+(a+1)).src = ("graphics/Arrow.png");
                                        document.getElementById("Arrow"+(a+1)).style.top = (squads[a].y + mapPoints[b].y)/2 +70;
                                        document.getElementById("Arrow"+(a+1)).style.left = (squads[a].x + mapPoints[b].x)/2;
                                        document.getElementById('Arrow'+(a+1)).style.webkitTransform = "rotate("+angleBetween(squads[a].x,squads[a].y,mapPoints[b].x,mapPoints[b].y)+"deg)";    
                                    }
                                }
                            }
                        }
                    }
                }
            }  
        }
    }
    for(var i=0;i<towns.length;i++){
        towns[i].render();
        towns[i].update();
    }
    for(var a=0;a<squads.length;a++){
        squads[a].render();
    }
    if(slider1IsHeld == true){
        document.getElementById("Slider1").style.top = mouseY + 790;       
        document.getElementById("Slider1").style.top = constrain(parseInt(document.getElementById("Slider1").style.top), 811, 939);
    }
    if(slider2IsHeld == true){
        document.getElementById("Slider2").style.top = mouseY + 790;       
        document.getElementById("Slider2").style.top = constrain(parseInt(document.getElementById("Slider2").style.top), 811, 939);
    }

    if(battle==1){
        clearMap();
        document.getElementById("MapUnit"+(squad1+1)).style.left = 700;
        document.getElementById("MapUnit"+(squad1+1)).style.top = 300;
        document.getElementById("VS").src = "graphics/VS.png";
        document.getElementById("VS").style.left = 900;
        document.getElementById("VS").style.top = 300;
        document.getElementById("MapUnit"+(squad2+1)).style.left = 1100;
        document.getElementById("MapUnit"+(squad2+1)).style.top = 300;

        document.getElementById("SquadListBackground1").src = "graphics/SquadListBackground.png";
        document.getElementById("SquadListBackground1").style.left = 300;
        document.getElementById("SquadListBackground1").style.top = 290;
        document.getElementById("SquadListBackground2").src = "graphics/SquadListBackground.png";
        document.getElementById("SquadListBackground2").style.left = 1400;
        document.getElementById("SquadListBackground2").style.top = 290;
        document.getElementById("Slider1").src = "graphics/Slider.png";
        document.getElementById("Slider2").src = "graphics/Slider.png";
        document.getElementById("SliderBackground1").src = "graphics/SliderBackground.png";
        document.getElementById("SliderBackground2").src = "graphics/SliderBackground.png";
        document.getElementById("Slider1").style.left = 509;
        document.getElementById("Slider1").style.top = 291;
        document.getElementById("SliderBackground1").style.left = 508;
        document.getElementById("SliderBackground1").style.top = 290;
        document.getElementById("Slider2").style.left = 1609;
        document.getElementById("Slider2").style.top = 291;
        document.getElementById("SliderBackground2").style.left = 1608;
        document.getElementById("SliderBackground2").style.top = 290;

        if(squads[squad1].units[squads[squad1].units.length-1].unitType==1){
            document.getElementById("MapUnit"+(squad1+1)).src = "graphics/SwordsmanUnit.png";   
        }else if(squads[squad1].units[squads[squad1].units.length-1].unitType==2){
            document.getElementById("MapUnit"+(squad1+1)).src = "graphics/KnightUnit.png";   
        }else if(squads[squad1].units[squads[squad1].units.length-1].unitType==3){
            document.getElementById("MapUnit"+(squad1+1)).src = "graphics/CavalryUnit.png";   
        }else if(squads[squad1].units[squads[squad1].units.length-1].unitType==4){
            document.getElementById("MapUnit"+(squad1+1)).src = "graphics/PeasantUnit.png";   
        }else if(squads[squad1].units[squads[squad1].units.length-1].unitType==5){
            document.getElementById("MapUnit"+(squad1+1)).src = "graphics/SlaveUnit.png";   
        }

        if(squads[squad2].units[squads[squad2].units.length-1].unitType==1){
            document.getElementById("MapUnit"+(squad2+1)).src = "graphics/SwordsmanUnit.png";   
        }else if(squads[squad2].units[squads[squad2].units.length-1].unitType==2){
            document.getElementById("MapUnit"+(squad2+1)).src = "graphics/KnightUnit.png";   
        }else if(squads[squad2].units[squads[squad2].units.length-1].unitType==3){
            document.getElementById("MapUnit"+(squad2+1)).src = "graphics/CavalryUnit.png";   
        }else if(squads[squad2].units[squads[squad2].units.length-1].unitType==4){
            document.getElementById("MapUnit"+(squad2+1)).src = "graphics/PeasantUnit.png";   
        }else if(squads[squad2].units[squads[squad2].units.length-1].unitType==5){
            document.getElementById("MapUnit"+(squad2+1)).src = "graphics/SlaveUnit.png";   
        }
    }

}







