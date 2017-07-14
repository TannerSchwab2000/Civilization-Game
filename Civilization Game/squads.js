
function Squad(x,y,i){
	this.x=x;
	this.y=y;
	this.units = [];
	this.targetX=0;
	this.targetY=0;
	this.i = i;
	this.slaves=0;

	this.update = function(){
		if(adjacent(this.x,this.y,this.targetX,this.targetY)){
			if(squadIsPresentAt(this.targetX,this.targetY)==false){
				this.x = this.targetX;
				this.y = this.targetY;	
			}	
		}
		
	}

	this.render = function(){


		if(selection == squads[this.i]){
			document.getElementById("SquadListBackground1").src = "graphics/SquadListBackground.png"; 
			document.getElementById("Slider1").src = "graphics/Slider.png";
			document.getElementById("SliderBackground1").src = "graphics/SliderBackground.png";
			var a = this.i;

			var slaves = 0;
		for(var s=0;s<this.units.length;s++){
			if(this.units[s].unitType == 5){
				slaves++;
			}
		}
		this.slaves = slaves;
		if(slaves>=townCost){
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