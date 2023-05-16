// ==UserScript==
// @name         RMP Watch🎥
// @namespace    rmp-watch
// @version      3
// @description  Adds an Always On Top button to kinopoisk.ru website and opens RMP website in new tab with movie or series
// @icon         https://github.com/RRRiderrr/rmp/raw/main/icons/apple-touch-icon.png
// @author       Rider
// @match        https://www.kinopoisk.ru/*
// @grant        GM_addStyle
// ==/UserScript==

(function () {
  'use strict';

  let button = null;

  const checkForMovieId = () => {
    const movieId = extractMovieId();

    if (movieId && !button) {
      button = document.createElement('button');
      button.innerHTML = 'RMP';
      button.style.display = 'flex';
      button.style.justifyContent = 'center';
      button.style.alignItems = 'center';

      button.style.position = 'fixed';
      button.style.bottom = '0';
      button.style.right = '0';
      button.style.zIndex = '999999';
      button.style.width = '40px';
      button.style.height = '40px';
      button.style.border = 'none';
      button.style.borderRadius = '50%';
      button.style.cursor = 'pointer';
      button.style.background = 'transparent';
      button.style.boxShadow = '0px 0px 5px rgba(0, 0, 0, 0.3)';

      button.addEventListener('click', () => {
        const movieId = extractMovieId();

        window.open(`https://rmp.pages.dev/#${movieId}`, '_blank');

        const body = document.getElementsByTagName('body')[0];
        if (body.style.top === '0') {
          body.style.top = null;
        } else {
          body.style.top = '0';
        }
      });

      document.getElementsByTagName('body')[0].appendChild(button);
    } else if (!movieId && button) {
      button.parentNode.removeChild(button);
      button = null;
    }
  };

  const extractMovieId = () => {
    const match = window.location.pathname.match(/^\/(film|series)\/(\d+)\/?$/);
    return match ? match[2] : null;
  };

  checkForMovieId();

  const observer = new MutationObserver(checkForMovieId);
  observer.observe(document.body, { childList: true, subtree: true });
})();
