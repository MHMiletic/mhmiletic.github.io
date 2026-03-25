(() => {
  document.body.classList.add('card-style-poster');

  const colorThemeMap = {
    classic: '',
    lilac: 'theme-lilac',
    sunset: 'theme-sunset',
    mint: 'theme-mint',
    night: 'theme-night',
    bright: 'theme-bright'
  };

  const preferredColorTheme = localStorage.getItem('preferredColorTheme') || 'night';

  if (colorThemeMap[preferredColorTheme]) {
    document.body.classList.add(colorThemeMap[preferredColorTheme]);
  }

  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  const siteNav = document.getElementById('siteNav');
  if (siteNav) {
    const updateNavScrollState = () => {
      siteNav.classList.toggle('scrolled', window.scrollY > 8);
    };
    updateNavScrollState();
    window.addEventListener('scroll', updateNavScrollState, { passive: true });
  }

  const dataEl = document.getElementById('caseData');
  if (!dataEl) {
    return;
  }

  let caseData;
  try {
    caseData = JSON.parse(dataEl.textContent);
  } catch {
    return;
  }

  const images = Array.isArray(caseData.images) ? caseData.images : [];
  if (images.length === 0) {
    return;
  }

  let current = 0;
  const mainImg = document.getElementById('mainImg');
  const thumbs = document.getElementById('thumbs');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  if (!mainImg || !thumbs || !prevBtn || !nextBtn) {
    return;
  }

  const title = caseData.altBase || 'Project';

  const updateMediaOrientationClass = () => {
    const { naturalWidth, naturalHeight } = mainImg;
    if (!naturalWidth || !naturalHeight) {
      return;
    }

    mainImg.classList.remove('is-landscape', 'is-portrait');
    if (naturalWidth >= naturalHeight) {
      mainImg.classList.add('is-landscape');
    } else {
      mainImg.classList.add('is-portrait');
    }
  };

  const setCurrent = (index) => {
    current = (index + images.length) % images.length;
    mainImg.src = images[current];
    mainImg.alt = `${title} variant ${current + 1}`;
    renderThumbs();
  };

  mainImg.addEventListener('load', updateMediaOrientationClass);

  const renderThumbs = () => {
    thumbs.innerHTML = '';
    images.forEach((src, index) => {
      const img = document.createElement('img');
      img.src = src;
      img.className = `thumb${index === current ? ' active' : ''}`;
      img.alt = `${title} variant ${index + 1}`;
      img.addEventListener('click', () => setCurrent(index));
      thumbs.appendChild(img);
    });
  };

  prevBtn.addEventListener('click', () => setCurrent(current - 1));
  nextBtn.addEventListener('click', () => setCurrent(current + 1));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
      setCurrent(current - 1);
    }
    if (event.key === 'ArrowRight') {
      setCurrent(current + 1);
    }
  });

  setCurrent(0);
})();
