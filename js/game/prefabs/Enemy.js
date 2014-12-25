var Enemy = function(game, x, y, key, frame) {
  key = 'orangeSquare';
  Phaser.Sprite.call(this, game, x, y, key, frame);

  this.scale.setTo(1.25);
  this.anchor.setTo(0.5);
  this.tint = 0xFF0000;
  this.smoothed=false;

  this.game.physics.arcade.enableBody(this);
  this.body.allowGravity = false;

  this.checkWorldBounds = true;
  this.outOfBoundsKill = true;

  this.events.onRevived.add(this.onRevived, this);

};

Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.onRevived = function() {

  this.body.velocity.x = -400;

};



