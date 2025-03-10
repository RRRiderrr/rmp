/* ========== script.js ========== */

const API_KEY = 'api_key=3b68a0041f64019817b5a6a12fcfc882';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY + '&language=ru-RU&region=ru';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = BASE_URL + '/search/movie?' + API_KEY + '&language=ru-RU&region=ru';

/* Список жанров */
const genres = [
  { id: 28,   name: 'Боевик' },
  { id: 12,   name: 'Приключения' },
  { id: 16,   name: 'Анимация' },
  { id: 35,   name: 'Комедия' },
  { id: 80,   name: 'Криминал' },
  { id: 99,   name: 'Документальный' },
  { id: 18,   name: 'Драма' },
  { id: 10751,name: 'Семейный' },
  { id: 14,   name: 'Фэнтези' },
  { id: 36,   name: 'Исторический' },
  { id: 27,   name: 'Ужасы' },
  { id: 10402,name: 'Мюзикл' },
  { id: 9648, name: 'Мистика' },
  { id: 10749,name: 'Романтика' },
  { id: 878,  name: 'Научная фантастика' },
  { id: 10770,name: 'Телефильм' },
  { id: 53,   name: 'Триллер' },
  { id: 10752,name: 'Военный' },
  { id: 37,   name: 'Вестерн' }
];

/* DOM-элементы */
const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');
const tagsEl = document.getElementById('tags');

const prev = document.getElementById('prev');
const next = document.getElementById('next');
const current = document.getElementById('current');

/* Параметры пагинации */
let currentPage = 1;
let nextPage = 2;
let prevPage = 3;
let totalPages = 100;
let lastUrl = '';

/* Жанры */
let selectedGenre = [];
/* Избранное */
let favMovies = JSON.parse(localStorage.getItem('favMovies')) || [];
/* Режим «Показать избранное» */
let showFavoritesOnly = false;

/* Установка жанров */
setGenre();
function setGenre() {
  tagsEl.innerHTML = '';
  genres.forEach((genre) => {
    const t = document.createElement('div');
    t.classList.add('tag');
    t.id = genre.id;
    t.innerText = genre.name;
    t.addEventListener('click', () => {
      if (selectedGenre.includes(genre.id)) {
        selectedGenre = selectedGenre.filter((g) => g !== genre.id);
      } else {
        selectedGenre.push(genre.id);
      }
      getMovies(API_URL + '&with_genres=' + encodeURI(selectedGenre.join(',')));
      highlightSelection();
    });
    tagsEl.append(t);
  });
}

function highlightSelection() {
  const tags = document.querySelectorAll('.tag');
  tags.forEach((tag) => tag.classList.remove('highlight'));
  clearBtn();
  if (selectedGenre.length !== 0) {
    selectedGenre.forEach((id) => {
      const t = document.getElementById(id);
      if (t) t.classList.add('highlight');
    });
  }
}

function clearBtn() {
  let clearBtn = document.getElementById('clear');
  if (clearBtn) {
    clearBtn.classList.add('highlight');
  } else {
    let clear = document.createElement('div');
    clear.classList.add('tag', 'highlight');
    clear.id = 'clear';
    clear.innerText = 'Сбросить';
    clear.addEventListener('click', () => {
      selectedGenre = [];
      setGenre();
      getMovies(API_URL);
    });
    tagsEl.append(clear);
  }
}

/* Стартовая загрузка популярных фильмов */
getMovies(API_URL);

/**
 * getMovies(url)
 * Если showFavoritesOnly -> showAllFavorites()
 * иначе -> fetch(url)
 */
function getMovies(url) {
  lastUrl = url;
  if (showFavoritesOnly) {
    showAllFavorites();
    return;
  }
  console.log('[getMovies]', url);

  fetch(url)
    .then(res => {
      if (!res.ok) throw new Error('Network error, status='+res.status);
      return res.json();
    })
    .then(data => {
      if (data.results && data.results.length !== 0) {
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
        main.innerHTML = `<h1 class="no-results">Ничего не найдено</h1>`;
      }
    })
    .catch(err => {
      console.error('[getMovies]', err);
      main.innerHTML = `<h1 class="no-results">Ошибка сети/запроса</h1>`;
    });
}

/**
 * showAllFavorites()
 * Загружаем все фильмы из favMovies
 */
