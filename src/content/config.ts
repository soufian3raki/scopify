import { defineCollection, z } from 'astro:content';

const rezepte = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    category: z.string(),
    tag: z.string().optional(),
    cover: image().optional(),
    thumb: z.string().default('🍞'),
    thumbClass: z.string().optional(),
    featClass: z.string().optional(),
    featuredBadge: z.string().optional(),
    difficulty: z.enum(['Easy', 'Medium', 'Advanced']),
    times: z.object({
      prep: z.string(),
      rest: z.string(),
      bake: z.string(),
      total: z.string(),
    }),
    yield: z.string(),
    rating: z.string(),
    featured: z.boolean().default(false),
    ingredients: z.array(z.object({
      name: z.string(),
      amount: z.string(),
    })),
    steps: z.array(z.object({
      text: z.string(),
      time: z.string(),
      cookTitle: z.string(),
      cookText: z.string(),
      cookTime: z.string(),
    })),
    tips: z.array(z.object({
      icon: z.string(),
      title: z.string(),
      text: z.string(),
    })),
  }),
});

const blog = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string().optional(),
    category: z.string(),
    badge: z.string().optional(),
    cover: image().optional(),
    imgClass: z.string().optional(),
    readTime: z.string(),
    pubDate: z.coerce.date(),
    featured: z.boolean().default(false),
  }),
});

export const collections = { rezepte, blog };
