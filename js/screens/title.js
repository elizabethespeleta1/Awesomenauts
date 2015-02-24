game.TitleScreen = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {	
		//this is putting the menu screen
		//-10 puts in the back (its the z layer)
		me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('title-screen')), -10); // TODO
		
		//key that takes you to the play screen (pressing enter starts it)
		me.input.bindKey(me.input.KEY.ENTER, "start");

		//adding text to the load screen
		me.game.world.addChild(new (me.Renderable.extend({
			init: function(){
				//super class is passing the renderable the placement of the text
				this._super(me.Renderable, 'init', [510, 30, me.game.viewport.width, me.game.viewport.height]);
				//this is the font size n color of the text
				this.font = new me.Font("Arial", 46, "white");
			},

			//draw is passing renderer
			//this is the text that shows up
			draw: function(renderer){
				this.font.draw(renderer.getContext(), "Awesomenauts!", 450, 130);
				this.font.draw(renderer.getContext(), "Press ENTER to play!", 250, 530);
			}
		})));

		//this is an event handler 
		//checks when the enter key gets pressed
		//without the event handler you cant pass info
		this.handler = me.event.subscribe(me.event.KEYDOWN, function(action, keyCode, edge){
			//if the enter key gets pressed the state changes so you can play
			if(action === "start"){
				me.state.change(me.state.PLAY);
			}
		});
	},
	
	
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		//unbinding the key so you cant start the game over when playing
		me.input.unbindKey(me.input.KEY.ENTER); // TODO
		//unsubscribing from the handler
		me.event.unsubscribe(this.handler);
	}
});
