class Entity extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, key, type) {
        super(scene, x, y, key);
        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.world.enableBody(this, 0);
        this.setData("type", type);
        this.setData("isDead", false);
    }

    explode(canDestroy) {
        if (!this.getData("isDead")) {
            // set texture to explosion image, then play animation
            if (this.getData("type") == "Stage1Boss") {
                this.setTexture("sprBossExplosion");
                this.play("sprBossExplosion");
            } else {
                this.setTexture("sprExplosion");
                this.play("sprExplosion");
            }

            // pick random explosion sound defined in this.sfx in SceneMain
            this.scene.sfx.explosions[Phaser.Math.Between(0, this.scene.sfx.explosions.length - 1)].play();

            if (this.shootTimer !== undefined) {
                if (this.shootTimer) {
                    this.shootTimer.remove(false);
                }
            }

            //random explosion angle
            this.setAngle(Math.floor(Math.random() * 359) + 1);
            this.body.setVelocity(0, 0);
            this.on('animationcomplete', function () {
                if (canDestroy) {
                    this.destroy();
                }
                else {
                    this.setVisible(false);
                }
            }, this);
            this.setData("isDead", true);
        }
    }
}

class Player extends Entity {
    constructor(scene, x, y, key) {
        super(scene, x, y, key, "Player");
        this.body.collideWorldBounds = true;
        this.setData("speed", 300);
        // this.setData("score", 0);
        this.setData("isShooting", false);
        this.setData("timerShootDelay", 10);
        this.setData("timerShootTick", this.getData("timerShootDelay") - 1);
    }
    //player movement, and "tilting"
    moveUp() {
        this.scene.player.setScale(1, 0.8);
        this.body.velocity.y = -this.getData("speed");
    }
    moveDown() {
        this.scene.player.setScale(1, 0.8);
        this.body.velocity.y = this.getData("speed");
    }
    moveLeft() {
        this.scene.player.setScale(0.8, 1);
        this.body.velocity.x = -this.getData("speed");
    }
    moveRight() {
        this.scene.player.setScale(0.8, 1);
        this.body.velocity.x = this.getData("speed");
    }
    update() {
        // if movement keys are not pressed, player will stay still, and scale is back to normal
        this.scene.player.setScale(1, 1);
        this.body.setVelocity(0, 0);

        // player cannot move off-screen
        this.x = Phaser.Math.Clamp(this.x, 0, this.scene.game.config.width);
        this.y = Phaser.Math.Clamp(this.y, 0, this.scene.game.config.height);

        if (this.getData("isShooting")) {
            if (this.getData("timerShootTick") < this.getData("timerShootDelay")) {
                this.setData("timerShootTick", this.getData("timerShootTick") + 1); // every game update, increase timerShootTick by one until we reach the value of timerShootDelay
            }
            else { // when "manual timer" is triggered:
                var laser = new PlayerLaser(this.scene, this.x, this.y);
                this.scene.playerLasers.add(laser);

                this.scene.sfx.laser.play(); // play laser sound effect
                this.setData("timerShootTick", 0);
            }
        }
    }
    // go to stage cleared scene
    onStageCleared() {
        this.scene.time.addEvent({
            delay: 3000,
            callback: function () {
                this.scene.scene.start("SceneStageCleared");
            },
            callbackScope: this,
            loop: false
        });
    }
    // go to game over scene
    onDestroy() {
        this.scene.time.addEvent({
            delay: 1000,
            callback: function () {
                this.scene.scene.start("SceneGameOver");
            },
            callbackScope: this,
            loop: false
        });
    }
}

class PlayerLaser extends Entity {
    constructor(scene, x, y) {
        super(scene, x, y, "laserBlue");
        this.body.velocity.y = -200;
    }
}

class EnemyLaser extends Entity {
    constructor(scene, x, y) {
        super(scene, x, y, "laserRed");
        this.body.velocity.y = 222;
    }
}

class BossLaser extends Entity {
    constructor(scene, x, y) {
        super(scene, x, y, "laserYellow");
        this.body.velocity.y = 444;
    }
}

class FastEnemyShip extends Entity {
    constructor(scene, x, y) {
        super(scene, x, y, "enemyShip2", "FastEnemyShip");
        this.body.velocity.y = Phaser.Math.Between(400, 550);
    }
}

class EnergyBall extends Entity {
    constructor(scene, x, y) {
        super(scene, x, y, "enemyEnergy1", "EnergyBall");
        this.body.velocity.y = Phaser.Math.Between(50, 100);
        this.states = {
            MOVE_DOWN: "MOVE_DOWN",
            CHASE: "CHASE"
        };
        this.state = this.states.MOVE_DOWN;
    }
    update() {
        if (!this.getData("isDead") && this.scene.player) {
            if (Phaser.Math.Distance.Between(
                this.x,
                this.y,
                this.scene.player.x,
                this.scene.player.y
            ) < 500) {
                this.state = this.states.CHASE;
            }
            if (this.state == this.states.CHASE) {
                var dx = this.scene.player.x - this.x;
                var dy = this.scene.player.y - this.y;
                var angle = Math.atan2(dy, dx);
                var speed = 250;
                this.body.setVelocity(
                    Math.cos(angle) * speed,
                    Math.sin(angle) * speed
                );
            }
        }
        if (this.x < this.scene.player.x) {
            this.angle -= 5;
        }
        else {
            this.angle += 5;
        }
    }
}

