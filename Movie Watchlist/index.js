const searchForm = document.getElementById("search-area")
const resultsDiv = document.getElementById("result-area")
let resultHtml = ''
let descriptionArray = []
let resultsArr = []

const storedWatchList = JSON.parse(localStorage.getItem('watchList')) || [];

if(storedWatchList.length < 1){
let watchList = []
localStorage.setItem('watchList', JSON.stringify(watchList));
}

document.addEventListener('click',function(e){
    if(e.target.dataset.id){
        console.log(e.target.id)
        const storedWatchList = JSON.parse(localStorage.getItem('watchList')) || [];
        console.log(storedWatchList)
        storedWatchList.push(e.target.dataset.id)
        console.log(storedWatchList)
        localStorage.setItem('watchList', JSON.stringify(storedWatchList));
        document.getElementById(e.target.id).style.pointerEvents = "none"
        document.getElementById(e.target.id).innerHTML = `Added to watchlist`
        

        
    }
})

searchForm.addEventListener('submit',function(e){
    e.preventDefault()
    const formData = new FormData(searchForm);
    const searchValue = formData.get("search")
    fetchSearchResults(searchValue)
})

async function fetchSearchResults(searchValue){
    descriptionArray = []
    const response = await fetch(`http://www.omdbapi.com/?apikey=b561885&type=movie&s=${searchValue}`)
    const data = await response.json()
    console.log(data)
    
    if(data.Response === 'True'){
    for (const movie of data.Search) {
        const res = await fetch(`http://www.omdbapi.com/?apikey=b561885&t=${movie.Title}`)
        const movieData = await res.json()
        descriptionArray.push(movieData)
    }
    console.log(descriptionArray)
    render(data.Search,descriptionArray)
    }else if(data.Response === 'False'){
        resultsDiv.innerHTML = `<p>Unable to find what you are looking for. Please try another search</p>`
    }
}

function render(dataSearch, descArr){
    resultHtml = ''
    for (let index = 0; index < dataSearch.length; index++) {
        resultHtml +=`
        <div id="movie-card" data-imdb= "${dataSearch[index].imdbID}">
            <div>
                <img src="${dataSearch[index].Poster}" alt="${dataSearch[index].Title} poster">
            </div>
            <div id="details-div">
                <div class="inner-details">
                    <p>${dataSearch[index].Title}</p>
                    <p><i class="fa-solid fa-star" style="color: #FFD43B;"></i>  ${descArr[index].imdbRating}</p>
                </div>
                <div class="inner-details">
                    <p>${descArr[index].Runtime}</p>
                    <p>${descArr[index].Genre}</p>
                    <a id="${dataSearch[index].imdbID}" data-id= "${dataSearch[index].imdbID}"><i class="fa-solid fa-plus"></i>Watchlist</a>
                </div>
                <div>
                    <p>${descArr[index].Plot}</p>
                </div>
            </div>
        </div>
        `
    }
    resultsDiv.classList.remove("placeholder")
    resultsDiv.innerHTML = resultHtml
    

}


