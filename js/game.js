
/* Game namespace */
var game = {

	// an object where to store game information
	data : {
		// variable for the score
		score : 0,
		// variable for the enemy base health
		enemyBaseHealth : 1,
		// variable for the player base health
		playerBaseHealth: 1,
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
		spearTimer: 15,
		player: "",

		//starts experience and gold at 0
		exp: 0,
		gold: 0,
		ability1: 0,
		ability2: 0,
		ability3: 0,
		skill1:0,
		skill2:0,
		skill3:0,
		exp1: 0,
		exp2: 0,
		exp3: 0,
		exp4: 0,
		win: "",
		//for buy screen when paused
		PausePos: "",
		buyscreen: "",
		buytext: "",
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

	//variable that represents the screen
	me.state.SPENDEXP = 112;
	me.state.LOAD = 113;
	me.state.NEW = 114;

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
		//registering the entities // both bases // gamemanager // spend gold
		me.pool.register("PlayerBase", game.PlayerBaseEntity);
		me.pool.register("EnemyBase", game.EnemyBaseEntity);
		me.pool.register("EnemyCreep", game.EnemyCreep, true);
		me.pool.register("GameTimerManager", game.GameTimerManager);
		me.pool.register("HeroDeathManager", game.HeroDeathManager);
		me.pool.register("ExperienceManager", game.ExperienceManager);
		me.pool.register("SpendGold", game.SpendGold);
		me.pool.register("spear", game.SpearThrow);

		//setting screens
		me.state.set(me.state.MENU, new game.TitleScreen());
		me.state.set(me.state.PLAY, new game.PlayScreen());
		me.state.set(me.state.SPENDEXP, new game.SpendExp());
		me.state.set(me.state.LOAD, new game.LoadProfile());
		me.state.set(me.state.NEW, new game.NewProfile());
		// Start the game.
		//goes to the menu first
		me.state.change(me.state.MENU);
	}
};
