var startButton = document.querySelector('#start-btn');
var nextButton = document.querySelector('#next-btn');
var questionContainerEl = document.querySelector('#question-container');
var questionEl = document.querySelector('#question');
var answerButtonsEl = document.querySelector('#answer-buttons');
var questions = [
    {
        question: 'What is 2+2?',
        answers: [
            { text: '4', correct: true },
            { text: '6', correct: false },
            { text: '22', correct: false },
            { text: '0', correct: false },
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
    reset();
    displayQuestion(shuffled[currentQestion]);
    currentQestion++;

}

function displayQuestion(question) {
    questionEl.innerText = question.question;
    question.answers.forEach(answer => {
        // create buttons using const because it will only apply here. 
        const button = document.createElement('button');
        // Setting text in buttons to what we have in our questions object
        button.innerText = answer.text;
        // adding the class "btn" to the newly created buttons.
        button.classList.add('btn');
        // Check to see if answer is correct
        if (answer.correct) {
            // Add a data attribute to our button with the value of correct
            // This is to check if the selcted answer is correct.
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsEl.appendChild(button);
    });
}
function reset() {
    nextButton.classList.add('hide');
}
function selectAnswer(event) {
    const selected = event.target;
    const correct = selected.dataset.correct;
    statClass(document.body, correct);
    Array.from(answerButtonsEl.children).forEach(button => {
        statClass(button, button.dataset.correct);
    });
    if (shuffled.length > currentQestion + 1) {
        nextButton.classList.remove('hide');
    } else {
        startButton.innerText = 'restart';
        startButton.classList.remove('hide');
    }
}

function statClass(element, correct) {
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('incorrect');
    }
}

startButton.addEventListener('click', start);
nextButton.addEventListener('click', next);
