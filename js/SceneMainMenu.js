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

        //backgrounds
        this.load.image("starsBg", "content/backgrounds/stars.png");
        this.load.image("nebulaStage1Bg", "content/backgrounds/nebulaStage1Bg.png");
        this.load.image("nebulaGameOverBg", "content/backgrounds/nebulaGameOverBg.png");
        this.load.image("nebulaStageClearedBg", "content/backgrounds/nebulaStageClearedBg.png");
        this.load.image("stars1Bg", "content/backgrounds/Stars1.png");
        this.load.image("stars2Bg", "content/backgrounds/Stars2.png");
        this.load.image("nebulaMainMenuBg", "content/backgrounds/nebulaMainMenuBg.png");
        this.load.image("nebulaStoryBg", "content/backgrounds/nebulaStoryBg.png");

        //ships
        this.load.image("playerShip", "content/playerShip.png");
        this.load.image("enemyShip1", "content/enemyShip1.png");
        this.load.image("enemyShip2", "content/enemyShip2.png");
        this.load.image("enemyShip3", "content/enemyShip3.png");
        this.load.image("enemyTank1", "content/enemyTank1.png");
        this.load.image("enemyEnergy1", "content/enemyEnergy1.png");
        this.load.image("enemyBossShip1", "content/enemyBossShip1.png");

        //effects
        this.load.spritesheet("sprExplosion", "content/explosion-1.png", {
            frameWidth: 32,
            frameHeight: 32
        });
        this.load.spritesheet("sprBossExplosion", "content/explosion-2.png", {
            frameWidth: 100,
            frameHeight: 100
        });
        this.load.image("laserRed", "content/laserRed.png");
        this.load.image("laserYellow", "content/laserYellow.png");
        this.load.image("laserBlue", "content/laserBlue.png");

        // story
        this.load.image("spaceCaptain", "content/spaceCaptainBorders.png");

        //buttons
        this.load.image("sprBtn", "content/buttons/sprbutton.png");
        this.load.image("sprBtnHover", "content/buttons/sprbuttonhover.png");
        this.load.image("sprBtnPressed", "content/buttons/sprbuttonpressed.png");

        //audio
        this.load.audio("sndExplode1", "content/audio/glitchedtones_Machine Glitch 01.mp3");
        this.load.audio("sndExplode2", "content/audio/glitchedtones_Machine Glitch 02.mp3");
        this.load.audio("sndLaser", "content/audio/PM_FSSF2_WEAPONS_H2_SHOT_324.mp3");
        this.load.audio("sndLaserDamage", "content/audio/glitchedtones_Laser Blast Hard.mp3");
        this.load.audio("sndBtnOver", "content/audio/zapsplat_multimedia_click_001_19367.mp3");
        this.load.audio("sndBtnDown", "content/audio/zapsplat_science_fiction_spaceship_or_rocket_fly_by_ultra_fast_002_40394.mp3");
    }

    create() {
        //button sounds
        this.sfx = {
            btnOver: this.sound.add("sndBtnOver"),
            btnDown: this.sound.add("sndBtnDown")
        };

        //Create Play button
        this.btnPlay = this.add.sprite(
            this.game.config.width * 0.5,
            this.game.config.height * 0.7,
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

        this.title = this.add.text(this.game.config.width * 0.5, this.game.config.height * 0.7, "PLAY", {
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
            this.game.config.height * 0.8,
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
        this.title = this.add.text(this.game.config.width * 0.5, this.game.config.height * 0.8, "STORY", {
            fontFamily: 'monospace',
            fontSize: 32,
            fontStyle: 'bold',
            color: '#FFFFFF',
            align: 'center'
        });
        this.title.setOrigin(0.5);

        //Create game title
        this.title = this.add.text(this.game.config.width * 0.5, this.game.config.height * 0.2, "BLARGON 7", {
            fontFamily: 'monospace',
            fontSize: 45,
            fontStyle: 'bold',
            color: '#ffffff',
            align: 'center'
        });
        this.title.setOrigin(0.5);

        //Create spacecaptain
        this.playerShip = this.add.image(this.game.config.width * 0.5, this.game.config.height * 0.45, "playerShip");
        this.playerShip.setScale(4, 4)

        //Create backgrounds
        this.backgrounds = [];
        for (var i = 0; i < 3; i++) {
            var keys = ["nebulaMainMenuBg", "stars1Bg", "stars2Bg"];
            var key = keys[i];
            var bg = new ScrollingBackground(this, key, i + 2 * 15);
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