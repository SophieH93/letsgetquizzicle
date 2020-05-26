const diffChoice = document.querySelector( "#difficultySelect" );
const quantChoice = document.querySelector( "#questionSelect" );
const catId = document.querySelector( "#submitCat" );
const game = document.querySelector( "#theGame" );
const question = document.querySelector( "#question" );
const start = document.querySelector( "#ReadyToPlay" );
const catChoice = document.querySelector( "#categoryList" );
const choices = Array.from( document.getElementsByClassName( ".choice-text" ) );
const progressText = document.querySelector( "#progressText" );
const scoreText = document.querySelector( "#score" );
const progressbarfull = document.querySelector( "#progressbarfull" );
const end = document.querySelector( "#gameOver" );

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let questions = [];
let baseUrl = "https://opentdb.com/";
let dataUrl;
let quant;

// Fetches category list from API
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
		let categoryList = category.trivia_categories;
		categoryList.forEach( category => {
			let categoryOption = document.createElement( "option" );
			let categoryName = document.createElement( "p" );
			let name = document.createTextNode( category.name );
			categoryName.appendChild( name );
			categoryOption.appendChild( categoryName );
			categoryOption.id = category.id;
			categoryOption.classList.add( "category" );
			document.getElementById( "categoryList" ).appendChild( categoryOption );
		} );
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
		startGame()
	} ).catch( err => {
		console.log( err );
	} );
}
//constants
const correct_bonus = 10;
const max_questions = 10;
const subtract_value = -2;

startGame = () => {
	questionCounter = 0;
	score = 0;
	availableQuestions = [ ...questions ];
	getNewQuestion();
	game.classList.remove( "hide" );
};
getNewQuestion = () => {
	if ( availableQuestions.length === 0 || questionCounter >= max_questions ) {
		localStorage.setItem( "mostRecentScore", score );
		game.classList.add( "hide" );
		end.classList.remove( "hide" );
		//When game over will go to the end game html
	}
	questionCounter++;
	progressText.innerHTML= `Question ${questionCounter}/${max_questions}`;
	//update progress bar
	progressbarfull.style.width = `${(questionCounter / max_questions) * 100}%`;
	const questionIndex = Math.floor( Math.random() * availableQuestions.length );
	currentQuestion = availableQuestions[ questionIndex ];
	question.innerHTML = currentQuestion.question;
	choices.forEach( choice => {
		const number = choice.dataset[ 'number' ];
		choice.innerHTML = currentQuestion[ 'choice' + number ];
	} );
	// splice will remove the answer we just picked so we are not choosing it again
	availableQuestions.splice( questionIndex, 1 );
	acceptingAnswers = true;
};
choices.forEach( choice => {
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
			console.log( subtract_value )
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
	scoreText.innerText = score;
};
catId.addEventListener( 'click', () => {
	id = catChoice.options[ catChoice.selectedIndex ].id;
	diff = diffChoice.options[ diffChoice.selectedIndex ].id;
	quant = quantChoice.options[ quantChoice.selectedIndex ].id;
	start.classList.add( "hide" );
	getQuiz();
} );
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