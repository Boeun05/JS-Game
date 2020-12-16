'use strict'

const CARROT_SIZE = 80
const CARROT_COUNT = 10
const BUG_COUNT = 8
const GAME_DURATION_SEC = 10

const WIN_TEXT = 'YOU WIN🎉'
const LOSE_TEXT = 'YOU LOSE😭'
const REPLAY_TEXT = 'REPLAY❓'

const field = document.querySelector('.field')

const timer = document.querySelector('.timer')
const count = document.querySelector('.count')

const playButton = document.querySelector('.play')
const playIcon = document.querySelector('.fa-play')

const popup = document.querySelector('.popup')
const popupText = document.querySelector('.popupText')
const replay = document.querySelector('.replay')

let score = 0
let started = false
let timerOn

function randomNumber(min, max){
    return Math.random() * (max-min) + min
}

function createImage(className, count, imgPath){
    const fieldWidth = field.clientWidth
    const fieldHeight = field.clientHeight
    for (let i = 0; i < count; i++){
        const item = document.createElement('img')
        item.setAttribute('class', className)
        item.setAttribute('src', imgPath)
        item.style.position = 'absolute'
        item.style.top = 0
        item.style.left = 0
        const randPosX = randomNumber(0, fieldWidth-CARROT_SIZE)
        const randPosY = randomNumber(0, fieldHeight-CARROT_SIZE)
        item.style.transform = `translate(${randPosX}px, ${randPosY}px)`
        field.appendChild(item)
    }
}

function showTimerAndCount(){
    timer.style.visibility = 'visible'
    count.style.visibility = 'visible'
}

function initGame(){
    score = 0
    field.innerHTML = ''
    count.innerText = CARROT_COUNT
    createImage( 'carrot', CARROT_COUNT, 'img/carrot.png')
    createImage('bug', BUG_COUNT, 'img/bug.png')
}


function updateScore(){
    count.innerText = CARROT_COUNT - score
}

function updateTimerText(time){
    const minutes = Math.floor(time /60)
    const seconds = Math.floor(time % 60)
    timer.innerText = `${minutes}:${seconds}`
}

function startGameTimer(){
    let time = GAME_DURATION_SEC
    updateTimerText(time)
    timerOn = setInterval(() => {
        if(time <= 0){
            stopGame(LOSE_TEXT)
            return
        }
        updateTimerText(--time)
    },1000)
}

function stopGameTimer(){
    clearInterval(timerOn)
}

function hidePopup(){
    popup.style.visibility = 'hidden'
}

function showPopup(text){
    popup.style.visibility = 'visible'
    popupText.innerHTML = `<span>${text}</span>`
}

function playGame(){
    started = true
    hidePopup()
    initGame()
    showTimerAndCount()
    startGameTimer()
    playButton.style.visibility = 'visible'
    playIcon.className = 'fas fa-stop'
}

function stopGame(text){
    started = false
    stopGameTimer()
    showPopup(text)
    playButton.style.visibility = 'hidden'
    playIcon.className = 'fas fa-play'
}

field.addEventListener('click', (e) => {
    const $target = e.target
    if(!started){
        return
    }
    if($target.tagName !== 'IMG'){
        return
    }
    if($target.matches('.carrot')){
        $target.remove()
        score ++
        updateScore()
        if(CARROT_COUNT === score){
            stopGame(WIN_TEXT)
        }
    }else if($target.matches('.bug')){
        stopGame(LOSE_TEXT)
    }
})

playButton.addEventListener('click', (e) => {
    if(started){
        stopGame(REPLAY_TEXT)
    } else{
        playGame()
    }
})

replay.addEventListener('click', () => {
    playGame()
})