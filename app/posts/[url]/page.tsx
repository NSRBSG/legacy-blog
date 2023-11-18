import { Metadata } from 'next';
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
  content: string;
  date: string;
}

export async function generateMetadata({
  params: { url },
}: {
  params: { url: string };
}): Promise<Metadata> {
  const { thumbnail, title, description } = await getPost(url);
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: thumbnail,
    },
  };
}

export async function generateStaticParams() {
  const { result } = await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/posts/0`
  ).then((res) => res.json());
  const { rows } = result;

  return rows.map((row: Post) => ({ params: { url: row.url } }));
}

async function getPost(url: string): Promise<Post> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/post/${url}`
  );
  const { result } = await response.json();
  const { rows } = result;
  const [row] = rows;

  const file = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeSanitize)
    .use(rehypeStringify)
    .process(row?.content);

  return { ...row, content: String(file) };
}

export default async function Page({
  params: { url },
}: {
  params: { url: string };
}) {
  const { title, date, content } = await getPost(url);

  const getLocalDate = (date: string) => {
    const localDate = new Date(date);
    return `${localDate.getFullYear()}-${
      localDate.getMonth() + 1
    }-${localDate.getDate()}`;
  };

  return (
    <div className='w-full flex flex-col flex-1 items-center '>
      <div className='w-full md:w-[768px] mt-16 mb-16'>
        <h1 className='text-4xl font-bold mb-8'>{title}</h1>
        <h4 className='text-neutral-500 font-semibold mb-8 '>
          {getLocalDate(date)}
        </h4>
        <div
          className='prose prose-lg prose-neutral dark:prose-invert w-full overflow-hidden'
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </div>
  );
}
