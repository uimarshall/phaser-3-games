import config from '../index';

class Scene2 extends Phaser.Scene {
  // constructor fn helps Scene2 to inherit all d features of Phaser.Scene
  constructor() {
    super('playGame');// 'playGame' will be the identifier for this 'scene2'
  }

  create() {
    // set a variable called 'this.background'
    this.background = this.add.image(0, 0, 'background');
    this.background.setOrigin(0, 0);
    this.add.text(20, 20, 'Playing game...', { font: '25px Arial', fill: 'yellow' });

    this.ship1 = this.add.image(config.width / 2 - 50, config.height / 2, 'ship');
    this.ship2 = this.add.image(config.width / 2, config.height / 2, 'ship2');
    this.ship3 = this.add.image(config.width / 2 + 50, config.height / 2, 'ship3');
    //  this.ship1.setScale(2)
    //  this.ship1.flipY = true
    //  this.ship1.angle += 3//rotate continously
  }
}
export default Scene2;