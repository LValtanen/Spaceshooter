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
        this.load.image("starsBg", "assets/content/backgrounds/stars.png");
        this.load.image("nebulaStage1Bg", "assets/content/backgrounds/nebulaStage1Bg.png");
        this.load.image("nebulaGameOverBg", "assets/content/backgrounds/nebulaGameOverBg.png");
        this.load.image("nebulaStageClearedBg", "assets/content/backgrounds/nebulaStageClearedBg.png");
        this.load.image("stars1Bg", "assets/content/backgrounds/Stars1.png");
        this.load.image("stars2Bg", "assets/content/backgrounds/Stars2.png");
        this.load.image("nebulaMainMenuBg", "assets/content/backgrounds/nebulaMainMenuBg.png");
        this.load.image("nebulaStoryBg", "assets/content/backgrounds/nebulaStoryBg.png");

        //ships
        this.load.image("playerShip", "assets/content/characters/playerShip.png");
        this.load.image("playerShipMenu", "assets/content/characters/playerShipMenu.png");
        this.load.image("enemyShip1", "assets/content/characters/enemyShip1.png");
        this.load.image("enemyShip2", "assets/content/characters/enemyShip2.png");
        this.load.image("enemyShip3", "assets/content/characters/enemyShip3.png");
        this.load.image("enemyTank1", "assets/content/characters/enemyTank1.png");
        this.load.image("enemyEnergy1", "assets/content/characters/enemyEnergy1.png");
        this.load.image("enemyBossShip1", "assets/content/characters/enemyBossShip1.png");

        //effects
        this.load.image('fire', 'assets/content/characters/firetrail.png');
        this.load.spritesheet("sprExplosion", "assets/content/characters/explosion-1.png", {
            frameWidth: 32,
            frameHeight: 32
        });
        this.load.spritesheet("sprBossExplosion", "assets/content/characters/explosion-2.png", {
            frameWidth: 100,
            frameHeight: 100
        });
        this.load.image("laserRed", "assets/content/characters/laserRed.png");
        this.load.image("laserYellow", "assets/content/characters/laserYellow.png");
        this.load.image("laserBlue", "assets/content/characters/laserBlue.png");

        this.load.image("shield", "assets/content/characters/shieldPack.png");
        this.load.image("ammo", "assets/content/characters/ammoPack.png");

        // story
        this.load.image("spaceCaptain", "assets/content/characters/spaceCaptainBorders.png");

        //buttons
        this.load.image("sprBtn", "assets/content/buttons/sprbutton.png");
        this.load.image("sprBtnHover", "assets/content/buttons/sprbuttonhover.png");
        this.load.image("sprBtnPressed", "assets/content/buttons/sprbuttonpressed.png");

        //audio
        this.load.audio("sndExplode1", "assets/content/audio/sndExplode1.mp3");
        this.load.audio("sndExplode2", "assets/content/audio/sndExplode2.mp3");
        this.load.audio("sndLaser", "assets/content/audio/sndLaser.mp3");
        this.load.audio("sndLaserDamage", "assets/content/audio/sndLaserDamage.mp3");
        this.load.audio("sndBtnOver", "assets/content/audio/sndBtnOver.mp3");
        this.load.audio("sndBtnDown", "assets/content/audio/sndBtnDown.mp3");
        this.load.audio("sndPickLoot", "assets/content/audio/sndPickLoot.mp3");
        this.load.audio("sndGameOver", "assets/content/audio/sndgameOver.mp3");

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

        //Create playership
        this.playerShip = this.add.image(this.game.config.width * 0.5, this.game.config.height * 0.45, "playerShipMenu");
        this.playerShip.setScale(1, 1)

        //Create backgrounds
        this.backgrounds = [];
        for (var i = 0; i <= 1; i++) {
            var keys = ["nebulaMainMenuBg", "stars1Bg"];
            var key = keys[i];
            var bg = new ScrollingBackground(this, key, Phaser.Math.Between(50, 100));
            this.backgrounds.push(bg);
        }
    }

    update() {
        for (var i = 0; i < this.backgrounds.length; i++) {
            this.backgrounds[i].update();
        }
    }
}