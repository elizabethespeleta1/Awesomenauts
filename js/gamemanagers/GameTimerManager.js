//removes the player and resets him if he dies
//adds gold
//manages creeps
game.GameTimerManager = Object.extend({
	init: function(x, y, settings){
		//for time
		this.now = new Date().getTime();
		//updates creep time
		this.lastCreep = new Date().getTime();
		//creepe cannot pause at all
		this.paused = false;
		//always updates
		this.alwaysUpdate = true;
	},

	update: function(){
		//time is now
		this.now = new Date().getTime();
		this.goldTimerCheck();
		this.creepTimerCheck();

		return true;
	},
	//organizes code above
	goldTimerCheck: function(){
		//controls when the creep spons
		if(Math.round(this.now/1000)%20 ===0 && (this.now - this.lastCreep >= 1000)){
			game.data.gold += (game.data.exp1+1);
			console.log("Current gold: " + game.data.gold);

		}
	},
	creepTimerCheck: function(){
		//controls when the creep spons
		if(Math.round(this.now/1000)%10 ===0 && (this.now - this.lastCreep >= 1000)){
			//controls when the creep spons
			this.lastCreep = this.now;
			//bulids a creep and puts it into the world
			var creepe = me.pool.pull("EnemyCreep", 1000, 0, {});
			me.game.world.addChild(creepe, 5);

			var gloop = me.pool.pull("Player2", 200, 0 , {});
			me.game.world.addChild(gloop, 5);

			var creep2 = me.pool.pull("EnemyHero", 1000, 100 , {});
			me.game.world.addChild(creep2, 5);
		}
	}
});