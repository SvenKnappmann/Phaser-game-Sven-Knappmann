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
let phantomplatforms;
let cursors
let game = new Phaser.Game(config);

function preload() {
    this.load.image('background', 'Img/BackgroundGray.png');
    this.load.image('block', 'Img/Block.png');
    this.load.image('ground', 'Img/Ground.png');
    this.load.spritesheet('knight', 'Img/Heartless%20Knight%20V1.0.png', {frameWidth: 80, frameHeight: 80});
}

function create() {
    this.add.image(500, 500, 'background');
    this.add.image(1500, 500, 'background');
    platforms = this.physics.add.staticGroup();
    phantomplatforms = this.physics.add.staticGroup();
    platforms.create(768, 700, 'ground');
    // Assets
    //blocks
    //normal
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
    //normal
    //phantom
    phantomplatforms.create(890, 425, 'block');//1
    phantomplatforms.create(900, 300, 'block');//2
    phantomplatforms.create(100, 180, 'block');//3
    //phantom
    //blocks
    // Assets
    player = this.physics.add.sprite(200, 640, 'knight');
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
    this.physics.add.collider(player, platforms);
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
}