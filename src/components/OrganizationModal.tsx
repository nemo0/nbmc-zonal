import { Dialog, Transition } from '@headlessui/react';
import axios from 'axios';
import React, { Fragment } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import Button from '@/components/buttons/Button';
import Cross from '@/components/Icons/Cross';

import westBengalDistricts from '@/constant/westBengalDistricts';
import { IOrganizationCamper } from '@/pages/api/organization/edit';

interface Props {
  isOpen: boolean;
  row: any;
  onRequestClose: () => void;
}

export default function OrganizationCamperModal(props: Props) {
  const { isOpen, onRequestClose, row } = props;
  const [camper, setCamper] = React.useState<IOrganizationCamper>({} as any);
  const [loading, setLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<IOrganizationCamper>({
    defaultValues: camper,
  });

  React.useEffect(() => {
    if (row) {
      setCamper(row);
      Object.keys(row).forEach((key) => {
        setValue(key as keyof IOrganizationCamper, row[key]);
      });
    }
  }, [row, setValue]);

  const onSubmit = async (data: IOrganizationCamper) => {
    try {
      setLoading(true);
      const res = await axios.put('/api/organization/edit', data);
      console.log(res.data);
      if (res.data.success === true) {
        toast.success('Camper updated successfully', {
          position: 'bottom-center',
        });
        reset();
        onRequestClose();
      }
      setLoading(false);
    } catch (error) {
      console.log(error);

      toast.error('Something went wrong', {
        position: 'bottom-center',
      });
      setLoading(false);
    }
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as='div' className='relative z-50' onClose={onRequestClose}>
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
                <Dialog.Panel className='w-full max-w-2xl transform overflow-hidden rounded-none bg-white p-6 text-left align-middle shadow-xl transition-all'>
                  <Dialog.Title
                    as='h3'
                    className='text-lg font-medium leading-6 text-gray-900'
                  >
                    <div className='flex items-center justify-between'>
                      <span>Edit Camper</span>
                      <Cross
                        onClick={onRequestClose}
                        className='cursor-pointer'
                      />
                    </div>
                  </Dialog.Title>
                  <div className='mt-2'>
                    <form
                      onSubmit={handleSubmit((data) =>
                        onSubmit({ ...data, id: camper.id })
                      )}
                    >
                      <div className=''>
                        <div className='form-group'>
                          <label
                            htmlFor='name'
                            className='block text-sm font-semibold text-gray-700'
                          >
                            Unit/Organization Name
                          </label>
                          <input
                            type='text'
                            className='w-full border-gray-400 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                            id='name'
                            {...register('organizationName', {
                              required: true,
                            })}
                          />
                          {errors.organizationName && (
                            <span className='error'>
                              This field is required
                            </span>
                          )}
                        </div>
                        <div className='form-group'>
                          <label
                            htmlFor='name'
                            className='block text-sm font-semibold text-gray-700'
                          >
                            Unit/Organization Address
                          </label>
                          <input
                            type='text'
                            className='w-full border-gray-400 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                            id='name'
                            {...register('organizationAddress')}
                          />
                          {errors.organizationAddress && (
                            <span className='error'>
                              {errors.organizationAddress.message}
                            </span>
                          )}
                        </div>
                        <div className='form-group'>
                          <label
                            htmlFor='name'
                            className='block text-sm font-semibold text-gray-700'
                          >
                            Unit/Organization Email Address
                          </label>
                          <input
                            type='text'
                            className='w-full border-gray-400 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                            id='name'
                            {...register('organizationEmail')}
                          />
                          {errors.organizationEmail && (
                            <span className='error'>
                              {errors.organizationEmail.message}
                            </span>
                          )}
                        </div>
                        <div className='form-group'>
                          <label
                            htmlFor='name'
                            className='block text-sm font-semibold text-gray-700'
                          >
                            Unit/Organization Contact Number
                          </label>
                          <input
                            type='text'
                            className='w-full border-gray-400 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                            id='name'
                            {...register('organizationContact')}
                          />
                          {errors.organizationContact && (
                            <span className='error'>
                              {errors.organizationContact.message}
                            </span>
                          )}
                        </div>
                        <div className='form-group'>
                          <label
                            htmlFor='name'
                            className='block text-sm font-semibold text-gray-700'
                          >
                            Unit/Organization Contact Person Name
                          </label>
                          <input
                            type='text'
                            className='w-full border-gray-400 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                            id='name'
                            {...register('organizationContactPerson')}
                          />
                          {errors.organizationContactPerson && (
                            <span className='error'>
                              {errors.organizationContactPerson.message}
                            </span>
                          )}
                        </div>
                        <div className='form-group'>
                          <label
                            htmlFor='name'
                            className='block text-sm font-semibold text-gray-700'
                          >
                            Name
                          </label>
                          <input
                            type='text'
                            className='w-full border-gray-400 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                            id='name'
                            {...register('name', { required: true })}
                          />
                          {errors.name && (
                            <span className='error'>
                              This field is required
                            </span>
                          )}
                        </div>
                        <div className='form-group'>
                          <label
                            htmlFor='guardian'
                            className='block text-sm font-semibold text-gray-700'
                          >
                            Guardian
                          </label>
                          <input
                            type='text'
                            className='w-full border-gray-400 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                            id='guardian'
                            {...register('guardian')}
                          />
                          {errors.guardian && (
                            <span className='error'>
                              This field is required
                            </span>
                          )}
                        </div>
                        <div className='form-group'>
                          <label
                            htmlFor='address'
                            className='block text-sm font-semibold text-gray-700'
                          >
                            Address
                          </label>
                          <textarea
                            rows={3}
                            className='w-full border-gray-400 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                            id='address'
                            {...register('address', { required: true })}
                          />
                          {errors.address && (
                            <span className='error'>
                              This field is required
                            </span>
                          )}
                        </div>

                        <div className='form-group'>
                          <label
                            htmlFor='district'
                            className='block text-sm font-semibold text-gray-700'
                          >
                            District
                            <span className='text-xs text-red-600'>*</span>
                          </label>

                          <select
                            className='w-full border-gray-400 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                            id='district'
                            {...register('district', {
                              required: true,
                            })}
                          >
                            <option disabled selected></option>
                            {westBengalDistricts.map((district, index) => (
                              <option key={index} value={district}>
                                {district}
                              </option>
                            ))}
                          </select>

                          {errors.district && (
                            <span className='error'>
                              This field is required
                            </span>
                          )}
                        </div>

                        <div className='form-group'>
                          <label
                            htmlFor='pin'
                            className='block text-sm font-semibold text-gray-700'
                          >
                            Pin Code
                            <span className='text-xs text-red-600'>*</span>
                          </label>
                          <input
                            type='number'
                            className='w-full border-gray-400 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                            id='pin'
                            {...register('pin', {
                              required: true,
                            })}
                          />
                          {errors.pin && (
                            <span className='error'>
                              This field is required
                            </span>
                          )}
                        </div>

                        <div className='form-group'>
                          <label
                            htmlFor='age'
                            className='block text-sm font-semibold text-gray-700'
                          >
                            Age
                          </label>
                          <input
                            type='number'
                            className='w-full border-gray-400 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                            id='age'
                            {...register('age', { required: true })}
                          />
                          {errors.age && (
                            <span className='error'>
                              This field is required
                            </span>
                          )}
                        </div>
                        <div className='form-group'>
                          <label
                            htmlFor='occupation'
                            className='block text-sm font-semibold text-gray-700'
                          >
                            Occupation
                          </label>
                          <select
                            required
                            className='w-full border-gray-400 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                            id='occupation'
                            {...register('occupation', { required: true })}
                            placeholder='Select your occupation'
                          >
                            <option disabled selected></option>
                            <option>Advocate</option>
                            <option>Agent</option>
                            <option>Business</option>
                            <option>Doctor</option>
                            <option>Driver</option>
                            <option>Job(Private)</option>
                            <option>Retired</option>
                            <option>Self-employed</option>
                            <option>Service or Teacher</option>
                            <option>Student</option>
                            <option>Tutor</option>
                            <option>Unemployed</option>
                            <option>Others</option>
                          </select>
                          {errors.occupation && (
                            <span className='error'>
                              This field is required
                            </span>
                          )}
                        </div>
                        <div className='form-group'>
                          <label
                            htmlFor='contact'
                            className='block text-sm font-semibold text-gray-700'
                          >
                            Contact Number
                          </label>
                          <input
                            type='number'
                            className='w-full border-gray-400 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                            id='contact'
                            {...register('contact', { required: true })}
                          />
                          {errors.contact && (
                            <span className='error'>
                              This field is required
                            </span>
                          )}
                        </div>
                        <div className='form-group'>
                          <label
                            htmlFor='email'
                            className='block text-sm font-semibold text-gray-700'
                          >
                            Email
                          </label>
                          <input
                            type='email'
                            className='w-full border-gray-400 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                            id='email'
                            {...register('email')}
                          />
                          {errors.email && (
                            <span className='error'>
                              {errors.email.message}
                            </span>
                          )}
                        </div>
                        <div className='form-group'>
                          <label
                            htmlFor='physicallyFit'
                            className='block text-sm font-semibold text-gray-700'
                          >
                            Physically Fit
                          </label>
                          <select
                            className='w-full border-gray-400 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                            id='physicallyFit'
                            {...register('physicallyFit', { required: true })}
                          >
                            <option disabled selected></option>
                            <option>Yes</option>
                            <option>No</option>
                          </select>
                          {errors.physicallyFit && (
                            <span className='error'>
                              This field is required
                            </span>
                          )}
                        </div>
                        <div className='form-group'>
                          <label
                            htmlFor='religion'
                            className='block text-sm font-semibold text-gray-700'
                          >
                            Religion
                          </label>
                          <select
                            className='w-full border-gray-400 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                            id='religion'
                            {...register('religion', { required: true })}
                          >
                            <option disabled selected></option>
                            <option>Buddhism</option>
                            <option>Christianity</option>
                            <option>Hinduism</option>
                            <option>Islam</option>
                            <option>Jainism</option>
                            <option>Sikhism</option>
                            <option>Other</option>
                          </select>
                          {errors.religion && (
                            <span className='error'>
                              This field is required
                            </span>
                          )}
                        </div>
                        <div className='form-group'>
                          <label
                            htmlFor='foodPreference'
                            className='block text-sm font-semibold text-gray-700'
                          >
                            Food Preference
                          </label>
                          <select
                            className='w-full border-gray-400 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                            id='foodPreference'
                            {...register('foodPreference', { required: true })}
                          >
                            <option disabled selected></option>
                            <option>Vegetarian</option>
                            <option>Non-Vegetarian</option>
                          </select>
                          {errors.foodPreference && (
                            <span className='error'>
                              This field is required
                            </span>
                          )}
                        </div>
                        <div className='form-group'>
                          <label
                            htmlFor='campExperience'
                            className='block text-sm font-semibold text-gray-700'
                          >
                            Camp Experience
                          </label>
                          <select
                            className='w-full border-gray-400 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                            id='campExperience'
                            {...register('campExperience', { required: true })}
                          >
                            <option disabled selected></option>
                            <option>Yes</option>
                            <option>No</option>
                          </select>
                          {errors.campExperience && (
                            <span className='error'>
                              This field is required
                            </span>
                          )}
                        </div>
                        <div className='form-group'>
                          <label
                            htmlFor='natureOfCamper'
                            className='block text-sm font-semibold text-gray-700'
                          >
                            Nature of Camper
                          </label>
                          <select
                            className='w-full border-gray-400 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                            id='natureOfCamper'
                            {...register('natureOfCamper', { required: true })}
                          >
                            <option disabled selected></option>
                            <option>Leader</option>
                            <option>Ordinary</option>
                          </select>
                          {errors.natureOfCamper && (
                            <span className='error'>
                              This field is required
                            </span>
                          )}
                        </div>
                        <div className='form-group'>
                          <label
                            htmlFor='amount'
                            className='block text-sm font-semibold text-gray-700'
                          >
                            Amount
                          </label>
                          <select
                            className='w-full border-gray-400 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                            id='amount'
                            {...register('amount', { required: true })}
                          >
                            <option disabled selected></option>
                            <option>Rs. 150</option>
                            <option>Rs. 300</option>
                            <option>Rs. 600</option>
                          </select>
                          {errors.amount && (
                            <span className='error'>
                              This field is required
                            </span>
                          )}
                        </div>
                      </div>
                      <div className='mt-4'>
                        <Button
                          type='submit'
                          variant='dark'
                          isLoading={loading}
                          className='rounded-none'
                        >
                          Update Camper
                        </Button>
                      </div>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
