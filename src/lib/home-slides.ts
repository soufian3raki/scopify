import type { ImageMetadata } from 'astro';

const slideModules = import.meta.glob<{ default: ImageMetadata }>(
  '../content/img/*.{jpg,jpeg,png,webp,avif}',
  { eager: true }
);

export interface HomeSlide {
  src: ImageMetadata;
  alt: string;
}

export function getHomeSlides(): HomeSlide[] {
  return Object.entries(slideModules)
    .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
    .map(([path, mod]) => {
      const filename = path.split('/').pop() ?? 'slide';
      const alt = filename.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' ');
      return { src: mod.default, alt };
    });
}
