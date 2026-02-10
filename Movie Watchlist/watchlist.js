const resultsDiv = document.getElementById("result-area")
let htmlString = ''

const storedWatchList = JSON.parse(localStorage.getItem('watchList')) || [];
console.log(storedWatchList)
if (storedWatchList.length > 0){
    htmlString = ''
    for(const movie of storedWatchList){
        console.log(movie)
        fetchSearchResults(movie)
    }
}

async function fetchSearchResults(searchValue){
    const response = await fetch(`http://www.omdbapi.com/?apikey=b561885&i=${searchValue}`)
    const data = await response.json()
    console.log(data)
    if(data.Response === 'True'){
    render(data)
    resultsDiv.classList.remove("placeholder")
    resultsDiv.innerHTML = htmlString
    }
}

function render(data){
    htmlString +=`
    <div id="movie-card" data-imdb= "${data.imdbID}">
        <div>
            <img src="${data.Poster}" alt="${data.Title} poster">
        </div>
        <div id="details-div">
            <div class="inner-details">
                <p>${data.Title}</p>
                <p><i class="fa-solid fa-star" style="color: #FFD43B;"></i>${data.imdbRating}</p>
            </div>
            <div class="inner-details">
                <p>${data.Runtime}</p>
                <p>${data.Genre}</p>
            </div>
            <div>
                <p>${data.Plot}</p>
            </div>
        </div>
    </div>
    `
}
