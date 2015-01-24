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

		//choosing a velocity for the player
		//moving 5 units to the right
		//y is 20 so character is on the floor
		this.body.setVelocity(5, 20);

		this.renderable.addAnimation("idle", [78]);
		this.renderable.addAnimation("walk", [117, 118, 119, 120, 121, 122, 123, 124, 125], 80);
	
		this.renderable.setCurrentAnimation("idle");
	},

	update: function(delta){
		//checking if the right key is pressed
		if(me.input.isKeyPressed("right")){
			//if the key is pressed this is what happens
			//adds the position of my x by the velocity defined above in
			//setVelocity() and multiplying it by me.timer.tick
			//me.timer.tick makes the movement look smooth
			this.body.vel.x += this.body.accel.x * me.timer.tick;
			this.flipX(true);
		}
		//if you stop pressing the right key
		else{
			//it wont move
			this.body.vel.x = 0;
		}

		if(this.body.vel.x !== 0){
			if(!this.renderable.isCurrentAnimation("walk")){
				this.renderable.setCurrentAnimation("walk");
			}
		}
		else{
			this.renderable.setCurrentAnimation("idle");
		}

		//delta is the change of time its happened
		this.body.update(delta);

		this._super(me.Entity, "update", [delta]);
		return true;
	}
});