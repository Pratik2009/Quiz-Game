
const addQuestionBtn = document.getElementById('add-question-btn');
const startQuizBtn = document.getElementById('start-quiz-btn');
const questionInput = document.getElementById('question-input');
const answerInputs = document.querySelectorAll('.answer-input');
const correctAnswerSelect = document.getElementById('correct-answer');
const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const scoreContainer = document.getElementById('score-container');
const scoreValue = document.getElementById('score-value');
const restartBtn = document.getElementById('restart-btn');

let customQuestions = [];
let currentQuestionIndex = 0;
let score = 0;

// Default questions
let questions = [
  {
    question: "What is the capital of France?",
    answers: [
      { text: "Paris", correct: true },
      { text: "London", correct: false },
      { text: "Berlin", correct: false },
      { text: "Madrid", correct: false }
    ]
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { text: "Mars", correct: true },
      { text: "Jupiter", correct: false },
      { text: "Saturn", correct: false },
      { text: "Venus", correct: false }
    ]
  },
  {
    question: "What is the largest ocean on Earth?",
    answers: [
      { text: "Atlantic Ocean", correct: false },
      { text: "Indian Ocean", correct: false },
      { text: "Arctic Ocean", correct: false },
      { text: "Pacific Ocean", correct: true }
    ]
  }
];

// Add custom question to the quiz
addQuestionBtn.addEventListener('click', () => {
  const questionText = questionInput.value;
  const answers = Array.from(answerInputs).map(input => input.value);
  const correctAnswerIndex = parseInt(correctAnswerSelect.value);

  if (questionText && answers.every(answer => answer)) {
    customQuestions.push({
      question: questionText,
      answers: answers.map((text, index) => ({ text, correct: index === correctAnswerIndex }))
    });

    // Reset inputs
    questionInput.value = '';
    answerInputs.forEach(input => input.value = '');
    correctAnswerSelect.value = '0';

    alert("Question added!");
  } else {
    alert("Please fill in all fields.");
  }
});

// Start quiz with default and custom questions
startQuizBtn.addEventListener('click', () => {
  if (questions.length + customQuestions.length > 0) {
    startQuiz();
  } else {
    alert("Please add at least one question.");
  }
});

function startQuiz() {
  // Combine default and custom questions
  const allQuestions = questions.concat(customQuestions);
  
  currentQuestionIndex = 0;
  score = 0;
  document.getElementById('add-question-container').classList.add('hide');
  questionContainer.classList.remove('hide');
  scoreContainer.classList.add('hide');
  
  setNextQuestion(allQuestions);
}

function setNextQuestion(allQuestions) {
  resetState();
  showQuestion(allQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('btn');
    button.addEventListener('click', () => selectAnswer(answer.correct, allQuestions));
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(correct, allQuestions) {
  if (correct) {
    score++;
  }

  if (currentQuestionIndex < allQuestions.length - 1) {
    currentQuestionIndex++;
    setNextQuestion(allQuestions);
  } else {
    showScore();
  }
}

function showScore() {
  questionContainer.classList.add('hide');
  scoreContainer.classList.remove('hide');
  scoreValue.innerText = score;
}

restartBtn.addEventListener('click', () => {
  document.getElementById('add-question-container').classList.remove('hide');
  questionContainer.classList.add('hide');
  scoreContainer.classList.add('hide');
  customQuestions = []; // Clear custom questions for a fresh start
});
