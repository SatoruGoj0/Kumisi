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
    image: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=800&h=600&fit=crop&q=80',
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
    image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&h=600&fit=crop&q=80',
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
    image: 'https://images.unsplash.com/photo-1444464666168-49d633b86797?w=800&h=600&fit=crop&q=80',
    tag: 'Community Protection'
  }
];

export const POPULAR_INSIGHTS = [
  {
    id: 'pop-1',
    title: '5 Benefits of Kumisi Mineral Mud',
    reads: '1.2k Reads',
    thumbnail: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=200&h=200&fit=crop&q=80'
  },
  {
    id: 'pop-2',
    title: 'Identifying the Dalmatian Pelican',
    reads: '980 Reads',
    thumbnail: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=200&h=200&fit=crop&q=80'
  },
  {
    id: 'pop-3',
    title: 'Eco-Tourism: How to Visit Responsibly',
    reads: '850 Reads',
    thumbnail: 'https://images.unsplash.com/photo-1444464666168-49d633b86797?w=200&h=200&fit=crop&q=80'
  }
];

export const INITIAL_GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 'photo-1',
    title: 'Kingfisher Morning Perch',
    url: 'https://images.unsplash.com/photo-1444464666168-49d633b86797?w=800&h=600&fit=crop&q=80',
    alt: 'Common Kingfisher (Alcedo atthis) perched on a branch at Lake Kumisi wetlands',
    photographer: 'Tornike L.',
    date: 'Oct 24, 2024',
    tags: ['Kingfisher', 'Migration24', 'Wetlands'],
    views: 1420
  },
  {
    id: 'photo-2',
    title: 'Kumisi Lake Aerial View',
    url: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&h=600&fit=crop&q=80',
    alt: 'Aerial view of Lake Kumisi wetland sanctuary in Georgia showing reed beds and shallow waters',
    photographer: 'Dr. Elene Beridze',
    date: 'Oct 22, 2024',
    tags: ['Wetlands', 'Sunrise', 'Aerial'],
    views: 2890
  },
  {
    id: 'photo-3',
    title: 'Dalmatian Pelicans at Kumisi',
    url: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=800&h=600&fit=crop&q=80',
    alt: 'Dalmatian Pelican (Pelecanus crispus) - the flagship migratory species of Lake Kumisi',
    photographer: 'Sanctuary Field Team',
    date: 'Oct 19, 2024',
    tags: ['Pelican', 'Migration24', 'SpeciesTracked'],
    views: 1950
  },
  {
    id: 'photo-4',
    title: 'Therapeutic Sulfide Sediment',
    url: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=800&h=600&fit=crop&q=80',
    alt: 'Mineral-rich dark sulfide mud sample from Lake Kumisi used in balneological therapy',
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
