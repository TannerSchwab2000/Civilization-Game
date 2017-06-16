
function Town(x,y,i){
	this.size = 3;
	this.x = x;
	this.y = y;
	this.i = i;
	this.peasants = 3;
	this.slaves = 0;
	this.menu = 0;
	this.tower = false;
	this.garrison = [];

    for(var b=0;b<this.peasants;b++){
            this.garrison.push(new Unit(4));
    }

	this.render = function(){
		document.getElementById("town" + this.i).style.left = this.x;
		document.getElementById("town" + this.i).style.top = this.y;

    	if(selection == towns[i-1]){
			document.getElementById("ConvertUnitsButton").src = "graphics/ConvertUnitsButton.bmp";    
   			document.getElementById("GarrisonButton").src = "graphics/GarrisonButton.png";    
    		document.getElementById("ConstructionsButton").src = "graphics/ConstructionsButton.png"; 
    		document.getElementById("TaxRatesButton").src = "graphics/TaxRatesButton.png"; 
    		if(this.menu==1){
    			document.getElementById("Conversion1").src = "graphics/Conversion1.png"; 
    			document.getElementById("Conversion2").src = "graphics/Conversion2.png"; 
    			document.getElementById("Conversion3").src = "graphics/Conversion3.png"; 
    			document.getElementById("Conversion4").src = "graphics/Conversion4.png"; 
    		}else if(this.menu==2){
    			document.getElementById("Construction1").src = "graphics/Construction1.png"; 
    			document.getElementById("Construction2").src = "graphics/Construction2.png"; 
    		}else if(this.menu==3){
    			document.getElementById("SquadListBackground1").src = "graphics/SquadListBackground.png"; 
    			document.getElementById("SquadListBackground2").src = "graphics/SquadListBackground.png"; 
    			document.getElementById("SquadTroops").innerHTML = ("Sqaud Troops");
    			document.getElementById("TownTroops").innerHTML = ("Town Garrison");
    			document.getElementById("Slider1").src = "graphics/Slider.png";
    			document.getElementById("Slider2").src = "graphics/Slider.png";
    			document.getElementById("SliderBackground1").src = "graphics/SliderBackground.png";
    			document.getElementById("SliderBackground2").src = "graphics/SliderBackground.png";

                for(var a=0;a<squads.length;a++){
                    for(var b=0;b<towns.length;b++){
                        if(selection == towns[b]){
                            if(squads[a].x == towns[b].x && squads[a].y == towns[b].y){
                                for(var c=0;c<squads[a].units.length;c++){
                                    if(squads[a].units[c] != null){
                                        document.getElementById("SquadUnit"+(c+1)).style.left = 1025;
                                        if(squads[a].units[c].unitType == 1){
                                            document.getElementById("SquadUnit" + (c+1)).src = "graphics/SwordsmanListUnit.png";
                                            document.getElementById("SquadUnit" + (c+1)).style.top = 815 + Math.abs((squads[a].units.length-1)-c)*45 - ((parseInt(document.getElementById("Slider1").style.top) - 811)*2.5);
                                        }else if(squads[a].units[c].unitType == 2){
                                            document.getElementById("SquadUnit" + (c+1)).src = "graphics/KnightListUnit.png";
                                            document.getElementById("SquadUnit" + (c+1)).style.top = 815 + Math.abs((squads[a].units.length-1)-c)*45 - ((parseInt(document.getElementById("Slider1").style.top) - 811)*2.5);
                                        }else if(squads[a].units[c].unitType == 3){
                                            document.getElementById("SquadUnit" + (c+1)).src = "graphics/CavalryListUnit.png";
                                            document.getElementById("SquadUnit" + (c+1)).style.top = 815 + Math.abs((squads[a].units.length-1)-c)*45 - ((parseInt(document.getElementById("Slider1").style.top) - 811)*2.5);
                                        }else if(squads[a].units[c].unitType == 4){
                                            document.getElementById("SquadUnit" + (c+1)).src = "graphics/PeasantListUnit.png";
                                            document.getElementById("SquadUnit" + (c+1)).style.top = 815 + Math.abs((squads[a].units.length-1)-c)*45 - ((parseInt(document.getElementById("Slider1").style.top) - 811)*2.5);
                                        }else if(squads[a].units[c].unitType == 5){
                                            document.getElementById("SquadUnit" + (c+1)).src = "graphics/SlaveListUnit.png";
                                            document.getElementById("SquadUnit" + (c+1)).style.top = 815 + Math.abs((squads[a].units.length-1)-c)*45 - ((parseInt(document.getElementById("Slider1").style.top) - 811)*2.5);
                                        }
                                        if(parseInt(document.getElementById("SquadUnit" + (c+1)).style.top) > 920){
                                            document.getElementById("SquadUnit" + (c+1)).src = "";
                                        }
                                        if(parseInt(document.getElementById("SquadUnit" + (c+1)).style.top) < 805){
                                            document.getElementById("SquadUnit" + (c+1)).src = "";
                                        }

                                        if(squadListUnitHeld==true){
                                            document.getElementById("SquadUnit" + squadListUnitNumber).style.top = mouseY+800;
                                            document.getElementById("SquadUnit" + squadListUnitNumber).style.left = mouseX;
                                        }

                                    }
                                }
                            }    
                        }
                    }
                }

    			for(var a=this.garrison.length-1;a>-1;a--){
    				if(document.getElementById("GarrisonUnit" + (a+1)) != null){
                        document.getElementById("GarrisonUnit"+(a+1)).style.left = 1325;
    					if(this.garrison[a].unitType==1){
    					   document.getElementById("GarrisonUnit" + (a+1)).src = "graphics/SwordsmanListUnit.png";
    					   document.getElementById("GarrisonUnit" + (a+1)).style.top = 815 + Math.abs((this.garrison.length-1)-a)*45 - ((parseInt(document.getElementById("Slider2").style.top) - 811)*2.5);
    					}else if(this.garrison[a].unitType==2){
    					   document.getElementById("GarrisonUnit" + (a+1)).src = "graphics/KnightListUnit.png";
    					   document.getElementById("GarrisonUnit" + (a+1)).style.top = 815 + Math.abs((this.garrison.length-1)-a)*45 - ((parseInt(document.getElementById("Slider2").style.top) - 811)*2.5);
    					}else if(this.garrison[a].unitType==3){
    					   document.getElementById("GarrisonUnit" + (a+1)).src = "graphics/CavalryListUnit.png";
    					   document.getElementById("GarrisonUnit" + (a+1)).style.top = 815 + Math.abs((this.garrison.length-1)-a)*45 - ((parseInt(document.getElementById("Slider2").style.top) - 811)*2.5);
    					}else if(this.garrison[a].unitType==4){
                           document.getElementById("GarrisonUnit" + (a+1)).src = "graphics/PeasantListUnit.png";
                           document.getElementById("GarrisonUnit" + (a+1)).style.top = 815 + Math.abs((this.garrison.length-1)-a)*45 - ((parseInt(document.getElementById("Slider2").style.top) - 811)*2.5);
                        }else if(this.garrison[a].unitType==5){
                           document.getElementById("GarrisonUnit" + (a+1)).src = "graphics/SlaveListUnit.png";
                           document.getElementById("GarrisonUnit" + (a+1)).style.top = 815 + Math.abs((this.garrison.length-1)-a)*45 - ((parseInt(document.getElementById("Slider2").style.top) - 811)*2.5);
                        }
    					if(parseInt(document.getElementById("GarrisonUnit" + (a+1)).style.top) > 920){
    					   document.getElementById("GarrisonUnit" + (a+1)).src = "";
    					}
    					if(parseInt(document.getElementById("GarrisonUnit" + (a+1)).style.top) < 805){
    					   document.getElementById("GarrisonUnit" + (a+1)).src = "";
    					}
                        if(garrisonUnitIsHeld == true){
                            document.getElementById("GarrisonUnit" + garrisonUnitNumber).style.top = mouseY + 800;
                            document.getElementById("GarrisonUnit" + garrisonUnitNumber).style.left = mouseX;
                        }
                        
    				}
    			
    			}	

    			
    			
    			if(this.tower==true){
    				document.getElementById("SquadListBackground3").src = "graphics/SquadListBackground.png";
    				document.getElementById("TowerTroops").innerHTML = ("Tower Garrison");	
    			}
    			
    		}
    		

		}

		if(this.size==1){
			if(selection == towns[i-1]){
				document.getElementById("town" + this.i).src = "graphics/SmallTownSelected.png";	
				document.getElementById("peasants").innerHTML = ("Peasants:"+this.peasants);
				document.getElementById("slaves").innerHTML = ("Slaves:"+this.slaves);
			}else{
				document.getElementById("town" + this.i).src = "graphics/SmallTown.png";	
			}
		}else if(this.size==2){
			if(selection == towns[i-1]){
				document.getElementById("town" + this.i).src = "graphics/MediumTownSelected.png";	
				document.getElementById("peasants").innerHTML = ("Peasants:"+this.peasants);
				document.getElementById("slaves").innerHTML = ("Slaves:"+this.slaves);
			}else{
				document.getElementById("town" + this.i).src = "graphics/MediumTown.png";	
			}
		}else if(this.size==3){
			if(selection == towns[i-1]){
				document.getElementById("town" + this.i).src = "graphics/LargeTownSelected.png";
				document.getElementById("peasants").innerHTML = ("Peasants:"+this.peasants);	
				document.getElementById("slaves").innerHTML = ("Slaves:"+this.slaves);
			}else{
				document.getElementById("town" + this.i).src = "graphics/LargeTown.png";	
			}
		}

		

	}

	this.update = function(){
		if(selection == towns[i-1]){
			townSelected = true;
        }
        if(this.peasants<5){
            this.size = 1;
        }else if(this.peasants>5 && this.peasants<10){
            this.size = 2;
        }else if(this.peasants>10){
            this.size = 3;
        }
	}

	
}