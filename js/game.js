
/* Game namespace */
var game = {

	// an object where to store game information
	data : {
		// variable for the score
		score : 0,
		// variable for the enemy base health
		enemyBaseHealth : 10,
		// variable for the player base health
		playerBaseHealth: 100,
		// variable for the enemy creep health
		enemyCreepHealth: 10,
		// variable for the player health
		playerHealth: 10,

		//you can add more players / enemys by changing these numbers
		// variable for how many enemy creeps there are	
		enemyCreepAttack: 1,
		// variable for how many players there are	
		playerAttack: 100,

		//for orc
//		orcBaseDamage: 10,
//		orcBaseHealth: 100,
//		orcBaseSpeed: 3,
//		orcBaseDefense:0,

		//keeps track of their timers (set to one sec)
		playerAttackTimer: 1000,
		enemyCreepAttackTimer: 1000,

		//effects how fast they move
		playerMoveSpeed:5,
		creepMoveSpeed: 5,

		//help keep track of these 
		gameTimerManager: "",
		HeroDeathManager: "",
		player: "",

		//starts experience and gold at 0
		exp: 0,
		gold: 0,
		exp1: 0,
		exp2: 0,
		exp3: 0,
		exp4: 0,
		win: ""
	},
	
	
	// Run on page load.
	"onload" : function () {
	// Initialize the video.
	if (!me.video.init("screen",  me.video.CANVAS, 1067, 600, true, '1.0')) {
		alert("Your browser does not support HTML5 canvas.");
		return;
	}

	// add "#debug" to the URL to enable the debug Panel
	if (document.location.hash === "#debug") {
		window.onReady(function () {
			me.plugin.register.defer(this, debugPanel, "debug");
		});
	}

	// Initialize the audio.
	me.audio.init("mp3,ogg");

	// Set a callback to run when loading is complete.
	me.loader.onload = this.loaded.bind(this);

	// Load the resources.
	me.loader.preload(game.resources);

	// Initialize melonJS and display a loading screen.
	me.state.change(me.state.LOADING);
},

	// Run on game resources loaded.
	"loaded" : function () {
		//registering the player
		//connecting to playerEntity class
		//true means you can make multiple instences of 
		me.pool.register("player", game.PlayerEntity, true);
		//registering the entities // both bases // gamemanager
		me.pool.register("PlayerBase", game.PlayerBaseEntity);
		me.pool.register("EnemyBase", game.EnemyBaseEntity);
		me.pool.register("EnemyCreep", game.EnemyCreep, true);
		me.pool.register("GameTimerManager", game.GameTimerManager);
		me.pool.register("HeroDeathManager", game.HeroDeathManager);
		me.pool.register("ExperienceManager", game.ExperienceManager);

		me.state.set(me.state.MENU, new game.TitleScreen());
		me.state.set(me.state.PLAY, new game.PlayScreen());

		// Start the game.
		//goes to the menu first
		me.state.change(me.state.MENU);
	}
};
