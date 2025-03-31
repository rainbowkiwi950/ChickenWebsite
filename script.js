
import axios from 'axios';
const API_URL = "https://api.openai.com/v1";


const OPENAI_API_KEY = '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'; // Replace with your API key

const sendButton = document.getElementById('send-button');
const userInput = document.getElementById('user-input');
const messagesContainer = document.getElementById('messages');

// Function to add a message to the chat
function addMessage(content, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender);
    messageDiv.textContent = content;
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight; // Auto-scroll to the bottom
}

async function uploadFile(filePath) {
	try {
    	const response = await axios.post(`${API_URL}/files`, fs.createReadStream(filePath), {
        	headers: {
            	"Authorization": `Bearer ${OPENAI_API_KEY}`,
            	"Content-Type": "multipart/form-data"
        	},
        	params: { purpose: "assistants" }
    	});
    	return response.data.id;
	} catch (error) {
    	console.error("Error uploading file:", error);
    	return null;
	}
}

(async () => {
	const fileId = await uploadFile("Chicken_Information.pdf");
	if (fileId) {
    	const response = await callGPTWithFile(fileId);
    	console.log("ChickenGPT Response:", response);
	}
})();



// Function to send the user's input to OpenAI and get a response
async function sendMessage() {
    const userMessage = userInput.value.trim();
    if (!userMessage) return;


    
    // Add the user's message to the chat
    addMessage(userMessage, 'user');
    userInput.value = ''; // Clear the input field

    // Send the message to OpenAI
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [{ role: 'user', content: userMessage }],
        }),
    });

    if (response.ok) {
        const data = await response.json();
        const aiMessage = data.choices[0].message.content;
        addMessage(aiMessage, 'ai'); // Add AI's response to the chat
    } else {
        addMessage('Error: Unable to fetch response.', 'ai');
    }
}

// Add event listener to the send button
sendButton.addEventListener('click', sendMessage);

// Allow pressing "Enter" to send a message
userInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        sendMessage();
    }
});


