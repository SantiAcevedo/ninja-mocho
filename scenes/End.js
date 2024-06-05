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
        // Reiniciar el juego y la música al presionar la tecla "R"
        if (Phaser.Input.Keyboard.JustDown(this.r)) {
            // Reiniciar la música de fondo
            if (this.scene.get("main").backgroundMusic.isPlaying) {
                this.scene.get("main").backgroundMusic.stop();
            }

            // Reiniciar el juego
            this.scene.stop("end");
            this.scene.start("main");
        }
    }
}



