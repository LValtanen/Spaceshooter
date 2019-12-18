var config = {
    type: Phaser.WEBGL,
    width: 480,
    height: 640,
    backgroundColor: "black",
    physics: {
        default: "arcade",
        arcade: {
            gravity: { x: 0, y: 0 }
        }
    },
    scene: [
        SceneMainMenu,
        SceneStory,
        SceneMain,
        SceneStageCleared,
        SceneGameOver
    ],
    pixelArt: true,
    roundPixels: true
};

var game = new Phaser.Game(config);

var score = 0;
var ammoText = '';

var allScores = [];

var launched = true;

var bosslaunched = true;

var timer = 500;

var player = 'anonymous'