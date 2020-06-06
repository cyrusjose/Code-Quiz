var startButton = document.querySelector('#start-btn');
var nextButton = document.querySelector('#next-btn');
var questionContainerEl = document.querySelector('#question-container');
var questions = [
    {
       question: 'what is 2+2',
       answers:  [
           {text: '4', correct: true},
           {text: '6', correct: false},
           {text: '22', correct: false},
           {text: '0', correct: false},
       ]
    }
]
var shuffled, currentQestion


function start() {
    startButton.classList.add('hide');
    questionContainerEl.classList.remove('hide');
    shuffled = question.sort(function () {
        // The range will be from -0.5 to +0.5 and depending on the sign it will be sorted a certain way.
        Math.random() - 0.5;
    })
    next();

}

function next() {

}

function selectAnswer() {

}

startButton.addEventListener('click', start);
nextButton.addEventListener('click', next);
