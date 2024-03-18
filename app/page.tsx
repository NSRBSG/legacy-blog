'use client';

import CreatePostModal from '@/components/createPostModal';
import Home from '@/components/home';
import SecretModal from '@/components/secretModal';
import { useEffect, useState } from 'react';

export default function Page() {
  const [loading, setLoading] = useState(true);
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
    <div className='flex flex-1 flex-col -my-16 justify-center items-center'>
      {loading && (
        <div className='animate-spin relative flex h-10 w-10 rounded-sm bg-black dark:bg-white opacity-75'></div>
      )}
      <Home loading={loading} setLoading={setLoading} />
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
