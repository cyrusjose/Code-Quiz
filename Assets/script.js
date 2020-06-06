var startButton = document.querySelector('#start-btn');
var nextButton = document.querySelector('#next-btn');
var questionContainerEl = document.querySelector('#question-container');
var questionEl = document.querySelector('#question');
var answerButtonEl = document.querySelector('#answer-buttons');
var questions = [
    {
       question: 'What is 2+2?',
       answers: [
           {text: '4', correct: true},
           {text: '6', correct: false},
           {text: '22', correct: false},
           {text: '0', correct: false},
       ]
    }
]
var shuffled, currentQestion;


function start() {
    startButton.classList.add('hide');
    questionContainerEl.classList.remove('hide');
    shuffled = questions.sort(function () {
        // The range will be from -0.5 to +0.5 and depending on the sign it will be sorted a certain way.
        Math.random() - 0.5;
    })
    // This is the index number for the current question.
    currentQestion = 0;
    next();

}

function next() {
    displayQuestion(shuffled[currentQestion])
}

function displayQuestion(question) {
 questionEl.innerText = question.question;
}

function selectAnswer() {

}

startButton.addEventListener('click', start);
nextButton.addEventListener('click', next);
