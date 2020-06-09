const start = document.querySelector("#ReadyToPlay");
const quizCategorySelect = document.querySelector("#categorySelect");
const difficultySelect = document.querySelector("#difficultySelect");
const questionAmountSelect = document.querySelector("#quantChoice");
const submitQuizOptions = document.querySelector("#submitOptions");
const gamePage = document.querySelector("#theGame");
const quiteBtn = document.querySelector( "#quitGame");
const questionCount = document.querySelector("#questionCount");
const playersScore = document.querySelector("#score");
const triviaQuestions = document.querySelector("#question");
const answerChoices = Array.from( document.getElementsByClassName("answerChoice"));
const QuizEndPage = document.querySelector("#gameOver");
//const scoreBoardBtn = document.querySelector("#scoreBoardBtn");
//const scoreBoardPage  = document.querySelector("#scoreBoard");
const username = document.querySelector("#username");
//const saveScoreBtn = document.querySelector("#saveScoreBtn");
const finalscore = document.querySelector("#finalscore");
const mostRecentScore = localStorage.getItem("mostRecentScore");
//const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
//const highScoresList = document.querySelector("#highScoresList");
const logoText = document.querySelector( "#logo" );
const scoreBonus = 10;
const subtractPoint = 1;
//const max_high_scores = 5;

let currentQuestion = {};
//let acceptingAnswers = false; //delay user answering until everything is loaded
let score = 0;
let questionCounter = 0; //what q are you on
let availableQuestions = []; //take Q out to gice unique q's
let questions = [];
let baseUrl = "https://opentdb.com/";
let dataUrl;
let quantity;


const homeButton = document.querySelector("#homeBtn");



/**
 * 
 * @param {boolen} triviaAPI
 */

/**
 * Custom URL
 *  
 */ 
const getData = triviaAPI => {
	if (triviaAPI) {
		dataUrl = (`${baseUrl}api.php?amount=${quantity}&category=${id}&difficulty=${diff}&type=multiple`);
	} else {
		dataUrl = (`${baseUrl}api_category.php`);
	}
}

//Gets the categories and pass to DOM
const categories = () => {   
	getData( false );
    fetch( dataUrl )
    .then( response => response.json())
    .then( category => {
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
        logoText.classList.remove("hide");
        start.classList.remove( "hide" );           
	} ).catch( () => console.error() );
}
categories();

/**
 * Retrieves Quiz Data, sorts the data and passes to the DOM
 */
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
         logoText.classList.add("hide")
        startGame()
       
	} ).catch( err => {
		console.log( err );
	} );
}

/**
 * Start Quiz
 */
startGame = () => {
	questionCounter = 0;
    score = 0;
    availableQuestions = [...questions]; //spread operator gathers the full questions from the questions array
    gamePage.classList.remove( "hide" );    
    fetchNewQuestion();
};

/**
 * Pull questions from array & loads new questions when answer is chosen
 * Hightlights right and wrong answers
 * Displays question counter and Score
 */
fetchNewQuestion = () => {    
	if (availableQuestions.length === 0) { 
		localStorage.setItem( "mostRecentScore", score );
		gamePage.classList.add( "hide" );
		QuizEndPage.classList.remove( "hide" );
		
	} else {
	questionCounter++; 
    questionCount.innerHTML= `Question: ${questionCounter}/${quantity}`;
    playersScore.innerHTML= `Score: ${score}`;            
	const questionIndex = Math.floor( Math.random() * availableQuestions.length );
	currentQuestion = availableQuestions[ questionIndex ];
    question.innerHTML = currentQuestion.question;
	answerChoices.forEach( choice => {
		const number = choice.dataset['number'];
		choice.innerHTML = currentQuestion['choice' + number];
	} );
	availableQuestions.splice( questionIndex, 1 );
}};
answerChoices.forEach(choice => {
	choice.addEventListener( "click", event => {
		const selectedAnswerChoice = event.target;
		const selectedAnswer = selectedAnswerChoice.dataset["number"];
		const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';
		if ( classToApply === "correct" ) {
			incrementScore(scoreBonus);            
		} else {
			incrementScore(subtractPoint);
			console.log(subtractPoint);
           swal.fire({
                title: "Wrong Answer!",
                text: `Sorry the correct answer was number ${currentQuestion.answer}!`,
                icon: 'error',
                showConfirmButton: false,
                timer: 1500
           });
        };		
		selectedAnswerChoice.parentElement.classList.add(classToApply);
		setTimeout( () => {
			selectedAnswerChoice.parentElement.classList.remove(classToApply);
			fetchNewQuestion();
		}, 1500 );
	} );
} );
const incrementScore = num => {
	score += num;	
};


submitQuizOptions.addEventListener( 'click', () => {
	id = quizCategorySelect.options[ quizCategorySelect.selectedIndex ].id;
	diff = difficultySelect.options[ difficultySelect.selectedIndex ].id;
	quantity = questionAmountSelect.options[ questionAmountSelect.selectedIndex ].id;
	start.classList.add( "hide" );
	getQuiz();
} );



/**
 * Quite game & return home
 * */

quiteBtn.addEventListener( 'click', () => {
    gamePage.classList.add( "hide" );
    start.classList.remove( "hide" );	
} );

/*When scoreboard btn is clicked hide the endGame page and show the scoreboard page 
scoreBoardBtn.addEventListener( 'click', () => {
    QuizEndPg.classList.add( "hide" );
    scoreBoardPg.classList.remove( "hide" );	
} );*/ 

/**
 * return home
 * */
homeButton.addEventListener( 'click', () => {  
    gameOver.classList.add( "hide" );
    start.classList.remove( "hide" );	    
} );


finalscore.innerText = mostRecentScore;


let counter = 10;

 setInterval(function()  {
    counter--;

    if (counter >= 0) {
        id = document.querySelector('#count');
        id.innerHTML = counter;
    }
     if  (counter === 0) {
            id.innerHTML = 'Times Up!';           
            counter = 10;
            fetchNewQuestion();
           
    } 

}, 1000); 

