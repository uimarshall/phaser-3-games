import Phaser from 'phaser';
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
   this.load.spritesheet('power-up', 'src/assets/spritesheets/power-up.png',{
       frameWidth: 16,
       frameHeight:16
     });
   this.load.spritesheet('player', 'src/assets/spritesheets/player.png',{
       frameWidth: 16,
       frameHeight:24
     });
   this.load.spritesheet('beam', 'src/assets/spritesheets/beam.png',{
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
     key:"explode",//create animation named explode
     frames: this.anims.generateFrameNumbers("explosion"),//using the ship spritesheets frame
     frameRate:20,
     repeat:0,// 0 is for it to occur once.
     hideOnComplete:true//for the explosion animation to disappear once completed.
     
 
   })
   this.anims.create({
     key:"red",//create animation named red
     frames: this.anims.generateFrameNumbers("power-up", {
       start:0,
       end:1
     }),
     frameRate:20,
     repeat:-1, 
 
   })
   this.anims.create({
     key:"gray",//create animation named gray
     frames: this.anims.generateFrameNumbers("power-up", {
       start:2,
       end:3
     }),
     frameRate:20,
     repeat:-1, 
 
   })
   this.anims.create({
     key:"thrust",//create animation named thrust
     frames: this.anims.generateFrameNumbers("player"),
     frameRate:20,
     repeat:-1, 
 
   })
   this.anims.create({
     key:"beam_anim",//create animation named thrust
     frames: this.anims.generateFrameNumbers("beam"),
     frameRate:20,
     repeat:-1, 
 
   })
  }
}


export default Scene1;