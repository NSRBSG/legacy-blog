'use client';

import { useEffect, useState } from 'react';
import rehypeSanitize from 'rehype-sanitize';
import rehypeStringify from 'rehype-stringify';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';

interface Post {
  id: string;
  url: string;
  thumbnail?: string;
  title: string;
  description: string;
  date: string;
}

export default function Page({ params: { url } }: { params: { url: string } }) {
  const [post, setPost] = useState<Post | null>(null);
  const [remark, setRemark] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`/api/post/${url}`);
        const { result } = await response.json();
        const { rows } = result;
        const [row] = rows;

        const file = await unified()
          .use(remarkParse)
          .use(remarkRehype)
          .use(rehypeSanitize)
          .use(rehypeStringify)
          .process(row.content);

        setRemark(String(file));
        setPost(row);
      } catch (error: any) {
        alert(error.message);
      }
    })();
  }, [url]);

  const getLocalDate = (date: string) => {
    const localDate = new Date(date);
    return `${localDate.getFullYear()}-${
      localDate.getMonth() + 1
    }-${localDate.getDate()}`;
  };

  return (
    <div className='w-full flex flex-col flex-1 items-center '>
      <div className='w-full md:w-[768px] mt-16 mb-16'>
        <h1 className='text-4xl font-bold mb-8'>{post?.title}</h1>
        <h4 className='text-neutral-500 font-semibold mb-8 '>
          {post?.date && getLocalDate(post.date)}
        </h4>
        <div
          className='prose-lg dark:prose-invert prose-neutral flex flex-col flex-1'
          dangerouslySetInnerHTML={{ __html: remark }}
        />
      </div>
    </div>
  );
}
