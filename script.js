/* ========== script.js ========== */

const API_KEY = 'api_key=3b68a0041f64019817b5a6a12fcfc882';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY + '&language=ru-RU&region=ru';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = BASE_URL + '/search/movie?' + API_KEY + '&language=ru-RU&region=ru';

/* Список жанров */
const genres = [
  { id: 28, name: 'Боевик' },
  { id: 12, name: 'Приключения' },
  { id: 16, name: 'Анимация' },
  { id: 35, name: 'Комедия' },
  { id: 80, name: 'Криминал' },
  { id: 99, name: 'Документальный' },
  { id: 18, name: 'Драма' },
  { id: 10751, name: 'Семейный' },
  { id: 14, name: 'Фэнтези' },
  { id: 36, name: 'Исторический' },
  { id: 27, name: 'Ужасы' },
  { id: 10402, name: 'Мюзикл' },
  { id: 9648, name: 'Мистика' },
  { id: 10749, name: 'Романтика' },
  { id: 878, name: 'Научная фантастика' },
  { id: 10770, name: 'Телефильм' },
  { id: 53, name: 'Триллер' },
  { id: 10752, name: 'Военный' },
  { id: 37, name: 'Вестерн' }
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

function getMovies(url) {
  lastUrl = url;
  if (showFavoritesOnly) {
    showAllFavorites();
    return;
  }

  fetch(url)
    .then((res) => {
      if (!res.ok) throw new Error('Network error, status=' + res.status);
      return res.json();
    })
    .then((data) => {
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
        main.innerHTML = '<h1 class="no-results">Ничего не найдено</h1>';
      }
    })
    .catch((err) => {
      console.error('[getMovies]', err);
      main.innerHTML = '<h1 class="no-results">Ошибка сети/запроса</h1>';
    });
}

function showAllFavorites() {
  if (!favMovies.length) {
    main.innerHTML = '<h1 class="no-results">Избранных фильмов нет</h1>';
    return;
  }

  const promises = favMovies.map((id) =>
    fetch(`${BASE_URL}/movie/${id}?${API_KEY}&language=ru-RU`)
      .then((res) => res.json())
      .catch((err) => {
        console.error('[showAllFavorites] fail on ID=', id, err);
        return null;
      })
  );

  Promise.all(promises)
    .then((allData) => {
      const valid = allData.filter((m) => m && m.id);
      if (!valid.length) {
        main.innerHTML = '<h1 class="no-results">Избранных фильмов нет</h1>';
      } else {
        showMovies(valid);
      }
    })
    .catch((err) => {
      console.error('[showAllFavorites]', err);
      main.innerHTML = '<h1 class="no-results">Ошибка при загрузке избранного</h1>';
    });
}

