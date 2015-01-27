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
		me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);

		//this.renderable.addAnimation adds animation using the pictures
		//80 miliseconds is the speed you go through each picture
		//the number is what picture from orcSpear.png the program uses
		this.renderable.addAnimation("idle", [78]);
		this.renderable.addAnimation("walk", [117, 118, 119, 120, 121, 122, 123, 124, 125], 80);
	
		//this is the animation it starts at (facing the screen)
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
			//this is so the character faces the right when moving to the right (if this isnt here the character faces the left when walking to the right)
			this.flipX(true);
		}
		//if you stop pressing the right key
		else{
			//it wont move
			this.body.vel.x = 0;
		}

		//this will run only if the character is moving
		if(this.body.vel.x !== 0){
			//this if statement checks what happening with the character
			////if its not moving it'll walk
			//if it isnt it'll walk
			if(!this.renderable.isCurrentAnimation("walk")){
				this.renderable.setCurrentAnimation("walk");
			}
		}
		//this will run if the velocity is not 0
		//this will make the walking stop
		else{
			this.renderable.setCurrentAnimation("idle");
		}

		//delta is the change of time its happened
		this.body.update(delta);

		//calling the parent class
		//this is updating the super class so the animations can update
		this._super(me.Entity, "update", [delta]);
		return true;
	}
});

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
				return (new me.Rect (0, 0, 100, 100)).toPolygon();
			}
		}]);
		//this variable is saying the tower isnt broken
		this.broken = false;
		//this variable is setting the health to 10
		this.health = 10;
		//this variable is saying it'll always update whether or not your looking at it
		this.alwaysUpdate = true;
		//this variable is so if somebody runs into the tower you can collide with it
		this.body.onCollision = this.onCollision.bind(this);

		//the type allows you to use it when doing other collisions and you can check what your running into
		this.type = "PlayerBaseEntity";

		this.renderable.addAnimation("idle", [0]);
		this.renderable.addAnimation("broken", [1]);
		this.renderable.setCurrentAnimation("idle");
	},


	update:function(delta) {
		//this runs when the health is less than or equal to zero
		if(this.health<=0){
			//if its true your character is dead 
			this.broken = true;
			this.renderable.setCurrentAnimation("broken");
		}
		//then it updates delta (the time)
		this.body.update(delta);

		//calling the super
		//updating and returning
		this._super(me.Entity, "update", [delta]);
		return true;
	},

	//for colliding 
	onCollision: function(){

	}

});

//this is a class for the enemy base
//almost the same the class above
game.EnemyBaseEntity = me.Entity.extend({
	init : function (x, y, settings){
		this._super(me.Entity, 'init', [x, y, {
			image : "tower",
			width : 100,
			height : 100,
			spritewidth : "100",
			spriteheight : "100",
			getShape: function(){
				return (new me.Rect (0, 0, 100, 100)).toPolygon();
			}
		}]);
		this.broken = false;
		this.health = 10;
		this.alwaysUpdate = true;
		this.body.onCollision = this.onCollision.bind(this);

		this.type = "EnemyBaseEntity";

		this.renderable.addAnimation("idle", [0]);
		this.renderable.addAnimation("broken", [1]);
		this.renderable.setCurrentAnimation("idle");

	},

	update:function(delta) {
		if(this.health<=0){
			this.broken = true;
			this.renderable.setCurrentAnimation("broken");
		}
		this.body.update(delta);

		this._super(me.Entity, "update", [delta]);
		return true;
	},

	onCollision: function(){

	}

});