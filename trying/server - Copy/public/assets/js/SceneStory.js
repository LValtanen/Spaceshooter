// class SceneStory extends Phaser.Scene {
//     constructor() {
//         super({ key: "SceneStory" });
//     }
//     create() {
//         this.load.image("nebula10Bg", "content/backgrounds/nebula10.png");
//         //Create title and storytexts
//         this.title = this.add.text(this.game.config.width * 0.5, 128, "IT'S WAR NOW", {
//             fontFamily: 'monospace',
//             fontSize: 48,
//             fontStyle: 'bold',
//             color: '#ffffff',
//             align: 'center'
//         });
//         this.title.setOrigin(0.5);

//         this.introtxt = this.add.text(this.game.config.width * 0.5, 200, "The enemy is comig...Go kick some ass, son!", {
//             fontFamily: 'monospace',
//             fontSize: 15,
//             fontStyle: 'bold',
//             color: '#ffffff',
//             align: 'center'
//         });
//         this.introtxt.setOrigin(0.5);

//         this.sfx = {
//             btnOver: this.sound.add("sndBtnOver"),
//             btnDown: this.sound.add("sndBtnDown")
//         };

//         //Create play button
//         this.btnPlay = this.add.sprite(
//             this.game.config.width * 0.5,
//             this.game.config.height * 0.5,
//             "sprBtn"
//         );
//         this.btnPlay.setInteractive();
//         this.btnPlay.on("pointerover", function () {
//             this.btnPlay.setTexture("sprBtnHover");
//             this.sfx.btnOver.play();
//         }, this);
//         this.btnPlay.on("pointerout", function () {
//             this.setTexture("sprBtn");
//         });
//         this.btnPlay.on("pointerdown", function () {
//             this.btnPlay.setTexture("sprBtnPressed");
//             this.sfx.btnDown.play();
//         }, this);
//         this.btnPlay.on("pointerup", function () {
//             this.btnPlay.setTexture("sprBtn");
//             this.scene.start("SceneMain");
//         }, this);
//         this.title = this.add.text(this.game.config.width * 0.5, 320, "PLAY", {
//             fontFamily: 'monospace',
//             fontSize: 32,
//             fontStyle: 'bold',
//             color: '#FFFFFF',
//             align: 'center'
//         });
//         this.title.setOrigin(0.5);

//         //Create menu button
//         this.btnMenu = this.add.sprite(
//             this.game.config.width * 0.5,
//             this.game.config.height * 0.6,
//             "sprBtn"
//         );
//         this.btnMenu.setInteractive();
//         this.btnMenu.on("pointerover", function () {
//             this.btnMenu.setTexture("sprBtnHover");
//             this.sfx.btnOver.play();
//         }, this);
//         this.btnMenu.on("pointerout", function () {
//             this.setTexture("sprBtn");
//         });
//         this.btnMenu.on("pointerdown", function () {
//             this.btnMenu.setTexture("sprBtnPressed");
//             this.sfx.btnDown.play();
//         }, this);
//         this.btnMenu.on("pointerup", function () {
//             this.btnMenu.setTexture("sprBtn");
//             this.scene.start("SceneMainMenu");
//         }, this);
//         this.title = this.add.text(this.game.config.width * 0.5, 384, "MENU", {
//             fontFamily: 'monospace',
//             fontSize: 32,
//             fontStyle: 'bold',
//             color: '#FFFFFF',
//             align: 'center'
//         });
//         this.title.setOrigin(0.5);

//         //Create spacecaptain
//         this.spaceCaptain = this.add.image(410, 300, "spaceCaptain");

//         //Create background
//         this.backgrounds = [];
//         var bg = new ScrollingBackground(this, "nebulaStoryBg", 50);
//         this.backgrounds.push(bg);
//     }

//     update() {
//         for (var i = 0; i < this.backgrounds.length; i++) {
//             this.backgrounds[i].update();
//         }
//     }
// }



