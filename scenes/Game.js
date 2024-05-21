// URL to explain PHASER scene: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/scene/

export default class Game extends Phaser.Scene {
  constructor() {
    super("main");
  }

  init() {}

  preload() {
  //cargar assets

  //import Cielo
    this.load.image("Cielo", "../public/assets/Cielo.webp");

    //import plataforma
    this.load.image("platform", "../public/assets/platform.png");

    //import pj
    this.load.image("personaje", "../public/assets/Ninja.png")

    //import recolectable
    this.load.image("triangle", "../public/assets/triangle.png")
    this.load.image("square", "../public/assets/square.png")
    this.load.image("diamond", "../public/assets/diamond.png")

    
}
  create() {
  //Crear elemnto

  this.Cielo = this.add.image(400, 300, "Cielo");
  this.Cielo.setScale(2)

  //Crear pltaforma
  this.platforms = this.physics.add.staticGroup();

  //al grupo de plataformas agregar plataforma
  this.platforms.create(400, 565, "platform").setScale(2).refreshBody();

  this.platforms.create(200, 400, "platform")

  //Crear pj
  this.personaje = this.physics.add.sprite(400, 300, "personaje")
  this.personaje.setScale(0.1);
  this.personaje.setCollideWorldBounds(true);

  //agregar colision entre pj y plataforma
  this.physics.add.collider(this.personaje, this.platforms);

  //crear teclas
  this.cursor = this.input.keyboard.createCursorKeys(); 

  //una tecla a la vez
  //this.w = this.input.kayboard.addKey(Phaser.Input.Keyboard.keyCodes.W);

  //crear grupo recolectables
  this.recolectables = this.physics.add.group(); 
  this.physics.add.collider(this.personaje, this.recolectables)
  this.physics.add.collider(this.recolectables, this.recolectables)

  this.physics.add.collider(this.personaje, this.recolectables, this.pj, null, this)
  
  this.physics.add.overlap(this.platforms, this.recolectables, this.floor, null, this)

  //crear recolectables

  //evento 1 segundo
  this.time.addEvent({
    delay: 1000,
    callback: this.onSecond,
    callbackScope: this,
    loop: true,
  });
}

pj(personaje, recolectables){
  recolectables.destroy();
  }

floor(platforms, recolectables){
  recolectables.disableBody(true,true)
  }

  onSecond() {
    //crear reecolectable

    const tipos = ["triangle", "square", "diamond"]
    const tipo = Phaser.Math.RND.pick(tipos);

    let recolectable = this.recolectables.create(
      Phaser.Math.Between(10, 790),
      0,
      tipo
    );
    recolectable.setVelocity(0, 100);
  }

  
  update() {
    //movimiento
    if (this.cursor.left.isDown) {
      this.personaje.setVelocityX(-160);
    } 
    else if (this.cursor.right.isDown) {
      this.personaje.setVelocityX(160);
    }
    else {
      this.personaje.setVelocityX(0);
    } 

    if (this.cursor.up.isDown && this.personaje.body.touching.down) {
      this.personaje.setVelocityY(-330)
    }
  }


  
}
