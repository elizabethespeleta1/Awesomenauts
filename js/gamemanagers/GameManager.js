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
			alert ("YOU WIN!");
		}
		//runs if you lose and if the game isnt over
		else if (game.data.win === false&& !this.gameover){
			//runs gameOver sending the parameter false
			this.gameOver(false);
			alert("YOU LOSE!");
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

		
				$.ajax({
					type: "POST",
					url: "php/controller/save-user.php",
					data: {
						exp: game.data.exp,
						exp1: game.data.exp1,
						exp2: game.data.exp2,
						exp3: game.data.exp3,
						exp4: game.data.exp4,
					},
					dataType: "text"
				})
				//if it does what its supposed to this runs
					.success(function(response){
						//if true runs the game
						if(response === "true"){
							me.state.change(me.state.MENU);
						}
						//else it'll tell you the response
						else{
							alert(response);
						}
					})
				//tells you if you failed
					.fail(function(response){
						alert("Fail");
					});
			
		}
});