function showMovies(data) {
  main.innerHTML = '';

  data.forEach((movie) => {
    const { title, poster_path, vote_average, id } = movie;
    const movieEl = document.createElement('div');
    movieEl.classList.add('movie');
    movieEl.innerHTML = `
      <img src="${poster_path ? (IMG_URL + poster_path) : 'https://via.placeholder.com/1080x1580?text=No+Poster'}" alt="${escapeHtml(title)}">
      <div class="movie-info">
        <h3>${escapeHtml(title)}</h3>
        <span class="${getColor(vote_average)}">${vote_average}</span>
      </div>
      <div class="buttons">
        <button class="know-more" id="movie-info-${id}">Подробнее</button>
        <button class="watch-online" data-id="${id}">Смотреть</button>
      </div>
      <button class="fav-btn" data-fav="${id}">★</button>
    `;
    main.appendChild(movieEl);

    document.getElementById(`movie-info-${id}`).addEventListener('click', () => {
      openNav(movie);
    });

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

const overlayContent = document.getElementById('overlay-content');
function openNav(movie) {
  const id = movie.id;
  fetch(`${BASE_URL}/movie/${id}/videos?${API_KEY}`)
    .then((res) => res.json())
    .then((videoData) => {
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
            ${escapeHtml(movie.overview || 'Описание отсутствует.')}
          </div>
        `;
        overlayContent.innerHTML = `
          <h1>${escapeHtml(movie.original_title || movie.title)}</h1>
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
        overlayContent.innerHTML = '<h1 class="no-results">Нет доступных трейлеров</h1>';
      }
    })
    .catch((err) => console.error('[openNav]', err));
}

function closeNav() {
  document.getElementById('myNav').style.width = '0%';
}

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

function getColor(vote) {
  if (vote >= 8) return 'green';
  if (vote >= 5) return 'orange';
  return 'red';
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const searchTerm = search.value;
  selectedGenre = [];
  setGenre();
  if (searchTerm) {
    getMovies(searchURL + '&query=' + encodeURIComponent(searchTerm));
  } else {
    getMovies(API_URL);
  }
});

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
  const urlSplit = lastUrl.split('?');
  const queryParams = urlSplit[1].split('&');
  const key = queryParams[queryParams.length - 1].split('=');
  if (key[0] !== 'page') {
    const url = lastUrl + '&page=' + page;
    getMovies(url);
  } else {
    key[1] = page.toString();
    queryParams[queryParams.length - 1] = key.join('=');
    const newUrl = urlSplit[0] + '?' + queryParams.join('&');
    getMovies(newUrl);
  }
}

/* =========== Кнопка "Смотреть" (Kinobox, новая статичная схема) =========== */
document.addEventListener('click', async (event) => {
  if (!event.target.classList.contains('watch-online')) return;

  const movieId = event.target.getAttribute('data-id');
  if (!movieId) return;

  try {
    const payload = await buildPlayerPayloadFromTmdb(movieId);
    window.location.hash = 'tm' + movieId;
    openKinoBox(payload);
  } catch (error) {
    console.error('[watch-online]', error);
    openPlayerError('Не удалось подготовить плеер. Попробуй ещё раз чуть позже.');
  }
});

async function buildPlayerPayloadFromTmdb(movieId) {
  const [movieRes, externalRes] = await Promise.all([
    fetch(`${BASE_URL}/movie/${movieId}?${API_KEY}&language=ru-RU`),
    fetch(`${BASE_URL}/movie/${movieId}/external_ids?${API_KEY}`)
  ]);

  if (!movieRes.ok) {
    throw new Error('TMDB movie request failed: ' + movieRes.status);
  }

  const movieData = await movieRes.json();
  const externalData = externalRes.ok ? await externalRes.json() : {};

  const title = movieData.title || movieData.original_title || 'Фильм';
  document.title = title;

  return {
    mode: 'tmdb',
    tmdbId: String(movieId),
    imdbId: externalData.imdb_id || '',
    kinopoiskId: '',
    title,
    originalTitle: movieData.original_title || '',
    year: movieData.release_date ? String(movieData.release_date).slice(0, 4) : ''
  };
}

async function buildPlayerPayloadFromHash(hashVal) {
  if (!hashVal) {
    throw new Error('Empty hash');
  }

  if (hashVal.startsWith('tm')) {
    return buildPlayerPayloadFromTmdb(hashVal.substring(2));
  }

  if (hashVal.startsWith('tt')) {
    const imdbId = hashVal;
    const findRes = await fetch(`${BASE_URL}/find/${imdbId}?${API_KEY}&language=ru-RU&external_source=imdb_id`);
    const data = findRes.ok ? await findRes.json() : {};
    const movie = data && data.movie_results && data.movie_results[0] ? data.movie_results[0] : null;
    const title = movie?.title || movie?.original_title || imdbId;
    document.title = title;

    return {
      mode: 'imdb',
      tmdbId: movie?.id ? String(movie.id) : '',
      imdbId,
      kinopoiskId: '',
      title,
      originalTitle: movie?.original_title || '',
      year: movie?.release_date ? String(movie.release_date).slice(0, 4) : ''
    };
  }

  const normalizedKp = hashVal.startsWith('kp') ? hashVal.substring(2) : hashVal;
  document.title = 'RMP Player';

  return {
    mode: 'kinopoisk',
    tmdbId: '',
    imdbId: '',
    kinopoiskId: normalizedKp,
    title: '',
    originalTitle: '',
    year: ''
  };
}

