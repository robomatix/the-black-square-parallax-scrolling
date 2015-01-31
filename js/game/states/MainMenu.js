tbsps.MainMenu = function() {};

tbsps.MainMenu.prototype = {
    create: function() {

        this.backgroundTop1 = this.game.add.tileSprite(0, 0, this.game.width, 100, 'halfRound');
        this.backgroundTop1.alpha = 0.1;
        this.backgroundTop1.autoScroll(-25, 0);

        this.backgroundTop2 = this.game.add.tileSprite(0, -50, this.game.width, 100, 'halfRound');
        this.backgroundTop2.alpha = 0.3;
        this.backgroundTop2.autoScroll(-50, 0);

        this.backgroundTop3 = this.game.add.tileSprite(0, -75, this.game.width, 100, 'halfRound');
        this.backgroundTop3.alpha = 0.5;
        this.backgroundTop3.autoScroll(-75, 0);

        this.backgroundTopRotLeft1 = this.game.add.tileSprite(-10, 0, this.game.width, 99, 'halfRound');
        this.backgroundTopRotLeft1.rotation = -0.1;
        this.backgroundTopRotLeft1.alpha = 0.2;
        this.backgroundTopRotLeft1.autoScroll(-38, 0);


        this.backgroundBottom1 = this.game.add.tileSprite(0, this.game.height - 150, this.game.width, 150, 'triangle');
        this.backgroundBottom1.alpha = 0.1;
        this.backgroundBottom1.autoScroll(-25, 0);

        this.backgroundBottom2 = this.game.add.tileSprite(0, this.game.height - 75, this.game.width, 75, 'triangle');
        this.backgroundBottom2.alpha = 0.3;
        this.backgroundBottom2.autoScroll(-50, 0);

        this.backgroundBottom3 = this.game.add.tileSprite(0, this.game.height - 50, this.game.width, 50, 'triangle');
        this.backgroundBottom3.alpha = 0.5;
        this.backgroundBottom3.autoScroll(-75, 0);

        this.backgroundBottomRotLeft1 = this.game.add.tileSprite(0, this.game.height - 150, this.game.width, 148, 'triangle');
        this.backgroundBottomRotLeft1.rotation = 0.1;
        this.backgroundBottomRotLeft1.alpha = 0.2;
        this.backgroundBottomRotLeft1.autoScroll(-38, 0);

        this.teaserText1 = this.game.add.bitmapText(0,0, 'squareFont', 'Collect the black squares !', 69);
        this.teaserText1.x = this.game.width / 2 - this.teaserText1.textWidth / 2;
        this.teaserText1.y = 25;

        this.teaserText2 = this.game.add.bitmapText(0,0, 'squareFont', 'Avoid the red squares !', 69);
        this.teaserText2.tint = 0xff0000;
        this.teaserText2.x = this.game.width / 2 - this.teaserText2.textWidth / 2;
        this.teaserText2.y = 94;

        /*
        this.startText = this.game.add.bitmapText(0,0, 'squareFont', 'Left click on the screen to start', 69);
        this.startText.x = this.game.width / 2 - this.startText.textWidth / 2;
        this.startText.y = this.game.height / 2 + this.startText.textHeight / 2;
        */
        this.playSlowMotionButton = this.game.add.button(this.game.world.centerX, this.game.world.centerY, 'play-slowmotion', this.playSlow, this, 1, 0);
        this.playSlowMotionButton.anchor.setTo(0.5, 0.5);

        this.playFastButton = this.game.add.button(this.game.world.centerX, this.game.world.centerY + 120, 'play-fast', this.playFast, this, 1, 0);
        this.playFastButton.anchor.setTo(0.5, 0.5);

        this.gameTitleText = this.game.add.bitmapText(0,0, 'squareFont', 'The black square parallax scrolling', 69);
        this.gameTitleText.x = this.game.width / 2 - this.gameTitleText.textWidth / 2;
        this.gameTitleText.y = this.game.height / 2 + this.playFastButton.y - 128;

        this.muteButton = this.game.add.button(this.game.world.width - 10, 10, 'mute', this.toggleSound, this, 3, 0);
        this.muteButton.anchor.setTo(1, 0);
        if (this.game.sound.mute) {

            this.muteButton.setFrames(1, 2);
            this.muteButton.frame = 2;

        }

        this.tapSound = this.game.add.audio('tap');


    },
    update: function() {

    },
    toggleSound: function () {

        if (this.game.sound.mute) {

            this.muteButton.setFrames(3, 0);
            this.muteButton.frame = 0;
            this.game.sound.mute = false;

        } else {

            this.muteButton.setFrames(1, 2);
            this.muteButton.frame = 2;
            this.game.sound.mute = true;

        }

    },
    playSlow: function () {
        this.tapSound.play('', 0, true);
        this.game.state.start('Game');
        console.log('Slow');
    },
    playFast: function () {
        this.tapSound.play('', 0, true);
        this.game.state.start('Game');
        console.log('Fast');
    }
};