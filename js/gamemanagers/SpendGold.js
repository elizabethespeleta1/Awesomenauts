//class for spending gold
game.SpendGold = Object.extend({
	init:function (x, y, settings){
		//for time
	 	this.now = new Date().getTime;
	 	//last time made a creep happen
	 	this.lastBuy = new Date().getTime();
	 	//variable for pausing game 
	 	this.paused = false;
	 	//so it constantly updates
	 	this.alwaysUpdate = true;
	 	//updates when paused
	 	this.updateWhenPaused = true;
	 	//sets to not buying when player
	 	this.buying = false;
	},

	update: function(){
		//for time
	 	this.now = new Date().getTime();

	 	//when you press b and its after a second this runs
		if(me.input.isKeyPressed("buy") && this.now-this.lastBuy >=1000){
			//enables you to buy
			this.lastBuy = this.now;
			//if its not buying this runs
			if(!this.buying){
				this.startBuying();
			}
			//it is buying this happens
			else{
				this.stopBuying();
			}
		}

		this.checkBuyKeys();

		return true;
	},

	startBuying: function(){
		//updates when paused
		//allows you to buy
		this.buying = true;
		//pauses
		me.state.pause(me.state.PLAY);
		//lets the game know where to go when paused
		game.data.pausePos = me.game.viewport.localToWorld(0,0);
		//puts gold screen up
		game.data.buyscreen = new me.Sprite(game.data.pausePos.x, game.data.pausePos.y, me.loader.getImage('gold-screen'));
		//updates when paused
		game.data.buyscreen.updateWhenPaused = true;
		//sets opactity for image
		game.data.buyscreen.setOpacity(0.8);
		//adds the image
		me.game.world.addChild(game.data.buyscreen, 34);
		//freezes player when paused
		game.data.player.body.setVelocity(0,0);
		//setting up keys
		me.input.bindKey(me.input.KEY.F1, "F1", true);
		me.input.bindKey(me.input.KEY.F2, "F2", true);
		me.input.bindKey(me.input.KEY.F3, "F3", true);
		me.input.bindKey(me.input.KEY.F4, "F4", true);
		me.input.bindKey(me.input.KEY.F5, "F5", true);
		me.input.bindKey(me.input.KEY.F6, "F6", true);
		//calling function for text on buy screen
		this.setBuyText();
	},

	setBuyText: function(){
		//adding text to the load screen
		game.data.buytext = new (me.Renderable.extend({
			init: function(){
				//super class is passing the renderable the placement of the text
				this._super(me.Renderable, 'init', [game.data.pausePos.x, game.data.pausePos.y, 300, 50]);
				this.font = new me.Font("Arial", 26, "white");
				this.updateWhenPaused = true;
				this.alwaysUpdate = true;
			},

			//draw is passing renderer
			//this is the text that shows up
			draw: function(renderer){
				this.font.draw(renderer.getContext(), "Press F1-F6 TO BUY, B TO EXIT. Current Gold: " + game.data.gold , this.pos.x, this.pos.y);
				this.font.draw(renderer.getContext(), "Skill 1: Increase Damage. Current Level: " + game.data.skill1 + " Cost: " + ((game.data.skill1 + 1)*10), this.pos.x, this.pos.y + 40);
				this.font.draw(renderer.getContext(), "Skill 2:  Run Faster! Current Level: " + game.data.skill2 + " Cost: " + ((game.data.skill2 + 1)*10), this.pos.x, this.pos.y  + 80);
				this.font.draw(renderer.getContext(), "Skill 3: Increase Health. Current Level: " + game.data.skill3 + " Cost: " + ((game.data.skill3 + 1)*10), this.pos.x, this.pos.y + 120 );
				this.font.draw(renderer.getContext(), "Q Ability: Speed Burst. Current Level: " + game.data.ability1 + " Cost: " + ((game.data.ability1 + 1)*10), this.pos.x, this.pos.y + 160);
				this.font.draw(renderer.getContext(), "W: Ability: Eat your creep for health. Current Level: "+ game.data.ability2 + " Cost: " + ((game.data.ability2 + 1)*10), this.pos.x, this.pos.y + 200);
				this.font.draw(renderer.getContext(), "B Ability: Throw your spear. Current Level: " + game.data.ability3 + " Cost: " + ((game.data.ability3 + 1)*10), this.pos.x, this.pos.y + 240);
			}	
		}));
		//adds text
		me.game.world.addChild(game.data.buytext, 35);
	},

	stopBuying: function(){
		//lets you stop buying
		this.buying = false;
		//resumes game
		me.state.resume(me.state.PLAY);
		//sets velocity again
		game.data.player.body.setVelocity(game.data.playerMoveSpeed, 20);
		//removes screen
		me.game.world.removeChild(game.data.buyscreen);
		//unbinding keys so you cant randomly buy things with the screen not up
		me.input.unbindKey(me.input.KEY.F1, "F1", true);
		me.input.unbindKey(me.input.KEY.F2, "F2", true);
		me.input.unbindKey(me.input.KEY.F3, "F3", true);
		me.input.unbindKey(me.input.KEY.F4, "F4", true);
		me.input.unbindKey(me.input.KEY.F5, "F5", true);
		me.input.unbindKey(me.input.KEY.F6, "F6", true);
		//removes text
		me.game.world.removeChild(game.data.buytext);
	},

	checkBuyKeys: function(){
		//checking what keys your pressing
		if(me.input.isKeyPressed("F1")){
			//if its true it calls another function
			if(this.checkCost(1)){
				this.makePurchase(1);
			}
		}
		else if(me.input.isKeyPressed("F2")){
			if(this.checkCost(2)){
				this.makePurchase(2);
			}
		}
		else if(me.input.isKeyPressed("F3")){
			if(this.checkCost(3)){
				this.makePurchase(3);
			}
		}
		else if(me.input.isKeyPressed("F4")){
			if(this.checkCost(4)){
				this.makePurchase(4);
			}
		}
		else if(me.input.isKeyPressed("F5")){
			if(this.checkCost(5)){
				this.makePurchase(5);
			}
		}
		else if(me.input.isKeyPressed("F6")){
			if(this.checkCost(6)){
				this.makePurchase(6);
			}
		}
	},

	//seeing if you have enough to buy a skill / ability
	checkCost: function(skill){
		//checking if correct skill && if you have enough gold  
		if(skill1===1 && (game.data.gold >= ((game.data.skill1 + 1)*10))){
			return true;
		}
		else if(skill2===2 && (game.data.gold >= ((game.data.skill2 + 1)*10))){
			return true;
		}
		else if(skill3===3 && (game.data.gold >= ((game.data.skill3 + 1)*10))){
			return true;
		}
		else if(skill4===4 && (game.data.gold >= ((game.data.ability1 + 1)*10))){
			return true;
		}
		else if(skill5===5 && (game.data.gold >= ((game.data.ability2 + 1)*10))){
			return true;
		}
		else if(skill6===6 && (game.data.gold >= ((game.data.ability3 + 1)*10))){
			return true;
		}
		else{
			//returns false if you dont have enough
			return false;
		}
	},

	//
	makePurchase: function(skill){
		//works only if skill is 1
		if(skill === 1){
			//subtract gold that it costs
		 	game.data.gold -= ((game.data.skill1 +1)*10);
			//increase the skill
			game.data.skill1 += 1;
			//increases skill, aka the attack
			game.data.playerAttack +=1;
		}
		else if(skill === 2){
			game.data.gold -= ((game.data.skill2 +1)*10);
			game.data.skill2 += 1;
		}
		else if(skill === 3){
			game.data.gold -= ((game.data.skill3 +1)*10);
			game.data.skill3 += 1;
		}
		else if(skill === 4){
			game.data.gold -= ((game.data.ability1+1)*10);
			game.data.ability1 += 1;
		}
		else if(skill === 5){
			game.data.gold -= ((game.data.ability2+1)*10);
			game.data.ability2 += 1;
		}
		else if(skill === 6){
			game.data.gold -= ((game.data.ability3+1)*10);
			game.data.ability3 += 1;
		}

	}

});