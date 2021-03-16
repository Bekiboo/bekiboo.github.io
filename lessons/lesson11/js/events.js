const requestURL = 'https://byui-cit230.github.io/weather/data/towndata.json';
const ALLOWED_TOWNS = [
    "Fish Haven",
    "Preston",
    "Soda Springs"
];

const eventsDiv = document.getElementById('events');
const townNameEvents = document.getElementById('town-name').textContent;
switch(townNameEvents) {
    case 'Soda Springs Idaho':
      townNameEvent = 'Soda Springs'
      break;
    case 'Fish Haven Idaho':
        townNameEvent = 'Fish Haven'
      break;
    default:
        townNameEvent = 'Preston'
  }

fetch(requestURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (jsonObject) {
        console.table(jsonObject); // temporary checking for valid response and data parsing
        const towns = jsonObject['towns'];

        for (let i = 0; i < towns.length; i++) {
            if (townNameEvent == towns[i].name) {
                for (let j = 0; j < towns[i].events.length; j++) {

                    let eventData = towns[i].events[j]
                    let deuxPoints = eventData.indexOf(':');
                    let eventDateSlice = eventData.slice(0, deuxPoints + 1)
                    let eventNameSlice = eventData.slice(deuxPoints + 2, eventData.length)

                    let fullEvent = document.createElement('div');
                    fullEvent.classList.add('fullEvent');

                    let eventDate = document.createElement('p');
                    eventDate.textContent = eventDateSlice;
                    fullEvent.appendChild(eventDate);
                    
                    let eventName = document.createElement('p');
                    eventName.classList.add('left-space', 'clr-honey', 'data');
                    eventName.textContent = eventNameSlice;
                    fullEvent.appendChild(eventName);
                    
                    eventsDiv.appendChild(fullEvent);


                }
            }
        }
    });

