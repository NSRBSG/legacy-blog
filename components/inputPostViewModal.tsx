'use client';

import Image from 'next/image';
import type { PutBlobResult } from '@vercel/blob';
import { useState } from 'react';

export default function InputPostViewModal({
  open,
  setOpen,
  content,
}: {
  open: boolean;
  setOpen: Function;
  content: string;
}) {
  const [url, setUrl] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleThumbnailUpload = async (event: any) => {
    const {
      target: { files },
    } = event;

    const image = files[0];

    if (!image) return;

    try {
      const response = await fetch(
        `/api/image/upload?image_name=${image.name}`,
        {
          method: 'POST',
          body: image,
        }
      );

      const { url } = (await response.json()) as PutBlobResult;
      setThumbnail(url);
    } catch (error: any) {
      alert(error.message);
    }
  };

  const onSubmitCreatePost = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    try {
      const response = await fetch('/api/post/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url,
          thumbnail,
          title,
          description,
          content,
        }),
      });

      if (response.ok) {
        setOpen(false);
      }
    } catch (error: any) {
      alert(error.message);
    }
  };

  if (!open) return null;

  return (
    <div
      className={
        'fixed top-0 left-0 w-full h-full flex justify-center items-center'
      }
    >
      <div
        className='absolute w-full h-full bg-neutral-900 opacity-75'
        onClick={() => setOpen(false)}
      />
      <div className='bg-white dark:bg-neutral-800 rounded-lg w-96 aspect-video z-50'>
        <div className='flex justify-end pt-2 pr-4'>
          <button
            className='text-3xl hover:text-neutral-500'
            onClick={() => setOpen(false)}
          >
            &times;
          </button>
        </div>
        <div className='p-8 pt-4'>
          <form onSubmit={onSubmitCreatePost}>
            <input
              type='text'
              required
              placeholder='URL'
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className='p-4 w-full text-sm text-neutral-900 dark:text-neutral-400 bg-transparent border border-neutral-300 focus:ring-1 focus:ring-neutral-700 dark:focus:ring-neutral-200 focus:outline-none shadow transition duration-200 ease-in-out'
            />
            <label htmlFor='thumbnail'>
              <div className='cursor-pointer w-full aspect-video border border-neutral-300 '>
                <input
                  id='thumbnail'
                  className='hidden'
                  accept='image/*'
                  type='file'
                  onChange={handleThumbnailUpload}
                />
                {thumbnail ? (
                  <Image
                    className='object-cover w-full h-full aspect-[320/167]'
                    src={thumbnail}
                    width={320}
                    height={167}
                    alt='thumbnail'
                  />
                ) : (
                  <div className='flex justify-center items-center w-full h-full text-[100px]'>
                    🏞️
                  </div>
                )}
              </div>
            </label>
            <input
              type='text'
              required
              className='p-4 w-full text-sm text-neutral-900 dark:text-neutral-400 bg-transparent border border-neutral-300 focus:ring-1 focus:ring-neutral-700 dark:focus:ring-neutral-200 focus:outline-none shadow transition duration-200 ease-in-out'
              placeholder='Title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              required
              className='p-4 w-full text-sm text-neutral-900 dark:text-neutral-400 bg-transparent border border-neutral-300 focus:ring-1 focus:ring-neutral-700 dark:focus:ring-neutral-200 focus:outline-none shadow transition duration-200 ease-in-out'
              placeholder='Description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <button className='mt-4 p-4 w-full bg-neutral-700 text-white rounded hover:bg-neutral-900 transition duration-200 ease-in-out'>
              &#10004;
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
