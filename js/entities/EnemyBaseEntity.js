//this is a class for the enemy base
//almost the same the class above
game.EnemyBaseEntity = me.Entity.extend({
	init : function (x, y, settings){
		this._super(me.Entity, 'init', [x, y, {
			image : "tower",
			width : 100,
			height : 100,
			spritewidth : "100",
			spriteheight : "100",
			getShape: function(){
				return (new me.Rect (0, 0, 70, 70)).toPolygon();
			}
		}]);
		this.broken = false;
		//can  change the enemyBaseHealth in game.js
		this.health = game.data.enemyBaseHealth;
		this.alwaysUpdate = true;
		this.body.onCollision = this.onCollision.bind(this);

		this.type = "EnemyBaseEntity";

		//0 because is the not burning animation
		//1 is another animation
		//this.renderable.setCurrentAnimation("idle"); sets the animation when the tower is broken
		this.renderable.addAnimation("idle", [0]);
		this.renderable.addAnimation("broken", [1]);
		this.renderable.setCurrentAnimation("idle");

	},

	update:function(delta) {
		if(this.health<=0){
			this.broken = true;
			this.renderable.setCurrentAnimation("broken");
		}
		this.body.update(delta);

		this._super(me.Entity, "update", [delta]);
		return true;
	},

	onCollision: function(){

	},

	//this function runs so you can lose health
	loseHealth: function(){
		//this makes your health go down one
		this.health--;
	}

});