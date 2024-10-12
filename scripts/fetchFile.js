const apiUrl = 'https://portfolio.raddishai.no/wp-json/wp/v2/webpage';

let webpageData = null;

// Fetch data from the API
async function fetchData() {
    try {
        const response = await fetch(apiUrl);
        webpageData = await response.json();
        console.log("Data successfully stored in the webpageData variable: ", webpageData);
        console.log(`Total entries fetched: ${webpageData.length}`);
        generateCards();  // Call the function to generate cards after data is fetched
    } catch (error) {
        console.error('Error fetching data: ', error);
    }
}

// Fetch image URL based on image ID
async function fetchImageUrl(imageId) {
    try {
        console.log(`Fetching image URL for image ID: ${imageId}`);
        const mediaResponse = await fetch(`https://portfolio.raddishai.no/wp-json/wp/v2/media/${imageId}`);
        const mediaData = await mediaResponse.json();
        console.log(`Image data for ID ${imageId}: `, mediaData);
        return mediaData.source_url;  // Return the URL of the image
    } catch (error) {
        console.error('Error fetching image URL: ', error);
        return null;  // Return null if there's an error
    }
}

// Async function to generate the cards
async function generateCards() {
    const mainContainer = document.querySelector('main');

    // Loop through each webpage entry
    for (const [index, webpage] of webpageData.entries()) {
        console.log(`Processing entry #${index + 1}`);

        // Create a link (anchor) element that will wrap the entire card
        const linkElement = document.createElement('a');
        linkElement.href = webpage.acf.link;  // Set the link to the webpage URL
        linkElement.target = "_blank";  // Open in a new tab (optional)
        linkElement.classList.add('card-link');  // Optional class for styling

        const card = document.createElement('div');
        card.classList.add('card');

        // Add title to the card
        if (webpage.acf.title) {
            const titleElement = document.createElement('h2');
            titleElement.innerText = webpage.acf.title;  // Set the title of the card
            card.appendChild(titleElement);
        } else {
            console.warn(`Entry #${index + 1} is missing a title`);
        }

        // Fetch image URL based on the image ID
        const imageId = webpage.acf.image;
        if (imageId) {
            const imageUrl = await fetchImageUrl(imageId);  // Await the image fetch
            console.log(`Fetched image URL for ID ${imageId}: ${imageUrl}`);

            const imgContainer = document.createElement('div');
            imgContainer.classList.add('image-container');

            if (imageUrl) {
                const imgElement = document.createElement('img');
                const imgAltText = webpage.acf.imgAlt;  // Get the alt text

                imgElement.src = imageUrl;  // Set the image source
                imgElement.alt = imgAltText || 'Image';  // Fallback to 'Image' if alt text is missing
                imgContainer.appendChild(imgElement);  // Append image to the container
                card.appendChild(imgContainer);  // Append the container to the card
            } else {
                console.error(`No image found for ID: ${imageId}`);
            }
        } else {
            console.warn(`Entry #${index + 1} is missing an image ID`);
        }

        // Add ingress (description) to the card
        if (webpage.acf.ingress) {
            const ingressElement = document.createElement('p');
            ingressElement.innerText = webpage.acf.ingress;
            card.appendChild(ingressElement);
        } else {
            console.warn(`Entry #${index + 1} is missing an ingress`);
        }

        // Append the card to the link element
        linkElement.appendChild(card);

        // Append the link element (which now contains the card) to the main container
        mainContainer.appendChild(linkElement);
    }
}


// Call the fetchData function to start the process when the page loads
window.onload = function () {
    fetchData();
};
/* fetchData(); */

/* function fetchData() {

    fetch('https://portfolio.raddishai.no/wp-json/wp/v2/webpage')
    .then(response => response.json())
    .then(data => {
        webpageData = data;
        console.log("data successfully storesd in the webpageData variable: ", webpageData);
/*         myWork(); */
/*     })
    .catch(error => console.error('Error fetching data: ', error));
}
 */
/* webpageData.forEach(webpage => {
    console.log(webpage.acf); // Log the acf object to check if the fields exist
}); */

/* window.onload = fetchData; */

/* function myWork() {
    if (webpageData) {
        const mainContainer = document.querySelector('main');
        mainContainer.innerHTML ='';
        webpageData.forEach(webpage => {
            const card = document.createElement('div');
            card.classList.add('card');

            const titleElement = document.createElement('h2');
            titleElement.innerText = webpage.acf.title;
            card.appendChild(titleElement);

            const imgElement = document.createElement('img');
            imgElement.src = webpage.acf.image;
            imgElement.alt = webpage.acf.imgalt;
            card.appendChild(imgElement);

            const ingressElement = document.createElement('p');
            ingressElement.innerText = webpage.acf.ingress;
            card.appendChild(ingressElement);

            mainContainer.appendChild(card);
        });
    } else {
        console.log('Data not aviable yet. Retrying...');
        setTimeout(myWork, 100);
    }
} */