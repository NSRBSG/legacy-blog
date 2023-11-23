import CustomLink from '@/components/link';
import ThemeSwitch from '@/components/themeSwitch';

export default function Header() {
  return (
    <header className='flex h-16 w-full justify-center sticky top-0'>
      <nav className='flex justify-between items-center w-full'>
        <div className='flex items-center  gap-x-6'>
          <CustomLink
            href='/'
            className='text-2xl font-bold text-neutral-400 dark:text-neutral-200'
          >
            NSRBSG
          </CustomLink>
          <CustomLink href='/posts' className='font-semibold'>
            Posts
          </CustomLink>
        </div>
        <div>
          <ThemeSwitch />
        </div>
      </nav>
    </header>
  );
}
