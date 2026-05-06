import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment } from 'react';

import Button from '@/components/buttons/Button';
import Cross from '@/components/Icons/Cross';

export interface PreviewField {
  label: string;
  value: number | string | null | undefined;
}

export interface PreviewSection {
  title: string;
  fields: PreviewField[];
}

interface Props {
  isOpen: boolean;
  isSubmitting: boolean;
  onClose: () => void;
  onConfirm: () => void;
  sections: PreviewSection[];
  title: string;
}

function formatValue(value: PreviewField['value']) {
  if (value === null || value === undefined) {
    return '—';
  }

  if (typeof value === 'string' && value.trim() === '') {
    return '—';
  }

  return value;
}

export default function RegistrationPreviewModal({
  isOpen,
  isSubmitting,
  onClose,
  onConfirm,
  sections,
  title,
}: Props) {
  const handleClose = () => {
    if (isSubmitting) {
      return;
    }

    onClose();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as='div' className='relative z-50' onClose={handleClose}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black bg-opacity-25' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4 text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <Dialog.Panel className='w-full max-w-3xl transform overflow-hidden rounded-none bg-white p-6 text-left align-middle shadow-xl transition-all'>
                <Dialog.Title
                  as='h3'
                  className='text-lg font-medium leading-6 text-gray-900'
                >
                  <div className='flex items-center justify-between'>
                    <span>{title}</span>
                    <Cross
                      onClick={handleClose}
                      className={`${
                        isSubmitting
                          ? 'cursor-not-allowed opacity-40'
                          : 'cursor-pointer'
                      }`}
                    />
                  </div>
                </Dialog.Title>

                <div className='mt-4 max-h-[70vh] overflow-y-auto pr-1'>
                  {sections.map((section) => (
                    <section key={section.title} className='mb-5'>
                      <h4 className='mb-2 text-base font-semibold text-gray-900'>
                        {section.title}
                      </h4>
                      <div className='grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2'>
                        {section.fields.map((field) => (
                          <div key={`${section.title}-${field.label}`}>
                            <p className='text-xs font-semibold uppercase tracking-wide text-gray-500'>
                              {field.label}
                            </p>
                            <p className='whitespace-pre-line break-words text-sm text-gray-900'>
                              {formatValue(field.value)}
                            </p>
                          </div>
                        ))}
                      </div>
                    </section>
                  ))}
                </div>

                <div className='mt-6 flex justify-end gap-3'>
                  <Button
                    type='button'
                    variant='light'
                    className='rounded-none border-0'
                    onClick={handleClose}
                    disabled={isSubmitting}
                  >
                    Back to Edit
                  </Button>
                  <Button
                    type='button'
                    variant='primary'
                    className='rounded-none border-0'
                    onClick={onConfirm}
                    isLoading={isSubmitting}
                  >
                    Confirm &amp; Submit
                  </Button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
