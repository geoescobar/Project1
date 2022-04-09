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

// When the user clicks on div, open the popup
function myFunction() {
  var popup = document.getElementById("myPopup");
  popup.classList.toggle("show");
}
// variable styling
// cards.style.display = "none";


// search bar variable
var searchBar = document.getElementById("search-bar");
var searchInput = document.getElementById("search-input");
var searchForm = document.getElementById("search-form");

// Recording input text to send to loadConcertInfo function
searchForm.addEventListener("submit", function (event) {
  event.preventDefault();
  var cityInfo = searchInput.value.trim();
  cards.style.display = "block";
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
      cards.innerHTML = "";
      for (let i = 0; i < 8; i++) {
        console.log("Event name: " + data._embedded.events[i].name);
        
        // creating image elements
        var divElement = document.createElement("div");
        divElement.classList.add("col", "s12", "m6");
        var cardDiv = document.createElement("div");
        cardDiv.classList.add("card");
        var imageDiv = document.createElement("div");
        imageDiv.classList.add("card-image", "waves-effect", "waves-block", "waves-light");
        var image = document.createElement("img");
        image.classList.add("activator");
        image.setAttribute("src", data._embedded.events[i].images[7].url);
        var iconTag = document.createElement("a");
        iconTag.classList.add(
          "btn-floating",
          "halfway-fab",
          "waves-effect",
          "waves-light",
          "red"
        );

        const icon = document.createElement("i");
        icon.classList.add("material-icons");
        icon.textContent = "favorite";

        icon.addEventListener('click', (event) => {
          const cardContent = event.target.parentElement.parentElement.parentElement.children[1];
          console.log(cardContent);
          const favEvent = cardContent.children[0].innerText;
          const favEventLink = cardContent.children[5].getAttribute('href');
          
          if (localStorage.getItem('favArray')){
            const favArray = JSON.parse(localStorage.getItem('favArray'));
            favArray.push({eventName: favEvent, favLink: favEventLink})
            localStorage.setItem('favArray', JSON.stringify(favArray));
          } else {
            localStorage.setItem('favArray', JSON.stringify([{eventName: favEvent, favLink: favEventLink}]));
          }
        })
// appending image elements 
        iconTag.appendChild(icon);
        imageDiv.appendChild(iconTag);
        imageDiv.appendChild(image);
        cardDiv.appendChild(imageDiv);
        divElement.appendChild(cardDiv);
        cards.appendChild(divElement);

        //creating card content
        var contentDiv = document.createElement("div");
        contentDiv.classList.add("card-content");
        var eventTitle = document.createElement("span");
        eventTitle.classList.add("card-title");
        eventTitle.textContent = data._embedded.events[i].name;
        var eventVenue = document.createElement("p");
        eventVenue.classList.add("event-venue");
        eventVenue.textContent =
          "Event venue: " + data._embedded.events[i]._embedded.venues[0].name;
        var eventDate = document.createElement("p");
        eventDate.classList.add("event-date");
        eventDate.textContent =
          "Event date: " + data._embedded.events[i].dates.start.localDate;
        var eventGenre = document.createElement("p");
        eventGenre.classList.add("event-genre");
        eventGenre.textContent =
          "Event genre: " +
          data._embedded.events[i].classifications[0].genre.name;
        var ticket = document.createElement("a");
        ticket.classList.add("ticket-link");
        ticket.textContent = "Click here to buy tickets!";
        ticket.setAttribute("href", data._embedded.events[i].url);
        ticket.setAttribute("target", "_blank");
// appending card content 
        contentDiv.appendChild(eventTitle);
        contentDiv.appendChild(eventDate);
        if (data._embedded.events[i].priceRanges) {
          var priceRange = document.createElement("p");
          priceRange.classList.add('price-range');
          priceRange.textContent = 'Price Range: $' +  data._embedded.events[i].priceRanges[0].min.toFixed(2) + '-$' + data._embedded.events[i].priceRanges[0].max.toFixed(2);
          contentDiv.appendChild(priceRange);
        } 
        contentDiv.appendChild(eventVenue);
        contentDiv.appendChild(eventGenre);
        contentDiv.appendChild(ticket);
        cardDiv.appendChild(contentDiv);

        // creating card reveal elements 
        let cardReveal = document.createElement("div");
        cardReveal.classList.add("card-reveal");
        var spanElement = document.createElement("span");
        spanElement.classList.add("card-title", "grey-text", "text-darken-4");
        spanElement.textContent = "Similar Artist";
        var spanIcon = document.createElement("i");
        spanIcon.classList.add("material-icons", "right");
        spanIcon.textContent = "close";
//appending card reveal elements 
        spanElement.appendChild(spanIcon);
        cardReveal.appendChild(spanElement);
        cardDiv.appendChild(cardReveal);

        // second api call
        var apiUrlTwo = `https://cors-suckss.herokuapp.com/https://tastedive.com/api/similar?q=${data._embedded.events[i]._embedded.attractions[0].name}&apikey=${apiKeyTwo}`;
        fetch(apiUrlTwo)
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            console.log(data);
            // console.log(data.Similar.Info[0].Name);
            // console.log(data.Similar.Results[0].Name);
            for (i = 0; i<10; i++) {
              //creating similar artists elements 
              let similarDiv = document.createElement('div');
              similarDiv.classList.add('similar-artist-container');
              let similarUl = document.createElement('ul');
              similarUl.classList.add('similar-artists-ul');
              let similarLi = document.createElement('li');
              similarLi.classList.add('list-items');
              //appending 
              similarLi.textContent = data.Similar.Results[i].Name;
              cardReveal.appendChild(similarDiv);
              similarDiv.appendChild(similarUl);
              similarUl.appendChild(similarLi);
            }

          });
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}

// similar artist api key
var apiKeyTwo = "434897-NextGenE-6XWPJHLE";

