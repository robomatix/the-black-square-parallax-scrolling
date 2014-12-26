tbsps.Game = function () {
    this.playerMinAngle = 0;
    this.playerMaxAngle = 18;

    this.coinRate = 750;
    this.coinTimer = 0;

    this.enemyRate = 900;
    this.enemyTimer = 500;

    this.score = 0;

};

tbsps.Game.prototype = {
    create: function () {

        this.game.scoreboardLancher = false;

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


        this.backgroundBottom1 = this.game.add.tileSprite(0, this.game.height - 150, this.game.width, 150, 'triangle');
        this.backgroundBottom1.alpha = 0.1;
        this.backgroundBottom1.autoScroll(-50, 0);

        this.backgroundBottom2 = this.game.add.tileSprite(0, this.game.height - 75, this.game.width, 75, 'triangle');
        this.backgroundBottom2.alpha = 0.3;
        this.backgroundBottom2.autoScroll(-100, 0);

        this.backgroundBottom3 = this.game.add.tileSprite(0, this.game.height - 50, this.game.width, 50, 'triangle');
        this.backgroundBottom3.alpha = 0.5;
        this.backgroundBottom3.autoScroll(-150, 0);

        this.backgroundBottomRotLeft1 = this.game.add.tileSprite(0, this.game.height - 150, this.game.width, 148, 'triangle');
        this.backgroundBottomRotLeft1.rotation = 0.1;
        this.backgroundBottomRotLeft1.alpha = 0.2;
        this.backgroundBottomRotLeft1.autoScroll(-75, 0);


        this.player = this.add.sprite(200, this.game.height / 2, 'square');
        this.player.anchor.setTo(0.5);
        this.player.scale.setTo(2);
        this.player.smoothed = false;

        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.gravity.y = 400;


        this.game.physics.arcade.enableBody(this.player);
        this.player.body.collideWorldBounds = true;
        this.player.body.bounce.set(0.42);

        this.coins = this.game.add.group();
        this.enemies = this.game.add.group();

        this.scoreText = this.game.add.bitmapText(10, 10, 'squareFont', 'Score : 0', 48);

        this.tapSound = this.game.add.audio('tap');
        this.collectSound = this.game.add.audio('collect');
        this.gameMusic = this.game.add.audio('gameMusic');
        this.gameMusic.play('', 0,1, true);


    },
    update: function () {
        if (this.game.input.activePointer.isDown) {
            this.player.body.velocity.y -= 33;

            if (!this.tapSound.isPlaying) {
                this.tapSound.play('', 0, true);
            }
        } else {
            this.tapSound.stop();
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

        if (this.coinTimer < this.game.time.now) {
            this.createCoin();
            this.coinTimer = this.game.time.now + this.coinRate;
        }

        if (this.enemyTimer < this.game.time.now) {
            this.createEnemy();
            this.enemyTimer = this.game.time.now + this.enemyRate;
        }

        this.game.physics.arcade.overlap(this.player, this.coins, this.coinHit, null, this);
        this.game.physics.arcade.overlap(this.player, this.enemies, this.enemyHit, null, this);

    },
    shutdown: function () {

        this.player.destroy();
        this.coins.destroy();
        this.enemies.destroy();
        this.score = 0;
        this.coinTimer = 0;
        this.enemyTimer = 0;
        this.scoreboardLancher = false;

    },
    createCoin: function () {

        var x = this.game.width;
        var y = this.game.rnd.integerInRange(50, this.game.world.height - 50);

        var coin = this.coins.getFirstExists(false);
        if (!coin) {
            coin = new Coin(this.game, 0, 0);
            this.coins.add(coin);
        }

        coin.reset(x, y);
        coin.revive();
        return coin;

    },
    createEnemy: function () {

        var x = this.game.width;
        var y = this.game.rnd.integerInRange(50, this.game.world.height - 50);

        var enemy = this.enemies.getFirstExists(false);
        if (!enemy) {
            enemy = new Enemy(this.game, 0, 0);
            this.enemies.add(enemy);
        }
        enemy.reset(x, y);
        enemy.revive();

    },
    coinHit: function (player, coin) {

        this.collectSound.play('', 0, true);

        this.score++;
        coin.kill();
        this.scoreText.text = 'Score : ' + this.score;

    },
    enemyHit: function (player, enemy) {

        this.gameMusic.stop();

        player.body.velocity.x = 0;
        enemy.body.velocity.x = 0;

        this.backgroundTop1.stopScroll();
        this.backgroundTop2.stopScroll();
        this.backgroundTop3.stopScroll();
        this.backgroundTopRotLeft1.stopScroll();
        this.backgroundBottom1.stopScroll();
        this.backgroundBottom2.stopScroll();
        this.backgroundBottom3.stopScroll();
        this.backgroundBottomRotLeft1.stopScroll();

        this.enemies.setAll('body.velocity.x', 0);
        this.coins.setAll('body.velocity.x', 0);

        this.enemyTimer = Number.MAX_VALUE;
        this.coinTimer = Number.MAX_VALUE;
        if (!this.game.scoreboardLancher) {
            var scoreboard = new Scoreboard(this.game);
            scoreboard.show(this.score);
            this.game.scoreboardLancher = true;

        }
    }

};