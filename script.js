const API_KEY = '3b68a0041f64019817b5a6a12fcfc882';
const BASE_URL = 'https://api.themoviedb.org/3';
const DEFAULT_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
const KINOBOX_API = 'https://api.kinobox.tv/api/players';
const CURRENT_YEAR = new Date().getFullYear();
const MIN_YEAR = 1888;
const PAGE_SIZE = 20;
const GOOGLE_CALENDAR_BASE_URL = 'https://calendar.google.com/calendar/render';
const EPISODE_CALENDAR_CONCURRENCY = 4;
const EPISODE_CALENDAR_MAX_ITEMS = 24;

const tvCalendarMetaCache = new Map();
const tvEpisodeScheduleCache = new Map();

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
    const calendarToggleButton = event.target.closest('.episode-calendar-btn');
    if (calendarToggleButton) {
      event.preventDefault();
      event.stopPropagation();
      const wrapper = calendarToggleButton.closest('.episode-calendar-wrapper');
      if (!wrapper) return;

      const isPinnedOpen = wrapper.classList.contains('popover-open');
      if (isPinnedOpen) {
        wrapper.classList.remove('popover-open');
        wrapper.classList.add('popover-force-closed');
        scheduleEpisodeCalendarLayerDeactivate(wrapper);
        calendarToggleButton.blur();
        return;
      }

      closeEpisodeCalendarPopovers(wrapper);
      wrapper.classList.remove('popover-force-closed');
      wrapper.classList.add('popover-open');
      setEpisodeCalendarLayerState(wrapper, true);
      positionEpisodeCalendarPopover(wrapper);
      await ensureEpisodeCalendarLoaded(wrapper);
      return;
    }

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

  document.addEventListener('click', (event) => {
    if (!event.target.closest('.episode-calendar-wrapper')) {
      closeEpisodeCalendarPopovers();
    }
  });

  document.addEventListener('pointerdown', (event) => {
    if (!event.target.closest('.episode-calendar-wrapper')) {
      closeEpisodeCalendarPopovers();
    }
  });

  document.addEventListener('mouseleave', (event) => {
    const wrapper = event.target?.closest?.('.episode-calendar-wrapper');
    if (wrapper) {
      wrapper.classList.remove('popover-force-closed');
    }
  }, true);

  document.addEventListener('mouseover', (event) => {
    const wrapper = event.target.closest('.episode-calendar-wrapper');
    if (wrapper) {
      setEpisodeCalendarLayerState(wrapper, true);
      positionEpisodeCalendarPopover(wrapper);
      void ensureEpisodeCalendarLoaded(wrapper);
    }
  });

  document.addEventListener('mouseout', (event) => {
    const wrapper = event.target?.closest?.('.episode-calendar-wrapper');
    if (wrapper) {
      scheduleEpisodeCalendarLayerDeactivate(wrapper);
    }
  }, true);

  document.addEventListener('focusin', (event) => {
    const wrapper = event.target.closest('.episode-calendar-wrapper');
    if (wrapper) {
      setEpisodeCalendarLayerState(wrapper, true);
      positionEpisodeCalendarPopover(wrapper);
      void ensureEpisodeCalendarLoaded(wrapper);
    }
  });

  document.addEventListener('focusout', (event) => {
    const wrapper = event.target?.closest?.('.episode-calendar-wrapper');
    if (wrapper) {
      scheduleEpisodeCalendarLayerDeactivate(wrapper);
    }
  }, true);

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeEpisodeCalendarPopovers();
    }
  });

  window.addEventListener('resize', () => {
    document.querySelectorAll('.episode-calendar-wrapper.popover-open, .episode-calendar-wrapper:hover').forEach((wrapper) => {
      positionEpisodeCalendarPopover(wrapper);
    });
  });

  window.addEventListener('scroll', () => {
    document.querySelectorAll('.episode-calendar-wrapper.popover-open, .episode-calendar-wrapper:hover').forEach((wrapper) => {
      positionEpisodeCalendarPopover(wrapper);
    });
  }, { passive: true });

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
      queueEpisodeCalendarAvailability(payload.items);
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
    card.dataset.id = String(item.id);
    card.dataset.mediaType = item.mediaType;

    const safeTitle = escapeHtml(item.title);
    const safeOriginalTitle = escapeHtml(item.originalTitle || item.title);
    const safeOverview = escapeHtml(item.overview || 'Описание отсутствует.');
    const poster = item.posterUrl ? `<img src="${item.posterUrl}" alt="${safeTitle}" loading="lazy" />` : `<div class="movie-poster-placeholder">${safeTitle}</div>`;
    const calendarMarkup = item.mediaType === 'tv' ? `
      <div class="episode-calendar-wrapper hidden" data-tv-id="${item.id}" data-title="${safeTitle}">
        <button class="episode-calendar-btn" type="button" aria-label="Будущие серии" title="Будущие серии">
          ${getCalendarIconSvg()}
        </button>
        <div class="episode-calendar-popover" role="dialog" aria-label="Будущие серии">
          <div class="episode-calendar-popover-inner">
            <div class="episode-calendar-loading">Проверяем даты выхода...</div>
          </div>
        </div>
      </div>
    ` : '';

    card.innerHTML = `
      <div class="movie-poster-wrap">
        ${poster}
        ${calendarMarkup}
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

function queueEpisodeCalendarAvailability(items) {
  const tvItems = items.filter((item) => item?.mediaType === 'tv' && item?.id);
  if (!tvItems.length) return;

  void runTasksWithConcurrency(tvItems, EPISODE_CALENDAR_CONCURRENCY, async (item) => {
    try {
      const meta = await getTvCalendarMeta(item.id);
      if (meta?.eligible) {
        activateEpisodeCalendarButton(item.id, meta);
      }
    } catch (error) {
      console.warn('[queueEpisodeCalendarAvailability]', item?.id, error);
    }
  });
}

function activateEpisodeCalendarButton(tvId, meta = {}) {
  const wrapper = document.querySelector(`.episode-calendar-wrapper[data-tv-id="${tvId}"]`);
  if (!wrapper) return;

  wrapper.classList.remove('hidden');
  wrapper.dataset.ready = '1';
  wrapper.dataset.title = meta.showTitle || wrapper.dataset.title || '';

  const inner = wrapper.querySelector('.episode-calendar-popover-inner');
  if (inner && !wrapper.dataset.loaded) {
    const nextEpisodeLine = meta.nextEpisode?.airDate
      ? `<div class="episode-calendar-preview">Следующая серия: ${escapeHtml(formatFullDate(meta.nextEpisode.airDate))}</div>`
      : '<div class="episode-calendar-preview">Будущие серии доступны</div>';

    inner.innerHTML = `
      <div class="episode-calendar-popover-head">
        <div class="episode-calendar-popover-title">Будущие серии</div>
        ${nextEpisodeLine}
      </div>
      <div class="episode-calendar-loading">Наведи курсор или нажми, чтобы загрузить расписание.</div>
    `;
  }
}

async function ensureEpisodeCalendarLoaded(wrapper) {
  if (!wrapper || wrapper.dataset.loaded === '1' || wrapper.dataset.loading === '1') return;

  const tvId = Number(wrapper.dataset.tvId);
  if (!tvId) return;

  wrapper.dataset.loading = '1';
  const inner = wrapper.querySelector('.episode-calendar-popover-inner');
  if (inner) {
    inner.innerHTML = `
      <div class="episode-calendar-popover-head">
        <div class="episode-calendar-popover-title">Будущие серии</div>
        <div class="episode-calendar-loading">Загружаем расписание...</div>
      </div>
    `;
  }

  try {
    const schedule = await getUpcomingEpisodeSchedule(tvId, wrapper.dataset.title || 'Сериал');
    renderEpisodeCalendarPopover(wrapper, schedule);
    wrapper.dataset.loaded = '1';
  } catch (error) {
    console.error('[ensureEpisodeCalendarLoaded]', tvId, error);
    if (inner) {
      inner.innerHTML = `
        <div class="episode-calendar-popover-head">
          <div class="episode-calendar-popover-title">Будущие серии</div>
        </div>
        <div class="episode-calendar-error">Не удалось загрузить расписание серий.</div>
      `;
    }
  } finally {
    wrapper.dataset.loading = '0';
  }
}

function renderEpisodeCalendarPopover(wrapper, schedule) {
  const inner = wrapper.querySelector('.episode-calendar-popover-inner');
  if (!inner) return;

  wrapper.__episodeCalendarSchedule = schedule || null;

  if (!schedule?.episodes?.length) {
    inner.innerHTML = `
      <div class="episode-calendar-popover-head">
        <div class="episode-calendar-popover-title">Будущие серии</div>
        <div class="episode-calendar-preview">${escapeHtml(schedule?.showTitle || wrapper.dataset.title || 'Сериал')}</div>
      </div>
      <div class="episode-calendar-empty">TMDb не вернул даты следующих серий.</div>
    `;
    return;
  }

  const rows = schedule.episodes.map((episode) => {
    const code = formatEpisodeCode(episode.seasonNumber, episode.episodeNumber);
    return `
      <div class="episode-calendar-item">
        <div class="episode-calendar-item-main">
          <div class="episode-calendar-item-code">${escapeHtml(code)}</div>
          <div class="episode-calendar-item-title">${escapeHtml(resolveEpisodeName(episode.name, '', episode.episodeNumber))}</div>
          <div class="episode-calendar-item-date">${escapeHtml(formatFullDate(episode.airDate))}</div>
        </div>
        <a class="episode-calendar-add-btn" href="${buildGoogleCalendarUrl(schedule.showTitle, episode, { tvId: schedule.tvId, mediaType: 'tv' })}" target="_blank" rel="noopener noreferrer">Добавить в Google Календарь</a>
      </div>
    `;
  }).join('');

  const footer = schedule.totalUpcomingCount > schedule.episodes.length
    ? `<div class="episode-calendar-footer">Показано ${schedule.episodes.length} из ${schedule.totalUpcomingCount} будущих серий.</div>`
    : '';

  inner.innerHTML = `
    <div class="episode-calendar-popover-head">
      <div class="episode-calendar-popover-title">Будущие серии</div>
      <div class="episode-calendar-preview">${escapeHtml(schedule.showTitle || wrapper.dataset.title || 'Сериал')}</div>    </div>
    <div class="episode-calendar-list">${rows}</div>
    ${footer}
  `;
}



function setEpisodeCalendarLayerState(wrapper, active) {
  const card = wrapper?.closest('.movie');
  if (!card) return;

  if (card.__episodeCalendarLayerTimer) {
    clearTimeout(card.__episodeCalendarLayerTimer);
    card.__episodeCalendarLayerTimer = null;
  }

  if (active) {
    card.classList.add('calendar-layer-active');
  } else {
    card.classList.remove('calendar-layer-active');
  }
}

function scheduleEpisodeCalendarLayerDeactivate(wrapper) {
  const card = wrapper?.closest('.movie');
  if (!card) return;

  if (card.__episodeCalendarLayerTimer) {
    clearTimeout(card.__episodeCalendarLayerTimer);
  }

  card.__episodeCalendarLayerTimer = setTimeout(() => {
    const shouldStayActive = wrapper.matches(':hover') || wrapper.classList.contains('popover-open') || wrapper.contains(document.activeElement);
    if (!shouldStayActive) {
      card.classList.remove('calendar-layer-active');
    }
    card.__episodeCalendarLayerTimer = null;
  }, 180);
}

function positionEpisodeCalendarPopover(wrapper) {
  const popover = wrapper?.querySelector('.episode-calendar-popover');
  if (!popover) return;

  popover.style.left = '0';
  popover.style.right = 'auto';

  const rect = popover.getBoundingClientRect();
  if (rect.right > window.innerWidth - 12) {
    popover.style.left = 'auto';
    popover.style.right = '0';
  }

  const adjustedRect = popover.getBoundingClientRect();
  if (adjustedRect.left < 12) {
    popover.style.left = `${12 - wrapper.getBoundingClientRect().left}px`;
    popover.style.right = 'auto';
  }
}

function closeEpisodeCalendarPopovers(exceptWrapper = null) {
  document.querySelectorAll('.episode-calendar-wrapper.popover-open').forEach((wrapper) => {
    if (exceptWrapper && wrapper === exceptWrapper) return;
    wrapper.classList.remove('popover-open');
    scheduleEpisodeCalendarLayerDeactivate(wrapper);
  });
}

async function getTvCalendarMeta(tvId) {
  if (tvCalendarMetaCache.has(tvId)) {
    return tvCalendarMetaCache.get(tvId);
  }

  const promise = (async () => {
    const details = await apiFetch(`/tv/${tvId}`, { language: 'ru-RU' });
    const today = getLocalDateString();
    const lastEpisodeAirDate = details?.last_episode_to_air?.air_date || '';
    const nextEpisodeAirDate = details?.next_episode_to_air?.air_date || '';
    const eligible = Boolean(lastEpisodeAirDate && lastEpisodeAirDate <= today && nextEpisodeAirDate && nextEpisodeAirDate > today);

    return {
      eligible,
      tvId,
      details,
      showTitle: details?.name || details?.original_name || '',
      nextEpisode: details?.next_episode_to_air ? {
        airDate: details.next_episode_to_air.air_date || '',
        seasonNumber: Number(details.next_episode_to_air.season_number || 0),
        episodeNumber: Number(details.next_episode_to_air.episode_number || 0),
        name: details.next_episode_to_air.name || ''
      } : null
    };
  })();

  tvCalendarMetaCache.set(tvId, promise);
  return promise;
}

async function getUpcomingEpisodeSchedule(tvId, fallbackTitle = '') {
  if (tvEpisodeScheduleCache.has(tvId)) {
    return tvEpisodeScheduleCache.get(tvId);
  }

  const promise = (async () => {
    const meta = await getTvCalendarMeta(tvId);
    const details = meta?.details || await apiFetch(`/tv/${tvId}`, { language: 'ru-RU' });
    const seasons = Array.isArray(details?.seasons) ? details.seasons : [];
    const today = getLocalDateString();

    const nextSeasonNumber = Math.max(1, Number(meta?.nextEpisode?.seasonNumber || 1));
    const seasonNumbers = seasons
      .filter((season) => Number(season?.season_number) >= nextSeasonNumber)
      .map((season) => Number(season.season_number))
      .sort((a, b) => a - b);

    const settled = await Promise.allSettled(
      seasonNumbers.map((seasonNumber) => fetchSeasonWithFallbackNames(tvId, seasonNumber))
    );

    const upcoming = [];

    for (const result of settled) {
      if (result.status !== 'fulfilled') continue;
      for (const episode of result.value?.episodes || []) {
        const airDate = episode?.air_date || '';
        if (!airDate || airDate <= today) continue;

        upcoming.push({
          airDate,
          seasonNumber: Number(episode?.season_number || result.value?.season_number || 0),
          episodeNumber: Number(episode?.episode_number || 0),
          name: resolveEpisodeName(episode?.name, episode?.fallback_name, episode?.episode_number)
        });
      }
    }

    upcoming.sort((a, b) => {
      if (a.airDate !== b.airDate) return a.airDate.localeCompare(b.airDate);
      if (a.seasonNumber !== b.seasonNumber) return a.seasonNumber - b.seasonNumber;
      return a.episodeNumber - b.episodeNumber;
    });

    const uniqueEpisodes = dedupeUpcomingEpisodes(upcoming);

    return {
      tvId,
      showTitle: details?.name || details?.original_name || fallbackTitle || 'Сериал',
      totalUpcomingCount: uniqueEpisodes.length,
      allEpisodes: uniqueEpisodes,
      episodes: uniqueEpisodes.slice(0, EPISODE_CALENDAR_MAX_ITEMS)
    };
  })();

  tvEpisodeScheduleCache.set(tvId, promise);
  return promise;
}

function dedupeUpcomingEpisodes(items) {
  const seen = new Set();
  return items.filter((item) => {
    const key = `${item.airDate}-${item.seasonNumber}-${item.episodeNumber}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function formatEpisodeCode(seasonNumber, episodeNumber) {
  const season = String(Math.max(0, Number(seasonNumber || 0))).padStart(2, '0');
  const episode = String(Math.max(0, Number(episodeNumber || 0))).padStart(2, '0');
  return `S${season}E${episode}`;
}

