const API_KEY = '3b68a0041f64019817b5a6a12fcfc882';
const BASE_URL = 'https://api.themoviedb.org/3';
const DEFAULT_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
const KINOBOX_API = 'https://api.kinobox.tv/api/players';
const CURRENT_YEAR = new Date().getFullYear();
const MIN_YEAR = 1888;
const PAGE_SIZE = 20;

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');
const tagsEl = document.getElementById('tags');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const current = document.getElementById('current');
const resultsStatus = document.getElementById('resultsStatus');
const paginationBlock = document.getElementById('paginationBlock');
const overlay = document.getElementById('myNav');
const overlayContent = document.getElementById('overlay-content');
const overlayCloseBtn = document.getElementById('overlayCloseBtn');
const scrollBtn = document.getElementById('scrollTopBtn');
const themeToggle = document.getElementById('themeToggleCheckbox');
const favoriteToggle = document.getElementById('favoriteToggle');
const typeButtons = document.getElementById('typeButtons');
const applyExtraFiltersBtn = document.getElementById('applyExtraFilters');
const resetFiltersBtn = document.getElementById('resetFilters');
const filtersDirtyBadge = document.getElementById('filtersDirtyBadge');
const yearFromInput = document.getElementById('yearFromInput');
const yearToInput = document.getElementById('yearToInput');
const yearFromRange = document.getElementById('yearFromRange');
const yearToRange = document.getElementById('yearToRange');
const yearSliderRange = document.getElementById('yearSliderRange');
const leftArrow = document.getElementById('left-arrow');
const rightArrow = document.getElementById('right-arrow');

const defaultFilters = Object.freeze({
  type: 'all',
  yearFrom: MIN_YEAR,
  yearTo: CURRENT_YEAR
});

const state = {
  currentPage: 1,
  totalPages: 1,
  query: '',
  selectedGenres: [],
  showFavoritesOnly: false,
  imageBaseUrl: DEFAULT_IMAGE_BASE_URL,
  imageBackdropBaseUrl: 'https://image.tmdb.org/t/p/original',
  genres: [],
  genresByKey: new Map(),
  appliedFilters: { ...defaultFilters },
  pendingFilters: { ...defaultFilters }
};

let activeSlide = 0;
let totalVideos = 0;

init();

async function init() {
  initTheme();
  initYearControls();
  bindEvents();
  renderLoading('Подключаемся к TMDB...');

  try {
    await Promise.all([initImageConfig(), loadGenres()]);
    renderGenreTags();
    syncFilterUiFromPending();
    await loadContent(1);
  } catch (error) {
    console.error('[init]', error);
    renderError('Не удалось инициализировать каталог. Попробуй обновить страницу чуть позже.');
    updateResultsStatus('Ошибка инициализации каталога.');
  }
}

function bindEvents() {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    state.query = search.value.trim();
    await loadContent(1);
  });

  prev.addEventListener('click', async () => {
    if (state.currentPage > 1) {
      await loadContent(state.currentPage - 1);
    }
  });

  next.addEventListener('click', async () => {
    if (state.currentPage < state.totalPages) {
      await loadContent(state.currentPage + 1);
    }
  });

  favoriteToggle.addEventListener('click', async () => {
    state.showFavoritesOnly = !state.showFavoritesOnly;
    favoriteToggle.textContent = state.showFavoritesOnly ? 'Показать всё' : 'Показать избранное';
    await loadContent(1);
  });

  typeButtons.addEventListener('click', (event) => {
    const button = event.target.closest('.type-btn');
    if (!button) return;
    state.pendingFilters.type = button.dataset.type;
    markFiltersDirty();
    syncTypeButtons();
  });

  applyExtraFiltersBtn.addEventListener('click', async () => {
    state.appliedFilters = { ...state.pendingFilters };
    updateFilterApplyState();
    await loadContent(1);
  });

  resetFiltersBtn.addEventListener('click', async () => {
    state.selectedGenres = [];
    state.pendingFilters = { ...defaultFilters };
    state.appliedFilters = { ...defaultFilters };
    renderGenreTags();
    syncFilterUiFromPending();
    updateFilterApplyState();
    await loadContent(1);
  });

  overlayCloseBtn.addEventListener('click', closeNav);
  leftArrow.addEventListener('click', () => {
    activeSlide = activeSlide > 0 ? activeSlide - 1 : totalVideos - 1;
    showVideos();
  });
  rightArrow.addEventListener('click', () => {
    activeSlide = activeSlide < totalVideos - 1 ? activeSlide + 1 : 0;
    showVideos();
  });

  window.addEventListener('click', (event) => {
    if (event.target === overlay) {
      closeNav();
    }
  });

  window.addEventListener('scroll', () => {
    scrollBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
  });

  scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  document.addEventListener('click', async (event) => {
    const watchButton = event.target.closest('.watch-online');
    if (watchButton) {
      const id = Number(watchButton.dataset.id);
      const mediaType = watchButton.dataset.mediaType;
      if (!id || !mediaType) return;

      try {
        const payload = await buildPlayerPayloadFromId(id, mediaType);
        window.location.hash = `${mediaType}-${id}`;
        await openKinoBox(payload);
      } catch (error) {
        console.error('[watch-online]', error);
        openPlayerError('Не удалось подготовить плеер. Попробуй ещё раз чуть позже.');
      }
      return;
    }

    const infoButton = event.target.closest('.know-more');
    if (infoButton) {
      const id = Number(infoButton.dataset.id);
      const mediaType = infoButton.dataset.mediaType;
      if (!id || !mediaType) return;
      const item = {
        id,
        mediaType,
        title: infoButton.dataset.title || '',
        originalTitle: infoButton.dataset.originalTitle || '',
        overview: infoButton.dataset.overview || '',
        releaseDate: infoButton.dataset.releaseDate || ''
      };
      openNav(item);
      return;
    }

    const favoriteButton = event.target.closest('.fav-btn');
    if (favoriteButton) {
      const id = Number(favoriteButton.dataset.id);
      const mediaType = favoriteButton.dataset.mediaType;
      if (!id || !mediaType) return;
      toggleFavorite({ id, mediaType });
      favoriteButton.classList.toggle('fav-active', isFavorite(id, mediaType));
      if (isFavorite(id, mediaType)) {
        favoriteButton.style.backgroundColor = 'gold';
        favoriteButton.style.color = '#333';
      } else {
        favoriteButton.style.backgroundColor = 'var(--star-bg)';
        favoriteButton.style.color = 'gold';
      }

      if (state.showFavoritesOnly) {
        await loadContent(1);
      }
    }
  });

  window.addEventListener('hashchange', async () => {
    const rawHash = window.location.hash.substring(1);
    if (!rawHash) return;
    try {
      const payload = await buildPlayerPayloadFromHash(rawHash);
      await openKinoBox(payload);
    } catch (error) {
      console.error('[hashchange]', error);
    }
  });
}

