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

		//setting a type
		this.type="PlayerEntity";

		//setting the players health , using the variable (playerHealth)  made in game.js
		this.health = game.data.playerHealth;

		//choosing a velocity for the player
		//setting the velocity using the variable made in game.js (playerMoveSpeed)
		//y is 20 so character is on the floor
		this.body.setVelocity(game.data.playerMoveSpeed, 20);

		//keep track of which direction your character is going
		this.facing = "right";

		//this keeps track of time
		this.now = new Date().getTime();

		this.lastHit = this.now;
		//sets to not dead
		this.dead = false;

		//this allows you to have a hit delay
		this.lastAttack = new Date().getTime();

		//me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH); makes it so the character is always being followed on the screen
		me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);

		//this.renderable.addAnimation adds animation(makes your character look like its walking standing or attacking) using the pictures
		//80 miliseconds is the speed you go through each picture
		//the number is what picture from orcSpear.png the program uses
		this.renderable.addAnimation("idle", [78]);
		this.renderable.addAnimation("walk", [117, 118, 119, 120, 121, 122, 123, 124, 125], 80);
		this.renderable.addAnimation("attack", [65, 66, 67, 68, 69, 70, 71, 72], 80);

		//this is the animation it starts at (facing the screen)
		this.renderable.setCurrentAnimation("idle");
	},

	update: function(delta){
		//updating the time
		this.now = new Date().getTime();

		//runs so you can die
		if (this.health <= 0){
			//allows you to die
			this.dead = true;
		}

		//checking if the right key is pressed
		if(me.input.isKeyPressed("right")){
			//if the key is pressed this is what happens
			//adds the position of my x by the velocity defined above in
			//setVelocity() and multiplying it by me.timer.tick
			//me.timer.tick makes the movement look smooth
			this.body.vel.x += this.body.accel.x * me.timer.tick;
			//this is so the character faces the right when moving to the right (if this isnt here the character faces the left when walking to the right)
			this.facing = "right";
			this.flipX(true);
		}
		//if you stop pressing the right key
		else if (me.input.isKeyPressed("left")){
			this.body.vel.x -=this.body.accel.x * me.timer.tick;
			//this is so the character faces the left when moving to the left (if this isnt here the character faces the right when walking to the left)
			this.facing = "left";
			this.flipX(false);
		}
		else{
			//it wont move
			this.body.vel.x = 0;
		}

		//if you press jump && make sure you dont double jumping // your not already jumping and your not falling 
		if(me.input.isKeyPressed("jump") && !this.body.falling && !this.body.jumping){
			//if it runs you can jump
			this.body.jumping = true;
			this.body.vel.y -= this.body.accel.y * me.timer.tick;
		} 

		//checking if attack is pressed
		if(me.input.isKeyPressed("attack")){
			//runs if your not attacking
			if(!this.renderable.isCurrentAnimation("attack")){
				//sets the current animation to attack and once that is over
				//goes back to the idle animation
				console.log(!this.renderable.isCurrentAnimation("attack"));
				this.renderable.setCurrentAnimation("attack", "idle");
				//makes it so that the next time we start the animation this sequence we begin
				//from the first animation, not wherever we left off when we
				//switched to another animation
				this.renderable.setAnimationFrame();
			}
		}
		//this will run only if the character is moving
//	//	//and if the attack animation is not going
		else if(this.body.vel.x !== 0 && !this.renderable.isCurrentAnimation("attack")){
			//this if statement checks what happening with the character
			////if its not moving it'll walk
			//if it isnt it'll walk
			if(!this.renderable.isCurrentAnimation("walk")){
				this.renderable.setCurrentAnimation("walk");
			}
		}
		//this will run if the velocity is not 0
		//this will make the walking stop
		//making sure your not attacking
		else if(!this.renderable.isCurrentAnimation("attack")){
			this.renderable.setCurrentAnimation("idle");
		}

		//sets up the collsions
		//passing a parameter to collideHandler about the player
		me.collision.check(this, true, this.collideHandler.bind(this), true);
		//delta is the change of time its happened
		this.body.update(delta);


		//calling the parent class
		//this is updating the super class so the animations can update
		this._super(me.Entity, "update", [delta]);
		return true;
	},

	//this function makes your player lose health
	loseHealth: function(damage){
		//makes your player lose health
		this.health = this.health - damage;
		//printing what your players health is
		console.log(this.health);
	},

	//passing a parameter
	//collideHandler is function and responding to a collision
	collideHandler: function(response){
		//runs when response b is whatever your colliding with
		//in this case the enemy base entity
		//response a is related to the character
		if(response.b.type==='EnemyBaseEntity'){
			//runs if your running into the enemy base
			//var ydif is the difference between players y postion and
			// bases y position
			//var xdif is the difference between players y postion and
			// bases y position
			var ydif = this.pos.y - response.b.pos.y;
			var xdif = this.pos.x - response.b.pos.x;
			
			//runs if ydifference<-40 && xdif< 70 && xdif>-35
			//allows you to stand on base
			if(ydif<-40 && xdif< 70 && xdif>-35){
				this.body.falling = false;
				this.body.vel.y = -1;
			}
			//runs if your approaching/facing the base from the right
			// && if the xdif is less than zero
			else if(xdif>-35 && this.facing==='right' && (xdif<0)){
				//stops the character
				this.body.vel.x = 0;
				//makes sure the player cant break through the base
				//this.pos.x = this.pos.x -1;
			}
			//runs if your approaching/facing the base from the left
			else if(xdif<70 && this.facing==='left' && xdif>0){
				//stops the character
				this.body.vel.x = 0;
				//this.pos.x = this.pos.x +1;
			}
			//checking if your hitting the enemy base
			//playerAttackTimer lets you hit quicker/ slower (variable made in game.js)
			if(this.renderable.isCurrentAnimation("attack") && this.now-this.lastHit >=1000 >= game.data.playerAttackTimer){
				//if it runs you lose health
				//updating last hit aka time
				//playerAttack is a variable that passes how much damage the base can take
				this.lastHit = this.now;
				response.b.loseHealth(game.data.playerAttack);
			}

		}

		//checking if the player(response.b.type) is attacking creeps
		else if (response.b.type==='EnemyCreep'){
			//variable for x difference and y difference of the player and creep
			var xdif = this.pos.x - response.b.pos.x;
			var ydif = this.pos.y - response.b.pos.y;

			//runs if the xdif is > 0
			if(xdif > 0){
				//keeps the player from walking through the enemy
				//this.pos.x = this.pos.x +1;

				//keeps track of where your facing
				if(this.facing==="left"){
					this.body.vel.x = 0;
				}
			//runs if x < 0
			}
			else{
				//keeps the player from walking through the enemy
				//this.pos.x = this.pos.x -1;

				if(this.facing==="right"){
					this.body.vel.x = 0;
				}
			}

		
			//this.renderable.isCurrentAnimation("attack") means this will run only if your attacking , 
			//this.now-this.lastHit >=playerAttackTimer (playerAttackTimer was made in game.js) is checking when you last hit was and if it was more than a second ago
			//((xdif>0 && this.facing==="left") || ((xdif<0) && this.facing==="right")) makes it so you cant attack the enemy when your not facing it 
			// (Math.abs(ydif)<= 40) abs means absolute value makes it so you cant attack it above its head
			// || means or
			if(this.renderable.isCurrentAnimation("attack") && this.now-this.lastHit >= game.data.playerAttackTimer
			&& (Math.abs(ydif)<= 40) 
			&& ((xdif>0 && this.facing==="left") || ((xdif<0) && this.facing==="right"))
			){
				//updating the timer
				this.lastHit = this.now;
				//player makes the creep lose health by one when attacking
				response.b.loseHealth(game.data.playerAttack);
			}
		}
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

	//this function makes your base lose health
	loseHealth: function(damage){
		//this makes your base lose health
		this.health = this.health - damage;
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
				return (new me.Rect (0, 0, 70, 70)).toPolygon();
			}
		}]);
		this.broken = false;
		//can  change the enemyBaseHealth in game.js
		this.health = game.data.enemyBaseHealth;
		this.alwaysUpdate = true;
		this.body.onCollision = this.onCollision.bind(this);

		this.type = "EnemyBaseEntity";

		//0 because is the not burning animation
		//1 is another animation
		//this.renderable.setCurrentAnimation("idle"); sets the animation when the tower is broken
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

	},

	//this function runs so you can lose health
	loseHealth: function(){
		//this makes your health go down one
		this.health--;
	}

});

