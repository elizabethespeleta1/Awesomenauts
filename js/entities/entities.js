//this is a class
//game.PlayerEntity is a class that is why there both capital
//me.Entity is a class
game.PlayerEntity = me.Entity.extend({
	init: function(x, y, settings){
		this.setSuper(x, y);
		this.setPlayerTimers();
		this.setAttributes();

		//setting a type
		this.type="PlayerEntity";

		this.setFlags();
		this.addAnimation();
		
		//this is the animation it starts at (facing the screen)
		this.renderable.setCurrentAnimation("idle");
	},

	//this is a constructer function
	//melon js uses this contructer on most things for setutp
	//you need x y and settings
	//you're initializing the basic guy
	//super is reaching into the constructer of me.Entity you need settings
	//getShape function is returning a rectangle shape
	//the numbers of the width and height of the box
	//polygon is a method 
	setSuper: function(x,y){
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
	},

	//function for the player timers
	setPlayerTimers: function(){
		//this keeps track of time
		this.now = new Date().getTime();
		this.lastHit = this.now;
		this.lastSpear = this.now;
		//this allows you to have a hit delay
		this.lastAttack = new Date().getTime();
	},

	//anything that affects the character
	//like how good you want the heros to be ,speed, health,defense,range or attacking
	setAttributes: function(){
		//setting the players health , using the variable (playerHealth)  made in game.js
		this.health = game.data.playerHealth;

		//choosing a velocity for the player
		//setting the velocity using the variable made in game.js (playerMoveSpeed)
		//y is 20 so character is on the floor
		this.body.setVelocity(game.data.playerMoveSpeed, 20);
		this.attack = game.data.playerAttack;
	},

	//flags are things that are one way or another
	//setting the flags
	setFlags: function(){
		//sets to not dead
		this.dead = false;
		//keep track of which direction your character is going
		this.facing = "right";
		//setting attacking to false
		this.attacking = false;
	},

	//code that adds animation to the player 
	addAnimation: function(){
		//me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH); makes it so the character is always being followed on the screen
		me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);

		//this.renderable.addAnimation adds animation(makes your character look like its walking standing or attacking) using the pictures
		//80 miliseconds is the speed you go through each picture
		//the number is what picture from orcSpear.png the program uses
		this.renderable.addAnimation("idle", [78]);
		this.renderable.addAnimation("walk", [117, 118, 119, 120, 121, 122, 123, 124, 125], 80);
		this.renderable.addAnimation("attack", [65, 66, 67, 68, 69, 70, 71, 72], 80);
	},

	update: function(delta){
		//updating the time
		this.now = new Date().getTime();
		this.dead = this.checkIfDead();
		this.checkKeyPressesAndMove();
		this.checkAbilityKeys();
		this.setAnimation();

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

	//function that checks if the player is dead and returns a value
	checkIfDead: function(){
		//runs so you can die
		if (this.health <= 0){
			//allows you to die
			return true;
		}
			return false;
	},

	//checks the key presses and movement
	checkKeyPressesAndMove: function(){
		//checking if the right key is pressed
		if(me.input.isKeyPressed("right")){
			//if the key is pressed  it runs moveRight()
			this.moveRight();
		}
		//if you stop pressing the right key
		else if (me.input.isKeyPressed("left")){
			this.moveLeft();
		}
		else{
			//it wont move
			this.body.vel.x = 0;
		}
		//if you press jump && make sure you dont double jumping // your not already jumping and your not falling 
		if(me.input.isKeyPressed("jump") && !this.body.falling && !this.body.jumping){
			this.jump();	
		} 
		this.attacking = me.input.isKeyPressed("attack");
	},

	//moves you right when you click the right
	moveRight: function(){
		//adds the position of my x by the velocity defined above in
		//setVelocity() and multiplying it by me.timer.tick
		//me.timer.tick makes the movement look smooth
		this.body.vel.x += this.body.accel.x * me.timer.tick;
		//this is so the character faces the right when moving to the right (if this isnt here the character faces the left when walking to the right)
		this.facing = "right";
		this.flipX(true);	
	},

	//moves you to the left when key is pressed
	moveLeft: function(){
		this.body.vel.x -=this.body.accel.x * me.timer.tick;
		//this is so the character faces the left when moving to the left (if this isnt here the character faces the right when walking to the left)
		this.facing = "left";
		this.flipX(false);
	},

	//makes you jump when key is pressed
	jump:function(){
		//if it runs you can jump
		this.body.jumping = true;
		this.body.vel.y -= this.body.accel.y * me.timer.tick;
	},

	checkAbilityKeys: function(){
		//checking which keys are pressed
		if(me.input.isKeyPressed("skill1")){
			//this.speedBurst();
		}
		else if(me.input.isKeyPressed("skill2")){
			//this.eatCreep();
		}
		else if(me.input.isKeyPressed("skill3")){
			throwSpear();
		}
	},

	//allows you to throw spear
	throwSpear: function(){ 
		//checking the timer (can only throw it every 15 sec), 
		//checking if theres actual skills
		if((this.now-this.lastSpear)>= game.data.spearTimer*1000 && game.data.ability3 >0)
		//update last spear time
	 	this.lastSpear = this.now;
	 	//building a spear and its position
	 	var spear = me.pool.pull("spear", this.pos.x, this.pos.y, {}, this.facing);
	 	//adding spears to the world depth is 10
	 	me.game.world.addChild(spear, 10);
		}
	},

	//function for setting animation
	setAnimation: function(){
		//checking if attack is pressed
		if(this.attacking){
			//runs if your not attacking
			if(!this.renderable.isCurrentAnimation("attack")){
				//sets the current animation to attack and once that is over
				//goes back to the idle animation
				this.renderable.setCurrentAnimation("attack", "idle");
				//makes it so that the next time we start the animation this sequence we begin
				//from the first animation, not wherever we left off when we
				//switched to another animation
				this.renderable.setAnimationFrame();
			}
		}
		//this will run only if the character is moving
		//and if the attack animation is not going
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
	},

	//this function makes your player lose health
	loseHealth: function(damage){
		//makes your player lose health
		this.health = this.health - damage;
	},

	//passing a parameter(response)
	//collideHandler is function and responding to a collision
	collideHandler: function(response){
		//runs when response b is whatever your colliding with
		//in this case the enemy base entity
		//response a is related to the character
		if(response.b.type==='EnemyBaseEntity'){
			this.collideWithEnemyBase(response);
		}
		//checking if the player(response.b.type) is attacking creeps
		else if (response.b.type==='EnemyCreep'){
			this.collideWithEnemyCreep(response);
		}
	},

	collideWithEnemyBase: function(response){
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
		}
		//runs if your approaching/facing the base from the left
		else if(xdif<70 && this.facing==='left' && xdif>0){
			//stops the character
			this.body.vel.x = 0;
		}
		//checking if your hitting the enemy base
		//playerAttackTimer lets you hit quicker/ slower (variable made in game.js)
		if(this.renderable.isCurrentAnimation("attack") && this.now-this.lastHit >= game.data.playerAttackTimer && (Math.abs(ydif) <=40) && (((xdif>0) && this.facing ==="left") || ((xdif) && this.facing==="right")) ){
			//updating last hit aka time
			//playerAttack is a variable that passes how much damage the base can take
			this.lastHit = this.now;
			//player makes the creep lose health by one when attacking
			response.b.loseHealth(game.data.playerAttack);
		}
	},

	collideWithEnemyCreep: function(response){
		//variable for x difference and y difference of the player and creep
			var xdif = this.pos.x - response.b.pos.x;
			var ydif = this.pos.y - response.b.pos.y;

			this.stopMovement(xdif);
			
			if(this.checkAttack(xdif, ydif)){
				this.hitCreep(response);
			};
			
	},

	stopMovement: function(xdif){
		//runs if the xdif is > 0
			if(xdif > 0){
				//keeps the player from walking through the enemy
				//keeps track of where your facing
				if(this.facing==="left"){
					this.body.vel.x = 0;
				}
			}
			else{
				//keeps the player from walking through the enemy
				//this.pos.x = this.pos.x -1;

				if(this.facing==="right"){
					this.body.vel.x = 0;
				}
			}
	},

	checkAttack: function(xdif, ydif){
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
				return true;
			}
			return false;
	},

	hitCreep: function(response){
		//updates gold sx
		if(response.b.health <= game.data.playerAttack){
			//adds one goldfor creep kill
			game.data.gold += 1;
			//shows the gold update in the console
			console.log("Current gold: " + game.data.gold);
		}
		//player makes the creep lose health by one when attacking
		response.b.loseHealth(game.data.playerAttack);
	}
});