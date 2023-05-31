// JavaScript code for the chatbot UI
// This assumes you have a function called getResponse() that retrieves the chatbot's response

// Select the form and input elements
const form = document.querySelector('form');
const input = document.querySelector('input[type="text"]');

// Add an event listener to the form submit event
form.addEventListener('submit', (event) => {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Get the user's message from the input element
  const message = input.value;

  // Clear the input element
  input.value = '';

  // Display the user's message in the chat interface
  displayMessage(message, 'user-message');
