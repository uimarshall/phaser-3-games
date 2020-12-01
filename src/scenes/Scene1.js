
class Scene1 extends Phaser.Scene {
  // constructor fn helps Scene1 to inherit all d features of Phaser.Scene
  constructor() {
    super('bootGame');// 'bootGame' will be the identifier for this 'scene1'
  }

  /** Game objects Images
 * this.load.image("key","url")
 * key - Is a string to identify the image
 * url - A str path to the image url or file
*/

  preload() {
    this.load.image('background', 'src/assets/images/background.png');
    this.load.image('ship', 'src/assets/images/ship.png');
    this.load.image('ship2', 'src/assets/images/ship2.png');
    this.load.image('ship3', 'src/assets/images/ship3.png');
  }

  // this.add.text - creates a text inside scene1
  // 20,20 reps the X&Y axis, then the text to display
  create() {
    this.add.text(20, 20, 'Loading game...');
    this.scene.start('playGame');// "playgame" refers to Scene2
  }
}


export default Scene1;