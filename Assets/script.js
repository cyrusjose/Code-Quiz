var startButton = document.querySelector('#start-btn');
var nextButton = document.querySelector('#next-btn');
var getScoreButton = document.querySelector('#score-btn');
var clearButton = document.querySelector('#clear');
var showScore = document.querySelector('#score');
var playerScore = document.querySelector('#player-score');
var questionContainerEl = document.querySelector('#question-container');
var controlPanel = document.querySelector('.controls')
var questionEl = document.querySelector('#question');
var answerButtonsEl = document.querySelector('#answer-buttons');
var submitButtonEl = document.querySelector('#submit');
var homeButtonEl = document.querySelector('#ret');
var timerEl = document.querySelector('#timer');
var timeText = document.querySelector('#time');
var score = 0;
var shuffled, currentQestion;
var questions = [{
    question: 'What does "hsl" stand for?',
    answers: [
        { text: 'Hue, Saturation, Lightness', correct: true },
        { text: 'Hue, Saturation, Limit', correct: false },
        { text: 'Heavy, Saturation, Light', correct: false },
        { text: 'Handed, Saturn, Lemon', correct: false },
    ]
},
{
    question: 'What does the "a" in "hsla" an acronym for?',
    answers: [
        { text: 'Alpine', correct: false },
        { text: 'Allow', correct: false },
        { text: 'Alpha', correct: true },
        { text: 'Aggregate', correct: false },
    ]
},
{
    question: 'What does the "a" in "hsla" mean?',
    answers: [
        { text: 'The Contrast', correct: false },
        { text: 'The Opacity', correct: true },
        { text: 'No Meaning', correct: false },
        { text: 'A variable placeholder', correct: false },
    ]
},
{
    question: 'How do you declare a variable?',
    answers: [
        { text: 'var hello', correct: true },
        { text: 'var hello = 4', correct: false },
        { text: 'var', correct: false },
        { text: 'var 1123.hello= 5', correct: false },
    ]
},
{
    question: 'How do you assign a variable?',
    answers: [
        { text: 'var hello', correct: false },
        { text: 'hello = 4', correct: true },
        { text: 'var', correct: false },
        { text: 'var 1123.hello= 5', correct: false },
    ]
},
{
    question: 'Which of the following is the literal notation for creating objects?',
    answers: [
        { text: 'var hotel = {};', correct: true },
        { text: 'var hotelName = hotel.name', correct: false },
        { text: 'function Hotel() {}', correct: false },
        { text: 'var hotel = []', correct: false },
    ]
},
{
    question: 'Which of the following is the constructor notation for creating objects?',
    answers: [
        { text: 'var hotel = {};', correct: false },
        { text: 'var hotelName = hotel.name', correct: false },
        { text: 'function Hotel() {};', correct: true },
        { text: 'var hotel = []', correct: false },
    ]
},
{
    question: 'Which of the following is NOT a logical operator?',
    answers: [
        { text: '||', correct: false },
        { text: '&&', correct: false },
        { text: '=', correct: true },
        { text: '!', correct: false },
    ]
},
{
    question: 'Which of the following is NOT a mouse event?',
    answers: [
        { text: 'click', correct: false },
        { text: 'mouseover', correct: false },
        { text: 'dblclick', correct: false },
        { text: 'keypress', correct: true },
    ]
},
{
    question: 'Which of the following is commonly used to test your code?',
    answers: [
        { text: 'console.log();', correct: true },
        { text: 'window.location.reload()', correct: false },
        { text: 'forEach()', correct: false },
        { text: 'cout', correct: false },
    ]
},
{
    question: 'Which of the following is used to add content AFTER the selected element?',
    answers: [
        { text: '.before();', correct: false },
        { text: '.append();', correct: false },
        { text: '.prepend();', correct: false },
        { text: '.after();', correct: true },
    ]
},
{
    question: 'Which of the following is used to add content AFTER the closing tag?',
    answers: [
        { text: '.before();', correct: false },
        { text: '.append();', correct: true },
        { text: '.prepend();', correct: false },
        { text: '.after();', correct: false },
    ]
},
{
    question: 'Which of the following is used to add content BEFORE the selected element?',
    answers: [
        { text: '.before();', correct: true },
        { text: '.after();', correct: false },
        { text: '.prepend();', correct: false },
        { text: '.after();', correct: false },
    ]
},
{
    question: 'Which of the following is used to add content BEFORE the opening tag?',
    answers: [
        { text: '.before();', correct: false },
        { text: '.after();', correct: false },
        { text: '.prepend();', correct: true },
        { text: '.after();', correct: false },
    ]
},

]
var sec = 100;
var scoresAndInitials = [];
function initials() {
    playerScore.innerHTML = '';
    for (var i = 0; i < scoresAndInitials.length; i++) {
        var initials = scoresAndInitials[i];
        var li = document.createElement('li');
        li.textContent = 'Player: ' + initials.toUpperCase() + '\n' + 'score: '+ score;
        li.setAttribute('data-index', i);
        playerScore.appendChild(li);
    }
}

