//this is what shows up when you continue the game
game.SpendExp = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {	
		//this is putting the menu screen
		//-10 puts in the back (its the z layer)
		me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('exp-screen')), -10); // TODO


		//adding text to the load screen
		me.game.world.addChild(new (me.Renderable.extend({
			init: function(){
				//super class is passing the renderable the placement of the text
				this._super(me.Renderable, 'init', [270, 240, 300, 50]);
				this.font = new me.Font("Arial", 46, "white");
			},

			//draw is passing renderer
			//this is the text that shows up
			draw: function(renderer){
				this.font.draw(renderer.getContext(), "Spend Exp", this.pos.x, this.pos.y);
			}	
		})));

	},
	
	
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
	}
});
