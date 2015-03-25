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
	 		//increases gold by exp
	 		game.data.gold += (game.data.exp1+1);
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
		//so it constantly updates not over
		//setting the game to
	 	this.alwaysUpdate = true;
	 	this.gameover = false;
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
		this.gameover = false;
	},

	update:function(){
		//runs if you win and if the game isnt over
		if(game.data.win ===true && !this.gameover){
			//runs gameOver sending the parameter true
			this.gameOver(true);
		}
		//runs if you lose and if the game isnt over
		else if (game.data.win === false&& !this.gameover){
			//runs gameOver sending the parameter false
			this.gameOver(false);
		}
		return true;
	},

	gameOver: function(win){
		//runs if you win sending the parameter win
		if (win){
			//adds experience when you win
			game.data.exp += 10;
		}
		//runs if you lose sending the parameter win
		else{
			//adds experience when you lose
			game.data.exp += 1;
		}
		//so it constantly updates over
		//saves experience
		this.gameover = true;
		me.save.exp = game.data.exp;
		console.log("experience is: " + me.save.exp);
	}
});

game.SpendGold = Object.extend({
	init:function (x, y, settings){
		//for time
	 	this.now = new Date().getTime;
	 	//last time made a creep happen
	 	this.lastBuy = new Date().getTime();
	 	//variable for pausing game 
	 	this.paused = false;
	 	//so it constantly updates
	 	this.alwaysUpdate = true;
	},

	update: function(){
		return true;
	}
});