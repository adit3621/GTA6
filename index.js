
const canvas =document.querySelector('canvas');
const c=canvas.getContext('2d');
canvas.width=1024
canvas.height=580
const g=0.7
c.fillRect(0,0,canvas.width,canvas.height)
let ltime=0;
let ctime=0;
const speed=130;
const bg= new bgimg({
    position:{
        x:0,
        y:0
    },
    imagesrc: 'background.png',
    scale:1,
    frame:1
})
const shop = new bgimg ({
    position:{
        x:650,
        y:161
    },
    imagesrc: 'shop.png',
    scale:2.5,
    frame:6
})

const player=new boys({
    position :{
        x:40,
        y:30
    },
    velocity:{
        x:0,
        y:0
    },
    imagesrc : './hero/idle.png',
    scale:2.3,
    frame:8,
    adjust :{
        x: 200,
        y:160
    },
    sprites: {
        idle: {
          imagesrc: './hero/Idle.png',
          frame: 8
        },
        run: {
          imagesrc: '/hero/Run.png',
          frame: 8
        },
        jump: {
          imagesrc: './hero/Jump.png',
          frame: 2
        },
        fall: {
          imagesrc: './hero/Fall.png',
          frame: 2
        },
        attack1: {
          imagesrc: '/hero/Attack1.png',
          frame: 6
        }
        // }.
        // takeHit: {
        //   imagesrc: './hero/Take Hit - white silhouette.png',
        //   frame: 4
        // },
        // death: {
        //   imagesrc: './hero/Death.png',
        //   frame: 6
        // }
      }
})

const enemy=new boys({
    position:{
        x:400,
        y:30
    },
    velocity:{
        x:0,
        y:0
    },
    imagesrc:'./kenji/idle.png',
    scale:2.3,
    frame:4,
    adjust :{
        x: 90,
        y:160
    },
    sprites: {
        idle: {
          imagesrc: './kenji/idle.png',
          frame: 4
        },
        run: {
          imagesrc: '/kenji/Run.png',
          frame: 8
        },
        jump: {
          imagesrc: './kenji/Jump.png',
          frame: 2
        },
        fall: {
          imagesrc: './kenji/Fall.png',
          frame : 2
        },
        attack1: {
          imagesrc: '/kenji/Attack1.png',
          frame: 4
        },
        takeHit: {
          imagesrc: './kenji/Take Hit.png',
          frame : 4
        },
        death: {
          imagesrc: './kenji/Death.png',
          frame: 6
        }
    }
})

let timer=60;
let timerid=setInterval(time,1000) 

function animate(){
    window.requestAnimationFrame(animate)
    ctime++;
    c.fillStyle='black';
    c.fillRect(0,0,canvas.width,canvas.height)
    bg.update();
    shop.update();
    player.update();
    enemy.update();
    
    // if ( player.isattacking
    //     ){
    //         c.fillStyle='yellow'
    //         c.fillRect(player.attackbox.position.x,player.attackbox.position.y,player.attackbox.width,player.attackbox.height)
    //     }
    if (player.attackbox.position.x+player.attackbox.width>=enemy.position.x+190 && player.attackbox.position.x+player.attackbox.width<=enemy.position.x+240 +enemy.width&& 
        player.attackbox.position.y+player.attackbox.height>=enemy.position.y+182 && player.attackbox.position.y+player.attackbox.height<=enemy.position.y +182+enemy.height 
        && player.isattacking){
        enemy.health-=10;
         document.getElementById("ph2").style.width=enemy.health+"px";
        }
    // if (enemy.isattacking){
    //         c.fillStyle='yellow'
    //         c.fillRect(enemy.attackbox.position.x,enemy.attackbox.position.y,enemy.attackbox.width,enemy.attackbox.height)
    //     } 
    if (enemy.attackbox.position.x>=player.position.x+ 180 && enemy.attackbox.position.x <= player.position.x+200+player.width&& 
        enemy.attackbox.position.y+enemy.attackbox.height>=player.position.y+148 && enemy.attackbox.position.y+enemy.attackbox.height<=player.position.y+148 +enemy.height 
        && enemy.isattacking){
        player.health-=10;
        document.getElementById("ph1").style.width=player.health+"px";
     }
     if (player.health<=0) {
        document.getElementById('display').innerHTML="enemy wins";
        // player.switchsprite('death')
        clearInterval(timerid);
     }
     if (enemy.health<=0) {
        document.getElementById('display').innerHTML="player wins";
        // enemy.switchsprite('death')
        clearInterval(timerid);
     }
     if (timer === 0){
        if (player.health === enemy.health) {
            document.getElementById('display').innerHTML="tie";
        }
        else if (player.health > enemy.health) {
            document.getElementById('display').innerHTML="player wins";
        }
        else {
            document.getElementById('display').innerHTML="enemy wins";
        }     
     }
    if (shop.jump>=shop.frame-1){
        shop.jump=0;
    }
    if (player.jump>=player.frame-1){
        player.jump=0;
        player.switchsprite('idle');
    }
    if (enemy.jump>=enemy.frame-1){
        enemy.jump=0;
        enemy.switchsprite('idle')
    }
    if ((ctime-ltime)/1000>1/speed){
        ltime=ctime;
        player.jump++;
        enemy.jump++;
        shop.jump++;
    }

}
animate()
window.addEventListener('keydown',(event)=>{
    switch (event.key){
        case 'd':
            player.velocity.x=3
            player.switchsprite('run')
            break;
        case 'a':
            player.switchsprite('run')
            player.velocity.x=-3
            break; 
        case 'w':
            player.switchsprite('jump')
            player.velocity.y=-20;
            break;
        case ' ':
            player.attack()
            break;  
        case 'ArrowLeft':
            enemy.switchsprite('run')
            enemy.velocity.x=-3
            break;
        case 'ArrowRight':
           enemy.switchsprite('run')
           enemy.velocity.x=3
           break;   
        case 'ArrowUp':
           enemy.velocity.y=-20
           break;
        case 'ArrowDown':
           enemy.attack()
           break;        
    }
})
window.addEventListener('keyup',(event)=>{
    switch (event.key){
        case 'd':
            player.switchsprite('idle');
            if (player.velocity.x==3)
            {
                player.velocity.x=0
            }
            break;
        case 'a':
            player.switchsprite('idle');
            if (player.velocity.x==-3){
                player.velocity.x=0
            }
            break;  
        case 'ArrowLeft':
            enemy.switchsprite('idle')
            if (enemy.velocity.x==-3)
            {
                enemy.velocity.x=0
            }
            break;
        case 'ArrowRight':
            enemy.switchsprite('idle')
            if (enemy.velocity.x==3){
                enemy.velocity.x=0
            }
            break;
        // case 'w' :

        //     break;              
    }
})
