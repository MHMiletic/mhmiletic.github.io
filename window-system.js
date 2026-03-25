(() => {
  const colorThemeMap = {
    classic: '',
    lilac: 'theme-lilac',
    sunset: 'theme-sunset',
    mint: 'theme-mint',
    night: 'theme-night',
    bright: 'theme-bright'
  };

  const applyTheme = (theme) => {
    Object.values(colorThemeMap).forEach(themeClass => {
      if (themeClass) {
        document.body.classList.remove(themeClass);
      }
    });

    if (colorThemeMap[theme]) {
      document.body.classList.add(colorThemeMap[theme]);
    }

    localStorage.setItem('preferredColorTheme', theme);
  };

  const syncThemeSelection = () => {
    const activeTheme = localStorage.getItem('preferredColorTheme') || 'night';
    const buttons = document.querySelectorAll('.settings-option[data-theme]');
    buttons.forEach((button) => {
      const isActive = button.dataset.theme === activeTheme;
      button.classList.toggle('selected', isActive);
      button.setAttribute('aria-current', isActive ? 'true' : 'false');
    });
  };

  const bindThemeButtons = () => {
    const buttons = document.querySelectorAll('.settings-option[data-theme]');
    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        applyTheme(button.dataset.theme);
        syncThemeSelection();
      });
    });
  };

  const parseRgb = (color) => {
    if (!color) {
      return null;
    }

    const normalized = color.trim().toLowerCase();
    if (normalized.startsWith('#')) {
      const hex = normalized.slice(1);
      if (hex.length === 3 || hex.length === 4) {
        return [
          Number.parseInt(hex[0] + hex[0], 16),
          Number.parseInt(hex[1] + hex[1], 16),
          Number.parseInt(hex[2] + hex[2], 16)
        ];
      }
      if (hex.length === 6 || hex.length === 8) {
        return [
          Number.parseInt(hex.slice(0, 2), 16),
          Number.parseInt(hex.slice(2, 4), 16),
          Number.parseInt(hex.slice(4, 6), 16)
        ];
      }
    }

    const channels = normalized.match(/-?[\d.]+%?/g);
    if (!channels || channels.length < 3) {
      return null;
    }

    let rgb = channels.slice(0, 3).map((value) => {
      if (value.endsWith('%')) {
        return (Number.parseFloat(value) / 100) * 255;
      }
      return Number.parseFloat(value);
    });

    if (normalized.startsWith('color(') && rgb.every((channel) => channel <= 1)) {
      rgb = rgb.map((channel) => channel * 255);
    }

    return rgb.map((channel) => Math.max(0, Math.min(255, channel)));
  };

  const channelToLinear = (value) => {
    const normalized = value / 255;
    return normalized <= 0.04045
      ? normalized / 12.92
      : Math.pow((normalized + 0.055) / 1.055, 2.4);
  };

  const syncSystemWindowPalette = () => {
    const landingWindow = document.querySelector('.landing-window');
    const settingsWindow = document.querySelector('.settings-window');
    const quickNavWindow = document.querySelector('.quick-nav-window');
    if (!landingWindow) {
      return;
    }

    const rootStyle = document.documentElement.style;

    const landingComputed = getComputedStyle(landingWindow);
    const landingTitleComputed = getComputedStyle(landingWindow, '::before');
    const landingTitleForeground = getComputedStyle(landingWindow, '::after').color;
    const computedBg = landingComputed.backgroundColor;
    const rgb = parseRgb(computedBg);
    const translucentBg = rgb
      ? `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 0.88)`
      : computedBg;

    const titleBackground = landingTitleComputed.backgroundImage !== 'none'
      ? landingTitleComputed.backgroundImage
      : landingTitleComputed.backgroundColor;

    rootStyle.setProperty('--settings-shell-bg', translucentBg);
    rootStyle.setProperty('--settings-shell-border', landingComputed.borderColor || '#30363d');
    rootStyle.setProperty('--settings-shell-shadow', landingComputed.boxShadow || '0 20px 40px rgba(0, 0, 0, 0.24)');
    rootStyle.setProperty('--settings-shell-radius', landingComputed.borderRadius || '14px');
    rootStyle.setProperty('--settings-title-bg', titleBackground);
    rootStyle.setProperty('--settings-title-border', landingTitleComputed.borderBottomColor || '#4a607c');
    rootStyle.setProperty('--settings-title-fg', landingTitleForeground || '#dce8f6');

    let isLightBackground = false;
    if (rgb) {
      const [r, g, b] = rgb;
      const luminance =
        (0.2126 * channelToLinear(r)) +
        (0.7152 * channelToLinear(g)) +
        (0.0722 * channelToLinear(b));
      isLightBackground = luminance > 0.52;
    }

    const baseColor = isLightBackground ? '#1a2d45' : '#eef7ff';
    rootStyle.setProperty('--settings-heading-fg', baseColor);
    rootStyle.setProperty('--settings-heading-opacity', isLightBackground ? '0.82' : '0.78');
    rootStyle.setProperty('--settings-option-fg', baseColor);
    rootStyle.setProperty('--settings-option-opacity', isLightBackground ? '0.88' : '0.94');
    rootStyle.setProperty('--settings-option-selected-bg', isLightBackground ? 'rgba(26, 45, 69, 0.18)' : 'rgba(238, 247, 255, 0.14)');
    rootStyle.setProperty('--settings-option-selected-border', isLightBackground ? '#1a2d45' : '#eef7ff');
    rootStyle.setProperty('--settings-option-selected-fg', isLightBackground ? '#1a2d45' : '#eef7ff');
    rootStyle.setProperty('--settings-option-hover-bg', isLightBackground ? 'rgba(26, 45, 69, 0.08)' : 'rgba(238, 247, 255, 0.08)');
    rootStyle.setProperty('--settings-option-hover-border', isLightBackground ? 'rgba(26, 45, 69, 0.24)' : 'rgba(238, 247, 255, 0.28)');

    const mirrorTargets = [settingsWindow, quickNavWindow].filter(Boolean);
    mirrorTargets.forEach((windowEl) => {
      windowEl.style.setProperty('--settings-shell-bg', translucentBg);
      windowEl.style.setProperty('--settings-shell-border', landingComputed.borderColor || '#30363d');
      windowEl.style.setProperty('--settings-shell-shadow', landingComputed.boxShadow || '0 20px 40px rgba(0, 0, 0, 0.24)');
      windowEl.style.setProperty('--settings-shell-radius', landingComputed.borderRadius || '14px');
      windowEl.style.setProperty('--settings-title-bg', titleBackground);
      windowEl.style.setProperty('--settings-title-border', landingTitleComputed.borderBottomColor || '#4a607c');
      windowEl.style.setProperty('--settings-title-fg', landingTitleForeground || '#dce8f6');
    });
  };

  const makeWindowDraggable = (windowEl, dragHandleEl) => {
    if (!windowEl || !dragHandleEl) {
      return;
    }

    let dragging = false;
    let startX = 0;
    let startY = 0;
    let dx = 0;
    let dy = 0;

    const startDrag = (cx, cy) => {
      dragging = true;
      windowEl.classList.add('is-dragging');
      startX = cx - dx;
      startY = cy - dy;
    };

    dragHandleEl.addEventListener('mousedown', (event) => {
      if (event.button !== 0) {
        return;
      }
      startDrag(event.clientX, event.clientY);
      event.preventDefault();
    });

    dragHandleEl.addEventListener('touchstart', (event) => {
      const touch = event.touches[0];
      startDrag(touch.clientX, touch.clientY);
    }, { passive: true });

    const onMove = (cx, cy) => {
      if (!dragging) {
        return;
      }
      dx = cx - startX;
      dy = cy - startY;
      windowEl.style.transform = `translate(${dx}px, ${dy}px)`;
    };

    window.addEventListener('mousemove', (event) => onMove(event.clientX, event.clientY));
    window.addEventListener('touchmove', (event) => {
      const touch = event.touches[0];
      onMove(touch.clientX, touch.clientY);
    }, { passive: true });

    const stopDrag = () => {
      dragging = false;
      windowEl.classList.remove('is-dragging');
    };

    window.addEventListener('mouseup', stopDrag);
    window.addEventListener('touchend', stopDrag);
  };

  const injectSystemWindows = () => {
    if (!document.querySelector('.availability-window')) {
      const availability = document.createElement('article');
      availability.className = 'availability-window';
      availability.setAttribute('aria-label', 'Availability window');
      availability.innerHTML = `
        <div class="availability-window-dragbar" aria-hidden="true"></div>
        <span class="availability-window-title">Available for Work</span>
        <p class="availability-question">Available for work?</p>
        <p class="availability-answer"><span class="availability-arrow" aria-hidden="true">&rarr;</span><a class="availability-yes-link" href="contact.html" aria-label="Go to contact page">YES!</a></p>
      `;
      document.body.appendChild(availability);
    }

    if (!document.querySelector('.settings-window')) {
      const settings = document.createElement('aside');
      settings.className = 'settings-window popup-animate';
      settings.setAttribute('aria-label', 'Color settings');
      settings.innerHTML = `
        <div class="settings-window-dragbar" aria-hidden="true"></div>
        <span class="settings-window-title">color options</span>
        <div class="settings-window-group">
          <div class="settings-window-options">
            <button type="button" class="settings-option" data-theme="night">night mode (default)</button>
            <button type="button" class="settings-option" data-theme="bright">bright mode</button>
            <button type="button" class="settings-option" data-theme="classic">classic</button>
            <button type="button" class="settings-option" data-theme="lilac">lilac</button>
            <button type="button" class="settings-option" data-theme="sunset">sunset</button>
            <button type="button" class="settings-option" data-theme="mint">mint</button>
          </div>
        </div>
      `;
      document.body.appendChild(settings);
    }

    const isIndexLikePath = /(^|\/)index\.html$/i.test(window.location.pathname) || window.location.pathname.endsWith('/');
    if (!isIndexLikePath && !document.querySelector('.quick-nav-window')) {
      const quickNav = document.createElement('aside');
      quickNav.className = 'quick-nav-window popup-animate';
      quickNav.setAttribute('aria-label', 'Quick navigation window');
      quickNav.innerHTML = `
        <div class="quick-nav-window-dragbar" aria-hidden="true"></div>
        <span class="quick-nav-window-title"><span class="quick-nav-title-orb" aria-hidden="true"></span>navi</span>
        <div class="quick-nav-grid" aria-label="Page navigation">
          <a href="index.html" class="quick-nav-icon-link" aria-label="Home" title="Home">
            <img src="assets/icons/windows/homenew.ico" alt="Home icon">
            <span class="quick-nav-icon-label">home</span>
          </a>
          <a href="about.html" class="quick-nav-icon-link" aria-label="About me" title="About me">
            <img src="assets/icons/windows/about%20me.ico" alt="About me icon">
            <span class="quick-nav-icon-label">about me</span>
          </a>
          <a href="contact.html" class="quick-nav-icon-link" aria-label="Contact" title="Contact">
            <img src="assets/icons/windows/connectnew.ico" alt="Contact icon">
            <span class="quick-nav-icon-label">contact</span>
          </a>
          <a href="projects.html" class="quick-nav-icon-link" aria-label="My work" title="My work">
            <img src="assets/icons/windows/work.ico" alt="My work icon">
            <span class="quick-nav-icon-label">my work</span>
          </a>
        </div>
      `;
      document.body.appendChild(quickNav);

      document.querySelectorAll('.quick-nav-icon-link').forEach((link) => {
        const href = (link.getAttribute('href') || '').toLowerCase();
        const current = window.location.pathname.toLowerCase();
        if (href && current.endsWith(href)) {
          link.classList.add('active-page');
          link.setAttribute('aria-current', 'page');
        }
      });
    }
  };

  const resetAvailabilityWindowPosition = () => {
    const availabilityWindowEl = document.querySelector('.availability-window');
    if (!availabilityWindowEl) {
      return;
    }

    availabilityWindowEl.style.position = 'fixed';
    availabilityWindowEl.style.left = 'auto';
    availabilityWindowEl.style.bottom = 'auto';
    availabilityWindowEl.style.right = 'clamp(28px, 10vw, 150px)';
    availabilityWindowEl.style.top = 'clamp(250px, 39vh, 330px)';
    availabilityWindowEl.style.transform = 'translate(0, 0)';
    availabilityWindowEl.style.margin = '0';
  };

  const resetSettingsWindowPosition = () => {
    const settingsWindowEl = document.querySelector('.settings-window');
    if (!settingsWindowEl) {
      return;
    }

    settingsWindowEl.style.position = 'fixed';
    settingsWindowEl.style.left = 'clamp(24px, 8vw, 130px)';
    settingsWindowEl.style.bottom = 'auto';
    settingsWindowEl.style.right = 'auto';
    settingsWindowEl.style.top = 'clamp(238px, 37vh, 318px)';
    settingsWindowEl.style.transform = 'translate(0, 0)';
    settingsWindowEl.style.margin = '0';
  };

  const injectWindowCopyright = () => {
    const year = new Date().getFullYear();
    const windows = document.querySelectorAll('.landing-window');

    windows.forEach((windowEl) => {
      if (windowEl.querySelector('.window-copyright')) {
        return;
      }

      const copyright = document.createElement('small');
      copyright.className = 'window-copyright';
      copyright.textContent = `\u00A9 ${year} Mihajlo Miletic`;
      windowEl.appendChild(copyright);
    });
  };

  const initWindowDragging = () => {
    makeWindowDraggable(document.querySelector('.landing-window'), document.querySelector('.landing-window-dragbar'));
    makeWindowDraggable(document.querySelector('.availability-window'), document.querySelector('.availability-window-dragbar'));
    makeWindowDraggable(document.querySelector('.settings-window'), document.querySelector('.settings-window-dragbar'));
    makeWindowDraggable(document.querySelector('.quick-nav-window'), document.querySelector('.quick-nav-window-dragbar'));
  };

  const initStarfield = () => {
    if (document.getElementById('starfield-bg')) {
      return;
    }

    const canvas = document.createElement('canvas');
    canvas.id = 'starfield-bg';
    document.body.prepend(canvas);

    const context = canvas.getContext('2d');
    const buffer = document.createElement('canvas');
    const bufferContext = buffer.getContext('2d');
    const stars = [];
    let comet = null;
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    const pixelSize = 3;

    const starPatterns = {
      dot: [{ x: 0, y: 0 }],
      plus: [{ x: 0, y: 0 }, { x: -1, y: 0 }, { x: 1, y: 0 }, { x: 0, y: -1 }, { x: 0, y: 1 }],
      sparkle: [
        { x: 0, y: 0 }, { x: -1, y: 0 }, { x: 1, y: 0 }, { x: 0, y: -1 }, { x: 0, y: 1 },
        { x: -2, y: 0 }, { x: 2, y: 0 }, { x: 0, y: -2 }, { x: 0, y: 2 }
      ],
      big: [
        { x: 0, y: 0 },
        { x: -1, y: 0 }, { x: 1, y: 0 }, { x: 0, y: -1 }, { x: 0, y: 1 },
        { x: -2, y: 0 }, { x: 2, y: 0 }, { x: 0, y: -2 }, { x: 0, y: 2 },
        { x: -1, y: -1 }, { x: 1, y: 1 }, { x: -1, y: 1 }, { x: 1, y: -1 }
      ]
    };

    const getFieldWidth = () => Math.max(1, Math.ceil(window.innerWidth / pixelSize));
    const getFieldHeight = () => Math.max(1, Math.ceil(window.innerHeight / pixelSize));
    const getStarCount = () => Math.max(180, Math.floor((window.innerWidth * window.innerHeight) / 5200));

    const resizeCanvas = () => {
      canvas.width = Math.floor(window.innerWidth * pixelRatio);
      canvas.height = Math.floor(window.innerHeight * pixelRatio);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      context.setTransform(1, 0, 0, 1, 0, 0);
      context.imageSmoothingEnabled = false;

      buffer.width = getFieldWidth();
      buffer.height = getFieldHeight();
      bufferContext.setTransform(1, 0, 0, 1, 0, 0);
      bufferContext.imageSmoothingEnabled = false;
    };

    const randomRGB = () => {
      if (Math.random() < 0.33) {
        return null;
      }
      const r = Math.floor(180 + Math.random() * 75);
      const g = Math.floor(180 + Math.random() * 75);
      const b = Math.floor(180 + Math.random() * 75);
      return `rgb(${r},${g},${b})`;
    };

    const populateStars = () => {
      stars.length = 0;
      comet = null;

      const fieldWidth = getFieldWidth();
      const fieldHeight = getFieldHeight();

      for (let index = 0; index < getStarCount(); index += 1) {
        const seed = Math.random();
        const type = seed > 0.97 ? 'sparkle' : seed > 0.82 ? 'plus' : 'dot';
        const colorShift = Math.random() < 0.2;
        stars.push({
          x: Math.floor(Math.random() * fieldWidth),
          y: Math.floor(Math.random() * fieldHeight),
          type,
          baseAlpha: type === 'dot' ? Math.random() * 0.3 + 0.45 : Math.random() * 0.2 + 0.75,
          twinkleOffset: Math.random() * Math.PI * 2,
          twinkleSpeed: Math.random() * 0.035 + 0.01,
          variant: Math.random() > 0.5 ? 1 : 0,
          shiftTimer: Math.floor(Math.random() * 160) + 90,
          colorShift,
          rgb: colorShift ? randomRGB() : null,
          rgbTimer: colorShift ? Math.floor(Math.random() * 60) + 40 : 0
        });
      }

      for (let index = 0; index < 6; index += 1) {
        const colorShift = Math.random() < 0.5;
        stars.push({
          x: Math.floor(Math.random() * fieldWidth),
          y: Math.floor(Math.random() * fieldHeight),
          type: 'big',
          baseAlpha: 0.95 + Math.random() * 0.05,
          twinkleOffset: Math.random() * Math.PI * 2,
          twinkleSpeed: Math.random() * 0.02 + 0.01,
          variant: 1,
          shiftTimer: Math.floor(Math.random() * 160) + 90,
          colorShift,
          rgb: colorShift ? randomRGB() : null,
          rgbTimer: colorShift ? Math.floor(Math.random() * 60) + 40 : 0
        });
      }
    };

    const spawnComet = () => {
      const fieldWidth = getFieldWidth();
      const fieldHeight = getFieldHeight();
      const speed = (Math.random() * 0.35) + 0.55;
      const edgeRoll = Math.random();
      let startX = 0;
      let startY = 0;

      if (edgeRoll < 0.6) {
        startX = (Math.random() * (fieldWidth * 1.3)) - (fieldWidth * 0.15);
        startY = -(Math.random() * 18 + 8);
      } else if (edgeRoll < 0.8) {
        startX = -(Math.random() * 18 + 8);
        startY = Math.random() * Math.max(18, fieldHeight * 0.42);
      } else {
        startX = fieldWidth + (Math.random() * 18 + 8);
        startY = Math.random() * Math.max(18, fieldHeight * 0.42);
      }

      const targetX = fieldWidth * (0.35 + (Math.random() * 0.3));
      const targetY = fieldHeight * (0.45 + (Math.random() * 0.18));
      const deltaX = targetX - startX;
      const deltaY = targetY - startY;
      const distance = Math.hypot(deltaX, deltaY) || 1;

      comet = {
        x: startX,
        y: startY,
        vx: (deltaX / distance) * speed,
        vy: (deltaY / distance) * speed,
        trailLength: Math.floor(Math.random() * 8) + 10,
        life: 0,
        duration: Math.floor(Math.random() * 80) + 120,
        fadeStart: 0.45 + (Math.random() * 0.18)
      };
    };

    const drawPattern = (star, brightness) => {
      const pattern = starPatterns[star.type];
      let color;
      if (star.colorShift && star.rgb) {
        color = star.rgb;
      } else if (star.type === 'big') {
        color = brightness >= 0.92 ? '#fffbe6' : brightness >= 0.72 ? '#ffe9a8' : '#e6d7a9';
      } else {
        color = brightness >= 0.92 ? '#ffffff' : brightness >= 0.72 ? '#d8d8d8' : '#9a9a9a';
      }

      bufferContext.fillStyle = color;
      pattern.forEach((pixel) => {
        bufferContext.fillRect(star.x + pixel.x, star.y + pixel.y, 1, 1);
      });

      if (star.type !== 'dot' && brightness > 0.86 && star.variant === 1) {
        bufferContext.fillStyle = '#ffffff';
        bufferContext.fillRect(star.x - 1, star.y - 1, 1, 1);
        bufferContext.fillRect(star.x + 1, star.y + 1, 1, 1);
        bufferContext.fillRect(star.x - 1, star.y + 1, 1, 1);
        bufferContext.fillRect(star.x + 1, star.y - 1, 1, 1);
      }
    };

    const drawComet = () => {
      if (!comet) {
        return;
      }

      comet.life += 1;
      comet.x += comet.vx;
      comet.y += comet.vy;

      const progress = comet.life / comet.duration;
      const brightness = progress < comet.fadeStart
        ? Math.min(1, progress / 0.16)
        : Math.max(0, 1 - ((progress - comet.fadeStart) / (1 - comet.fadeStart)));

      if (brightness <= 0 || comet.x - comet.trailLength > buffer.width + 4 || comet.y - comet.trailLength > buffer.height + 4) {
        comet = null;
        return;
      }

      for (let index = 0; index < comet.trailLength; index += 1) {
        const trailProgress = 1 - (index / comet.trailLength);
        const x = Math.round(comet.x - (comet.vx * index));
        const y = Math.round(comet.y - (comet.vy * index));
        const intensity = brightness * trailProgress;

        if (x < -3 || y < -3 || x > buffer.width + 3 || y > buffer.height + 3) {
          continue;
        }

        bufferContext.fillStyle = intensity > 0.7 ? '#ffffff' : intensity > 0.38 ? '#cfcfcf' : '#8c8c8c';
        bufferContext.fillRect(x, y, 1, 1);

        if (index < 2 && intensity > 0.72) {
          bufferContext.fillRect(x - 1, y, 1, 1);
          bufferContext.fillRect(x, y - 1, 1, 1);
        }
      }
    };

    const render = () => {
      bufferContext.clearRect(0, 0, buffer.width, buffer.height);

      stars.forEach((star) => {
        star.twinkleOffset += star.twinkleSpeed;

        if (star.colorShift) {
          star.rgbTimer -= 1;
          if (star.rgbTimer <= 0) {
            star.rgb = randomRGB();
            star.rgbTimer = Math.floor(Math.random() * 60) + 40;
          }
        }

        star.shiftTimer -= 1;
        if (star.shiftTimer <= 0) {
          star.x += Math.floor(Math.random() * 3) - 1;
          star.y += Math.floor(Math.random() * 3) - 1;

          if (star.x < -2) {
            star.x = buffer.width + 1;
          } else if (star.x > buffer.width + 1) {
            star.x = -2;
          }

          if (star.y < -2) {
            star.y = buffer.height + 1;
          } else if (star.y > buffer.height + 1) {
            star.y = -2;
          }

          star.shiftTimer = Math.floor(Math.random() * 160) + 90;
        }

        const brightness = Math.max(0.35, Math.min(1, star.baseAlpha + Math.sin(star.twinkleOffset) * 0.22));
        drawPattern(star, brightness);
      });

      if (!comet && Math.random() < 0.008) {
        spawnComet();
      }

      drawComet();

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(buffer, 0, 0, canvas.width, canvas.height);
      requestAnimationFrame(render);
    };

    resizeCanvas();
    populateStars();
    render();

    window.addEventListener('resize', () => {
      resizeCanvas();
      populateStars();
    });
  };

  const init = () => {
    document.body.classList.add('card-style-poster');
    initStarfield();
    injectSystemWindows();
    injectWindowCopyright();
    bindThemeButtons();
    applyTheme(localStorage.getItem('preferredColorTheme') || 'night');
    syncThemeSelection();
    syncSystemWindowPalette();
    resetAvailabilityWindowPosition();
    resetSettingsWindowPosition();
    initWindowDragging();

    window.addEventListener('resize', () => {
      resetAvailabilityWindowPosition();
      resetSettingsWindowPosition();
      syncSystemWindowPalette();
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
