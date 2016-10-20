/*global Phaser*/

var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
    preload: preload,
    create: create,
    update: update
});

var cursors;
var stars;
var player;
var platforms;
var scoreText;
var score;


function preload() {

    game.load.image('sky', 'assets/sky.png');
    game.load.image('ground', 'assets/platform.png');
    game.load.image('Token', 'assets/Token.png');
    game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
    game.load.spritesheet('Hero', 'assets/Hero.png', 31, 28);

}

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.add.sprite(0, 0, 'sky');
    game.add.sprite(0, 1000, 'ground');

    platforms = game.add.group();
    platforms.enableBody = true;
    var ground = platforms.create(0, game.world.height - 65, 'ground');
    ground.scale.setTo(2, 2);
    ground.body.immovable = true;

    var ledge = platforms.create(100, 100, 'ground');
    ledge.body.immovable = true;

    var ledge = platforms.create(300, 300, 'ground');
    ledge.body.immovable = true;

    var ledge = platforms.create(80, 450, 'ground');
    ledge.body.immovable = true;

    player = game.add.sprite(0, game.world.height - 150, 'Hero');

    game.physics.arcade.enable(player);
    player.body.bounce.y = 0;
    player.body.gravity.y = 250;
    player.body.collideWorldBounds = true;
    player.animations.add('left', [1, 2], 10, true);
    player.animations.add('right', [4, 5], 10, true);


    cursors = game.input.keyboard.createCursorKeys();

    stars = game.add.group();
    stars.scale.set(0.25, 0.25);
    stars.enableBody = true;
    for (var i = 0; i < 12; i++) {
        var star = stars.create(i * 250, 0, 'Token');
        star.body.gravity.y = 100;
        star.body.bounce.y = 0.7 + Math.random() * 0.2;
        star.body.setSize(45, 45, 19, 13);

    }



    scoreText = game.add.text(16, 16, 'score: 0', {
        fontSize: "32px",
        fill: '#000'
    });
    score = 0;
}

var timer = 0;

function update() {
    timer++;
    if (timer > 50) {
    
timer = 0;

        for (var i = 0; i < 12; i++) {
            var star = stars.create(i * 250, 0, 'Token');
            star.body.gravity.y = 100;
            star.body.bounce.y = 0.7 + Math.random() * 0.2;
            star.body.setSize(45, 45, 19, 13);
        
        }
        }


    var hitPlatform = game.physics.arcade.collide(player, platforms);

    game.physics.arcade.collide(stars, platforms);



    player.body.velocity.x = 0;


    if (cursors.left.isDown) {

        player.body.velocity.x = -150;

        player.animations.play('left');

    }
    else if (cursors.right.isDown) {

        player.body.velocity.x = 150;

        player.animations.play('right');
    }
    else {

        player.animations.stop();

        player.frame = 3;
    }


    if (cursors.up.isDown && player.body.touching.down && hitPlatform) {

        player.body.velocity.y = -350;

    }

    game.physics.arcade.overlap(player, stars, collectStar, null, this);

    function collectStar(player, star){
        star.kill();
        score += 1;
        scoreText.text = 'score:' + score;
    }
    
}