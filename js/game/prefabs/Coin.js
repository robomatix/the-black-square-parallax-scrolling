var Coin = function(game, x, y, key, frame) {
  key = 'square';
  Phaser.Sprite.call(this, game, x, y, key, frame);

  this.scale.setTo(1.25);
  this.anchor.setTo(0.5);
  this.smoothed=false;

  this.game.physics.arcade.enableBody(this);
  this.body.allowGravity = false;

  this.checkWorldBounds = true;
  this.outOfBoundsKill = true;

  this.events.onKilled.add(this.onKilled, this);
  this.events.onRevived.add(this.onRevived, this);

};

Coin.prototype = Object.create(Phaser.Sprite.prototype);
Coin.prototype.constructor = Coin;

Coin.prototype.onRevived = function() {
  this.body.velocity.x = -222;


};

Coin.prototype.onKilled = function() {

};

