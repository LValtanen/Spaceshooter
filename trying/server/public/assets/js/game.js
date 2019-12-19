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
    roundPixels: true,
};

var game = new Phaser.Game(config);
var score = 0;

var allData;
// var datatable = [];

// fetch('/scores', {
//     method: 'GET',
//     headers: {
//         'Accept': 'application/json, text/plain, */*',
//         'Content-Type': 'application/json'
//     },
// }).then(data => data.json())
//     .then(data => console.log(data))
//     .then(data => {
//         datatable = data;
//     })