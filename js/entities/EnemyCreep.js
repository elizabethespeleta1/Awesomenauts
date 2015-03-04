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