function initTheme() {
  const htmlEl = document.documentElement;
  const currentTheme = localStorage.getItem('theme') || 'light';
  htmlEl.setAttribute('data-theme', currentTheme);
  themeToggle.checked = currentTheme === 'dark';

  themeToggle.addEventListener('change', () => {
    const nextTheme = themeToggle.checked ? 'dark' : 'light';
    htmlEl.setAttribute('data-theme', nextTheme);
    localStorage.setItem('theme', nextTheme);
  });
}

function initYearControls() {
  [yearFromInput, yearToInput, yearFromRange, yearToRange].forEach((input) => {
    input.min = String(MIN_YEAR);
    input.max = String(CURRENT_YEAR);
  });

  yearFromInput.value = String(state.pendingFilters.yearFrom);
  yearToInput.value = String(state.pendingFilters.yearTo);
  yearFromRange.value = String(state.pendingFilters.yearFrom);
  yearToRange.value = String(state.pendingFilters.yearTo);

  yearFromRange.addEventListener('input', () => {
    const nextValue = clampYear(Number(yearFromRange.value));
    state.pendingFilters.yearFrom = Math.min(nextValue, state.pendingFilters.yearTo);
    if (state.pendingFilters.yearFrom > state.pendingFilters.yearTo) {
      state.pendingFilters.yearTo = state.pendingFilters.yearFrom;
    }
    syncFilterUiFromPending();
    markFiltersDirty();
  });

  yearToRange.addEventListener('input', () => {
    const nextValue = clampYear(Number(yearToRange.value));
    state.pendingFilters.yearTo = Math.max(nextValue, state.pendingFilters.yearFrom);
    if (state.pendingFilters.yearTo < state.pendingFilters.yearFrom) {
      state.pendingFilters.yearFrom = state.pendingFilters.yearTo;
    }
    syncFilterUiFromPending();
    markFiltersDirty();
  });

  yearFromInput.addEventListener('input', () => {
    const nextValue = clampYear(Number(yearFromInput.value || MIN_YEAR));
    state.pendingFilters.yearFrom = nextValue;
    if (state.pendingFilters.yearFrom > state.pendingFilters.yearTo) {
      state.pendingFilters.yearTo = state.pendingFilters.yearFrom;
    }
    syncFilterUiFromPending();
    markFiltersDirty();
  });

  yearToInput.addEventListener('input', () => {
    const nextValue = clampYear(Number(yearToInput.value || CURRENT_YEAR));
    state.pendingFilters.yearTo = nextValue;
    if (state.pendingFilters.yearTo < state.pendingFilters.yearFrom) {
      state.pendingFilters.yearFrom = state.pendingFilters.yearTo;
    }
    syncFilterUiFromPending();
    markFiltersDirty();
  });
}

function syncFilterUiFromPending() {
  syncTypeButtons();

  yearFromInput.value = String(state.pendingFilters.yearFrom);
  yearToInput.value = String(state.pendingFilters.yearTo);
  yearFromRange.value = String(state.pendingFilters.yearFrom);
  yearToRange.value = String(state.pendingFilters.yearTo);

  const range = CURRENT_YEAR - MIN_YEAR;
  const fromPercent = ((state.pendingFilters.yearFrom - MIN_YEAR) / range) * 100;
  const toPercent = ((state.pendingFilters.yearTo - MIN_YEAR) / range) * 100;
  yearSliderRange.style.left = `${fromPercent}%`;
  yearSliderRange.style.width = `${Math.max(0, toPercent - fromPercent)}%`;
}

function syncTypeButtons() {
  document.querySelectorAll('.type-btn').forEach((button) => {
    button.classList.toggle('active', button.dataset.type === state.pendingFilters.type);
  });
}

function markFiltersDirty() {
  updateFilterApplyState();
}

function updateFilterApplyState() {
  const dirty = isFilterDirty();
  applyExtraFiltersBtn.disabled = !dirty;
  filtersDirtyBadge.classList.toggle('hidden', !dirty);
}

