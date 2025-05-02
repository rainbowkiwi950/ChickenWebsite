// let score1 = 0; // Score for Quiz 1
// let score2 = 0; // Score for Quiz 2
// let currentQuestionIndex1 = 0; // Current question index for Quiz 1
// let currentQuestionIndex2 = 0; // Current question index for Quiz 2

// // Define your quiz questions for both quizzes (make sure to have different questions for each quiz)
// const quiz1Questions = [
//     {
//         question: "How much space does a chicken need in its coop?",
//         answers: ["1-2 square feet", "2-3 square feet", "3-4 square feet", "4-5 square feet"],
//         correctAnswer: "2-3 square feet"
//     },
//     {
//         question: "What is the best bedding for a chicken coop?",
//         answers: ["Wood shavings", "Hay", "Straw", "Sand"],
//         correctAnswer: "Wood shavings"
//     },
//     {
//         question: "How often should you clean a chicken coop?",
//         answers: ["Once a week", "Every 2 weeks", "Once a month", "Every 6 months"],
//         correctAnswer: "Once a week"
//     },
//     {
//         question: "What type of food is best for adult chickens?",
//         answers: ["Grain", "Layer feed with calcium", "Seeds", "Fruits"],
//         correctAnswer: "Layer feed with calcium"
//     },
//     {
//         question: "What is the most common sign of illness in chickens?",
//         answers: ["Feather loss", "Lethargy", "Increased egg production", "Decreased appetite"],
//         correctAnswer: "Lethargy"
//     },
//     {
//         question: "Which of the following is a natural way to prevent parasites in chickens?",
//         answers: ["Diatomaceous earth", "Chemicals", "Antibiotics", "None of the above"],
//         correctAnswer: "Diatomaceous earth"
//     },
//     {
//         question: "How much water should a chicken drink each day?",
//         answers: ["1/4 gallon", "1/2 gallon", "1 gallon", "2 gallons"],
//         correctAnswer: "1/2 gallon"
//     },
//     {
//         question: "What is the purpose of grit for chickens?",
//         answers: ["To help digest food", "To help them sleep", "To make them grow faster", "To clean feathers"],
//         correctAnswer: "To help digest food"
//     },
//     {
//         question: "How can you prevent your chickens from pecking each other?",
//         answers: ["Provide more food", "Provide more space", "Add toys and distractions", "All of the above"],
//         correctAnswer: "All of the above"
//     },
//     {
//         question: "What is the average lifespan of a chicken?",
//         answers: ["5-10 years", "1-2 years", "10-15 years", "15-20 years"],
//         correctAnswer: "5-10 years"
//     },
//     {
//         question: "How many eggs can a hen lay in a week?",
//         answers: ["1-2", "3-4", "5-6", "7-8"],
//         correctAnswer: "5-6"
//     },
//     {
//         question: "What do chickens primarily eat?",
//         answers: ["Fruit", "Seeds", "Insects", "Grain"],
//         correctAnswer: "Grain"
//     },
// ];

// const quiz2Questions = [
//     {
//         question: "What is a common symptom of a respiratory infection in chickens?",
//         answers: ["Loss of appetite", "Coughing and nasal discharge", "Feather loss", "Limping"],
//         correctAnswer: "Coughing and nasal discharge"
//     },
//     {
//         question: "Which of these is a common parasite that affects adult chickens?",
//         answers: ["Fleas", "Mites", "Lice", "All of the above"],
//         correctAnswer: "All of the above"
//     },
//     {
//         question: "How often should adult chickens be dewormed?",
//         answers: ["Every month", "Every 6 months", "Once a year", "Only when symptoms appear"],
//         correctAnswer: "Every 6 months"
//     },
//     {
//         question: "What should you do if a chicken has an impacted crop?",
//         answers: ["Wait for it to pass naturally", "Massage the crop", "Feed the chicken more food", "Give it water with vinegar"],
//         correctAnswer: "Massage the crop"
//     },
//     {
//         question: "Which of the following can cause egg-laying problems in chickens?",
//         answers: ["Stress", "Poor diet", "Inadequate lighting", "All of the above"],
//         correctAnswer: "All of the above"
//     },
//     {
//         question: "What is the ideal temperature range for adult chickens?",
//         answers: ["30°F to 40°F", "45°F to 55°F", "55°F to 75°F", "75°F to 90°F"],
//         correctAnswer: "55°F to 75°F"
//     },
//     {
//         question: "What is a common cause of feather loss in adult chickens?",
//         answers: ["Poor nutrition", "Moulting", "Stress", "All of the above"],
//         correctAnswer: "All of the above"
//     },
//     {
//         question: "What is a sign of bumblefoot in chickens?",
//         answers: ["Swollen, red feet", "Excessive pecking at the ground", "Increased egg production", "Fluffed up feathers"],
//         correctAnswer: "Swollen, red feet"
//     },
//     {
//         question: "Which disease causes sudden death in adult chickens?",
//         answers: ["Marek's Disease", "Avian Influenza", "Coccidiosis", "Gout"],
//         correctAnswer: "Avian Influenza"
//     },
//     {
//         question: "What is the recommended diet for adult laying hens?",
//         answers: ["Grain-based feed", "High-protein feed", "Layer feed with calcium", "Fruits and vegetables"],
//         correctAnswer: "Layer feed with calcium"
//     }
// ];

// // Endpoint for generating quiz questions
// app.post('/generate-questions', async (req, res) => {
//     const { topic } = req.body;

//     // Sample static response for demonstration (you can fetch from GPT or other sources)
//     const questions = (topic === 'health') ? quiz2Questions : quiz1Questions;
    
//     res.json({ questions });
// });

// // Load and display questions
// async function generateQuestions() {
//     const topicSelect = document.getElementById("topic-select");
//     const topic = topicSelect.value;

//     // Fetch questions from the server
//     const response = await fetch('http://localhost:3000/generate-questions', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ topic: topic })
//     });

//     const data = await response.json();
//     console.log(data);
//     displayQuestions(data.questions); // Display questions on the page
// }

// // Display questions on the page
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