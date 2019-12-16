// Extending Phaser.Scene means to build on top of Phaser’s Scene class
class SceneMainMenu extends Phaser.Scene {
    // constructor is called immediately when instantiating (creating an instance) the class
    constructor() {
        super({ key: "SceneMainMenu" });
    }

    preload() {
        //load joystick plugin if not already loaded
        if (!this.plugins.plugins[0]) {
            var key = 'rexvirtualjoystickplugin';
            var url = 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/plugins/dist/rexvirtualjoystickplugin.min.js';
            this.load.plugin(key, url, true);
        }
        
        this.load.image("stars1Bg", "content/backgrounds/Stars1.png");
        this.load.image("stars2Bg", "content/backgrounds/Stars2.png");
        this.load.image("nebula10Bg", "content/backgrounds/nebula10.png");
        this.load.image("spaceCaptain", "content/spaceCaptain.png");
        this.load.image("sprBtnMenu", "content/buttons/sprBtnMenu.png");
        this.load.image("sprBtnMenuHover", "content/buttons/sprBtnMenuHover.png");
        this.load.image("sprBtnStory", "content/buttons/sprBtnStory.png");
        this.load.image("sprBtnStoryHover", "content/buttons/sprBtnStoryHover.png");
        this.load.image("sprBtnPlay", "content/buttons/sprBtnPlay.png");
        this.load.image("sprBtnPlayHover", "content/buttons/sprBtnPlayHover.png");
        this.load.image("sprBtnPlayDown", "content/buttons/sprBtnPlayDown.png");
        this.load.image("sprBtnRestart", "content/buttons/sprBtnRestart.png");
        this.load.image("sprBtnRestartHover", "content/buttons/sprBtnRestartHover.png");
        this.load.image("sprBtnRestartDown", "content/buttons/sprBtnRestartDown.png");
        this.load.audio("sndBtnOver", "content/audio/zapsplat_multimedia_click_001_19367.mp3");
        this.load.audio("sndBtnDown", "content/audio/zapsplat_science_fiction_spaceship_or_rocket_fly_by_ultra_fast_002_40394.mp3");
    }

    create() {
        this.sfx = {
            btnOver: this.sound.add("sndBtnOver"),
            btnDown: this.sound.add("sndBtnDown")
        };

        this.btnPlay = this.add.sprite(
            this.game.config.width * 0.5,
            this.game.config.height * 0.5,
            "sprBtnPlay"
        );
        this.btnPlay.setInteractive();
        this.btnPlay.on("pointerover", function () {
            this.btnPlay.setTexture("sprBtnPlayHover"); // set the button texture to sprBtnPlayHover
            this.sfx.btnOver.play(); // play the button over sound
        }, this);
        this.btnPlay.on("pointerout", function () {
            this.setTexture("sprBtnPlay");
        });
        this.btnPlay.on("pointerdown", function () {
            this.btnPlay.setTexture("sprBtnPlayDown");
            this.sfx.btnDown.play();
        }, this);
        this.btnPlay.on("pointerup", function () {
            this.btnPlay.setTexture("sprBtnPlay");
            this.scene.start("SceneMain");
        }, this);

        this.btnStory = this.add.sprite(
            this.game.config.width * 0.5,
            this.game.config.height * 0.6,
            "sprBtnStory"
        ); 
        this.btnStory.setInteractive();
        this.btnStory.on("pointerover", function () {
            this.btnStory.setTexture("sprBtnStoryHover");
            this.sfx.btnOver.play();
        }, this);
        this.btnStory.on("pointerout", function () {
            this.setTexture("sprBtnStory");
        });
        this.btnStory.on("pointerup", function () {
            this.btnStory.setTexture("sprBtnStory");
            this.scene.start("SceneIntro");
        }, this);

        this.title = this.add.text(this.game.config.width * 0.5, 128, "AVARUUSAMPUJA", {
            fontFamily: 'monospace',
            fontSize: 45,
            fontStyle: 'bold',
            color: '#ffffff',
            align: 'center'
        });
        this.title.setOrigin(0.5);

        this.backgrounds = [];
        for (var i = 0; i < 3; i++) {
            var keys = ["nebula10Bg", "stars1Bg", "stars2Bg"];
            var key = keys[i];
            var bg = new ScrollingBackground(this, key, i+2 * 15);
            this.backgrounds.push(bg);
        }
    }

    update() {
        for (var i = 0; i < this.backgrounds.length; i++) {
            this.backgrounds[i].update();
        }
    }
}