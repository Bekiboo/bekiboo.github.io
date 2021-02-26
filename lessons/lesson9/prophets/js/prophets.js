const requestURL = 'https://byui-cit230.github.io/lessons/lesson-09/data/latter-day-prophets.json';

fetch(requestURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (jsonObject) {
        console.table(jsonObject); // temporary checking for valid response and data parsing
        const prophets = jsonObject['prophets'];

        for (let i = 0; i < prophets.length; i++) {
            let card = document.createElement('section');
            let titleDiv = document.createElement('div');
            titleDiv.classList.add('card-title');
            let bodyDiv = document.createElement('div');
            bodyDiv.classList.add('card-body');

            // h2 - name
            let fullName = document.createElement('h2');
            fullName.textContent = prophets[i].name + ' ' + prophets[i].lastname;
            titleDiv.appendChild(fullName);

            // p - birthdate
            let dateOfBirth = document.createElement('p');
            dateOfBirth.textContent = 'Date of Birth:\r\n ' + prophets[i].birthdate;
            bodyDiv.appendChild(dateOfBirth);

            // p - birthplace
            let placeOfBirth = document.createElement('p');
            placeOfBirth.textContent = 'Place of Birth:\r\n' + prophets[i].birthplace;
            bodyDiv.appendChild(placeOfBirth);

            // img - picture
            let image = document.createElement('img');
            image.setAttribute('src', prophets[i].imageurl);
            image.setAttribute('loading', 'lazy');
            image.setAttribute('alt', prophets[i].name + ' ' + prophets[i].lastname + ' - ' + (i + 1));
            card.appendChild(titleDiv);
            card.appendChild(image);
            card.appendChild(bodyDiv);

            document.querySelector('div.cards').appendChild(card);
        }
    });

const imgHover = document.getElementsByTagName('img')[0];
const sect = document.getElementsByTagName('section')[0];

window.addEventListener('load',function () {
    sect.classList.remove('loading');
    
})

sect.addEventListener('mouseover', function() {
    imgHover.classList.add('white-border');    
},false)
sect.addEventListener('mouseout',function () {
    imgHover.classList.remove('white-border')    
},false)