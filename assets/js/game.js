const question = document.getElementById("question");

const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressbarfull = document.getElementById("progressbarfull");

const game = document.getElementById("theGame");
const diffChoice = document.getElementById("difficultySelect");
const catChoice = document.getElementById("categoryList");
const catId = document.getElementById("submitCat");
const quantChoice = document.getElementById("questionSelect");
const start = document.getElementById("ReadyToPlay");

//variables
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = []; 

let questions = []; 
let base_URL = "https://opentdb.com/";

// Fetches category list from API
function getData(gameTrigger) {
    if (gameTrigger) {
        dataUrl = (`${base_URL}api.php?amount=${quant}&category=${id}&difficulty=$`);
    } else {
        dataUrl = (`${base_URL}api_category.php`);
    }
}

//Gets the categories and pass to DOM
function categories() {
    getData(false);
    fetch(dataUrl)
        .then(response => response.json())
        .then(category => {
            let categoryList = category.trivia_categories;
            categoryList.forEach(category => {

                let categoryOption = document.createElement("option");
                let categoryName = document.createElement("p");
                let name = document.createTextNode(category.name);

                categoryName.appendChild(name);
                categoryOption.appendChild(categoryName);
                categoryOption.id = category.id;
                categoryOption.classList.add("category");
                document.getElementById("categoryList").appendChild(categoryOption);
            });
        })
        .catch(() => console.error());
}

categories();


catId.addEventListener('click', () => {
    id = catChoice.options[catChoice.selectedIndex].id;
    diff = diffChoice.options[diffChoice.selectedIndex].id;
    quant = quantChoice.options[quantChoice.selectedIndex].id;
    start.classList.add("hide");
    getQuiz();
}); 



/*
const generateURL = (numberOfQuestions,catID, difficulty='') =>  {
	let myCustomURL = `https://opentdb.com/api.php?amount=${numberOfQuestions}&category=${catID}&type=boolean&difficulty=${difficulty}`;
	fetch(myCustomURL).then(res => res.json()).then(results => console.log(results));
}
generateURL(15, 23, "medium")

*/


fetch("https://opentdb.com/api.php?amount=10&category=14&difficulty=easy&type=multiple")
  .then(res => {
    return res.json();
  })
  .then(loadedQuestions => {
    console.log(loadedQuestions.results);
    questions = loadedQuestions.results.map(loadedQuestion => {
        const formattedQuestion = {
            question: loadedQuestion.question
        };

        const answerChoices = [...loadedQuestion.incorrect_answers];
        formattedQuestion.answer = Math.floor(Math.random() * 3) +1;
        answerChoices.splice(formattedQuestion.answer -1, 0, loadedQuestion.correct_answer);
        
        answerChoices.forEach((choice, index) => {
            formattedQuestion['choice' + (index +1)] = choice;
        });
        return formattedQuestion;
    });
    startGame()
  })
  .catch(err => {
      console.log(err);
  });

  


//constants
const correct_bonus = 10;
const max_questions = 10;
const subtract_value = -5; 

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
};

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter >= max_questions) {
        localStorage.setItem("mostRecentScore", score);
        return window.location.assign("#endgame");
    //When game over will go to the end game html
    }

    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${max_questions}`;
    //update progress bar
    progressbarfull.style.width = `${(questionCounter / max_questions) * 100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
        currentQuestion = availableQuestions[questionIndex];
        question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    // splice will remove the answer we just picked so we are not choosing it again
    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
    };

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if(!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        const classToApply = selectedAnswer == currentQuestion.answer ? 'correct': 'incorrect';
        
        if (classToApply === "correct") {
            incrementScore(correct_bonus);
         }  else {
             incrementScore(subtract_value);
             console.log(subtract_value)
            };

        selectedChoice.parentElement.classList.add(classToApply);

        //this will add a delay between questions
         setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
            }, 1000);
        });
});

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};


/*Countdown Timer

//Questions array
var counter = 10;             //Time counter
var questionsCount = 0;       //Questions counter

questionDivId =  document.getElementById('questions');
setInterval(function () {
    counter--;
    if (counter >= 0) {
        id = document.getElementById('count');
        id.innerHTML = counter;
    }
    if (counter === 0) {
        id.innerHTML = 'Times Up!';
        counter = 10;
        questionsCount++;
    } 
    
    //To check if all questions are completed or not
    if (questionsCount === questions.length){
        questionDivId.innerHTML = "Well Played! Game is over";
        id.innerHTML = "";
    } else{
        questionDivId.innerHTML = questions[questionsCount];
    }   
}, 1000);

//To go to the next question
function goToNextQuestion() {
    questionsCount++;
    counter = 10;
} */
