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
        
        //increase numberOfMove
        numberOfMove++;
        const movementCounter = document.querySelector(".movement-counter strong");
        movementCounter.textContent = `${numberOfMove}`;
        //get clickedCard div:
        const clickedCard = card;
        const dataIndexOfClickedCard = parseInt(card.getAttribute("data-index"));
        //get hiddenCard div:
        const hiddenCard = cards.find(card => card.classList.contains("hidden"));
        const dataIndexOfHiddenCard = parseInt(hiddenCard.getAttribute("data-index"));

        const difference = dataIndexOfClickedCard - dataIndexOfHiddenCard;
        const cardsCanMove = objectMove[dataIndexOfHiddenCard];

        if(cardsCanMove.includes(dataIndexOfClickedCard)){

            if(difference == -1){

                translate_Card(clickedCard, hiddenCard, difference);
                
            }else if(difference == 1){

                translate_Card(clickedCard, hiddenCard, difference);
    
            }else if(difference == 3){

                translate_Card(clickedCard, hiddenCard, difference);

            }else if(difference == -3){

                translate_Card(clickedCard, hiddenCard, difference);

            }

            //swap dataIndexOfClickedCard && dataIndexOfHiddenCard :
            clickedCard.setAttribute("data-index", dataIndexOfHiddenCard);
            hiddenCard.setAttribute("data-index", dataIndexOfClickedCard); 
        }
    })
})


function translate_Card(clickedCard, hiddenCard, difference){

    if(difference == -1){

        //Move clickedCard to Right
        if(clickedCard.style.transform){          //if clickedCard has already moved 
            clickedCard.style.transform = `${clickedCard.style.transform} translateX(100%)`;
        }else{
            clickedCard.style.transform = `translateX(100%)`;
        }

        //Move hiddenCard to Left
        if(hiddenCard.style.transform){
            hiddenCard.style.transform = `${hiddenCard.style.transform} translateX(-100%)`;
        }else{
            hiddenCard.style.transform = `translateX(-100%)`;
        }

    }else if(difference == 1){

        //Move clickedCard to Left
        if(clickedCard.style.transform){          //if clickedCard has already moved 
            clickedCard.style.transform = `${clickedCard.style.transform} translateX(-100%)`;
        }else{
            clickedCard.style.transform = `translateX(-100%)`;
        }

        //Move hiddenCard to Right
        if(hiddenCard.style.transform){
            hiddenCard.style.transform = `${hiddenCard.style.transform} translateX(100%)`;
        }else{
            hiddenCard.style.transform = `translateX(100%)`;
        }

    }else if(difference == 3){

        //Move clickedCard to Up
        if(clickedCard.style.transform){          //if clickedCard has already moved 
            clickedCard.style.transform = `${clickedCard.style.transform} translateY(-100%)`;
        }else{
            clickedCard.style.transform = `translateY(-100%)`;
        }

        //Move hiddenCard to Down
        if(hiddenCard.style.transform){
            hiddenCard.style.transform = `${hiddenCard.style.transform} translateY(100%)`;
        }else{
            hiddenCard.style.transform = `translateY(100%)`;
        }

    }else if(difference == -3){

        //Move clickedCard to Down
        if(clickedCard.style.transform){          //if clickedCard has already moved 
            clickedCard.style.transform = `${clickedCard.style.transform} translateY(100%)`;
        }else{
            clickedCard.style.transform = `translateY(100%)`;
        }

        //Move hiddenCard to Up
        if(hiddenCard.style.transform){
            hiddenCard.style.transform = `${hiddenCard.style.transform} translateY(-100%)`;
        }else{
            hiddenCard.style.transform = `translateY(-100%)`;
        }

    }
}

//stopWatch
let needTime = 90;         //1 minutes and 30 seconds
let minutes = parseInt(needTime / 60);
let seconds = needTime - (minutes * 60);
let stopWatchDOM = document.querySelector(".stopWatch span");
let countDown = setInterval(() => {
    
    seconds--;
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

        const gameOverMusic = document.querySelector(".gameOver-music");
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

            const dataIndex = parseInt(card.getAttribute("data-index"));
            const textContent = parseInt(card.textContent);

            if(textContent != 0 && textContent - 1 == dataIndex){
                correctCardPosition++;
            }   
        })
        if(correctCardPosition == 8){

            clearInterval(countDown);

            const victoryMessageTitle = document.querySelector(".victory-message h2");
            victoryMessageTitle.textContent = `You Did it in ${needTime - ((minutes * 60) + seconds)} Seconds, with ${numberOfMove} moves`;

            const victoryMessage = document.querySelector(".victory-message");
            victoryMessage.classList.add("show");

            const victoryMusic = document.querySelector("audio.victory-music");
            victoryMusic.play();
        }
    }
}, 1000);