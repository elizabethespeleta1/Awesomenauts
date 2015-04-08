game.EnemyHero = me.Entity.extend({
	init : function(x, y, settings){
			this._super(me.Entity, 'init', [x, y, {
				image: "hero",
				width: 64,
				height: 64,
				spritewidth: "64",
				spriteheight: "64",

				getShape: function(){
					return (new me.Rect(0, 0, 64, 64)).toPolygon();
			 }

		}]);

			
			this.body.setVelocity(3, 19);

			this.type = "EnemyHero";

			this.renderable.addAnimation("walk", [144, 145, 146, 147, 148, 149, 150, 151, 152], 80);
			this.renderable.setCurrentAnimation("walk");

	},


	update: function(delta){

		this.body.vel.x -= this.body.accel.x * me.timer.tick;

		this.flipX(true);
		
		this.body.update(delta);

		this._super(me.Entity, "update", [delta]);
		return true;
	}

});