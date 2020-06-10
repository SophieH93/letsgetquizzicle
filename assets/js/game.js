const quizSelectOptions = document.querySelector("#ReadyToPlay");
const quizCategorySelect = document.querySelector("#categorySelect");
const difficultySelect = document.querySelector("#difficultySelect");
const questionAmountSelect = document.querySelector("#quantChoice");
const submitQuizOptions = document.querySelector("#submitOptions");
const gamePage = document.querySelector("#theGame");
const quiteBtn = document.querySelector( "#quitGame");
const questionCount = document.querySelector("#questionCount");
const playersScore = document.querySelector("#score");
const answerChoices = Array.from( document.getElementsByClassName("answerChoice"));
const QuizEndPage = document.querySelector("#gameOver");
const username = document.querySelector("#username");
const finalscore = document.querySelector("#finalscore");
const mostRecentScore = localStorage.getItem("mostRecentScore");
//const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
//const highScoresList = document.querySelector("#highScoresList");
const logoText = document.querySelector( "#logo" );
const scoreBonus = 10;
const subtractPoint = -1;


let currentQuestion = {};
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
const getData = triviaAPI =>  {
	if (triviaAPI) {
		dataUrl = (`${baseUrl}api.php?amount=${quantity}&category=${categoryList}&difficulty=${levelDifficulty}&type=multiple`);
	} else {
		dataUrl = (`${baseUrl}api_category.php`);
	}
}


/**
 * Fetches the categories from the API and passes to the DOM
 */
const apiCategories = () => {   
	getData(false);
    fetch(dataUrl)
    .then(response => response.json())
    .then(category => {
		let categorySelect = category.trivia_categories;
		categorySelect.forEach(category => {
		    let categoryOption = document.createElement("option");
			let categoryHeadings = document.createElement("p");
			let categoryName = document.createTextNode(category.name);
			categoryHeadings.appendChild(categoryName);
			categoryOption.appendChild(categoryHeadings);
			categoryOption.id = category.id;
			categoryOption.classList.add("category");
			document.getElementById("categorySelect").appendChild(categoryOption);
        } );        
        quizSelectOptions.classList.remove("hide");   
          
    } )
    .catch( () => console.error() );
}
apiCategories();

/**
 * Pulls questions from the api & Formats the questions and answers
 */
const getQuiz = () =>{    
getData(true);
    fetch(dataUrl)
    .then(data => data.json() )
    .then(loadedApiQuestions => {
		questions = loadedApiQuestions.results.map(loadedQuestion => {
			const formatQuestion = {
				question: loadedQuestion.question
			};
			formatQuestion.answer = Math.floor( Math.random() * 3 ) + 1;
			const answerSelectChoice = [...loadedQuestion.incorrect_answers];
			answerSelectChoice.splice(formatQuestion.answer - 1, 0, loadedQuestion.correct_answer);
			answerSelectChoice.forEach((choice, index) => {
				formatQuestion['choice' + (index + 1)] = choice;
			} );
			return formatQuestion;
        } );
      
         logoText.classList.add("hide");
        startGame()
       
	} ).catch( err => {
		console.error( err );
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
finalscore.innerText = mostRecentScore;

submitQuizOptions.addEventListener( 'click', () => {
	categoryList = quizCategorySelect.options[ quizCategorySelect.selectedIndex ].id;
	levelDifficulty = difficultySelect.options[ difficultySelect.selectedIndex ].id;
	quantity = questionAmountSelect.options[ questionAmountSelect.selectedIndex ].id;
	quizSelectOptions.classList.add( "hide" );
	getQuiz();
} );

quiteBtn.addEventListener('click', () => {
    gamePage.classList.add("hide");
    quizSelectOptions.classList.remove("hide");	
    logoText.classList.remove("hide");
} );

homeButton.addEventListener('click', () => {  
    QuizEndPage.classList.add("hide");
    logoText.classList.remove("hide");  
    quizSelectOptions.classList.remove("hide");	      
} );






