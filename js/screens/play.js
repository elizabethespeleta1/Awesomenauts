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
		console.log(game.data.exp);
		console.log(game.data.exp2);

		//spawns the player
		this.resetPlayer(0,420);

		//adding the gamemanager to the world
		//0 because it doesnt need to be visible
		var gameTimerManager = me.pool.pull("GameTimerManager", 0 , 0, {} );
		me.game.world.addChild(gameTimerManager, 0);

		//adding the HeroDeathManager to the world
		//0 because it doesnt need to be visible
		var HeroDeathManager = me.pool.pull("HeroDeathManager", 0 , 0, {} );
		me.game.world.addChild(HeroDeathManager, 0);

		//adding experienceManager to the world
		//0  because it doesnt need to be visible
		var experienceManager = me.pool.pull("ExperienceManager", 0 , 0, {});
		me.game.world.addChild(experienceManager, 0);

		//adding experienceManager to the world
		//0  because it doesnt need to be visible
		var spendGold = me.pool.pull("SpendGold", 0 , 0, {});
		me.game.world.addChild(spendGold, 0);

		//bind the key for movement
		//calling the key for right left jumping and attacking
		//keys also for buying / buying skills
		me.input.bindKey(me.input.KEY.B, "buy");
		me.input.bindKey(me.input.KEY.Q, "skill1");
		me.input.bindKey(me.input.KEY.W, "skill2");
		me.input.bindKey(me.input.KEY.E, "skill3");
		me.input.bindKey(me.input.KEY.RIGHT, "right");
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
	},

	resetPlayer: function (x, y){
		//adding player by pulling an instance
		//player is the name were pulling out of the pool
		// the numbers are where hes going to start
		//me.game.world is adding the player to the world
		//showing where he is to the screen
		//the higher the number is the closer he is to the screen
		game.data.player = me.pool.pull("player", x, y, {});
		me.game.world.addChild(game.data.player, 5);
	}

});
