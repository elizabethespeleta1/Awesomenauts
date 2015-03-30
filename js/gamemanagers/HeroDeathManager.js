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