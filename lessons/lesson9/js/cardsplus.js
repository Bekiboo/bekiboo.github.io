const requestURL = 'https://byui-cit230.github.io/weather/data/towndata.json';
const ALLOWED_TOWNS = [
	"Fish Haven",
    "Preston",
    "Soda Springs"
];

let townCount = 0;

const renderTownInfo = (infoDiv, value, label) => {
    let info = document.createElement('div');
    info.classList.add('info');

    let infoValue = document.createElement('div');
    infoValue.classList.add('value');
    infoValue.textContent = value;

    let infoType = document.createElement('div');
    infoType.classList.add('type');
    infoType.textContent = label;

    info.appendChild(infoValue);
    info.appendChild(infoType);
    infoDiv.appendChild(info);
};

const renderTownCard = townData => {
    if (!ALLOWED_TOWNS.find(townName => townData.name === townName)) {
    	return false;
    }
    
    townCount += 1;

    let card = document.createElement('article');
    card.classList.add('card');

    // Link
    var link = document.createElement('a');

    // Comment
    var com = document.createComment(`Card n°${townCount}`);
    document.getElementById('cards').appendChild(com);

    // card-image
    let image = document.createElement('div');
    image.classList.add('card-image');
    card.appendChild(image);
    let photoUrl = 'url("img/' + townData.photo + '")'
    image.style.background = photoUrl;

    // card-title
    let titleDiv = document.createElement('div');
    titleDiv.classList.add('card-title');
    card.appendChild(titleDiv);

    let cardH3 = document.createElement('h3');
    cardH3.textContent = townData.name;
    titleDiv.appendChild(cardH3);

    let cardH4 = document.createElement('h4');
    cardH4.textContent = townData.motto;
    titleDiv.appendChild(cardH4);

    // card-info
    let infoDiv = document.createElement('div');
    infoDiv.classList.add('card-info');
    card.appendChild(infoDiv);

    renderTownInfo(infoDiv, townData.yearFounded, "Year Founded");
    renderTownInfo(infoDiv, townData.currentPopulation, "Current Population");
    renderTownInfo(infoDiv, townData.averageRainfall, "Average Rainfall");

    link.appendChild(card);
    document.getElementById('cards').appendChild(link);

    if (townData.name == "Fish Haven") {
        link.setAttribute('href', 'fish-haven.html');
    } else if (townData.name == "Preston") {
        link.setAttribute('href', 'preston.html');
    } else if (townData.name == "Soda Springs") {
        link.setAttribute('href', 'soda_spring.html');
    }
};

fetch(requestURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (jsonObject) {
        console.table(jsonObject); // temporary checking for valid response and data parsing
        const towns = jsonObject['towns'];

        for (let i = 0; i < towns.length; i++) {
                renderTownCard(towns[i]);
            
        }
    });