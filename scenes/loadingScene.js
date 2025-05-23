import Phaser from  'phaser'

export default class  LoaderScene extends Phaser.Scene{
    constructor(){
        super('loader-scene')
    }

    preload(){
        this.load.image('player', 'assets/player.png')
        this.load.image('laser', 'assets/laserBlue16.png')
        this.load.image('meteor-small', 'assets/meteor_small.png')
        this.load.image('meteor-med', 'assets/meteor_med.png')
        this.load.image('meteor-large', 'assets/meteor_large.png')
        this.load.image('starfield', 'assets/starfield_800x600.jpg')
        
        this.load.bitmapFont('arcade', 'assets/Fonts/arcade.png', 'assets/Fonts/arcade.xml')
        
        

        this.load.audio('shoot', 'assets/laser-shoot.wav')
        this.load.audio('explosion', 'assets/laser-explosion.wav')
    
}
    
    create(){
        this.scene.switch('main-menu-scene')
    }
}