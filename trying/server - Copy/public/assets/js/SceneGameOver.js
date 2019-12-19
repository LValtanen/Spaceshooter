class SceneGameOver extends Phaser.Scene {
    constructor() {
        super({ key: "SceneGameOver" });
    }

    create() {

        //Create title and scoretexts

        this.titleGlobal = this.add.text(this.game.config.width * 0.5, 178, "GLOBAL HIGHSCORES", {
            fontFamily: 'monospace',
            fontSize: 30,
            fontStyle: 'bold',
            color: '#ffffff',
            align: 'center'
        });
        this.titleGlobal.setOrigin(0.5);


        this.title = this.add.text(this.game.config.width * 0.5, 110, "GAME OVER", {
            fontFamily: 'monospace',
            fontSize: 48,
            fontStyle: 'bold',
            color: '#ffffff',
            align: 'center'
        });
        this.title.setOrigin(0.5);

        this.title = this.add.text(this.game.config.width * 0.5, 230, '1. ' + allData[0].name + ' - ' + allData[0].highScore, {
            fontFamily: 'monospace',
            fontSize: 20,
            fontStyle: 'bold',
            color: '#ffffff',
            align: 'center'
        });
        this.title.setOrigin(0.5);

        this.title2 = this.add.text(this.game.config.width * 0.5, 245, '2. ' + allData[1].name + ' - ' + allData[1].highScore, {
            fontFamily: 'monospace',
            fontSize: 20,
            fontStyle: 'bold',
            color: '#ffffff',
            align: 'center'
        });
        this.title2.setOrigin(0.5);

        this.title3 = this.add.text(this.game.config.width * 0.5, 260, '3. ' + allData[2].name + ' - ' + allData[2].highScore, {
            fontFamily: 'monospace',
            fontSize: 20,
            fontStyle: 'bold',
            color: '#ffffff',
            align: 'center'
        });
        this.title3.setOrigin(0.5);

        this.title4 = this.add.text(this.game.config.width * 0.5, 275, '4. ' + allData[3].name + ' - ' + allData[3].highScore, {
            fontFamily: 'monospace',
            fontSize: 20,
            fontStyle: 'bold',
            color: '#ffffff',
            align: 'center'
        });
        this.title4.setOrigin(0.5);

        this.title5 = this.add.text(this.game.config.width * 0.5, 290, '5. ' + allData[4].name + ' - ' + allData[4].highScore, {
            fontFamily: 'monospace',
            fontSize: 20,
            fontStyle: 'bold',
            color: '#ffffff',
            align: 'center'
        });
        this.title5.setOrigin(0.5);
        

        this.finalScore = this.add.text(this.game.config.width * 0.5, 350, "YOUR SCORE:" + score);
        this.finalScore.setOrigin(0.5);

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
        this.title = this.add.text(this.game.config.width * 0.5, this.game.config.height * 0.7, "RESTART", {
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