'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Post {
  id: string;
  url: string;
  thumbnail?: string;
  title: string;
  description: string;
  date: string;
}

export default function Page() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPosts() {
      try {
        const response = await fetch(`/api/posts/${page}`);
        const {
          result: { rows },
        } = await response.json();
        setPosts((prev) => [...prev, ...rows]);
      } catch (error: any) {
        console.error(error.message);
      }
      setLoading(false);
    }
    loadPosts();
  }, [page]);

  useEffect(() => {
    function handleScroll(event: Event) {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        setLoading(true);
        setPage((prev) => prev + 1);
      }
    }
    if (loading) {
      return window.removeEventListener('scroll', handleScroll);
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [loading]);

  const getLocalDate = (date: string) => {
    const localDate = new Date(date);
    return `${localDate.getFullYear()}-${
      localDate.getMonth() + 1
    }-${localDate.getDate()}`;
  };

  if (!posts.length)
    return (
      <div className='w-full h-full flex flex-1 justify-center items-center'>
        <div className='animate-spin relative flex h-10 w-10 rounded-sm bg-black dark:bg-white opacity-75'></div>
      </div>
    );

  return (
    <div className='flex-1'>
      <div className='flex -m-4 flex-wrap'>
        {posts.map((post) => (
          <Link
            href={`/posts/${post.url}`}
            key={post.id}
            className='h-fit m-4 mb-0 md:mb-4 flex flex-col w-[calc(100%-2rem)] md:w-[calc(50%-2rem)] lg:w-[20rem] cursor-pointer bg-white dark:bg-neutral-800 rounded overflow-hidden shadow-lg hover:-translate-y-2 hover:shadow-2xl transition'
          >
            <div className='w-full'>
              {post.thumbnail && (
                <Image
                  className='object-cover aspect-[320/167] w-full'
                  width={320}
                  height={167}
                  alt='thumbnail'
                  src={post.thumbnail}
                />
              )}
              <div className='p-4'>
                <h4 className='text-ellipsis break-words whitespace-nowrap overflow-hidden mb-1 text-neutral-900 dark:text-neutral-100'>
                  {post.title}
                </h4>
                <p className='text-sm h-[3.9375rem] line-clamp-3 text-ellipsis break-words mb-6 text-neutral-700 dark:text-neutral-300'>
                  {post.description}
                </p>
                <p className='text-right text-xs text-neutral-600 dark:text-neutral-400'>
                  {getLocalDate(post.date)}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
