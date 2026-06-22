/**
 * Why this file exists: JavaScript adds interactivity and dynamic behavior
 * to otherwise static HTML pages. It handles events, manipulates the DOM
 * (Document Object Model), and communicates with APIs.
 */

// Law of Code: Use understandable names for variables
const userProfileContainer = document.getElementById('user-profile');
const fetchUserDataButton = document.getElementById('fetch-data-btn');

/**
 * Why we extract this logic into a separate function:
 * Law of Code: Avoid duplicate codes and instead share code blocks into separate dedicated files/functions.
 * This function is solely responsible for creating the HTML structure for a user,
 * keeping the fetching logic separate.
 *
 * @param {Object} userData - The data object containing user information.
 * @returns {string} The HTML string representing the user.
 */
function generateUserHTML(userData) {
    return `
        <div class="user-card">
            <h2>${userData.name}</h2>
            <p>Email: ${userData.email}</p>
        </div>
    `;
}

/**
 * Why we use async/await and try/catch:
 * To handle asynchronous operations (like network requests) in a synchronous-looking,
 * readable manner. Robust error handling prevents the application from crashing silently.
 *
 * Law of Code: Avoid nesting by inverting and using functions to simplify.
 * Notice how we check for errors and return early, preventing deep nested blocks.
 */
async function handleUserFetchEvent() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users/1');

        // Invert condition to avoid nesting the rest of the function inside an if block
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const userData = await response.json();
        
        // Only executing this if the request was successful
        userProfileContainer.innerHTML = generateUserHTML(userData);

    } catch (error) {
        // Explaining why we log the error: It aids in debugging during development.
        // In a real application, we would also display a user-friendly error message on the UI.
        console.error("Failed to fetch user data:", error);
        
        if (userProfileContainer) {
            userProfileContainer.innerHTML = `<p class="error">Sorry, we couldn't load the user profile.</p>`;
        }
    }
}

// Why we use event listeners:
// To execute logic only when a specific user action occurs, decoupling the HTML from the JS logic.
if (fetchUserDataButton) {
    fetchUserDataButton.addEventListener('click', handleUserFetchEvent);
}
