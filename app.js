//make random postion for cards 
const positions = [];
while(positions.length < 9){
    const randomNumber = parseInt(Math.random() * 9);
    if(!positions.includes(randomNumber)){
        positions.push(randomNumber);
    }
}


//set value for cards
let cards = [...document.querySelectorAll(".card")];
cards.map((card, index) => {
    card.textContent = positions[index];
    if(positions[index] == 0){
        card.classList.add("hidden");
    }
})


let objectMove = {
    0 : [1, 3],
    1 : [0, 2, 4],
    2 : [1, 5],
    3 : [0, 4, 6],
    4 : [1, 3, 5, 7],
    5 : [2, 4, 8],
    6 : [3, 7],
    7 : [4, 6, 8],
    8 : [5, 7]
}

let numberOfMove = 0;

//set event for click cards
cards = [...document.querySelectorAll(".card")];
cards.forEach(card => {
    card.addEventListener("click", function(event){
        
        //get clickedCard div:
        const clickedCard = card;
        const dataPositionOfClickedCard = parseInt(card.getAttribute("data-position"));
        //get hiddenCard div:
        const hiddenCard = cards.find(card => card.classList.contains("hidden"));
        const dataPositionOfHiddenCard = parseInt(hiddenCard.getAttribute("data-position"));

        const difference = dataPositionOfClickedCard - dataPositionOfHiddenCard;
        const cardsCanMove = objectMove[dataPositionOfHiddenCard];

        if(cardsCanMove.includes(dataPositionOfClickedCard)){

            //increase numberOfMove
            numberOfMove++;
            const movementCounter = document.querySelector(".movement-counter strong");
            movementCounter.textContent = `${numberOfMove}`;

            if(difference == -1){

                //translate clickedCard to Right
                translate_Card(clickedCard, "X", 100);
                //translate hiddenCard to Left
                translate_Card(hiddenCard, "X", -100);
                
            }else if(difference == 1){

                //translate clickedCard to Left
                translate_Card(clickedCard, "X", -100);
                //translate hiddenCard to Right
                translate_Card(hiddenCard, "X", 100);
    
            }else if(difference == 3){

                //translate clickedCard to Up
                translate_Card(clickedCard, "Y", -100);
                //translate hiddenCard to Down
                translate_Card(hiddenCard, "Y", 100);

            }else if(difference == -3){

                //translate clickedCard to Down
                translate_Card(clickedCard, "Y", 100);
                //translate hiddenCard to Up
                translate_Card(hiddenCard, "Y", -100);

            }

            //swap dataPositionOfClickedCard && dataPositionOfHiddenCard :
            clickedCard.setAttribute("data-position", dataPositionOfHiddenCard);
            hiddenCard.setAttribute("data-position", dataPositionOfClickedCard); 
        }
    })
})

function translate_Card(card, direction, percentage){
    if(card.style.transform){          //if card(clickedCard or hiddenCard) has already moved 
        card.style.transform = `${card.style.transform} translate${direction}(${percentage}%)`;
    }else{
        card.style.transform = `translate${direction}(${percentage}%)`;
    }
}

//stopWatch
let elapsedTime = 0;
let needTime = 90;         //1 minutes and 30 seconds
let minutes = parseInt(needTime / 60);
let seconds = needTime - (minutes * 60);
let stopWatchDOM = document.querySelector(".stopWatch span");
let countDown = setInterval(() => {
    
    seconds--;
    elapsedTime++;
    if(seconds == -1){
        minutes--;
        seconds = 59;
    }

    stopWatchDOM.textContent = `
        ${minutes < 10 ? `0${minutes}` : minutes} : ${seconds < 10 ? `0${seconds}` : seconds}
    `;

    if(minutes == 0 && seconds == 0){

        clearInterval(countDown);

        const gameOverMessage = document.querySelector(".gameOver-message");
        gameOverMessage.classList.add("show");

        const gameOverMusic = document.querySelector("audio.gameOver-music");
        gameOverMusic.play();

    }else{

        //countDown-timer sound effect
        if(seconds == 4 && minutes == 0){
            const countDown_TimerSound = document.querySelector("audio.countDown-timer");
            countDown_TimerSound.play();
        }

        //check victory
        let correctCardPosition = 0;

        cards.forEach(card => {

            const dataPosition = parseInt(card.getAttribute("data-position"));
            const textContent = parseInt(card.textContent);

            if(textContent != 0 && textContent - 1 == dataPosition){
                correctCardPosition++;
            }   
        })
        if(correctCardPosition == 8){

            clearInterval(countDown);

            const victoryMessageTitle = document.querySelector(".victory-message h2");
            victoryMessageTitle.textContent = `You Did it in ${elapsedTime} Seconds, with ${numberOfMove} moves`;

            const victoryMessage = document.querySelector(".victory-message");
            victoryMessage.classList.add("show");

            const victoryMusic = document.querySelector("audio.victory-music");
            victoryMusic.play();
        }
    }
}, 1000);