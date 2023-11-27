import { MetadataRoute } from 'next';

interface Post {
  id: string;
  url: string;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { result } = await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/posts`
  ).then((res) => res.json());

  const { rows } = result;

  return [
    {
      url: `${process.env.NEXT_PUBLIC_VERCEL_URL}/`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${process.env.NEXT_PUBLIC_VERCEL_URL}/posts`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...rows.map((row: Post) => {
      return {
        url: `${process.env.NEXT_PUBLIC_VERCEL_URL}/posts/${row.url}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'yearly',
        priority: 0.8,
      };
    }),
  ];
}
