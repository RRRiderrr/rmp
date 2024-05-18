//TMDB 

const API_KEY = 'api_key=3b68a0041f64019817b5a6a12fcfc882';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&'+API_KEY+'&language=ru-RU&region=ru';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = BASE_URL + '/search/movie?'+API_KEY+'&language=ru-RU&region=ru';

const genres = [
    {
      "id": 28,
      "name": "Боевик"
    },
    {
      "id": 12,
      "name": "Приключения"
    },
    {
      "id": 16,
      "name": "Анимация"
    },
    {
      "id": 35,
      "name": "Комедия"
    },
    {
      "id": 80,
      "name": "Криминал"
    },
    {
      "id": 99,
      "name": "Документальный"
    },
    {
      "id": 18,
      "name": "Драма"
    },
    {
      "id": 10751,
      "name": "Семейный"
    },
    {
      "id": 14,
      "name": "Фэнтези"
    },
    {
      "id": 36,
      "name": "Исторический"
    },
    {
      "id": 27,
      "name": "Ужасы"
    },
    {
      "id": 10402,
      "name": "Мюзикл"
    },
    {
      "id": 9648,
      "name": "Мистика"
    },
    {
      "id": 10749,
      "name": "Романтика"
    },
    {
      "id": 878,
      "name": "Научная фантастика"
    },
    {
      "id": 10770,
      "name": "Телефильм"
    },
    {
      "id": 53,
      "name": "Триллер"
    },
    {
      "id": 10752,
      "name": "Военный"
    },
    {
      "id": 37,
      "name": "Вестерн"
    }
  ]



const main = document.getElementById('main');
const form =  document.getElementById('form');
const search = document.getElementById('search');
const tagsEl = document.getElementById('tags');

const prev = document.getElementById('prev')
const next = document.getElementById('next')
const current = document.getElementById('current')



document.getElementById('next').addEventListener('click', function() {
    if (nextPage <= totalPages) {
        pageCall(nextPage);
    }
});

document.getElementById('prev').addEventListener('click', function() {
    if (prevPage > 0) {
        pageCall(prevPage);
    }
});




var currentPage = 1;
var nextPage = 2;
var prevPage = 3;
var lastUrl = '';
var totalPages = 100;

var selectedGenre = []
setGenre();
function setGenre() {
    tagsEl.innerHTML= '';
    genres.forEach(genre => {
        const t = document.createElement('div');
        t.classList.add('tag');
        t.id=genre.id;
        t.innerText = genre.name;
        t.addEventListener('click', () => {
            if(selectedGenre.length == 0){
                selectedGenre.push(genre.id);
            }else{
                if(selectedGenre.includes(genre.id)){
                    selectedGenre.forEach((id, idx) => {
                        if(id == genre.id){
                            selectedGenre.splice(idx, 1);
                        }
                    })
                }else{
                    selectedGenre.push(genre.id);
                }
            }
            console.log(selectedGenre)




            
            getMovies(API_URL + '&with_genres='+encodeURI(selectedGenre.join(',')))
            highlightSelection()
        })
        tagsEl.append(t);
    })
}

function highlightSelection() {
    const tags = document.querySelectorAll('.tag');
    tags.forEach(tag => {
        tag.classList.remove('highlight')
    })
    clearBtn()
    if(selectedGenre.length !=0){   
        selectedGenre.forEach(id => {
            const hightlightedTag = document.getElementById(id);
            hightlightedTag.classList.add('highlight');
        })
    }

}

function clearBtn(){
    let clearBtn = document.getElementById('clear');
    if(clearBtn){
        clearBtn.classList.add('highlight')
    }else{
            
        let clear = document.createElement('div');
        clear.classList.add('tag','highlight');
        clear.id = 'clear';
        clear.innerText = 'Clear x';
        clear.addEventListener('click', () => {
            selectedGenre = [];
            setGenre();            
            getMovies(API_URL);
        })
        tagsEl.append(clear);
    }
    
}

getMovies(API_URL);

function getMovies(url) {
  lastUrl = url;
  fetch(url).then(res => res.json()).then(data => {
      console.log(data.results);
      if (data.results.length !== 0) {
          showMovies(data.results);
          currentPage = data.page;
          nextPage = currentPage + 1;
          prevPage = currentPage - 1;
          totalPages = data.total_pages;

          current.innerText = currentPage;

          if (currentPage <= 1) {
              prev.classList.add('disabled');
              next.classList.remove('disabled');
          } else if (currentPage >= totalPages) {
              prev.classList.remove('disabled');
              next.classList.add('disabled');
          } else {
              prev.classList.remove('disabled');
              next.classList.remove('disabled');
          }
      } else {
          main.innerHTML = `<h1 class="no-results">No Results Found</h1>`;
          // Добавим панель пагинации в конец контейнера main даже если нет результатов
          main.appendChild(document.querySelector('.pagination'));
      }
  });
}

