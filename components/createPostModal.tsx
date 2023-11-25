'use client';

import type { PutBlobResult } from '@vercel/blob';
import { useEffect, useState } from 'react';

import rehypeSanitize from 'rehype-sanitize';
import rehypeStringify from 'rehype-stringify';
import rehypeHighlight from 'rehype-highlight';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';
import InputPostViewModal from './inputPostViewModal';

export default function CreatePostModal({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Function;
}) {
  const [content, setContent] = useState('');
  const [remark, setRemark] = useState('');
  const [inputModalOpen, setInputModalOpen] = useState(false);

  useEffect(() => {
    function cancel(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    }

    window.addEventListener('keydown', cancel);
    return () => {
      window.removeEventListener('keydown', cancel);
    };
  });

  useEffect(() => {
    unified()
      .use(remarkParse)
      .use(remarkRehype)
      .use(rehypeSanitize)
      .use(rehypeHighlight)
      .use(rehypeStringify)
      .process(content)
      .then((file) => setRemark(String(file)));
  }, [content]);

  const handleImageUpload = async (event: any) => {
    const {
      target: { files },
    } = event;

    const image = files[0];

    try {
      const response = await fetch(
        `/api/image/upload?image_name=${image.name}`,
        {
          method: 'POST',
          body: image,
        }
      );

      const { url } = (await response.json()) as PutBlobResult;

      setContent(`${content}\n![${image.name}](${url})`);
    } catch (error: any) {
      alert(error.message);
    }
  };

  if (!open) return null;

  return (
    <div className='fixed top-0 left-0 w-full h-full flex bg-white'>
      <div className='flex flex-1 bg-neutral-800'>
        <div className='relative w-full flex flex-col p-4 md:p-8 xl:p-16'>
          <div className='mb-4'>
            <label
              className='rounded p-2 bg-neutral-600 text-lg font-bold text-neutral-100 cursor-pointer'
              htmlFor='file'
            >
              🏞️
            </label>
            <input
              id='file'
              className='hidden'
              accept='image/*'
              onChange={handleImageUpload}
              type='file'
            />
          </div>
          <textarea
            onChange={(e) => setContent(e.target.value)}
            value={content}
            placeholder='내용을 입력하세요'
            spellCheck={false}
            className='w-full h-full resize-none bg-transparent text-2xl text-neutral-100 focus:outline-none'
          />
        </div>
      </div>
      <div className='flex flex-col flex-1 bg-white break-all overflow-auto'>
        <div className='p-4 md:p-8 xl:p-16 w-full flex flex-1'>
          <div
            className='prose prose-lg prose-neutral flex flex-col flex-1'
            dangerouslySetInnerHTML={{ __html: remark }}
          />
        </div>
      </div>
      <div className='w-full absolute bottom-0 flex justify-center'>
        <button
          onClick={() => setInputModalOpen(true)}
          className='rounded m-2 p-2 w-[100px] text-neutral-600 font-bold text-sm bg-white hover:bg-neutral-200 shadow border'
        >
          Submit
        </button>
      </div>
      {inputModalOpen && (
        <InputPostViewModal
          open={inputModalOpen}
          setOpen={setInputModalOpen}
          content={content}
        />
      )}
    </div>
  );
}
