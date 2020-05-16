const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressbarfull = document.getElementById("progressbarfull");

//variables
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [];

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
const max_questions = 3;
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