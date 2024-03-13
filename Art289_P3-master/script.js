// function toggleOverlay() {
//     var overlay = document.getElementsByClassName("overlay-container") [0];
//     var displaySetting = overlay.style.display = (overlay.style.display === "flex") ? "none" : "flex";
// }

const secrets = {
    "apikey" : "9WYGgKUIuA2ryfACcEPb5Yq5RtNv1NqU",
    "zipcode" : "97218",
    "baseurl" : "http://dataservice.accuweather.com/forecasts/v1/",
    "endurl" : "&language=en-us&details=false&metric=false"
}

const weatherCalls = {
    "daily" : `${secrets.baseurl}daily/1day/${secrets.zipcode}?apikey=${secrets.apikey}${secrets.endurl}`,
    "hourly" : `${secrets.baseurl}hourly/1hour/${secrets.zipcode}?apikey=${secrets.apikey}${secrets.endurl}`
}

async function getWeatherData(type) {
    try {
        const response = await fetch(type);
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('Error loading JSON:', error);
        throw error;
    }
}
// getWeatherData(weatherCalls.daily)
// getWeatherData(weatherCalls.hourly)


async function parseWeatherData(hourly, daily) {
    try {
        const hourlyData = hourly[0];

        return {
            "hourlytemp": hourlyData.Temperature.Value,
            "hourlyunit": hourlyData.Temperature.Unit,
            "dailylow": daily.DailyForecasts[0].Temperature.Minimum.Value,
            "dailylowunit": daily.DailyForecasts[0].Temperature.Minimum.Unit,
            "dailyhigh": daily.DailyForecasts[0].Temperature.Maximum.Value,
            "dailyhighunit": daily.DailyForecasts[0].Temperature.Maximum.Unit,
        };
    } catch (error) {
        console.error('Error in parseWeatherData:', error);
        throw error;
    }
}


async function fillWeatherDataInHTML() {
    try {
        const dailydata = await getWeatherData(weatherCalls.daily);
        const hourlydata = await getWeatherData(weatherCalls.hourly);

        const weatherdata = await parseWeatherData(hourlydata, dailydata);
        console.log(weatherdata);

        const currenttemp = document.getElementById("current-temp");
        currenttemp.innerText = `${weatherdata.hourlytemp}\u00B0${weatherdata.hourlyunit}`;

        const dailyhigh = document.getElementById("high");
        dailyhigh.innerText = `H: ${weatherdata.dailyhigh}\u00B0${weatherdata.dailyhighunit}`;
        
        const dailylow = document.getElementById("low");
        dailylow.innerText = `L: ${weatherdata.dailylow}\u00B0${weatherdata.dailylowunit}`;
    } catch (error) {
        console.error('Error filling weather data in HTML:', error);
        throw error;
    }
}

fillWeatherDataInHTML();


// function on() {
//     document.getElementById("overlay2-experience").style.display = "block";
//   }
  
//   function off() {
//     document.getElementById("overlay2-experience").style.display = "none";
//   }
