class SceneGameOver extends Phaser.Scene {
    constructor() {
        super({ key: "SceneGameOver" });
    }
    create() {
        //Create title and scoretexts
        this.title = this.add.text(this.game.config.width * 0.5, 128, "GAME OVER", {
            fontFamily: 'monospace',
            fontSize: 48,
            fontStyle: 'bold',
            color: '#ffffff',
            align: 'center'
        });
        this.title.setOrigin(0.5);

        this.finalScore = this.add.text(this.game.config.width * 0.5, 200, "SCORE:" + score);
        this.finalScore.setOrigin(0.5);

        this.sfx = {
            btnOver: this.sound.add("sndBtnOver"),
            btnDown: this.sound.add("sndBtnDown")
        };

        //Create restart button
        this.btnPlay = this.add.sprite(
            this.game.config.width * 0.5,
            this.game.config.height * 0.5,
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
        this.title = this.add.text(this.game.config.width * 0.5, 320, "RESTART", {
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
            this.game.config.height * 0.6,
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
        this.title = this.add.text(this.game.config.width * 0.5, 384, "MENU", {
            fontFamily: 'monospace',
            fontSize: 32,
            fontStyle: 'bold',
            color: '#FFFFFF',
            align: 'center'
        });
        this.title.setOrigin(0.5);

        //Create background
        this.backgrounds = [];
        var bg = new ScrollingBackground(this, "nebulaGameOverBg", 50);
        this.backgrounds.push(bg);
    }

    update() {
        for (var i = 0; i < this.backgrounds.length; i++) {
            this.backgrounds[i].update();
        }
    }
}