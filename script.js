const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 500;

const keys = [];

const player = {
    x: 200,
    y: 200,
    width: 32,
    height: 48,
    frameX: 0,
    frameY: 0,
    speed: 9,
    moving: false
}

const playerSprite = new Image();
playerSprite.src = './mandalorian.png';

const background = new Image();
background.src = './background.png'

const drawSprite = (img, sX, sY, sW, sH, dX, dY, dW, dH) => {
    ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);

}

const handlePlayerFrame = () => {
    if (player.frameX < 3 && player.moving) player.frameX++
    else player.frameX = 0
}

const movePlayer = () => {
    if (keys['ArrowUp'] && player.y > 100){
        player.y -= player.speed;
        player.frameY = 3;
        player.moving = true;
    }
    if (keys['ArrowLeft'] && player.x > 0){
        player.x -= player.speed;
        player.frameY = 1;
        player.moving = true;
    }
    if (keys['ArrowDown'] && player.y < (canvas.height - player.height)){
        player.y += player.speed;
        player.frameY = 0;
        player.moving = true;
    }
    if (keys['ArrowRight'] && player.x < canvas.width - player.width){
        player.x += player.speed;
        player.frameY = 2;
        player.moving = true;
    }
}


window.addEventListener('keydown', function (e){
    keys[e.key] = true;
    console.log(keys);
    player.moving = true;
})

window.addEventListener('keyup', function (e){
    delete keys[e.key];
    player.moving = false;
})

// const animate = () => {
//     ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

//     drawSprite(playerSprite, player.width * player.frameX, player.height * player.frameY, player.width, player.height, player.x, player.y, player.width, player.height)
//     movePlayer();
//     handlePlayerFrame();

    
//     requestAnimationFrame(animate);
// }

// animate();

let fps, fpsInterval, startTime, now, then, elapsed;

const startAnimating = (fps) => {
    fpsInterval = 1000/fps;
    then = Date.now();
    startTime = then;
    animate();
}

const animate = () => {
    requestAnimationFrame(animate);
    now = Date.now();
    elapsed = now - then;

    if (elapsed > fpsInterval){
        then = now - (elapsed % fpsInterval);

        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        drawSprite(playerSprite, player.width * player.frameX, player.height * player.frameY, player.width, player.height, player.x, player.y, player.width, player.height)
        movePlayer();
        handlePlayerFrame();
    }
}

startAnimating(20);