function showAllFavorites() {
  if (!favMovies.length) {
    main.innerHTML = `<h1 class="no-results">Избранных фильмов нет</h1>`;
    return;
  }
  const promises = favMovies.map(id =>
    fetch(`${BASE_URL}/movie/${id}?${API_KEY}&language=ru-RU`)
      .then(res => res.json())
      .catch(err => {
        console.error('[showAllFavorites] fail on ID=', id, err);
        return null;
      })
  );
  Promise.all(promises)
    .then(allData => {
      const valid = allData.filter(m => m && m.id);
      if (!valid.length) {
        main.innerHTML = `<h1 class="no-results">Избранных фильмов нет</h1>`;
      } else {
        showMovies(valid);
      }
    })
    .catch(err => {
      console.error('[showAllFavorites]', err);
      main.innerHTML = `<h1 class="no-results">Ошибка при загрузке избранного</h1>`;
    });
}

/**
 * showMovies(data)
 * Рендерим карточки
 */
function showMovies(data) {
  main.innerHTML = '';
  console.log('[showMovies]', data.length, 'items');
  data.forEach(movie => {
    const { title, poster_path, vote_average, id } = movie;
    const movieEl = document.createElement('div');
    movieEl.classList.add('movie');
    movieEl.innerHTML = `
      <img src="${poster_path ? (IMG_URL + poster_path) : 'http://via.placeholder.com/1080x1580'}" alt="${title}">
      <div class="movie-info">
        <h3>${title}</h3>
        <span class="${getColor(vote_average)}">${vote_average}</span>
      </div>
      <div class="buttons">
        <button class="know-more" id="${id}">Подробнее</button>
        <button class="watch-online" data-id="${id}">Смотреть</button>
      </div>
      <button class="fav-btn" data-fav="${id}">★</button>
    `;
    main.appendChild(movieEl);

    // "Подробнее"
    document.getElementById(id).addEventListener('click', () => {
      openNav(movie);
    });

    // Избранное (звезда)
    const favBtn = movieEl.querySelector(`.fav-btn[data-fav="${id}"]`);
    if (favMovies.includes(id)) {
      favBtn.style.backgroundColor = 'gold';
      favBtn.style.color = '#333';
    }
    favBtn.addEventListener('click', () => {
      toggleFavorite(id);
      if (favMovies.includes(id)) {
        favBtn.style.backgroundColor = 'gold';
        favBtn.style.color = '#333';
      } else {
        favBtn.style.backgroundColor = 'var(--star-bg)';
        favBtn.style.color = 'gold';
      }
    });
  });
}

/* toggleFavorite(movieId) */
function toggleFavorite(movieId) {
  const idx = favMovies.indexOf(movieId);
  if (idx === -1) {
    favMovies.push(movieId);
  } else {
    favMovies.splice(idx, 1);
  }
  localStorage.setItem('favMovies', JSON.stringify(favMovies));
  if (showFavoritesOnly) {
    showAllFavorites();
  }
}

/* Оверлей (трейлер) */
const overlayContent = document.getElementById('overlay-content');
function openNav(movie) {
  const id = movie.id;
  fetch(`${BASE_URL}/movie/${id}/videos?${API_KEY}`)
    .then(res => res.json())
    .then(videoData => {
      document.getElementById('myNav').style.width = '100%';
      if (videoData && videoData.results && videoData.results.length > 0) {
        const embed = [];
        const dots = [];
        videoData.results.forEach((v, idx) => {
          if (v.site === 'YouTube') {
            embed.push(`
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/${v.key}"
                class="embed hide"
                allowfullscreen
              ></iframe>
            `);
            dots.push(`<span class="dot">${idx + 1}</span>`);
          }
        });
        const overview = `
          <div class="overview">
            <h3>Описание</h3>
            ${movie.overview || 'Описание отсутствует.'}
          </div>
        `;
        overlayContent.innerHTML = `
          <h1>${movie.original_title || movie.title}</h1>
          <br/>
          ${embed.join('')}
          <br/>
          <div class="dots">${dots.join('')}</div>
          ${overview}
        `;
        activeSlide = 0;
        showVideos();
        document.querySelectorAll('.dot').forEach((dot, i) => {
          dot.addEventListener('click', () => {
            activeSlide = i;
            showVideos();
          });
        });
      } else {
        overlayContent.innerHTML = `<h1 class="no-results">Нет доступных трейлеров</h1>`;
      }
    })
    .catch(err => console.error('[openNav]', err));
}
function closeNav() {
  document.getElementById('myNav').style.width = '0%';
}

/* Переключение трейлеров */
let activeSlide = 0;
let totalVideos = 0;
function showVideos() {
  const embedClasses = document.querySelectorAll('.embed');
  const dots = document.querySelectorAll('.dot');
  totalVideos = embedClasses.length;
  embedClasses.forEach((embedTag, idx) => {
    embedTag.classList.toggle('show', idx === activeSlide);
    embedTag.classList.toggle('hide', idx !== activeSlide);
  });
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === activeSlide);
  });
}
document.getElementById('left-arrow').addEventListener('click', () => {
  activeSlide = activeSlide > 0 ? activeSlide - 1 : totalVideos - 1;
  showVideos();
});
document.getElementById('right-arrow').addEventListener('click', () => {
  activeSlide = activeSlide < totalVideos - 1 ? activeSlide + 1 : 0;
  showVideos();
});

