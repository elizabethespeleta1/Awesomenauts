//class for all the timers
//not an entity wont show up on the screen

//for experience at the end
game.ExperienceManager = Object.extend({
	init: function(x,y,settings){
		//constantly updates
		this.alwaysUpdate = true;
		this.gameover = false;
	},

	update:function(){
		//runs if you win and if the game isnt over
		if(game.data.win ===true && !this.gameover){
			//runs gameOver sending the parameter true
			this.gameOver(true);
		}
		//runs if you lose and if the game isnt over
		else if (game.data.win === false&& !this.gameover){
			//runs gameOver sending the parameter false
			this.gameOver(false);
		}
		return true;
	},

	gameOver: function(win){
		//runs if you win sending the parameter win
		if (win){
			//adds experience when you win
			game.data.exp += 10;
		}
		//runs if you lose sending the parameter win
		else{
			//adds experience when you lose
			game.data.exp += 1;
		}
		//so it constantly updates over
		//saves experience
		this.gameover = true;
		me.save.exp = game.data.exp;
		console.log("experience is: " + me.save.exp);
	}
});
