//this is what shows up when you continue the game
game.SpendExp = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {	
		//this is putting the menu screen
		//-10 puts in the back (its the z layer)
		me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('exp-screen')), -10); // TODO

		//subscribing to events / binding keys
		me.input.bindKey(me.input.KEY.F1, "F1");
		me.input.bindKey(me.input.KEY.F2, "F2");
		me.input.bindKey(me.input.KEY.F3, "F3");
		me.input.bindKey(me.input.KEY.F4, "F4");
		me.input.bindKey(me.input.KEY.F5, "F5");

		//adding text to the load screen
		me.game.world.addChild(new (me.Renderable.extend({
			init: function(){
				//super class is passing the renderable the placement of the text
				this._super(me.Renderable, 'init', [10, 10, 300, 50]);
				this.font = new me.Font("Arial", 26, "white");
			},

			//draw is passing renderer
			//this is the text that shows up
			//numbers fix placement of text
			//cost multiplies your level by ten
			draw: function(renderer){
				this.font.draw(renderer.getContext(), "Press F1-F4 TO BUY, F5 TO SKIP", this.pos.x, this.pos.y);
				this.font.draw(renderer.getContext(), "CURRENT EXP: " + game.data.exp.toString(), this.pos.x + 100, this.pos.y + 50);
				this.font.draw(renderer.getContext(), "F1: INCREASE GOLD PRODUCTION! CURRENT LEVEL:  " + game.data.exp1.toString() + " " + "Cost: " + ((game.data.exp1 + 1) * 10), this.pos.x, this.pos.y + 100);
				this.font.draw(renderer.getContext(), "F2: ADD STARTING GOLD ", this.pos.x, this.pos.y + 150);
				this.font.draw(renderer.getContext(), "F3: INCREASE DAMAGE ", this.pos.x, this.pos.y + 200);
				this.font.draw(renderer.getContext(), "F4: INCREASE STARTING HEALTH ", this.pos.x, this.pos.y + 250);

			}	
		})));
	
	//making keys actually do something
	this.handler = me.event.subscribe(me.event.KEYDOWN, function (action, keyCode, edge){
		if(action === "F1"){

		}
		else if(action === "F2"){

		}
		else if(action === "F3"){

		}
		else if(action === "F4"){

		}
		//if you press F5 this runs
		else if(action === "F5"){
			//continues the game
			me.state.change(me.state.PLAY);
		}
	});

	},
	
	
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		//unbinding keys to unregister
		me.input.unbindKey(me.input.KEY.F1, "F1");
		me.input.unbindKey(me.input.KEY.F2, "F2");
		me.input.unbindKey(me.input.KEY.F3, "F3");
		me.input.unbindKey(me.input.KEY.F4, "F4");
		me.input.unbindKey(me.input.KEY.F5, "F5");
		//unsubscribing the handler you subscribed to
		me.event.unsubscribe(this.handler);
	}
});
