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
var firingTown;
var turnFinished = true;
var turn = 1;
var turnAdvanced = false;

function reRollTowns(){
    if(abs(towns[1].x-towns[0].x)+abs(towns[1].y-towns[0].y)<800){
        rand = round(random(0,11));
        towns[1].x = mapPoints[rand].x;
        towns[1].y = mapPoints[rand].y;
    }
    if(abs(towns[1].x-towns[0].x)+abs(towns[1].y-towns[0].y)<800){
        reRollTowns();
    }
}

function adjustArrow(){
    var t = firingTown;
    if(towns[t]!=null){
        if(arrowMoving==true){
                document.getElementById("RealArrow"+(t+1)).style.webkitTransform = "rotate("+angleBetween(parseInt(document.getElementById("RealArrow"+(t+1)).style.left),parseInt(document.getElementById("RealArrow"+(t+1)).style.top),towns[t].arrowTargetX,towns[t].arrowTargetY)+"deg)";  
                if(abs(parseInt(document.getElementById("RealArrow"+(t+1)).style.left)-towns[t].arrowTargetX)>15 || abs(parseInt(document.getElementById("RealArrow"+(t+1)).style.top)-towns[t].arrowTargetY)>15){
                    if(parseInt(document.getElementById("RealArrow"+(t+1)).style.left)-towns[t].arrowTargetX < -5){
                        document.getElementById("RealArrow"+(t+1)).style.left = parseInt(document.getElementById("RealArrow"+(t+1)).style.left) + 15; 
                    }else if(parseInt(document.getElementById("RealArrow"+(t+1)).style.left)-towns[t].arrowTargetX > 5){
                        document.getElementById("RealArrow"+(t+1)).style.left = parseInt(document.getElementById("RealArrow"+(t+1)).style.left) - 15; 
                    }

                    if(parseInt(document.getElementById("RealArrow"+(t+1)).style.top)-towns[t].arrowTargetY < -5){
                        document.getElementById("RealArrow"+(t+1)).style.top = parseInt(document.getElementById("RealArrow"+(t+1)).style.top) + 15; 
                    }else if(parseInt(document.getElementById("RealArrow"+(t+1)).style.top)-towns[t].arrowTargetY > 5){
                        document.getElementById("RealArrow"+(t+1)).style.top = parseInt(document.getElementById("RealArrow"+(t+1)).style.top) - 15; 
                    }   
                    setTimeout(adjustArrow,1);  
                }else{
                    arrowMoving = false;
                    if(squads[towns[t].targetSquad].units.length>1){
                        squads[towns[t].targetSquad].units.splice(squads[towns[t].targetSquad].units.length-1,1);   
                    }else{
                        squads.splice(towns[t].targetSquad,1);
                    }
                }    
            }
    }
    
    
}

function arrowEffect(x1,y1,x2,y2,t){
    document.getElementById("RealArrow"+(t+1)).style.left = x1;
    document.getElementById("RealArrow"+(t+1)).style.top = y1;
    arrowMoving = true;
    towns[t].arrowTargetX=x2+50;
    towns[t].arrowTargetY=y2+50;
    firingTown = t;
    setTimeout(adjustArrow,0.1); 
}

function resetMessages(){
    message1 = false;
}

function destroyTown(){
    towns[burningTown].burnt = true;
    burning = false;
    if(burningTown==firingTown){
        arrowMoving=false;
    }
    burningTown = -1;
}

function burn(t){
    if(burning==false){
        burning = true;
        burningTown = t; 
        document.getElementById("FireSound").play();
        setTimeout(destroyTown, 2000);    
    }
    
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
        towns[a].arrowFired = false;
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
        }else if(u2 == 5||u2 == 6){
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
        }else if(u2 == 5||u2 == 6){
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
        }else if(u2 == 5||u2 == 6){
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
        }else if(u2 == 6){
            advantage = 2;
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
        }else if(u2 == 6){
            advantage = 1;
            return 1;
        }else{
            advantage = 0;
            return 0;
        }
    }else if(u1 == 6){
        if(u2 == 1 || u2 == 2 || u2 == 3){
            advantage = 3;
            return 2;
        }else if(u2 == 4){
            advantage = 2;
            return 2;
        }else if(u2 == 5){
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
    
    
    if(squads[s].units.length==0){
        squads.splice(s,1);
    } 

    }
    
}

function removeTownUnit(t,u){
    var removed = false;
    if(towns[t]!=null){
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
    
}



function transferUnit(t,s,n){
    var removed = false;
    if(towns[t]!=null){
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
            }else if(squads[a].units[squads[a].units.length-1].unitType == 6){
                document.getElementById("MapUnit" + (a+1)).src = "graphics/RamUnit.png"; 
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
        document.getElementById("RealArrow"+a).src = "";
        document.getElementById("MapUnit"+a).src = "";
        document.getElementById("Arrow"+a).src = ("");
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
    document.getElementById("Conversion5").src = ""; 
    document.getElementById("Construction1").src = ""; 
    document.getElementById("Construction2").src = ""; 
    document.getElementById("SquadListBackground1").src = ""; 
    document.getElementById("SquadListBackground2").src = ""; 
    for(var a=0;a<maximumUnits;a++){
        document.getElementById("GarrisonUnit"+(a+1)).src = "";  
        document.getElementById("SquadUnit"+(a+1)).src = "";  
    }
    document.getElementById("Slider1").src = "";
    document.getElementById("Slider2").src = "";
    document.getElementById("SliderBackground1").src = "";
    document.getElementById("SliderBackground2").src = "";
    document.getElementById("VS").src = ("");
    document.getElementById("MinusButton").src = ("");
    document.getElementById("PlusButton").src = ("");
    document.getElementById("NumberBackground").src = ("");
    document.getElementById("DividingLine").src = ("");
    document.getElementById("RollButton").src = ("");
    document.getElementById("X").src = ("");
    document.getElementById("Swords").src = ("");
    document.getElementById("Fire").src = ("");
    document.getElementById("SoldierToPeasant").src = ("");
    document.getElementById("HorizontalLine").src = ("");
    document.getElementById("DestroyWallButton").src = ("");
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