function isFilterDirty() {
  return JSON.stringify(state.appliedFilters) !== JSON.stringify(state.pendingFilters);
}

async function initImageConfig() {
  try {
    const config = await apiFetch('/configuration');
    const secureBaseUrl = config?.images?.secure_base_url;
    const posterSizes = config?.images?.poster_sizes || [];
    const backdropSizes = config?.images?.backdrop_sizes || [];

    if (secureBaseUrl) {
      state.imageBaseUrl = secureBaseUrl + (posterSizes.includes('w500') ? 'w500' : (posterSizes[posterSizes.length - 1] || 'original'));
      state.imageBackdropBaseUrl = secureBaseUrl + (backdropSizes.includes('w780') ? 'w780' : (backdropSizes[backdropSizes.length - 1] || 'original'));
    }
  } catch (error) {
    console.warn('[initImageConfig] fallback to default image base url', error);
  }
}

async function loadGenres() {
  const [movieGenresData, tvGenresData] = await Promise.all([
    apiFetch('/genre/movie/list', { language: 'ru' }),
    apiFetch('/genre/tv/list', { language: 'ru' })
  ]);

  const genreMap = new Map();

  for (const genre of movieGenresData.genres || []) {
    const key = makeGenreKey(genre.name);
    if (!genreMap.has(key)) {
      genreMap.set(key, { key, label: genre.name, movieIds: [], tvIds: [] });
    }
    genreMap.get(key).movieIds.push(genre.id);
  }

  for (const genre of tvGenresData.genres || []) {
    const key = makeGenreKey(genre.name);
    if (!genreMap.has(key)) {
      genreMap.set(key, { key, label: genre.name, movieIds: [], tvIds: [] });
    }
    genreMap.get(key).tvIds.push(genre.id);
  }

  state.genres = Array.from(genreMap.values()).sort((a, b) => a.label.localeCompare(b.label, 'ru'));
  state.genresByKey = new Map(state.genres.map((genre) => [genre.key, genre]));
}

function renderGenreTags() {
  tagsEl.innerHTML = '';

  for (const genre of state.genres) {
    const element = document.createElement('button');
    element.type = 'button';
    element.className = 'tag';
    element.id = `genre-${genre.key}`;
    element.textContent = genre.label;
    element.addEventListener('click', async () => {
      if (state.selectedGenres.includes(genre.key)) {
        state.selectedGenres = state.selectedGenres.filter((item) => item !== genre.key);
      } else {
        state.selectedGenres.push(genre.key);
      }
      renderGenreTags();
      await loadContent(1);
    });

    if (state.selectedGenres.includes(genre.key)) {
      element.classList.add('highlight');
    }

    tagsEl.appendChild(element);
  }

  const clear = document.createElement('button');
  clear.type = 'button';
  clear.className = 'tag';
  clear.id = 'clear';
  clear.textContent = 'Сбросить';
  clear.addEventListener('click', async () => {
    state.selectedGenres = [];
    state.pendingFilters = { ...defaultFilters };
    state.appliedFilters = { ...defaultFilters };
    renderGenreTags();
    syncFilterUiFromPending();
    updateFilterApplyState();
    await loadContent(1);
  });
  tagsEl.appendChild(clear);
}

async function loadContent(page = 1) {
  state.currentPage = page;
  renderLoading('Загружаем каталог...');

  try {
    const payload = state.showFavoritesOnly ? await fetchFavoritesContent() : (state.query ? await fetchSearchContent(page) : await fetchDiscoverContent(page));

    state.totalPages = Math.max(1, payload.totalPages || 1);
    state.currentPage = Math.min(page, state.totalPages);

    if (!payload.items.length) {
      renderNoResults();
    } else {
      renderMovies(payload.items);
    }

    updatePagination();
    updateResultsStatus(payload.statusText || buildStatusText(payload.items.length));
  } catch (error) {
    console.error('[loadContent]', error);
    renderError('Ошибка сети или запроса к TMDB. Попробуй ещё раз чуть позже.');
    updatePagination({ forceDisabled: true });
    updateResultsStatus('Не удалось загрузить данные.');
  }
}

async function fetchDiscoverContent(page) {
  const { type } = state.appliedFilters;

  if (type === 'movie') {
    const response = await apiFetch('/discover/movie', buildDiscoverParams('movie', page));
    const items = (response.results || []).map((item) => normalizeItem(item, 'movie'));
    return {
      items,
      totalPages: response.total_pages || 1,
      statusText: buildStatusText(items.length)
    };
  }

  if (type === 'tv') {
    const response = await apiFetch('/discover/tv', buildDiscoverParams('tv', page));
    const items = (response.results || []).map((item) => normalizeItem(item, 'tv'));
    return {
      items,
      totalPages: response.total_pages || 1,
      statusText: buildStatusText(items.length)
    };
  }

  const movieImpossible = hasImpossibleGenreCombination('movie');
  const tvImpossible = hasImpossibleGenreCombination('tv');

  const [movieResponse, tvResponse] = await Promise.all([
    movieImpossible ? Promise.resolve({ results: [], total_pages: 1 }) : apiFetch('/discover/movie', buildDiscoverParams('movie', page)),
    tvImpossible ? Promise.resolve({ results: [], total_pages: 1 }) : apiFetch('/discover/tv', buildDiscoverParams('tv', page))
  ]);

  const items = [
    ...(movieResponse.results || []).map((item) => normalizeItem(item, 'movie')),
    ...(tvResponse.results || []).map((item) => normalizeItem(item, 'tv'))
  ].sort(sortByPopularity);

  return {
    items,
    totalPages: Math.max(movieResponse.total_pages || 1, tvResponse.total_pages || 1),
    statusText: buildStatusText(items.length)
  };
}

