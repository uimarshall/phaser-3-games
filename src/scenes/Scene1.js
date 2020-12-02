
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
    // Using image instead of spritesheet
    // this.load.image('ship', 'src/assets/images/ship.png');
    // this.load.image('ship2', 'src/assets/images/ship2.png');
    // this.load.image('ship3', 'src/assets/images/ship3.png');

    // ========================================================================
  /**
   * SPRITESHEET IS USED FOR ANIMATIONS IN PHASER
   * A "SpriteSheet" is a coll of images in a single file separated by frames.
   * Using Spritesheets is more expensive for the processor, hence use of images
  */
   this.load.spritesheet('ship', 'src/assets/spritesheets/ship.png',{
       frameWidth: 16,//frame size
       frameHeight:16
     });
   this.load.spritesheet('ship2', 'src/assets/spritesheets/ship2.png',{
       frameWidth: 32,
       frameHeight:16
     });
   this.load.spritesheet('ship3', 'src/assets/spritesheets/ship3.png',{
       frameWidth: 32,
       frameHeight:32
     });
   this.load.spritesheet('explosion', 'src/assets/spritesheets/explosion.png',{
       frameWidth: 16,
       frameHeight:16
     });
// ==========================================================================

     
  }

  
  // this.add.text - creates a text inside scene1
  // 20,20 reps the X&Y axis, then the text to display
  create() {
    this.add.text(20, 20, 'Loading game...');
    this.scene.start('playGame');// "playgame" refers to Scene2
  }
}


export default Scene1;