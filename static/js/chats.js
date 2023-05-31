
// Get the necessary elements from the DOM
const chatHistory = document.querySelector('#chat-history');
const userInput = document.querySelector('.user-input input');
const sendBtn = document.querySelector('.user-input .send-btn');
const helpBtn = document.querySelector('#help-btn');
const getStartedBtn = document.querySelector('#getstarted-btn');
const endBtn = document.querySelector('#end-btn');

// Add event listener to input field
userInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        processUserInput();
    }
});


// Hide the input container by default
userInput.parentNode.style.display = 'none';

// Add event listeners to buttons
// helpBtn.addEventListener('click', function () {
//     // Make a request to the logout URL
//     fetch('http://127.0.0.1:8000/')
//       .then(response => {
//         if (response.ok) {
//           // Redirect to the login page
//           window.location.href = '/';
//         }
//       })
//       .catch(error => {
//         console.error(error);
//       });
//   });

// Add event listeners to buttons vol 2

helpBtn.addEventListener('click', function() {
    fetch('/sign_out')
      .then(response => {
        // Add event listeners to buttons
        if (response.ok) {
          window.location.href = '/';
        } else {
          console.error('Failed to logout');
        }
      })
      .catch(error => {
        console.error(error);
      });
  });


getStartedBtn.addEventListener('click', showInputContainer);
endBtn.addEventListener('click', endConversation);
sendBtn.addEventListener('click', processUserInput);

// Function to show the input container
function showInputContainer() {
    userInput.parentNode.style.display = 'block';
    userInput.focus();
}

// Function to end the conversation
function endConversation() {
    userInput.parentNode.style.display = 'none';
}

// Function to process user input
function processUserInput() {
    const userMessage = userInput.value.trim();

    if (userMessage) {
        addMessageToChat('user', userMessage);
        processMessage(userMessage);
        userInput.value = '';
    }
}

// Function to add a message to the chat
function addMessageToChat(sender, message) {
    const messageBox = document.createElement('div');
    messageBox.classList.add('message');
    messageBox.classList.add(sender === 'user' ? 'user-message' : 'bot-message');
    messageBox.innerHTML = `<p>${message}</p>`;
    chatHistory.appendChild(messageBox);

    // Scroll to the bottom of the chat history
    chatHistory.scrollTop = chatHistory.scrollHeight;
}

// Function to process user's message and get bot response
function processMessage(message) {
    // Add your code to process the user's message here
    // This can be an AJAX request to your server or some other function that
    // returns a response

    // Replace this with your own code to communicate with your chatbot backend
    const botMessage = `Bot: You said "${message}"`;
    setTimeout(() => {
        addMessageToChat('bot', botMessage);
    }, 1000);
}