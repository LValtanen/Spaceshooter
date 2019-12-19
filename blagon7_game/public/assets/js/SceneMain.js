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
        var bossHp = 100;
        var enemyType = '';


        fetch('/scores', {
            method: 'GET',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
        }).then(data => data.json())
            .then(data => allData = data)

        //create joystick plugin
        // this.joyStick = this.plugins.get('rexvirtualjoystickplugin').add(this, {
        //     key: "rexvirtualjoystickplugin",
        //     x: 80,
        //     y: 560,
        //     radius: 50,
        //     base: this.add.graphics().fillStyle(0x888888).fillCircle(0, 0, 50).setAlpha(0.3),
        //     thumb: this.add.graphics().fillStyle(0xcccccc).fillCircle(0, 0, 25).setAlpha(0.4),
        //     dir: '8dir',   // 'up&down'|0|'left&right'|1|'4dir'|2|'8dir'|3
        //     // forceMin: 16,
        //     enable: true
        // }).on('update', this.dumpJoyStickState, this);

        //put player on the map
        this.player = new Player(
            this,
            this.game.config.width * 0.5,
            this.game.config.height * 0.8,
            "playerShip"
        );

        //add shields (hp) to the top of the screen
        // player hp
        var hp = 3;
        var hpStr = 'SHIELDS: ';
        var hpText = this.add.text(this.game.config.width - 105, 15, hpStr + hp, {
            fontFamily: 'monospace',
            fontSize: 14,
            color: '#FFFFFF',
            align: 'center'
        });

        //add ammo to the top of the screen
        var ammoStr = 'AMMO: ';
        ammoText = this.add.text(this.game.config.width - 105, 35, ammoStr + this.player.getData("ammo"), {
            fontFamily: 'monospace',
            fontSize: 14,
            color: '#FFFFFF',
            align: 'center'
        });


        // shields and ammo
        this.loot = this.add.group();

        //add score to the top of the screen
        var scorePlus = '';
        var scoreStr = 'SCORE: ';
        var scoreText = this.add.text(20, 15, scoreStr + score, {
            fontFamily: 'monospace',
            fontSize: 14,
            color: '#FFFFFF',
            align: 'center'
        });

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
            laserDmg: this.sound.add("sndLaserDamage"),
            pickLoot: this.sound.add("sndPickLoot"),
            gameOver: this.sound.add("sndGameOver")
        };

        //create backgrounds
        this.backgrounds = [];
        for (var i = 0; i <= 1; i++) {
            var keys = ["nebulaStage1Bg", "stars1Bg"];
            var key = keys[i];
            var bg = new ScrollingBackground(this, key, Phaser.Math.Between(150, 200));
            this.backgrounds.push(bg);
        }

        //add keyboard keys
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

        // loot spawn event
        this.time.addEvent({
            // amount of gun ships being spawned at once
            delay: 1000,
            callback: function () {
                var lootItem = null;
                var randomizer = Phaser.Math.Between(0, 10);
                if (randomizer > 7) {
                    lootItem = new Ammo(
                        this,
                        Phaser.Math.Between(0, this.game.config.width),
                        0
                    );
                } else if (randomizer < 1) {
                    if (this.getLootByType("Shield").length < 2) {
                        lootItem = new Shield(
                            this,
                            Phaser.Math.Between(0, this.game.config.width),
                            0
                        );
                    }
                }
                if (lootItem !== null) {
                    this.loot.add(lootItem);
                }
            },
            callbackScope: this,
            loop: true
        });

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
                    score += 100;
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
                score += 5;
                scorePlus = enemyType + "   +5";
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
                    player.onLaserDmg();
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
                    player.onLaserDmg();
                }
                laser.destroy();
            }
        });

        // collider between this.player and this.shields
        this.physics.add.overlap(this.player, this.loot, function (player, shield) {
            if (!player.getData("isDead") &&
                !shield.getData("isDead") &&
                shield.getData("type") == "Shield") {
                hp += 1;
                hpText.text = hpStr + hp;
                shield.onDestroy();
                shield.destroy();
            }
        });

        // collider between this.player and this.extraAmmo
        this.physics.add.overlap(this.player, this.loot, function (player, ammo) {
            if (!player.getData("isDead") &&
                !ammo.getData("isDead") &&
                ammo.getData("type") == "Ammo") {
                player.setData("ammo", player.getData("ammo") + 15);
                ammoText.text = ammoStr + player.getData("ammo");
                ammo.onDestroy();
                ammo.destroy();
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
        if (score > 5000 && score < 5499 && bosslaunched === true) {
            this.bossCreator();
        }
        if (score > 9000 && score < 9499 && bosslaunched === true) {
            this.bossCreator();
        }
        if (score > 14000 && score < 14499 && bosslaunched === true) {
            this.bossCreator();
        }

        //update joystick plugin, set player movement
        // var cursorKeys = this.joyStick.createCursorKeys();
        // var s = '';
        // for (var name in cursorKeys) {
        //     if (cursorKeys[name].isDown) {
        //         s += name + '';
        //     }
        // }

        // update player
        if (!this.player.getData("isDead")) {
            this.player.update();
            if ( /*s === 'up' || */this.keyW.isDown) {
                this.player.moveUp();
            } else if (/*s === 'down' || */this.keyS.isDown) {
                this.player.moveDown();
            }
            if (/*s === 'left' || */this.keyA.isDown) {
                this.player.moveLeft();
            } else if (/*s === 'right' || */this.keyD.isDown) {
                this.player.moveRight();
            }
            // if (s === 'upleft') {
            //     this.player.moveUp();
            //     this.player.moveLeft();
            // }
            // if (s === 'upright') {
            //     this.player.moveUp();
            //     this.player.moveRight();
            // }
            // if (s === 'downleft') {
            //     this.player.moveDown();
            //     this.player.moveLeft();
            // }
            // if (s === 'downright') {
            //     this.player.moveDown();
            //     this.player.moveRight();
            // }
            if (this.keySpace.isDown) {
                this.player.setData("isShooting", true);
                ammoText.text = "AMMO: " + this.player.getData("ammo");
            } else {
                this.player.setData("timerShootTick", this.player.getData("timerShootDelay") - 1);
                this.player.setData("isShooting", false);
            }
        }

        if (this.player.getData("isDead")) {
            this.title = this.add.text(this.game.config.width * 0.5, this.game.config.height * 0.7, "LOADING...", {
                fontFamily: 'monospace',
                fontSize: 25,
                fontStyle: 'bold',
                color: '#FFFFFF',
                align: 'center'
            });
            this.title.setOrigin(0.5);
        }

        //create particles if player is alive
        if (!this.player.getData("isDead")) {
            var particles = this.add.particles('fire');
            particles.setDepth(-1);
            particles.createEmitter({
                alpha: { start: 1, end: 0 },
                scale: { start: 0.2, end: 0.2 },
                tint: { start: 0xff945e, end: 0xff945e },
                speed: 1,
                accelerationY: 300,
                angle: { min: -85, max: -95 },
                rotate: { min: -180, max: 180 },
                lifespan: { min: 40, max: 60 },
                blendMode: 'ADD',
                frequency: 60,
                maxParticles: 1,
                x: this.player.x,
                y: this.player.y + 6
            });
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
            // remove everything that moves off screen
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
            // remove everything that moves off screen
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
            // remove everything that moves off screen
            if (laser.x < -laser.displayWidth ||
                laser.x > this.game.config.width + laser.displayWidth ||
                laser.y < -laser.displayHeight * 4 ||
                laser.y > this.game.config.height + laser.displayHeight) {
                if (laser) {
                    laser.destroy();
                }
            }
        }

        // update loot
        for (var i = 0; i < this.loot.getChildren().length; i++) {
            var lootItem = this.loot.getChildren()[i];
            lootItem.update();
            // remove everything that moves off screen
            if (lootItem.x < -lootItem.displayWidth ||
                lootItem.x > this.game.config.width + lootItem.displayWidth ||
                lootItem.y < -lootItem.displayHeight * 4 ||
                lootItem.y > this.game.config.height + lootItem.displayHeight) {
                if (lootItem) {
                    lootItem.destroy();
                }
            }
        }

        // update backgrounds
        for (var i = 0; i < this.backgrounds.length; i++) {
            this.backgrounds[i].update();
        }
    }

    // GAME FUNCTIONS

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

    getLootByType(type) {
        var arr = [];
        for (var i = 0; i < this.loot.getChildren().length; i++) {
            var lootItem = this.loot.getChildren()[i];
            if (lootItem.getData("type") == type) {
                arr.push(lootItem);
            }
        }
        return arr;
    }
    //if joystick not pressed, move to zero
    // dumpJoyStickState() {
    //     var cursorKeys = this.joyStick.createCursorKeys();
    //     var s = 'Key down: ';
    //     for (var name in cursorKeys) {
    //         if (cursorKeys[name].isDown) {
    //             s += name + ' ';
    //         }
    //     }
    //     s += '\n';
    //     s += ('Force: ' + Math.floor(this.joyStick.force * 100) / 100 + '\n');
    //     s += ('Angle: ' + Math.floor(this.joyStick.angle * 100) / 100 + '\n');
    // }

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
    //timer event for spawning enemies and loot
    timerEvent() {
        if (timer > 200) {
            timer -= score / 1000;
        } else {
            timer = 200;
        }
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
    //create boss
    bossCreator() {
        var boss = new Stage1Boss(this, this.game.config.width * 0.5, -150);
        this.bossShips.add(boss);
        bosslaunched = false;
    }
}