const Input = document.querySelector("#inputvalue");
const Search = document.querySelector("#search-btn");
const movies = document.querySelector(".movie-container");
const movie_detail = document.querySelector(".movie-detail");

let url = `https://api.themoviedb.org/3/search/movie?api_key=7312314f2520b88e7dc4d4fb21dc20f9&page=1&include_adult=false`;
let isLoading = true;
const cards = document.querySelector(".card-container");
var getMovieCast = async (id) => {
  const url = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=7312314f2520b88e7dc4d4fb21dc20f9`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    const cast = await data.cast;

    return cast;
  } catch (error) {
    return "cannot fetch data";
  }
};
//getMovieCast();
var getMovieDetails = async (event) => {
  cards.innerHTML = "";
  const MovieId = event.target.id;
  const movie_url = `https://api.themoviedb.org/3/movie/${MovieId}?api_key=7312314f2520b88e7dc4d4fb21dc20f9`;
  try {
    const response = await fetch(movie_url);
    const data = await response.json();
    const result = await data;
    const cast = await getMovieCast(MovieId);
    cast.map((detail) => {
      if (detail.profile_path) {
        cards.innerHTML += `
         <div class="card">
                        <div class="card-image">
                            <img src="https://image.tmdb.org/t/p/w500/${detail.profile_path}" alt="">
                        </div>
                        <div class="card-body">
                            <p class="character">${detail.character}</p>
                            <p class="real-name">${detail.name}</p>
                        </div>
                    </div>

        `;
      }
    });
    const {
      backdrop_path,
      overview,
      title,
      genres,
      release_date,
      runtime,
    } = await result;

    movie_detail.innerHTML = `
     <img src="https://image.tmdb.org/t/p/w500/${backdrop_path}" alt="" class="backdrop-image">
            <div class="backdrop">
                <h1>${title}</h1>
<ul>
<li>${release_date}</li>
<li>${runtime}mm</li>
<li>${genres[0].name}</li>
<li>${genres[1].name}</li>
</ul>
                <p>
                    <span>Overview</span><br>
                   ${overview}
                    </p>
            </div>
`;
  } catch (error) {
    console.log("cannot fetch data");
  }
};

const movieContainer = (result, isLoading) => {
  if (isLoading) {
    return (movies.innerHTML = "Loading....");
  } else {
    movies.innerHTML = "";
    isLoading = true;
    return result.map((movie) => {
      if (movie.poster_path) {
        movies.innerHTML += `<img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="" data-movie-id=${movie.id} onClick={getMovieDetails(event)} id=${movie.id}>`;
      }
    });
  }
};

Search.addEventListener("click", async (event) => {
  event.preventDefault();
  const newUrl = url + "&query=" + Input.value;
  try {
    isLoading = false;
    const response = await fetch(newUrl);
    const data = await response.json();
    const result = await data.results;
    const finalData = await movieContainer(result, isLoading);
    // finalData = "";
  } catch (error) {
    console.log("cannot fetch data");
    movies.innerHTML = "<p>Cannot fetch data :(</p>";
  }

  Input.value = "";
});
