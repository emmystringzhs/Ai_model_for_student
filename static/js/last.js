function processUserInput() {
  const userMessage = userInput.value.trim();

  if (userMessage) {
    addMessageToChat('user', userMessage);

    // Start processing animation
    startProcessingAnimation();

    // Send an AJAX request to the server with the user's message
    fetch('/get_response', {
      method: 'POST',
      headers: {// Function to start the processing animation
function startProcessingAnimation() {
  const processingMessage = addMessageToChat('bot', 'Bot: Message is processing...');
  let opacity = 1;

  function fadeIn() {
    opacity += 0.05;
    processingMessage.style.opacity = opacity;

    if (opacity < 1 && !stopAnimation) {
      requestAnimationFrame(fadeIn);
    }
  }

  function fadeOut() {
    opacity -= 0.05;
    processingMessage.style.opacity = opacity;

    if (opacity > 0 && !stopAnimation) {
      requestAnimationFrame(fadeOut);
    } else {
      removeProcessingMessage(processingMessage);
    }
  }

  setTimeout(() => {
    fadeOut();
  }, 5000);

  fadeIn();
}

// Function to remove the processing message from the chat
function removeProcessingMessage(messageBox) {
  messageBox.style.opacity = 0;
  setTimeout(() => {
    messageBox.remove();
  }, 500);
}

        'Content-Type': 'application/json'
      },
      body: JSON.stringify({message: userMessage})
    })
    .then(response => response.json())
    .then(data => {
      // Add the bot's response to the chat history
      addMessageToChat('bot', `Bot: ${data.response}`);
      stopAnimation = true;
    })
    .catch(error => {
      console.error(error);
      stopAnimation = true;
    });

    userInput.value = '';
  }
}
// Function to start the processing animation
function startProcessingAnimation() {
  const processingMessage = addMessageToChat('bot', 'Bot: Message is processing...');
  let opacity = 1;

  function fadeIn() {
    opacity += 0.05;
    processingMessage.style.opacity = opacity;

    if (opacity < 1 && !stopAnimation) {
      requestAnimationFrame(fadeIn);
    }
  }

  function fadeOut() {
    opacity -= 0.05;
    processingMessage.style.opacity = opacity;

    if (opacity > 0 && !stopAnimation) {
      requestAnimationFrame(fadeOut);
    } else {
      removeProcessingMessage(processingMessage);
    }
  }

  setTimeout(() => {
    fadeOut();
  }, 5000);

  fadeIn();
}

// Function to remove the processing message from the chat
function removeProcessingMessage(messageBox) {
  messageBox.style.opacity = 0;
  setTimeout(() => {
    messageBox.remove();
  }, 500);
}
