game.LoadProfile = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {	
		//this is putting the menu screen
		//-10 puts in the back (its the z layer)
		me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('load-screen')), -10); // TODO
		
		//makes div boxes visible
		document.getElementById("input").style.visibility ="visible";
		document.getElementById("load").style.visibility="visible";

	     //subscribing to events / binding keys
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
				//me.input.registerPointerEvent('pointerdown', this, this.newGame.bind(this), true);
			},

			//draw is passing renderer
			//this is the text that shows up
			//numbers fix placement of text
			//cost multiplies your level by ten
			draw: function(renderer){
				this.font.draw(renderer.getContext(), "ENTER YOUR USERNAME AND PASSWORD", this.pos.x, this.pos.y);
			}

		})));
	
		
	},
	
	
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {

		//puts div boxes back to invisible
		document.getElementById("input").style.visibility ="hidden";
		document.getElementById("load").style.visibility="hidden";
	}
});