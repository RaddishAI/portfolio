document.addEventListener("DOMContentLoaded", function() {
    const textElement = document.querySelector('#indexIntro');
    const text = textElement.innerHTML; // Get the original content with HTML
    textElement.innerHTML = ''; // Clear the content for typing effect

    // Create a text container and a cursor element
    const textContainer = document.createElement('span');
    const cursor = document.createElement('span');
    cursor.classList.add('cursor');
    cursor.innerHTML = '|';

    // Append both to the #indexIntro element
    textElement.appendChild(textContainer);
    textElement.appendChild(cursor);

    let index = 0;

    function typeWriter() {
        if (index < text.length) {
            // Handle line breaks separately
            if (text.charAt(index) === '<') {
                if (text.substring(index, index + 4) === '<br>') {
                    textContainer.innerHTML += '<br>';
                    index += 4; // Skip the '<br>' characters
                }
            } else {
                // Add the next character to the text container
                textContainer.innerHTML += text.charAt(index);
                index++;
            }
            setTimeout(typeWriter, 100); // Delay in milliseconds
        }
    }

    // Start the typing effect
    typeWriter();
});