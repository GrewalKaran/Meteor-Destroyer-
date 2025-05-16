import Phaser from 'phaser'
import Meteor from '../entities/Meteor'
import Laser from '../entities/Laser'

export default class PlayScene extends Phaser.Scene {

  constructor() {
    super('play-scene')
  }

  preload() {
  }

  create() {

    this.physics.world.setBounds(0, 0, this.scale.width, this.scale.height);
    
    const width = this.sys.game.config.width
    const height = this.sys.game.config.height

    
    this.startTime = null // Time when the rocket first moves
    this.elapsedTime = 0  // Elapsed time in seconds
    this.timerRunning = false


    const bg = this.add.image(width / 2, height / 2, 'starfield');
    const scaleX = width / bg.width;
    const scaleY = height / bg.height;
    const scale = Math.max(scaleX, scaleY); // Cover whole screen
    bg.setScale(scale).setScrollFactor(0);

    this.player = this.physics.add.image(200, 200, 'player')
    this.player.setDrag(0.99)
    this.player.setMaxVelocity(150)
    this.player.setScale(0.5)
    this.player.setCollideWorldBounds(true)

    // generate our meteors
    this.meteorGroup = this.physics.add.group()
    this.meteorArray = []

  

    for (let i = 0; i < 10; i++) {
      const meteor = new Meteor(this, 300, 300)

      const xPos = Phaser.Math.RND.between(0, 800)
      const yPos = Phaser.Math.RND.between(0, 600)
      meteor.setPosition(xPos, yPos)
      meteor.setActive(true)
      meteor.setVisible(true)

      this.meteorGroup.add(meteor, true)
      this.meteorArray.push(meteor)
    }

    this.laserGroup = this.physics.add.group({
      classType: Laser,
      maxSize: 5,
      runChildUpdate: true
    })

    this.physics.add.overlap(this.laserGroup, this.meteorGroup, this.collision, null, this)

    this.timeText = this.add
    .bitmapText(width - 80, 20, 'arcade', 'Time: 0.0s', 24)
    .setOrigin(0.5)

    this.cursors = this.input.keyboard.createCursorKeys()
  }

  update(time, delta) {

    if (!this.timerRunning && (this.cursors.up.isDown || this.cursors.left.isDown || this.cursors.right.isDown)) {
      this.startTime = this.time.now
      this.timerRunning = true
    }

    if (this.cursors.up.isDown) {
      this.physics.velocityFromRotation(this.player.rotation, 150, this.player.body.acceleration)
    } else {
      this.player.setAcceleration(0)
    }

    if (this.cursors.left.isDown) {
      this.player.setAngularVelocity(-300)
    } else if (this.cursors.right.isDown) {
      this.player.setAngularVelocity(300)
    } else {
      this.player.setAngularVelocity(0)
    }

    if (this.cursors.space.isDown) {
      const shoot = this.laserGroup.get()
      if (shoot) {
        shoot.fire(this.player.x, this.player.y, this.player.rotation)
        this.sound.play('shoot')
      }
    }


    for (const meteor of this.meteorArray) {
      meteor.update(time, delta)
    }


    if (this.timerRunning) {
      this.elapsedTime = (this.time.now - this.startTime) / 1000
      this.timeText.setText('Time: ' + this.elapsedTime.toFixed(1) + 's')
    }

  }

  collision(laser, meteor) {
    laser.destroy()
    meteor.destroy()
    this.sound.play('explosion')

    if (this.meteorGroup.countActive() === 0) {
      this.timerRunning = false
      this.scene.switch('game-over-scene',{ finalTime: this.elapsedTime.toFixed(1) })
    }
  }

}