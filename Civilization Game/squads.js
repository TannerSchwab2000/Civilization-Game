
function Squad(x,y){
	this.x=x;
	this.y=y;
	this.units = [];
	this.targetX=0;
	this.targetY=0;

	this.update = function(){
		if(adjacent(this.x,this.y,this.targetX,this.targetY)){
			if(squadIsPresentAt(this.targetX,this.targetY)==false){
				this.x = this.targetX;
				this.y = this.targetY;	
			}	
		}
		
	}
}

function Unit(t){
	this.unitType = t;

}