function renderPlayerShell(meta = {}) {
  const safeTitle = escapeHtml(meta.title || meta.originalTitle || 'Онлайн-просмотр');
  const safeSubtitle = [
    meta.year,
    meta.imdbId ? `IMDb: ${escapeHtml(meta.imdbId)}` : '',
    meta.kinopoiskId ? `KP: ${escapeHtml(meta.kinopoiskId)}` : ''
  ]
    .filter(Boolean)
    .join(' • ');

  document.body.innerHTML = `
    <div id="rmp-player-shell" style="position:fixed;inset:0;background:#0b0b0f;color:#fff;z-index:99999;display:flex;flex-direction:column;">
      <div style="display:flex;align-items:center;justify-content:space-between;gap:16px;padding:16px 20px;border-bottom:1px solid rgba(255,255,255,.08);background:rgba(0,0,0,.45);backdrop-filter:blur(10px);">
        <div style="display:flex;flex-direction:column;gap:4px;min-width:0;">
          <div style="font-size:20px;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${safeTitle}</div>
          <div style="font-size:12px;color:rgba(255,255,255,.65);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${safeSubtitle || 'Пробуем подобрать рабочий источник...'}</div>
        </div>
        <button id="rmp-home-button" style="flex:0 0 auto;background:#fff;color:#111;font-size:14px;font-weight:700;border:0;border-radius:999px;padding:10px 16px;cursor:pointer;">← На главную</button>
      </div>
      <div style="flex:1;display:flex;align-items:center;justify-content:center;padding:24px;overflow:auto;">
        <div style="width:min(1400px,100%);">
          <div class="kinobox_player" style="width:100%;min-height:min(78vh,900px);border-radius:18px;overflow:hidden;background:#111;box-shadow:0 25px 80px rgba(0,0,0,.45);"></div>
          <div id="rmp-player-status" style="margin-top:12px;font-size:12px;color:rgba(255,255,255,.6);text-align:center;">Если источник не подхватился сразу — подожди пару секунд или вернись и открой фильм заново.</div>
        </div>
      </div>
    </div>
  `;

  document.getElementById('rmp-home-button').addEventListener('click', () => {
    window.location.href = 'index.html';
  });
}

function initKinoboxPlayer(meta) {
  const searchPayload = {
    kinopoisk: meta.kinopoiskId || undefined,
    imdb: meta.imdbId || undefined,
    title: meta.title || meta.originalTitle || undefined
  };

  if (typeof window.Kinobox === 'function') {
    new window.Kinobox('.kinobox_player', { search: searchPayload }).init();
    return;
  }

  if (typeof window.kbox === 'function') {
    window.kbox('.kinobox_player', { search: searchPayload });
    return;
  }

  throw new Error('Kinobox script is not loaded');
}

function openKinoBox(meta) {
  renderPlayerShell(meta);

  try {
    initKinoboxPlayer(meta);
  } catch (error) {
    console.error('[openKinoBox]', error);
    openPlayerError('Скрипт плеера не загрузился. Проверь доступность kinobox и перезагрузи страницу.');
  }
}

