
function Town(x,y,i,t){
	this.size = 1;
	this.x = x;
	this.y = y;
	this.i = i;
	this.peasants = 2;
	this.slaves = 0;
	this.menu = 0;
	this.tower = false;
	this.garrison = [];
    this.team = t;
    this.realTaxRate = 0;
    this.taxRate = 0;
    this.growthRate = 0;
    this.soldiers = 0;
    this.slaves = 0;

    for(var b=0;b<this.peasants;b++){
            this.garrison.push(new Unit(4));
    }

    this.grow = function(){
        var oldPop = this.peasants;
        var newPop = round(this.peasants*(1+this.growthRate));
        var difference = newPop-oldPop;
        this.peasants = this.peasants + difference;
        console.log(this.growthRate);
        for(var a=0;a<difference;a++){
            this.garrison.push(new Unit(4));
        }
    }

    this.collect = function(){
        if(this.team==1){
            gold = gold + this.taxRate;
        }else{
            redGold = redGold + this.taxRate;
        }
        
    }

	this.render = function(){
		document.getElementById("town" + this.i).style.left = this.x;
		document.getElementById("town" + this.i).style.top = this.y;

        if(this.team == 1){
            document.getElementById("Flag"+this.i).src = "graphics/BlueFlag.png"; 
            if(this.size==1){
                document.getElementById("Flag"+this.i).style.left = this.x-50;
                document.getElementById("Flag"+this.i).style.top = this.y-30;
            }else if(this.size==2){
                document.getElementById("Flag"+this.i).style.left = this.x-40;
                document.getElementById("Flag"+this.i).style.top = this.y-20;
            }else if(this.size==3){
                document.getElementById("Flag"+this.i).style.left = this.x-20;
                document.getElementById("Flag"+this.i).style.top = this.y-20;
            }

        }else if(this.team == 2){
            document.getElementById("Flag"+this.i).src = "graphics/RedFlag.png"; 
            if(this.size==1){
                document.getElementById("Flag"+this.i).style.left = this.x-50;
                document.getElementById("Flag"+this.i).style.top = this.y-30;
            }else if(this.size==2){
                document.getElementById("Flag"+this.i).style.left = this.x-40;
                document.getElementById("Flag"+this.i).style.top = this.y-20;
            }else if(this.size==3){
                document.getElementById("Flag"+this.i).style.left = this.x-20;
                document.getElementById("Flag"+this.i).style.top = this.y-20;
            }

        }

    	if(selection == towns[i-1]){
			document.getElementById("ConvertUnitsButton").src = "graphics/ConvertUnitsButton.bmp";    
   			document.getElementById("GarrisonButton").src = "graphics/GarrisonButton.png";    
    		document.getElementById("ConstructionsButton").src = "graphics/ConstructionsButton.png"; 
    		document.getElementById("TaxRatesButton").src = "graphics/TaxRatesButton.png"; 
            document.getElementById("peasants").innerHTML = ("Peasants:"+this.peasants);
            document.getElementById("slaves").innerHTML = ("Slaves:"+this.slaves);
        
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
    			document.getElementById("TownTroops").innerHTML = ("Town Garrison("+this.garrison.length+")");
    			document.getElementById("Slider1").src = "graphics/Slider.png";
    			document.getElementById("Slider2").src = "graphics/Slider.png";
    			document.getElementById("SliderBackground1").src = "graphics/SliderBackground.png";
    			document.getElementById("SliderBackground2").src = "graphics/SliderBackground.png";

                for(var a=0;a<squads.length;a++){
                    for(var b=0;b<towns.length;b++){
                        if(selection == towns[b]){
                            if(squads[a].x == towns[b].x && squads[a].y == towns[b].y){
                                document.getElementById("SquadTroops").innerHTML = ("Sqaud Troops("+squads[a].units.length+")");
                                for(var c=0;c<squads[a].units.length;c++){
                                    if(squads[a].units[c] != null && document.getElementById("SquadUnit"+(c+1)) != null){
                                        document.getElementById("SquadUnit"+(c+1)).style.left = 1025;
                                        if(squads[a].units[c].unitType == 1){
                                            document.getElementById("SquadUnit" + (c+1)).src = "graphics/SwordsmanListUnit.png";
                                            document.getElementById("SquadUnit" + (c+1)).style.top = 815 + Math.abs((squads[a].units.length-1)-c)*45 - ((parseInt(document.getElementById("Slider1").style.top) - 811)*sliderScale);
                                        }else if(squads[a].units[c].unitType == 2){
                                            document.getElementById("SquadUnit" + (c+1)).src = "graphics/KnightListUnit.png";
                                            document.getElementById("SquadUnit" + (c+1)).style.top = 815 + Math.abs((squads[a].units.length-1)-c)*45 - ((parseInt(document.getElementById("Slider1").style.top) - 811)*sliderScale);
                                        }else if(squads[a].units[c].unitType == 3){
                                            document.getElementById("SquadUnit" + (c+1)).src = "graphics/CavalryListUnit.png";
                                            document.getElementById("SquadUnit" + (c+1)).style.top = 815 + Math.abs((squads[a].units.length-1)-c)*45 - ((parseInt(document.getElementById("Slider1").style.top) - 811)*sliderScale);
                                        }else if(squads[a].units[c].unitType == 4){
                                            document.getElementById("SquadUnit" + (c+1)).src = "graphics/PeasantListUnit.png";
                                            document.getElementById("SquadUnit" + (c+1)).style.top = 815 + Math.abs((squads[a].units.length-1)-c)*45 - ((parseInt(document.getElementById("Slider1").style.top) - 811)*sliderScale);
                                        }else if(squads[a].units[c].unitType == 5){
                                            document.getElementById("SquadUnit" + (c+1)).src = "graphics/SlaveListUnit.png";
                                            document.getElementById("SquadUnit" + (c+1)).style.top = 815 + Math.abs((squads[a].units.length-1)-c)*45 - ((parseInt(document.getElementById("Slider1").style.top) - 811)*sliderScale);
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
    					   document.getElementById("GarrisonUnit" + (a+1)).style.top = 815 + Math.abs((this.garrison.length-1)-a)*45 - ((parseInt(document.getElementById("Slider2").style.top) - 811)*sliderScale);
    					}else if(this.garrison[a].unitType==2){
    					   document.getElementById("GarrisonUnit" + (a+1)).src = "graphics/KnightListUnit.png";
    					   document.getElementById("GarrisonUnit" + (a+1)).style.top = 815 + Math.abs((this.garrison.length-1)-a)*45 - ((parseInt(document.getElementById("Slider2").style.top) - 811)*sliderScale);
    					}else if(this.garrison[a].unitType==3){
    					   document.getElementById("GarrisonUnit" + (a+1)).src = "graphics/CavalryListUnit.png";
    					   document.getElementById("GarrisonUnit" + (a+1)).style.top = 815 + Math.abs((this.garrison.length-1)-a)*45 - ((parseInt(document.getElementById("Slider2").style.top) - 811)*sliderScale);
    					}else if(this.garrison[a].unitType==4){
                           document.getElementById("GarrisonUnit" + (a+1)).src = "graphics/PeasantListUnit.png";
                           document.getElementById("GarrisonUnit" + (a+1)).style.top = 815 + Math.abs((this.garrison.length-1)-a)*45 - ((parseInt(document.getElementById("Slider2").style.top) - 811)*sliderScale);
                        }else if(this.garrison[a].unitType==5){
                           document.getElementById("GarrisonUnit" + (a+1)).src = "graphics/SlaveListUnit.png";
                           document.getElementById("GarrisonUnit" + (a+1)).style.top = 815 + Math.abs((this.garrison.length-1)-a)*45 - ((parseInt(document.getElementById("Slider2").style.top) - 811)*sliderScale);
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
    			
    		}else if(this.menu==4){
                document.getElementById("NumberBackground").src = "graphics/NumberBackground.png";
                document.getElementById("MinusButton").src = "graphics/MinusButton.png";
                document.getElementById("PlusButton").src = "graphics/PlusButton.png";
                document.getElementById("Number").innerHTML = (this.taxRate);
                document.getElementById("GoldPerTurn").innerHTML = ("Gold Per Turn");
                var growthRate = 40 - (this.taxRate*10);
                document.getElementById("GrowthRate").innerHTML = (growthRate +"% Population Growth Rate");
                this.growthRate = growthRate/100;
            }
    		

		}

		if(this.size==1){
			if(selection == towns[i-1]){
				document.getElementById("town" + this.i).src = "graphics/SmallTownSelected.png";	
			}else{
				document.getElementById("town" + this.i).src = "graphics/SmallTown.png";	
			}
		}else if(this.size==2){
			if(selection == towns[i-1]){
				document.getElementById("town" + this.i).src = "graphics/MediumTownSelected.png";	
			}else{
				document.getElementById("town" + this.i).src = "graphics/MediumTown.png";	
			}
		}else if(this.size==3){
			if(selection == towns[i-1]){
				document.getElementById("town" + this.i).src = "graphics/LargeTownSelected.png";
			}else{
				document.getElementById("town" + this.i).src = "graphics/LargeTown.png";	
			}
		}

		

	}

	this.update = function(){
        var growthRate = 40 - (this.taxRate*10);
        this.growthRate = growthRate/100;
        this.taxRate = this.realTaxRate;

        this.soldiers = 0;
        for(var a=0;a<this.garrison.length;a++){
            if(this.garrison[a].unitType==1 || this.garrison[a].unitType==2 || this.garrison[a].unitType==3){
                this.soldiers++;
            }
        }

        this.slaves = 0;
        for(var a=0;a<this.garrison.length;a++){
            if(this.garrison[a].unitType==5){
                this.slaves++;
            }
        }

        this.peasants = 0;
        for(var a=0;a<this.garrison.length;a++){
            if(this.garrison[a].unitType==4){
                this.peasants++;
            }
        }



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

        if(this.team==2){
            if(turn<3){
                if(this.taxRate > 1){
                    this.taxRate = 1;    
                }
            }else {

                if(this.soldiers>2){
                        if(this.slaves<3){
                            if(squadIsPresentAt(this.x,this.y)==false){
                            removeTownUnit(this.i-1,4);
                            this.garrison.push(new Unit(5));
                            redGold = redGold + 5;
                            }else{
                                for(var a=0;a<squads.length;a++){
                                    if(squads[a].x == this.x && squads[a].y == this.y){
                                        transferUnit(this.i-1,a,0);
                                        transferUnit(this.i-1,a,5);
                                    }
                                }
                                
                            }
                        }else{
                            if(squadIsPresentAt(this.x,this.y)==false){
                                squads.push(new Squad(this.x,this.y,squads.length,2));
                                transferUnit(this.i-1,squads.length-1,0);
                                transferUnit(this.i-1,squads.length-1,0);
                                transferUnit(this.i-1,squads.length-1,0);
                                transferUnit(this.i-1,squads.length-1,5);
                                transferUnit(this.i-1,squads.length-1,5);
                                transferUnit(this.i-1,squads.length-1,5);    
                            }
                        
                        }
                }

                if(turn>3 && this.taxRate < 3){
                    if(redGold<10){
                        this.taxRate = 3;    
                    }
                }
                if(this.peasants>2){
                    if(redGold>4 && this.soldiers<3){
                        redGold = redGold-5;
                        removeTownUnit(this.i-1,4);
                        var r = round(random(1,3));
                        this.garrison.push(new Unit(r));
                        this.peasants--;
                    }   
                    if(this.taxRate<2){
                    this.taxRate = 2;
                    } 
                }else{
                    this.taxRate = 0;
                }
                
                
            }
        }
	}


	
}