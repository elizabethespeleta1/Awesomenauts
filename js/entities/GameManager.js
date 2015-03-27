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

//class for spending gold
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
	 	//updates when paused
	 	this.updateWhenPaused = true;
	 	//sets to not buying when player
	 	this.buying = false;
	},

	update: function(){
		//for time
	 	this.now = new Date().getTime();

	 	//when you press b and its after a second this runs
		if(me.input.isKeyPressed("buy") && this.now-this.lastBuy >=1000){
			//enables you to buy
			this.lastBuy = this.now;
			//if its not buying this runs
			if(!this.buying){
				this.startBuying();
			}
			//it is buying this happens
			else{
				this.stopBuying();
			}
		}

		return true;
	},

	startBuying: function(){
		//updates when paused
		//allows you to buy
		this.buying = true;
		//pauses
		me.state.pause(me.state.PLAY);
		//lets the game know where to go when paused
		game.data.pausePos = me.game.viewport.localToWorld(0,0);
		//puts gold screen up
		game.data.buyscreen = new me.Sprite(game.data.pausePos.x, game.data.pausePos.y, me.loader.getImage('gold-screen'));
		//updates when paused
		game.data.buyscreen.updateWhenPaused = true;
		//sets opactity for image
		game.data.buyscreen.setOpacity(0.8);
		//adds the image
		me.game.world.addChild(game.data.buyscreen, 34);
		//freezes player when paused
		game.data.player.body.setVelocity(0,0);
		//setting up keys
		me.input.bindKey(me.input.KEY.F1, "F1", true);
		me.input.bindKey(me.input.KEY.F2, "F2", true);
		me.input.bindKey(me.input.KEY.F3, "F3", true);
		me.input.bindKey(me.input.KEY.F4, "F4", true);
		me.input.bindKey(me.input.KEY.F5, "F5", true);
		me.input.bindKey(me.input.KEY.F6, "F6", true);
		//calling function for text on buy screen
		this.setBuyText();
	},

	setBuyText: function(){
		//adding text to the load screen
		game.data.buytext = new (me.Renderable.extend({
			init: function(){
				//super class is passing the renderable the placement of the text
				this._super(me.Renderable, 'init', [game.data.pausePos.x, game.data.pausePos.y, 300, 50]);
				this.font = new me.Font("Arial", 26, "white");
				this.updateWhenPaused = true;
				this.alwaysUpdate = true;
			},

			//draw is passing renderer
			//this is the text that shows up
			draw: function(renderer){
				this.font.draw(renderer.getContext(), "Press F1-F6 TO BUY, B TO EXIT. Current Gold: " + game.data.gold , this.pos.x, this.pos.y);
				this.font.draw(renderer.getContext(), "Skill 1: Increase Damage. Current Level: " + game.data.skill1 + " Cost: " + ((game.data.skill1 + 1)*10), this.pos.x, this.pos.y + 40);
				this.font.draw(renderer.getContext(), "Skill 2:  Run Faster! Current Level: " + game.data.skill2 + " Cost: " + ((game.data.skill2 + 1)*10), this.pos.x, this.pos.y  + 80);
				this.font.draw(renderer.getContext(), "Skill 3: Increase Health. Current Level: " + game.data.skill3 + " Cost: " + ((game.data.skill3 + 1)*10), this.pos.x, this.pos.y + 120 );
				this.font.draw(renderer.getContext(), "Q Ability: Speed Burst. Current Level: " + game.data.ability1 + " Cost: " + ((game.data.ability1 + 1)*10), this.pos.x, this.pos.y + 160);
				this.font.draw(renderer.getContext(), "W: Ability: Eat your creep for health. Current Level: "+ game.data.ability2 + " Cost: " + ((game.data.ability2 + 1)*10), this.pos.x, this.pos.y + 200);
				this.font.draw(renderer.getContext(), "B Ability: Throw your spear. Current Level: " + game.data.ability3 + " Cost: " + ((game.data.ability3 + 1)*10), this.pos.x, this.pos.y + 240);
			}	
		}));
		//adds text
		me.game.world.addChild(game.data.buytext, 35);
	},

	stopBuying: function(){
		//lets you stop buying
		this.buying = false;
		//resumes game
		me.state.resume(me.state.PLAY);
		//sets velocity again
		game.data.player.body.setVelocity(game.data.playerMoveSpeed, 20);
		//removes screen
		me.game.world.removeChild(game.data.buyscreen);
		//unbinding keys so you cant randomly buy things with the screen not up
		me.input.unbindKey(me.input.KEY.F1, "F1", true);
		me.input.unbindKey(me.input.KEY.F2, "F2", true);
		me.input.unbindKey(me.input.KEY.F3, "F3", true);
		me.input.unbindKey(me.input.KEY.F4, "F4", true);
		me.input.unbindKey(me.input.KEY.F5, "F5", true);
		me.input.unbindKey(me.input.KEY.F6, "F6", true);
		//removes text
		me.game.world.removeChild(game.data.buytext);
	}
});