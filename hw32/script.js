const API_BASE_URL = 'https://omdbapi.com';
const API_KEY = '63a287ee';

const searchInput = document.getElementById('searchInput');
const resultsGrid = document.getElementById('resultsGrid');
const movieCardSample = document.getElementById('movieCardSample');

let debounceTimer;

searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim();
    clearTimeout(debounceTimer);

    if (query.length < 4) {
        resultsGrid.innerHTML = '';
        resultsGrid.appendChild(movieCardSample);
        return;
    }

    debounceTimer = setTimeout(() => {
        serchBy(query);
    }, 500);
});

async function serchBy(title = '') {
    try {
        const response = await fetch(`${API_BASE_URL}?apikey=${API_KEY}&s=${title}`);
        const data = await response.json();

        if (data.Response === "True") {
            const detailedMovies = await Promise.all(
                data.Search.map(async (movie) => {
                    const detailResponse = await fetch(`${API_BASE_URL}?apikey=${API_KEY}&i=${movie.imdbID}`);
                    return await detailResponse.json();
                })
            );
            displayResults(detailedMovies);
        } else {
            resultsGrid.innerHTML = '';
            resultsGrid.appendChild(movieCardSample);
            resultsGrid.insertAdjacentHTML('beforeend', `<p class="error-msg">Нічого не знайдено за запитом чи помилка API</p>`);
        }
    } catch (error) {
        console.error('Fetch failed: ', error.message);
        resultsGrid.innerHTML = '';
        resultsGrid.appendChild(movieCardSample);
        resultsGrid.insertAdjacentHTML('beforeend', `<p class="error-msg">Помилка мережі. Спробуйте пізніше.</p>`);
    }
}

function displayResults(movies) {
    resultsGrid.innerHTML = ''; 
    resultsGrid.appendChild(movieCardSample);

    movies.forEach(movie => {
        const newCard = movieCardSample.cloneNode(true);
        
        newCard.removeAttribute('id');
        newCard.style.display = 'flex';

        const img = newCard.querySelector('.movie-poster');
        img.src = movie.Poster !== "N/A" ? movie.Poster : 'https://placeholder.com';
        img.alt = movie.Title;

        newCard.querySelector('.movie-title').textContent = movie.Title;
        newCard.querySelector('.movie-year').textContent = movie.Year;
        newCard.querySelector('.movie-type').textContent = movie.Type;

        const rating = movie.imdbRating !== "N/A" ? movie.imdbRating : 'N/A';
        newCard.querySelector('.rating-value').textContent = `⭐️ ${rating}`;

        resultsGrid.appendChild(newCard);
    });
}
