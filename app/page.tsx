export default function Page() {
  return (
    <div className='flex-1 flex flex-col justify-center items-center gap-y-2'>
      <h1 className='text-2xl font-bold md:text-4xl'>
        Hello! Welcome to my blog
      </h1>
      <p className='text-xs md:text-2xl'>
        I will introduce my daily life and thoughts on my blog.
      </p>
      <p className='text-xs md:text-2xl text-gray-600 dark:text-gray-400'>
        If you want to contact me, please reach out to my email
      </p>
      <p className='text-xs md:text-2xl text-gray-600 dark:text-gray-400'>
        nsrbsg@gmail.com
      </p>
    </div>
  );
}
