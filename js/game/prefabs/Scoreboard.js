var Scoreboard = function (game) {
    Phaser.Group.call(this, game);
};

Scoreboard.prototype = Object.create(Phaser.Group.prototype);
Scoreboard.prototype.constructor = Scoreboard;

Scoreboard.prototype.show = function (score) {
    var bmd, background, gameoverText, scoreText, highScoreText, newHighScoreText, playAgainText, shareYourScoreText, shareGoogleButton, shareTwitterButton, shareTumblrButton;

    this.game.gameTitle = "The Black Square Parallax Scrolling";
    this.game.urlGame = "http://le-carre-noir.net/the-black-square-parallax-scrolling/";
    this.game.sharingMessage = score + " is my latest score on " + this.game.gameTitle + " !";

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

    shareTwitterButton = this.game.add.button(this.game.width / 2 - 30, 365, 'twitter', this.shareTwitterClicked, this, 1, 0, 0);
    shareTwitterButton.anchor.setTo(0.5, 0.5);
    this.add(shareTwitterButton);

    shareTumblrButton = this.game.add.button(this.game.width / 2 + 30, 365, 'tumblr', this.shareTumblrClicked, this, 1, 0, 0);
    shareTumblrButton.anchor.setTo(0.5, 0.5);
    this.add(shareTumblrButton);

    playAgainText = this.game.add.bitmapText(0, 420, 'squareFont', 'Click here to play again !', 64);
    playAgainText.x = this.game.width / 2 - (playAgainText.textWidth / 2);
    playAgainText.inputEnabled = true;
    playAgainText.events.onInputDown.add(this.restart, this);
    playAgainText.events.onInputOver.add(this.tintOver, this);
    playAgainText.events.onInputOut.add(this.tintOut, this);

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

Scoreboard.prototype.tintOver = function (item) {

    item.tint = 0xFF0000;

};

Scoreboard.prototype.tintOut = function (item) {

    item.tint = 0x000000;

};

Scoreboard.prototype.shareTwitterClicked = function () {

    window.open("https://twitter.com/intent/tweet?url=" + this.game.urlGame + "&text=" + this.game.sharingMessage + "&hashtags=microgame,gaming,runner&via=LeCarreNoir", "", "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=400,width=700");

};

Scoreboard.prototype.shareTumblrClicked = function () {

    tumblr_photo_source = "http://le-carre-noir.net/the-black-square-parallax-scrolling/images/the-black-square-parallax-scrolling-logo-500.png";

    tumblr_photo_caption = this.game.sharingMessage + ' Click on the picture to play to this gentle game...';

    tumblrButtonHref = 'http://www.tumblr.com/share/photo?source=' + encodeURIComponent(tumblr_photo_source) + '&caption=' + encodeURIComponent(tumblr_photo_caption) + '&click_thru=' + encodeURIComponent(this.game.urlGame);

    window.open(tumblrButtonHref, "", "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=400,width=700");

};