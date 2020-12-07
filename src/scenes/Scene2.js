import Phaser from 'phaser';
// import config from '../index';
import Beam from '../app/Beam';
import ExplosionNotification from '../app/ExplosionNotification';
import { config, game, gameSettings } from '../index';

class Scene2 extends Phaser.Scene {
  // constructor fn helps Scene2 to inherit all d features of Phaser.Scene
  constructor() {
    super('playGame');// 'playGame' will be the identifier for this 'scene2'
  }

  create() {
    // BITMAP FONT - IS A SPRITESHEET CONTAINING FONT SYMBOLS IN A PNG FILE
    // AN XML FILE WILL DEF WHAT PART OF THE IMAGE CORRESPONDS TO EACH SYMBOL IN THE BITMAP
    // set a variable called 'this.background'
    // this.background = this.add.image(0, 0, 'background');
    this.background = this.add.tileSprite(0, 0, config.width, config.height, 'background');
    this.background.setOrigin(0, 0);
    // this.add.text(20, 20, 'Playing game...', { font: '25px Arial', fill: 'yellow' });

    // Declaration using image
    // this.ship1 = this.add.image(config.width / 2 - 50, config.height / 2, 'ship');
    // this.ship2 = this.add.image(config.width / 2, config.height / 2, 'ship2');
    // this.ship3 = this.add.image(config.width / 2 + 50, config.height / 2, 'ship3');

    // Declaration using sprite
    this.ship1 = this.add.sprite(config.width / 2 - 50, config.height / 2, 'ship');
    this.ship2 = this.add.sprite(config.width / 2, config.height / 2, 'ship2');
    this.ship3 = this.add.sprite(config.width / 2 + 50, config.height / 2, 'ship3');
    this.ship1.setScale(2);
    //  this.ship1.flipY = true
    //  this.ship1.angle += 3//rotate continously
    // Put all enemies ship into a grp and enable it for physics
    this.enemies = this.physics.add.group();
    this.enemies.add(this.ship1);
    this.enemies.add(this.ship2);
    this.enemies.add(this.ship3);

    // ******************************PHYSICS**********************

    this.powerUps = this.physics.add.group();
    // Create number of powerups you want
    const maxObjs = 4;
    for (let i = 0; i <= maxObjs; i++) {
      const powerUp = this.physics.add.sprite(16, 16, 'power-up');
      this.powerUps.add(powerUp);
      powerUp.setRandomPosition(0, 0, this.game.config.width, this.game.config.height);
      if (Math.random() > 0.5) {
        powerUp.play('red');
      } else {
        powerUp.play('gray');
      }
      // set velocity of physics
      powerUp.setVelocity(100, 100);
      powerUp.setCollideWorldBounds(true);// set boundry for the objs not to fall off.
      // the boundries is the 'world'
      // Set the objs to bounce instead of being static
      powerUp.setBounce(1);
    }


    this.ship1.play('ship1_anim');
    this.ship2.play('ship2_anim');
    this.ship3.play('ship3_anim');

    //  On clicking the ship, it should explode
    this.ship1.setInteractive();
    this.ship2.setInteractive();
    this.ship3.setInteractive();

    // Add EventListener
    this.input.on('gameobjectdown', this.destroyShip, this);
    // =========================================================================

    // ========================================================================
    /**
   * USE tileSprite instead og image
   *  A TileSprite is a Sprite that has a repeating texture,
   * It used when you want to move the texture rather than the image.
  */
    // this.background = this.add.tileSprite(0, 0,config.width, config.height, 'background');

    this.player = this.physics.add.sprite(config.width / 2 - 8, config.height - 64, 'player');
    this.player.play('thrust');

    // Get Inputs from the keyboard
    this.cursorKeys = this.input.keyboard.createCursorKeys();
    // Prevent ship from falling off the screen
    this.player.setCollideWorldBounds(true);
    // Add a key so that player can shoot
    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    // Create group to the beam instances
    this.projectiles = this.add.group();

    // Enabling collisions btw Objects
    // the fn accedpts d 2 params to collide, the 2 grps of objs in this case.
    this.physics.add.collider(this.projectiles, this.powerUps, (projectile, powerUp) => {
      projectile.destroy();// destroy projectile once there is a collision.
    });

    // Player should pick up power-ups when he touches it.
    // We use "overlap" fn instead of "collider"
    // The "overlap" fn only calculates if 2 objs are touching
    // The 1st 2 params are the objs we want to check if they collide
    // The 3rd param is the call back functn
    // The last 2 params are for the scope of the fn.
    this.physics.add.overlap(this.player, this.powerUps, this.pickPowerUp, null, this);

    // Collision btw player and enemies ship
    this.physics.add.overlap(this.player, this.enemies, this.hurtPlayer, null, this);

    // Add overlap btw player's shoot and enemies ship, the projectiles are the shots.
    this.physics.add.overlap(this.projectiles, this.enemies, this.hitEnemy, null, this);

// ********************SCORE LABEL*******************************

// Keep track of score 

let graphics = this.add.graphics()
graphics.fillStyle(0x000000, 1)
graphics.beginPath()
graphics.moveTo(0,0)
graphics.lineTo(config.width,0)
graphics.lineTo(config.width,20)
graphics.lineTo(0,20)
graphics.lineTo(0,0)
graphics.closePath()
graphics.fillPath()


this.score = 0


//  Add score label using bitmapText fn.
// The 1st 2 params are for the positn.
// The 2nd param means it should use bitmap font we created by referencing the id.
// The "SCORE" param is the text or label to display.
// "24"- is the font size
   this.scoreLabel=this.add.bitmapText(10,5,'pixelFont', 'SCORE', 24)

  //  Add 3 sound effect objects
   this.beamSound =this.sound.add("audio_beam")
   this.explosionSound =this.sound.add("audio_explosion")
   this.pickupSound =this.sound.add("audio_pickup")
   this.music = this.sound.add("music")

   let musicConfig = {
     mute: false,
     volume:1,
     rate:1,
     detune: 0,
     seek:0,
     loop: false,
     delay:0
   }
   this.music.play(musicConfig)
  }

