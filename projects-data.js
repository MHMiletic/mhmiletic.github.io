// Dynamic project registry
//
// HOW TO ADD A NEW PROJECT (minimal steps):
// 1) Put images in projects/<folder>/
// 2) Add one object to PROJECTS using the template below
//
// TEMPLATE:
// {
//   slug: 'unique-slug',
//   title: 'Project Title',
//   category: 'mock-ups', // primary category
//   categories: ['mock-ups', 'illustrations'], // optional additional categories
//   date: '2026-03-22',
//   cover: 'projects/folder/cover-image.png',
//   shots: ['projects/folder/cover-image.png'],
//   description: 'Short project description.',
//   programs: ['Photoshop', 'Illustrator'] // optional, displayed on the project page
// }

const PROJECT_CATEGORIES = {
  'mock-ups': {
    key: 'mock-ups',
    label: 'mock ups',
    page: 'projects-mock-ups.html'
  },
  'advertisement-ish': {
    key: 'advertisement-ish',
    label: 'advertisement-ish',
    page: 'projects-advertisement-ish.html'
  },
  'personal-projects': {
    key: 'personal-projects',
    label: 'personal projects',
    page: 'projects-personal-projects.html'
  },
  illustrations: {
    key: 'illustrations',
    label: 'illustrations',
    page: 'projects.html'
  },
  'graphical-designs': {
    key: 'graphical-designs',
    label: 'graphical Designs',
    page: 'projects.html'
  }
};

const PROJECT_FOLDERS = {
  hoodies: {
    key: 'hoodies',
    label: 'hoodies',
    page: 'projects-hoodies.html'
  },
  mockups: {
    key: 'mockups',
    label: 'mock ups',
    page: 'projects-mockups.html'
  },
  passion: {
    key: 'passion',
    label: 'personal projects',
    page: 'projects-passion.html'
  }
};