function isGenericEpisodeName(name, episodeNumber = 0) {
  const normalized = String(name || '').trim();
  if (!normalized) return true;

  const genericPatterns = [
    /^эпизод\s+\d+$/i,
    /^серия\s+\d+$/i,
    /^episode\s+\d+$/i,
    /^episodio\s+\d+$/i,
    /^cap[ií]tulo\s+\d+$/i,
    /^قسمت\s+\d+$/i
  ];

  if (genericPatterns.some((pattern) => pattern.test(normalized))) {
    return true;
  }

  if (episodeNumber) {
    const number = String(Number(episodeNumber));
    const lowered = normalized.toLowerCase();
    if (lowered === `эпизод ${number}` || lowered === `серия ${number}` || lowered === `episode ${number}`) {
      return true;
    }
  }

  return false;
}

function resolveEpisodeName(primaryName, fallbackName = '', episodeNumber = 0) {
  const primary = String(primaryName || '').trim();
  if (primary && !isGenericEpisodeName(primary, episodeNumber)) {
    return primary;
  }

  const fallback = String(fallbackName || '').trim();
  if (fallback && !isGenericEpisodeName(fallback, episodeNumber)) {
    return fallback;
  }

  return `Серия ${episodeNumber || ''}`.trim();
}

async function fetchSeasonWithFallbackNames(tvId, seasonNumber) {
  const [localizedResult, fallbackResult] = await Promise.allSettled([
    apiFetch(`/tv/${tvId}/season/${seasonNumber}`, { language: 'ru-RU' }),
    apiFetch(`/tv/${tvId}/season/${seasonNumber}`)
  ]);

  const localized = localizedResult.status === 'fulfilled' ? localizedResult.value : null;
  const fallback = fallbackResult.status === 'fulfilled' ? fallbackResult.value : null;

  if (!localized && !fallback) {
    throw new Error(`Failed to load season ${seasonNumber}`);
  }

  const localizedEpisodes = Array.isArray(localized?.episodes) ? localized.episodes : [];
  const fallbackEpisodes = Array.isArray(fallback?.episodes) ? fallback.episodes : [];
  const fallbackByEpisodeNumber = new Map(
    fallbackEpisodes.map((episode) => [String(episode?.episode_number || ''), episode])
  );

  const baseEpisodes = localizedEpisodes.length ? localizedEpisodes : fallbackEpisodes;
  const mergedEpisodes = baseEpisodes.map((episode) => {
    const fallbackEpisode = fallbackByEpisodeNumber.get(String(episode?.episode_number || '')) || null;
    return {
      ...(fallbackEpisode || {}),
      ...episode,
      fallback_name: fallbackEpisode?.name || '',
      name: resolveEpisodeName(episode?.name, fallbackEpisode?.name, episode?.episode_number || fallbackEpisode?.episode_number || 0),
      season_number: episode?.season_number || fallbackEpisode?.season_number || seasonNumber
    };
  });

  return {
    ...(localized || fallback),
    season_number: localized?.season_number || fallback?.season_number || seasonNumber,
    episodes: mergedEpisodes
  };
}

