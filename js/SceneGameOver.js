class SceneGameOver extends Phaser.Scene {
    constructor() {
        super({ key: "SceneGameOver" });
    }
    create() {


        //add titletext
        this.title = this.add.text(this.game.config.width * 0.5, this.game.config.height * 0.2, "GAME OVER", {

            fontFamily: 'monospace',
            fontSize: 48,
            fontStyle: 'bold',
            color: '#ffffff',
            align: 'center'
        });
        this.title.setOrigin(0.5);

        //add scoretext
        this.finalScore = this.add.text(this.game.config.width * 0.5, this.game.config.height * 0.28, "YOUR SCORE - " + score, {
            fontFamily: 'monospace',
            fontSize: 22,
            fontStyle: 'bold',
            color: '#FFFFFF',
            align: 'center'
        });

        this.finalScore.setOrigin(0.5);

        //add scoretext
        this.Highscore = this.add.text(this.game.config.width * 0.5, this.game.config.height * 0.35, "HALL OF FAME", {
            fontFamily: 'monospace',
            fontSize: 32,
            fontStyle: 'bold',
            color: '#FFFFFF',
            align: 'center'
        });
        this.Highscore.setOrigin(0.5);

        //add scoretext
        allScores.sort(function (a, b) { return b.score - a.score });
        for (i = 0; i < allScores.length && i < 5; i++) {
            this.highScoreList = this.add.text(this.game.config.width * 0.5, this.game.config.height * 0.4 + (i * 20),
                allScores[i].name + ' - ' + allScores[i].score, {
                fontFamily: 'monospace',
                fontSize: 22,
                fontStyle: 'bold',
                color: '#FFFFFF',
                align: 'center'
            });
            this.highScoreList.setOrigin(0.5);
        }
        //add button sounds
        this.sfx = {
            btnOver: this.sound.add("sndBtnOver"),
            btnDown: this.sound.add("sndBtnDown")
        };

        //Create restart button
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

        this.restart = this.add.text(this.game.config.width * 0.5, this.game.config.height * 0.7, "RESTART", {
            fontFamily: 'monospace',
            fontSize: 32,
            fontStyle: 'bold',
            color: '#FFFFFF',
            align: 'center'
        });
        this.restart.setOrigin(0.5);

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
        this.menu = this.add.text(this.game.config.width * 0.5, this.game.config.height * 0.8, "MENU", {
            fontFamily: 'monospace',
            fontSize: 32,
            fontStyle: 'bold',
            color: '#FFFFFF',
            align: 'center'
        });
        this.menu.setOrigin(0.5);

        //create backgrounds
        this.backgrounds = [];
        for (var i = 0; i <= 1; i++) {
            var keys = ["nebulaGameOverBg", "stars1Bg"];
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