// Update the showMovies function to correctly append movie elements to the catalog
function showMovies(data) {
  const main = document.getElementById('main');
  const pagination = document.querySelector('.pagination');
  main.innerHTML = '';

  data.forEach(movie => {
      const {title, poster_path, vote_average, id} = movie;
      const movieEl = document.createElement('div');
      movieEl.classList.add('movie');
      movieEl.innerHTML = `
          <img src="${poster_path ? IMG_URL + poster_path : "http://via.placeholder.com/300x450"}" alt="${title}">
          <div class="movie-content">
              <div class="movie-info">
                  <h3>${title}</h3>
                  <span class="${getColor(vote_average)}">${vote_average}</span>
              </div>
              <div class="buttons"> <!-- Контейнер для кнопок -->
                  <button class="know-more" id="${id}">Подробнее</button>
                  <button class="watch-online" data-id="${id}">Смотреть онлайн</button>
              </div>
          </div>
      `;

      main.appendChild(movieEl);

      document.getElementById(id).addEventListener('click', () => {
          console.log(id);
          openNav(movie);
      });
  });

  // Добавим панель пагинации в конец контейнера main
  main.appendChild(pagination);
}


const overlayContent = document.getElementById('overlay-content');
/* Open when someone clicks on the span element */
function openNav(movie) {
  const id = movie.id;
  fetch(`${BASE_URL}/movie/${id}/videos?${API_KEY}`)
      .then(res => res.json())
      .then(videoData => {
          console.log(videoData);
          if (videoData) {
              document.getElementById("myNav").style.width = "100%";
              const overlayContent = document.getElementById('overlay-content');
              
              if (videoData.results.length > 0) {
                  const embed = [];
                  const dots = [];

                  videoData.results.forEach((video, idx) => {
                      const { name, key, site } = video;
                      if (site === 'YouTube') {
                          embed.push(`
                              <iframe width="560" height="315" src="https://www.youtube.com/embed/${key}" title="${name}" class="embed hide" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                          `);
                          dots.push(`
                              <span class="dot">${idx + 1}</span>
                          `);
                      }
                  });

                  const overview = `
                      <div class="overview">
                          <h3>Описание</h3>
                          ${movie.overview}
                      </div>
                  `;

                  const content = `
                      <h1 class="no-results">${movie.original_title}</h1>
                      <br/>
                      ${embed.join('')}
                      <br/>
                      <div class="dots">${dots.join('')}</div>
                      ${overview}
                  `;

                  overlayContent.innerHTML = content;
                  activeSlide = 0; 
                  showVideos(); 
                  
                  const dotsElements = document.querySelectorAll('.dot');
                  dotsElements.forEach((dot, index) => {
                      dot.addEventListener('click', () => {
                          activeSlide = index; 
                          showVideos(); 
                      });
                  });

              } else {
                  overlayContent.innerHTML = `<h1 class="no-results">No Results Found</h1>`;
              }
          }
      });
}





/* Close when someone clicks on the "x" symbol inside the overlay */
function closeNav() {
  document.getElementById("myNav").style.width = "0%";
}

var activeSlide = 0;
var totalVideos = 0;

function showVideos(){
  let embedClasses = document.querySelectorAll('.embed');
  let dots = document.querySelectorAll('.dot');

  totalVideos = embedClasses.length; 
  embedClasses.forEach((embedTag, idx) => {
    if(activeSlide == idx){
      embedTag.classList.add('show')
      embedTag.classList.remove('hide')

    }else{
      embedTag.classList.add('hide');
      embedTag.classList.remove('show')
    }
  })

  dots.forEach((dot, indx) => {
    if(activeSlide == indx){
      dot.classList.add('active');
    }else{
      dot.classList.remove('active')
    }
  })
}

const leftArrow = document.getElementById('left-arrow')
const rightArrow = document.getElementById('right-arrow')

leftArrow.addEventListener('click', () => {
  if(activeSlide > 0){
    activeSlide--;
  }else{
    activeSlide = totalVideos -1;
  }

  showVideos()
})

rightArrow.addEventListener('click', () => {
  if(activeSlide < (totalVideos -1)){
    activeSlide++;
  }else{
    activeSlide = 0;
  }
  showVideos()
})


function getColor(vote) {
    if(vote>= 8){
        return 'green'
    }else if(vote >= 5){
        return "orange"
    }else{
        return 'red'
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchTerm = search.value;
    selectedGenre=[];
    setGenre();
    if(searchTerm) {
        getMovies(searchURL+'&query='+searchTerm)
    }else{
        getMovies(API_URL);
    }

})

