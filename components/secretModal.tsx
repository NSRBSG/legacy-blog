'use client';

import { FormEventHandler } from 'react';

export default function SecretModal({
  open,
  setOpen,
  onConfirm,
}: {
  open: boolean;
  setOpen: Function;
  onConfirm: FormEventHandler<HTMLFormElement>;
}) {
  if (!open) return null;

  return (
    <div
      className={
        'fixed top-0 left-0 w-full h-full flex justify-center items-center'
      }
    >
      <div
        className='absolute w-full h-full bg-neutral-900 opacity-75'
        onClick={() => setOpen(false)}
      ></div>
      <div className='bg-white dark:bg-neutral-800 rounded-lg w-96 aspect-video z-50'>
        <div className='flex justify-end pt-2 pr-4'>
          <button
            className='text-3xl hover:text-neutral-500'
            onClick={() => setOpen(false)}
          >
            &times;
          </button>
        </div>
        <div className='p-8 pt-4'>
          <form onSubmit={onConfirm}>
            <input
              type='password'
              required
              className='p-4 w-full text-sm text-neutral-900 dark:text-neutral-400 bg-transparent border border-neutral-300 focus:ring-1 focus:ring-neutral-700 dark:focus:ring-neutral-200 focus:outline-none shadow transition duration-200 ease-in-out'
            />
            <button
              type='submit'
              className='mt-4 p-4 w-full bg-neutral-700 text-white rounded hover:bg-neutral-900 transition duration-200 ease-in-out'
            >
              &#10004;
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
