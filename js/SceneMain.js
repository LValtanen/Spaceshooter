class SceneMain extends Phaser.Scene {
    constructor() {
        super({ key: "SceneMain" });
    }

    create() {
        //reset values at game start
        timer = 500;
        launched = true;
        score = 0;
        bosslaunched = true;

        //create joystick plugin
        this.joyStick = this.plugins.get('rexvirtualjoystickplugin').add(this, {
            key: "shit",
            x: 80,
            y: 560,
            radius: 50,
            base: this.add.graphics().fillStyle(0x888888).fillCircle(0, 0, 50).setAlpha(0.3),
            thumb: this.add.graphics().fillStyle(0xcccccc).fillCircle(0, 0, 25).setAlpha(0.4),
            dir: '8dir',   // 'up&down'|0|'left&right'|1|'4dir'|2|'8dir'|3
            // forceMin: 16,
            enable: true
        }).on('update', this.dumpJoyStickState, this);

        // player hp
        var hp = 3;
        var hpStr = 'SHIELDS: ';
        var hpText = this.add.text(this.game.config.width - 75, 15, hpStr + hp, {
            fontSize: 45,
            fontStyle: 'fill',
            color: '#ffffff',
            align: 'right'
        });

        var bossHp = 100;

        // explosion animations
        this.anims.create({
            key: "sprExplosion",
            frames: this.anims.generateFrameNumbers("sprExplosion"),
            frameRate: 20,
            repeat: 0
        });
        this.anims.create({
            key: "sprBossExplosion",
            frames: this.anims.generateFrameNumbers("sprBossExplosion"),
            frameRate: 20,
            repeat: 3
        });

        // play sound effects from the object with this.sfx.laser.play();
        this.sfx = {
            explosions: [
                this.sound.add("sndExplode1"),
                this.sound.add("sndExplode2")
            ],
            laser: this.sound.add("sndLaser"),
            laserDmg: this.sound.add("sndLaserDamage") //mitenköhän tämän saisi toimimaan... this.sfx.laserDmg.play();
        };

        this.backgrounds = [];
        for (var i = 0; i < 3; i++) {
            var keys = ["nebulaStage1Bg", "stars1Bg", "stars2Bg"];
            var key = keys[i];
            var bg = new ScrollingBackground(this, key, i + 2 * 15);
            this.backgrounds.push(bg);
        }

        //put player on the map
        this.player = new Player(
            this,
            this.game.config.width * 0.5,
            this.game.config.height * 0.8,
            "playerShip"
        );

        var scorePlus = '';
        var scoreStr = 'SCORE: ';
        var scoreText = this.add.text(20, 15, scoreStr + score, {
            fontSize: 45,
            fontStyle: 'fill',
            color: '#ffffff',
            align: 'center'
        });

        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // ENEMY SHIPS & LASERS
        this.enemies = this.add.group();
        this.enemyLasers = this.add.group();
        // this.enemyBalls = this.add.group();

        this.bossShips = this.add.group();
        this.bossLasers = this.add.group();

        this.playerLasers = this.add.group();

        var enemyType = '';

        // vanha BOSS spawn event (VOI POISTAA)
        // this.time.addEvent({
        //     delay: 500,
        //     callback: function () {
        //         var boss = new Stage1Boss(this, this.game.config.width * 0.5, -150);
        //         console.log(boss.body.y);


        //         this.bossShips.add(boss);
        //     },
        //     callbackScope: this,
        //     loop: false
        // });

        // create rotating balls
        // for (var i = 0; i < 60; i++) {
        //     this.enemyBalls.create(Phaser.Math.Between(0, 600), Phaser.Math.Between(0, 500), 'enemyEnergyGroup');
        // }

        // collider between this.player and this.enemyBalls (EI TOIMI )
        // this.physics.add.overlap(this.player, this.enemyBalls, function (player, ball) {
        //     if (!player.getData("isDead") &&
        //         !ball.getData("isDead")) {
        //         player.explode(false);
        //         player.onDestroy();

        //         ball.explode(true);
        //     }
        // });

        // COLLIDERS
        // collider between this.playerLasers and this.enemies
        this.physics.add.collider(this.playerLasers, this.enemies, function (playerLaser, enemy) {
            if (enemy) {
                if (enemy.onDestroy !== undefined) {
                    enemy.onDestroy();
                }

                //  increase the score
                if (enemy.getData("type") == "GunShip") {
                    enemyType = "   Red Shadow";
                    score += 20;
                    scorePlus = enemyType + "   +20";
                    scoreText.text = scoreStr + score + scorePlus;
                }
                else if (enemy.getData("type") == "YellowGunShip") {
                    enemyType = "   Yellow Pain";
                    score += 30;
                    scorePlus = enemyType + "   +30";
                    scoreText.text = scoreStr + score + scorePlus;
                }
                else if (enemy.getData("type") == "EnergyBall") {
                    enemyType = "   Energy Ball";
                    score += 30;
                    scorePlus = enemyType + "   +40";
                    scoreText.text = scoreStr + score + scorePlus;
                }
                else if (enemy.getData("type") == "FastEnemyShip") {
                    enemyType = "   Purple Killer";
                    score += 50;
                    scorePlus = enemyType + "   +50";
                    scoreText.text = scoreStr + score + scorePlus;
                }
                else {
                    enemyType = "   Rusty Tank";
                    score += 10;
                    scorePlus = enemyType + "   +10";
                    scoreText.text = scoreStr + score + scorePlus;
                }

                enemy.explode(true);
                playerLaser.destroy();

            }
        });

        // collider between this.playerLasers and this.bossShips
        this.physics.add.overlap(this.bossShips, this.playerLasers, function (boss, laser) {
            if (!boss.getData("isDead") &&
                !laser.getData("isDead")) {
                if (bossHp == 0) {
                    boss.explode(false);
                    boss.onDestroy();
                    score += 200;
                    // player.onStageCleared();
                    bosslaunched = true;
                    bossHp = 100;
                }
                //  decrease BOSS HP
                if (bossHp > 0) {
                    bossHp -= 1;
                }
                laser.destroy();
                enemyType = "   COMMANDER";
                score += 15;
                scorePlus = enemyType + "   +15";
                scoreText.text = scoreStr + score + scorePlus;
            }
        });

        // collider between this.player and this.enemies
        this.physics.add.overlap(this.player, this.enemies, function (player, enemy) {
            if (!player.getData("isDead") &&
                !enemy.getData("isDead")) {
                player.explode(false);
                player.onDestroy();

                if (hp > 0) {
                    hp -= hp;
                    hpText.text = hpStr + hp;
                }
                enemy.explode(true);
            }
        });

        // collider between this.player and this.bossShips
        this.physics.add.overlap(this.player, this.bossShips, function (player, boss) {
            if (!player.getData("isDead") &&
                !boss.getData("isDead") &&
                boss.getData("type") == "Stage1Boss") {
                player.explode(false);
                player.onDestroy();

                if (hp > 0) {
                    hp -= hp;
                    hpText.text = hpStr + hp;
                }
            }
        });

        // collider between this.player and this.enemyLasers
        this.physics.add.overlap(this.player, this.enemyLasers, function (player, laser) {
            if (!player.getData("isDead") &&
                !laser.getData("isDead")) {
                if (hp == 0) {
                    player.explode(false);
                    player.onDestroy();
                }
                //  decrease HP
                if (hp > 0) {
                    hp -= 1;
                    hpText.text = hpStr + hp;
                }
                laser.destroy();
            }
        });

        // collider between this.player and this.bossLasers
        this.physics.add.overlap(this.player, this.bossLasers, function (player, laser) {
            if (!player.getData("isDead") &&
                !laser.getData("isDead")) {
                if (hp == 0) {
                    player.explode(false);
                    player.onDestroy();
                }
                //  decrease HP
                if (hp > 0) {
                    hp -= 1;
                    hpText.text = hpStr + hp;
                }
                laser.destroy();
            }
        });
    }

    update() {
        //launch enemy
        if (launched === true && bosslaunched === true) {
            this.timerEvent();
            launched = false;
        }

        //launch boss based on score
        if (score > 2000 && score < 2499 && bosslaunched === true) {
            this.bossCreator();
        }
        if (score > 4000 && score < 4499 && bosslaunched === true) {
            this.bossCreator();
        }
        if (score > 6000 && score < 6499 && bosslaunched === true) {
            this.bossCreator();
        }

        //update joystick plugin, set player movement
        var cursorKeys = this.joyStick.createCursorKeys();
        var s = '';
        for (var name in cursorKeys) {
            if (cursorKeys[name].isDown) {
                s += name + '';
            }
        }

        // update player
        if (!this.player.getData("isDead")) {
            this.player.update();
            if (s === 'up' || this.keyW.isDown) {
                this.player.moveUp();
            } else if (s === 'down' || this.keyS.isDown) {
                this.player.moveDown();
            }
            if (s === 'left' || this.keyA.isDown) {
                this.player.moveLeft();
            } else if (s === 'right' || this.keyD.isDown) {
                this.player.moveRight();
            }
            if (s === 'upleft') {
                this.player.moveUp();
                this.player.moveLeft();
            }
            if (s === 'upright') {
                this.player.moveUp();
                this.player.moveRight();
            }
            if (s === 'downleft') {
                this.player.moveDown();
                this.player.moveLeft();
            }
            if (s === 'downright') {
                this.player.moveDown();
                this.player.moveRight();
            }
            if (this.keySpace.isDown) {
                this.player.setData("isShooting", true);
            } else {
                this.player.setData("timerShootTick", this.player.getData("timerShootDelay") - 1);
                this.player.setData("isShooting", false);
            }
        }

        // update boss
        for (var i = 0; i < this.bossShips.getChildren().length; i++) {
            var boss = this.bossShips.getChildren()[i];
            boss.update();
        }


        // rotate energy balls
        // Phaser.Actions.RotateAround(this.enemyBalls.getChildren(), { x: 400, y: 300 }, 0.01);

        // update enemies
        for (var i = 0; i < this.enemies.getChildren().length; i++) {
            var enemy = this.enemies.getChildren()[i];
            enemy.update();
            // remove everything that moves off screen
            if (enemy.x < -enemy.displayWidth ||
                enemy.x > this.game.config.width + enemy.displayWidth ||
                enemy.y < -enemy.displayHeight * 4 ||
                enemy.y > this.game.config.height + enemy.displayHeight) {
                if (enemy) {
                    if (enemy.onDestroy !== undefined) {
                        enemy.onDestroy();
                    }
                    enemy.destroy();
                }
            }
        }

        // update enemy lasers
        for (var i = 0; i < this.enemyLasers.getChildren().length; i++) {
            var laser = this.enemyLasers.getChildren()[i];
            laser.update();
            if (laser.x < -laser.displayWidth ||
                laser.x > this.game.config.width + laser.displayWidth ||
                laser.y < -laser.displayHeight * 4 ||
                laser.y > this.game.config.height + laser.displayHeight) {
                if (laser) {
                    laser.destroy();
                }
            }
        }
        // update boss lasers
        for (var i = 0; i < this.bossLasers.getChildren().length; i++) {
            var laser = this.bossLasers.getChildren()[i];
            laser.update();
            if (laser.x < -laser.displayWidth ||
                laser.x > this.game.config.width + laser.displayWidth ||
                laser.y < -laser.displayHeight * 4 ||
                laser.y > this.game.config.height + laser.displayHeight) {
                if (laser) {
                    laser.destroy();
                }
            }
        }
        // update player lasers
        for (var i = 0; i < this.playerLasers.getChildren().length; i++) {
            var laser = this.playerLasers.getChildren()[i];
            laser.update();
            if (laser.x < -laser.displayWidth ||
                laser.x > this.game.config.width + laser.displayWidth ||
                laser.y < -laser.displayHeight * 4 ||
                laser.y > this.game.config.height + laser.displayHeight) {
                if (laser) {
                    laser.destroy();
                }
            }
        }

        // update backgrounds
        for (var i = 0; i < this.backgrounds.length; i++) {
            this.backgrounds[i].update();
        }
    }

    getEnemiesByType(type) {
        var arr = [];
        for (var i = 0; i < this.enemies.getChildren().length; i++) {
            var enemy = this.enemies.getChildren()[i];
            if (enemy.getData("type") == type) {
                arr.push(enemy);
            }
        }
        return arr;
    }
    //if joystick not pressed, move to zero
    dumpJoyStickState() {
        var cursorKeys = this.joyStick.createCursorKeys();
        var s = 'Key down: ';
        for (var name in cursorKeys) {
            if (cursorKeys[name].isDown) {
                s += name + ' ';
            }
        }
        s += '\n';
        s += ('Force: ' + Math.floor(this.joyStick.force * 100) / 100 + '\n');
        s += ('Angle: ' + Math.floor(this.joyStick.angle * 100) / 100 + '\n');
    }
    //create different enemies
    launchEnemies() {
        var enemy = null;
        var randomizer = Phaser.Math.Between(0, 10);
        if (randomizer >= 7) {
            enemy = new EnemyTank(
                this,
                Phaser.Math.Between(0, this.game.config.width),
                0
            );
        }
        else if (randomizer >= 5) {
            if (this.getEnemiesByType("EnergyBall").length < 5) {
                enemy = new EnergyBall(
                    this,
                    Phaser.Math.Between(0, this.game.config.width),
                    0
                );
            }
        }
        else if (randomizer >= 4) {
            enemy = new GunShip(
                this,
                Phaser.Math.Between(0, this.game.config.width),
                0
            );
        }
        else if (randomizer >= 1) {
            enemy = new YellowGunShip(
                this,
                Phaser.Math.Between(0, this.game.config.width),
                0
            );
        }
        else {
            enemy = new FastEnemyShip(
                this,
                Phaser.Math.Between(0, this.game.config.width),
                0
            );
        }
        if (enemy !== null) {
            enemy.setScale(Phaser.Math.Between(10, 20) * 0.1);
            this.enemies.add(enemy);
        }
    }
    //timer event for spawning enemies
    timerEvent() {
        if (timer > 100) {
            timer -= score / 800;
        } else {
            timer = 100;
        }
        console.log(timer);
        this.time.addEvent({
            delay: timer,
            callback: function () {
                this.launchEnemies();
                launched = true;
            },
            callbackScope: this,
            loop: false
        });
    }

    bossCreator() {
        var boss = new Stage1Boss(this, this.game.config.width * 0.5, -150);
        this.bossShips.add(boss);
        bosslaunched = false;
    }
}