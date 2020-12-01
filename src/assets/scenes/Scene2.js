class Scene2 extends Phaser.Scene{
    // constructor fn helps Scene2 to inherit all d features of Phaser.Scene
    constructor() {
        super("playGame")//'playGame' will be the identifier for this 'scene2'
    }
    create(){
        this.add.text(20,20, "Playing game...",{font:"25px Arial", fill:"yellow"})
       
    }
}
export default Scene2