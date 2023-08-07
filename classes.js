class bgimg{
    constructor({position,imagesrc,scale,frame}){
        this.position=position;
        this.height=150;
        this.width=50;
        this.image=new Image();
        this.image.src= imagesrc;
        this.scale=scale;
        this.frame=frame;
        this.jump=0;
    }
    draw(){
     c.drawImage(
        this.image,
        this.jump*(this.image.width/this.frame),
        0,
        (this.image.width/this.frame),
        this.image.height,
        this.position.x,
        this.position.y,
        (this.image.width/this.frame)*this.scale,
        this.image.height*this.scale
        );
     }
    update(){
        this.draw()
    }
}
class boys extends bgimg {
    constructor({
        position,
        velocity,
        imagesrc,
        scale,
        frame,
        adjust,
        sprites,
    }){
        super({
            imagesrc,
            scale,
            frame,
            position
        })
        this.adjust=adjust,
        this.jump=0;
        this.velocity=velocity;
        this.height=150;
        this.width=50;
        this.attackbox={
            position:{    
                x: this.position.x+this.adjust.x,
                y: this.position.y+this.adjust.y
            },
            width:170,
            height:50
        }
        this.isattacking =false;
        this.health=475;
        this.sprites=sprites
        for (const sprite in this.sprites){
            sprites[sprite].image = new Image ();
            sprites[sprite].image.src= sprites[sprite].imagesrc
        }
    }
    update(){
        this.draw()
        this.attackbox.position.x=this.position.x+this.adjust.x
        this.attackbox.position.y=this.position.y+this.adjust.y
        this.position.y+=this.velocity.y
        if(this===enemy && this.position.y+this.velocity.y+this.height>=338) {
            this.velocity.y=0;
        }
        else if(this.position.y+this.velocity.y+this.height>=350) {
            this.velocity.y=0;
        }
        else {
            this.velocity.y+=g;
        }
        this.position.x+=this.velocity.x;
    }
    attack(){
        this.switchsprite('attack1')
        this.isattacking=true;
        setTimeout(() => {
           this.isattacking=false
        }, 100);
    }
    switchsprite(sprite){
        switch (sprite) {
            case 'idle':
              if (this.image !== this.sprites.idle.image) {
                this.image = this.sprites.idle.image
                this.frame = this.sprites.idle.frame
                this.jump = 0
              }
              break
            case 'attack1':
                if (this.image !== this.sprites.attack1.image) {
                  this.image = this.sprites.attack1.image
                  this.frame = this.sprites.attack1.frame
                  this.jump = 0
                }
                break
            case 'run':
               if (this.image !== this.sprites.run.image) {
                this.image = this.sprites.run.image
                this.frame = this.sprites.run.frame
                this.jump = 0
               }
               break
            case 'jump':
               if (this.image !== this.sprites.jump.image) {
                console.log(20)
                this.image = this.sprites.jump.image
                this.frame = this.sprites.jump.frame
                this.jump = 0
               }
               break
      
            case 'fall':
              if (this.image !== this.sprite.fall.image) {
                this.image = this.sprite.fall.image
                this.frame = this.sprite.fall.frame
                this.jump = 0
              }
              break
      
            case 'takeHit':
              if (this.image !== this.sprite.takeHit.image) {
                this.image = this.sprite.takeHit.image
                this.frame = this.sprite.takeHit.frame
                this.jump = 0
              }
              break
      
            case 'death':
              if (this.image !== this.sprite.death.image) {
                this.image = this.sprite.death.image
                this.frame = this.sprite.death.frame
                this.jump = 0
              }
              break
        }
    }
}