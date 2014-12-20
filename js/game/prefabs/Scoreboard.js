var Scoreboard = function (game) {
    Phaser.Group.call(this, game);
};

Scoreboard.prototype = Object.create(Phaser.Group.prototype);
Scoreboard.prototype.constructor = Scoreboard;

Scoreboard.prototype.show = function (score) {
    var bmd, background, gameoverText, scoreText, highScoreText, newHighScoreText, playAgainText, shareYourScoreText, shareTwitterButton;

    this.game.score = score;

    bmd = this.game.add.bitmapData(this.game.width, this.game.height);
    bmd.ctx.fillStyle = '#000';
    bmd.ctx.fillRect(0, 0, this.game.width, this.game.height);

    background = this.game.add.sprite(0, 0, bmd);
    background.alpha = 0.5;

    this.add(background);

    var isNewHighScore = false;
    var highscore = localStorage.getItem('highscore');

    if (!highscore || highscore < score) {
        isNewHighScore = true;
        highscore = score;
        localStorage.setItem('highscore', highscore);
    }

    this.y = -this.game.height;

    if (isNewHighScore) {
        newHighScoreText = this.game.add.bitmapText(0, 100, 'squareFont', '!!! New High Score !!!', 88);
        newHighScoreText.y = 25;
        newHighScoreText.x = this.game.width / 2 - (newHighScoreText.textWidth / 2);
        this.add(newHighScoreText);
    }

    gameoverText = this.game.add.bitmapText(0, 100, 'squareFont', 'You failed !!!', 88);
    gameoverText.x = this.game.width / 2 - (gameoverText.textWidth / 2);
    this.add(gameoverText);
    gameoverText.tint = 0xff0000;

    scoreText = this.game.add.bitmapText(0, 200, 'squareFont', 'Your Score : ' + score, 48);
    scoreText.x = this.game.width / 2 - (scoreText.textWidth / 2);
    this.add(scoreText);

    highScoreText = this.game.add.bitmapText(0, 250, 'squareFont', 'Your High Score : ' + highscore, 48);
    highScoreText.x = this.game.width / 2 - (highScoreText.textWidth / 2);
    this.add(highScoreText);

    shareYourScoreText = this.game.add.bitmapText(0, 300, 'squareFont', 'Proudly share your score', 36);
    shareYourScoreText.x = this.game.width / 2 - (shareYourScoreText.textWidth / 2);
    this.add(shareYourScoreText);

    shareTwitterButton = this.game.add.button(this.game.width / 2, 350, 'twitter', this.shareTwitterClicked, this, 1, 0, 0);
    shareTwitterButton.anchor.setTo(0.5, 0.5);
    this.add(shareTwitterButton);

    playAgainText = this.game.add.bitmapText(0, 400, 'squareFont', 'Click here to play again !', 64);
    playAgainText.x = this.game.width / 2 - (playAgainText.textWidth / 2);
    playAgainText.inputEnabled = true;
    playAgainText.events.onInputDown.add(this.restart, this);
    this.add(playAgainText);

    this.tapSound = this.game.add.audio('tap');
    this.failedGameSound = this.game.add.audio('failedGame');

    this.failedGameSound.play('', 0, true);


    this.game.add.tween(this).to({y: 0}, 1000, Phaser.Easing.Bounce.Out, true);


};

Scoreboard.prototype.restart = function () {


    this.tapSound.play('', 0, true);
        this.game.state.start('Game', true, false);


};


Scoreboard.prototype.shareTwitterClicked = function () {

    scoreShared = this.game.score;

    this.game.sharing=true;

    window.open("https://twitter.com/intent/tweet?url=http://myurl.com&text=I+just+made+" + scoreShared + "+points+on+Black+Square+Parallax+!", "_blank"); // Opening the link on a blank page

};