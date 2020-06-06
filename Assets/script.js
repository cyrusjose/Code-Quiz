var startButton = document.querySelector('#start-btn');
var nextButton = document.querySelector('#next-btn');
var questionContainerEl = document.querySelector('#question-container');


function start() {
    startButton.classList.add('hide');
    questionContainerEl.classList.remove('hide');

}

function next() {

}

function selectAnswer() {

}

startButton.addEventListener('click', start);
nextButton.addEventListener('click', next);
