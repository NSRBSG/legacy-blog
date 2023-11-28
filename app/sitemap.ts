import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  interface Post {
    id: string;
    url: string;
  }

  const response = await fetch('https://www.nsrbsg.dev/api/posts');
  const { result } = await response.json();
  const { rows } = result;

  return [
    {
      url: `https://www.nsrbsg.dev`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `https://www.nsrbsg.dev/posts`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...rows!.map((row: Post) => {
      return {
        url: `https://www.nsrbsg.dev/posts/${row.url}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'yearly',
        priority: 0.8,
      };
    }),
  ];
}
