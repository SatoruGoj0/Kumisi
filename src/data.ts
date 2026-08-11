import { BlogPost, GalleryPhoto, TrackedSpecies, MigrationFlock } from './types';

export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    title: 'The Return of the Dalmatian Pelicans',
    author: 'Dr. Elene Beridze',
    status: 'PUBLISHED',
    lastEdited: '2h ago',
    date: 'March 15, 2024',
    summary: 'Our telemetry team has spotted the first flocks of Great White & Dalmatian Pelicans arriving early this season, signaling a shift in migratory corridors.',
    content: `Lake Kumisi has welcomed its annual guests earlier than anticipated this spring. Over 450 Dalmatian Pelicans (Pelecanus crispus) were recorded landing along the northern reeds during sunrise monitoring. 
    
    Telemetry signals indicate that these flocks travelled along the Black Sea flyway, utilizing the high thermal lifts across Southern Georgia. Soil and water telemetry sensors indicate optimal nesting conditions with abundant small cyprinid fish populations following the recent water quality restoration project.
    
    Local research teams continue to tag juvenile pelicans to monitor transboundary roosting sites across neighboring wetland reserves.`,
    category: 'Migration Update',
    reads: '1.2k Reads',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDSy-9ncBoTMrv4-sF5JuYP3eciNJIDzW5nbOY5oEfKeIfJxX513QKO-c7fOVMiMRd2Wu1990C03loEF06Tur69xA6uJx0qqngjToSbHgDBctbOWrQsD4TvinGPMR4rZ5HI2uDKLEHMVk-aqAhypAwMND73qWjgTz41MhxnC8h_yYNtz9vRyibYmj5iJAPq9MpjTbYh70E_LXeEdU3Ksv66WvLEhnx70UiQjWFuOIMpObnBwHoXV7As',
    tag: 'Migration Update'
  },
  {
    id: 'post-2',
    title: 'Understanding Lake Salinity Cycles',
    author: 'Admin Team',
    status: 'DRAFT',
    lastEdited: 'Yesterday',
    date: 'March 12, 2024',
    summary: 'Latest results from our geotechnical analysis show a high concentration of minerals in the northern basin, providing crucial peloid deposits.',
    content: `Hydrogeological samplings collected from Kumisi's shallow thermokarst sediment basins reveal seasonal fluctuation in dissolved minerals, key to peloid (therapeutic mud) formation.
    
    The balancing of freshwater inlet streams with high evaporation rates during autumn produces the sulfur-rich peloid beds long utilized in regional healing traditions. Ongoing research focuses on preserving water intake volume to maintain saline concentration equilibrium.`,
    category: 'Mud Research',
    reads: '980 Reads',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAHxVAFV2TL_4GBGumJ28xtdtI9wt8FiTcSzbM5jGT_xSCvmuyuRTzNbNO9wOz7PJ7UtAm9QWkkVIEkhg7C2k5lJcllyhUu7ZHS53KLWeo75qrXkw7sMwMGUUnub7g0d45eCK-G6morPbqXkCFTjPHII3S3HqXdkzefeX8aCv10QJHrlAA18-EmKXpWzBeNbs7p5nVinycOXuLNevJqxddalrYClXMszccjFvKHdRTxGI4iMG13NGCh',
    tag: 'Mud Research'
  },
  {
    id: 'post-3',
    title: 'Visitor Guidelines for Winter 2024',
    author: 'Giorgi K.',
    status: 'REVIEW REQ.',
    lastEdited: 'Oct 20',
    date: 'March 08, 2024',
    summary: 'Over 200 local residents joined our seasonal cleanup, removing 2 tons of debris and restoring critical nesting habitats for endangered ducks.',
    content: `To protect wintering waterfowl and roosting raptors, new buffer zones have been established around the eastern reed beds. Visitors, photographers, and birdwatchers are asked to remain within designated observation hides.
    
    Drone flights are strictly prohibited within 1.5 km of active nesting zones. Guided birding trails are open daily from sunrise to 4:00 PM.`,
    category: 'Community Protection',
    reads: '850 Reads',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCYIPbNVv4i32qsL_v3qe0SIj-Y2uIZUvIPjvsNDPNrlts3D2DFret4qh4yI2IIFgGSXkPd3aTGEWewvfl2eQOsApROjke0dO20F5ei40-rCIPUqTercKtwyA_K50kNRkCTWcVHmejqq9pI-dqICl7sjdGiuD868ri4TwGbR7-IcaKOUBt08s-8SOAqlY2H6glG6dVBImVbaRIj-9O9B6dcA59N3dnYDvTAdbM6hmrb-xs_MUc3wv-s',
    tag: 'Community Protection'
  }
];