function openPlayerError(message) {
  document.body.innerHTML = `
    <div style="position:fixed;inset:0;background:#0b0b0f;color:#fff;z-index:99999;display:flex;align-items:center;justify-content:center;padding:24px;">
      <div style="max-width:720px;width:100%;background:#14141b;border:1px solid rgba(255,255,255,.08);border-radius:24px;padding:28px;box-shadow:0 20px 60px rgba(0,0,0,.4);text-align:center;">
        <h1 style="margin:0 0 12px;font-size:28px;">Не удалось открыть плеер</h1>
        <p style="margin:0 0 20px;color:rgba(255,255,255,.72);line-height:1.6;">${escapeHtml(message)}</p>
        <button onclick="window.location.href='index.html'" style="background:#fff;color:#111;border:0;border-radius:999px;padding:12px 18px;font-size:15px;font-weight:700;cursor:pointer;">← Вернуться на главную</button>
      </div>
    </div>
  `;
}

const scrollBtn = document.getElementById('scrollTopBtn');
window.addEventListener('scroll', () => {
  if (scrollBtn) {
    scrollBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
  }
});
if (scrollBtn) {
  scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

document.addEventListener('DOMContentLoaded', function () {
  const canvas = document.createElement('canvas');
  canvas.id = 'popcornCanvas';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const popcornImages = ['popcorn.png', 'popcorn2.png', 'popcorn3.png', 'popcorn4.png', 'popcorn5.png'];
  const popcornParticles = [];

  function spawnPopcorn(n) {
    for (let i = 0; i < n; i++) {
      const randImg = popcornImages[Math.floor(Math.random() * popcornImages.length)];
      const popcorn = {
        x: Math.random() * canvas.width,
        y: canvas.height,
        size: Math.floor(Math.random() * 41) + 40,
        image: new Image()
      };
      popcorn.image.src = randImg;
      popcorn.velocity = {
        x: (Math.random() - 0.5) * 5,
        y: -(Math.random() * 8 + 5)
      };
      popcornParticles.push(popcorn);
    }
  }

  function animatePopcorn() {
    requestAnimationFrame(animatePopcorn);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < popcornParticles.length; i++) {
      const pc = popcornParticles[i];
      pc.velocity.y += 0.2;
      pc.x += pc.velocity.x;
      pc.y += pc.velocity.y;
      ctx.drawImage(pc.image, pc.x, pc.y, pc.size, pc.size);
      if (pc.y > canvas.height + pc.size) {
        popcornParticles.splice(i, 1);
        i--;
      }
    }
  }

  document.addEventListener('keydown', (e) => {
    if (['p', 'з'].includes(e.key.toLowerCase())) {
      spawnPopcorn(50);
    }
  });

  animatePopcorn();

  if (window.location.hash) {
    const rawHash = window.location.hash.substring(1);
    buildPlayerPayloadFromHash(rawHash)
      .then((meta) => openKinoBox(meta))
      .catch((err) => {
        console.error('[hash-open]', err);
        openPlayerError('Не удалось открыть фильм по ссылке. Ссылка могла устареть или источник сейчас недоступен.');
      });
  }
});

function updateTitleByHash(hashVal) {
  buildPlayerPayloadFromHash(hashVal)
    .then((meta) => {
      if (meta && (meta.title || meta.originalTitle)) {
        document.title = meta.title || meta.originalTitle;
      }
    })
    .catch((err) => console.error('[updateTitleByHash]', err));
}

const themeToggle = document.getElementById('themeToggleCheckbox');
const htmlEl = document.documentElement;
let currentTheme = localStorage.getItem('theme') || 'light';
htmlEl.setAttribute('data-theme', currentTheme);
if (themeToggle) {
  themeToggle.checked = currentTheme === 'dark';
  themeToggle.addEventListener('change', () => {
    if (themeToggle.checked) {
      htmlEl.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      htmlEl.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    }
  });
}

const favToggleBtn = document.getElementById('favoriteToggle');
if (favToggleBtn) {
  favToggleBtn.addEventListener('click', () => {
    showFavoritesOnly = !showFavoritesOnly;
    favToggleBtn.textContent = showFavoritesOnly ? 'Показать все' : 'Показать избранное';
    getMovies(lastUrl);
  });
}

function escapeHtml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
