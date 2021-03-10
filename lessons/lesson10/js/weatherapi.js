const weatherDate = new Date();
const weatherDay = weatherDate.getDay();
let forecastDayNumber = weatherDay;
const weekDay = new Array(7);
weekDay[0] = "Sunday";
weekDay[1] = "Monday";
weekDay[2] = "Tuesday";
weekDay[3] = "Wednesday";
weekDay[4] = "Thursday";
weekDay[5] = "Friday";
weekDay[6] = "Saturday";

const apiURL = '//api.openweathermap.org/data/2.5/forecast?id=5604473&units=imperial&appid=9f477eafba3d815a2c9226646be32802'

const renderForecastCard = (forecastData, dayOfWeek) => {

    // cards
    let card = document.createElement('div');
    card.classList.add('bs');
    document.getElementById('cards').appendChild(card);

    let title = document.createElement('h4');
    title.textContent = dayOfWeek;
    card.appendChild(title);

    let weatherIcon = document.createElement('img');
    let iconCode = forecastData.weather[0].icon;
    let iconPath = `//openweathermap.com/img/w/${iconCode}.png`;
    weatherIcon.src = iconPath;
    weatherIcon.setAttribute('alt', forecastData.weather[0].description)
    card.appendChild(weatherIcon);

    let forecastTemp = document.createElement('p');
    forecastTemp.textContent = forecastData.main.temp + "\xB0";
    card.appendChild(forecastTemp);



}

fetch(apiURL)
    .then((response) => response.json())
    .then((jsObject) => {
        console.log(jsObject);
        const forecastList = jsObject.list

        // Weather Summary
        document.getElementById('currentWeather').textContent = jsObject.list[0].weather[0].description;
        document.getElementById('temp').textContent = jsObject.list[0].main.temp;
        document.getElementById('humidity').textContent = jsObject.list[0].main.humidity;
        document.getElementById('windSpeed').textContent = jsObject.list[0].wind.speed;
        const tempNum = parseFloat(jsObject.list[0].main.temp)
        const windSpeedNum = parseFloat(jsObject.list[0].wind.speed)
        
        let windChill = Math.round(35.74 + (0.6215 * tempNum) -
            (35.75 * Math.pow(windSpeedNum, 0.16)) +
            (0.4275 * tempNum * Math.pow(windSpeedNum, 0.16)));
        
        if (tempNum <= 50 && windSpeedNum > 3) {
            document.getElementById("windChill").textContent = windChill
        } else {
            document.getElementById("windChill").textContent = "N/A"
        }

        // Five Day Forecast
        for (let i = 0; i < forecastList.length; i++) {
            let time = forecastList[i].dt_txt;
            if (time.includes('18:00:00')) {
                forecastDayNumber += 1;
                if (forecastDayNumber === 7) {
                    forecastDayNumber = 0
                }
                renderForecastCard(forecastList[i], weekDay[forecastDayNumber])

            }
        }
    });
