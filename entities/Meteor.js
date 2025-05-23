import Phaser from "phaser";

export default class Meteor extends Phaser.Physics.Arcade.Image{
    constructor(scene,x,y){
        super(scene,x,y)
    
    this.meteorType = Phaser.Math.RND.between(0,2);
    switch(this.meteorType){
        case 0:
            this.setTexture("meteor-small");
            break;
        case 1:
            this.setTexture("meteor-med");
            break;
        case 2:
            this.setTexture("meteor-large");
            break;
    }
        this.speed = Phaser.Math.GetSpeed(100,1);
        this.direction = Phaser.Math.RND.angle(); 
        this.angleRotation = Phaser.Math.RND.between(0.8,2.5);
        this.active=false;
        this.visible=false;
        this.factor = 1;
    }


    update(time,delta){
        if(this.active){
            const width = this.scene.scale.width;
            const height = this.scene.scale.height;

            this.x += this.factor * Math.cos(this.direction) * this.speed * delta;
            this.y += Math.cos(this.direction) *  this.speed * delta;
            this.angle += this.angleRotation

            if (this.x < 0) {
                this.x = width;
            } else if (this.x > width) {
                this.x = 0;
            }
              if (this.y < 0) {
                this.y = height;
            } else if (this.y > height) {
                this.y = 0;
            }
          
        }
    }
}