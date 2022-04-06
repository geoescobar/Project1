// variables
var homepageTitle = document.getElementById("title");
var catBtn = document.getElementById("category-buttons");
var weatherTab = document.getElementById("weather-tab");
var musicTab = document.getElementById("music-tab");
var favoritesTab = document.getElementById("favorites-tab");
var cards = document.getElementById("cards");





//similar artist
var similarArtist = document.getElementById("similar-artist-two");

// materialize script
$(document).ready(function () {
  $(".tabs").tabs();
});

// variable styling
cards.style.display = "none";
homepageTitle.style.display = "block";
// searchForm.style.display = "block";

// search bar variable
var searchBar = document.getElementById("search-bar");
var searchInput = document.getElementById("search-input");
var searchForm = document.getElementById("search-form");

// Recording input text to send to loadConcertInfo function
searchForm.addEventListener("submit", function (event) {
  event.preventDefault();
  var cityInfo = searchInput.value.trim();
  cards.style.display = "block";
  homepageTitle.style.display = "none";
  loadConcertInfo(cityInfo, true);
});

// API key
var apiKey = "fkCmG0jvZbJkApGUhyHt4HwwBKiZxArs";

// getting city concert information
function loadConcertInfo(cityName) {
  var apiUrl = `https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&city=${cityName}&apikey=${apiKey}`;
  fetch(apiUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      cards.innerHTML = '';
      for (var i = 0; i < 6; i++) {
        console.log("Event name: " + data._embedded.events[i].name);
        console.log(
          "Event venue: " + data._embedded.events[i]._embedded.venues[0].name
        );
        console.log(
          "Event date: " + data._embedded.events[i].dates.start.localDate
        );
        console.log("Event image: " + data._embedded.events[i].images[0].url);
        console.log(
          "Event max price: " +
            "$" +
            data._embedded.events[i].priceRanges[0].max
        );
        console.log(
          "Event min price: " +
            "$" +
            data._embedded.events[i].priceRanges[0].min
        );
        console.log(
          "Event genre: " +
            data._embedded.events[i].classifications[0].genre.name
        );

        console.log('Tickets link: ' + data._embedded.events[i].url);
        // image append
        var divElement = document.createElement("div");
        divElement.classList.add("col", "s12", "m6");
        var cardDiv = document.createElement("div");
        cardDiv.classList.add("card");
        var imageDiv = document.createElement("div");
        imageDiv.classList.add("card-image");
        var image = document.createElement("img");
        image.classList.add("activator");
        image.setAttribute("src", data._embedded.events[i].images[0].url);
        var iconTag = document.createElement("a");
        iconTag.classList.add(
          "btn-floating",
          "halfway-fab",
          "waves-effect",
          "waves-light",
          "red"
        );
        var icon = document.createElement("i");
        icon.classList.add("material-icons");
        icon.textContent = 'star';
        iconTag.appendChild(icon);
        imageDiv.appendChild(iconTag);
        imageDiv.appendChild(image);
        cardDiv.appendChild(imageDiv);
        divElement.appendChild(cardDiv);
        cards.appendChild(divElement);

        //card content append 
        var contentDiv = document.createElement('div');
        contentDiv.classList.add('card-content')
        var eventTitle = document.createElement('span');
        eventTitle.classList.add('card-title');
        eventTitle.textContent = data._embedded.events[i].name;
        var eventVenue = document.createElement('p');
        eventVenue.classList.add('event-venue');
        eventVenue.textContent = 'Event venue: ' + data._embedded.events[i]._embedded.venues[0].name;
        var eventDate = document.createElement('p');
        eventDate.classList.add('event-date');
        eventDate.textContent = 'Event date: ' + data._embedded.events[i].dates.start.localDate;
        var eventGenre = document.createElement('p');
        eventGenre.classList.add('event-genre');
        eventGenre.textContent = "Event genre: " + data._embedded.events[i].classifications[0].genre.name;
        var ticket = document.createElement('a');
        ticket.classList.add('ticket-link');
        ticket.textContent = 'Click here to buy tickets!';
        ticket.setAttribute('href', data._embedded.events[i].url);
        ticket.setAttribute('target', '_blank');

        contentDiv.appendChild(eventTitle);
        contentDiv.appendChild(eventDate);
        contentDiv.appendChild(eventVenue);
        contentDiv.appendChild(eventGenre);
        contentDiv.appendChild(ticket);
        cardDiv.appendChild(contentDiv);

        // card reveal 
        var cardReveal = document.createElement('div');
        cardReveal.classList.add('card-reveal');
        var spanElement = document.createElement('span');
        spanElement.classList.add('card-title', 'grey-text', 'text-darken-4');
        spanElement.textContent = 'Similar Artist';
        var spanIcon = document.createElement('i');
        spanIcon.classList.add('material-icon', 'right');
        spanIcon.textContent = 'x';

        spanElement.appendChild(spanIcon);
        cardReveal.appendChild(spanElement);
        cardDiv.appendChild(cardReveal);
      }
    }).catch(function(error) {
      console.log(error)
    });
}

// // similar artist api key
// var apiKeyTwo = '434897-NextGenE-6XWPJHLE';

// // fetching similar artist api
//   var apiUrlTwo = `https://cors-suckss.herokuapp.com/https://tastedive.com/api/similar?q=drake&apikey=${apiKeyTwo}`;
//   fetch(apiUrlTwo)
//   .then(function (response) {
//     return response.json();
//   })
//   .then(function (data) {
//     console.log(data);
//     // console.log(data.similar.info[0].name);
//     // console.log(data.similar.results[0].name);
//   });