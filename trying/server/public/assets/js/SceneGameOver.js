class SceneGameOver extends Phaser.Scene {
    constructor() {
        super({ key: "SceneGameOver" });
    }
    create() {
        console.log(score + 'endgamescreenscore');
        var userEmail = sessionStorage.getItem("user")
        var allUsersData = allData;

        function isCurrentUser(data) {
            return data.email === userEmail
        } 

        let tämä = allUsersData.find(isCurrentUser)
        console.log(tämä.email + tämä.highScore + ' tämä');
        console.log(allData[0].email);

        if (score > tämä.highScore){
            var user = sessionStorage.getItem("user");
            var points = score;
            fetch('/submit-score', {
                method: 'post',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: user, score: points })
            }).then(res => res.json())
                .then(res => console.log(res));
        }



        // var user = sessionStorage.getItem("user");
        // var points = score;
        // fetch('/submit-score', {
        //     method: 'post',
        //     headers: {
        //         'Accept': 'application/json, text/plain, */*',
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({ email: user, score: points })
        // }).then(res => res.json())
        //     .then(res => console.log(res));




            // sessionStorage.setItem('player', player);

        // fetch('/scores', {
        //     method: 'GET',
        //     headers: 
        //         'Accept': 'application/json, text/plain, */*',
        //         'Content-Type': 'application/json'
        //     },
        // }).then(data => data.json())
        //     .then(data => console.log(data));

        //Create title and scoretexts
        this.title = this.add.text(this.game.config.width * 0.5, 128, "GAME OVER", {
            fontFamily: 'monospace',
            fontSize: 48,
            fontStyle: 'bold',
            color: '#ffffff',
            align: 'center'
        });
        this.title.setOrigin(0.5);

        this.title = this.add.text(this.game.config.width * 0.5, 215, 'NIMI: ' + allData[0].name + '     SCORE: ' + allData[0].highScore, {
            fontFamily: 'monospace',
            fontSize: 10,
            fontStyle: 'bold',
            color: '#ffffff',
            align: 'center'
        });
        this.title.setOrigin(0.5);

        this.title2 = this.add.text(this.game.config.width * 0.5, 230, 'NIMI: ' + allData[1].name + '     SCORE: ' + allData[1].highScore, {
            fontFamily: 'monospace',
            fontSize: 10,
            fontStyle: 'bold',
            color: '#ffffff',
            align: 'center'
        });
        this.title2.setOrigin(0.5);

        this.title3 = this.add.text(this.game.config.width * 0.5, 245, 'NIMI: ' + allData[2].name + '     SCORE: ' + allData[2].highScore, {
            fontFamily: 'monospace',
            fontSize: 10,
            fontStyle: 'bold',
            color: '#ffffff',
            align: 'center'
        });
        this.title3.setOrigin(0.5);

        this.title4 = this.add.text(this.game.config.width * 0.5, 260, 'NIMI: ' + allData[3].name + '     SCORE: ' + allData[3].highScore, {
            fontFamily: 'monospace',
            fontSize: 10,
            fontStyle: 'bold',
            color: '#ffffff',
            align: 'center'
        });
        this.title4.setOrigin(0.5);

        this.title5 = this.add.text(this.game.config.width * 0.5, 275, 'NIMI: ' + allData[4].name + '     SCORE: ' + allData[4].highScore, {
            fontFamily: 'monospace',
            fontSize: 10,
            fontStyle: 'bold',
            color: '#ffffff',
            align: 'center'
        });
        this.title5.setOrigin(0.5);
        

        this.finalScore = this.add.text(this.game.config.width * 0.5, 160, "YOUR SCORE:" + score);
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