class SceneStory extends Phaser.Scene {
    constructor() {
        super({ key: "SceneStory" });
    }
    create() {
        //add titletext
        this.title = this.add.text(this.game.config.width * 0.5, 128, "IT'S WAR NOW", {
            fontFamily: 'monospace',
            fontSize: 48,
            fontStyle: 'bold',
            color: '#ffffff',
            align: 'center'
        });
        this.title.setOrigin(0.5);

        //add storyrtexts
        this.introtxt = this.add.text(this.game.config.width * 0.5, this.game.config.height * 0.3, "The enemy is coming... Go kick some ass, son!", {
            fontFamily: 'monospace',
            fontSize: 15,
            fontStyle: 'bold',
            color: '#ffffff',
            align: 'center'
        });
        this.introtxt.setOrigin(0.5);

        //add button sounds
        this.sfx = {
            btnOver: this.sound.add("sndBtnOver"),
            btnDown: this.sound.add("sndBtnDown")
        };

        //Create play button
        this.btnPlay = this.add.sprite(
            this.game.config.width * 0.5,
            this.game.config.height * 0.7,
            "sprBtn"
        );
        this.btnPlay.setInteractive();
        this.btnPlay.on("pointerover", function () {
            this.btnPlay.setTexture("sprBtnHover");
            this.sfx.btnOver.play();
        }, this);
        this.btnPlay.on("pointerout", function () {
            this.setTexture("sprBtn");
        });
        this.btnPlay.on("pointerdown", function () {
            this.btnPlay.setTexture("sprBtnPressed");
            this.sfx.btnDown.play();
        }, this);
        this.btnPlay.on("pointerup", function () {
            this.btnPlay.setTexture("sprBtn");
            this.scene.start("SceneMain");
        }, this);
        this.title = this.add.text(this.game.config.width * 0.5, this.game.config.height * 0.7, "PLAY", {
            fontFamily: 'monospace',
            fontSize: 32,
            fontStyle: 'bold',
            color: '#FFFFFF',
            align: 'center'
        });
        this.title.setOrigin(0.5);

        //Create menu button
        this.btnMenu = this.add.sprite(
            this.game.config.width * 0.5,
            this.game.config.height * 0.8,
            "sprBtn"
        );
        this.btnMenu.setInteractive();
        this.btnMenu.on("pointerover", function () {
            this.btnMenu.setTexture("sprBtnHover");
            this.sfx.btnOver.play();
        }, this);
        this.btnMenu.on("pointerout", function () {
            this.setTexture("sprBtn");
        });
        this.btnMenu.on("pointerdown", function () {
            this.btnMenu.setTexture("sprBtnPressed");
            this.sfx.btnDown.play();
        }, this);
        this.btnMenu.on("pointerup", function () {
            this.btnMenu.setTexture("sprBtn");
            this.scene.start("SceneMainMenu");
        }, this);
        this.title = this.add.text(this.game.config.width * 0.5, this.game.config.height * 0.8, "MENU", {
            fontFamily: 'monospace',
            fontSize: 32,
            fontStyle: 'bold',
            color: '#FFFFFF',
            align: 'center'
        });
        this.title.setOrigin(0.5);

        //Create spacecaptain
        this.spaceCaptain = this.add.image(this.game.config.width * 0.5, this.game.config.height * 0.5, "spaceCaptain");

        //create backgrounds
        this.backgrounds = [];
        for (var i = 0; i <= 1; i++) {
            var keys = ["nebulaStoryBg", "stars1Bg"];
            var key = keys[i];
            var bg = new ScrollingBackground(this, key, Phaser.Math.Between(50, 100));
            this.backgrounds.push(bg);
        }
    }

    //update backgrounds
    update() {
        for (var i = 0; i < this.backgrounds.length; i++) {
            this.backgrounds[i].update();
        }
    }
}