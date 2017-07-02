var selection;
var gold = 10;
var townSelected = false;
var mouseIsPressed = false;
var slider1IsHeld = false;
var slider2IsHeld = false;
var garrisonUnitNumber;
var garrisonUnitIsHeld;
var maximumUnits = 10;
var squadListUnitHeld= false;
var squadListUnitNumber;
var mapUnitIsHeld;
var mapUnitNumber;

function angleBetween(x1,y1,x2,y2){
    var p1 = {
        x: x1,
        y: y1
    };

    var p2 = {
        x: x2,
        y: y2
    };

    // angle in radians
    var angleRadians = Math.atan2(p2.y - p1.y, p2.x - p1.x);

    // angle in degrees
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
    document.getElementById("SquadTroops").innerHTML = ("");
    document.getElementById("TownTroops").innerHTML = ("");
    document.getElementById("TowerTroops").innerHTML = ("");   
}

function setup() {
    towns = [];
    squads = [];
    towns.push(new Town(100,340,1));
    towns.push(new Town(240,90,2));
    towns.push(new Town(355,233,3));
    towns.push(new Town(550,30,4));
    document.getElementById("Slider1").style.left=1229;
    document.getElementById("Slider1").style.top=811;
    document.getElementById("Slider2").style.left=1529;
    document.getElementById("Slider2").style.top=811;
    document.getElementById("MapUnit1").style.left=0;
    document.getElementById("MapUnit1").style.top=0;
    document.getElementById("MapUnit2").style.left=0;
    document.getElementById("MapUnit2").style.top=0;



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
        if(squads[a].targetX != 0){
            for(var b=0;b<towns.length;b++){
                if(towns[b].x==squads[a].targetX&&towns[b].y==squads[a].targetY){
                    document.getElementById("Arrow").style.top = (squads[a].y + towns[b].y)/2 +70;
                    document.getElementById("Arrow").style.left = (squads[a].x + towns[b].x)/2;
                    console.log(angleBetween(squads[a].x,squads[a].y,towns[b].x,towns[b].y));
                    document.getElementById('Arrow').style.webkitTransform = "rotate("+angleBetween(squads[a].x,squads[a].y,towns[b].x,towns[b].y)+"deg)";
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

function mouseReleased() {

    if(mapUnitIsHeld==true){
        for(var a=0;a<towns.length;a++){
            if(mouseIsContainedIn(parseInt(document.getElementById("town"+(a+1)).style.left),parseInt(document.getElementById("town"+(a+1)).style.top),parseInt(document.getElementById("town"+(a+1)).style.left)+110,parseInt(document.getElementById("town"+(a+1)).style.top)+100)){
                squads[mapUnitNumber-1].targetX = towns[a].x;
                squads[mapUnitNumber-1].targetY = towns[a].y;
                console.log(squads[mapUnitNumber-1]);
            }
        }
    }

    if(squadListUnitHeld==true){
        if(mouseIsContainedIn(1320,810,1525,960)){
            for(var a=0;a<towns.length;a++){
                if(selection == towns[a]){
                    for(var b=0;b<squads.length;b++){
                        if(squads[b].x==towns[a].x&&squads[b].y==towns[a].y){
                            if(squads[b].units[squadListUnitNumber-1].unitType==4){
                                towns[a].peasants++;
                            }else if(squads[b].units[squadListUnitNumber-1].unitType==5){
                                towns[a].slaves++;
                            }
                            towns[a].garrison.push(new Unit(squads[b].units[squadListUnitNumber-1].unitType));
                            squads[b].units.splice(squadListUnitNumber-1,1);
                            console.log(towns[a].garrison,squads[b].units);
                        }
                    }

                    console.log(a);
                }
            }
            console.log("Unit dropped");
        }
    }

    
    if(garrisonUnitIsHeld==true){
        if(mouseIsContainedIn(1020,810,1230,960)){
            for(var a=0;a<maximumUnits;a++){
                if(garrisonUnitNumber==(a+1)){
                    if(squads.length>0){
                        for(var b=0;b<squads.length;b++){
                            for(var c=0;c<towns.length;c++){
                                if(selection == towns[c]){
                                    if(squads[b].x == towns[c].x && squads[b].y == towns[c].y){
                                        if(towns[c].garrison[garrisonUnitNumber-1].unitType==4){
                                            towns[c].peasants--;
                                        }else if(towns[c].garrison[garrisonUnitNumber-1].unitType==5){
                                            towns[c].slaves--;
                                        }
                                        squads[b].units.push(new Unit(towns[c].garrison[garrisonUnitNumber-1].unitType));
                                        towns[c].garrison.splice(garrisonUnitNumber-1,1);
                                        console.log(towns[c].garrison,squads[b].units);
                                    }
                                }
                            }
                        }    
                    }else{
                        for(var c=0;c<towns.length;c++){
                            if(selection == towns[c]){
                                if(towns[c].garrison[garrisonUnitNumber-1].unitType==4){
                                    towns[c].peasants--;
                                }else if(towns[c].garrison[garrisonUnitNumber-1].unitType==5){
                                    towns[c].slaves--;
                                }
                                squads.push(new Squad(towns[c].x,towns[c].y));     
                                squads[0].units.push(new Unit(towns[c].garrison[garrisonUnitNumber-1].unitType));
                                towns[c].garrison.splice(garrisonUnitNumber-1,1);
                            }   
                        }   
                    }   
                }
            }
        }
        
    }
    slider1IsHeld = false;
    slider2IsHeld = false;
    garrisonUnitIsHeld = false;
    squadListUnitHeld = false;
    mouseIsPressed = false;
    mapUnitIsHeld = false;
    console.log(mouseX,mouseY+800);
    for(var i=0;i<towns.length;i++){
        mouseDistance = Math.abs(mouseX-(towns[i].x+70)) + Math.abs((mouseY+800)-(towns[i].y+70))

        if(mouseDistance<100){
            selection = towns[i];
        }
        if(mouseIsContainedIn(310,850,470,890) && townSelected == true){
            for(var i=0;i<towns.length;i++){
                if(selection == towns[i]){
                    towns[i].menu = 1;
                }
            }
        }
        if(mouseIsContainedIn(490,850,650,890) && townSelected == true){
             for(var i=0;i<towns.length;i++){
                if(selection == towns[i]){
                    towns[i].menu = 2;
                }
            }
        }
        if(mouseIsContainedIn(1150,800,1300,840) && townSelected == true){
             for(var i=0;i<towns.length;i++){
                if(selection == towns[i] && towns[i].menu == 1){
                    if(towns[i].peasants>0){
                        towns[i].peasants--;
                        towns[i].slaves++;
                        gold = gold + 5;
                        var unitRemoved = false;
                        for(var c=0;c<towns[i].garrison.length;c++){
                            if(unitRemoved == false){
                                if(towns[i].garrison[c].unitType == 4){
                                    towns[i].garrison.splice(c,1); 
                                    towns[i].garrison.push(new Unit(5));
                                    unitRemoved = true;
                                }
                            }
                        }
                    }
                }
            }
        }
        if(mouseIsContainedIn(310,900,470,940) && townSelected == true){
            for(var i=0;i<towns.length;i++){
                if(selection == towns[i]){
                    towns[i].menu = 3;
                }
            }
        }
        
        if(mouseIsContainedIn(1600,805,1760,840) && townSelected == true){
                if(towns[i].peasants > 0 && gold >= 5 && selection == towns[i]){
                    towns[i].peasants--;
                    gold -=5;
                    console.log(towns[i].garrison);
                    var unitRemoved = false;
                        for(var c=0;c<towns[i].garrison.length;c++){
                            if(unitRemoved == false){
                                if(towns[i].garrison[c].unitType == 4){
                                    towns[i].garrison.splice(c,1); 
                                    towns[i].garrison.push(new Unit(1));
                                    unitRemoved = true;
                                }
                            }
                        }
                }
                    
        }
        if(mouseIsContainedIn(1600,865,1760,900) && townSelected == true){
                if(towns[i].peasants > 0 && gold >= 5 && selection == towns[i]){
                    towns[i].peasants--;
                    gold -=5;
                    var unitRemoved = false;
                        for(var c=0;c<towns[i].garrison.length;c++){
                            if(unitRemoved == false){
                                if(towns[i].garrison[c].unitType == 4){
                                    towns[i].garrison.splice(c,1); 
                                    towns[i].garrison.push(new Unit(2));
                                    unitRemoved = true;
                                }
                            }
                        }
                }
                    
        }
        if(mouseIsContainedIn(1600,925,1760,960) && townSelected == true){
                if(towns[i].peasants > 0 && gold >= 5 && selection == towns[i]){
                    towns[i].peasants--;
                    gold -=5;
                    var unitRemoved = false;
                        for(var c=0;c<towns[i].garrison.length;c++){
                            if(unitRemoved == false){
                                if(towns[i].garrison[c].unitType == 4){
                                    towns[i].garrison.splice(c,1); 
                                    towns[i].garrison.push(new Unit(3));
                                    unitRemoved = true;
                                }
                            }
                        }
                }          
        }
        

    }

    
    
}

function mousePressed(){
    mouseIsPressed = true;   

    for(var a=0;a<squads.length;a++){
        if(mouseIsContainedIn(parseInt(document.getElementById("MapUnit"+(a+1)).style.left),parseInt(document.getElementById("MapUnit"+(a+1)).style.top),parseInt(document.getElementById("MapUnit"+(a+1)).style.left)+80,parseInt(document.getElementById("MapUnit"+(a+1)).style.top)+90)){
            mapUnitIsHeld = true;
            mapUnitNumber = a+1;
        }
    }

    if(mouseIsPressed && mouseIsContainedIn(parseInt(document.getElementById("Slider1").style.left),parseInt(document.getElementById("Slider1").style.top),parseInt(document.getElementById("Slider1").style.left)+15,parseInt(document.getElementById("Slider1").style.top)+20) && townSelected == true){   
        slider1IsHeld = true;
    }
    if(mouseIsPressed && mouseIsContainedIn(parseInt(document.getElementById("Slider2").style.left),parseInt(document.getElementById("Slider2").style.top),parseInt(document.getElementById("Slider2").style.left)+15,parseInt(document.getElementById("Slider2").style.top)+20) && townSelected == true){   
        slider2IsHeld = true;
    }
    for(var e=0;e<towns.length;e++){
        if(selection == towns[e]){
            if(towns[e].garrison.length>0){
                for(var d=0;d<towns[e].garrison.length;d++){
                    if(document.getElementById("GarrisonUnit"+(d+1)) != null){
                        if(mouseIsContainedIn(parseInt(document.getElementById("GarrisonUnit"+(d+1)).style.left),parseInt(document.getElementById("GarrisonUnit"+(d+1)).style.top),parseInt(document.getElementById("GarrisonUnit"+(d+1)).style.left)+200,parseInt(document.getElementById("GarrisonUnit"+(d+1)).style.top)+40)){
                            if(mouseIsPressed && townSelected == true){     
                                garrisonUnitIsHeld = true;
                                garrisonUnitNumber = d+1;
                                console.log(d+1);
                            }    
                        }     
                    }                                     
                }    
            } 
        }
    }

    for(var e=0;e<towns.length;e++){
        if(selection == towns[e]){
            for(var d=0;d<squads.length;d++){
                if(squads[d].x == towns[e].x && squads[d].y == towns[e].y){
                    for(var a=0;a<squads[d].units.length;a++){
                        if(document.getElementById("SquadUnit"+(a+1)) != null){
                            if(mouseIsContainedIn(parseInt(document.getElementById("SquadUnit"+(a+1)).style.left),parseInt(document.getElementById("SquadUnit"+(a+1)).style.top),parseInt(document.getElementById("SquadUnit"+(a+1)).style.left)+200,parseInt(document.getElementById("SquadUnit"+(a+1)).style.top)+40)){
                                if(mouseIsPressed && townSelected == true){     
                                    squadListUnitHeld = true;
                                    squadListUnitNumber = a+1;
                                }    
                            }    
                        }
                    }
                }                                        
            }    
        }
    }

    
}





