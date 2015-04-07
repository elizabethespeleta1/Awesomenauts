game.SpearThrow = me.Entity.extend({
	init: function(x,y, settings, facing){
		this._super(me.Entity, 'init', [x, y, {
			image: "spear",
			width: 48,
			height: 48,
			spritewidth: "48",
			spriteheight: "48",
			getShape: function(){
				return (new me.Rect(0,0,48,48)).toPolygon();
			}
		}]);
		//always update so spear moves even when not on the screen
		this.alwaysUpdate = true;
		//want the spear to go fast
		this.body.setVelocity(8,0);
		//this is where the levels matter for the spear
		//if ability is at level 2 it's strength is at 6
		this.attack = game.data.ability3*3;
		//type is spear
		this.type = "spear";
		//checks where your facing
		this.facing = facing;
	},
	update: function(delta){
		//checking if facing the left
		if(this.facing === 'left'){
			//makes the spear move
			this.body.vel.x -= this.body.accel.x * me.timer.tick;
		}
		else {
			//if not it'll go the other way
			this.body.vel.x += this.body.accel.x * me.timer.tick;
		}
		//checking for collsions for the spear if it doesnt then it
		//passes it to the collide handler
		me.collision.check(this, true, this.collideHandler.bind(this), true);

		//then it updates delta (the time)
		this.body.update(delta);

		//calling the super
		//updating and returning
		this._super(me.Entity, "update", [delta]);
		return true;
		
	}, 

	//a function with the parameter response
	collideHandler : function(response){
		//affects only the enemy base or enemy creep
		if(response.b.type==='EnemyBase' || response.b.type==='EnemyCreep'){
			//causes it to lose base
			response.b.loseHealth(this.attack);
			//removes spear
			me.game.world.removeChild(this);
		}
	}
})