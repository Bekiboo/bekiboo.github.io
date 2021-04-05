const weekDay = new Array(7);
weekDay[0] = "Sun";
weekDay[1] = "Mon";
weekDay[2] = "Tue";
weekDay[3] = "Wed";
weekDay[4] = "Thu";
weekDay[5] = "Fri";
weekDay[6] = "Sat";


const apiURL = 'https://api.openweathermap.org/data/2.5/onecall?lat=48.1173&lon=1.6778&exclude=minutely&units=metric&appid=9f477eafba3d815a2c9226646be32802';
fetch(apiURL)
    .then((response) => response.json())
    .then((jsObject) => {
            console.log(jsObject);
            const forecastList = jsObject.daily

            // Current Weather
            const currentWeatherLower = jsObject.current.weather[0].description;
            document.getElementById('currentWeather').textContent = currentWeatherLower.charAt(0).toUpperCase() + currentWeatherLower.slice(1);
            document.getElementById('temp').textContent = Math.round(jsObject.current.temp * 10) / 10;
            document.getElementById('humidity').textContent = jsObject.current.humidity;

            // Three Day Forecast
            for (let i = 1; i < 4; i++) {
                let time = forecastList[i].dt;
                let dayNumber = new Date(time * 1000).getDay();
                dayOfWeek = weekDay[dayNumber]

                let forecastCard = document.createElement('div');
                document.getElementById('weather').appendChild(forecastCard);

                let forecastDay = document.createElement('h4');
                forecastDay.textContent = dayOfWeek;
                forecastCard.appendChild(forecastDay);

                let forecastTemp = document.createElement('p');
                forecastTemp.classList.add('forecast-temp')
                forecastTemp.textContent = Math.round(forecastList[i].temp.day * 10) / 10 + "\xB0";
                forecastCard.appendChild(forecastTemp);
            }
        }
    );