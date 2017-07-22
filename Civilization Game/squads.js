


function Squad(x,y,i,t){
	this.x=x;
	this.y=y;
	this.units = [];
	this.targetX=this.x;
	this.targetY=this.y;
	this.i = i;
	this.slaves=0;
	this.team=t;
	this.adjacentSpaces =[];

	this.update = function(){
		this.adjacentSpaces =[];

		this.slaves = 0;
		for(var s=0;s<this.units.length;s++){
			if(this.units[s].unitType == 5){
				this.slaves++;
			}
		}

		for(var a=0;a<mapPoints.length;a++){
			if(adjacent(this.x,this.y,mapPoints[a].x,mapPoints[a].y)){
				this.adjacentSpaces.push(new mapPoint(mapPoints[a].x,mapPoints[a].y));	
			}	
		}

		if(adjacent(this.x,this.y,this.targetX,this.targetY)){
			if(squadIsPresentAt(this.targetX,this.targetY,this.team)==false){
				this.x = this.targetX;
				this.y = this.targetY;	
			}	
		}
		if(townIsPresentAt(this.x,this.y)==false && this.team == 2){
			if(this.slaves>2){
				removeSquadUnit(this.i,5);
				removeSquadUnit(this.i,5);
				removeSquadUnit(this.i,5);
				towns.push(new Town(this.x,this.y,towns.length+1,2));
			}
		}
		
	}

	this.render = function(){


		if(selection == squads[this.i] && this.team == 1){
			document.getElementById("SquadListBackground1").src = "graphics/SquadListBackground.png"; 
			document.getElementById("Slider1").src = "graphics/Slider.png";
			document.getElementById("SliderBackground1").src = "graphics/SliderBackground.png";
			document.getElementById("SliderBackground1").style.left = 1228;
			document.getElementById("SliderBackground1").style.top = 810;
            if(squadListUnitHeld){
                if(squadListUnitType==1||squadListUnitType==2||squadListUnitType==3){
                    document.getElementById("SoldierToPeasant").src = ("graphics/SoldierToPeasant.png");
                    document.getElementById("SoldierToPeasant").style.left = 1300;     
                }    
            }
			
			var a = this.i;


			var slaves = 0;
			for(var s=0;s<this.units.length;s++){
				if(this.units[s].unitType == 5){
					slaves++;
				}
			}
		this.slaves = slaves;
		if(this.slaves>townCost || this.slaves==townCost){
			document.getElementById("SettleTownButton").src = "graphics/SettleTownButton.png";
		}

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

function Unit(t){
	this.unitType = t;

}