async function fetchSearchContent(page) {
  const { type } = state.appliedFilters;

  if (type === 'movie') {
    const response = await apiFetch('/search/movie', buildSearchParams('movie', page));
    const items = (response.results || [])
      .map((item) => normalizeItem(item, 'movie'))
      .filter(matchesClientSideFilters);

    return {
      items,
      totalPages: response.total_pages || 1,
      statusText: buildStatusText(items.length, true)
    };
  }

  if (type === 'tv') {
    const response = await apiFetch('/search/tv', buildSearchParams('tv', page));
    const items = (response.results || [])
      .map((item) => normalizeItem(item, 'tv'))
      .filter(matchesClientSideFilters);

    return {
      items,
      totalPages: response.total_pages || 1,
      statusText: buildStatusText(items.length, true)
    };
  }

  const response = await apiFetch('/search/multi', buildSearchParams('all', page));
  const items = (response.results || [])
    .filter((item) => item.media_type === 'movie' || item.media_type === 'tv')
    .map((item) => normalizeItem(item, item.media_type))
    .filter(matchesClientSideFilters);

  return {
    items,
    totalPages: response.total_pages || 1,
    statusText: buildStatusText(items.length, true)
  };
}

async function fetchFavoritesContent() {
  const favorites = getFavorites();
  if (!favorites.length) {
    return {
      items: [],
      totalPages: 1,
      statusText: 'Избранное пусто.'
    };
  }

  const details = await Promise.all(
    favorites.map(async (entry) => {
      try {
        const endpoint = entry.mediaType === 'tv' ? '/tv/' : '/movie/';
        const data = await apiFetch(`${endpoint}${entry.id}`, { language: 'ru-RU' });
        return normalizeItem(data, entry.mediaType);
      } catch (error) {
        console.warn('[fetchFavoritesContent] failed for', entry, error);
        return null;
      }
    })
  );

  const items = details.filter(Boolean).filter(matchesClientSideFilters).sort(sortByPopularity);

  return {
    items,
    totalPages: 1,
    statusText: items.length ? `Показано ${items.length} из избранного.` : 'По текущим фильтрам в избранном ничего не нашлось.'
  };
}

function buildDiscoverParams(mediaType, page) {
  const params = {
    api_key: API_KEY,
    language: 'ru-RU',
    include_adult: 'false',
    sort_by: 'popularity.desc',
    page: String(page)
  };

  const genreIds = getSelectedGenreIdsForType(mediaType);
  if (genreIds.impossible) {
    return params;
  }
  if (genreIds.value) {
    params.with_genres = genreIds.value;
  }

  const { yearFrom, yearTo } = state.appliedFilters;
  if (mediaType === 'movie') {
    if (yearFrom === yearTo) {
      params.year = String(yearFrom);
    } else {
      params['primary_release_date.gte'] = `${yearFrom}-01-01`;
      params['primary_release_date.lte'] = `${yearTo}-12-31`;
    }
  } else {
    if (yearFrom === yearTo) {
      params.first_air_date_year = String(yearFrom);
    } else {
      params['first_air_date.gte'] = `${yearFrom}-01-01`;
      params['first_air_date.lte'] = `${yearTo}-12-31`;
    }
  }

  return params;
}

function buildSearchParams(type, page) {
  const params = {
    api_key: API_KEY,
    language: 'ru-RU',
    include_adult: 'false',
    page: String(page),
    query: state.query
  };

  const { yearFrom, yearTo } = state.appliedFilters;
  if (type === 'movie' && yearFrom === yearTo) {
    params.year = String(yearFrom);
  }
  if (type === 'tv' && yearFrom === yearTo) {
    params.first_air_date_year = String(yearFrom);
  }

  return params;
}

function getSelectedGenreIdsForType(mediaType) {
  if (!state.selectedGenres.length) {
    return { impossible: false, value: '' };
  }

  const ids = [];
  for (const selectedKey of state.selectedGenres) {
    const option = state.genresByKey.get(selectedKey);
    if (!option) continue;
    const relevantIds = mediaType === 'movie' ? option.movieIds : option.tvIds;
    if (!relevantIds.length) {
      return { impossible: true, value: '' };
    }
    ids.push(...relevantIds);
  }

  return { impossible: false, value: ids.join(',') };
}

function hasImpossibleGenreCombination(mediaType) {
  return getSelectedGenreIdsForType(mediaType).impossible;
}

function matchesClientSideFilters(item) {
  if (!item) return false;

  const { type, yearFrom, yearTo } = state.appliedFilters;
  if (type !== 'all' && item.mediaType !== type) {
    return false;
  }

  const year = getItemYear(item.releaseDate);
  if (year && (year < yearFrom || year > yearTo)) {
    return false;
  }

  if (state.selectedGenres.length) {
    for (const selectedKey of state.selectedGenres) {
      const option = state.genresByKey.get(selectedKey);
      if (!option) continue;
      const relevantIds = item.mediaType === 'movie' ? option.movieIds : option.tvIds;
      if (!relevantIds.length) {
        return false;
      }
      if (!relevantIds.some((id) => item.genreIds.includes(id))) {
        return false;
      }
    }
  }

  return true;
}

