'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function CustomLink({
  href,
  className,
  children,
}: {
  href: string;
  className: string;
  children: React.ReactNode;
}) {
  const pathName = usePathname();

  const includePathName = () => {
    if (href === '/') {
      return '';
    }

    if (pathName.includes(href)) {
      return 'text-blue-700';
    }

    return 'text-gray-400 hover:text-black dark:hover:text-white';
  };

  return (
    <Link href={href} className={className}>
      <span className={includePathName()}>{children}</span>
    </Link>
  );
}
