var selection;
var gold = 10;
var maximumUnits = 20;
var townCost = 3;
var redGold = 10;
var gameOver = false;


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

    if(abs(towns[1].x-towns[0].x)+abs(towns[1].y-towns[0].y)<800){
        reRollTowns();
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
                            if(towns[d].arrowFired==false && arrowMoving==false){
                                towns[d].arrowFired = true; 
                                towns[d].targetSquad = b;
                                arrowEffect(towns[d].x,towns[d].y,mapPoints[a].x,mapPoints[a].y,d);   
                            }
                        }
                    }
                }
            }
        } 
        if(arrowMoving){
            if(d==firingTown){
                document.getElementById("RealArrow"+(d+1)).src = ("graphics/Arrow2.png");   
                document.getElementById("EndTurnButton").src = "";      
            }        
        }
        towns[d].render();
        towns[d].update();
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
    

    if(battle == 1){
        document.getElementById("Swords").src = ("graphics/CrossedSwords.png");
        document.getElementById("Swords").style.left = squads[squad1].x;  
        document.getElementById("Swords").style.top = squads[squad1].y;  
    }


    for(var a=0;a<squads.length;a++){
        squads[a].render();
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

    if(message1==true){
        document.getElementById("SquadTroops").style.top = 825;
        document.getElementById("SquadTroops").innerHTML = "You need at least 2 peasants to reproduce.";
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
            }else if(squads[squad1].units[a].unitType==6){
                document.getElementById("SquadUnit"+(a+1)).src = "graphics/RamListUnit.png";   
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
                }else if(squads[squad2].units[a].unitType==6){
                    document.getElementById("GarrisonUnit"+(a+1)).src = "graphics/RamListUnit.png";   
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
        }else if(squads[squad1].units[squads[squad1].units.length-1].unitType==6){
            document.getElementById("MapUnit"+(squad1+1)).src = "graphics/RamUnit.png";   
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
            }else if(squads[squad2].units[squads[squad2].units.length-1].unitType==6){
                document.getElementById("MapUnit"+(squad2+1)).src = "graphics/RamUnit.png";   
            }    
        }
        
    }

    var enemyTowns=0;
    var yourTowns=0;
    for(var a=0;a<towns.length;a++){
        if(towns[a].team==1 && towns[a].burnt==false){
            yourTowns++;
        }else if(towns[a].team==2 && towns[a].burnt==false){
            enemyTowns++;
        }
    }
    if(enemyTowns==0){
        clearMap();
        document.body.style.backgroundColor = 'rgb(254,178,0)';
        document.getElementById("Map").src = "graphics/YouWin.png"
    }else if(yourTowns==0){
        clearMap();
        document.body.style.backgroundColor = 'rgb(127,0,0)';
        document.getElementById("Map").src = "graphics/YouLose.png"
    }

}
