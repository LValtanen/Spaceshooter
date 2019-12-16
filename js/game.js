var config = {
    // game is being rendered via WebGL instead of using ordinary Canvas rendering tech
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
    // scene is effectively like any sort of “screen” you see in a video game
    scene: [
        SceneMainMenu,
        SceneIntro,
        SceneMain,
        SceneStageCleared,
        SceneGameOver
    ],
    pixelArt: true,
    roundPixels: true
};

var game = new Phaser.Game(config);

var score = 0;