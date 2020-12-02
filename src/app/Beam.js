

class Beam extends Phaser.GameObjects.Sprite {
  constructor(scene) {
    //   Get the positn of the player's ship using the scene's reference
    let x = scene.player.x
    let y = scene.player.y-16
   super(scene,x,y,"beam")
   scene.add.existing(this) 
   this.play("beam_anim")
   scene.physics.world.enableBody(this)//enable spritesheet to have physics
   this.body.velocity.y = -250//set velocity of beam to go upwards

  }

//   Prevents bullet from falling off
update(){
    if (this.y < 32) {
        this.destroy()
        
    }
}
}

export default Beam;