  zeroPad(num, size){
    let strNum = String(num)
    while (strNum.length < (size || 2)) {
      strNum = "0" + strNum
      
    }
    return strNum
  }

  // The player destroys the power-ups once they collide
  // The colliding objs are the params
  pickPowerUp(player, powerUp) {
    powerUp.disableBody(true, true);// disable the physics of the body, set to true-makes it inactive and hide it frm the display list
  this.pickupSound.play()
  }

  hurtPlayer(player, enemy) {
    
    this.resetShipPosition(enemy);// reset positn of enemy shipplayer

    // prevent player from being destroyed
    if (this.player.alpha < 1) {
  return
  
}

    // Add explosion to ship when it is destroyed
    let explosion = new ExplosionNotification(this, player.x, player.y)
    // player.x = config.width / 2 - 8;// reset positn of the player ship
    // player.y = config.height - 64;
    // Disable player ship and hide it after explode
    player.disableBody(true, true)
    // this.resetPlayer()
    // Delay reappearance of the player shop after collision
    this.time.addEvent({
      delay:1000,
      callback: this.resetPlayer,
      callbackScope:this,
      loop:false
    })
  }

  resetPlayer(){
    let x = config.width / 2 - 8;// reset positn of the player ship
    let y = config.height - 64;
    this.player.enableBody(true,x,y,true,true)

    // Make player transparent
    this.player.alpha = 0.5
// Get the ship back to normal after making it transparent
// Animate ship and set the time concurrently
    let tween = this.tweens.add({
      targets:this.player,//our ship is the target
      y: config.height - 64,
      ease:'Power1',
      duration:1500,
      repeat:0,
      onComplete: function () { 
        this.player.alpha = 1
       },
       callbackScope:this
    })
  }

  hitEnemy(projectile, enemy) {
    let explosion = new ExplosionNotification(this, enemy.x, enemy.y)//'this-refers to the scene'
    projectile.destroy();// destroy the shot
    this.resetShipPosition(enemy);
    // Each time we hit the enemy, we increase the score by 10
    this.score += 5
    let scoreFormated = this.zeroPad(this.score, 6)

    this.scoreLabel.text = `SCORE ${scoreFormated}`
    this.explosionSound.play() 

  }

  /** 2 params,the 'ship' obj to be moved and the Y-velocity of the ship */
  moveShip(ship, speed) {
    ship.y += speed;
    if (ship.y > config.height) {
      this.resetShipPosition(ship);
    }
  }

  update() {
    this.moveShip(this.ship1, 1);
    this.moveShip(this.ship2, 2);
    this.moveShip(this.ship3, 3);
    // decrease the position of the texture of the bg
    this.background.tilePositionY -= 0.5;
    this.movePlayerManager();
    if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
      // console.log("Fire")

      // Solve the problem of disappearance of player ship after explosion
      if (this.player.active) {
         this.shootBeam();
      }
     
    }
    // iterate thru each element of the projectile group
    for (let i = 0; i < this.projectiles.getChildren().length; i++) {
      const beam = this.projectiles.getChildren()[i];
      beam.update();
    }
  }

  shootBeam() {
    // let beam = this.physics.add.sprite(this.player.x, this.player.y, "beam")
    // add gameObj to the scene
    const beam = new Beam(this);
    this.beamSound.play()
  }

  movePlayerManager() {
    // Player can move ship left and right
    if (this.cursorKeys.left.isDown) {
      this.player.setVelocityX(-gameSettings.playerSpeed);// adjust players speed to a -ve value
    } else if (this.cursorKeys.right.isDown) {
      this.player.setVelocityX(gameSettings.playerSpeed);
    }

    // Player can move ship up and down
    if (this.cursorKeys.up.isDown) {
      this.player.setVelocityY(-gameSettings.playerSpeed);// adjust players speed to a -ve value
    } else if (this.cursorKeys.down.isDown) {
      this.player.setVelocityY(gameSettings.playerSpeed);
    }
  }

  /**
   * Create a func that resets the positions of the ship to the top of the screen
   * after falling off due to the updated speed in update()
   * Y-axis = 0; X-axis = random position.
   */

  resetShipPosition(ship) {
    ship.y = 0;
    const randomX = Phaser.Math.Between(0, config.width);
    ship.x = randomX;
  }

  // callback func to destroy ship
  destroyShip(pointer, gameObject) {
    gameObject.setTexture('explosion');
    gameObject.play('explode');
  }
}
export default Scene2;