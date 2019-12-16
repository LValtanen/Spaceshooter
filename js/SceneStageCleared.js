class SceneStageCleared extends Phaser.Scene {
    constructor() {
        super({ key: "SceneStageCleared" });
    }
    create() {
        this.title = this.add.text(this.game.config.width * 0.5, 128, "STAGE CLEARED", {
            fontFamily: 'monospace',
            fontSize: 48,
            fontStyle: 'bold',
            color: '#ffffff',
            align: 'center'
        });
        this.title.setOrigin(0.5);

        var player = new Player(this);

        this.finalScore = this.add.text(this.game.config.width * 0.5, 200, "SCORE:" + score);
        this.finalScore.setOrigin(0.5);

        this.sfx = {
            btnOver: this.sound.add("sndBtnOver"),
            btnDown: this.sound.add("sndBtnDown")
        };

        this.btnRestart = this.add.sprite(
            this.game.config.width * 0.5,
            this.game.config.height * 0.5,
            "sprBtnRestart"
        );
        this.btnRestart.setInteractive();
        this.btnRestart.on("pointerover", function () {
            this.btnRestart.setTexture("sprBtnRestartHover"); // set the button texture to sprBtnPlayHover
            this.sfx.btnOver.play(); // play the button over sound
        }, this);
        this.btnRestart.on("pointerout", function () {
            this.setTexture("sprBtnRestart");
        });
        this.btnRestart.on("pointerdown", function () {
            this.btnRestart.setTexture("sprBtnRestartDown");
            this.sfx.btnDown.play();
        }, this);
        this.btnRestart.on("pointerup", function () {
            this.btnRestart.setTexture("sprBtnRestart");
            this.scene.start("SceneMain");
        }, this);

        this.btnMenu = this.add.sprite(
            this.game.config.width * 0.5,
            this.game.config.height * 0.6,
            "sprBtnMenu"
        );
        this.btnMenu.setInteractive();
        this.btnMenu.on("pointerover", function () {
            this.btnMenu.setTexture("sprBtnMenuHover");
            this.sfx.btnOver.play();
        }, this);
        this.btnMenu.on("pointerout", function () {
            this.setTexture("sprBtnMenu");
        });
        this.btnMenu.on("pointerup", function () {
            this.btnMenu.setTexture("sprBtnMenu");
            this.scene.start("SceneMainMenu");
        }, this);

        this.backgrounds = [];
        var bg = new ScrollingBackground(this, "nebulaStageClearedBg", 50);
        this.backgrounds.push(bg);
    }
    update() {
        for (var i = 0; i < this.backgrounds.length; i++) {
            this.backgrounds[i].update();
        }
    }
}