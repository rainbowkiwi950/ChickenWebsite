let score1 = 0; // Score for Quiz 1
let score2 = 0; // Score for Quiz 2
let currentQuestionIndex1 = 0; // Current question index for Quiz 1
let currentQuestionIndex2 = 0; // Current question index for Quiz 2

// Define your quiz questions for both quizzes (make sure to have different questions for each quiz)
const quiz1Questions = [
    {
        question: "How much space does a chicken need in its coop?",
        answers: ["1-2 square feet", "2-3 square feet", "3-4 square feet", "4-5 square feet"],
        correctAnswer: "2-3 square feet"
    },
    {
        question: "What is the best bedding for a chicken coop?",
        answers: ["Wood shavings", "Hay", "Straw", "Sand"],
        correctAnswer: "Wood shavings"
    },
    {
        question: "How often should you clean a chicken coop?",
        answers: ["Once a week", "Every 2 weeks", "Once a month", "Every 6 months"],
        correctAnswer: "Once a week"
    },
    {
        question: "What type of food is best for adult chickens?",
        answers: ["Grain", "Layer feed with calcium", "Seeds", "Fruits"],
        correctAnswer: "Layer feed with calcium"
    },
    {
        question: "What is the most common sign of illness in chickens?",
        answers: ["Feather loss", "Lethargy", "Increased egg production", "Decreased appetite"],
        correctAnswer: "Lethargy"
    },
    {
        question: "Which of the following is a natural way to prevent parasites in chickens?",
        answers: ["Diatomaceous earth", "Chemicals", "Antibiotics", "None of the above"],
        correctAnswer: "Diatomaceous earth"
    },
    {
        question: "How much water should a chicken drink each day?",
        answers: ["1/4 gallon", "1/2 gallon", "1 gallon", "2 gallons"],
        correctAnswer: "1/2 gallon"
    },
    {
        question: "What is the purpose of grit for chickens?",
        answers: ["To help digest food", "To help them sleep", "To make them grow faster", "To clean feathers"],
        correctAnswer: "To help digest food"
    },
    {
        question: "How can you prevent your chickens from pecking each other?",
        answers: ["Provide more food", "Provide more space", "Add toys and distractions", "All of the above"],
        correctAnswer: "All of the above"
    },
    {
        question: "What is the average lifespan of a chicken?",
        answers: ["5-10 years", "1-2 years", "10-15 years", "15-20 years"],
        correctAnswer: "5-10 years"
    },
    {
        question: "How many eggs can a hen lay in a week?",
        answers: ["1-2", "3-4", "5-6", "7-8"],
        correctAnswer: "5-6"
    },
    {
        question: "What do chickens primarily eat?",
        answers: ["Fruit", "Seeds", "Insects", "Grain"],
        correctAnswer: "Grain"
    },


    // Add more questions for quiz1...
];

const quiz2Questions = [
    {
        question: "What is a common symptom of a respiratory infection in chickens?",
        answers: ["Loss of appetite", "Coughing and nasal discharge", "Feather loss", "Limping"],
        correctAnswer: "Coughing and nasal discharge"
    },
    {
        question: "Which of these is a common parasite that affects adult chickens?",
        answers: ["Fleas", "Mites", "Lice", "All of the above"],
        correctAnswer: "All of the above"
    },
    {
        question: "How often should adult chickens be dewormed?",
        answers: ["Every month", "Every 6 months", "Once a year", "Only when symptoms appear"],
        correctAnswer: "Every 6 months"
    },
    {
        question: "What should you do if a chicken has an impacted crop?",
        answers: ["Wait for it to pass naturally", "Massage the crop", "Feed the chicken more food", "Give it water with vinegar"],
        correctAnswer: "Massage the crop"
    },
    {
        question: "Which of the following can cause egg-laying problems in chickens?",
        answers: ["Stress", "Poor diet", "Inadequate lighting", "All of the above"],
        correctAnswer: "All of the above"
    },
    {
        question: "What is the ideal temperature range for adult chickens?",
        answers: ["30°F to 40°F", "45°F to 55°F", "55°F to 75°F", "75°F to 90°F"],
        correctAnswer: "55°F to 75°F"
    },
    {
        question: "What is a common cause of feather loss in adult chickens?",
        answers: ["Poor nutrition", "Moulting", "Stress", "All of the above"],
        correctAnswer: "All of the above"
    },
    {
        question: "What is a sign of bumblefoot in chickens?",
        answers: ["Swollen, red feet", "Excessive pecking at the ground", "Increased egg production", "Fluffed up feathers"],
        correctAnswer: "Swollen, red feet"
    },
    {
        question: "Which disease causes sudden death in adult chickens?",
        answers: ["Marek's Disease", "Avian Influenza", "Coccidiosis", "Gout"],
        correctAnswer: "Avian Influenza"
    },
    {
        question: "What is the recommended diet for adult laying hens?",
        answers: ["Grain-based feed", "High-protein feed", "Layer feed with calcium", "Fruits and vegetables"],
        correctAnswer: "Layer feed with calcium"
    }
];

