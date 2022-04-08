var pullFavs = JSON.parse(localStorage.getItem('favArray'));
if (localStorage.getItem('favArray')){
    var favList = document.getElementById('fav-list');
    favList.innerHTML = ''
    pullFavs.forEach(element => {
        console.log(element)
        var favLi = document.createElement('li');
        favLi.classList.add('list-items');
        var favAnchor = document.createElement('a');
        favAnchor.classList.add('fav-artist-anchor');
        favAnchor.setAttribute('href', element.favLink);
        favAnchor.setAttribute('target', '_blank');
        favAnchor.textContent = element.eventName;

        favLi.appendChild(favAnchor);
        favList.appendChild(favLi);
    });
}