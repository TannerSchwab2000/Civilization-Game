
function Squad(x,y){
	this.x=x;
	this.y=y;
	this.units = [];
	this.targetX=0;
	this.targetY=0;

	this.update = function(){
		this.x = this.targetX;
		this.y = this.targetY;
		this.targetX=0;
		this.targetY=0;
	}
}

function Unit(t){
	this.unitType = t;

}