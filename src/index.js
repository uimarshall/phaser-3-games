import './main.scss';
import './app/app';
import './app/alertService';
import Phaser from 'phaser';
import Scene1 from './scenes/Scene1';
import Scene2 from './scenes/Scene2';
import { render } from './app/componentService';

const gameSettings = {
  playerSpeed:200
}

const config = {
  type: Phaser.AUTO,
  width: 256,
  height: 272,
  backgroundColor: 0x000000,
  //   physics: {
  //     default: 'arcade',
  //     arcade: {
  //       gravity: { y: 200 },
  //     },
  //   },
  /**
Phaser use Scenes to organise its content.
Scenes are where the elements pf the game lives in.
You can create as many scenes as possible dynamically in the same game.
The scenes are controlled by the ffg flow of functions:
1. init() - used to prepare the data.
2. preload() - used to load images & music into memory.
3. create() - used to add objects to the game.
4. update() - Is a loop that runs constantly
*/

  //   scene: {
  //     preload,
  //     create,
  //   },
  scene: [Scene1, Scene2],
  pixelArt:true,
  physics: {
      default: 'arcade',
      arcade: {
        debug:false,
        // gravity: { y: 200 },
      },
    },


};

const game = new Phaser.Game(config);

// function preload() {
//   this.load.setBaseURL('http://labs.phaser.io');

//   this.load.image('sky', 'assets/skies/space3.png');
//   this.load.image('logo', 'assets/sprites/phaser3-logo.png');
//   this.load.image('red', 'assets/particles/red.png');
// }

// function create() {
//   this.add.image(400, 300, 'sky');

//   const particles = this.add.particles('red');

//   const emitter = particles.createEmitter({
//     speed: 100,
//     scale: { start: 1, end: 0 },
//     blendMode: 'ADD',
//   });

//   const logo = this.physics.add.image(400, 100, 'logo');

//   logo.setVelocity(100, 200);
//   logo.setBounce(1, 1);
//   logo.setCollideWorldBounds(true);

//   emitter.startFollow(logo);
// }

render();
export  {config,game, gameSettings};
