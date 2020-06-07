var startButton = document.querySelector('#start-btn');
var nextButton = document.querySelector('#next-btn');
var questionContainerEl = document.querySelector('#question-container');
var questionEl = document.querySelector('#question');
var answerButtonsEl = document.querySelector('#answer-buttons');
var timerEl = document.querySelector('#timer');
var questions = [{
        question: 'What is 2+2?',
        answers: [
            { text: '4', correct: true },
            { text: '6', correct: false },
            { text: '22', correct: false },
            { text: '0', correct: false },
        ]
    },
    {
        question: 'What is 3+2?',
        answers: [
            { text: '4', correct: false },
            { text: '6', correct: false },
            { text: '5', correct: true },
            { text: '0', correct: false },
        ]
    }
]
var shuffled, currentQestion;

function timer() {
    var sec = 30;
    var timer = setInterval(function() {
        timerEl.innerText = 'Timer: ' + sec + ' seconds';
        sec--;
        if (sec < 0) {
            clearInterval(timer);
            timerEl.innerText = 'Time\'s up';

        }
    }, 1000);

}

function start() {
    timer();
    startButton.classList.add('hide');
    questionContainerEl.classList.remove('hide');
    shuffled = questions.sort(function() {
        // The range will be from -0.5 to +0.5 and depending on the sign it will be sorted a certain way.
        Math.random() - 0.5;
    });
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

function selectAnswer(event) {
    const selected = event.target;
    const correct = selected.dataset.correct;
    statClass(document.body, correct);
    // Ensure that what we get back is an array so that we can use forEach to loop through the array.
    Array.from(answerButtonsEl.children).forEach(button => {
        statClass(button, button.dataset.correct);
    });
    // Check to see if the question is the last question
    if (shuffled.length > currentQestion) {
        nextButton.classList.remove('hide');
    } else {
        startButton.innerText = 'restart';
        startButton.classList.remove('hide');
    }
}

function statClass(element, correct) {
    clearStat(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('incorrect');
    }
}

function clearStat(element) {
    element.classList.remove('correct');
    element.classList.remove('incorrect');
}

function reset() {
    clearStat(document.body);
    nextButton.classList.add('hide');
    while (answerButtonsEl.firstChild) {
        answerButtonsEl.removeChild(answerButtonsEl.firstChild);
    }
}

startButton.addEventListener('click', start);
nextButton.addEventListener('click', next);