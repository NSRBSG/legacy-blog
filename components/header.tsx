import CustomLink from '@/components/link';
import ThemeSwitch from '@/components/themeSwitch';

export default function Header() {
  return (
    <header className='flex justify-center sticky'>
      <nav className='flex justify-between items-center h-16 w-full'>
        <div className='flex items-center  gap-x-6'>
          <CustomLink href='/' className='text-2xl font-bold'>
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
