(() => {
  const supportsFinePointer = window.matchMedia('(pointer: fine)').matches;
  if (!supportsFinePointer) {
    return;
  }

  const body = document.body;
  if (!body) {
    return;
  }

  let reticle = document.getElementById('crt-reticle');
  if (!reticle) {
    reticle = document.createElement('div');
    reticle.id = 'crt-reticle';
    reticle.setAttribute('aria-hidden', 'true');
    reticle.innerHTML = '<span class="reticle-box"></span><span class="reticle-ring"></span><span class="reticle-corners"></span><span class="reticle-core"></span>';
    body.appendChild(reticle);
  }

  const interactiveSelector = 'a,button,input,select,textarea,[contenteditable="true"],.hero-button,.filter-chip,.pill,.thumb,.main-media';
  let isEnabled = false;

  const toggleReticle = () => {
    isEnabled = body.classList.contains('card-style-crt');
    body.classList.toggle('crt-reticle-active', isEnabled);
    reticle.classList.toggle('is-enabled', isEnabled);

    if (!isEnabled) {
      reticle.classList.remove('is-visible', 'is-targeting', 'is-pressed');
    }
  };

  const moveReticle = (event) => {
    if (!isEnabled || event.pointerType === 'touch') {
      return;
    }

    reticle.style.transform = `translate3d(${event.clientX - 24}px, ${event.clientY - 24}px, 0)`;
    reticle.classList.add('is-visible');
  };

  document.addEventListener('pointermove', moveReticle, { passive: true });

  document.addEventListener('pointerdown', (event) => {
    if (!isEnabled || event.pointerType === 'touch') {
      return;
    }
    reticle.classList.add('is-pressed');
  });

  document.addEventListener('pointerup', () => {
    reticle.classList.remove('is-pressed');
  });

  document.addEventListener('pointerover', (event) => {
    if (!isEnabled) {
      return;
    }
    reticle.classList.toggle('is-targeting', Boolean(event.target.closest(interactiveSelector)));
  });

  document.addEventListener('pointerout', (event) => {
    if (!isEnabled) {
      return;
    }
    if (!event.relatedTarget) {
      reticle.classList.remove('is-visible', 'is-targeting', 'is-pressed');
    }
  });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      reticle.classList.remove('is-visible', 'is-targeting', 'is-pressed');
    }
  });

  const observer = new MutationObserver(toggleReticle);
  observer.observe(body, { attributes: true, attributeFilter: ['class'] });

  toggleReticle();
})();
