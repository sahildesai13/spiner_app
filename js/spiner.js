const wheel = document.getElementById('box');
const spinButton = document.getElementById('spin-button');
const wheelItems = document.querySelectorAll('.spinpart');

var selectedSectionIndex = -1;
const prizes = [
    { id: 1, text: "iphone", probability: 0.001 },
    { id: 2, text: "try again", probability: 0.125 },
    { id: 3, text: "pen", probability: 0.125 },
    { id: 4, text: "mouse", probability: 0.125 },
    { id: 5, text: "loose all", probability: 0.125 },
    { id: 6, text: "1 coin", probability: 0.125 },
    { id: 7, text: "next time", probability: 0.125 },
    { id: 8, text: "watch", probability: 0.05 },
];

const totalRounds = 15;
const maxSpins = 3;
let currentRound = 0;
let totalSpins = 0;
const spinButtonCooldown = 60000;
let previousSelectedItemIndex = -1;
let isIphoneWon = false;
cnt = 0;
let prizeIndex = selectPrizeIndex();
let prize = prizes[prizeIndex];
function disableSpinButton(cooldownDuration) {
    spinButton.disabled = true;
    setTimeout(() => {
        spinButton.disabled = false;
    }, cooldownDuration);
}

function spinWheel() {
    if (currentRound < totalRounds && totalSpins < maxSpins) {
        currentRound++;
        totalSpins++;
        localStorage.setItem('totalSpins', totalSpins);
        spinButton.disabled = true;
        let selectedItem = null;
        let randomIndex;

        do {
            randomIndex = Math.floor(Math.random() * prizes.length);
        } while (randomIndex === previousSelectedItemIndex);

        selectedItem = prizes[randomIndex].text;
        previousSelectedItemIndex = randomIndex;
        console.log(selectedItem)
        if (selectedItem === "iphone") {
            localStorage.setItem('isIphoneWon', 'true');
        }

        selectedItemIndex = prizes.findIndex(prize => prize.text === selectedItem);
        let angle = 360 * 15 / prizes.length * selectedItemIndex;
        angle += Math.floor(Math.random() * (360 - 10 * 36) + 10);

        if (angle < 360) {
            angle = angle * 360;
        }

        wheel.style.transition = 'transform 3s ease-out';
        wheel.style.transform = `rotate(${angle}deg)`;
        setTimeout(() => {
            alert(`Spin ${totalSpins}: Congratulations! You won: ${selectedItem}`);
            spinButton.disabled = false;

        }, 3000);


    } else if (totalSpins >= maxSpins) {
        disableButton();
        alert(' You can try again after some time.');
    }
    else {
        alert('All rounds completed. Thanks for playing!');
    }

}


function selectPrizeIndex() {

    let isIphoneWon = localStorage.getItem('isIphoneWon');
  
    if (isIphoneWon === 'true') {
      
      // Keep generating random indexes until we get one other than 0
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * prizes.length);
      } while (randomIndex === 0);
      
      return randomIndex;
  
    } else {
    
      return Math.floor(Math.random() * prizes.length);
    
    }
  
  }

  window.onload = function() {
    localStorage.removeItem('isIphoneWon');
  }
// button timer =====================================================================

function disableButton() {
    var button = document.getElementById("spin-button");
    button.disabled = true;
    var Duration = 0;
    var clickTime = new Date().getTime();
    localStorage.setItem("clickTime", clickTime);
    var timerInterval = setInterval(function () {
        var currentTime = new Date().getTime();
        var elapsedTime = (currentTime - clickTime) / 1000;
        var timeRemaining = Duration - elapsedTime;
        var hours = Math.floor(timeRemaining / 3600);
        var minutes = Math.floor((timeRemaining % 3600) / 60);
        var seconds = Math.floor(timeRemaining % 60);
        var formattedTime = padWithZero(hours) + ":" + padWithZero(minutes) + ":" + padWithZero(seconds);
        button.innerHTML = "" + formattedTime;
        if (timeRemaining <= 0) {
            button.disabled = false;
            button.innerHTML = "Spin";
            totalSpins = 0;
            clearInterval(timerInterval);
            localStorage.removeItem("clickTime");
        }
    }, 100);
}

function padWithZero(number) {
    return number < 10 ? "0" + number : number;
}

window.onload = function () {
    totalSpins = parseInt(localStorage.getItem('totalSpins')) || 0;
    if (totalSpins >= maxSpins) {
        disableButton();
    }
    var clickTime = localStorage.getItem("clickTime");
    if (clickTime) {
        var currentTime = new Date().getTime();
        var elapsedTime = (currentTime - parseInt(clickTime)) / 1000;
        var button = document.getElementById("spin-button");
        var Duration = 0;
        var timeRemaining = Duration - elapsedTime;
        if (timeRemaining > 0) {
            button.disabled = true;
            var timerInterval = setInterval(function () {
                var currentTime = new Date().getTime();
                var elapsedTime = (currentTime - parseInt(clickTime)) / 1000;
                var timeRemaining = Duration - elapsedTime;
                var hours = Math.floor(timeRemaining / 3600);
                var minutes = Math.floor((timeRemaining % 3600) / 60);
                var seconds = Math.floor(timeRemaining % 60);
                var formattedTime = padWithZero(hours) + ":" + padWithZero(minutes) + ":" + padWithZero(seconds);
                button.innerHTML = "" + formattedTime;
                if (timeRemaining <= 0) {
                    button.disabled = false;
                    button.innerHTML = "Spin";
                    clearInterval(timerInterval);
                    localStorage.removeItem("clickTime");
                }
            }, 100);
            var hours = Math.floor(timeRemaining / 3600);
            var minutes = Math.floor((timeRemaining % 3600) / 60);
            var seconds = Math.floor(timeRemaining % 60);
            var formattedTime = padWithZero(hours) + ":" + padWithZero(minutes) + ":" + padWithZero(seconds);
            button.innerHTML = " " + formattedTime;
        } else {
            localStorage.removeItem("clickTime");
        }
    }
};