const squares = document.querySelectorAll('.grid div');
const timeLeft = document.querySelector('#time-left');
const result = document.querySelector('#result');
// const startBtn = document.querySelector('#button');
const carsLeft = document.querySelectorAll('.car-left');
const carsRight = document.querySelectorAll('.car-right');
const logsLeft = document.querySelectorAll('.log-left');
const logsRight = document.querySelectorAll('.log-right');
var currentTime = 20;
const width = 9;
var currentIndex = 76;
var timerId;

//render frog on starting block
squares[currentIndex].classList.add('frog-on-lawn');


//jQuery function for remove class contains 'frog'
(function($) {
    $.fn.removeClassWild = function(mask) {
        return this.removeClass(function(index, cls) {
            var re = mask.replace(/\*/g, '\\S+');
            return (cls.match(new RegExp('\\b' + re + '', 'g')) || []).join(' ');
        });
    };
})(jQuery);

//write function for move the frog
function moveFrog(e) {

    $("div").removeClassWild("frog-*"); //remove all 'frog'
    // squares[currentIndex].classList.remove('frog');
    switch (e.keyCode) {
        case 37:
            if (currentIndex % width !== 0) currentIndex -= 1; /* left */
            break;
        case 38:
            if (currentIndex - width >= 0) currentIndex -= width; /* Up */
            break;
        case 39:
            if (currentIndex % width < width - 1) currentIndex += 1; /* right */
            break;
        case 40:
            if (currentIndex + width < width * width) currentIndex += width; /* Down */
            break;
    }
    if ((currentIndex >= 63 && currentIndex <= 80) || (currentIndex >= 36 && currentIndex <= 44) || (currentIndex >= 0 && currentIndex <= 17)) {
        squares[currentIndex].classList.add('frog-on-lawn');
    } else if (currentIndex >= 45 && currentIndex <= 62) {
        squares[currentIndex].classList.add('frog-on-road');
    } else if (currentIndex >= 18 && currentIndex <= 35) {
        squares[currentIndex].classList.add('frog-on-log');
    }

    Lose();
    Win();
    // new Audio('sound/kva.mp3').autoplay = true;
}

//move cars
function moveCars() {
    carsLeft.forEach(carLeft => moveCarLeft(carLeft));
    carsRight.forEach(carRight => moveCarRight(carRight));
}
//move car left on a time loop
function moveCarLeft(carLeft) {
    switch (true) {
        case carLeft.classList.contains('c1'):
            carLeft.classList.remove('c1')
            carLeft.classList.add('c2')
            break;
        case carLeft.classList.contains('c2'):
            carLeft.classList.remove('c2')
            carLeft.classList.add('c3')
            break;
        case carLeft.classList.contains('c3'):
            carLeft.classList.remove('c3')
            carLeft.classList.add('c1')
            break;
    }
}
//move car Right on a time loop
function moveCarRight(carRight) {
    switch (true) {
        case carRight.classList.contains('c1'):
            carRight.classList.remove('c1')
            carRight.classList.add('c3')
            break;
        case carRight.classList.contains('c2'):
            carRight.classList.remove('c2')
            carRight.classList.add('c1')
            break;
        case carRight.classList.contains('c3'):
            carRight.classList.remove('c3')
            carRight.classList.add('c2')
            break;
    }
}
//move logs
function moveLogs() {
    logsLeft.forEach(logLeft => moveLogLeft(logLeft));
    logsRight.forEach(logRight => moveLogRight(logRight));
}
//move log left on a time loop
function moveLogLeft(logLeft) {
    switch (true) {
        case logLeft.classList.contains('l1'):
            logLeft.classList.remove('l1')
            logLeft.classList.add('l2')
            break;
        case logLeft.classList.contains('l2'):
            logLeft.classList.remove('l2')
            logLeft.classList.add('l3')
            break;
        case logLeft.classList.contains('l3'):
            logLeft.classList.remove('l3')
            logLeft.classList.add('l4')
            break;
        case logLeft.classList.contains('l4'):
            logLeft.classList.remove('l4')
            logLeft.classList.add('l5')
            break;
        case logLeft.classList.contains('l5'):
            logLeft.classList.remove('l5')
            logLeft.classList.add('l1')
            break;
    }
}
//move log right on a time loop
function moveLogRight(logRight) {
    switch (true) {
        case logRight.classList.contains('l1'):
            logRight.classList.remove('l1')
            logRight.classList.add('l5')
            break;
        case logRight.classList.contains('l2'):
            logRight.classList.remove('l2')
            logRight.classList.add('l1')
            break;
        case logRight.classList.contains('l3'):
            logRight.classList.remove('l3')
            logRight.classList.add('l2')
            break;
        case logRight.classList.contains('l4'):
            logRight.classList.remove('l4')
            logRight.classList.add('l3')
            break;
        case logRight.classList.contains('l5'):
            logRight.classList.remove('l5')
            logRight.classList.add('l4')
            break;
    }
}
//rules for Win
function Win() {
    if (squares[4].classList.contains('frog-on-lawn')) {
        result.innerHTML = 'YOU WIN!'
        $("div").removeClassWild("frog-*"); //remove all 'frog'
        clearInterval(timerId)
        document.removeEventListener('keyup', moveFrog)
    }
}
//ruler to loose
function Lose() {
    if ((currentTime === 0) || (squares[currentIndex].classList.contains('c1')) || (squares[currentIndex].classList.contains('l5')) || (squares[currentIndex].classList.contains('l4'))) {
        result.innerHTML = 'YOU LOSE!'
        $("div").removeClassWild("frog-*"); //remove all 'frog'
        if ((currentIndex >= 45 && currentIndex <= 62)) {
            squares[currentIndex].classList.add('frog-rip-road');
        } else if (currentIndex >= 18 && currentIndex <= 35) {
            squares[currentIndex].classList.add('frog-rip-water');
        } else {
            squares[currentIndex].classList.add('frog-rip')
        }

        clearInterval(timerId)
        document.removeEventListener('keyup', moveFrog)
    }
}
//move the frog when its on the log moving left
function moveWithLogLeft() {
    if (currentIndex >= 27 && currentIndex < 35) {
        $("div").removeClassWild("frog-*");
        currentIndex += 1
        squares[currentIndex].classList.add('frog-on-log')
    }
}

function moveWithLogRight() {
    console.log('+');

    if (currentIndex > 18 && currentIndex <= 26) {
        $("div").removeClassWild("frog-*");
        currentIndex -= 1
        squares[currentIndex].classList.add('frog-on-log')
    }
}

//move all pieces fnd run all functions
function movePieces() {
    timeLeft.textContent = --currentTime
    moveCars();
    moveLogs();

    moveWithLogRight();
    moveWithLogLeft();
    Lose()
}

//start and pause button
// startBtn.addEventListener('click', () => {
//     if (timerId) {
//         clearInterval(timerId)
//         document.removeEventListener('keyup', moveFrog);
//     } else {
//         timerId = setInterval(movePieces, 1000)
//         document.addEventListener('keyup', moveFrog);
//     }
// })

(function start() {
    timerId = setInterval(movePieces, 1000)
    document.addEventListener('keyup', moveFrog);

}())