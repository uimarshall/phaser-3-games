// import config from '../index';
import {config,game,gameSettings}  from '../index';

class Scene2 extends Phaser.Scene {
  // constructor fn helps Scene2 to inherit all d features of Phaser.Scene
  constructor() {
    super('playGame');// 'playGame' will be the identifier for this 'scene2'
  }

  create() {
    // set a variable called 'this.background'
    // this.background = this.add.image(0, 0, 'background');
    this.background = this.add.tileSprite(0, 0,config.width, config.height, 'background');
    this.background.setOrigin(0, 0);
    this.add.text(20, 20, 'Playing game...', { font: '25px Arial', fill: 'yellow' });

    // Declaration using image
    // this.ship1 = this.add.image(config.width / 2 - 50, config.height / 2, 'ship');
    // this.ship2 = this.add.image(config.width / 2, config.height / 2, 'ship2');
    // this.ship3 = this.add.image(config.width / 2 + 50, config.height / 2, 'ship3');
    
    // Declaration using sprite
    this.ship1 = this.add.sprite(config.width / 2 - 50, config.height / 2, 'ship');
    this.ship2 = this.add.sprite(config.width / 2, config.height / 2, 'ship2');
    this.ship3 = this.add.sprite(config.width / 2 + 50, config.height / 2, 'ship3');
     this.ship1.setScale(2)
    //  this.ship1.flipY = true
    //  this.ship1.angle += 3//rotate continously

// ******************************PHYSICS**********************

this.powerUps = this.physics.add.group()
// Create number of powerups you want
let maxObjs =4
for (let i = 0; i <= maxObjs; i++) {
  let powerUp = this.physics.add.sprite(16,16,"power-up")
  this.powerUps.add(powerUp)
  powerUp.setRandomPosition(0,0,this.game.config.width,game.config.height)
  if (Math.random() > 0.5) {
    
    powerUp.play("red")
  }else{
    powerUp.play("gray")
  }
  // set velocity of physics
  powerUp.setVelocity(100,100)
  powerUp.setCollideWorldBounds(true)//set boundry for the objs not to fall off.
  // the boundries is the 'world'
  // Set the objs to bounce instead of being static
  powerUp.setBounce(1)
}


   this.ship1.play("ship1_anim")
   this.ship2.play("ship2_anim")
   this.ship3.play("ship3_anim")

  //  On clicking the ship, it should explode
  this.ship1.setInteractive()
  this.ship2.setInteractive()
  this.ship3.setInteractive()

  // Add EventListener
  this.input.on("gameobjectdown", this.destroyShip, this)
 // =========================================================================
   
// ========================================================================
  /** 
   * USE tileSprite instead og image
   *  A TileSprite is a Sprite that has a repeating texture,
   * It used when you want to move the texture rather than the image.
  */
  // this.background = this.add.tileSprite(0, 0,config.width, config.height, 'background');
  
  this.player = this.physics.add.sprite(config.width / 2 - 8, config.height - 64, 'player');
  this.player.play("thrust")

  // Get Inputs from the keyboard
  this.cursorKeys = this.input.keyboard.createCursorKeys()
  // Prevent ship from falling off the screen
  this.player.setCollideWorldBounds(true)
  // Add a key so that player can shoot
  this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
}

  /** 2 params,the 'ship' obj to be move and the Y-velocity of the ship */
  moveShip(ship,speed){
    ship.y += speed
    if (ship.y > config.height) {
      this.resetShipPosition(ship)
      
    }

  }

  update(){
    this.moveShip(this.ship1, 1)
    this.moveShip(this.ship2, 2)
    this.moveShip(this.ship3, 3)
    // decrease the position of the texture of the bg
    this.background.tilePositionY -= 0.5
    this.movePlayerManager()
    if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
      console.log("Fire")
      
    }

  }

  movePlayerManager(){
    // Player can move ship left and right
    if (this.cursorKeys.left.isDown) {
      this.player.setVelocityX(-gameSettings.playerSpeed)//adjust players speed to a -ve value
      
    }else if (this.cursorKeys.right.isDown) {

      this.player.setVelocityX(gameSettings.playerSpeed)
    }

    // Player can move ship up and down
    if (this.cursorKeys.up.isDown) {
      this.player.setVelocityY(-gameSettings.playerSpeed)//adjust players speed to a -ve value
      
    }else if (this.cursorKeys.down.isDown) {

      this.player.setVelocityY(gameSettings.playerSpeed)
    }
  }

  /**
   * Create a func that resets the positions of the ship to the top of the screen
   * after falling off due to the updated speed in update()
   * Y-axis = 0; X-axis = random position.
   */

   resetShipPosition(ship){
    ship.y = 0
    let randomX = Phaser.Math.Between(0, config.width)
    ship.x = randomX

  }

  // callback func to destroy ship
  destroyShip(pointer, gameObject){
    gameObject.setTexture("explosion")
    gameObject.play("explode")
  }

 

 
}
export default Scene2;