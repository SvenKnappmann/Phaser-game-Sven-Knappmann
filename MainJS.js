let config = {
    type: Phaser.AUTO,
    width: 1536,
    height: 721,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 300},
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

let player;
let platforms;
let phantomPlatforms;
let cursors;
let objective;
let scoreText;
let score = 0;
let relocate
let game = new Phaser.Game(config);

function preload() {
    this.load.image('background', 'Img/BackgroundGray.png');
    this.load.image('block', 'Img/Block.png');
    this.load.image('ground', 'Img/Ground.png');
    this.load.spritesheet('objective', 'Img/Objective.png', {frameWidth: 80, frameHeight: 80});
    this.load.spritesheet('knight', 'Img/Heartless%20Knight%20V1.0.png', {frameWidth: 80, frameHeight: 80});
}

function create() {
    this.add.image(500, 500, 'background');
    this.add.image(1500, 500, 'background');
    platforms = this.physics.add.staticGroup();
    phantomPlatforms = this.physics.add.staticGroup();
    objective = this.physics.add.staticGroup();
    // Assets
    //ground
    platforms.create(768, 700, 'ground');
    //ground
    //objective
    objective.create(80,80, 'objective');
    //objective
    //blocks
    //solid
    platforms.create(600, 600, 'block');//1
    platforms.create(900, 425, 'block');//2
    platforms.create(1300, 500, 'block');//3
    platforms.create(1536, 335, 'block');//4
    platforms.create(1300, 200, 'block');//5
    platforms.create(1096, 166, 'block');//6
    platforms.create(890, 300, 'block');//7
    platforms.create(600, 300, 'block');//8
    platforms.create(300, 300, 'block');//9
    platforms.create(0, 150, 'block');//10
    //solid
    //phantom
    phantomPlatforms.create(890, 425, 'block');//1
    phantomPlatforms.create(900, 300, 'block');//2
    phantomPlatforms.create(100, 180, 'block');//3
    //phantom
    //blocks
    //player
    player = this.physics.add.sprite(200, 640, 'knight');
    //player
    // Assets
    player.setCollideWorldBounds(true);
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('knight', {start: 0, end: 3}),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'turn',
        frames: [{key: 'knight', frame: 4}],
        frameRate: 20
    });
    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('knight', {start: 5, end: 8}),
        frameRate: 10,
        repeat: -1
    });
    cursors = this.input.keyboard.createCursorKeys();

    scoreText = this.add.text(1300, 16, 'Score: 0', {fontSize: '32px', fill: '#000'});
    this.physics.add.collider(player, platforms);
    this.physics.add.overlap(player, objective, complete, null, this)
}

function update() {
    if (cursors.left.isDown && cursors.right.isDown) {
        player.setVelocityX(0);
        player.anims.play('turn');
    } else if (cursors.left.isDown) {
        player.setVelocityX(-160);

        player.anims.play('left', true);
    } else if (cursors.right.isDown) {
        player.setVelocityX(160);
        player.anims.play('right', true);
    } else {
        player.setVelocityX(0);
        player.anims.play('turn');
    }
    if (cursors.up.isDown && player.body.touching.down) {
        player.setVelocityY(-330);
    }
    if (relocate) {
        if (score % 2 === 0){
            objective.create(80,80, 'objective');
        } else if (score % 2 === 1) {
            objective.create(80,641, 'objective');
        }
        relocate = false;
    }
}
function complete(player, objective) {
    objective.disableBody(true, true);
    score += 1;
    scoreText.setText('Score: ' + score);
    relocate = true;
}