function renderMovies(items) {
  main.innerHTML = '';

  for (const item of items) {
    const card = document.createElement('article');
    card.className = 'movie';
    const safeTitle = escapeHtml(item.title);
    const safeOriginalTitle = escapeHtml(item.originalTitle || item.title);
    const safeOverview = escapeHtml(item.overview || 'Описание отсутствует.');
    const poster = item.posterUrl ? `<img src="${item.posterUrl}" alt="${safeTitle}" loading="lazy" />` : `<div class="movie-poster-placeholder">${safeTitle}</div>`;

    card.innerHTML = `
      <div class="movie-poster-wrap">
        ${poster}
        <button class="fav-btn" data-id="${item.id}" data-media-type="${item.mediaType}" title="Добавить в избранное">★</button>
      </div>
      <div class="movie-body">
        <div class="movie-info">
          <h3>${safeTitle}</h3>
          <span class="${getColor(item.voteAverage)}">${formatVote(item.voteAverage)}</span>
        </div>
        <div class="movie-meta">
          <div class="movie-meta-line">${item.mediaType === 'tv' ? 'Сериал' : 'Фильм'}</div>
          <div class="movie-meta-line">${escapeHtml(formatFullDate(item.releaseDate))}</div>
        </div>
        <div class="buttons">
          <button class="know-more" data-id="${item.id}" data-media-type="${item.mediaType}" data-title="${safeTitle}" data-original-title="${safeOriginalTitle}" data-overview="${safeOverview}" data-release-date="${escapeHtml(item.releaseDate)}">Подробнее</button>
          <button class="watch-online" data-id="${item.id}" data-media-type="${item.mediaType}">Смотреть</button>
        </div>
      </div>
    `;

    const favBtn = card.querySelector('.fav-btn');
    if (isFavorite(item.id, item.mediaType)) {
      favBtn.style.backgroundColor = 'gold';
      favBtn.style.color = '#333';
    }

    main.appendChild(card);
  }
}

function renderNoResults() {
  main.innerHTML = `
    <div class="no-results">
      <h2>Ничего не найдено</h2>
      <p style="margin-top:0.65rem;color:var(--muted-text);line-height:1.6;">Попробуй изменить запрос, жанры или диапазон лет.</p>
    </div>
  `;
}

function renderError(message) {
  main.innerHTML = `
    <div class="error-box">
      <h2>Ошибка загрузки</h2>
      <p style="margin-top:0.65rem;color:var(--muted-text);line-height:1.6;">${escapeHtml(message)}</p>
    </div>
  `;
}

function renderLoading(message) {
  main.innerHTML = `
    <div class="loading-box">
      <div class="loading-spinner"></div>
      <h2>Загрузка</h2>
      <p style="margin-top:0.65rem;color:var(--muted-text);line-height:1.6;">${escapeHtml(message)}</p>
    </div>
  `;
}

function updatePagination(options = {}) {
  const forceDisabled = options.forceDisabled === true;
  const singlePage = state.showFavoritesOnly || state.totalPages <= 1;

  paginationBlock.style.display = state.showFavoritesOnly ? 'none' : 'flex';
  current.textContent = String(state.currentPage);

  prev.classList.toggle('disabled', forceDisabled || singlePage || state.currentPage <= 1);
  next.classList.toggle('disabled', forceDisabled || singlePage || state.currentPage >= state.totalPages);
}

function updateResultsStatus(text) {
  resultsStatus.textContent = text;
}

function buildStatusText(count, searchMode = false) {
  const parts = [];
  if (state.showFavoritesOnly) {
    parts.push(`Избранное: ${count}`);
  } else if (searchMode) {
    parts.push(`Найдено на странице: ${count}`);
  } else {
    parts.push(`Показано: ${count}`);
  }

  if (state.query) {
    parts.push(`запрос: «${state.query}»`);
  }

  const typeLabel = state.appliedFilters.type === 'movie' ? 'только фильмы' : state.appliedFilters.type === 'tv' ? 'только сериалы' : 'фильмы и сериалы';
  parts.push(typeLabel);

  if (state.appliedFilters.yearFrom === state.appliedFilters.yearTo) {
    parts.push(`год: ${state.appliedFilters.yearFrom}`);
  } else {
    parts.push(`годы: ${state.appliedFilters.yearFrom}–${state.appliedFilters.yearTo}`);
  }

  if (state.selectedGenres.length) {
    const labels = state.selectedGenres
      .map((key) => state.genresByKey.get(key)?.label)
      .filter(Boolean)
      .join(', ');
    if (labels) {
      parts.push(`жанры: ${labels}`);
    }
  }

  return parts.join(' • ');
}

