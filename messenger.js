


document.addEventListener("DOMContentLoaded", () => {
    const sendButton = document.getElementById('send-button');
    const userInput = document.getElementById('user-input');
    const messagesContainer = document.getElementById('messages');

    // Function to add a message to the chat
    function addMessage(content, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', sender);
        messageDiv.textContent = content;
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight; // Auto-scroll to bottom
    }

    // Function to send the user's input and process the message
    async function sendMessage() {
        const userMessage = userInput.value.trim();
        if (!userMessage) return;

        // Add the user's message to the chat
        addMessage(userMessage, 'user');
        userInput.value = ''; // Clear the input field


        try {
            const response = await fetch("http://localhost:3000/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: userMessage }),
            });

            const data = await response.json();
            addMessage(data.choices[0].message.content, "bot");
        } catch (error) {
            console.error("Error:", error);
            addMessage("Error fetching response.", "bot");
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
});
