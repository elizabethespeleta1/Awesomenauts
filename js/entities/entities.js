//this is a class
//game.PlayerEntity is a class that is why there both capital
//me.Entity is a class
game.PlayerEntity = me.Entity.extend({
	//this is a constructer function
	//melon js uses this contructer on most things for setutp
	//you need x y and settings
	//you're initializing the basic guy
	//super is reaching into the constructer of me.Entity you need settings
	//getShape function is returning a rectangle shape
	//the numbers of the width and height of the box
	//polygon is a method 
	init: function(x, y, settings){
		this._super(me.Entity, 'init', [x, y, {
			image: "player", 
			width: 64,
			height: 64,
			spritewidth: "64",
			spriteheight: "64",
			getShape: function(){
				return(new me.Rect(0, 0, 64, 64)).toPolygon();
			}
		}]);

		this.body.setVelocity(5, 0);
	},

	update: function(delta){
		if(me.input.isKeyPressed("right")){
			this.body.vel.x += this.body.accel.x * me.timer.tick;
		}
		else{
			this.body.vel.x = 0;
		}

		this.body.update(delta);
		return true;
	}
});