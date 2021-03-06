game.TitleScreen = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {	
		//this is putting the menu screen
		//-10 puts in the back (its the z layer)
		me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('title-screen')), -10); // TODO
		me.audio.playTrack("beauty");
	    
		//fixes pointer problem
		game.data.option1 = new (me.Renderable.extend({
			init: function(){
				//super class is passing the renderable the placement of the text
				this._super(me.Renderable, 'init', [270, 240, 300, 50]);
				//this is the font size n color of the text
				this.font = new me.Font("Arial", 46, "white");
				//listening for mouse to be clicked on , when it is clicked it starts a new game
				me.input.registerPointerEvent('pointerdown', this, this.newGame.bind(this), true);
			},

			//draw is passing renderer
			//this is the text that shows up
			draw: function(renderer){
				this.font.draw(renderer.getContext(), "START A NEW GAME", this.pos.x, this.pos.y);
			},


			update: function(dt){
				return true;
			},

			//function for a new game
			//for starting a new game
			newGame: function(){
				//makes sure your not listening for a click later in the game
				//getting rid of old variables
				//makes sure you cant continue when starting over
				me.input.releasePointerEvent('pointerdown', this);
			    me.input.releasePointerEvent('pointerdown', game.data.option2);

			    //going to make a new profile screen
				me.state.change(me.state.NEW);
			}
		}));

		me.game.world.addChild(game.data.option1);

		//continuing the game
		game.data.option2 = new (me.Renderable.extend({
			init: function(){
				//this is the font size n color of the text
				this._super(me.Renderable, 'init', [270, 340, 250, 50]);
				//this is the font size n color of the text
				this.font = new me.Font("Arial", 46, "white");
				//listening for mouse to be clicked on , when it is clicked it starts a new game
				me.input.registerPointerEvent('pointerdown', this, this.newGame.bind(this), true);
			},

			//draw is passing renderer
			//this is the text that shows up
			draw: function(renderer){
				this.font.draw(renderer.getContext(), "CONTINUE", this.pos.x, this.pos.y);
			},


			update: function(dt){
				return true;
			},

			//function for a new game
			//for starting a new game
			newGame: function(){
				//save the experience from the last game
				//makes sure your not listening for a click later in the game
				//make sure you cant start over when continueing
				me.input.releasePointerEvent('pointerdown', this);
				me.input.releasePointerEvent('pointerdown', game.data.option2);
				//going to sign in screen aka load profile screen
				me.state.change(me.state.LOAD);
			}
		}));

		me.game.world.addChild(game.data.option2);
		//me.game.world.addChild(game.data.option2);
		
	},
	
	
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
	
	}
});