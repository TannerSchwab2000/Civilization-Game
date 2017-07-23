var selection;
var gold = 10;
var maximumUnits = 20;
var townCost = 3;
var turnFinished = true;
var turn = 1;
var turnAdvanced = false;
var redGold = 10;
var battle = 0;
var battleScreen = 0;
var squad1;
var squad2;
var paused = false;
var winner = 0;
var advantage = 0;
var pushedButton = "";
var pressed = false;
var burning = false;
var burningTown;
var message1 = false;
var arrowMoving = false;
var arrowTargetX;
var arrowTargetY;
var targetSquad;

function adjustArrow(){
    if(arrowMoving==true){
        console.log("Moved");
        document.getElementById('Arrow').style.webkitTransform = "rotate("+angleBetween(parseInt(document.getElementById("Arrow").style.left),parseInt(document.getElementById("Arrow").style.top),arrowTargetX,arrowTargetY)+"deg)";  
        if(parseInt(document.getElementById("Arrow").style.left)!=arrowTargetX || parseInt(document.getElementById("Arrow").style.top)!=arrowTargetY){
            if(parseInt(document.getElementById("Arrow").style.left)-arrowTargetX < 0){
                document.getElementById("Arrow").style.left = parseInt(document.getElementById("Arrow").style.left) + 1; 
            }else if(parseInt(document.getElementById("Arrow").style.left)-arrowTargetX > 0){
                document.getElementById("Arrow").style.left = parseInt(document.getElementById("Arrow").style.left) - 1; 
            }

            if(parseInt(document.getElementById("Arrow").style.top)-arrowTargetY < 0){
                document.getElementById("Arrow").style.top = parseInt(document.getElementById("Arrow").style.top) + 1; 
            }else if(parseInt(document.getElementById("Arrow").style.top)-arrowTargetY > 0){
                document.getElementById("Arrow").style.top = parseInt(document.getElementById("Arrow").style.top) - 1; 
            }   
            setTimeout(adjustArrow,0.1);  
        }else{
            arrowMoving = false;
            if(squads[targetSquad].units.length>1){
                squads[targetSquad].units.splice(squads[targetSquad].units.length-1,1);   
            }else{
                squads.splice(targetSquad,1);
            }
        }    
    }
    
}

function arrowEffect(x1,y1,x2,y2){
    document.getElementById("Arrow").style.left = x1;
    document.getElementById("Arrow").style.top = y1;
    document.getElementById('Arrow').style.webkitTransform = "rotate("+angleBetween(x1,y1,x2,y2)+"deg)";  
    arrowMoving = true;
    arrowTargetX=x2+50;
    arrowTargetY=y2+50;
    setTimeout(adjustArrow,100);  
}

function resetMessages(){
    message1 = false;
}

function destroyTown(){
    towns.splice(burningTown,1);
    burning = false;
}

function burn(t){
    flameLevel = 0;
    burning = true;
    burningTown = t; 
    document.getElementById("FireSound").play();
    setTimeout(destroyTown, 2000);
}

function wait(){
    pressed = false;
}

function buttonEffect(n,t){
    pressed=true;
    setTimeout(wait, 100);
}

