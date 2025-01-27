    // JavaScript goes here
    
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
          model: 'gpt-3.5-turbo',
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