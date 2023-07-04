function updateClock() {
  var now = new Date();
  var hours = now.getHours();
  var minutes = now.getMinutes();
  var seconds = now.getSeconds();

  // Add leading zeros to minutes and seconds
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }

  // Format the time string
  var timeString = hours + ":" + minutes + ":" + seconds;

  // Update the clock
  document.querySelector(".floating_Clock").textContent = timeString;
}

// Call the updateClock() function every second
setInterval(updateClock, 1000);

function submitEmail() {
  var message = document.getElementById("Message").value;
  var email = document.getElementById("email").value;
  // Do something with the submitted message and email
}

function searchCity() {
  var apiKey = "s9idDDy8NiaUYrjji6gVeIIsD8PGmCBg";
  var city = document.getElementById("cityInput").value;
  var searchUrl = "https://dataservice.accuweather.com/locations/v1/cities/search";

  // Build the URL with query parameters
  var url = searchUrl + "?apikey=" + apiKey + "&q=" + encodeURIComponent(city);

  // Send an HTTP GET request to the API
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        var response = JSON.parse(xhr.responseText);
        if (response.length > 0) {
          var locationKey = response[0].Key;
          // Call the function to fetch the weather forecast using the location key
          fetchWeatherForecast(locationKey);
        } else {
          console.log("City not found.");
        }
      } else {
        console.log("Error: " + xhr.status);
      }
    }
  };
  xhr.open("GET", url, true);
  xhr.send();


}
function updateForecast(response) {
  var windSpeed = response[0].Wind.Speed.Value;
  var temperature = response[0].Temperature.Value;

  // Update the HTML elements with the retrieved values
  document.getElementById("wind").textContent = windSpeed + " K/M";
  document.getElementById("temp").textContent = temperature +" C";

  // Show the symbols by adding the "visible" class
  var windIcon = document.querySelector(".fa-wind");
  var temperatureIcon = document.querySelector(".fa-thermometer-three-quarters");
  windIcon.classList.add("visible");
  temperatureIcon.classList.add("visible");
}


function fetchWeatherForecast(locationKey) {
  var apiKey = "s9idDDy8NiaUYrjji6gVeIIsD8PGmCBg";
  var forecastUrl = "https://dataservice.accuweather.com/forecasts/v1/hourly/1hour/" + locationKey;

  // Build the URL with query parameters
  var url = forecastUrl + "?apikey=" + apiKey + "&language=en&details=true&metric=true";

  // Send an HTTP GET request to the API
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        var response = JSON.parse(xhr.responseText);
        // Process the forecast data as needed
        updateForecast(response);
      } else {
        console.log("Error: " + xhr.status);
      }
    }
  };
  xhr.open("GET", url, true);
  xhr.send();
}
var prevScrollPos = window.pageYOffset;
var fadeFactor = 0.01; // Adjust this value to control the fading speed
var generalInfo = document.querySelector('.general_Info');

window.addEventListener('scroll', function() {
  var currentScrollPos = window.pageYOffset;
  var windowHeight = window.innerHeight;
  var weatherSection = document.querySelector('.weather');

  var fadeAmount = Math.abs(currentScrollPos - prevScrollPos) * fadeFactor;
  var opacity = 1 - (currentScrollPos / (weatherSection.offsetTop - windowHeight));

  // Limit the opacity within the range of 0 to 1
  opacity = Math.max(0, Math.min(1, opacity));

  generalInfo.style.opacity = opacity;

  prevScrollPos = currentScrollPos;
});
