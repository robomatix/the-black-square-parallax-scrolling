tbsps.Preload = function() {
    this.ready = false;
};

tbsps.Preload.prototype = {
    preload: function() {

        this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preloadbar');
        this.preloadBar.anchor.setTo(0.5);

        this.load.setPreloadSprite(this.preloadBar);

        this.load.image('square', 'assets/images/white-square-20.png');
        this.load.image('triangle', 'assets/images/black-triangle.png');
        this.load.image('halfRound', 'assets/images/black-half-round.png');

        this.load.spritesheet('twitter', 'assets/images/rs-icons/twitter.png', 57, 57);
        this.load.spritesheet('tumblr', 'assets/images/rs-icons/tumblr.png', 57, 57);

        this.load.spritesheet('play-slowmotion', 'assets/images/btn-play-slow-motion.png', 640, 66);
        this.load.spritesheet('play-fast', 'assets/images/btn-play-fast-and-vicious.png', 800, 66);
        this.load.spritesheet('mute', 'assets/images/btn-mute.png', 70, 50);

        this.load.audio('tap', ['assets/audio/tap.mp3', 'assets/audio/tap.ogg']);
        this.load.audio('collect', ['assets/audio/collect-coin.mp3', 'assets/audio/collect-coin.ogg']);
        this.load.audio('failedGame', ['assets/audio/failed-game.mp3', 'assets/audio/failed-game.ogg']);
        this.load.audio('gameMusic', ['assets/audio/muzik.mp3', 'assets/audio/muzik.ogg']);

        this.load.bitmapFont('squareFont', 'assets/fonts/square8blackborder1/font.png', 'assets/fonts/square8blackborder1/font.fnt');

        this.load.onLoadComplete.add(this.onLoadComplete, this);

    },
    create: function() {

        this.preloadBar.cropEnabled = false;

    },
    update: function() {

        if(this.cache.isSoundDecoded('tap') && this.cache.isSoundDecoded('collect') && this.cache.isSoundDecoded('failedGame') && this.cache.isSoundDecoded('gameMusic') && this.ready === true) {
            this.state.start('MainMenu');
        }

    },
    onLoadComplete: function() {

        this.ready = true;

    }
};