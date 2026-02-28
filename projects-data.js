// central data for all projects
const PROJECTS = [
  {
    section: 'mockups',
    date: '2026-02-25',
    title: 'Zelda Cook Book',
    img: 'projects/mockups/COVER_ZELDA_alt.jpg',
    imgClass: 'cookbook-img',
    desc: 'Who would not want their waterbottle have a bit more flare.'
  },
  {
    section: 'mockups',
    date: '2026-02-22',
    title: 'Mountainrange',
    img: 'projects/mockups/adventure.png',
    imgClass: 'mountainrange-img',
    desc: 'Who would not want a mountain range that follows them around and does their bidding.'
  },
  {
    section: 'mockups',
    date: '2026-02-20',
    title: 'BÖTTL',
    img: 'projects/mockups/bottl.png',
    imgClass: 'bottl-img',
    desc: 'Who would not want their waterbottle have a bit more flare.'
  },
 {
    section: 'mockups',
    date: '2021-02-20',
    title: 'Movieposter',
    img: 'projects/mockups/Movieposter.png',
    imgClass: 'movieposter-img',
    desc: 'Who would not want their waterbottle have a bit more flare.'
  },
  // hoodies entries (use placeholder dates)
  {
    section: 'hoodies',
    date: 'YYYY-MM-DD',
    title: 'kirby1',
    img: 'projects/hoodies/kirby1.png',
    imgClass: 'hoodie-img',
    desc: 'Hoodie design'
  },
  {
    section: 'hoodies',
    date: 'YYYY-MM-DD',
    title: 'kirby2',
    img: 'projects/hoodies/kirby2.png',
    imgClass: 'hoodie-img',
    desc: 'Hoodie design'
  },
  {
    section: 'hoodies',
    date: 'YYYY-MM-DD',
    title: 'kirby3',
    img: 'projects/hoodies/kirby3.png',
    imgClass: 'hoodie-img',
    desc: 'Hoodie design'
  },
  {
    section: 'hoodies',
    date: 'YYYY-MM-DD',
    title: 'kira alt1',
    img: 'projects/hoodies/kira_alt1.png',
    imgClass: 'hoodie-img',
    desc: 'Hoodie design'
  },
  {
    section: 'hoodies',
    date: 'YYYY-MM-DD',
    title: 'kira alt2',
    img: 'projects/hoodies/kira_alt2.png',
    imgClass: 'hoodie-img',
    desc: 'Hoodie design'
  },
  {
    section: 'hoodies',
    date: 'YYYY-MM-DD',
    title: 'kira alt3',
    img: 'projects/hoodies/kira_alt3.png',
    imgClass: 'hoodie-img',
    desc: 'Hoodie design'
  },
  {
    section: 'hoodies',
    date: 'YYYY-MM-DD',
    title: 'jjk gojo alt1',
    img: 'projects/hoodies/jjk_gojo_alt1.png',
    imgClass: 'hoodie-img',
    desc: 'Hoodie design'
  },
  {
    section: 'hoodies',
    date: 'YYYY-MM-DD',
    title: 'jjk gojo alt2',
    img: 'projects/hoodies/jjk_gojo_alt2.png',
    imgClass: 'hoodie-img',
    desc: 'Hoodie design'
  },
  {
    section: 'hoodies',
    date: 'YYYY-MM-DD',
    title: 'jjk gojo alt3',
    img: 'projects/hoodies/jjk_gojo_alt3.png',
    imgClass: 'hoodie-img',
    desc: 'Hoodie design'
  },
  {
    section: 'hoodies',
    date: 'YYYY-MM-DD',
    title: 'csm1',
    img: 'projects/hoodies/csm1.png',
    imgClass: 'hoodie-img',
    desc: 'Hoodie design'
  },
  {
    section: 'hoodies',
    date: 'YYYY-MM-DD',
    title: 'csm2',
    img: 'projects/hoodies/csm2.png',
    imgClass: 'hoodie-img',
    desc: 'Hoodie design'
  },
  {
    section: 'hoodies',
    date: 'YYYY-MM-DD',
    title: 'csm3',
    img: 'projects/hoodies/csm3.png',
    imgClass: 'hoodie-img',
    desc: 'Hoodie design'
  },
  {
    section: 'hoodies',
    date: 'YYYY-MM-DD',
    title: 'berserk1',
    img: 'projects/hoodies/berserk1.png',
    imgClass: 'hoodie-img',
    desc: 'Hoodie design'
  },
  {
    section: 'hoodies',
    date: 'YYYY-MM-DD',
    title: 'berserk2',
    img: 'projects/hoodies/berserk2.png',
    imgClass: 'hoodie-img',
    desc: 'Hoodie design'
  },
  {
    section: 'hoodies',
    date: 'YYYY-MM-DD',
    title: 'berserk3',
    img: 'projects/hoodies/berserk3.png',
    imgClass: 'hoodie-img',
    desc: 'Hoodie design'
  },
  {
    section: 'hoodies',
    date: 'YYYY-MM-DD',
    title: 'berserk overlap alt1',
    img: 'projects/hoodies/berserk_overlap_alt1.png',
    imgClass: 'hoodie-img',
    desc: 'Hoodie design'
  },
  {
    section: 'hoodies',
    date: 'YYYY-MM-DD',
    title: 'berserk overlap alt2',
    img: 'projects/hoodies/berserk_overlap_alt2.png',
    imgClass: 'hoodie-img',
    desc: 'Hoodie design'
  },
  {
    section: 'hoodies',
    date: 'YYYY-MM-DD',
    title: 'berserk overlap alt3',
    img: 'projects/hoodies/berserk_overlap_alt3.png',
    imgClass: 'hoodie-img',
    desc: 'Hoodie design'
  },
  // passion/personal projects entries
  {
    section: 'personalprojects',
    date: 'YYYY-MM-DD',
    title: 'Where the skies end',
    img: 'projects/passion/where the skies end.png',
    imgClass: 'personal-img',
    desc: 'Personal project'
  },
  {
    section: 'personalprojects',
    date: 'YYYY-MM-DD',
    title: 'waking up',
    img: 'projects/passion/waking up.png',
    imgClass: 'personal-img',
    desc: 'Personal project'
  },
  {
    section: 'personalprojects',
    date: 'YYYY-MM-DD',
    title: 'trials',
    img: 'projects/passion/trials.png',
    imgClass: 'personal-img',
    desc: 'Personal project'
  },
  {
    section: 'personalprojects',
    date: 'YYYY-MM-DD',
    title: 'solstice',
    img: 'projects/passion/solstice.png',
    imgClass: 'personal-img',
    desc: 'Personal project'
  },
  {
    section: 'personalprojects',
    date: 'YYYY-MM-DD',
    title: 'perfect machine',
    img: 'projects/passion/perfect machine.png',
    imgClass: 'personal-img',
    desc: 'Personal project'
  },
  {
    section: 'personalprojects',
    date: 'YYYY-MM-DD',
    title: 'other worlds than these',
    img: 'projects/passion/other worlds than these.png',
    imgClass: 'personal-img',
    desc: 'Personal project'
  },
  {
    section: 'personalprojects',
    date: 'YYYY-MM-DD',
    title: 'Manifest',
    img: 'projects/passion/Manifest.png',
    imgClass: 'personal-img',
    desc: 'Personal project'
  },
  {
    section: 'personalprojects',
    date: 'YYYY-MM-DD',
    title: 'faultline_2',
    img: 'projects/passion/faultline_2.png',
    imgClass: 'personal-img',
    desc: 'Personal project'
  },
  {
    section: 'personalprojects',
    date: 'YYYY-MM-DD',
    title: 'Echo',
    img: 'projects/passion/Echo.png',
    imgClass: 'personal-img',
    desc: 'Personal project'
  }
  // add more entries as needed, include section values 'socialmedia', 'personalprojects', or 'hoodies'
];