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
    if(battle==0){
        console.log(mouseX,mouseY+800);
    }else{
        console.log(mouseX,mouseY);
    }
    

    if(mouseIsContainedIn(890,480,1050,515)&&battle==1){
        if(paused == false){

            if(calculateAdvantage(squads[squad1].units[squads[squad1].units.length-1].unitType,squads[squad2].units[squads[squad2].units.length-1].unitType) == 1){
                rand1 = round(random(1+advantage,6));
                document.getElementById("Roll1").innerHTML = (rand1);    
                rand2 = round(random(1,6));
                document.getElementById("Roll2").innerHTML = (rand2);   
            }else if(calculateAdvantage(squads[squad1].units[squads[squad1].units.length-1].unitType,squads[squad2].units[squads[squad2].units.length-1].unitType) == 2){
                rand1 = round(random(1,6));
                document.getElementById("Roll1").innerHTML = (rand1);    
                rand2 = round(random(1+advantage,6));
                document.getElementById("Roll2").innerHTML = (rand2); 
            }

            if(rand1>rand2){
                paused = true;
                winner = 1;
                document.getElementById("X").src = "graphics/X.png";
                document.getElementById("X").style.left = 1100;
                document.getElementById("X").style.top = 300;
                document.getElementById("Roll1").style.color = "green";  
                document.getElementById("Roll2").style.color = "red";   
            }else if(rand1<rand2){
                paused = true;
                winner = 2;
                document.getElementById("X").src = "graphics/X.png";
                document.getElementById("X").style.left = 700;
                document.getElementById("X").style.top = 300;
                document.getElementById("Roll2").style.color = "green";  
                document.getElementById("Roll1").style.color = "red"; 
            }else if(rand1==rand2){
                document.getElementById("Roll2").style.color = "yellow";  
                document.getElementById("Roll1").style.color = "yellow";  
            }
        }else{
            paused = false;
            document.getElementById("Roll1").innerHTML = null; 
            document.getElementById("Roll2").innerHTML = null;  
            
            if(winner==1){
                if(squads[squad2] != null){
                    if(squads[squad2].units.length>1){
                        removeSquadUnit(squad2,squads[squad2].units[squads[squad2].units.length-1].unitType);   
                    }else{
                        squads.splice(squad2,1);
                        battle = 0;
                        battleScreen = 0;
                        document.getElementById("Roll1").innerHTML = ("");    
                        document.getElementById("Roll2").innerHTML = ("");   
                        document.getElementById("SquadListBackground1").style.left = 1020; 
                        document.getElementById("SquadListBackground1").style.top = 810; 
                        document.getElementById("SquadListBackground2").style.left = 1320; 
                        document.getElementById("SquadListBackground2").style.top = 810; 
                        document.getElementById("SliderBackground1").style.left = 1228; 
                        document.getElementById("SliderBackground1").style.top = 810; 
                        document.getElementById("SliderBackground2").style.left = 1528; 
                        document.getElementById("SliderBackground2").style.top = 810; 
                        document.getElementById("Slider1").style.left = 1229; 
                        document.getElementById("Slider1").style.top = 811; 
                        document.getElementById("Slider2").style.left = 1529; 
                        document.getElementById("Slider2").style.top = 811;   
                    }
                }

            }else if(winner==2){
                if(squads[squad1] != null){
                    if(squads[squad1].units.length>1){
                        removeSquadUnit(squad1,squads[squad1].units[squads[squad1].units.length-1].unitType);   
                    }else{
                        squads.splice(squad1,1);
                        battle = 0;
                        battleScreen = 0;
                        document.getElementById("Roll1").innerHTML = ("");    
                        document.getElementById("Roll2").innerHTML = ("");  
                        document.getElementById("SquadListBackground1").style.left = 1020; 
                        document.getElementById("SquadListBackground1").style.top = 810; 
                        document.getElementById("SquadListBackground2").style.left = 1320; 
                        document.getElementById("SquadListBackground2").style.top = 810; 
                        document.getElementById("SliderBackground1").style.left = 1228; 
                        document.getElementById("SliderBackground1").style.top = 810; 
                        document.getElementById("SliderBackground2").style.left = 1528; 
                        document.getElementById("SliderBackground2").style.top = 810; 
                        document.getElementById("Slider1").style.left = 1229; 
                        document.getElementById("Slider1").style.top = 811; 
                        document.getElementById("Slider2").style.left = 1529; 
                        document.getElementById("Slider2").style.top = 811; 
                    }
                }

            }
            winner = 0;
        }
    }

    if(battle == 1 && battleScreen == 0){
        if(mouseIsContainedIn(squads[squad1].x,squads[squad1].y,squads[squad1].x+100,squads[squad1].y+100)){
        battleScreen = 1;
        }    
    }
    

    if(mouseIsContainedIn(1070,880,1090,900)){
        for(var a=0;a<towns.length;a++){
            if(selection==towns[a] && towns[a].menu == 4){
                if(towns[a].realTaxRate>-1){
                    towns[a].realTaxRate--;
                }
            }
        }
    }

    if(mouseIsContainedIn(1130,880,1150,900)){
        for(var a=0;a<towns.length;a++){
            if(selection==towns[a] && towns[a].menu == 4){
                if(towns[a].realTaxRate<4){
                    towns[a].realTaxRate++;   
                }
            }
        }
    }

    if(mouseIsContainedIn(490,900,650,935)){
        for(var a=0;a<towns.length;a++){
            if(selection==towns[a]){
                towns[a].menu=4;
            }
        }
    }

    for(var a=0;a<squads.length;a++){
        if(selection == squads[a]){
            if(squads[a].slaves>=townCost){
                if(mouseIsContainedIn(1300,810,1462,845)){
                    towns.push(new Town(squads[a].x,squads[a].y,towns.length+1,1));  
                    for(var b=0;b<townCost;b++){
                        removeSquadUnit(a,5);      
                    }     
                }
            }
        }
    }

    if(mapUnitIsHeld==true){
        for(var a=0;a<mapPoints.length;a++){
            if(mouseIsContainedIn(mapPoints[a].x,mapPoints[a].y,mapPoints[a].x+110,mapPoints[a].y+100)){
                squads[mapUnitNumber-1].targetX = mapPoints[a].x;
                squads[mapUnitNumber-1].targetY = mapPoints[a].y;
            }
        }
    }

    if(squadListUnitHeld==true){
        if(mouseIsContainedIn(1320,810,1525,960)){
            for(var a=0;a<towns.length;a++){
                if(selection == towns[a]){
                    for(var b=0;b<squads.length;b++){
                        if(squads[b].x==towns[a].x&&squads[b].y==towns[a].y){
                            towns[a].garrison.push(new Unit(squads[b].units[squadListUnitNumber-1].unitType));
                            squads[b].units.splice(squadListUnitNumber-1,1);
                            if(squads[b].units.length==0){
                                squads.splice(b,1);
                                document.getElementById("MapUnit"+(b+1)).style.top=-100;
                            }
                        }
                    }

                }
            }
        }
    }

    
    if(garrisonUnitIsHeld==true){
        if(mouseIsContainedIn(1020,810,1230,960)){
            for(var a=0;a<maximumUnits;a++){
                if(garrisonUnitNumber==(a+1)){
                    if(squads.length>0){
                        for(var b=0;b<squads.length;b++){
                            for(var c=0;c<towns.length;c++){
                                if(selection == towns[c] && towns[c].menu == 3){
                                    if(squadIsPresentAt(towns[c].x,towns[c].y,1)==false){
                                        squads.push(new Squad(towns[c].x,towns[c].y,squads.length,1));     
                                        squads[squads.length-1].units.push(new Unit(towns[c].garrison[garrisonUnitNumber-1].unitType));
                                        towns[c].garrison.splice(garrisonUnitNumber-1,1); 
                                    }else{
                                        if(squads[b].x == towns[c].x && squads[b].y == towns[c].y){
                                            if(towns[c].garrison[garrisonUnitNumber-1]!=null){
                                                squads[b].units.push(new Unit(towns[c].garrison[garrisonUnitNumber-1].unitType));
                                                towns[c].garrison.splice(garrisonUnitNumber-1,1);
                                            }
                                        }
                                    }
                                }
                            }
                        }    
                    }else{
                        for(var c=0;c<towns.length;c++){
                            if(selection == towns[c]){
                                squads.push(new Squad(towns[c].x,towns[c].y,squads.length,1));     
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
                    gold -=5;
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
        if(mouseIsContainedIn(870,766,1030,800) && battle==0){
            for(var a=0;a<squads.length;a++){
                squads[a].update();
            } 
            for(var a=0;a<squads.length;a++){
                squads[a].update();
            }    
            for(var z=0;z<towns.length;z++){
                towns[z].grow();
                towns[z].collect();
                towns[z].growthRate=0;
                towns[z].taxRate=0;
            }

            advanceTurn();
        }
        for(var a=0;a<squads.length;a++){
            mouseDistance = Math.abs(mouseX-(squads[a].x+50)) + Math.abs((mouseY+800)-(squads[a].y+55))
            if(mouseDistance<65 && townIsPresentAt(squads[a].x,squads[a].y)==false){
                selection = squads[a];
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