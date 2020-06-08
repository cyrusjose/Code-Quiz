var startButton = document.querySelector('#start-btn');
var nextButton = document.querySelector('#next-btn');
var getScoreButton = document.querySelector('#score-btn');
var showScore = document.querySelector('#score');
var questionContainerEl = document.querySelector('#question-container');
var controlPanel = document.querySelector('.controls')
var questionEl = document.querySelector('#question');
var answerButtonsEl = document.querySelector('#answer-buttons');
var submitButtonEl = document.querySelector('#submit');
var homeButtonEl = document.querySelector('#ret');
var timerEl = document.querySelector('#timer');
var timeText = document.querySelector('#time');
var playerName = localStorage.getItem('User Name');
var scoreValue = localStorage.getItem('Score');
var score = 0;
var shuffled, currentQestion;
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
var sec = 100;

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
    setTimer();
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
        // nextButton.classList.remove('hide');
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

function showScoreList(e) {
    e.preventDefault();
    document.querySelector('.score').classList.add('hide');
    document.querySelector('#submit').classList.add('hide');
    document.querySelector('#ret').classList.remove('hide');
    hideItems();
    reset();
    timeText.remove();
    getScoreButton.remove();
    document.querySelector('#score-list').classList.remove('hide');
    var player = document.querySelector('#player-score');
    var userName = document.querySelector('#userName').value;
    player.innerText = 'Player: ' + userName.toUpperCase() + '\n' + 'Score: ' + score;
    homeButtonEl.addEventListener('click', function() {
        window.location.reload();
    });
}

// var todos = [];

// init();

// function renderTodos() {
//   // Clear todoList element and update todoCountSpan
//   todoList.innerHTML = "";
//   todoCountSpan.textContent = todos.length;

//   // Render a new li for each todo
//   for (var i = 0; i < todos.length; i++) {
//     var todo = todos[i];

//     var li = document.createElement("li");
//     li.textContent = todo;
//     li.setAttribute("data-index", i);

//     var button = document.createElement("button");
//     button.textContent = "Complete";

//     li.appendChild(button);
//     todoList.appendChild(li);
//   }
// }

// function init() {
//   // Get stored todos from localStorage
//   // Parsing the JSON string to an object
//   var storedTodos = JSON.parse(localStorage.getItem("todos"));

//   // If todos were retrieved from localStorage, update the todos array to it
//   if (storedTodos !== null) {
//     todos = storedTodos;
//   }

//   // Render todos to the DOM
//   renderTodos();
// }

// function storeTodos() {
//   // Stringify and set "todos" key in localStorage to todos array
//   localStorage.setItem("todos", JSON.stringify(todos));
// }

// // When form is submitted...
// todoForm.addEventListener("submit", function(event) {
//   event.preventDefault();

//   var todoText = todoInput.value.trim();

//   // Return from function early if submitted todoText is blank
//   if (todoText === "") {
//     return;
//   }

//   // Add new todoText to todos array, clear the input
//   todos.push(todoText);
//   todoInput.value = "";

//   // Store updated todos in localStorage, re-render the list
//   storeTodos();
//   renderTodos();
// });

// // When a element inside of the todoList is clicked...
// todoList.addEventListener("click", function(event) {
//   var element = event.target;

//   // If that element is a button...
//   if (element.matches("button") === true) {
//     // Get its data-index value and remove the todo element from the list
//     var index = element.parentElement.getAttribute("data-index");
//     todos.splice(index, 1);

//     // Store updated todos in localStorage, re-render the list
//     storeTodos();
//     renderTodos();
//   }
// });


startButton.addEventListener('click', start);
nextButton.addEventListener('click', next);
getScoreButton.addEventListener('click', finalScore)
submitButtonEl.addEventListener('click', showScoreList)