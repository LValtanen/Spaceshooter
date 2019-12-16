class SceneIntro extends Phaser.Scene {
    constructor() {
        super({ key: "SceneIntro" });
    }
    create() {
        this.title = this.add.text(this.game.config.width * 0.5, 128, "IT'S WAR NOW", {
            fontFamily: 'monospace',
            fontSize: 48,
            fontStyle: 'bold',
            color: '#ffffff',
            align: 'center'
        });
        this.title.setOrigin(0.5);

        this.introtxt = this.add.text(this.game.config.width * 0.5, 200, "The enemy is comig...Go kick some ass, son!", {
            fontFamily: 'monospace',
            fontSize: 15,
            fontStyle: 'bold',
            color: '#ffffff',
            align: 'center'
        });
        this.introtxt.setOrigin(0.5);

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
            this.btnPlay.setTexture("sprBtnPlayHover");
            this.sfx.btnOver.play();
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

        this.spaceCaptain = this.add.image(410, 300, "spaceCaptain");
    }
}