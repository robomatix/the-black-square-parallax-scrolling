tbsps.MainMenu = function() {};

tbsps.MainMenu.prototype = {
    create: function() {

        this.backgroundBottom1 = this.game.add.tileSprite(0, this.game.height-150, this.game.width, 150, 'triangle');
        this.backgroundBottom1.alpha = 0.1;
        this.backgroundBottom1.autoScroll(-50, 0);

        this.backgroundBottom2 = this.game.add.tileSprite(0, this.game.height-75, this.game.width, 75, 'triangle');
        this.backgroundBottom2.alpha = 0.3;
        this.backgroundBottom2.autoScroll(-100, 0);

        this.backgroundBottom3 = this.game.add.tileSprite(0, this.game.height-50, this.game.width, 50, 'triangle');
        this.backgroundBottom3.alpha = 0.5;
        this.backgroundBottom3.autoScroll(-150, 0);

        this.backgroundRotLeft1 = this.game.add.tileSprite(0, this.game.height-150, this.game.width, 150, 'triangle');
        this.backgroundRotLeft1.rotation = 0.1;
        this.backgroundRotLeft1.alpha = 0.2;
        this.backgroundRotLeft1.autoScroll(-75, 0);


    },
    update: function() {
        if(this.game.input.activePointer.justPressed()) {
            this.game.state.start('Game');
        }
    }
};