export const POPULAR_INSIGHTS = [
  {
    id: 'pop-1',
    title: '5 Benefits of Kumisi Mineral Mud',
    reads: '1.2k Reads',
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAHxVAFV2TL_4GBGumJ28xtdtI9wt8FiTcSzbM5jGT_xSCvmuyuRTzNbNO9wOz7PJ7UtAm9QWkkVIEkhg7C2k5lJcllyhUu7ZHS53KLWeo75qrXkw7sMwMGUUnub7g0d45eCK-G6morPbqXkCFTjPHII3S3HqXdkzefeX8aCv10QJHrlAA18-EmKXpWzBeNbs7p5nVinycOXuLNevJqxddalrYClXMszccjFvKHdRTxGI4iMG13NGCh'
  },
  {
    id: 'pop-2',
    title: 'Identifying the Dalmatian Pelican',
    reads: '980 Reads',
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDSy-9ncBoTMrv4-sF5JuYP3eciNJIDzW5nbOY5oEfKeIfJxX513QKO-c7fOVMiMRd2Wu1990C03loEF06Tur69xA6uJx0qqngjToSbHgDBctbOWrQsD4TvinGPMR4rZ5HI2uDKLEHMVk-aqAhypAwMND73qWjgTz41MhxnC8h_yYNtz9vRyibYmj5iJAPq9MpjTbYh70E_LXeEdU3Ksv66WvLEhnx70UiQjWFuOIMpObnBwHoXV7As'
  },
  {
    id: 'pop-3',
    title: 'Eco-Tourism: How to Visit Responsibly',
    reads: '850 Reads',
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCYIPbNVv4i32qsL_v3qe0SIj-Y2uIZUvIPjvsNDPNrlts3D2DFret4qh4yI2IIFgGSXkPd3aTGEWewvfl2eQOsApROjke0dO20F5ei40-rCIPUqTercKtwyA_K50kNRkCTWcVHmejqq9pI-dqICl7sjdGiuD868ri4TwGbR7-IcaKOUBt08s-8SOAqlY2H6glG6dVBImVbaRIj-9O9B6dcA59N3dnYDvTAdbM6hmrb-xs_MUc3wv-s'
  }
];

