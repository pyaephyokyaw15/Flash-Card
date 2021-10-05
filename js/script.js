// Get saved notes from local storage. If there is nothing, create an empty array.
let savedQuizzes = JSON.parse(localStorage.getItem("savedQuizzes")) || []; 


// Seletors
const allCards = document.querySelector('#all-cards');
const addQuestionBtn = document.querySelector('#add-question');
const shuffleBtn = document.querySelector('#shuffle');
const newQuestionContainer = document.querySelector('#new-question-container')
const newQuestion = document.querySelector('#new-question');
const newAnswer = document.querySelector('#new-answer');
const questionCard = document.querySelector('#new-question-card');
const questionDiv = document.querySelector('#question-div');
const answerDiv = document.querySelector('#answer-div');



// ------------------------------ Functions -------------------------
// Save Local Storage
function saveLocalQuizzes(quiz){
    savedQuizzes.push(quiz);
    localStorage.setItem('savedQuizzes', JSON.stringify(savedQuizzes));
}


// Remove from Local Storage
function removeLocalQuizzes(quizData){
    quizData += '\n';
    console.log(quizData);
    console.log(savedQuizzes);
    savedQuizzes = savedQuizzes.filter((quiz) => quiz.answer !== quizData && quiz.question !== quizData);
    console.log(savedQuizzes);
    localStorage.setItem('savedQuizzes', JSON.stringify(savedQuizzes));
}


function createQuiz(questionSet) {
    allCards.innerHTML += `
            <div class = 'card'>
                <div class='front'>
                    <i class="fas fa-times-circle remove-btn"></i>
                    <p>${questionSet.question}</p>
                </div>
                <div class='back'>
                    <i class="fas fa-times-circle remove-btn"></i>
                    <p>${questionSet.answer}</p>
                </div>
            </div>      
    `;  
}


// -------------------------- Start --------------------------
// hide question container at first
$('#new-question-container').hide();

// first show quizzessaved in local storage.
savedQuizzes.forEach(createQuiz);

// Pop up question add aera when click add button
addQuestionBtn.addEventListener('click', () => {
    $('#new-question-container').toggle(300);
});

// Add question
newQuestion.addEventListener('keyup', event => {
    if (event.keyCode === 13) {
        questionCard.style.transform =  'rotateY(180deg)';
        questionDiv.style.display = 'none';
        answerDiv.style.display = 'flex';
             
    } 
});

// Add answer
newAnswer.addEventListener('keyup', event => {
    if (event.keyCode === 13) {
        let questionSet = new Object();
        $('#new-question-container').toggle(300);
        questionCard.style.transform =  'rotateY(0deg)';
        questionDiv.style.display = 'flex';
        answerDiv.style.display = 'none';
        questionSet.question = newQuestion.value;
        questionSet.answer = newAnswer.value;
        createQuiz(questionSet);
        saveLocalQuizzes(questionSet);
        // reset value
        newQuestion.value = '';
        newAnswer.value = '';
    } 
});

// Remove Card
allCards.addEventListener('click', event => {
    const removeBtn = event.target;
    if (removeBtn.classList.contains('remove-btn')) {
        $(removeBtn).parent().parent().hide(500);
    } 
    removeLocalQuizzes(removeBtn.parentElement.children[1].innerText);
});

// Shuffle Quizzes
shuffleBtn.addEventListener('click', evenr => {
    // Clear all cards
    allCards.innerHTML = '';

    // Create shuffle arrary of savedQuizzes
    console.log(savedQuizzes);
    let newArr = savedQuizzes.slice();
   
    for (let i = newArr.length - 1; i > 0; i--) {
        const rand = Math.floor(Math.random() * (i + 1));
        [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]];
    }
    
    // Dispaly all arrays
    newArr.forEach(createQuiz);
});


