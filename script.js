const gameBoard = document.querySelector("#gameBoard");
const ctx = gameBoard.getContext("2d");
const score = document.querySelector("#currScore");
const res = document.querySelector("#res");
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const enemyColor = "red";
const playerColor = "blue";
const unitSize = 100;
let running = true;
let pV = 20;
let eV = 5;
let currScore = 0;
let enemies = [
    {x:0, y:0},
    {x:0, y:-83},
    {x:0, y:-83*2},
    {x:0, y:-83*3},
    {x:0, y:-83*4},
    {x:0, y:-83*5},
];
let pX = Math.floor((gameHeight/2)-unitSize/2);
let pY = gameHeight-10;
let timeout;

var audio = new Audio('backGroundSong.mp3');
audio.play();

window.addEventListener("keydown", changeDirection);
res.addEventListener("click", resetGame);

gameStart();

function gameStart(){
    running = true;
    score.textContent = currScore;
    createEnemy();
    drawEnemy();
    drawPlayer();
    nextTick();
};
function nextTick(){
    if(running)  {
        timeout = setTimeout(() =>  {
            clearBoard();
            drawEnemy();
            moveEnemy();
            drawPlayer();
            checkGameOver();
            levelincrease();
            nextTick();
        }, 50);
    }  else  {
        displayGameOver();
    }
};
function clearBoard(){
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, gameWidth, gameHeight);
};

function createEnemy(){
    function randomNum(min, max)  {
        let randN = Math.round(Math.random()*(max-min)+min);
        return randN;
    }

    enemies.forEach((e) =>  {
        e.x = randomNum(0, gameWidth-unitSize);
    })
};

function drawEnemy(){
    enemies.forEach((e) =>  {
        ctx.fillStyle = enemyColor;
        ctx.fillRect(e.x, e.y, unitSize, 10);
    });
};

function drawPlayer(){
    ctx.fillStyle = playerColor;
    ctx.strokeStyle = "gray";
    ctx.fillRect(pX, pY, unitSize, 10);
    ctx.strokeRect(pX, pY, unitSize, 10);
};

function moveEnemy(){
    function randomNum(min, max)  {
        let randN = Math.round(Math.random()*(max-min)+min);
        return randN;
    }
    enemies.forEach((e) =>  {
        e.y += eV;
        if(e.y > gameHeight)  {
            e.y = 0;
            currScore++;
            score.textContent = currScore;
            e.x = randomNum(0, gameWidth-unitSize);
        }
    })
};
function changeDirection(event){
    const keyPressed = event.keyCode;
    const LEFT = 37;
    const RIGHT = 39;

    switch(true)  {
        case(keyPressed == LEFT):
            xV = -20;
            break;
        case(keyPressed == RIGHT):
            xV = 20;
            break;
    }

    if(pX <= gameWidth - unitSize && xV > 0)
        pX = pX + xV;
    if (pX >= 0 && xV < 0)
        pX = pX + xV;
    
};

function resetGame(){
    enemies = [
        {x:0, y:0},
        {x:0, y:-83},
        {x:0, y:-83*2},
        {x:0, y:-83*3},
        {x:0, y:-83*4},
        {x:0, y:-83*5},
    ];
    eV = 5;
    currScore = 0;
    createEnemy();

    clearInterval(timeout);
    gameStart();
};
function checkGameOver(){
    enemies.forEach((e) =>  {
        if(e.y >= gameHeight - 15)  {
            if((e.x >= pX) && e.x <= pX+unitSize)
                running = false;
            if((e.x+unitSize >= pX) && e.x+unitSize <= pX+unitSize)
                running = false;
        }
        if(running == false)
            displayGameOver();

    });
};
function displayGameOver(){
    ctx.font = "50px MV Boli";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER!", gameWidth/2, gameHeight/2);
};

function levelincrease(){
    switch(currScore)  {
        case 5:
            eV = 6;
            break;
        case 10:
            eV = 7;
            break;
        case 15:
            eV = 8;
            break;
        case 20:
            eV = 8.5;
            break;
        case 25:
            eV = 9;
            break;
        case 35:
            eV = 10;
            break;
        case 40: 
            eV = 10.5;
            break;
        case 50:
            eV = 11;
            break;
        case 60:
            eV = 12;
            break;
        
    }
};