// scrapped enemy group - saved for later development
// class EnergyBallGroup extends Entity {
//     constructor(scene, x, y) {
//         super(scene, x, y, "enemyEnergyGroup", "EnergyBallGroup");
//         this.body.velocity.y = 5;
//     }
// }

class GunShip extends Entity {
    constructor(scene, x, y) {
        super(scene, x, y, "enemyShip1", "GunShip");
        this.body.velocity.y = Phaser.Math.Between(50, 100);
        this.shootTimer = this.scene.time.addEvent({
            delay: 1000,
            callback: function () {
                var laser = new EnemyLaser(
                    this.scene,
                    this.x,
                    this.y
                );
                laser.setScale(this.scaleX);
                this.scene.enemyLasers.add(laser);
            },
            callbackScope: this,
            loop: true
        });
        // this.play("enemyShip1");
    }
    onDestroy() {
        if (this.shootTimer !== undefined) {
            if (this.shootTimer) {
                this.shootTimer.remove(false);
            }
        }
    }
}

class YellowGunShip extends Entity {
    constructor(scene, x, y) {
        super(scene, x, y, "enemyShip3", "YellowGunShip");
        this.body.velocity.y = Phaser.Math.Between(50, 100);
        this.body.velocity.x = 200;
        this.body.collideWorldBounds = true;
        this.body.setBounce(1, 1);
        this.body.setGravityY(50);
        this.shootTimer = this.scene.time.addEvent({
            delay: 1000,
            callback: function () {
                var laser = new EnemyLaser(
                    this.scene,
                    this.x,
                    this.y
                );
                laser.setScale(this.scaleX);
                this.scene.enemyLasers.add(laser);
            },
            callbackScope: this,
            loop: true
        });
    }
    onDestroy() {
        if (this.shootTimer !== undefined) {
            if (this.shootTimer) {
                this.shootTimer.remove(false);
            }
        }
    }
}

class EnemyTank extends Entity {
    constructor(scene, x, y) {
        super(scene, x, y, "enemyTank1", "EnemyTank");
        this.body.velocity.y = 50;
        this.state = "FOLLOW";
    }
    update() {
        if (this.state == "FOLLOW") {
            var dx = this.scene.player.x - this.x;
            var dy = this.scene.player.y + this.y * 0.1;
            var angle = Math.atan2(dy, dx);
            var speed = Phaser.Math.Between(50, 150);
            this.body.setVelocity(
                Math.cos(angle) * speed,
                Math.sin(angle) * speed
            );
        }
    }
}

class Stage1Boss extends Entity {
    constructor(scene, x, y) {
        super(scene, x, y, "enemyBossShip1", "Stage1Boss");
        this.body.velocity.y = 150;
        this.states = {
            MOVE_DOWN: "MOVE_DOWN",
            BOUNCE: "BOUNCE"
        };
        this.state = this.states.MOVE_DOWN;
        this.shootTimer = this.scene.time.addEvent({
            delay: 500,
            callback: function () {
                var laser = new BossLaser(
                    this.scene,
                    this.x,
                    this.y
                );
                laser.setScale(this.scaleX);
                this.scene.bossLasers.add(laser);
            },
            callbackScope: this,
            loop: true
        });
    }
    onDestroy() {
        if (this.shootTimer !== undefined) {
            if (this.shootTimer) {
                this.shootTimer.remove(false);
            }
        }
    }
    update() {
        if (this.body.y > 50 && this.state == this.states.MOVE_DOWN) {
            this.state = this.states.BOUNCE;
            this.body.collideWorldBounds = true;
            this.body.setBounce(1, 1);
            this.body.setGravityY(50);
            this.body.velocity.x = 150;
        }
    }
}
class ScrollingBackground {
    constructor(scene, key, velocityY) {
        this.scene = scene;
        this.key = key;
        this.velocityY = velocityY;
        this.layers = this.scene.add.group();
        this.createLayers();
    }
    createLayers() {
        for (var i = 0; i < 2; i++) {
            // creating two backgrounds will allow a continuous scroll
            var layer = this.scene.add.sprite(0, 0, this.key);
            layer.y = (layer.displayHeight * i);
            var flipX = Phaser.Math.Between(0, 10) >= 5 ? -1 : 1;
            var flipY = Phaser.Math.Between(0, 10) >= 5 ? -1 : 1;
            layer.setScale(flipX * 2, flipY * 2);
            layer.setDepth(-5 - (i - 1));
            this.scene.physics.world.enableBody(layer, 0);
            layer.body.velocity.y = this.velocityY;
            this.layers.add(layer);
        }
    }
    update() {
        // background layers wrap back around to the bottom
        if (this.layers.getChildren()[0].y > 0) {
            for (var i = 0; i < this.layers.getChildren().length; i++) {
                var layer = this.layers.getChildren()[i];
                layer.y = (-layer.displayHeight) + (layer.displayHeight * i);
            }
        }
    }
}