function init() {
    var storedInitials = JSON.parse(localStorage.getItem('scoresAndInitials'));

    if (storedInitials !== null) {
        scoresAndInitials = storedInitials;
    }
    initials();
}

function storeInit() {
    localStorage.setItem('scoresAndInitials', JSON.stringify(scoresAndInitials))
}
function showScoreList(e) {
    e.preventDefault();

    var userName = document.querySelector('#userName').value.trim();
    if (userName === ''){
        return;
    }
    scoresAndInitials.push(userName);
    userName.value = '';

    document.querySelector('.score').classList.add('hide');
    document.querySelector('#submit').classList.add('hide');
    document.querySelector('#ret').classList.remove('hide');
    document.querySelector('#clear').classList.remove('hide');
    hideItems();
    reset();
    timeText.remove();
    getScoreButton.remove();
    document.querySelector('#score-list').classList.remove('hide');
    storeInit();
    initials();
}



function setTimer(timer) {
    var timer = setInterval(function() {
        if (sec >= 0) {
            timerEl.innerText = 'Timer: ' + sec + ' seconds';
            sec--;
        } else {
            clearInterval(timer);
            reset();
            getScoreButton.classList.remove('hide');
            timeText.classList.remove('hide');
            timeText.innerText = "Time's Up!";
            hideItems();
        }
    }, 1000);
}

function hideItems() {
    timerEl.classList.add('hide');
    nextButton.classList.add('hide');
    startButton.classList.add('hide');
    questionEl.classList.add('hide');
}

function start() {
    startButton.classList.add('hide');
    questionContainerEl.classList.remove('hide');
    shuffled = questions.sort(function() {
        // The range will be from -0.5 to +0.5 and depending on the sign it will be sorted a certain way.
        Math.random() - 0.5;
    });
    // This is the index number for the current question.
    currentQestion = 0;
    next();
    setTimer();
}

function next() {
    reset();
    displayQuestion(shuffled[currentQestion]);
    currentQestion++;
    document.querySelector('.welcome').classList.add('hide')
    document.querySelector('#sub').classList.add('hide')

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

function selectAnswer(event, timer) {
    const selected = event.target;
    const correct = selected.dataset.correct;
    if (correct) {
        score++;
    } else if (!correct) {
        sec -= 20;
    }
    statClass(document.body, correct);
    // Ensure that what we get back is an array so that we can use forEach to loop through the array.
    Array.from(answerButtonsEl.children).forEach(button => {
        statClass(button, button.dataset.correct);
    });
    // Check to see if the question is the last question
    if (shuffled.length > currentQestion) {
        nextButton.classList.remove('hide')
    } else {
        getScoreButton.classList.remove('hide');
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

function finalScore() {
    document.querySelector('.score').classList.remove('hide');
    document.querySelector('#submit').classList.remove('hide');
    hideItems();
    reset();
    timeText.remove();
    getScoreButton.remove();
    showScore.innerText = 'Your score is: ' + score;
}


startButton.addEventListener('click', start);
nextButton.addEventListener('click', next);
getScoreButton.addEventListener('click', finalScore)
submitButtonEl.addEventListener('click', showScoreList)
homeButtonEl.addEventListener('click', function() {
    window.location.reload();
});
clearButton.addEventListener('click', function() {
    document.querySelector('#player-score').remove();
})