prev.addEventListener('click', () => {
  if(prevPage > 0){
    pageCall(prevPage);
  }
})

next.addEventListener('click', () => {
  if(nextPage <= totalPages){
    pageCall(nextPage);
  }
})

function pageCall(page) {
  let urlSplit = lastUrl.split('?');
  let queryParams = urlSplit[1].split('&');
  let key = queryParams[queryParams.length - 1].split('=');
  if (key[0] != 'page') {
      let url = lastUrl + '&page=' + page;
      getMovies(url);
  } else {
      key[1] = page.toString();
      let a = key.join('=');
      queryParams[queryParams.length - 1] = a;
      let b = queryParams.join('&');
      let url = urlSplit[0] + '?' + b;
      getMovies(url);
  }
}

// Event listeners for pagination
document.getElementById('prev').addEventListener('click', () => {
  if (prevPage > 0) {
      pageCall(prevPage);
  }
});

document.getElementById('next').addEventListener('click', () => {
  if (nextPage <= totalPages) {
      pageCall(nextPage);
  }
});
document.addEventListener('click', function(event) {
  if (event.target.classList.contains('watch-online')) {
      const movieId = event.target.getAttribute('data-id');
      console.log('Fetching IMDb ID for movie:', movieId);
      
      fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=3b68a0041f64019817b5a6a12fcfc882&language=ru-RU`)
          .then(response => {
              if (!response.ok) {
                  throw new Error('Failed to fetch IMDb ID');
              }
              return response.json();
          })
          .then(data => {
              console.log('Response data:', data);
              const movieTitle = data.title || data.original_title;
              const imdbId = data.imdb_id;
              if (imdbId) {
                  console.log('IMDb ID found:', imdbId);
                  initializeKinobox(imdbId);
                  updateUrlWithImdbId(imdbId);
                  centerKinobox();
        addHomeButton();
              } else {
                  throw new Error('IMDb ID not found for this movie.');
              }

              
              if (movieTitle) {
          document.title = movieTitle; 
          updateOpenGraphTags(movieTitle, 'Смотреть на RMP');
          
        } else {
          throw new Error('Movie title not found.');
        }

              
          })
          .catch(error => {
              console.error('Error fetching IMDb ID:', error);
              alert('Failed to fetch IMDb ID. Please try again later.');
          });
  }
});

function updateOpenGraphTags(title, description) {
  const metaTitle = document.querySelector('meta[property="og:title"]');
  const metaDescription = document.querySelector('meta[property="og:description"]');
  metaTitle.content = title;
  metaDescription.content = description;
}

function updateUrlWithImdbId(imdbId) {
  window.location.hash = imdbId;
}

// Function to initialize Kinobox player with IMDb ID
function initializeKinobox(imdbId) {
  document.body.innerHTML = `<div class="kinobox_player" style="width: 80%; height: 80%;"></div>`;
  new Kinobox('.kinobox_player', {search: {query: imdbId}}).init();
  centerKinobox();
}


function centerKinobox() {
    const kinoboxPlayer = document.querySelector('.kinobox_player');
    kinoboxPlayer.style.position = 'fixed';
    kinoboxPlayer.style.top = '0';
    kinoboxPlayer.style.left = '0';
    kinoboxPlayer.style.width = '100%';
    kinoboxPlayer.style.height = '100vh';
    kinoboxPlayer.style.zIndex = '9999';
}


// Function to initialize Kinobox player with IMDb ID and center it
function initializeKinoboxWithHash() {
  const imdbId = window.location.hash.substring(1); // Remove '#' from the hash
  if (imdbId) {
      initializeKinobox(imdbId);
      centerKinobox();
      addHomeButton();
  }
}

// Function to center the Kinobox player on the screen
function centerKinobox() {
  const kinoboxPlayer = document.querySelector('.kinobox_player');
  kinoboxPlayer.style.position = 'fixed';
  kinoboxPlayer.style.top = '50%';
  kinoboxPlayer.style.left = '50%';
  kinoboxPlayer.style.transform = 'translate(-50%, -50%)';
  kinoboxPlayer.style.zIndex = '9999'; // Set higher z-index

  // Adjust size of Kinobox player
  kinoboxPlayer.style.width = '80%'; // Adjust the width as needed
  kinoboxPlayer.style.height = '80%'; // Adjust the height as needed
}

// Function to add a home button
function addHomeButton() {
  const homeButton = document.createElement('button');
  homeButton.textContent = '← На главную';
  homeButton.style.position = 'fixed';
  homeButton.style.top = '20px';
  homeButton.style.left = '20px';
  homeButton.style.zIndex = '10000'; // Set higher z-index than Kinobox player

  homeButton.style.backgroundColor='#19191a';
  homeButton.style.color='white';
  homeButton.style.fontSize= '16px';
  homeButton.style.fontWeight= 'bold';
  homeButton.style.border='0';
  homeButton.style.borderRadius= '50px';
  homeButton.style.padding='10px 20px' ;
  homeButton.style.marginTop= '5px';
  homeButton.style.cursor= 'pointer';

  homeButton.addEventListener('click', () => {
      window.location.href = 'index.html';
  });
  document.body.appendChild(homeButton);
}

// Call initializeKinoboxWithHash when the page loads
window.addEventListener('load', initializeKinoboxWithHash);

// Event listener for the "Watch Online" button
document.addEventListener('click', function(event) {
  if (event.target.classList.contains('watch-online')) {
      const movieId = event.target.getAttribute('data-id');
      console.log('Fetching IMDb ID for movie:', movieId);

      fetch(`https://api.themoviedb.org/3/movie/${movieId}/external_ids?${API_KEY}`)
          .then(response => {
              if (!response.ok) {
                  throw new Error('Failed to fetch IMDb ID');
              }
              return response.json();
          })
          .then(data => {
              console.log('Response data:', data);
              const imdbId = data.imdb_id;
              if (imdbId) {
                  initializeKinobox(imdbId);
                  centerKinobox();
                  addHomeButton();
              } else {
                  throw new Error('IMDb ID not found for this movie.');
              }
          })
          .catch(error => {
              console.error('Error fetching IMDb ID:', error);
              alert('Failed to fetch IMDb ID. Please try again later.');
          });
  }
});







