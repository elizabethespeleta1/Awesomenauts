//this is a class
//making a constructor with ._super
//setting the picture and size
//getShape is returning a rectangle
//toPolygon is there so you can use it
game.PlayerBaseEntity = me.Entity.extend({
	init : function (x, y, settings){
		this._super(me.Entity, 'init', [x, y, {
			image : "tower",
			width : 100,
			height : 100,
			spritewidth : "100",
			spriteheight : "100",
			getShape: function(){
				return (new me.Rect (0, 0, 70, 70)).toPolygon();
			}
		}]);
		//this variable is saying the tower isnt broken
		this.broken = false;
		//this variable is setting the health using the variable made in game.js playerBaseHealth
		this.health = game.data.playerBaseHealth;
		//this variable is saying it'll always update whether or not your looking at it
		this.alwaysUpdate = true;
		//this variable is so if somebody runs into the tower you can collide with it
		this.body.onCollision = this.onCollision.bind(this);
		//the type allows you to use it when doing other collisions and you can check what your running into
		this.type = "PlayerBase";

		//0 because is the not burning animation
		//1 is another animation
		//this.renderable.setCurrentAnimation("idle"); sets the animation when the tower is broken
		this.renderable.addAnimation("idle", [0]);
		this.renderable.addAnimation("broken", [1]);
		this.renderable.setCurrentAnimation("idle");
	},


	update:function(delta) {
		//this runs when the health is less than or equal to zero
		if(this.health<=0){
			//if its true your character is dead 
			//if the your base breaks first , sets game to not won
			//setting base to brokem
			this.broken = true;
			game.data.win = false;
			this.renderable.setCurrentAnimation("broken");
		}
		//then it updates delta (the time)
		this.body.update(delta);

		//calling the super
		//updating and returning
		this._super(me.Entity, "update", [delta]);
		return true;
	},

	//this function makes your base lose health
	loseHealth: function(damage){
		//this makes your base lose health
		this.health = this.health - damage;
	},

	//for colliding 
	onCollision: function(){

	}

});