const PROJECTS = [
  {
    slug: 'zelda-cook-book',
    title: 'The Legend of Zelda cookbook',
    category: 'mock-ups',
    programs: ['Photoshop', 'Blender', 'Illustrator'],
    date: '2026-02-25',
    cover: 'projects/mockups/Zelda Cookbook/COVER_ZELDA_alt.jpg',
    shots: ['projects/mockups/Zelda Cookbook/COVER_ZELDA_alt.jpg', 'projects/mockups/Zelda Cookbook/Zelda_cookbook.jpg'],
    description: 'A cookbook, meant to be in the style of "The Legend of Zelda Breath of The Wild".'
  },
  {
    slug: 'mountainrange',
    title: 'Mountainrange',
    category: 'mock-ups',
    date: '2026-02-22',
    cover: 'projects/mockups/Mountainrange/adventure.png',
    shots: ['projects/mockups/Mountainrange/adventure.png', 'projects/mockups/Mountainrange/mountaintravel_mockup.png'],
    description: 'Concept visual focused on depth, landscape, and atmosphere.'
  },
  {
    slug: 'bottl',
    title: 'BOTTL',
    category: 'mock-ups',
    date: '2026-02-20',
    cover: 'projects/mockups/bottl/bottl.png',
    shots: [
      'projects/mockups/bottl/bottl.png',
      'projects/mockups/bottl/waterbottle_alt.png',
      'projects/mockups/bottl/waterbottle_mockup.png'
    ],
    description: 'Packaging-style mockup with playful product branding.'
  },
  {
    slug: 'movieposter',
    title: 'Movieposter',
    category: 'mock-ups',
    date: '2021-02-20',
    cover: 'projects/mockups/movieposter/Movieposter.png',
    shots: ['projects/mockups/movieposter/Movieposter.png'],
    description: 'Poster concept balancing typography, contrast, and composition.'
  },
  {
    slug: 'warframe-instagram-ad',
    title: 'Warframe Instagram Ad',
    category: 'advertisement-ish',
    date: '2026-02-18',
    cover: 'projects/mockups/warframe/warframe_instagram_ad_cropped.jpg',
    shots: ['projects/mockups/warframe/warframe_instagram_ad_cropped.jpg'],
    description: 'Ad-style social creative optimized for fast visual impact.'
  },
  {
    slug: 'instagram-hoodie-ad',
    title: 'Instagram Hoodie Ad',
    category: 'advertisement-ish',
    date: '2026-02-17',
    cover: 'projects/mockups/hoodie ad/instagram hoodie.jpg',
    shots: ['projects/mockups/hoodie ad/instagram hoodie.jpg'],
    description: 'Campaign-style image combining apparel and social framing.'
  },
  {
    slug: 'techwear-edit',
    title: 'Techwear Edit',
    category: 'advertisement-ish',
    date: '2026-02-16',
    cover: 'projects/mockups/techwear/techwear_edit.png',
    shots: ['projects/mockups/techwear/techwear_edit.png'],
    description: 'Ad-ish edit focused on product silhouette and contrast.'
  },
  {
    slug: 'tablet-mockup-mechabellum',
    title: 'Tablet Mockup + Mechabellum',
    category: 'advertisement-ish',
    date: '2026-02-15',
    cover: 'projects/mockups/Mechabellum/tablet mockup + mechabellum.jpg',
    shots: ['projects/mockups/Mechabellum/tablet mockup + mechabellum.jpg'],
    description: 'Marketing-style composition for a device/game visual pairing.'
  },
  {
    slug: 'kirby-hoodie',
    title: 'Kirby Hoodie',
    category: 'advertisement-ish',
    date: '2026-02-12',
    programs: ['Photoshop', 'Blender'],
    cover: 'projects/hoodies/kirby1.png',
    shots: ['projects/hoodies/kirby1.png', 'projects/hoodies/kirby2.png', 'projects/hoodies/kirby3.png'],
    description: 'Apparel concept shown across multiple campaign shots.'
  },
  {
    slug: 'kira-alt-hoodie',
    title: 'Kira Alt Hoodie',
    category: 'advertisement-ish',
    date: '2026-02-11',
    programs: ['Photoshop', 'Blender'],
    cover: 'projects/hoodies/kira_alt1.png',
    shots: ['projects/hoodies/kira_alt1.png', 'projects/hoodies/kira_alt2.png', 'projects/hoodies/kira_alt3.png'],
    description: 'Variant hoodie design presented in a 3-shot sequence.'
  },
  {
    slug: 'jjk-gojo-alt-hoodie',
    title: 'JJK Gojo Alt Hoodie',
    category: 'advertisement-ish',
    date: '2026-02-10',
    programs: ['Photoshop', 'Blender'],
    cover: 'projects/hoodies/jjk_gojo_alt1.png',
    shots: ['projects/hoodies/jjk_gojo_alt1.png', 'projects/hoodies/jjk_gojo_alt2.png', 'projects/hoodies/jjk_gojo_alt3.png'],
    description: 'Hoodie artwork with alternate shot set for promo use.'
  },
  {
    slug: 'csm-hoodie',
    title: 'CSM Hoodie',
    category: 'advertisement-ish',
    date: '2026-02-09',
    programs: ['Photoshop', 'Blender'],
    cover: 'projects/hoodies/csm1.png',
    shots: ['projects/hoodies/csm1.png', 'projects/hoodies/csm2.png', 'projects/hoodies/csm3.png'],
    description: 'Three-shot apparel concept with strong front-facing visual hook.'
  },
  {
    slug: 'berserk-hoodie',
    title: 'Berserk Hoodie',
    category: 'advertisement-ish',
    date: '2026-02-08',
    programs: ['Photoshop', 'Blender'],
    cover: 'projects/hoodies/berserk1.png',
    shots: ['projects/hoodies/berserk1.png', 'projects/hoodies/berserk2.png', 'projects/hoodies/berserk3.png'],
    description: 'Branded hoodie concept presented as a campaign trio.'
  },
  {
    slug: 'berserk-overlap-alt-hoodie',
    title: 'Berserk Overlap Alt Hoodie',
    category: 'advertisement-ish',
    date: '2026-02-07',
    programs: ['Photoshop', 'Blender'],
    cover: 'projects/hoodies/berserk_overlap_alt1.png',
    shots: [
      'projects/hoodies/berserk_overlap_alt1.png',
      'projects/hoodies/berserk_overlap_alt2.png',
      'projects/hoodies/berserk_overlap_alt3.png'
    ],
    description: 'Alternate overlap composition for apparel promotion.'
  },
  {
    slug: 'where-the-skies-end',
    title: 'Where The Skies End',
    category: 'personal-projects',
    date: '2026-02-05',
    programs: ['Photoshop', 'Blender'],
    cover: 'projects/passion/starset/where the skies end.png',
    shots: ['projects/passion/starset/where the skies end.png'],
    description: 'Personal visual narrative study.'
  },
  {
    slug: 'waking-up',
    title: 'Waking Up',
    category: 'personal-projects',
    date: '2026-02-04',
    cover: 'projects/passion/starset/waking up.png',
    shots: ['projects/passion/starset/waking up.png'],
    description: 'Personal mood-driven composition.'
  },
  {
    slug: 'trials',
    title: 'Trials',
    category: 'personal-projects',
    date: '2026-02-03',
    cover: 'projects/passion/starset/trials.png',
    shots: ['projects/passion/starset/trials.png'],
    description: 'Personal concept exploring rhythm and tension.'
  },
  {
    slug: 'solstice',
    title: 'Solstice',
    category: 'personal-projects',
    date: '2026-02-02',
    cover: 'projects/passion/starset/solstice.png',
    shots: ['projects/passion/starset/solstice.png'],
    description: 'Personal artwork centered on seasonal contrast.'
  },
  {
    slug: 'perfect-machine',
    title: 'Perfect Machine',
    category: 'personal-projects',
    date: '2026-02-01',
    cover: 'projects/passion/starset/perfect machine.png',
    shots: ['projects/passion/starset/perfect machine.png'],
    description: 'Personal experiment with structure and form.'
  },
  {
    slug: 'other-worlds-than-these',
    title: 'Other Worlds Than These',
    category: 'personal-projects',
    date: '2026-01-31',
    cover: 'projects/passion/starset/other worlds than these.png',
    shots: ['projects/passion/starset/other worlds than these.png'],
    description: 'Personal piece about scale and imagined spaces.'
  },
  {
    slug: 'manifest',
    title: 'Manifest',
    category: 'personal-projects',
    date: '2026-01-30',
    cover: 'projects/passion/starset/Manifest.png',
    shots: ['projects/passion/starset/Manifest.png'],
    description: 'Personal typographic and symbolic exploration.'
  },
  {
    slug: 'faultline-2',
    title: 'Faultline 2',
    category: 'personal-projects',
    date: '2026-01-29',
    cover: 'projects/passion/starset/faultline_2.png',
    shots: ['projects/passion/starset/faultline_2.png'],
    description: 'Personal abstract composition with fracture motif.'
  },
  {
    slug: 'echo',
    title: 'Echo',
    category: 'personal-projects',
    date: '2026-01-28',
    cover: 'projects/passion/starset/Echo.png',
    shots: ['projects/passion/starset/Echo.png'],
    description: 'Personal visual loop study.'
  }
];

