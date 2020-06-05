const start = document.querySelector("#ReadyToPlay");
const quizCategorySelect = document.querySelector("#categorySelect");
const difficultySelect = document.querySelector("#difficultySelect");
const questionAmountSelect = document.querySelector("#quantChoice");
const submitQuizOptions = document.querySelector("#submitOptions");
const gamePage = document.querySelector("#theGame");
const progressText = document.querySelector("#progressText");
const progressbarfull = document.querySelector("#progressbarfull");
const playersScore = document.querySelector("#score");
const triviaQuestions = document.querySelector("#question");
const answerChoices = Array.from( document.getElementsByClassName("choice-text"));
const QuizEndPg = document.querySelector("#gameOver");
const scoreBoardBtn = document.querySelector("#scoreBoardBtn");
const scoreBoardPg = document.querySelector("#scoreBoard");
const welcome = document.querySelector( "#welcome" );

const username = document.querySelector("#username");
const saveScoreBtn = document.querySelector("#saveScoreBtn");
const finalscore = document.querySelector("#finalscore");
const mostRecentScore = localStorage.getItem("mostRecentScore");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
const highScoresList = document.querySelector("#highScoresList");


const correct_bonus = 10;
const max_questions = 10;
const subtract_value = -2;
const max_high_scores = 5;

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let questions = [];
let baseUrl = "https://opentdb.com/";
let dataUrl;
let quant;

/**
 * 
 * @param {boolen}
 */

// Fetches API from Open Trivia 
const getData = gameTrigger => {
	if ( gameTrigger ) {
		dataUrl = ( `${baseUrl}api.php?amount=${quant}&category=${id}&difficulty=${diff}&type=multiple` );
	} else {
		dataUrl = ( `${baseUrl}api_category.php` );
	}
}
//Gets the categories and pass to DOM
const categories = () => {
	getData( false );
	fetch( dataUrl ).then( response => response.json() ).then( category => {
		let categorySelect = category.trivia_categories;
		categorySelect.forEach( category => {
			let categoryOption = document.createElement( "option" );
			let categoryName = document.createElement( "p" );
			let name = document.createTextNode( category.name );
			categoryName.appendChild( name );
			categoryOption.appendChild( categoryName );
			categoryOption.id = category.id;
			categoryOption.classList.add( "category" );
			document.getElementById( "categorySelect" ).appendChild( categoryOption );
        } );
        welcome.classList.remove("hide");
        start.classList.remove( "hide" );
        
	} ).catch( () => console.error() );
}
categories();

const getQuiz = () =>{
	getData( true );
	fetch( dataUrl ).then( data => data.json() ).then( loadedQuestions => {
		questions = loadedQuestions.results.map( loadedQuestion => {
			const formattedQuestion = {
				question: loadedQuestion.question
			};
			formattedQuestion.answer = Math.floor( Math.random() * 3 ) + 1;
			const answerChoices = [ ...loadedQuestion.incorrect_answers ];
			answerChoices.splice( formattedQuestion.answer - 1, 0, loadedQuestion.correct_answer );
			answerChoices.forEach( ( choice, index ) => {
				formattedQuestion[ 'choice' + ( index + 1 ) ] = choice;
			} );
			return formattedQuestion;
        } );
         welcome.classList.add("hide")
		startGame()
	} ).catch( err => {
		console.log( err );
	} );
}



startGame = () => {
	questionCounter = 0;
	score = 0;
	availableQuestions = [ ...questions ];
	getNewQuestion();
    gamePage.classList.remove( "hide" );
    
};

getNewQuestion = () => {
	if ( availableQuestions.length === 0 || questionCounter >= max_questions ) {
		localStorage.setItem( "mostRecentScore", score );
		gamePage.classList.add( "hide" );
		QuizEndPg.classList.remove( "hide" );
		//When game over will go to the end game html
	}
	questionCounter++;
	progressText.innerHTML= `Question ${questionCounter}/${max_questions}`;
	//update progress bar
	progressbarfull.style.width = `${(questionCounter / max_questions) * 100}%`;
	const questionIndex = Math.floor( Math.random() * availableQuestions.length );
	currentQuestion = availableQuestions[ questionIndex ];
	question.innerHTML = currentQuestion.question;
	answerChoices.forEach( choice => {
		const number = choice.dataset[ 'number' ];
		choice.innerHTML = currentQuestion[ 'choice' + number ];
	} );
	// splice will remove the answer we just picked so we are not choosing it again
	availableQuestions.splice( questionIndex, 1 );
	acceptingAnswers = true;
};

answerChoices.forEach( choice => {
	choice.addEventListener( "click", e => {
		if ( !acceptingAnswers ) return;
		acceptingAnswers = false;
		const selectedChoice = e.target;
		const selectedAnswer = selectedChoice.dataset[ "number" ];
		const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';
		if ( classToApply === "correct" ) {
			incrementScore( correct_bonus );
            
		} else {
			incrementScore( subtract_value );
			console.log( subtract_value );
           swal.fire({
                title: "Wrong Answer!",
                text: `Sorry the correct answer was number ${currentQuestion.answer}!`,
                icon: 'error',
                showConfirmButton: false,
                timer: 1000
           });
        };
		
		selectedChoice.parentElement.classList.add( classToApply );
		//this will add a delay between questions
		setTimeout( () => {
			selectedChoice.parentElement.classList.remove( classToApply );
			getNewQuestion();
		}, 1000 );
	} );
} );
incrementScore = num => {
	score += num;
	playersScore.innerText = score;
};


submitQuizOptions.addEventListener( 'click', () => {
	id = quizCategorySelect.options[ quizCategorySelect.selectedIndex ].id;
	diff = difficultySelect.options[ difficultySelect.selectedIndex ].id;
	quant = questionAmountSelect.options[ questionAmountSelect.selectedIndex ].id;
	start.classList.add( "hide" );
	getQuiz();
} );

/*When scoreboard btn is clicked hide the endGame page and show the scoreboard page */
scoreBoardBtn.addEventListener( 'click', () => {
    QuizEndPg.classList.add( "hide" );
    scoreBoardPg.classList.remove( "hide" );
	
} );

/* High Scores */
highScoresList.innerHTML =
highScores.map(score => {
   return `<li class="high-score">${score.name}- ${score.score}</li>`;
}).join("");

finalscore.innerText = mostRecentScore;

username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value;
    // If no username inputted btn will stay disabled, when username inputted btn becomes visable
})

savingHighScore = e => {
    console.log("clicked the save button");
    e.preventDefault();
    
const score = {
    score: Math.floor(Math.random() * 100),
    name: username.value
};

highScores.push(score);
highScores.sort((a, b) => b.score - a.score)
highScores.splice(5);

localStorage.setItem('highScores', JSON.stringify(highScores));
window.location.assign('/');

};



/**
 * Shows/hides the loading wheel
 * @param {Boolean} loading - True shows loading wheel 
 */
function loadingWheel(loading) {
    if (loading) {
        load.classList.remove("hide");
    } else {
        load.classList.add("hide");
    }
}
/*
//Questions array
var counter = 60;             //Time counter
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