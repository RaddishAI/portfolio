let webpageData = null;

function fetchData() {

    fetch('https://portfolio.raddishai.no/wp-json/wp/v2/webpage')
    .then(response => response.json())
    .then(data => {
        webpageData = data;
        console.log("data successfully storesd in the webpageData variable: ", webpageData);
    })
    .catch(error => console.error('Error fetching data: ', error));
}

window.onload = fetchData;

function myWork() {

}