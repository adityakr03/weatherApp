// function changeGradient(event) {
//     const colors = [
//         'rgba(0, 0, 0, 1)',      // Black
//         'rgba(64, 64, 64, 1)'    // Dark grey
//     ];
//     if (event.type === 'mousemove') {
//         // Calculate angle based on mouse position
//         angle = Math.atan2(event.clientY - window.innerHeight / 2, event.clientX - window.innerWidth / 2);
//         angle = angle * (180 / Math.PI) + 90; // Convert radians to degrees
//     } else if (event.type === 'touchmove') {
//         // Calculate angle based on touch position
//         const touch = event.touches[0];
//         angle = Math.atan2(touch.clientY - window.innerHeight / 2, touch.clientX - window.innerWidth / 2);
//         angle = angle * (180 / Math.PI) + 90; // Convert radians to degrees
//     }
//     document.body.style.background = `linear-gradient(${angle}deg, ${colors[0]}, ${colors[1]})`;
// }

// Event listeners for mouse movement and touch events
// document.addEventListener('mousemove', changeGradient);
// document.addEventListener('touchmove', changeGradient);

const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "6098f734985a18647a83b3b6ed9be81f";

weatherForm.addEventListener("submit", async event =>{
    event.preventDefault();

    const city = cityInput.value;
    if(city){
        try{
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        }
        catch(error){
            console.error(error);
        }

    }
    else{
        displayError("Please enter a city.");
    }
});

async function getWeatherData(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
        if (!response.ok) {
            throw new Error("City not found");
        }
        const data = await response.json();
        displayWeatherInfo(data);
    } catch (error) {
        displayError(error.message);
    }
}

function displayWeatherInfo(data){
    const {
            name: city,
            main: {temp, humidity},
            weather: [{description, id}]} = data;

            card.textContent = "";
            card.style.display = "flex";

            const cityDisplay = document.createElement("h1");
            const tempDisplay = document.createElement("p");
            const humidityDisplay = document.createElement("p");
            const descDisplay = document.createElement("p");
            const weatherEmoji = document.createElement("p");

            cityDisplay.textContent = city;
            tempDisplay.innerHTML = `${(temp - 273.15).toFixed(1)}°<span class="red">C</span>`;
            humidityDisplay.textContent = `Humidity: ${humidity}%`;
            descDisplay.textContent = description;
            weatherEmoji.textContent = getWeatherEmoji(id);

            cityDisplay.classList.add("cityDisplay");
            tempDisplay.classList.add("tempDisplay");
            humidityDisplay.classList.add("humidityDisplay");
            descDisplay.classList.add("descDisplay");
            weatherEmoji.classList.add("weatherEmoji");

            card.appendChild(cityDisplay);
            card.appendChild(tempDisplay);
            card.appendChild(humidityDisplay);
            card.appendChild(descDisplay);
            card.appendChild(weatherEmoji);
}

function getWeatherEmoji(weatherId){
    switch(true){
        case(weatherId >= 200 && weatherId < 300):
            return "🌧️";
        case(weatherId >= 300 && weatherId < 400):
            return "⛈️";
        case(weatherId >= 500 && weatherId < 600):
            return "🌨️";
        case(weatherId >= 600 && weatherId < 700):
            return "❄️";
        case(weatherId >= 700 && weatherId < 800):
            return "🌫️";
        case(weatherId === 800):
            return "☀️";
        case(weatherId >= 801 && weatherId < 810):
            return "☁️";
        default:
            return "🌬️";
    }
}

function displayError(message){
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}