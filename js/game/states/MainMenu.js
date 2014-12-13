tbsps.MainMenu = function() {};

tbsps.MainMenu.prototype = {
    create: function() {

        this.backgroundTop1 = this.game.add.tileSprite(0, 0, this.game.width, 100, 'halfRound');
        this.backgroundTop1.alpha = 0.1;
        this.backgroundTop1.autoScroll(-50, 0);

        this.backgroundTop2 = this.game.add.tileSprite(0, -50, this.game.width, 100, 'halfRound');
        this.backgroundTop2.alpha = 0.3;
        this.backgroundTop2.autoScroll(-100, 0);

        this.backgroundTop3 = this.game.add.tileSprite(0, -75, this.game.width, 100, 'halfRound');
        this.backgroundTop3.alpha = 0.5;
        this.backgroundTop3.autoScroll(-150, 0);

        this.backgroundTopRotLeft1 = this.game.add.tileSprite(-10, 0, this.game.width, 99, 'halfRound');
        this.backgroundTopRotLeft1.rotation = -0.1;
        this.backgroundTopRotLeft1.alpha = 0.2;
        this.backgroundTopRotLeft1.autoScroll(-75, 0);

        this.backgroundBottom1 = this.game.add.tileSprite(0, this.game.height-150, this.game.width, 150, 'triangle');
        this.backgroundBottom1.alpha = 0.1;
        this.backgroundBottom1.autoScroll(-50, 0);

        this.backgroundBottom2 = this.game.add.tileSprite(0, this.game.height-75, this.game.width, 150, 'triangle');
        this.backgroundBottom2.alpha = 0.3;
        this.backgroundBottom2.autoScroll(-100, 0);

        this.backgroundBottom3 = this.game.add.tileSprite(0, this.game.height-50, this.game.width, 150, 'triangle');
        this.backgroundBottom3.alpha = 0.5;
        this.backgroundBottom3.autoScroll(-150, 0);

        this.backgroundRotLeft1 = this.game.add.tileSprite(0, this.game.height-150, this.game.width, 150, 'triangle');
        this.backgroundRotLeft1.rotation = 0.1;
        this.backgroundRotLeft1.alpha = 0.2;
        this.backgroundRotLeft1.autoScroll(-75, 0);

        this.startText = this.game.add.bitmapText(0,0, 'squareFont', 'tap to start', 69);
        this.startText.x = this.game.width / 2 - this.startText.textWidth / 2;
        this.startText.y = this.game.height / 2 + this.startText.textHeight / 2;

        this.gameTitleText = this.game.add.bitmapText(0,0, 'squareFont', 'The black square parallax scrolling', 69);
        this.gameTitleText.x = this.game.width / 2 - this.gameTitleText.textWidth / 2;
        this.gameTitleText.y = this.game.height / 2 + this.startText.y - 128;


    },
    update: function() {
        if(this.game.input.activePointer.justPressed()) {
            this.game.state.start('Game');
        }
    }
};