tbsps.Preload = function() {
    this.ready = false;
};

tbsps.Preload.prototype = {
    preload: function() {

        this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preloadbar');
        this.preloadBar.anchor.setTo(0.5);

        this.load.setPreloadSprite(this.preloadBar);

        this.load.onLoadComplete.add(this.onLoadComplete, this);

        this.load.image('square', 'assets/images/black-square.png');
        this.load.image('orangeSquare', 'assets/images/orange-square.png');
        this.load.image('triangle', 'assets/images/black-triangle.png');
        this.load.image('halfRound', 'assets/images/black-half-round.png');

        this.load.audio('tap', 'assets/audio/tap.wav');
        this.load.audio('failedGame', 'assets/audio/failed-game.wav');

        this.load.bitmapFont('squareFont', 'assets/fonts/square8blackborder1/font.png', 'assets/fonts/square8blackborder1/font.fnt');

    },
    create: function() {

        this.preloadBar.cropEnabled = false;

    },
    update: function() {

        if(this.ready === true) {
            this.state.start('MainMenu');
        }

    },
    onLoadComplete: function() {

        this.ready = true;

    }
};