function buildWatchUrl(id, mediaType = 'movie') {
  const numericId = Number(id);
  const normalizedType = mediaType === 'tv' ? 'tv' : 'movie';
  const url = new URL(window.location.href);
  if (numericId) {
    url.hash = `${normalizedType}-${numericId}`;
  }
  return url.toString();
}

function buildGoogleCalendarUrl(showTitle, episode, options = {}) {
  const start = episode?.airDate || '';
  const end = getNextDateString(start);
  const episodeCode = formatEpisodeCode(episode?.seasonNumber, episode?.episodeNumber);
  const title = `${showTitle} — ${episodeCode}`;
  const watchUrl = buildWatchUrl(options?.tvId || options?.id || 0, options?.mediaType || 'tv');
  const details = `${showTitle}
${episodeCode}
Дата выхода: ${formatFullDate(start)}
Смотреть: ${watchUrl}`;
  const url = new URL(GOOGLE_CALENDAR_BASE_URL);
  url.searchParams.set('action', 'TEMPLATE');
  url.searchParams.set('text', title);
  url.searchParams.set('dates', `${start.replaceAll('-', '')}/${end.replaceAll('-', '')}`);
  url.searchParams.set('details', details);
  return url.toString();
}

function getNextDateString(dateString) {
  if (!dateString || !/^\d{4}-\d{2}-\d{2}$/.test(dateString)) return '';
  const date = new Date(`${dateString}T00:00:00`);
  if (Number.isNaN(date.getTime())) return '';
  date.setDate(date.getDate() + 1);
  return getLocalDateString(date);
}

