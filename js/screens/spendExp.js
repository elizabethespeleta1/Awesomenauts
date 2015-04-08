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

	    //variable for exp cost = level * 10
		//number is there to treat exp1 as a number
	    var exp1cost = ((Number(game.data.exp1) + 1) * 10);
	
		//adding text to the load screen
		me.game.world.addChild(new (me.Renderable.extend({
			init: function(){
				//super class is passing the renderable the placement of the text
				this._super(me.Renderable, 'init', [10, 10, 300, 50]);
				this.font = new me.Font("Arial", 26, "white");
				//me.input.registerPointerEvent('pointerdown', this, this.newGame.bind(this), true);
			},

			//draw is passing renderer
			//this is the text that shows up
			//numbers fix placement of text
			//cost multiplies your level by ten
			draw: function(renderer){
				this.font.draw(renderer.getContext(), "PRESS F1-F4 TO BUY, F5 TO SKIP", this.pos.x, this.pos.y);
				this.font.draw(renderer.getContext(), "CURRENT EXP: " + game.data.exp.toString(), this.pos.x + 100, this.pos.y + 50);
				this.font.draw(renderer.getContext(), "F1:  INCREASE GOLD PRODUCTION CURRENT LEVEL: " + game.data.exp1.toString() + " COST: " + exp1cost, this.pos.x, this.pos.y + 100);
				this.font.draw(renderer.getContext(), "F2: ADD STARTING GOLD ", this.pos.x, this.pos.y + 150);
				this.font.draw(renderer.getContext(), "F3: INCREASE ATTACK DAMAGE ", this.pos.x, this.pos.y + 200);
				this.font.draw(renderer.getContext(), "F4: INCREASE STARTING HEALTH ", this.pos.x, this.pos.y + 250);
			}


		})));
	
	//making keys actually do something
		this.handler = me.event.subscribe(me.event.KEYDOWN, function(action, keyCode, edge){
			if(action === "F1"){
				//runs if you press F1

				//checking  if you have enough exp
				if(game.data.exp >= exp1cost){
					//adding more to it
					game.data.exp1 += 1;
					//substracting the exp cost
					game.data.exp -= exp1cost;
					//continues the game
					me.state.change(me.state.PLAY);
				}
				else{
					//tells you in the console if you dont have enough exp
					console.log("not enough experience");
				}
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