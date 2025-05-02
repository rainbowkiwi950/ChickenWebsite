let currentQuestionIndex1 = 0;
let quizQuestions = [];
let score1 = 0;

async function generateQuestions() {
    const topicSelect = document.getElementById("topic-select");
    const topic = topicSelect.value;
    const loadingSpinner = document.getElementById("loading-spinner");

    loadingSpinner.style.display = "block"; // Show loading spinner

    try {
        let attempts = 0;
        let data;
        // Loop to retry fetching questions until 5 are returned
        // while (attempts < 5) {
            const response = await fetch('http://localhost:3000/generate-questions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ topic: topic })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            data = await response.json();
            quizQuestions = parseQuestions(data);  // Pass the questions to display function

            // Check if we have at least 5 questions, if so break out of the loop
            // if (quizQuestions.length >= 5) {
            //     break;
            // }

            attempts++;
        // }

        // // If attempts reached limit and less than 5 questions, alert the user
        // if (quizQuestions.length < 5) {
        //     alert('Unable to fetch 5 questions. Please try again later.');
        //     return;
        // }

        console.log(quizQuestions);  // Log the parsed questions to verify
        loadQuestion();  // Load the first question
        toggleScreens(); // Switch to quiz screen

    } catch (error) {
        console.error('Error fetching data:', error);
    } finally {
        // Hide the loading spinner once the data is fetched
        loadingSpinner.style.display = "none";
    }
}

function toggleScreens() {
    // Hide the resting screen and show the quiz screen
    document.getElementById("resting-screen").style.display = "none";
    document.getElementById("quiz-container").style.display = "block";
}

function endQuiz() {
    // Show the resting screen and hide the quiz screen
    document.getElementById("resting-screen").style.display = "block";
    document.getElementById("quiz-container").style.display = "none";
    document.getElementById("next-button-1").textContent = "Done"; // Change Next button to Done

    alert(`Quiz 1 finished! Final score: ${score1}`);

    // Reset the quiz state for the next session
    currentQuestionIndex1 = 0;
    score1 = 0;
    document.getElementById("score-1").textContent = `Score: ${score1}`;
}

function parseQuestions(data) {
    let questions = [];
    let currentQuestion = null;
    let currentAnswers = [];

    for (let line of data) {
        if (line.startsWith("### Question")) {
            if (currentQuestion) {
                questions.push({
                    question: currentQuestion,
                    answers: currentAnswers,
                    correctAnswer: currentAnswers[0] // Assuming the first answer is correct
                });
            }
            currentQuestion = null;
            currentAnswers = [];
        } else if (line.startsWith("What")) {
            currentQuestion = line.trim();
        } else if (line.startsWith("A)") || line.startsWith("B)") || line.startsWith("C)") || line.startsWith("D)")) {
            currentAnswers.push(line.trim());
        }
    }

    // Add the last question after the loop
    if (currentQuestion) {
        questions.push({
            question: currentQuestion,
            answers: currentAnswers,
            correctAnswer: currentAnswers[0] // Assuming the first answer is correct
        });
    }

    return questions;
}

// Display questions (this function is now commented out as we are using loadQuestion instead)
// function displayQuestions(questions) {
//     const questionContainer = document.getElementById("question-container");
//     questionContainer.innerHTML = ''; // Clear previous questions

//     questions.forEach(question => {
//         const questionElem = document.createElement('p');
//         questionElem.textContent = question.question; // Display the question text

//         questionContainer.appendChild(questionElem);  // Add question to container
        
//         // Create answer options
//         const answersContainer = document.createElement('div');
//         question.answers.forEach(answer => {
//             const answerButton = document.createElement('button');
//             answerButton.textContent = answer;
//             answersContainer.appendChild(answerButton);
//         });
        
//         questionContainer.appendChild(answersContainer);  // Add answers to the question
//     });
// }

// Check answer for the given quiz
function checkAnswer(selectedAnswer, button) {
    let currentQuestion = quizQuestions[currentQuestionIndex1];
    let correctAnswer = currentQuestion.correctAnswer;
    let score = score1;

    // Disable all buttons after answering
    const answerButtons = document.getElementById("answers-1").getElementsByTagName("button");
    for (let btn of answerButtons) {
        btn.disabled = true;
    }

    if (selectedAnswer === correctAnswer) {
        button.style.backgroundColor = "green";  // Highlight correct answer in green
        score++;
    } else {
        button.style.backgroundColor = "red";  // Highlight wrong answer in red
    }

    // Update the score for the quiz
    score1 = score;
    document.getElementById("score-1").textContent = `Score: ${score1}`;

    // Enable "Next" button
    document.getElementById("next-button-1").disabled = false; // Directly target the button for quiz 1
}

// Load question for the given quiz number
function loadQuestion() {
    let currentQuestion = quizQuestions[currentQuestionIndex1];
    const questionContainer = document.getElementById("question-1");
    const answersContainer = document.getElementById("answers-1");

    questionContainer.textContent = currentQuestion.question;
    answersContainer.innerHTML = '';  // Clear previous answers

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.textContent = answer;
        button.onclick = () => checkAnswer(answer, button); // Attach the correct click handler
        button.classList.add("answer-btn");
        answersContainer.appendChild(button);
    });
}

function nextQuestion() {
    currentQuestionIndex1++;

    if (currentQuestionIndex1 < quizQuestions.length) {
        loadQuestion();
        document.getElementById("next-button-1").disabled = true;
    } else {
        endQuiz(); // End the quiz and show the resting screen
    }
}




// function displayQuestions(questions) {
//     const questionContainer = document.getElementById("question-container");
//     questionContainer.innerHTML = '';  // Clear previous questions
//     console.log(questions);  // Log the parsed questions to check the structure
//     // Check if questions is a valid array
//     if (Array.isArray(questions) && questions.length > 0) {
//         questions.map(question => {
//             const questionElem = document.createElement('p');
//             questionElem.textContent = question.question;
//             questionContainer.appendChild(questionElem);
//         });
//     } else {
//         // If no valid questions or empty array, display an error message
//         const errorElem = document.createElement('p');
//         errorElem.textContent = "No questions found or invalid format!";
//         questionContainer.appendChild(errorElem);
//     }
// }