//class for the enemy
game.EnemyCreep = me.Entity.extend({
	//this is a function
	//you need x y and settings
	//super is reaching into the constructer of me.Entity you need settings
	//getShape function is returning a rectangle shape
	//the numbers of the width and height of the box
	init: function(x,y, settings){
		this._super(me.Entity, 'init', [x, y, {
			image: "creep1",
			width: 32,
			height: 64,
			spritewidth: "32",
			spriteheight: "64",
			getShape: function(){
				return (new me.Rect(0,0,32,64)).toPolygon();
			}
		}]);
		//you can change the enemycreephealth in game.js
		this.health = game.data.enemyCreepHealth;
		this.alwaysUpdate = true;
		//lets us know if the enemy is currently attacking
		this.attacking = false;
		//keeps track of when the creep last attacked anything
		this.lastAttacking = new Date().getTime();
		//keeps track of the last time the creep hit anything
		this.lastHit = new Date().getTime();
		//timer when your attacking the player base
		this.now = new Date().getTime();
		this.body.setVelocity(3,20);

		this.type = "EnemyCreep";

		this.renderable.addAnimation("walk", [3,4,5], 80);
		this.renderable.setCurrentAnimation("walk");
	},

	//this function passes in damage in other words
	//when this runs the creep will lose health
	loseHealth: function(damage){
		//makes the creep's health go down 
		this.health = this.health - damage;
	},

	update: function(delta){
		//shows what the creeps health is 
		console.log(this.health);

		//when the health = 0 (dead) this runs
		if(this.health<=0){
			//removes creep when its dead
			me.game.world.removeChild(this);
		}

		//timer when your attacking the player base
		this.now = new Date().getTime();
		//makes the character move
		this.body.vel.x -= this.body.accel.x * me.timer.tick;

		//checking for collsions for the creep if it doesnt then it
		//passes it to the collide handler
		me.collision.check(this, true, this.collideHandler.bind(this), true);

		//then it updates delta (the time)
		this.body.update(delta);

		//calling the super
		//updating and returning
		this._super(me.Entity, "update", [delta]);
	},

	//a function with the parameter response
	collideHandler : function(response){
		if(response.b.type==='PlayerBase'){
			//checks if your attacking
			this.attacking=true;
			//this.lastAttacking = this.now;
			//setting the velocity to 0
			this.body.vel.x = 0;
			//keeps moving the creep to the right to maintain its position
			this.pos.x = this.pos.x + 1;

			//checks it has at least been one second (or 1000 miliseconds) since the creeo hit a base
			if((this.now-this.lastHit >=1000)){
				//updates the lastHit timer
				this.lastHit = this.now;
				//makes the player base call its losehealth function and passes it a
				//damage of 1
				response.b.loseHealth(game.data.enemyCreepHealth);
			}
			
		}
		//allows creep to only hit one thing at a time ( base or player)
		else if(response.b.type==='PlayerEntity') {
			//variable for your x difference ( postion of creep - postition of player)
			//postion of the creep (this.pos.x) 
			//postion of the player (response.b.pos.x)
			var xdif = this.pos.x - response.b.pos.x;
			this.attacking=true;
			//this.lastAttacking = this.now;
			//setting the velocity to 0
			this.body.vel.x = 0;
			//keeps moving the creep to the right to maintain its position
			this.pos.x = this.pos.x + 1;

			//checking the last time you attacked a base
			// and checking if its past a second
			//runs if this is true
			if((this.now-this.lastHit >=1000)){
				//resetting the current timer
				this.lastHit = this.now;
				//makes the player lose health
				response.b.loseHealth(game.data.enemyCreepAttack);
			}

		}
	}

});


