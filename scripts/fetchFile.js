const apiUrl = 'https://portfolio.raddishai.no/wp-json/wp/v2/webpage';

let webpageData = null;

// Fetch data from the API
async function fetchData() {
    try {
        const response = await fetch(apiUrl);
        webpageData = await response.json();
        console.log("Data successfully stored in the webpageData variable: ", webpageData);
        console.log(`Total entries fetched: ${webpageData.length}`);
        generateCards();
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
        return mediaData.source_url;
    } catch (error) {
        console.error('Error fetching image URL: ', error);
        return null;
    }
}


async function generateCards() {
    const mainContainer = document.querySelector('main');


    for (const [index, webpage] of webpageData.entries()) {
        console.log(`Processing entry #${index + 1}`);

        const linkElement = document.createElement('a');
        linkElement.href = webpage.acf.link;
        linkElement.target = "_blank";
        linkElement.classList.add('card-link');

        const card = document.createElement('div');
        card.classList.add('card');

        if (webpage.acf.title) {
            const titleElement = document.createElement('h2');
            titleElement.innerText = webpage.acf.title;
            card.appendChild(titleElement);
        } else {
            console.warn(`Entry #${index + 1} is missing a title`);
        }

        const imageId = webpage.acf.image;
        if (imageId) {
            const imageUrl = await fetchImageUrl(imageId);
            console.log(`Fetched image URL for ID ${imageId}: ${imageUrl}`);

            const imgContainer = document.createElement('div');
            imgContainer.classList.add('image-container');

            if (imageUrl) {
                const imgElement = document.createElement('img');
                const imgAltText = webpage.acf.imgAlt;

                imgElement.src = imageUrl;
                imgElement.alt = imgAltText || 'Image';
                imgContainer.appendChild(imgElement);
                card.appendChild(imgContainer);
            } else {
                console.error(`No image found for ID: ${imageId}`);
            }
        } else {
            console.warn(`Entry #${index + 1} is missing an image ID`);
        }

        if (webpage.acf.ingress) {
            const ingressElement = document.createElement('p');
            ingressElement.innerText = webpage.acf.ingress;
            card.appendChild(ingressElement);
        } else {
            console.warn(`Entry #${index + 1} is missing an ingress`);
        }

        linkElement.appendChild(card);

        mainContainer.appendChild(linkElement);
    }
}


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