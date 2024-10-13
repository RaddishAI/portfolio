document.addEventListener("DOMContentLoaded", function() {
    const textElement = document.querySelector('#indexIntro');
    const originalText = textElement.innerHTML; 
    textElement.innerHTML = ''; 

    const textContainer = document.createElement('span');
    const cursor = document.createElement('span');
    cursor.classList.add('cursor');
    cursor.innerHTML = '|';

    textElement.appendChild(textContainer);
    textElement.appendChild(cursor);

    function typeWriter(text, container, delay = 100) {
        let index = 0;

        function type() {
            if (index < text.length) {
                if (text.charAt(index) === '<' && text.substring(index, index + 4) === '<br>') {
                    container.innerHTML += '<br>';
                    index += 4;
                } else {
                    container.innerHTML += text.charAt(index);
                    index++;
                }
                setTimeout(type, delay);
            }
        }

        type();
    }

    typeWriter(originalText, textContainer, 100);
});

/* meny toggle ting */

document.addEventListener("DOMContentLoaded", function() {
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');

    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('show'); // Toggles the 'show' class on the ul
    });
});