function mapPoint(x,y){
    this.x = x;
    this.y = y;
}


    
function adjacent(x1,y1,x2,y2){
    if(x1==50 && y1==340){
        if(x2==305 && y2==233){
            return true;
        }else{
            return false;
        }
    }else if(x1==190 && y1==90){
        if(x2==305 && y2==233){
            return true;
        }else{
            return false;
        }
    }else if(x1==305 && y1==233){
        if(x2==50 && y2==340 || x2==190 && y2==90 || x2==500 && y2==30 || x2==645 && y2==400){
            return true;
        }else{
            return false;
        }
    }else if(x1==500 && y1==30){
        if(x2==305 && y2==233){
            return true;
        }else{
            return false;
        }
    }else if(x1==645 && y1==400){
        if(x2==305 && y2==233|| x2==1050 && y2==330){
            return true;
        }else{
            return false;
        }
    }else if(x1==1050 && y1==330){
        if(x2==645 && y2==400 || x2==1035 && y2==100||x2==1270 && y2==260){
            return true;
        }else{
            return false;
        }
    }else if(x1==1035 && y1==100){
        if(x2==1050 && y2==330){
            return true;
        }else{
            return false;
        }
    }else if(x1==1270 && y1==260){
        if(x2==1050 && y2==330 || x2==1365 && y2==125 || x2==1290 && y2==440){
            return true;
        }else{
            return false;
        }
    }else if(x1==1365 && y1==125){
        if(x2==1270 && y2==260){
            return true;
        }else{
            return false;
        }
    }else if(x1==1290 && y1==440){
        if(x2==1270 && y2==260 || x2==1680 && y2==500){
            return true;
        }else{
            return false;
        }
    }else if(x1==1680 && y1==500){
        if(x2==1290 && y2==440 || x2==1640 && y2==310){
            return true;
        }else{
            return false;
        }
    }else if(x1==1640 && y1==310){
        if(x2==1680 && y2==500){
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


        for(var a=0;a<mapPoints.length;a++){
            if(squadIsPresentAt(mapPoints[a].x,mapPoints[a].y,1)){
                if(squadIsPresentAt(mapPoints[a].x,mapPoints[a].y,2)){
                var presentSquads = [];
                for(var b=0;b<squads.length;b++){
                    if(squads[b].x == mapPoints[a].x && squads[b].y == mapPoints[a].y){
                        presentSquads.push(squads[b]);
                        if(squads[b].team==1){
                            squad1=b;
                        }else if(squads[b].team==2){
                            squad2=b;
                        }
                    }
                }
                battle = 1;
                document.getElementById("Slider1").style.top = 290;
                document.getElementById("Slider2").style.top = 290;
            }
        }

    }

    for(var a=0;a<towns.length;a++){
        if(squadIsPresentAt(towns[a].x,towns[a].y,1)==false&&squadIsPresentAt(towns[a].x,towns[a].y,2)&&towns[a].team==1){
            if(towns[a].wall==false){
                burn(a);     
            } 
        }
    }

    for(var a=0;a<squads.length;a++){
        if(squads[a].team==2 && battle == 0){
            squads[a].update();
            rand = round(random(0,squads[a].adjacentSpaces.length-1));
            squads[a].targetX = squads[a].adjacentSpaces[rand].x;
            squads[a].targetY = squads[a].adjacentSpaces[rand].y; 

        }
        if(squads[a].team==1 && battle == 0){
            squads[a].update();
        }


    }

    for(var a=0;a<towns.length;a++){
        towns[a].arrowFired = false;
    }



        
    }   
}

function calculateAdvantage(u1,u2){
    if(u1 == 1){
        if(u2 == 2){
            advantage = 1;
            return 1;
        }else if(u2 == 3){
            advantage = 1;
            return 2;
        }else if(u2 == 1){
            advantage = 0;
            return 0;
        }else if(u2 == 5){
            advantage = 3;
            return 1;
        }else{
            advantage = 2;
            return 1;
        }
    }else if(u1 == 2){
        if(u2 == 1){
            advantage = 1;
            return 2;
        }else if(u2 == 3){
            advantage = 1;
            return 1;
        }else if(u2 == 2){
            advantage = 0;
            return 0;
        }else if(u2 == 5){
            advantage = 3;
            return 1;
        }else{
            advantage = 2;
            return 1;
        }
    }else if(u1 == 3){
        if(u2 == 1){
            advantage = 1;
            return 1;
        }else if(u2 == 2){
            advantage = 1;
            return 2;
        }else if(u2 == 3){
            advantage = 0;
            return 0;
        }else if(u2 == 5){
            advantage = 3;
            return 1;
        }else{
            advantage = 2;
            return 1;
        }
    }else if(u1 == 4){
        if(u2 == 1 || u2 == 2 || u2 == 3){
            advantage = 2;
            return 2;
        }else if(u2 == 5){
            advantage = 1;
            return 1;
        }else{
            advantage = 0;
            return 0;
        }
    }else if(u1 == 5){
        if(u2 == 1 || u2 == 2 || u2 == 3){
            advantage = 3;
            return 2;
        }else if(u2 == 4){
            advantage = 1;
            return 2;
        }else{
            advantage = 0;
            return 0;
        }
    }
}

function removeSquadUnit(s,u){
    var removed = false;
    if(squads[s] != null){
        for(var a=0;a<squads[s].units.length;a++){
            if(u==0){
                if(squads[s].units[a].unitType==1 || squads[s].units[a].unitType==2 || squads[s].units[a].unitType==3){
                    if(removed == false){
                        squads[s].units.splice(a,1);   
                        removed = true;
                    }
                }
            }else{
                if(squads[s].units[a].unitType==u){
                    if(removed == false){
                        squads[s].units.splice(a,1);   
                        removed = true;
                    }
                }
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
                console.log("good");
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
    var angleDeg = Math.atan2(p2.y - p1.y, p2.x - p1.x) * 190 / Math.PI;  
    return(angleDeg);  
}


function mouseIsContainedIn(x1,y1,x2,y2){
    if(battle==1 && battleScreen == 1){
        if(mouseX>x1 && (mouseY)>y1 && mouseX<x2 && (mouseY)<y2){
            return true;
        }else{
            return false;
        }
    }else{
        if(mouseX>x1 && (mouseY+800)>y1 && mouseX<x2 && (mouseY+800)<y2){
            return true;
        }else{
            return false;
        }
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

            if(selection==squads[a]){
                document.getElementById("MapUnit" + (a+1)).style.WebkitFilter="brightness(120%)";
            }else{
                document.getElementById("MapUnit" + (a+1)).style.WebkitFilter="brightness(100%)"
            }
        }
    }
}


function clearMap(){
    for(var a=1;a<13;a++){
        document.getElementById("town"+a).src = ""; 
        document.getElementById("Flag"+a).src = ""; 
        document.getElementById("Tower"+a).src = ""; 
    }  
    document.getElementById("ConvertUnitsButton").src = "";    
    document.getElementById("GarrisonButton").src = "";    
    document.getElementById("ConstructionsButton").src = "";    
    document.getElementById("TaxRatesButton").src = "";   
    document.getElementById("SettleTownButton").src = "";   
    document.getElementById("EndTurnButton").src = "";    
    document.getElementById("RaiseTownButton").src = "";
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
    document.getElementById("MapUnit6").src = "";
    document.getElementById("MapUnit7").src = "";
    document.getElementById("MapUnit8").src = "";
    document.getElementById("Arrow1").src = ("");
    document.getElementById("Arrow2").src = ("");
    document.getElementById("Arrow3").src = ("");
    document.getElementById("Arrow4").src = ("");
    document.getElementById("Arrow5").src = ("");
    document.getElementById("Arrow6").src = ("");
    document.getElementById("Arrow7").src = ("");
    document.getElementById("Arrow8").src = ("");
    document.getElementById("VS").src = ("");
    document.getElementById("MinusButton").src = ("");
    document.getElementById("PlusButton").src = ("");
    document.getElementById("NumberBackground").src = ("");
    document.getElementById("DividingLine").src = ("");
    document.getElementById("Map").src = ("");
    document.getElementById("RollButton").src = ("");
    document.getElementById("X").src = ("");
    document.getElementById("Swords").src = ("");
    document.getElementById("Fire").src = ("");
    document.getElementById("Arrow").src = ("");
    document.getElementById("SoldierToPeasant").src = ("");
    document.getElementById("HorizontalLine").src = ("");
    document.getElementById("SquadTroops").innerHTML = ("");
    document.getElementById("TownTroops").innerHTML = ("");
    document.getElementById("TowerTroops").innerHTML = ("");   
    document.getElementById("peasants").innerHTML = ("");   
    document.getElementById("slaves").innerHTML = (""); 
    document.getElementById("Number").innerHTML = ("");    
    document.getElementById("GoldPerTurn").innerHTML = (""); 
    document.getElementById("GrowthRate").innerHTML = ("");          
    document.getElementById("gold").innerHTML = ("");     
    document.getElementById("Advantage").innerHTML = ("");   
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
    mapPoints.push(new mapPoint(50,340));
    mapPoints.push(new mapPoint(190,90));
    mapPoints.push(new mapPoint(305,233));
    mapPoints.push(new mapPoint(500,30));
    mapPoints.push(new mapPoint(645,400));
    mapPoints.push(new mapPoint(1050,330));
    mapPoints.push(new mapPoint(1035,100));
    mapPoints.push(new mapPoint(1270,260));
    mapPoints.push(new mapPoint(1365,125));
    mapPoints.push(new mapPoint(1290,440));
    mapPoints.push(new mapPoint(1680,500));
    mapPoints.push(new mapPoint(1640,310));

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
    document.getElementById("HorizontalLine").src = ("graphics/HorizontalLine.png");
    document.getElementById("EndTurnButton").src = ("graphics/EndTurnButton.png");

    for(var d=0;d<towns.length;d++){
        for(var a=0;a<mapPoints.length;a++){
            if(adjacent(towns[d].x,towns[d].y,mapPoints[a].x,mapPoints[a].y)){
                for(var b=0;b<squads.length;b++){
                    if(squads[b].x == mapPoints[a].x && squads[b].y== mapPoints[a].y){
                        if(towns[d].tower==true && squads[b].team != towns[d].team){
                            console.log("Fired");
                            if(towns[d].arrowFired==false){
                                towns[d].arrowFired = true; 
                                targetSquad = b;
                                arrowEffect(towns[d].x,towns[d].y,mapPoints[a].x,mapPoints[a].y);   
                            }
                        }
                    }
                }
            }
        }    
    }
    

    if(arrowMoving){
        document.getElementById("Arrow").src = ("graphics/Arrow2.png"); 
    }

    if(battle == 1 && battleScreen == 0){
        document.getElementById("EndTurnButton").src = "";
    }

    if(burning==true){
        document.getElementById("Fire").src = "graphics/Fire.png";  
        document.getElementById("Fire").style.left = towns[burningTown].x;
        document.getElementById("Fire").style.top = towns[burningTown].y;
    }
    


    if(pushedButton != ""){
        if(pressed==true){
            document.getElementById(pushedButton).style.WebkitFilter="brightness(80%)";
        }else{
            document.getElementById(pushedButton).style.WebkitFilter="brightness(100%)";
        }    
    }
    

    for(var a=0;a<mapPoints.length;a++){
        if(battle == 1){
            if(squads[squad1].x == mapPoints[a].x && squads[squad1].y == mapPoints[a].y){
                document.getElementById("Swords").src = ("graphics/CrossedSwords.png");
                document.getElementById("Swords").style.left = mapPoints[a].x;  
                document.getElementById("Swords").style.top = mapPoints[a].y;  
            }
        }
    }

    for(var a=0;a<squads.length;a++){
        if(squads[a].targetX != squads[a].x){
            for(var b=0;b<mapPoints.length;b++){
                if(mapPoints[b].x==squads[a].targetX&&mapPoints[b].y==squads[a].targetY){
                    if(adjacent(squads[a].x,squads[a].y,squads[a].targetX,squads[a].targetY)){
                        if(squads[a].team==1){
                            if(squadIsPresentAt(squads[a].targetX,squads[a].targetY,1)==false){
                                document.getElementById("Arrow"+(a+1)).src = ("graphics/Arrow.png");
                                document.getElementById("Arrow"+(a+1)).style.top = (squads[a].y + mapPoints[b].y)/2 +70;
                                document.getElementById("Arrow"+(a+1)).style.left = (squads[a].x + mapPoints[b].x)/2;
                                document.getElementById('Arrow'+(a+1)).style.webkitTransform = "rotate("+angleBetween(squads[a].x,squads[a].y,mapPoints[b].x,mapPoints[b].y)+"deg)";    
                            }else{
                                for(var z=0;z<squads.length;z++){
                                    if(squads[z].x==squads[a].targetX&&squads[z].y==squads[a].targetY){
                                        if(squads[z].targetX != squads[z].x && squads[z].y != squads[z].targetY){
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
    }
    for(var i=0;i<towns.length;i++){
        towns[i].render();
        towns[i].update();
    }

    if(message1==true){
        document.getElementById("SquadTroops").style.top = 835;
        document.getElementById("SquadTroops").innerHTML = "You need at least 2 peasants to reproduce.";
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

    if(battle==1 && battleScreen==1){
        clearMap();

        if(calculateAdvantage(squads[squad1].units[squads[squad1].units.length-1].unitType,squads[squad2].units[squads[squad2].units.length-1].unitType) == 1){
            document.getElementById("Advantage").innerHTML = ("+"+advantage+" Advantage");    
            document.getElementById("Advantage").style.left = 670;
            document.getElementById("Advantage").style.top = 400;
        }else if(calculateAdvantage(squads[squad1].units[squads[squad1].units.length-1].unitType,squads[squad2].units[squads[squad2].units.length-1].unitType) == 2){
            document.getElementById("Advantage").innerHTML = ("+"+advantage+" Advantage");    
            document.getElementById("Advantage").style.left = 1090;
            document.getElementById("Advantage").style.top = 400;
        }

        if(paused==true){
            document.getElementById("X").src = "graphics/X.png";
            document.getElementById("RollButton").src = "graphics/NextButton.png";
        }else{
            document.getElementById("RollButton").src = "graphics/RollButton.png";
        }
        
        if(slider1IsHeld){
            document.getElementById("Slider1").style.top = mouseY;       
            document.getElementById("Slider1").style.top = constrain(parseInt(document.getElementById("Slider1").style.top), 291, 420);
        }
        if(slider2IsHeld){
            document.getElementById("Slider2").style.top = mouseY;       
            document.getElementById("Slider2").style.top = constrain(parseInt(document.getElementById("Slider2").style.top), 291, 420);
        }

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
        document.getElementById("SliderBackground1").style.left = 508;
        document.getElementById("SliderBackground1").style.top = 290;
        document.getElementById("Slider2").style.left = 1609;
        document.getElementById("SliderBackground2").style.left = 1608;
        document.getElementById("SliderBackground2").style.top = 290;
        document.getElementById("Swords").style.left = 0;  
        document.getElementById("Swords").style.top = 0;  



        for(var a=0;a<squads[squad1].units.length;a++){
            document.getElementById("SquadUnit"+(a+1)).style.left = 305;
            document.getElementById("SquadUnit"+(a+1)).style.top = 305 +(45*squads[squad1].units.length-1)-(45*(a+1))+(291-parseInt(document.getElementById("Slider1").style.top));

            if(squads[squad1].units[a].unitType==1){
                document.getElementById("SquadUnit"+(a+1)).src = "graphics/SwordsmanListUnit.png";   
            }else if(squads[squad1].units[a].unitType==2){
                document.getElementById("SquadUnit"+(a+1)).src = "graphics/KnightListUnit.png";   
            }else if(squads[squad1].units[a].unitType==3){
                document.getElementById("SquadUnit"+(a+1)).src = "graphics/CavalryListUnit.png";   
            }else if(squads[squad1].units[a].unitType==4){
                document.getElementById("SquadUnit"+(a+1)).src = "graphics/PeasantListUnit.png";   
            }else if(squads[squad1].units[a].unitType==5){
                document.getElementById("SquadUnit"+(a+1)).src = "graphics/SlaveListUnit.png";   
            }

            if(parseInt(document.getElementById("SquadUnit"+(a+1)).style.top)>420 || parseInt(document.getElementById("SquadUnit"+(a+1)).style.top)<285){
                document.getElementById("SquadUnit"+(a+1)).src = ""; 
            }

        }

        if(squads[squad2] != null){
            for(var a=0;a<squads[squad2].units.length;a++){
                document.getElementById("GarrisonUnit"+(a+1)).style.left = 1405;
                document.getElementById("GarrisonUnit"+(a+1)).style.top = 305 +(45*squads[squad2].units.length-1)-(45*(a+1))+(291-parseInt(document.getElementById("Slider2").style.top));

                if(squads[squad2].units[a].unitType==1){
                    document.getElementById("GarrisonUnit"+(a+1)).src = "graphics/SwordsmanListUnit.png";   
                }else if(squads[squad2].units[a].unitType==2){
                    document.getElementById("GarrisonUnit"+(a+1)).src = "graphics/KnightListUnit.png";   
                }else if(squads[squad2].units[a].unitType==3){
                    document.getElementById("GarrisonUnit"+(a+1)).src = "graphics/CavalryListUnit.png";   
                }else if(squads[squad2].units[a].unitType==4){
                    document.getElementById("GarrisonUnit"+(a+1)).src = "graphics/PeasantListUnit.png";   
                }else if(squads[squad2].units[a].unitType==5){
                    document.getElementById("GarrisonUnit"+(a+1)).src = "graphics/SlaveListUnit.png";   
                }

                if(parseInt(document.getElementById("GarrisonUnit"+(a+1)).style.top)>420 || parseInt(document.getElementById("GarrisonUnit"+(a+1)).style.top)<285){
                    document.getElementById("GarrisonUnit"+(a+1)).src = ""; 
                }

            }    
        }
        

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

        if(squads[squad2] != null){
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

}
