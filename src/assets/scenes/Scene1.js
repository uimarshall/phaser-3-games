class Scene1 extends Phaser.Scene{
    // constructor fn helps Scene1 to inherit all d features of Phaser.Scene
    constructor() {
        super("bootGame")//'bootGame' will be the identifier for this 'scene1'
    }
    // this.add.text - creates a text inside scene1
    // 20,20 reps the X&Y axis, then the text to display
    create(){
        this.add.text(20,20, "Loading game...")
        this.scene.start("playGame")//"playgame" refers to Scene2
    }
}

export default Scene1