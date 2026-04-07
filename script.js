let board = document.querySelector(".board");
let FoodX;
let FoodY;
let SnakeBody = [];
let SnakeX = 3;
let SnakeY = 5;
let velocityX = 0;
let velocityY = 0;
let gameOver = false;
let setIntervalID;
let gameOverSound = new Audio("gameover.mp3")
let turnSound = new Audio("turn.mp3")
let eatSound = new Audio("eat.mp3")
let keys = document.querySelectorAll(".key")

function randomFoodPosition(){
    FoodX = Math.floor(Math.random()*14)+1;
    FoodY = Math.floor(Math.random()*14)+1;
}

function moveSnake(e){
    if(e.key==="ArrowUp" && velocityY != 1){
        velocityX = 0;
        velocityY = -1;
        turnSound.play()
    }
    else if(e.key==="ArrowDown" && velocityY != -1){
        velocityX = 0;
        velocityY = 1;
        turnSound.play()
    }
    else if(e.key==="ArrowLeft" && velocityX != 1){
        velocityX = -1;
        velocityY = 0;
        turnSound.play()
    }
    else if(e.key==="ArrowRight" && velocityX != -1){
        velocityX = 1;
        velocityY = 0;
        turnSound.play()
    }
main()
}

keys.forEach((key)=>{
    key.addEventListener('click',()=>moveSnake({key:key.dataset.key}))
})

function showGameOver(){
    clearInterval(setIntervalID)
    gameOverSound.play()
    document.removeEventListener("keydown",moveSnake)
    turnSound.pause()
}

function main(){
    if(gameOver){
    return showGameOver()   
    }

    if(SnakeX===FoodX && SnakeY===FoodY){
        randomFoodPosition()
        eatSound.play()
        SnakeBody.push([FoodX, FoodY])
    }

    for (let i = SnakeBody.length-1; i > 0; i--) {
        SnakeBody[i] = SnakeBody[i-1];        
    }
    
    let setHtml = `<div class="food" style="grid-area: ${FoodY}/${FoodX};"></div>`
    SnakeX += velocityX;
    SnakeY += velocityY;
    SnakeBody[0] = [SnakeX, SnakeY];
    for (let i = 0; i < SnakeBody.length; i++) {
        
        setHtml += `<div class="snake-head" id="div${i}" style="grid-area: ${SnakeBody[i][1]}/${SnakeBody[i][0]};"></div>`
        if(i!=0 && SnakeBody[0][1]===SnakeBody[i][1] && SnakeBody[0][0]===SnakeBody[i][0]){
            gameOver = true
        }
        
    }
    if(SnakeX<=0 || SnakeX>14 || SnakeY<=0 || SnakeY>14){
        gameOver = true;
    }

    board.innerHTML = setHtml;
}
randomFoodPosition();
main()
setIntervalID = setInterval(main,150)
document.addEventListener("keydown",moveSnake)

function reset(){
    location.reload()
}
