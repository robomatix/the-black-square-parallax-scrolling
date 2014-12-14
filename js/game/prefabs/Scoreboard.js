var Scoreboard = function(game) {
  Phaser.Group.call(this, game);
};

Scoreboard.prototype = Object.create(Phaser.Group.prototype);
Scoreboard.prototype.constructor = Scoreboard;

Scoreboard.prototype.show = function(score) {
  var bmd, background, gameoverText, scoreText, highScoreText, newHighScoreText, playAgainText;


  bmd = this.game.add.bitmapData(this.game.width, this.game.height);
  bmd.ctx.fillStyle = '#000';
  bmd.ctx.fillRect(0,0, this.game.width, this.game.height);

  background = this.game.add.sprite(0,0, bmd);
  background.alpha = 0.5;

  this.add(background);

  var isNewHighScore = false;
  var highscore = localStorage.getItem('highscore');

  if(!highscore || highscore < score) {
    isNewHighScore = true;
    highscore = score;
    localStorage.setItem('highscore', highscore);
  }

  this.y = -this.game.height;

  gameoverText = this.game.add.bitmapText(0,100, 'squareFont', 'You failed !!!', 88);
  gameoverText.x = this.game.width/2 - (gameoverText.textWidth / 2);
  this.add(gameoverText);
  gameoverText.tint = 0xff0000;

  scoreText = this.game.add.bitmapText(0, 200, 'squareFont', 'Your Score : ' + score, 48);
  scoreText.x = this.game.width / 2 - (scoreText.textWidth / 2);  
  this.add(scoreText);

  highScoreText = this.game.add.bitmapText(0, 250, 'squareFont', 'Your High Score : ' + highscore, 48);
  highScoreText.x = this.game.width / 2 - (highScoreText.textWidth / 2);  
  this.add(highScoreText);

  playAgainText = this.game.add.bitmapText(0, 300, 'squareFont', 'Click to play again !', 64);
  playAgainText.x = this.game.width / 2 - (playAgainText.textWidth / 2);
  this.add(playAgainText);

  if(isNewHighScore) {
    newHighScoreText = this.game.add.bitmapText(0, 100, 'squareFont', '!!! New High Score !!!', 88);
    newHighScoreText.y = 25;
    newHighScoreText.x = this.game.width / 2 - (newHighScoreText.textWidth / 2);
    this.add(newHighScoreText);
  }

    this.tapSound = this.game.add.audio('tap');
    this.failedGameSound = this.game.add.audio('failedGame');

    this.failedGameSound.play('', 0, true);



  this.game.add.tween(this).to({y: 0}, 1000, Phaser.Easing.Bounce.Out, true).onComplete.add(function () {// http://www.html5gamedevs.com/topic/1651-tween-oncompletecallback/?p=59747 // Doesn't seems to work properly from somewhere else...
      this.game.input.onDown.addOnce(this.restart, this);
  }, this);



};

Scoreboard.prototype.restart = function() {

    this.tapSound.play('', 0, true);
  this.game.state.start('Game', true, false);

};