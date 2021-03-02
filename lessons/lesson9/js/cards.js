const requestURL = 'https://byui-cit230.github.io/weather/data/towndata.json';

fetch(requestURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (jsonObject) {
        console.table(jsonObject); // temporary checking for valid response and data parsing
        const towns = jsonObject['towns'];
        let count = 0

        for (let i = 0; i < towns.length; i++) {
            if (towns[i].name == "Fish Haven" ||
                towns[i].name == "Preston" ||
                towns[i].name == "Soda Springs") {

                count += 1
                
                let card = document.createElement('article');
                card.classList.add('card');
                
                // Comment
                var com = document.createComment(`Card n°${count}`);
                document.getElementById('cards').appendChild(com);
                
                // card-image
                let image = document.createElement('div');
                image.classList.add('card-image');
                card.appendChild(image);
                let photoUrl = 'url("img/' + towns[i].photo + '")'
                image.style.background = photoUrl;
                
                // card-title
                let titleDiv = document.createElement('div');
                titleDiv.classList.add('card-title');
                card.appendChild(titleDiv);

                let cardH3 = document.createElement('h3');
                cardH3.textContent = towns[i].name;
                titleDiv.appendChild(cardH3);

                let cardH4 = document.createElement('h4');
                cardH4.textContent = towns[i].motto;
                titleDiv.appendChild(cardH4);

                // card-info
                let infoDiv = document.createElement('div');
                infoDiv.classList.add('card-info');
                card.appendChild(infoDiv);

                let info1 = document.createElement('div');
                info1.classList.add('info');
                info1.setAttribute('id', 'info1');
                let infoValue1 = document.createElement('div');
                infoValue1.classList.add('value');
                infoValue1.textContent = towns[i].yearFounded;
                let infoType1 = document.createElement('div');
                infoType1.classList.add('type');
                infoType1.textContent = "Year Founded"
                info1.appendChild(infoValue1);
                info1.appendChild(infoType1);
                infoDiv.appendChild(info1);

                let info2 = document.createElement('div');
                info2.classList.add('info');
                info2.setAttribute('id', 'info2');
                let infoValue2 = document.createElement('div');
                infoValue2.classList.add('value');
                infoValue2.textContent = towns[i].currentPopulation;
                let infoType2 = document.createElement('div');
                infoType2.classList.add('type');
                infoType2.textContent = "Current Population"
                info2.appendChild(infoValue2);
                info2.appendChild(infoType2);
                infoDiv.appendChild(info2);

                let info3 = document.createElement('div');
                info3.classList.add('info');
                info3.setAttribute('id', 'info3');
                let infoValue3 = document.createElement('div');
                infoValue3.classList.add('value');
                infoValue3.textContent = towns[i].averageRainfall;
                let infoType3 = document.createElement('div');
                infoType3.classList.add('type');
                infoType3.textContent = "Average Rainfall"
                info3.appendChild(infoValue3);
                info3.appendChild(infoType3);
                infoDiv.appendChild(info3);


                document.getElementById('cards').appendChild(card);


                // // h2 - name
                // let fullName = document.createElement('h2');
                // fullName.textContent = towns[i].name + ' ' + towns[i].lastname;
                // titleDiv.appendChild(fullName);

                // // p - birthdate
                // let dateOfBirth = document.createElement('p');
                // dateOfBirth.textContent = 'Date of Birth:\r\n ' + towns[i].birthdate;
                // bodyDiv.appendChild(dateOfBirth);

                // // p - birthplace
                // let placeOfBirth = document.createElement('p');
                // placeOfBirth.textContent = 'Place of Birth:\r\n' + towns[i].birthplace;
                // bodyDiv.appendChild(placeOfBirth);


                // document.querySelector('div.towns').appendChild(card);
            }
        }
    });

// const imgHover = document.getElementsByTagName('img')[0];
// const sect = document.getElementsByTagName('section')[0];

// window.addEventListener('load', function () {
//     sect.classList.remove('loading');

// })

// sect.addEventListener('mouseover', function () {
//     imgHover.classList.add('white-border');
// }, false)
// sect.addEventListener('mouseout', function () {
//     imgHover.classList.remove('white-border')
// }, false)