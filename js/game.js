/* Game namespace */
var game = {

	// an object where to store game information
	data : {
		// variable for the score
		score : 0,
		//variables for continueing the game / starting new one
		option1: "",
		option2: "",
		//you can add more players / enemys by changing these numbers
		// variable for the health
		enemyBaseHealth: 1,
		playerBaseHealth: 1,
		enemyCreepHealth: 10,
		playerHealth: 10,
		enemyCreepAttack: 1,
		// variable for how many players there are	
		playerAttack: 1,
		//orcBaseDamage: 10,
		//orcBaseHealth: 100,
		//orcBaseSpeed: 3,
		//orcBaseDefense: 0,
		//keeps track of their timers (set to one sec)
		playerAttackTimer: 1000,
		enemyCreepAttackTimer: 1000,
		//effects how fast they move
		playerMoveSpeed: 5,
		creepMoveSpeed: 5,
		gameTimerManager:"",
		herodeathmanager: "",
		spearTimer: 15,
		//help keep track of these 
		player:"",
		//starts experience and gold at 0
		exp: 0,
		gold: 0,
		ability1: 0,
		ability2: 0,
		ability3:0,
		skill1: 0,
		skill2: 0,
		skill3:0, 
		exp1: 0,
		exp2: 0,
		exp3: 0,
		exp4: 0,
		win: "",
		//for buy screen when paused
		pausePos: "",
		buyscreen: "",
		buytext: "",
		minimap: "",
		miniplayer: ""


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
	

	me.state.SPENDEXP = 112;
	me.state.LOAD = 113;
	me.state.NEW = 114;


	//prints out gameover function from gamemanager.js
	//console.log(game.data.exp);
	//console.log(game.data.exp2);

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
		me.pool.register("Player2", game.Player2, true);
		//registers the player base from melon js into the game
		me.pool.register("PlayerBase", game.PlayerBaseEntity, true);
		// registers the enemy base from melon js to the game
		me.pool.register("EnemyBase", game.EnemyBaseEntity, true);
		//loads the creep character
		me.pool.register("EnemyCreep", game.EnemyCreep, true);
		// registers the timer into the game
		me.pool.register("GameTimerManager", game.GameTimerManager);
		//adds herodeathmanager into the game
		me.pool.register("HeroDeathManager", game.HeroDeathManager);
		//adds expierence manager into the game
		me.pool.register("ExpierenceManager", game.ExpierenceManager);
		//adds the resource spend gold into the game
		me.pool.register("SpendGold", game.SpendGold);
		// adds the spear throw resource into the game
		me.pool.register("spear", game.SpearThrow);
		//adds the minimap to the game
		me.pool.register("minimap", game.MiniMap, true);
		//adds the miniplayerlocation to the game
		me.pool.register("miniplayer", game.MiniPlayerLocation, true);

		//setting screens
		me.state.set(me.state.MENU, new game.TitleScreen());
		me.state.set(me.state.PLAY, new game.PlayScreen());
		me.state.set(me.state.SPENDEXP, new game.SpendExp());
		me.state.set(me.state.LOAD, new game.LoadProfile());
		me.state.set(me.state.NEW, new game.NewProfile());


		// Start the game.
		//goes to the menu first
		me.state.change(me.state.MENU );
	}
};