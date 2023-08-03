// Clock
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
  var timeString = hours + ":" + minutes ;

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

// Typing effect for "message"
function typeMessage() {
  const messageText = "Enjoy browsing while listening to Fur Elise by Beethoven";
  const messageElement = document.querySelector('.message');
  let index = 0;

  function type() {
    if (index < messageText.length) {
      messageElement.textContent += messageText.charAt(index);
      index++;
      setTimeout(type, 50); // Adjust the typing speed (milliseconds)
    }
  }

  type();
}

// Call the typing functions


typeMessage();


// Call the updateClock() function every second
setInterval(updateClock, 1000);

// Vinyl Records
document.addEventListener("mousemove", moveVinylRecords);

function moveVinylRecords(event) {
  const vinylRecords = document.querySelectorAll(".vinyl-record");
  const mouseX = event.clientX;
  const mouseY = event.clientY;

  vinylRecords.forEach((record) => {
    const recordX = record.offsetLeft + record.offsetWidth / 2;
    const recordY = record.offsetTop + record.offsetHeight / 2;
    const distanceX = mouseX - recordX;
    const distanceY = mouseY - recordY;
    const maxRadius = 50; /* Adjust the maximum radius of movement */

    if (Math.abs(distanceX) <= maxRadius && Math.abs(distanceY) <= maxRadius) {
      record.style.transform = `translate(${distanceX}px, ${distanceY}px)`;
    } else {
      record.style.transform = "translate(0, 0)";
    }
  });
}



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

let requestCount = 0; // Track the number of requests made

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
  const vinylRecord = document.querySelector('.vinyl-record');
  const messageContainer = document.querySelector('.message-container');

  messageContainer.classList.add('fade-out');
  vinylRecord.classList.add('.expanded');
  setTimeout(function() {
    messageContainer.style.display = 'none';
    vinylRecord.classList.toggle('expand');
  }, 1000);

  if (isPlaying) {
    audio.pause();
    isPlaying = false;
  } else {
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
