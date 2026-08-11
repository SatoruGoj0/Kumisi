export type ViewMode = 'dashboard' | 'public' | 'gallery' | 'blog' | 'analytics';

export type BlogStatus = 'PUBLISHED' | 'DRAFT' | 'REVIEW REQ.';

export interface BlogPost {
  id: string;
  title: string;
  author: string;
  status: BlogStatus;
  lastEdited: string;
  date: string;
  summary: string;
  content: string;
  category: string;
  reads: string;
  image?: string;
  tag?: string;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  url: string;
  alt: string;
  photographer: string;
  date: string;
  tags: string[];
  views: number;
}

export interface TrackedSpecies {
  id: string;
  name: string;
  scientificName: string;
  count: number;
  status: 'Increasing' | 'Stable' | 'Critical';
  lastSpotted: string;
  location: string;
  category: string;
}

export interface MigrationFlock {
  id: string;
  species: string;
  flockSize: number;
  coordinates: { x: number; y: number };
  status: 'High' | 'Moderate' | 'Low';
  direction: string;
}

export interface StatMetric {
  siteVisits: number;
  visitsChange: string;
  newPhotos: number;
  photosTimeframe: string;
  blogDrafts: number;
  pendingDrafts: number;
  speciesTracked: number;
  speciesStatus: string;
}