function getLocalDateString(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

async function runTasksWithConcurrency(items, limit, worker) {
  const queue = [...items];
  const runners = Array.from({ length: Math.min(limit, queue.length) }, async () => {
    while (queue.length) {
      const currentItem = queue.shift();
      if (!currentItem) return;
      await worker(currentItem);
    }
  });

  await Promise.allSettled(runners);
}

function getCalendarIconSvg() {
  return `
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M7 2a1 1 0 0 1 1 1v1h8V3a1 1 0 1 1 2 0v1h1a3 3 0 0 1 3 3v11a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V7a3 3 0 0 1 3-3h1V3a1 1 0 0 1 1-1Zm12 8H5v8a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-8ZM7 12h3v3H7v-3Z" fill="currentColor"></path>
    </svg>
  `;
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
    const details = await apiFetch(`/${item.mediaType}/${item.id}`, {
      language: 'ru-RU',
      append_to_response: 'videos',
      include_video_language: 'ru-RU,ru,en-US,en,null'
    });

    const fallbackVideos = !details?.videos?.results?.length
      ? await apiFetch(`/${item.mediaType}/${item.id}/videos`, {
          include_video_language: 'ru-RU,ru,en-US,en,null'
        }).catch(() => ({ results: [] }))
      : null;

    const videos = prioritizeVideos((details?.videos?.results || fallbackVideos?.results || []).filter((video) => {
      return video.site === 'YouTube' && video.key;
    }));

    overlay.style.width = '100%';
    overlay.setAttribute('aria-hidden', 'false');

    const title = item.originalTitle || item.title || details.original_title || details.original_name || details.title || details.name;
    const resolvedOverview = item.overview || details.overview || 'Описание отсутствует.';
    const resolvedDate = item.releaseDate || details.release_date || details.first_air_date || '';
    const subtitle = `${item.mediaType === 'tv' ? 'Сериал' : 'Фильм'} • ${formatFullDate(resolvedDate)}`;

    if (videos.length) {
      const isLocalFile = window.location.protocol === 'file:';
      const embed = videos.map((video) => {
        const safeTitle = escapeHtml(video.name || title);
        if (isLocalFile) {
          return `
            <div class="embed embed-fallback hide">
              <img class="embed-fallback-thumb" src="https://img.youtube.com/vi/${video.key}/hqdefault.jpg" alt="${safeTitle}" />
              <div class="embed-fallback-body">
                <div class="embed-fallback-title">${safeTitle}</div>
                <div class="embed-fallback-text">Локально через file:// YouTube-встраивание может не работать. Открой сайт через http/https или запусти ролик прямо на YouTube.</div>
                <a class="embed-fallback-link" href="https://www.youtube.com/watch?v=${video.key}" target="_blank" rel="noopener noreferrer">Открыть на YouTube</a>
              </div>
            </div>
          `;
        }
        return `
          <iframe
            src="${buildYouTubeEmbedUrl(video.key)}"
            class="embed hide"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
            loading="lazy"
            referrerpolicy="strict-origin-when-cross-origin"
            title="${safeTitle}"
          ></iframe>
        `;
      });
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
          ${escapeHtml(resolvedOverview)}
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
          ${escapeHtml(resolvedOverview)}
        </div>
      `;
    }
  } catch (error) {
    console.error('[openNav]', error);
    overlay.style.width = '100%';
    overlay.setAttribute('aria-hidden', 'false');
    overlayContent.innerHTML = '<h1 class="no-results">Не удалось загрузить информацию о трейлере</h1>';
  }
}


function buildYouTubeEmbedUrl(videoKey) {
  const params = new URLSearchParams({
    rel: '0',
    playsinline: '1',
    enablejsapi: '1'
  });

  if (window.location.protocol === 'http:' || window.location.protocol === 'https:') {
    params.set('origin', window.location.origin);
  }

  return `https://www.youtube.com/embed/${videoKey}?${params.toString()}`;
}

function prioritizeVideos(videos) {
  return [...videos].sort((a, b) => {
    const scoreA = getVideoPriority(a);
    const scoreB = getVideoPriority(b);
    if (scoreA !== scoreB) return scoreB - scoreA;
    const dateA = Date.parse(a.published_at || '') || 0;
    const dateB = Date.parse(b.published_at || '') || 0;
    return dateB - dateA;
  });
}

function getVideoPriority(video) {
  let score = 0;
  const type = String(video?.type || '').toLowerCase();
  const language = String(video?.iso_639_1 || '').toLowerCase();

  if (video?.official) score += 1000;
  if (type === 'trailer') score += 500;
  else if (type === 'teaser') score += 300;
  else if (type === 'clip') score += 200;
  else if (type === 'behind the scenes') score += 100;

  if (language === 'ru') score += 50;
  else if (language === 'en') score += 25;
  else if (!language || language === 'null') score += 10;

  return score;
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


function initializePopcornEasterEgg() {
  const existingCanvas = document.getElementById('popcornCanvas');
  if (existingCanvas) return;

  const canvas = document.createElement('canvas');
  canvas.id = 'popcornCanvas';
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '9999';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const popcornSources = ['popcorn.png', 'popcorn2.png', 'popcorn3.png', 'popcorn4.png', 'popcorn5.png'];
  const popcornImages = popcornSources.map((src) => {
    const image = new Image();
    image.decoding = 'async';
    image.src = src;
    return image;
  });
  const popcornParticles = [];

  function resizeCanvas() {
    const ratio = Math.max(window.devicePixelRatio || 1, 1);
    canvas.width = Math.floor(window.innerWidth * ratio);
    canvas.height = Math.floor(window.innerHeight * ratio);
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  }

  function spawnPopcorn(amount = 50) {
    const availableImages = popcornImages.filter((image) => image.complete && image.naturalWidth > 0);
    for (let i = 0; i < amount; i += 1) {
      const image = availableImages.length
        ? availableImages[Math.floor(Math.random() * availableImages.length)]
        : null;

      popcornParticles.push({
        x: Math.random() * window.innerWidth,
        y: window.innerHeight + Math.random() * 40,
        size: Math.floor(Math.random() * 41) + 40,
        rotation: (Math.random() - 0.5) * 0.7,
        angle: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 0.12,
        image,
        velocity: {
          x: (Math.random() - 0.5) * 5,
          y: -(Math.random() * 8 + 5),
        },
      });
    }
  }

  function drawFallbackPopcorn(particle) {
    ctx.save();
    ctx.translate(particle.x, particle.y);
    ctx.rotate(particle.angle);
    ctx.fillStyle = '#fff8dd';
    ctx.beginPath();
    ctx.ellipse(0, 0, particle.size * 0.26, particle.size * 0.2, 0, 0, Math.PI * 2);
    ctx.ellipse(-particle.size * 0.16, -particle.size * 0.05, particle.size * 0.18, particle.size * 0.14, -0.4, 0, Math.PI * 2);
    ctx.ellipse(particle.size * 0.12, -particle.size * 0.08, particle.size * 0.16, particle.size * 0.14, 0.35, 0, Math.PI * 2);
    ctx.ellipse(0, particle.size * 0.12, particle.size * 0.16, particle.size * 0.12, 0.15, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function animatePopcorn() {
    requestAnimationFrame(animatePopcorn);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = popcornParticles.length - 1; i >= 0; i -= 1) {
      const particle = popcornParticles[i];
      particle.velocity.y += 0.2;
      particle.x += particle.velocity.x;
      particle.y += particle.velocity.y;
      particle.angle += particle.spin;

      if (particle.image && particle.image.complete && particle.image.naturalWidth > 0) {
        ctx.save();
        ctx.translate(particle.x, particle.y);
        ctx.rotate(particle.angle);
        ctx.drawImage(particle.image, -particle.size / 2, -particle.size / 2, particle.size, particle.size);
        ctx.restore();
      } else {
        drawFallbackPopcorn(particle);
      }

      if (particle.y > window.innerHeight + particle.size * 2) {
        popcornParticles.splice(i, 1);
      }
    }
  }

  document.addEventListener('keydown', (event) => {
    if (event.ctrlKey || event.metaKey || event.altKey) return;
    const key = String(event.key || '').toLowerCase();
    if (key === 'p' || key === 'з') {
      spawnPopcorn(50);
    }
  });

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();
  animatePopcorn();
}

window.addEventListener('DOMContentLoaded', initializePopcornEasterEgg);
