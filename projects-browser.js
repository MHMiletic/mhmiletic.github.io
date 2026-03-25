(() => {
  const safeEncode = (path) => encodeURI(path || '');

  const projectUrl = (slug) => `project.html?slug=${encodeURIComponent(slug)}`;
  const collectionUrl = (slug) => `collection.html?slug=${encodeURIComponent(slug)}`;

  const getItemCategoryKeys = (item) => {
    const categories = Array.isArray(item && item.categories)
      ? item.categories
      : [item && item.category ? item.category : ''];

    return [...new Set(
      categories
        .map((category) => String(category || '').trim())
        .filter(Boolean)
    )];
  };

  const getCategoryLabel = (categoryKey) => {
    const categoryMeta = PROJECT_CATEGORIES[categoryKey];
    return categoryMeta ? categoryMeta.label : categoryKey;
  };

  const renderProjectCard = (project) => {
    const shotCount = Array.isArray(project.shots) ? project.shots.length : 1;
    const categoryKeys = getProjectCategoryKeys(project);
    const categoryLabels = [...new Set(categoryKeys.map(getCategoryLabel).filter(Boolean))];
    const categoryText = categoryLabels.join(' • ');
    const folderKey = getProjectFolderKey(project);

    return `
      <article class="page-project-card" data-category="${categoryKeys.join(' ')}" data-folder="${folderKey}">
        <a class="project-card-link" href="${projectUrl(project.slug)}" aria-label="Open ${project.title}">
          <img src="${safeEncode(project.cover)}" alt="${project.title} preview" loading="lazy" />
          <div class="page-project-card-body">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <p class="project-card-meta">${categoryText} • ${shotCount} shot${shotCount === 1 ? '' : 's'}</p>
          </div>
        </a>
      </article>
    `;
  };

  const renderCollectionCard = (collection, members) => {
    const categoryKeys = getItemCategoryKeys(collection);
    const categoryLabels = [...new Set(categoryKeys.map(getCategoryLabel).filter(Boolean))];
    const categoryText = categoryLabels.join(' • ');
    const shotCount = members.reduce((total, project) => total + (Array.isArray(project.shots) ? project.shots.length : 1), 0);
    const cover = members[0] ? members[0].cover : '';

    return `
      <article class="page-project-card is-collection" data-category="${categoryKeys.join(' ')}">
        <a class="project-card-link" href="${collectionUrl(collection.slug)}" aria-label="Open ${collection.title}">
          <img src="${safeEncode(cover)}" alt="${collection.title} preview" loading="lazy" />
          <div class="page-project-card-body">
            <h3>${collection.title}</h3>
            <p>${collection.description}</p>
            <p class="project-card-meta">${categoryText} • ${members.length} works • ${shotCount} shots</p>
          </div>
        </a>
      </article>
    `;
  };

  const getOverviewItems = (filter) => {
    const includeCollection = (collection) => {
      if (filter === 'all') {
        return true;
      }
      return getItemCategoryKeys(collection).includes(filter);
    };
    const activeCollections = COLLECTIONS.filter(includeCollection);

    const collectionMembersBySlug = Object.fromEntries(
      activeCollections.map((collection) => [collection.slug, getCollectionProjects(collection)])
    );

    const groupedProjectSlugs = new Set(
      activeCollections.flatMap((collection) => collectionMembersBySlug[collection.slug].map((project) => project.slug))
    );

    const regularProjects = PROJECTS.filter((project) => {
      if (filter !== 'all' && !getProjectCategoryKeys(project).includes(filter)) {
        return false;
      }
      return !groupedProjectSlugs.has(project.slug);
    }).map((project) => ({
      kind: 'project',
      title: project.title,
      date: project.date,
      render: () => renderProjectCard(project)
    }));

    const collectionItems = activeCollections
      .filter((collection) => collectionMembersBySlug[collection.slug].length > 0)
      .map((collection) => {
        const members = collectionMembersBySlug[collection.slug];
        const latestDate = members
          .map((project) => String(project.date || ''))
          .sort((a, b) => b.localeCompare(a))[0] || '0000-00-00';

        return {
          kind: 'collection',
          title: collection.title,
          date: latestDate,
          render: () => renderCollectionCard(collection, members)
        };
      });

    return regularProjects.concat(collectionItems);
  };

  const attachGridHandlers = (container) => {
    const sortSelect = document.getElementById('projectSort');
    const chips = document.querySelectorAll('.project-filter-chip[data-filter]');

    const currentFilter = () => {
      const active = document.querySelector('.project-filter-chip.is-active[data-filter]');
      return active ? active.dataset.filter : 'all';
    };

    const rerender = () => {
      const filter = currentFilter();
      const mode = sortSelect ? sortSelect.value : 'date-desc';
      const items = getOverviewItems(filter);

      items.sort((a, b) => {
        if (mode === 'title-asc') {
          return a.title.localeCompare(b.title);
        }
        if (mode === 'date-asc') {
          return String(a.date).localeCompare(String(b.date));
        }
        return String(b.date).localeCompare(String(a.date));
      });

      container.innerHTML = items.map((item) => item.render()).join('');
      if (items.length === 0) {
        container.innerHTML = '<p>No projects in this category yet.</p>';
      }
    };

    if (sortSelect) {
      sortSelect.addEventListener('change', rerender);
    }

    chips.forEach((chip) => {
      chip.addEventListener('click', () => {
        chips.forEach((node) => node.classList.remove('is-active'));
        chip.classList.add('is-active');
        rerender();
      });
    });

    rerender();
  };

  const renderOverview = () => {
    const container = document.getElementById('projectsGrid');
    if (!container) {
      return;
    }
    attachGridHandlers(container);
  };

  const renderCategoryPage = () => {
    const container = document.getElementById('categoryProjectsGrid');
    if (!container) {
      return;
    }

    const category = document.body.dataset.category;
    const categoryMeta = PROJECT_CATEGORIES[category];
    const titleNode = document.getElementById('categoryTitle');

    if (titleNode && categoryMeta) {
      titleNode.textContent = categoryMeta.label;
    }

    const sortSelect = document.getElementById('categoryProjectSort');

    const rerender = () => {
      const source = getProjectsByCategory(category);
      const sorted = sortProjects(source, sortSelect ? sortSelect.value : 'date-desc');
      container.innerHTML = sorted.map(renderProjectCard).join('');
      if (sorted.length === 0) {
        container.innerHTML = '<p>No projects in this category yet.</p>';
      }
    };

    if (sortSelect) {
      sortSelect.addEventListener('change', rerender);
    }

    rerender();
  };

  const renderProjectDetail = () => {
    const detail = document.getElementById('projectDetail');
    if (!detail) {
      return;
    }

    const params = new URLSearchParams(window.location.search);
    const slug = params.get('slug') || '';
    const project = PROJECTS_BY_SLUG[slug];

    if (!project) {
      detail.innerHTML = '<h1>Project not found</h1><p>Use My Work to open an existing project.</p>';
      return;
    }

    const categoryKeys = getProjectCategoryKeys(project);
    const categoryLabels = [...new Set(categoryKeys.map(getCategoryLabel).filter(Boolean))];
    const categoryText = categoryLabels.join(' • ');
    const sourceShots = Array.isArray(project.shots) && project.shots.length ? project.shots : [project.cover];
    const shots = [...new Set(sourceShots)]
      .filter(Boolean)
      .sort((a, b) => {
        const fileA = String(a).split('/').pop() || '';
        const fileB = String(b).split('/').pop() || '';
        return fileA.localeCompare(fileB, undefined, { numeric: true, sensitivity: 'base' });
      });

    const renderThumbButton = (shotPath, index) => `
      <button
        type="button"
        class="project-shot-thumb${index === 0 ? ' is-active' : ''}"
        data-shot-index="${index}"
        aria-pressed="${index === 0 ? 'true' : 'false'}"
        aria-label="Show shot ${index + 1}"
      >
        <img src="${safeEncode(shotPath)}" alt="${project.title} shot ${index + 1}" loading="lazy">
      </button>
    `;

    detail.innerHTML = `
      <div class="project-detail-heading">
        <h1>${project.title}</h1>
        <a href="projects.html" class="project-detail-symbol-link" data-history-back="true" aria-label="Return to previous page" title="Return">
          <img class="project-detail-symbol" src="assets/icons/windows/return.ico" alt="Return icon" loading="lazy">
        </a>
      </div>
      <p class="project-detail-meta">${categoryText} • <span class="project-detail-date" title="upload date">${project.date}</span></p>
      <p>${project.description}</p>
      <section class="project-gallery" aria-label="${project.title} shots">
        <div class="project-featured-shot-wrap">
          <img id="projectFeaturedShot" class="project-featured-shot" src="${safeEncode(shots[0])}" alt="${project.title} featured shot" loading="lazy">
        </div>
        <div class="project-shot-thumbs" role="listbox" aria-label="Choose project shot">
          ${shots.map((shotPath, index) => renderThumbButton(shotPath, index)).join('')}
        </div>
      </section>
    `;

    const featuredShot = detail.querySelector('#projectFeaturedShot');
    const shotThumbs = detail.querySelectorAll('.project-shot-thumb');
    const detailSymbol = detail.querySelector('.project-detail-symbol');

    if (detailSymbol) {
      detailSymbol.addEventListener('dragstart', (event) => event.preventDefault());
    }

    const setFeaturedShot = (nextThumbButton) => {
      const index = Number.parseInt(nextThumbButton.dataset.shotIndex || '0', 10);
      const nextPath = shots[index] || shots[0];
      featuredShot.src = safeEncode(nextPath);
      featuredShot.alt = `${project.title} featured shot ${index + 1}`;

      shotThumbs.forEach((button) => {
        const isActive = button === nextThumbButton;
        button.classList.toggle('is-active', isActive);
        button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
      });
    };

    shotThumbs.forEach((button) => {
      button.addEventListener('click', () => {
        setFeaturedShot(button);
      });
    });
  };

  const renderCollectionDetail = () => {
    const collectionDetail = document.getElementById('collectionDetail');
    if (!collectionDetail) {
      return;
    }

    const params = new URLSearchParams(window.location.search);
    const slug = params.get('slug') || '';
    const collection = COLLECTIONS_BY_SLUG[slug];

    if (!collection) {
      collectionDetail.innerHTML = '<h1>Collection not found</h1><p>Open a collection from My Work.</p>';
      return;
    }

    const categoryKeys = getItemCategoryKeys(collection);
    const categoryLabels = [...new Set(categoryKeys.map(getCategoryLabel).filter(Boolean))];
    const categoryText = categoryLabels.join(' • ');
    const members = sortProjects(getCollectionProjects(collection), 'date-desc');

    collectionDetail.innerHTML = `
      <h1>${collection.title}</h1>
      <p class="project-detail-meta">${categoryText} • ${members.length} works</p>
      <p>${collection.description}</p>
      <section class="page-project-grid" aria-label="${collection.title} projects">
        ${members.map(renderProjectCard).join('')}
      </section>
    `;
  };

  const renderFolderPage = () => {
    const container = document.getElementById('folderProjectsGrid');
    if (!container) {
      return;
    }

    const folder = document.body.dataset.folder;
    const folderMeta = PROJECT_FOLDERS[folder];
    const titleNode = document.getElementById('folderTitle');

    if (titleNode && folderMeta) {
      titleNode.textContent = folderMeta.label;
    }

    const sortSelect = document.getElementById('folderProjectSort');

    const rerender = () => {
      const source = getProjectsByFolder(folder);
      const sorted = sortProjects(source, sortSelect ? sortSelect.value : 'date-desc');
      container.innerHTML = sorted.map(renderProjectCard).join('');
      if (sorted.length === 0) {
        container.innerHTML = '<p>No projects in this folder yet.</p>';
      }
    };

    if (sortSelect) {
      sortSelect.addEventListener('change', rerender);
    }

    rerender();
  };

  const init = () => {
    const bindWindowReturnLinks = () => {
      const returnLinks = document.querySelectorAll('.window-return-link[data-history-back="true"], .project-detail-symbol-link[data-history-back="true"]');
      if (!returnLinks.length) {
        return;
      }

      const sameOriginReferrer = (() => {
        if (!document.referrer) {
          return null;
        }

        try {
          const parsed = new URL(document.referrer);
          return parsed.origin === window.location.origin ? parsed.href : null;
        } catch (_error) {
          return null;
        }
      })();

      returnLinks.forEach((link) => {
        if (sameOriginReferrer) {
          link.href = sameOriginReferrer;
        }

        link.addEventListener('click', (event) => {
          if (!sameOriginReferrer || window.history.length <= 1) {
            return;
          }

          event.preventDefault();
          window.history.back();
        });
      });
    };

    renderOverview();
    renderCategoryPage();
    renderFolderPage();
    renderProjectDetail();
    renderCollectionDetail();
    bindWindowReturnLinks();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
