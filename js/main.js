'use strict';

//global variables
window.onload = function () {
    var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, '');

    // Game States
    game.state.add('Boot', tbsps.Boot);
    game.state.add('MainMenu', tbsps.MainMenu);
    game.state.add('Preload', tbsps.Preload);


    game.state.start('Boot');
};