//class for all the timers
//not an entity wont show up on the screen
game.GameManager = Object.extend({
	//constructor function
	 init: function (x, y, settings){
	 	//for time
	 	this.now = new Date().getTime;
	 	//last time made a creep happen
	 	this.lastCreep = new Date().getTime();

	 	//so it constantly updates
	 	this.alwaysUpdate = true;
	 },
	 update: function(){
	 	//keeping track of time
	 	this.now = new Date().getTime();

	 	//removes player
	 	if(game.data.player.dead){
	 		//removes player when its dead
			me.game.world.removeChild(game.data.player);
			//this respawns the player in 10,0
	 		me.state.current().resetPlayer(10, 0);
	 	}

	 	//keeping track if you need creeps
	 	//math.round checks and makes sure that you have amultiple of ten
	 	//checking to be a sec  % checks if you have a multiple of ten 
	 	//and checking if you spawn over and over again
	 	if(Math.round(this.now/1000)%10 ===0 && (this.now - this.lastCreep >= 1000)){
	 		//update last creep time
	 		this.lastCreep = this.now;
	 		//building a creep 
	 		var creepe = me.pool.pull("EnemyCreep", 1000, 0, {});
	 		//adding creeps to the world
	 		me.game.world.addChild(creepe, 5);
	 	}

	 	return true;
	 }
});