export const INITIAL_GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 'photo-1',
    title: 'Kingfisher Morning Perch',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCLK7pCmgc8KuFXstABYYFewKrjj7qRCDDiCZZRtBap_x445XT_1CoIwSPqJZsa2wSmDebm4wyvKg1OV4dSzzAW_LTLIqPBHvZs2FIiw4V0KiKdJ0bcI8D3yn3-Bpy6MkVmaWKni6rvA6P5zI9pCEXZvbRzc-m_5Fh9ayXkj5q0VvtpL8NVerX6HKoUz7LsBmSbohWvLEZYN_3FLaR29BrslRo9OPrreSgTI81ZjkgcDsgZA3XaV5Dn',
    alt: 'Macro shot of a rare Kingfisher bird perched on a reed at Lake Kumisi with electric blue feathers',
    photographer: 'Tornike L.',
    date: 'Oct 24, 2024',
    tags: ['Kingfisher', 'Migration24', 'Wetlands'],
    views: 1420
  },
  {
    id: 'photo-2',
    title: 'Kumisi Lake Sunrise Panorama',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCYIPbNVv4i32qsL_v3qe0SIj-Y2uIZUvIPjvsNDPNrlts3D2DFret4qh4yI2IIFgGSXkPd3aTGEWewvfl2eQOsApROjke0dO20F5ei40-rCIPUqTercKtwyA_K50kNRkCTWcVHmejqq9pI-dqICl7sjdGiuD868ri4TwGbR7-IcaKOUBt08s-8SOAqlY2H6glG6dVBImVbaRIj-9O9B6dcA59N3dnYDvTAdbM6hmrb-xs_MUc3wv-s',
    alt: 'Aerial wide shot of Kumisi Lake Sanctuary at sunrise reflecting pink and gold sky',
    photographer: 'Dr. Elene Beridze',
    date: 'Oct 22, 2024',
    tags: ['Wetlands', 'Sunrise', 'Aerial'],
    views: 2890
  },
  {
    id: 'photo-3',
    title: 'Dalmatian Pelicans in Shallow Reeds',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDSy-9ncBoTMrv4-sF5JuYP3eciNJIDzW5nbOY5oEfKeIfJxX513QKO-c7fOVMiMRd2Wu1990C03loEF06Tur69xA6uJx0qqngjToSbHgDBctbOWrQsD4TvinGPMR4rZ5HI2uDKLEHMVk-aqAhypAwMND73qWjgTz41MhxnC8h_yYNtz9vRyibYmj5iJAPq9MpjTbYh70E_LXeEdU3Ksv66WvLEhnx70UiQjWFuOIMpObnBwHoXV7As',
    alt: 'Dalmatian pelican wading through shallow reeds in Lake Kumisi sanctuary',
    photographer: 'Sanctuary Field Team',
    date: 'Oct 19, 2024',
    tags: ['Pelican', 'Migration24', 'SpeciesTracked'],
    views: 1950
  },
  {
    id: 'photo-4',
    title: 'Therapeutic Sulfide Sediment Bed',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAHxVAFV2TL_4GBGumJ28xtdtI9wt8FiTcSzbM5jGT_xSCvmuyuRTzNbNO9wOz7PJ7UtAm9QWkkVIEkhg7C2k5lJcllyhUu7ZHS53KLWeo75qrXkw7sMwMGUUnub7g0d45eCK-G6morPbqXkCFTjPHII3S3HqXdkzefeX8aCv10QJHrlAA18-EmKXpWzBeNbs7p5nVinycOXuLNevJqxddalrYClXMszccjFvKHdRTxGI4iMG13NGCh',
    alt: 'Mineral-rich dark sulfide mud sample from Lake Kumisi',
    photographer: 'Geo-Lab Staff',
    date: 'Oct 15, 2024',
    tags: ['MudResearch', 'Geology', 'Peloids'],
    views: 840
  }
];

export const INITIAL_SPECIES: TrackedSpecies[] = [
  {
    id: 'sp-1',
    name: 'Dalmatian Pelican',
    scientificName: 'Pelecanus crispus',
    count: 450,
    status: 'Increasing',
    lastSpotted: '10 mins ago',
    location: 'North Bay Reeds',
    category: 'Avian Waterfowl'
  },
  {
    id: 'sp-2',
    name: 'Common Kingfisher',
    scientificName: 'Alcedo atthis',
    count: 120,
    status: 'Stable',
    lastSpotted: '1 hour ago',
    location: 'South Outlet Creek',
    category: 'Avian Passerine'
  },
  {
    id: 'sp-3',
    name: 'Black-winged Stilt',
    scientificName: 'Himantopus himantopus',
    count: 310,
    status: 'Increasing',
    lastSpotted: '25 mins ago',
    location: 'Mud Flats Zone B',
    category: 'Wader'
  },
  {
    id: 'sp-4',
    name: 'Great Egret',
    scientificName: 'Ardea alba',
    count: 85,
    status: 'Stable',
    lastSpotted: '3 hours ago',
    location: 'Eastern Island Roost',
    category: 'Heron'
  }
];

export const MIGRATION_FLOCKS: MigrationFlock[] = [
  { id: 'f-1', species: 'Dalmatian Pelicans', flockSize: 240, coordinates: { x: 35, y: 40 }, status: 'High', direction: 'Southbound' },
  { id: 'f-2', species: 'White Storks', flockSize: 510, coordinates: { x: 60, y: 25 }, status: 'High', direction: 'Southbound' },
  { id: 'f-3', species: 'Eurasian Teal', flockSize: 120, coordinates: { x: 20, y: 70 }, status: 'Moderate', direction: 'Roosting' },
  { id: 'f-4', species: 'Pygmy Cormorants', flockSize: 95, coordinates: { x: 75, y: 65 }, status: 'Moderate', direction: 'Westbound' }
];
