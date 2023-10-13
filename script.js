'use strict';
initPage();
function initPage() {
var clientWidth =
document.documentElement.clientWidth || document.body / clientWidth; //获取屏幕可视区宽
var html = document.getElementsByTagName("html")[0]; //获取html根元素
html.style.fontSize = clientWidth / 110 + "px"; //动态设置font-size大小
} window.onresize = initPage;


const diceEl=document.querySelector('.dice');

const score0El=document.querySelector('#score--0');
const score1El=document.querySelector('#score--1');
const currentScore0El=document.querySelector('#current--0');
const currentScore1El=document.querySelector('#current--1');

const player0El=document.querySelector('.player--0');
const player1El=document.querySelector('.player--1');


const btnNew=document.querySelector('.btn--new');
const btnRoll=document.querySelector('.btn--roll');
const btnHold=document.querySelector('.btn--hold');

let currentScore, totalScore,activePlayer;

const initialGame=()=>{
    currentScore =0;
    totalScore=[0,0];
    activePlayer=0;
    diceEl.classList.add('hidden');

    score1El.textContent=0;
    score0El.textContent=0;
    currentScore0El.textContent=0;
    currentScore1El.textContent=0;


    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
}

initialGame();


const switchPlayer=()=>{
    currentScore=0;
    document.querySelector(`#current--${activePlayer}`).textContent=currentScore;
    activePlayer=activePlayer===0?1:0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}

const roll=()=>{
    let diceNumber=Math.trunc(Math.random()*6)+1;
    diceEl.classList.remove('hidden');
    diceEl.src=`dice-${diceNumber}.png`;

    if(diceNumber !== 1){
        currentScore+=diceNumber;
        document.querySelector(`#current--${activePlayer}`).textContent=currentScore;
    }else{
        //切换玩家
        switchPlayer();
    }

}


const checkWin=()=>{
   return totalScore[activePlayer]>=10?true:false;
}

const winDisplay=()=>{
    document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
}

const hold=()=>{
    totalScore[activePlayer]+=currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent=totalScore[activePlayer];


    if(checkWin()){
        winDisplay();
        return;
    }

    switchPlayer();
}

btnRoll.addEventListener('click',roll);

btnHold.addEventListener('click',hold);

btnNew.addEventListener('click',initialGame);


