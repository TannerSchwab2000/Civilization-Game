var squadListUnitHeld= false;
var squadListUnitNumber;
var mapUnitIsHeld;
var mapUnitNumber;
var townSelected = false;
var mouseIsPressed = false;
var slider1IsHeld = false;
var slider2IsHeld = false;
var garrisonUnitNumber;
var garrisonUnitIsHeld;
var sliderScale = 3.2;



function mouseReleased() {

    if(mapUnitIsHeld==true){
        for(var a=0;a<mapPoints.length;a++){
            if(mouseIsContainedIn(mapPoints[a].x,mapPoints[a].y,mapPoints[a].x+110,mapPoints[a].y+100)){
                squads[mapUnitNumber-1].targetX = mapPoints[a].x;
                squads[mapUnitNumber-1].targetY = mapPoints[a].y;
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
                            if(squads[b].units.length==0){
                                squads.splice(b,1);
                                document.getElementById("MapUnit"+(b+1)).style.top=-100;
                                console.log(document.getElementById("MapUnit"+(b+1)).style.top);
                            }
                        }
                    }

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
                                    if(squadIsPresentAt(towns[c].x,towns[c].y)==false){
                                        if(towns[c].garrison[garrisonUnitNumber-1].unitType==4){
                                            towns[c].peasants--;
                                        }else if(towns[c].garrison[garrisonUnitNumber-1].unitType==5){
                                            towns[c].slaves--;
                                        }
                                        squads.push(new Squad(towns[c].x,towns[c].y));     
                                        squads[squads.length-1].units.push(new Unit(towns[c].garrison[garrisonUnitNumber-1].unitType));
                                        towns[c].garrison.splice(garrisonUnitNumber-1,1); 
                                    }else{
                                        if(squads[b].x == towns[c].x && squads[b].y == towns[c].y){
                                            if(towns[c].garrison[garrisonUnitNumber-1]!=null){
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
        if(mouseIsContainedIn(870,766,1030,800)){
            for(var a=0;a<squads.length;a++){
                squads[a].update();
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