async function openNav(item) {
  try {
    const videoData = await apiFetch(`/${item.mediaType}/${item.id}/videos`, { language: 'ru-RU' }).catch(() => apiFetch(`/${item.mediaType}/${item.id}/videos`));
    const videos = (videoData.results || []).filter((video) => video.site === 'YouTube');

    overlay.style.width = '100%';
    overlay.setAttribute('aria-hidden', 'false');

    const title = item.originalTitle || item.title;
    const subtitle = `${item.mediaType === 'tv' ? 'Сериал' : 'Фильм'} • ${formatFullDate(item.releaseDate)}`;

    if (videos.length) {
      const embed = videos.map((video) => `
        <iframe
          src="https://www.youtube.com/embed/${video.key}"
          class="embed hide"
          allowfullscreen
          title="${escapeHtml(video.name || title)}"
        ></iframe>
      `);
      const dots = videos.map((_, index) => `<span class="dot">${index + 1}</span>`);

      overlayContent.innerHTML = `
        <div class="overlay-headline">
          <div class="overlay-title">${escapeHtml(title)}</div>
          <div class="overlay-subtitle">${escapeHtml(subtitle)}</div>
        </div>
        ${embed.join('')}
        <div class="dots">${dots.join('')}</div>
        <div class="overlay-overview">
          <h3 style="margin-bottom:0.65rem;">Описание</h3>
          ${escapeHtml(item.overview || 'Описание отсутствует.')}
        </div>
      `;

      activeSlide = 0;
      showVideos();
      document.querySelectorAll('.dot').forEach((dot, index) => {
        dot.addEventListener('click', () => {
          activeSlide = index;
          showVideos();
        });
      });
    } else {
      overlayContent.innerHTML = `
        <div class="overlay-headline">
          <div class="overlay-title">${escapeHtml(title)}</div>
          <div class="overlay-subtitle">${escapeHtml(subtitle)}</div>
        </div>
        <div class="overlay-overview">
          <h3 style="margin-bottom:0.65rem;">Трейлеры не найдены</h3>
          ${escapeHtml(item.overview || 'Описание отсутствует.')}
        </div>
      `;
    }
  } catch (error) {
    console.error('[openNav]', error);
    overlay.style.width = '100%';
    overlayContent.innerHTML = '<h1 class="no-results">Не удалось загрузить информацию о трейлере</h1>';
  }
}

function closeNav() {
  overlay.style.width = '0%';
  overlay.setAttribute('aria-hidden', 'true');
}

function showVideos() {
  const embeds = document.querySelectorAll('.embed');
  const dots = document.querySelectorAll('.dot');
  totalVideos = embeds.length;

  embeds.forEach((embed, index) => {
    embed.classList.toggle('show', index === activeSlide);
    embed.classList.toggle('hide', index !== activeSlide);
  });

  dots.forEach((dot, index) => {
    dot.classList.toggle('active', index === activeSlide);
  });
}

function normalizeItem(item, mediaTypeHint = 'movie') {
  const mediaType = item.media_type || mediaTypeHint;
  const genreIds = Array.isArray(item.genre_ids)
    ? item.genre_ids.slice()
    : Array.isArray(item.genres)
      ? item.genres.map((genre) => genre.id)
      : [];

  const title = item.title || item.name || item.original_title || item.original_name || 'Без названия';
  const originalTitle = item.original_title || item.original_name || title;
  const releaseDate = item.release_date || item.first_air_date || '';
  const posterPath = item.poster_path || item.backdrop_path || '';

  return {
    id: Number(item.id),
    mediaType,
    title,
    originalTitle,
    overview: item.overview || '',
    releaseDate,
    voteAverage: Number(item.vote_average || 0),
    popularity: Number(item.popularity || 0),
    genreIds,
    posterUrl: posterPath ? buildImageUrl(posterPath) : ''
  };
}

function buildImageUrl(path) {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  return `${state.imageBaseUrl}${path}`;
}

function sortByPopularity(a, b) {
  return Number(b.popularity || 0) - Number(a.popularity || 0);
}

async function apiFetch(path, params = {}) {
  const url = new URL(`${BASE_URL}${path}`);
  const preparedParams = { ...params };
  if (!preparedParams.api_key) {
    preparedParams.api_key = API_KEY;
  }

  Object.entries(preparedParams).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') return;
    url.searchParams.set(key, String(value));
  });

  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error(`TMDB request failed: ${response.status}`);
  }
  return response.json();
}

function clampYear(year) {
  if (!Number.isFinite(year)) return MIN_YEAR;
  return Math.max(MIN_YEAR, Math.min(CURRENT_YEAR, Math.round(year)));
}

function getItemYear(dateString) {
  if (!dateString || !/^\d{4}-\d{2}-\d{2}$/.test(dateString)) return null;
  return Number(dateString.slice(0, 4));
}

function formatVote(vote) {
  if (!vote) return '—';
  return Number(vote).toFixed(1);
}

function getColor(vote) {
  if (vote >= 8) return 'green';
  if (vote >= 5) return 'orange';
  return 'red';
}

function formatFullDate(dateString) {
  if (!dateString) return 'Дата неизвестна';
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return 'Дата неизвестна';
  return new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(date);
}

