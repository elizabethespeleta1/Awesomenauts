//class for all the timers
//not an entity wont show up on the screen
game.GameTimerManager = Object.extend({
	//constructor function
	 init: function (x, y, settings){
	 	//for time
	 	this.now = new Date().getTime;
	 	//last time made a creep happen
	 	this.lastCreep = new Date().getTime();
	 	//variable for pausing game 
	 	this.paused = false;
	 	//so it constantly updates
	 	this.alwaysUpdate = true;
	 },

	 update: function(){
	 	//keeping track of time
	 	this.now = new Date().getTime();
	 	this.goldTimerCheck();
	 	this.creepTimerCheck();

	 	return true;
	 },

	 goldTimerCheck: function(){
	 	//does it every 20 seconds and makes sure it doesnt happen all the time (this.now - this.lastCreep)
	 	//only get gold every other creep
	 	if(Math.round(this.now/1000)%20 ===0 && (this.now - this.lastCreep >= 1000)){
	 		//add gold per creep kill
	 		game.data.gold += 1;
	 		//keep track of gold
	 		console.log("Current gold: " + game.data.gold);
	 	}
	 },

	 creepTimerCheck: function(){
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
	 }
});

game.HeroDeathManager = Object.extend({
	init: function (x, y , settings){
		//so it constantly updates
	 	this.alwaysUpdate = true;
	 	this.gameOver = false;
	},
	update: function(){
		//removes player
	 	if(game.data.player.dead){
	 		//removes player when its dead
			me.game.world.removeChild(game.data.player);
			//this respawns the player in 10,0
	 		me.state.current().resetPlayer(10, 0);
		}
		//returns true
		return true;
	}
});

//for experience at the end
game.ExperienceManager = Object.extend({
	init: function(x,y,settings){
		//constantly updates
		this.alwaysUpdate = true;
	},

	update:function(){
		//runs if you win
		if(game.data.win ===true && !this.gameOver){
			//adds experience when you win
			game.data.exp += 10;
			this.gameOver = true;
		}
		//runs if you lose
		else if (game.data.win === false&& !this.gameOver){
			//adds experience when you win
			game.data.exp += 1;
		}
		console.log(game.data.exp);

		return true;
	}
});

