'use client';

import CreatePostModal from '@/components/createPostModal';
import SecretModal from '@/components/secretModal';
import { useEffect, useState } from 'react';

export default function Page() {
  const [authenticating, setAuthenticating] = useState(false);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    function authenticate(event: KeyboardEvent) {
      if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
        setAuthenticating(true);
      }
    }
    window.addEventListener('keydown', authenticate);
    return () => {
      window.removeEventListener('keydown', authenticate);
    };
  }, []);

  const onSubmitValidCheck = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const { value } = event.currentTarget[0] as HTMLInputElement;

    try {
      const response = await fetch('/api/secret', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password: value }),
      });

      if (response.status === 401) {
        alert('Invalid Password');
        return;
      }
    } catch (error: any) {
      alert(error.message);
    }

    setAuthenticating(false);
    setCreating(true);
  };

  return (
    <div className='flex flex-1 flex-col justify-center items-center gap-y-2'>
      <h1 className='text-2xl font-bold md:text-4xl'>
        Hello! Welcome to my blog
      </h1>
      <p className='text-xs md:text-2xl'>
        I will introduce my daily life and thoughts on my blog.
      </p>
      <p className='text-xs md:text-2xl text-neutral-600 dark:text-neutral-400'>
        If you want to contact me, please reach out to my email
      </p>
      <p className='text-xs md:text-2xl text-neutral-600 dark:text-neutral-400'>
        nsrbsg@gmail.com
      </p>
      {authenticating && (
        <SecretModal
          open={authenticating}
          setOpen={setAuthenticating}
          onConfirm={onSubmitValidCheck}
        />
      )}
      {creating && <CreatePostModal open={creating} setOpen={setCreating} />}
    </div>
  );
}