const PROJECTS_BY_SLUG = Object.fromEntries(PROJECTS.map((project) => [project.slug, project]));

const getProjectFolderKey = (project) => {
  const coverPath = String(project && project.cover ? project.cover : '');
  const folderMatch = coverPath.match(/^projects\/([^/]+)\//i);
  return folderMatch ? folderMatch[1].toLowerCase() : 'other';
};

const getProjectCategoryKeys = (project) => {
  const categories = Array.isArray(project && project.categories)
    ? project.categories
    : [project && project.category ? project.category : ''];

  return [...new Set(
    categories
      .map((category) => String(category || '').trim())
      .filter(Boolean)
  )];
};

const getProjectPrograms = (project) => {
  const source = Array.isArray(project && project.programs)
    ? project.programs
    : [project && project.programs ? project.programs : ''];

  return [...new Set(
    source
      .map((program) => String(program || '').trim())
      .filter(Boolean)
  )];
};

const getProjectsByCategory = (categoryKey) =>
  PROJECTS.filter((project) => getProjectCategoryKeys(project).includes(categoryKey));

const getProjectsByFolder = (folderKey) =>
  PROJECTS.filter((project) => getProjectFolderKey(project) === folderKey);

const COLLECTIONS = [
  {
    slug: 'all-hoodies',
    title: 'All Hoodies',
    category: 'advertisement-ish',
    description: 'Every hoodie concept and variant in one place.',
    filter: {
      folder: 'hoodies'
    }
  },
  {
    slug: 'starset-logo-reconcepts',
    title: 'Starset Logo Reconcepts',
    category: 'personal-projects',
    description: 'Personal project set: reconceptualizations of Starset song logos.',
    filter: {
      pathStartsWith: 'projects/passion/starset/'
    }
  }
];

const getCollectionProjects = (collection) => {
  if (!collection || !collection.filter) {
    return [];
  }

  return PROJECTS.filter((project) => {
    if (collection.filter.folder && getProjectFolderKey(project) === collection.filter.folder) {
      return true;
    }

    if (collection.filter.pathStartsWith) {
      const cover = String(project.cover || '');
      return cover.startsWith(collection.filter.pathStartsWith);
    }

    return false;
  });
};

const COLLECTIONS_BY_SLUG = Object.fromEntries(COLLECTIONS.map((collection) => [collection.slug, collection]));

const sortProjects = (projects, mode) => {
  const sorted = projects.slice();

  if (mode === 'title-asc') {
    sorted.sort((a, b) => a.title.localeCompare(b.title));
    return sorted;
  }

  if (mode === 'date-asc') {
    sorted.sort((a, b) => String(a.date).localeCompare(String(b.date)));
    return sorted;
  }

  sorted.sort((a, b) => String(b.date).localeCompare(String(a.date)));
  return sorted;
};

