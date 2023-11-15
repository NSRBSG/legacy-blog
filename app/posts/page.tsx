'use client';

import Image from 'next/image';

interface Post {
  _id: string;
  title: string;
  description: string;
  thumbnail?: string;
  date: string;
}

export default function Page() {
  const posts: Post[] = [];

  return (
    <div className='flex-1'>
      <div className='flex -m-4 flex-wrap'>
        {posts.map((post) => (
          <div
            key={post._id}
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
                  {post.date}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