document.addEventListener("DOMContentLoaded", function() {
  const canvas = document.createElement("canvas");
  canvas.id = "popcornCanvas";
  canvas.style.position = "fixed";
  canvas.style.top = "0";
  canvas.style.left = "0";
  canvas.style.pointerEvents = "none";
  canvas.style.zIndex = "9999"; // Set a high z-index to appear on top
  document.body.appendChild(canvas);
    

  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;


    
  const popcornImages = ["popcorn.png", "popcorn2.png", "popcorn3.png", "popcorn4.png", "popcorn5.png"];

  const popcornParticles = [];

  function spawnPopcorn(amount) {
      for (let i = 0; i < amount; i++) {
          const randomImage = popcornImages[Math.floor(Math.random() * popcornImages.length)];
          const popcorn = {
              x: Math.random() * canvas.width,
              y: canvas.height,
              size: Math.floor(Math.random() * (80 - 40 + 1)) + 40,
              image: new Image()
          };

          popcorn.image.src = randomImage;

          popcorn.velocity = {
              x: (Math.random() - 0.5) * 5,
              y: -(Math.random() * 8 + 5)
          };

          popcornParticles.push(popcorn);
      }
  }

  function animate() {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < popcornParticles.length; i++) {
          const popcorn = popcornParticles[i];

          popcorn.velocity.y += 0.2;

          popcorn.x += popcorn.velocity.x;
          popcorn.y += popcorn.velocity.y;

          ctx.drawImage(popcorn.image, popcorn.x, popcorn.y, popcorn.size, popcorn.size);

          if (popcorn.y > canvas.height + popcorn.size) {
              popcornParticles.splice(i, 1);
              i--;
          }
      }
  }

  document.addEventListener("keydown", function(event) {
      if (event.key === "p" || event.key === "P" || event.key === "з" || event.key === "З") {
          spawnPopcorn(50);  // Spawn 50 particles at once
      }
  });

  animate();

    var metaTitle = document.querySelector('meta[property="og:title"]');
    var metaDescription = document.querySelector('meta[property="og:description"]');

    if (window.location.hash) {
    const movieId = window.location.hash.substring(1); // Получаем ID из URL

    if (movieId.startsWith('tt')) {
      
      fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=3b68a0041f64019817b5a6a12fcfc882&language=ru-RU`)
        .then(response => response.json())
        .then(data => {
          metaTitle.content = data.title;
          metaDescription.content = "Смотреть на RMP";
          document.title = data.title;  // Обновление заголовка вкладки
        })
        .catch(error => console.error('Ошибка при получении данных фильма с TMDB:', error));
    } else {
      
      fetch(`https://kinopoiskapiunofficial.tech/api/v2.2/films/${movieId}`, {
        headers: {
          'X-API-KEY': 'd0d5a542-754d-4365-a46f-07f88ebabc82'
        }
      })
        .then(response => response.json())
        .then(data => {
          const title = data.nameRu || data.nameEn || data.nameOriginal;
          metaTitle.content = title;
          metaDescription.content = "Смотреть на RMP";
          document.title = title;  
        })
        .catch(error => console.error('Ошибка при получении данных фильма с КиноПоиска:', error));
    }
  }
});

