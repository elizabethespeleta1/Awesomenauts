//manages the players death
//oragnizes the code
game.HeroDeathManager = Object.extend({
	//so it constantly updates not over
		//setting the game to
	init: function(x, y, settings){
		this.alwaysUpdate = true;

	},

	update: function(){
		//removes player
		if(game.data.player.dead){
			//removes player when its dead
			me.game.world.removeChild(game.data.player);
			me.game.world.removeChild(game.data.miniPlayer);
			//this respawns the player in 10,0
			me.state.current().resetPlayer(10, 0);
		}
		return true;
	}
});