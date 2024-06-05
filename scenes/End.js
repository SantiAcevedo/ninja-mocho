export default class End extends Phaser.Scene {
    constructor() {
      super("end");
    }

init(data) {
    this.score = data.score;
    this.gameOver = data.gameOver;

}

create() {
    this.add
        .text(400, 300, this.gameOver ? "Game Over" : "You Win")
        .setOrigin(0.5);

    this.add.text(400, 350, `Score: ${this.score}`);

    this.r = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
}
update() {
    if (this.r.isDown) {
        this.scene.start("main");
    }
}
}



