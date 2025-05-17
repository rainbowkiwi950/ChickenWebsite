let currentQuestionIndex1 = 0;
let quizQuestions = [];
let score1 = 0;

function showSpinner() {
  const spinner = document.getElementById("loading-spinner");
  spinner.style.opacity = "1";
  spinner.style.pointerEvents = "auto";
}

function hideSpinner() {
  const spinner = document.getElementById("loading-spinner");
  spinner.style.opacity = "0";
  spinner.style.pointerEvents = "none";
}
async function generateQuestions() {
    showSpinner(); // ✅ show spinner before fetch
    const topicSelect = document.getElementById("topic-select");
    const topic = topicSelect.value;

    try {
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

        const data = await response.json();
        console.log("Received data:", data);  // Log the received data for debugging
        quizQuestions = parseQuestions(data);  // Pass the questions to display function

        console.log(quizQuestions);  // Log the parsed questions to verify
        loadQuestion();  // Load the first question
        toggleScreens(); // Switch to quiz screen

    } catch (error) {
        console.error('Error fetching data:', error);
    } finally {
        // Hide the loading spinner once the data is fetched
        hideSpinner(); // ✅ hide spinner after completion
    }
}

function toggleScreens() {
    // Hide the resting screen and show the quiz screen
    document.getElementById("resting-screen").style.display = "none";
    document.getElementById("quiz-container").style.display = "flex";
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
    let correctAnswer = null;
    let expectingQuestion = false;

    for (let line of data) {
        line = line.trim();

        if (line.startsWith("### Question")) {
            // Prepare to capture the question in the next line
            expectingQuestion = true;

            // Save the previous question block
            if (currentQuestion && currentAnswers.length === 4 && correctAnswer) {
                questions.push({
                    question: currentQuestion,
                    answers: currentAnswers,
                    correctAnswer: correctAnswer
                });
            }

            // Reset for the next question
            currentQuestion = null;
            currentAnswers = [];
            correctAnswer = null;
        } else if (expectingQuestion) {
            currentQuestion = line;
            expectingQuestion = false;
        } else if (/^[A-D]\)/.test(line)) {
            currentAnswers.push(line);
        } else if (line.startsWith("**Correct Answer:")) {
            // Extract just the answer text, e.g. from "**Correct Answer: C) Foo**"
            const match = line.match(/\*\*Correct Answer:\s*(.*)\*\*/);
            if (match) {
                correctAnswer = match[1].trim();
            }
        }
    }

    // Push the last question after the loop
    if (currentQuestion && currentAnswers.length === 4 && correctAnswer) {
        questions.push({
            question: currentQuestion,
            answers: currentAnswers,
            correctAnswer: correctAnswer
        });
    }

    return questions;
}

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
        button.style.backgroundColor = "blue";
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