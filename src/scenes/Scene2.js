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

    this.ship1 = this.add.image(config.width / 2 - 50, config.height / 2, 'ship');
    this.ship2 = this.add.image(config.width / 2, config.height / 2, 'ship2');
    this.ship3 = this.add.image(config.width / 2 + 50, config.height / 2, 'ship3');
    //  this.ship1.setScale(2)
    //  this.ship1.flipY = true
    //  this.ship1.angle += 3//rotate continously

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

 

 
}
export default Scene2;