// Load question for the given quiz number
function loadQuestion(quizNum) {
    let currentQuestion;
    let questionContainer;
    let answersContainer;
    let scoreText;

    if (quizNum === 1) {
        currentQuestion = quiz1Questions[currentQuestionIndex1];
        questionContainer = document.getElementById("question-1");
        answersContainer = document.getElementById("answers-1");
        scoreText = document.getElementById("score-1");
    } else if (quizNum === 2) {
        currentQuestion = quiz2Questions[currentQuestionIndex2];
        questionContainer = document.getElementById("question-2");
        answersContainer = document.getElementById("answers-2");
        scoreText = document.getElementById("score-2");
    }

    questionContainer.textContent = currentQuestion.question;
    answersContainer.innerHTML = '';  // Clear previous answers

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.textContent = answer;
        button.onclick = () => checkAnswer(answer, button, quizNum);
        answersContainer.appendChild(button);
    });
}

// Check answer for the given quiz
function checkAnswer(selectedAnswer, button, quizNum) {
    let currentQuestion;
    let correctAnswer;
    let score;

    if (quizNum === 1) {
        currentQuestion = quiz1Questions[currentQuestionIndex1];
        correctAnswer = currentQuestion.correctAnswer;
        score = score1;
    } else if (quizNum === 2) {
        currentQuestion = quiz2Questions[currentQuestionIndex2];
        correctAnswer = currentQuestion.correctAnswer;
        score = score2;
    }

    // Disable all buttons after answering
    const answerButtons = document.getElementById(`answers-${quizNum}`).getElementsByTagName("button");
    for (let btn of answerButtons) {
        btn.disabled = true;
    }

    if (selectedAnswer === correctAnswer) {
        button.style.backgroundColor = "green";  // Highlight correct answer in green
        score++;
    } else {
        button.style.backgroundColor = "red";  // Highlight wrong answer in red
    }

    // Update the score for the respective quiz
    if (quizNum === 1) {
        score1 = score;
        document.getElementById("score-1").textContent = `Score: ${score1}`;
    } else if (quizNum === 2) {
        score2 = score;
        document.getElementById("score-2").textContent = `Score: ${score2}`;
    }

    document.getElementById(`next-button-${quizNum}`).disabled = false; // Enable "Next" button
}

// Load the next question for the given quiz number
function nextQuestion(quizNum) {
    if (quizNum === 1) {
        currentQuestionIndex1++;
        if (currentQuestionIndex1 < quiz1Questions.length) {
            loadQuestion(1);
            document.getElementById("next-button-1").disabled = true;
        } else {
            alert(`Quiz 1 finished! Final score: ${score1}`);
        }
    } else if (quizNum === 2) {
        currentQuestionIndex2++;
        if (currentQuestionIndex2 < quiz2Questions.length) {
            loadQuestion(2);
            document.getElementById("next-button-2").disabled = true;
        } else {
            alert(`Quiz 2 finished! Final score: ${score2}`);
        }
    }
}

// Initial load for both quizzes
loadQuestion(1); // Load the first question for quiz 1
loadQuestion(2); // Load the first question for quiz 2