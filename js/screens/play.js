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

		//spawns the player
		this.resetPlayer(0, 420);

		//loads the plyer so that it will show up when you run it
		var player = me.pool.pull("player", 0, 420, {});
		me.game.world.addChild(player, 0);
		

		//adding the gamemanager to the world
		//0 because it doesnt need to be visible
		var gameTimerManager = me.pool.pull("GameTimerManager", 0, 0, {});
		me.game.world.addChild(gameTimerManager, 0);

		//adding the HeroDeathManager to the world
		//0 because it doesnt need to be visible
		var heroDeathManager = me.pool.pull("HeroDeathManager", 0, 0, {});
		me.game.world.addChild(heroDeathManager, 0);

		//adding experienceManager to the world
		//0  because it doesnt need to be visible
		//var ExperienceManager = me.pool.pull("ExperienceManager", 0, 0, {});
		//me.game.world.addChild(ExperienceManager, 0);

		//adding experienceManager to the world
		//0  because it doesnt need to be visible
		var spendGold = me.pool.pull("SpendGold", 0, 0, {});
		me.game.world.addChild(spendGold, 0);

		//adds the minimap into the game
		//game.data.minimap = me.pool.pull("minimap", 10, 10, {});
		//me.game.world.addChild(game.data.minimap, 30);


		//bind the key for movement
		//calling the key for right left jumping and attacking
		//keys also for buying / buying skills
		me.input.bindKey(me.input.KEY.B, "buy");
		me.input.bindKey(me.input.KEY.Q, "skill1");
		me.input.bindKey(me.input.KEY.W, "skill2");
		me.input.bindKey(me.input.KEY.E, "skill3");
		me.input.bindKey(me.input.KEY.RIGHT, "right");
		me.input.bindKey(me.input.KEY.LEFT, "left");
		me.input.bindKey(me.input.KEY.SPACE, "jump");
		me.input.bindKey(me.input.KEY.A, "attack");
		



		// add our HUD to the game world
		this.HUD = new game.HUD.Container();
		me.game.world.addChild(this.HUD);

		//plays background music
		//need to get a song
		me.audio.playTrack("blankSpace");
		
	},


	/**
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		// remove the HUD from the game world
		me.game.world.removeChild(this.HUD);
	},

	//adding player by pulling an instance
	//player is the name were pulling out of the pool
	// the numbers are where hes going to start
	//me.game.world is adding the player to the world
	//showing where he is to the screen
	//the higher the number is the closer he is to the screen
	resetPlayer: function(x, y){
		game.data.player = me.pool.pull("player", x, y, {});
		me.game.world.addChild(game.data.player, 7);
		game.data.miniPlayer = me.pool.pull("miniplayer", 10, 10, {});
		me.game.world.addChild(game.data.miniPlayer, 31);
	}
});