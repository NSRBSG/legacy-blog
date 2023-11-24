import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/posts`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/posts/나만의-블로그-탄생기`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/posts/우아한테크코스-6기-프리코스-1주차-숫자-야구-게임`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/posts/라이브러리-깜빡임-없이-다크테마-구현-nextjs-with-tailwind`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/posts/우아한테크코스-6기-프리코스-2주차-자동차-경주-게임`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/posts/Nginx를-사용하여-하나의-도메인으로-두-개의-프로젝트-연동하기`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/posts/폴더와-파일-시스템-구축-중첩-플랫`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/posts/우아한테크코스-6기-프리코스-3주차-로또`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/posts/인터랙티브-웹-제작-후기-스크롤-반응-웹`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/posts/우아한테크코스-6기-프리코스-4주차-크리스마스-프로모션`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'yearly',
      priority: 0.8,
    },
  ];
}
