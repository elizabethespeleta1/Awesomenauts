game.PlayScreen = me.ScreenObject.extend({
	/**
	 *  action to perform on state change
	 */
	onResetEvent: function() {
		// reset the score
		//me.levelDirector tells it what its looking at
		// loadLevel loads the level
		game.data.score = 0;
		me.levelDirector.loadLevel("level01");

		//adding player by pulling an instance
		//player is the name were pulling out of the pool
		// the numbers are where hes going to start
		//me.game.world is adding the player to the world
		//showing where he is to the screen
		//the higher the number is the closer he is to the screen
		var player = me.pool.pull("player", 0, 420, {});
		me.game.world.addChild(player, 5);

		//bind the key for movement
		//calling the key for right left jumping and attacking
		me.input.bindKey(me.input.KEY.RIGHT, "right");
		me.input.bindKey(me.input.KEY.LEFT, "left");
		me.input.bindKey(me.input.KEY.SPACE, "jump");
		me.input.bindKey(me.input.KEY.A, "attack");

		// add our HUD to the game world
		this.HUD = new game.HUD.Container();
		me.game.world.addChild(this.HUD);
	},


	/**
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		// remove the HUD from the game world
		me.game.world.removeChild(this.HUD);
	}
});
