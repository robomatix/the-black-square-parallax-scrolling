tbsps.Game = function() {
    this.playerMinAngle = 0;
    this.playerMaxAngle = 18;


};

tbsps.Game.prototype = {
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

        this.player = this.add.sprite(200, this.game.height/2, 'square');
        this.player.anchor.setTo(0.5);
        this.player.scale.setTo(2);

        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.gravity.y = 400;



        this.game.physics.arcade.enableBody(this.player);
        this.player.body.collideWorldBounds = true;
        this.player.body.bounce.set(0.42);


    },
    update: function() {
        if (this.game.input.activePointer.isDown) {
            this.player.body.velocity.y -= 25;

        }

        if (this.player.body.velocity.y < 0 || this.game.input.activePointer.isDown) {
            if (this.player.angle > 0) {
                this.player.angle = 0;
            }
            if (this.player.angle > this.playerMinAngle) {
                this.player.angle -= 0.5;
            }
        } else if (this.player.body.velocity.y >= 0 && !this.game.input.activePointer.isDown) {
            if (this.player.angle < this.playerMaxAngle) {
                this.player.angle += 0.5;
            }
        }

    }
};