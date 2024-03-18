export default function Footer() {
  return (
    <footer className='h-16 flex justify-center items-center text-sm text-gray-600 dark:text-gray-400'>
      © {new Date().getFullYear()} NSRBSG. All Rights Reserved.
    </footer>
  );
}
