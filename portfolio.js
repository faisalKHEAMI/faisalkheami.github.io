// Clock
let requestCount = 0; // Track the number of requests made

function updateClock() {
  var now = new Date();
  var hours = now.getHours();
  var minutes = now.getMinutes();
  var seconds = now.getSeconds();

  // Add leading zeros to minutes and seconds
  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  // Format the time string
  var timeString = hours + ":" + minutes;

  // Update the clock
  document.querySelector(".floating_Clock").textContent = timeString;
}

// Typing effect for "Hello"
typeHello();
function typeHello() {
  const helloText = "Hello!";
  const helloElement = document.querySelector('.Hello');
  let index = 0;

  function type() {
    if (index < helloText.length) {
      helloElement.textContent += helloText.charAt(index);
      index++;
      setTimeout(type, 100); // Adjust the typing speed (milliseconds)
    }
  }

  type();
}

function typeMessage() {
  document.querySelector('.screen').classList.add('expanded');
  const lighting = $('.lighting');

  const messages = [
    "Welcome to my portfolio!",
    "\nLet's build something beautiful together!"
  ];
  const messageElement = document.querySelector('.message');
  let index = 0;
  let charIndex = 0;
  let deleteMode = false;

  function type() {
    if (index < messages.length) {
      const message = messages[index];
      if (deleteMode && messageElement.textContent.length > 0) {
        for (let i = 0; i < messageElement.textContent.length; i++) {
          setTimeout(() => {
            messageElement.textContent = messageElement.textContent.slice(0, -1);
          }, 50 * i);
        }
        charIndex = 0;
        setTimeout(() => {
          messageElement.textContent += message.charAt(charIndex);
          charIndex++;
          setTimeout(type, 50); // Adjust the typing speed (milliseconds)
          deleteMode = false;
        }, 50 * messageElement.textContent.length);
      } else if (charIndex < message.length) {
        setTimeout(() => {
          messageElement.textContent += message.charAt(charIndex);
          charIndex++;
          setTimeout(type, 50); // Adjust the typing speed (milliseconds)
        }, 70);
      } else {
        index++;
        charIndex = 0;
        deleteMode = true;
        setTimeout(type, 1500); // Delay before typing the next message
        lighting.css('display', 'block');
           }
    }
  }

  type(); // Start typing the message
}




//file:///Users/faisal/Library/Mobile%20Documents/com~apple~CloudDocs/Projects/portfolio/index.html
// Call the function when the document loads
document.addEventListener('DOMContentLoaded', typeMessage);

// Call the updateClock() function every second
setInterval(updateClock, 1000);


// Weather Forecast
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
  document.getElementById("temp").textContent = temperature + " C";

  // Show the symbols by adding the "visible" class
  var windIcon = document.querySelector(".fa-wind");
  var temperatureIcon = document.querySelector(".fa-thermometer-three-quarters");
  windIcon.classList.add("visible");
  temperatureIcon.classList.add("visible");

  requestCount++; // Increment the request count

  // Expand or collapse the weather result based on the request count
  if (requestCount > 1) {
    collapseWeatherResult();
    expandWeatherResult();
  } else if (requestCount === 1) {
    expandWeatherResult();
  }
}

function expandWeatherResult() {
  document.querySelector('.Weather_result').classList.add('expanded');
}

function collapseWeatherResult() {
  document.querySelector('.Weather_result').classList.remove('expanded');
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

// Music Button
var audio = new Audio("0c15de8c190baeef4c1c8e27381f-orig.mp3");
var isPlaying = false;

var musicButton = document.querySelector(".music-button");
var isDragging = false;
var startPosX, startPosY, startMouseX, startMouseY;

musicButton.addEventListener("mousedown", function (event) {
  isDragging = true;
  startPosX = musicButton.offsetLeft;
  startPosY = musicButton.offsetTop;
  startMouseX = event.clientX;
  startMouseY = event.clientY;
});

document.addEventListener("mousemove", function (event) {
  if (isDragging) {
    var dx = event.clientX - startMouseX;
    var dy = event.clientY - startMouseY;
    musicButton.style.left = startPosX + dx + "px";
    musicButton.style.top = startPosY + dy + "px";
  }
});

document.addEventListener("mouseup", function () {
  isDragging = false;
});

function toggleMusic() {

  const messageContainer = document.querySelector('.message-container');
  const musicButton = document.querySelector('.music-button');
  if (isPlaying) {

    audio.pause();
    isPlaying = false;


    messageContainer.classList.remove('fade-out'); // Show the message
    messageContainer.style.display = 'block';
  
  } else {


    messageContainer.classList.add('fade-out');

    setTimeout(function() {
      const messageElement = document.querySelector('.music-button');
      messageElement.textContent = "⏸"
      messageContainer.style.display = 'none';
  }, 1000);

    audio.play();
    isPlaying = true;
  }
}

// Scrollable Section
const container = document.querySelector('.intro-section');
const scrollableSection = document.querySelector('.scrollable-section');
const overlaySection = document.querySelector('.overlay-section');

scrollableSection.addEventListener('scroll', function() {
  overlaySection.style.top = `${scrollableSection.scrollTop}px`;
});

window.addEventListener('resize', function() {
  overlaySection.style.width = `${container.offsetWidth}px`;
});
document.querySelector('.Weather_result').classList.add('show-info');
