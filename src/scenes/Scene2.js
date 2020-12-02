import config from '../index';

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
// ===========================================================================
    /** CREATING ANIMATIONS 
     *  this.anims.create({key, frames, frameRate, repeat})
     * key - Is the id for the Animation
     * frames - Is an array of frames
     * frameRate - Is the speed of the Animation
     * repeat - will it loop?
    */
   this.anims.create({
     key:"ship1_anim",//create animation named ship1_anim
     frames: this.anims.generateFrameNumbers("ship"),//using the spritesheets frame
     frameRate:20,
     repeat:-1// -1 is for infinite loop
 
   })
   this.anims.create({
     key:"ship2_anim",//create animation named ship1_anim
     frames: this.anims.generateFrameNumbers("ship2"),//using the ship spritesheets frame
     frameRate:20,
     repeat:-1// -1 is for infinite loop
 
   })
   this.anims.create({
     key:"ship3_anim",//create animation named ship1_anim
     frames: this.anims.generateFrameNumbers("ship3"),//using the spritesheets frame
     frameRate:20,
     repeat:-1// -1 is for infinite loop
 
   })
   this.anims.create({
     key:"explode",//create animation named ship1_anim
     frames: this.anims.generateFrameNumbers("explosion"),//using the ship spritesheets frame
     frameRate:20,
     repeat:0,// 0 is for it to occur once.
     hideOnComplete:true//for the explosion animation to disappear once completed.
     
 
   })
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