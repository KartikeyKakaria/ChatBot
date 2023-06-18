const chatLog = document.getElementById('chat-log');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');

const GPT_API_URL = 'https://api.openai.com/v1/chat/completions'; // ChatGPT API endpoint
const API_KEY = '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'; // Replace with your actual API key
const MODEL_NAME = 'gpt-3.5-turbo'; // Specify the model name or ID

// Function to display a message in the chat log
function displayMessage(sender, message) {
  const messageContainer = document.createElement('div');
  messageContainer.classList.add('message', sender);
  messageContainer.textContent = message;
  chatLog.appendChild(messageContainer);
  chatLog.scrollTop = chatLog.scrollHeight; // Auto-scroll to the bottom
}

// Function to generate a response from the AI
async function generateResponse(userMessage) {
  try {
    const response = await fetch(GPT_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: userMessage }
        ],
        model: MODEL_NAME
      })
    });

    const data = await response.json();
    const chatbotReply = data.choices[0].message.content;
    return chatbotReply;
  } catch (error) {
    console.error('Error:', error);
    return 'I apologize, but I encountered an error. Please try again.';
  }
}

// Function to handle user input and generate a response
async function handleUserInput() {
  const userMessage = userInput.value.trim();

  if (userMessage === '') {
    return;
  }

  displayMessage('user', `You: ${userMessage}`);
  userInput.value = '';

  const chatbotReply = await generateResponse(userMessage);
  displayMessage('chatbot', `ChatBot: ${chatbotReply}`);
}

// Event listeners
sendButton.addEventListener('click', handleUserInput);
userInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    handleUserInput();
  }
});