function makeGenreKey(label) {
  return String(label || '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-zа-яё0-9-]/gi, '');
}

function escapeHtml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function getFavorites() {
  const raw = JSON.parse(localStorage.getItem('favMovies') || '[]');
  return raw
    .map((entry) => {
      if (typeof entry === 'number') {
        return { id: entry, mediaType: 'movie' };
      }
      if (entry && typeof entry.id !== 'undefined') {
        return {
          id: Number(entry.id),
          mediaType: entry.mediaType === 'tv' ? 'tv' : 'movie'
        };
      }
      return null;
    })
    .filter((entry) => entry && entry.id);
}

function saveFavorites(items) {
  localStorage.setItem('favMovies', JSON.stringify(items));
}

function isFavorite(id, mediaType) {
  return getFavorites().some((entry) => entry.id === Number(id) && entry.mediaType === mediaType);
}

function toggleFavorite(item) {
  const favorites = getFavorites();
  const index = favorites.findIndex((entry) => entry.id === Number(item.id) && entry.mediaType === item.mediaType);
  if (index === -1) {
    favorites.push({ id: Number(item.id), mediaType: item.mediaType });
  } else {
    favorites.splice(index, 1);
  }
  saveFavorites(favorites);
}

async function buildPlayerPayloadFromId(id, mediaType) {
  const endpointPrefix = mediaType === 'tv' ? '/tv/' : '/movie/';
  const [details, externalIds] = await Promise.all([
    apiFetch(`${endpointPrefix}${id}`, { language: 'ru-RU' }),
    apiFetch(`${endpointPrefix}${id}/external_ids`)
  ]);

  const title = details.title || details.name || details.original_title || details.original_name || (mediaType === 'tv' ? 'Сериал' : 'Фильм');
  document.title = title;

  return sanitizeMovieData({
    tmdb: String(id),
    imdb: externalIds.imdb_id || '',
    title,
    year: (details.release_date || details.first_air_date || '').slice(0, 4),
    poster: details.poster_path ? buildImageUrl(details.poster_path) : '',
    originalTitle: details.original_title || details.original_name || '',
    overview: details.overview || '',
    mediaType
  });
}

async function buildPlayerPayloadFromHash(hashVal) {
  if (!hashVal) throw new Error('Empty hash');

  if (hashVal.startsWith('movie-')) {
    return buildPlayerPayloadFromId(hashVal.substring(6), 'movie');
  }

  if (hashVal.startsWith('tv-')) {
    return buildPlayerPayloadFromId(hashVal.substring(3), 'tv');
  }

  if (hashVal.startsWith('tm')) {
    return buildPlayerPayloadFromId(hashVal.substring(2), 'movie');
  }

  if (hashVal.startsWith('tt')) {
    const imdbId = hashVal.toLowerCase();
    const findRes = await apiFetch(`/find/${imdbId}`, { language: 'ru-RU', external_source: 'imdb_id' });
    const movie = findRes?.movie_results?.[0] || findRes?.tv_results?.[0] || null;
    return sanitizeMovieData({
      imdb: imdbId,
      tmdb: movie?.id ? String(movie.id) : '',
      title: movie?.title || movie?.name || movie?.original_title || movie?.original_name || imdbId,
      year: (movie?.release_date || movie?.first_air_date || '').slice(0, 4),
      poster: movie?.poster_path ? buildImageUrl(movie.poster_path) : '',
      originalTitle: movie?.original_title || movie?.original_name || '',
      overview: movie?.overview || '',
      mediaType: movie?.media_type === 'tv' ? 'tv' : 'movie'
    });
  }

  const normalizedKp = hashVal.startsWith('kp') ? hashVal.substring(2) : hashVal;
  return sanitizeMovieData({ kinopoisk: normalizedKp, title: 'RMP Player' });
}

function sanitizeMovieData(input = {}) {
  const payload = {
    tmdb: input.tmdb ? String(input.tmdb).trim() : '',
    imdb: input.imdb ? String(input.imdb).trim() : '',
    kinopoisk: input.kinopoisk ? String(input.kinopoisk).trim() : '',
    title: input.title ? String(input.title).trim() : '',
    year: input.year ? String(input.year).trim() : '',
    poster: input.poster ? String(input.poster).trim() : '',
    originalTitle: input.originalTitle ? String(input.originalTitle).trim() : '',
    overview: input.overview ? String(input.overview).trim() : '',
    mediaType: input.mediaType === 'tv' ? 'tv' : 'movie'
  };

  if (!payload.tmdb && !payload.imdb && !payload.kinopoisk && !payload.title) {
    throw new Error('Movie payload is empty');
  }

  return payload;
}

async function fetchKinoboxSources(movieData) {
  const apiURL = new URL(KINOBOX_API);
  ['imdb', 'tmdb', 'kinopoisk', 'title'].forEach((key) => {
    if (movieData[key]) {
      apiURL.searchParams.set(key, movieData[key]);
    }
  });

  const request = await fetch(apiURL.toString(), { method: 'GET' });
  if (!request.ok || request.status !== 200) {
    throw new Error(`Request failed with status ${request.status}`);
  }

  const response = await request.json();
  if (typeof response !== 'object' || response === null || !Array.isArray(response.data)) {
    throw new Error('Invalid response format');
  }

  const playersData = response.data.filter((player) => player?.iframeUrl && player?.type);
  const turboIndex = playersData.findIndex((player) => String(player.type).toLowerCase() === 'turbo');
  if (turboIndex !== -1) {
    playersData.push(playersData.splice(turboIndex, 1)[0]);
  }
  return playersData;
}

function renderPlayerShell(meta = {}) {
  const safeTitle = escapeHtml(meta.title || meta.originalTitle || 'Онлайн-просмотр');
  const safeSubtitle = [
    meta.mediaType === 'tv' ? 'Сериал' : (meta.mediaType ? 'Фильм' : ''),
    meta.year,
    meta.imdb ? `IMDb: ${escapeHtml(meta.imdb)}` : '',
    meta.kinopoisk ? `KP: ${escapeHtml(meta.kinopoisk)}` : '',
    meta.tmdb ? `TMDB: ${escapeHtml(meta.tmdb)}` : ''
  ].filter(Boolean).join(' • ');

  document.body.innerHTML = `
    <div id="rmp-player-shell" style="position:fixed;inset:0;background:#0b0b0f;color:#fff;z-index:99999;display:flex;flex-direction:column;">
      <div style="display:flex;align-items:center;justify-content:space-between;gap:16px;padding:16px 20px;border-bottom:1px solid rgba(255,255,255,.08);background:rgba(0,0,0,.45);backdrop-filter:blur(10px);">
        <div style="display:flex;flex-direction:column;gap:4px;min-width:0;">
          <div style="font-size:20px;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${safeTitle}</div>
          <div style="font-size:12px;color:rgba(255,255,255,.65);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${safeSubtitle || 'Подбираем доступные источники...'}</div>
        </div>
        <button id="rmp-home-button" style="flex:0 0 auto;background:#fff;color:#111;font-size:14px;font-weight:700;border:0;border-radius:999px;padding:10px 16px;cursor:pointer;">← На главную</button>
      </div>
      <div style="flex:1;display:flex;align-items:stretch;justify-content:center;padding:18px;overflow:auto;">
        <div style="width:min(1480px,100%);display:flex;flex-direction:column;gap:14px;">
          <div id="rmp-sources" style="display:flex;flex-wrap:wrap;gap:10px;"></div>
          <div id="rmp-player-content" style="width:100%;min-height:min(78vh,900px);border-radius:18px;overflow:hidden;background:#111;box-shadow:0 25px 80px rgba(0,0,0,.45);display:flex;align-items:center;justify-content:center;"></div>
          <div id="rmp-player-status" style="font-size:12px;color:rgba(255,255,255,.6);text-align:center;line-height:1.5;">Подключаемся к Kinobox API...</div>
        </div>
      </div>
    </div>
  `;

  document.getElementById('rmp-home-button').addEventListener('click', () => {
    window.location.href = 'index.html';
  });
}

function setPlayerStatus(message) {
  const statusEl = document.getElementById('rmp-player-status');
  if (statusEl) {
    statusEl.textContent = message;
  }
}

function showPlayerPlaceholder(message) {
  const contentEl = document.getElementById('rmp-player-content');
  if (!contentEl) return;
  contentEl.innerHTML = `<div style="padding:24px;text-align:center;color:rgba(255,255,255,.7);font-size:18px;line-height:1.6;max-width:720px;">${escapeHtml(message)}</div>`;
}

function selectKinoboxSource(sourceData) {
  const contentEl = document.getElementById('rmp-player-content');
  if (!contentEl) return;

  const iframe = document.createElement('iframe');
  iframe.src = sourceData.iframeUrl;
  iframe.allowFullscreen = true;
  iframe.referrerPolicy = 'origin';
  iframe.style.width = '100%';
  iframe.style.height = 'min(78vh, 900px)';
  iframe.style.border = '0';
  iframe.style.background = '#111';

  contentEl.innerHTML = '';
  contentEl.appendChild(iframe);
  setPlayerStatus(`Источник: ${sourceData.type}. Если плеер пустой, попробуй другой источник или включи VPN.`);
}

function renderKinoboxSources(sourcesData) {
  const sourcesEl = document.getElementById('rmp-sources');
  if (!sourcesEl) return;

  sourcesEl.innerHTML = '';
  const preferredSource = localStorage.getItem('preferred-source');
  let preferredIndex = sourcesData.findIndex((source) => source.type === preferredSource);
  if (preferredIndex === -1) preferredIndex = 0;

  sourcesData.forEach((source, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = source.type;
    button.style.background = index === preferredIndex ? '#ffffff' : 'rgba(255,255,255,.08)';
    button.style.color = index === preferredIndex ? '#111111' : '#ffffff';
    button.style.border = '1px solid rgba(255,255,255,.12)';
    button.style.borderRadius = '999px';
    button.style.padding = '10px 14px';
    button.style.cursor = 'pointer';
    button.style.fontWeight = '700';
    button.style.transition = 'transform .15s ease, background .15s ease';

    button.addEventListener('mouseenter', () => {
      button.style.transform = 'translateY(-1px)';
    });

    button.addEventListener('mouseleave', () => {
      button.style.transform = 'translateY(0)';
    });

    button.addEventListener('click', () => {
      sourcesEl.querySelectorAll('button').forEach((el) => {
        el.style.background = 'rgba(255,255,255,.08)';
        el.style.color = '#ffffff';
      });
      button.style.background = '#ffffff';
      button.style.color = '#111111';
      localStorage.setItem('preferred-source', source.type);
      selectKinoboxSource(source);
    });

    sourcesEl.appendChild(button);
  });

  selectKinoboxSource(sourcesData[preferredIndex]);
}

async function openKinoBox(meta) {
  renderPlayerShell(meta);
  showPlayerPlaceholder('Подбираем доступные источники...');

  try {
    const sources = await fetchKinoboxSources(meta);
    if (!sources.length) {
      showPlayerPlaceholder('Источники не найдены. Попробуй другой фильм, открой страницу позже или проверь VPN/доступность сервиса в твоей сети.');
      setPlayerStatus('Kinobox API ответил, но источники для этого запроса не нашлись.');
      return;
    }
    renderKinoboxSources(sources);
  } catch (error) {
    console.error('[openKinoBox]', error);
    showPlayerPlaceholder('Не удалось получить данные от Kinobox API. Проверь, доступен ли сервис из твоей сети, и попробуй включить VPN.');
    setPlayerStatus(`Ошибка загрузки источников: ${error.message}`);
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

window.addEventListener('DOMContentLoaded', async () => {
  if (!window.location.hash) return;
  const rawHash = window.location.hash.substring(1);
  try {
    const payload = await buildPlayerPayloadFromHash(rawHash);
    await openKinoBox(payload);
  } catch (error) {
    console.error('[DOMContentLoaded hash open]', error);
    openPlayerError('Не удалось открыть фильм по ссылке. Ссылка могла устареть или источник сейчас недоступен.');
  }
});
