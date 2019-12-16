class SceneMainMenu extends Phaser.Scene {
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
        
        //load game assets
        this.load.image("stars1Bg", "content/backgrounds/Stars1.png");
        this.load.image("stars2Bg", "content/backgrounds/Stars2.png");
        this.load.image("nebulaMainMenuBg", "content/backgrounds/nebulaMainMenuBg.png");
        this.load.image("nebulaStoryBg", "content/backgrounds/nebulaStoryBg.png");
        this.load.image("spaceCaptain", "content/spaceCaptain.png");
        this.load.image("sprBtn", "content/buttons/sprbutton.png");
        this.load.image("sprBtnHover", "content/buttons/sprbuttonhover.png");
        this.load.image("sprBtnPressed", "content/buttons/sprbuttonpressed.png");
        this.load.audio("sndBtnOver", "content/audio/zapsplat_multimedia_click_001_19367.mp3");
        this.load.audio("sndBtnDown", "content/audio/zapsplat_science_fiction_spaceship_or_rocket_fly_by_ultra_fast_002_40394.mp3");
    }

    create() {
        this.sfx = {
            btnOver: this.sound.add("sndBtnOver"),
            btnDown: this.sound.add("sndBtnDown")
        };
        
        //Create Play button
        this.btnPlay = this.add.sprite(
            this.game.config.width * 0.5,
            this.game.config.height * 0.5,
            "sprBtn"
        );
        this.btnPlay.setInteractive();
        this.btnPlay.on("pointerover", function () {
            this.btnPlay.setTexture("sprBtnHover"); // set the button texture to sprBtnPlayHover
            this.sfx.btnOver.play(); // play the button over sound
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

        this.title = this.add.text(this.game.config.width * 0.5, 320, "PLAY", {
            fontFamily: 'monospace',
            fontSize: 32,
            fontStyle: 'bold',
            color: '#FFFFFF',
            align: 'center'
        });
        this.title.setOrigin(0.5);

        //Create Story button
        this.btnStory = this.add.sprite(
            this.game.config.width * 0.5,
            this.game.config.height * 0.6,
            "sprBtn"
        ); 
        this.btnStory.setInteractive();
        this.btnStory.on("pointerover", function () {
            this.btnStory.setTexture("sprBtnHover");
            this.sfx.btnOver.play();
        }, this);
        this.btnStory.on("pointerout", function () {
            this.setTexture("sprBtn");
        });
        this.btnStory.on("pointerdown", function () {
            this.btnStory.setTexture("sprBtnPressed");
            this.sfx.btnDown.play();
        }, this);
        this.btnStory.on("pointerup", function () {
            this.btnStory.setTexture("sprBtn");
            this.scene.start("SceneStory");
        }, this);
        this.title = this.add.text(this.game.config.width * 0.5, 384, "STORY", {
            fontFamily: 'monospace',
            fontSize: 32,
            fontStyle: 'bold',
            color: '#FFFFFF',
            align: 'center'
        });
        this.title.setOrigin(0.5);

        //Create game title
        this.title = this.add.text(this.game.config.width * 0.5, 128, "AVARUUSAMPUJA", {
            fontFamily: 'monospace',
            fontSize: 45,
            fontStyle: 'bold',
            color: '#ffffff',
            align: 'center'
        });
        this.title.setOrigin(0.5);

        //Create backgrounds
        this.backgrounds = [];
        for (var i = 0; i < 3; i++) {
            var keys = ["nebulaMainMenuBg", "stars1Bg", "stars2Bg"];
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