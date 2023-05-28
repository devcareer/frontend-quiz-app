// Get references to DOM elements
const questionText = document.getElementById("question-text");
const questionId = document.getElementById("question-id");
const choicesContainer = document.querySelector(".choices--container");
const choices = Array.from(document.querySelectorAll(".choices"));
const summaryContainer = document.getElementById("summary-container");
const mainBtn = document.getElementById("btn--main");
const mainPage = document.getElementById("mainPage");
const quizPage = document.getElementById("quizPage");
const buttonContainer = document.getElementById("btn--container");

mainBtn.addEventListener("click", () => {
  mainPage.style.display = "none";
  quizPage.style.display = "block";
});

// Store quiz data
const quizData = [
  {
    id: 1,
    question: "Which one of these is not like the other one?",
    choices: ["A", "B", "C", "4"],
    answer: 3,
  },
  {
    id: 2,
    question: "Which one of these is not a number?",
    choices: ["1", "2", "3", "A"],
    answer: 3,
  },
  {
    id: 3,
    question: "Choose the odd one?",
    choices: ["Banana", "Dogs", "Monkey", "Cats"],
    answer: 0,
  },
  {
    id: 4,
    question: "Man is to Woman as Cock is to?",
    choices: ["Bird", "Hen", "Kitten", "Rodent"],
    answer: 3,
  },
  {
    id: 5,
    question: "Which one of these is not like the other one?",
    choices: ["USA", "Germany", "Kampala", "Cyprus"],
    answer: 3,
  },
  {
    id: 6,
    question: "What is 2 + 5(8 - 5)?",
    choices: ["17", "54", "71", "45"],
    answer: 0,
  },
  {
    id: 7,
    question: "Choose the odd one?",
    choices: ["P", "Q", "S", "R"],
    answer: 3,
  },
  {
    id: 8,
    question: "How many weeks make a year?",
    choices: ["72", "365", "366", "52"],
    answer: 3,
  },
  {
    id: 9,
    question: "600 minutes equals?",
    choices: ["10hours", "1hours", "6000seconds", "6hours"],
    answer: 0,
  },
];

let currentQuestion = 0;
let score = 0;
let summaryCounter = 0;

// Function to load the current question
function loadQuestion() {
  const currentQuiz = quizData[currentQuestion];

  // Update question text and id
  questionText.textContent = currentQuiz.question;
  questionId.textContent = currentQuiz.id;

  choicesContainer.style.display = "block";
  summaryContainer.style.display = "none";
  // Update choices
  choices.forEach((choice, index) => {
    const choiceText = choice.querySelector(".choices__text");
    choiceText.textContent = currentQuiz.choices[index];
  });
}

function handleChoiceSelection(event) {
  event.stopPropagation();

  const selectedChoice = event.target.closest(".choices");
  const currentQuiz = quizData[currentQuestion];
  const selectedAnswer =
    selectedChoice.querySelector(".choices__text").textContent;

  console.log(score);
  if (selectedAnswer === currentQuiz.choices[currentQuiz.answer]) {
    score++;
    console.log(score);
  }

  // Add a class of "selected" to the chosen choice
  selectedChoice?.classList.add("selected");

  // Disable further selections while transitioning to the next question
  choices.forEach((choice) => {
    choice.removeEventListener("click", handleChoiceSelection);
  });

  // Delay before loading the next question
  setTimeout(() => {
    console.log(currentQuestion);
    currentQuestion++;
    console.log(currentQuestion);

    if (currentQuestion === quizData.length) {
      selectedChoice.classList.remove("selected");
      showSummaryPage();
    } else if (currentQuestion % 4 === 0 && currentQuestion >= 4) {
      selectedChoice.classList.remove("selected");
      showSummaryPage();
    } else {
      selectedChoice.classList.remove("selected");
      loadQuestion();
    }

    // Enable selections for the next question
    choices.forEach((choice) => {
      choice.addEventListener("click", handleChoiceSelection);
    });
  }, 500); // 0.5 second delay
}

// Function to display the summary page
function showSummaryPage() {
  questionText.textContent = "";
  choicesContainer.style.display = "none";
  summaryContainer.style.display = "block";

  // Update the summary page with the details
  summaryContainer.innerHTML = `You have answered ${score} out of ${currentQuestion} correctly
  `;
  if (currentQuestion === quizData.length) {
    buttonContainer.onclick = startNewQuiz;
  } else {
    buttonContainer.onclick = loadQuestion;
  }
}

// Function to handle starting a new quiz
function startNewQuiz() {
  choicesContainer.style.display = "block";
  summaryContainer.style.display = "none";
  score = 0;
  currentQuestion = 0;
  loadQuestion();
}

// Add event listeners to choices
choicesContainer.addEventListener("click", handleChoiceSelection);

// Initial question load
loadQuestion();
