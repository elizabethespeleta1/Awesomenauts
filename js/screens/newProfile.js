//for making user screen
game.NewProfile = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {	
		//this is putting the menu screen
		//-10 puts in the back (its the z layer)
		me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('new-screen')), -10); // TODO

		document.getElementById("input").style.visibility = "visible";
		document.getElementById("register").style.visibility = "visible";

		//unbinding keys
		me.input.unbindKey(me.input.KEY.B);
		me.input.unbindKey(me.input.KEY.Q);
		me.input.unbindKey(me.input.KEY.E);
		me.input.unbindKey(me.input.KEY.W);
		me.input.unbindKey(me.input.KEY.A);

		//adding text to the load screen
		me.game.world.addChild(new (me.Renderable.extend({
			init: function(){
				//super class is passing the renderable the placement of the text
				//adds text on screen
				this._super(me.Renderable, 'init', [10, 10, 300, 50]);
				this.font = new me.Font("Arial", 26, "white");
			},

			//draw is passing renderer
			//this is the text that shows up
			//numbers fix placement of text
			//cost multiplies your level by ten
			draw: function(renderer){
				this.font.draw(renderer.getContext(), "Pick a username and a password", this.pos.x, this.pos.y);
			}	
		})));

	},
	
	
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		document.getElementById("input").style.visibility = "hidden";
		document.getElementById("register").style.visibility = "hidden";		
	}
});