/* Цвет оценки */
function getColor(vote) {
  if (vote >= 8) return 'green';
  else if (vote >= 5) return 'orange';
  return 'red';
}

/* Поиск */
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const searchTerm = search.value;
  selectedGenre = [];
  setGenre();
  if (searchTerm) {
    getMovies(searchURL + '&query=' + searchTerm);
  } else {
    getMovies(API_URL);
  }
});

/* Пагинация */
prev.addEventListener('click', () => {
  if (prevPage > 0) {
    pageCall(prevPage);
  }
});
next.addEventListener('click', () => {
  if (nextPage <= totalPages) {
    pageCall(nextPage);
  }
});
function pageCall(page) {
  let urlSplit = lastUrl.split('?');
  let queryParams = urlSplit[1].split('&');
  let key = queryParams[queryParams.length - 1].split('=');
  if (key[0] !== 'page') {
    let url = lastUrl + '&page=' + page;
    getMovies(url);
  } else {
    key[1] = page.toString();
    queryParams[queryParams.length - 1] = key.join('=');
    let newUrl = urlSplit[0] + '?' + queryParams.join('&');
    getMovies(newUrl);
  }
}

/* =========== Кнопка "Смотреть" (Kinobox) ===========

   1) Если hash пуст -> ставим location.hash = '#tm<ID>'
   2) С помощью TMDB /movie/<id>?api_key берем title -> document.title
   3) /external_ids -> if imdb -> openKinoBox(imdb), else openKinoBox('tm'+id)
*/
document.addEventListener('click', (event) => {
  if (event.target.classList.contains('watch-online')) {
    const movieId = event.target.getAttribute('data-id');
    // 1) Проверяем, есть ли уже hash
    if (!window.location.hash) {
      window.location.hash = 'tm' + movieId;
    }
    // 2) Обновляем document.title из TMDB
    fetch(`${BASE_URL}/movie/${movieId}?${API_KEY}&language=ru-RU`)
      .then(r => r.json())
      .then(movieData => {
        if (movieData && movieData.title) {
          document.title = movieData.title;
        }
      })
      .catch(err => console.error('[watch-online] title error:', err));
    // 3) imdb? -> openKinoBox(imdb) : openKinoBox('tm'+id)
    fetch(`${BASE_URL}/movie/${movieId}/external_ids?${API_KEY}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed external_ids, status='+res.status);
        return res.json();
      })
      .then(data => {
        if (data.imdb_id) {
          openKinoBox(data.imdb_id);
        } else {
          openKinoBox('tm' + movieId);
        }
      })
      .catch(er => {
        console.error(er);
        openKinoBox('tm' + movieId);
      });
  }
});

/* openKinoBox(query): 
   Запускает плеер, центрируем,
   +Добавляем "На главную"
*/
function openKinoBox(query) {
  document.body.innerHTML = `<div class="kinobox_player" style="width: 80%; height: 80%;"></div>`;
  kbox('.kinobox_player', { search: { query } });
  centerKinobox();
  addHomeButton();
}
function centerKinobox() {
  const kinoboxPlayer = document.querySelector('.kinobox_player');
  kinoboxPlayer.style.position = 'fixed';
  kinoboxPlayer.style.top = '50%';
  kinoboxPlayer.style.left = '50%';
  kinoboxPlayer.style.transform = 'translate(-50%, -50%)';
  kinoboxPlayer.style.zIndex = '9999';
}
function addHomeButton() {
  const homeButton = document.createElement('button');
  homeButton.textContent = '← На главную';
  homeButton.style.position = 'fixed';
  homeButton.style.top = '20px';
  homeButton.style.left = '20px';
  homeButton.style.zIndex = '10000';
  homeButton.style.backgroundColor = '#fff';
  homeButton.style.color = '#000';
  homeButton.style.fontSize = '16px';
  homeButton.style.fontWeight = 'bold';
  homeButton.style.border = '1px solid #ccc';
  homeButton.style.borderRadius = '50px';
  homeButton.style.padding = '10px 20px';
  homeButton.style.cursor = 'pointer';
  homeButton.addEventListener('click', () => {
    window.location.href = 'index.html';
  });
  document.body.appendChild(homeButton);
}

/* Кнопка «Наверх» */
const scrollBtn = document.getElementById('scrollTopBtn');
window.addEventListener('scroll', () => {
  scrollBtn.style.display = (window.scrollY > 300) ? 'block' : 'none';
});
scrollBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* Попкорн + авто-открытие плеера из hash */
document.addEventListener('DOMContentLoaded', function() {
  // Попкорн-анимация
  const canvas = document.createElement('canvas');
  canvas.id = 'popcornCanvas';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const popcornImages = [
    'popcorn.png', 'popcorn2.png',
    'popcorn3.png', 'popcorn4.png', 'popcorn5.png'
  ];
  const popcornParticles = [];

  function spawnPopcorn(n) {
    for (let i=0; i<n; i++) {
      const randImg = popcornImages[Math.floor(Math.random()*popcornImages.length)];
      const popcorn = {
        x: Math.random()*canvas.width,
        y: canvas.height,
        size: Math.floor(Math.random()*41)+40,
        image: new Image()
      };
      popcorn.image.src = randImg;
      popcorn.velocity = {
        x: (Math.random()-0.5)*5,
        y: - (Math.random()*8+5)
      };
      popcornParticles.push(popcorn);
    }
  }
  function animatePopcorn() {
    requestAnimationFrame(animatePopcorn);
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for (let i=0; i<popcornParticles.length; i++) {
      const pc = popcornParticles[i];
      pc.velocity.y += 0.2;
      pc.x += pc.velocity.x;
      pc.y += pc.velocity.y;
      ctx.drawImage(pc.image, pc.x, pc.y, pc.size, pc.size);
      if (pc.y > canvas.height + pc.size) {
        popcornParticles.splice(i,1);
        i--;
      }
    }
  }
  document.addEventListener('keydown', (e) => {
    if (['p','з'].includes(e.key.toLowerCase())) {
      spawnPopcorn(50);
    }
  });
  animatePopcorn();

  // Авто-открытие плеера, если есть hash
  if (window.location.hash) {
    const rawHash = window.location.hash.substring(1); // убираем #
    // Чекаем, начинается ли 'tt'/'tm' или число
    // 1) Подтягиваем title
    updateTitleByHash(rawHash);
    // 2) Открываем плеер
    openKinoBox(rawHash);
  }
});

/* updateTitleByHash(hashVal):
   Определяем тип: imdb (tt...), tmdb (tm...), или kp(число).
   Потом делаем fetch для получения title -> document.title
*/
function updateTitleByHash(hashVal) {
  if (hashVal.startsWith('tt')) {
    // IMDb ID -> /find/xxxx?external_source=imdb_id
    fetch(`${BASE_URL}/find/${hashVal}?${API_KEY}&language=ru-RU&external_source=imdb_id`)
      .then(r => r.json())
      .then(data => {
        // data.movie_results[0] -> { title, name, original_title, ... }
        if (data && data.movie_results && data.movie_results.length) {
          const m = data.movie_results[0];
          document.title = m.title || m.original_title || 'Фильм';
        }
      })
      .catch(err => console.error('[updateTitleByHash:imdb]', err));
  } else if (hashVal.startsWith('tm')) {
    // TM... -> /movie/<число>
    const tmdbId = hashVal.substring(2);
    fetch(`${BASE_URL}/movie/${tmdbId}?${API_KEY}&language=ru-RU`)
      .then(r => r.json())
      .then(m => {
        if (m && m.title) {
          document.title = m.title;
        }
      })
      .catch(e => console.error('[updateTitleByHash:tmdb]', e));
  } else {
    // Иначе считаем число (КиноПоиск ID), 
    //   но TMDB тоже часто хранит
    fetch(`${BASE_URL}/movie/${hashVal}?${API_KEY}&language=ru-RU`)
      .then(r => r.json())
      .then(m => {
        if (m && m.title) {
          document.title = m.title;
        }
      })
      .catch(e => console.error('[updateTitleByHash:kp/other]', e));
  }
}

/* Темы (light/dark) */
const themeToggle = document.getElementById('themeToggleCheckbox');
const htmlEl = document.documentElement;
let currentTheme = localStorage.getItem('theme') || 'light';
htmlEl.setAttribute('data-theme', currentTheme);
themeToggle.checked = (currentTheme === 'dark');
themeToggle.addEventListener('change', () => {
  if (themeToggle.checked) {
    htmlEl.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
  } else {
    htmlEl.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
  }
});

/* Кнопка "Показать избранное" */
const favToggleBtn = document.getElementById('favoriteToggle');
favToggleBtn.addEventListener('click', () => {
  showFavoritesOnly = !showFavoritesOnly;
  favToggleBtn.textContent = showFavoritesOnly ? 'Показать все' : 'Показать избранное';
  getMovies(lastUrl);
});
