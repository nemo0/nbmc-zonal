import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import Button from '@/components/buttons/Button';
export interface IIndividualCamper {
  name: string;
  guardian?: string;
  address: string;
  age: number;
  occupation: string;
  contact: number;
  email: string;
  physicallyFit: string;
  religion: string;
  foodPreference: string;
  campExperience: string;
  natureOfCamper: string;
  amount: string;
}

export default function IndividualForm() {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IIndividualCamper>();
  const onSubmit: SubmitHandler<IIndividualCamper> = async (data) => {
    try {
      setLoading(true);
      const { data: response } = await axios.post(
        '/api/individual/create',
        data
      );

      console.log(response);

      toast.success('Registration Successful', {
        position: 'bottom-center',
      });
      setLoading(false);
      reset();

      router.push('/success');
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error('Something went wrong', {
        position: 'bottom-center',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className=''>
        <div className='form-group'>
          <label
            htmlFor='name'
            className='block text-sm font-semibold text-gray-700'
          >
            Name <span className='text-xs text-red-600'>*</span>
          </label>
          <input
            type='text'
            className='w-full border-gray-400 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
            id='name'
            {...register('name', { required: true })}
          />
          {errors.name && <span className='error'>This field is required</span>}
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
            <span className='error'>This field is required</span>
          )}
        </div>
        <div className='form-group'>
          <label
            htmlFor='address'
            className='block text-sm font-semibold text-gray-700'
          >
            Address <span className='text-xs text-red-600'>*</span>
          </label>
          <textarea
            rows={3}
            className='w-full border-gray-400 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
            id='address'
            {...register('address', { required: true })}
          />
          {errors.address && (
            <span className='error'>This field is required</span>
          )}
        </div>
        <div className='form-group'>
          <label
            htmlFor='age'
            className='block text-sm font-semibold text-gray-700'
          >
            Age <span className='text-xs text-red-600'>*</span>
          </label>
          <input
            type='number'
            className='w-full border-gray-400 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
            id='age'
            {...register('age', { required: true })}
          />
          {errors.age && <span className='error'>This field is required</span>}
        </div>
        <div className='form-group'>
          <label
            htmlFor='occupation'
            className='block text-sm font-semibold text-gray-700'
          >
            Occupation <span className='text-xs text-red-600'>*</span>
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
            <span className='error'>This field is required</span>
          )}
        </div>
        <div className='form-group'>
          <label
            htmlFor='contact'
            className='block text-sm font-semibold text-gray-700'
          >
            Contact Number <span className='text-xs text-red-600'>*</span>
          </label>
          <input
            type='number'
            className='w-full border-gray-400 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
            id='contact'
            {...register('contact', { required: true })}
          />
          {errors.contact && (
            <span className='error'>This field is required</span>
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
            <span className='error'>This field is required</span>
          )}
        </div>
        <div className='form-group'>
          <label
            htmlFor='physicallyFit'
            className='block text-sm font-semibold text-gray-700'
          >
            Physically Fit <span className='text-xs text-red-600'>*</span>
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
            <span className='error'>This field is required</span>
          )}
        </div>
        <div className='form-group'>
          <label
            htmlFor='religion'
            className='block text-sm font-semibold text-gray-700'
          >
            Religion <span className='text-xs text-red-600'>*</span>
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
            <span className='error'>This field is required</span>
          )}
        </div>
        <div className='form-group'>
          <label
            htmlFor='foodPreference'
            className='block text-sm font-semibold text-gray-700'
          >
            Food Preference <span className='text-xs text-red-600'>*</span>
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
            <span className='error'>This field is required</span>
          )}
        </div>
        <div className='form-group'>
          <label
            htmlFor='campExperience'
            className='block text-sm font-semibold text-gray-700'
          >
            Camp Experience <span className='text-xs text-red-600'>*</span>
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
            <span className='error'>This field is required</span>
          )}
        </div>
        <div className='form-group'>
          <label
            htmlFor='natureOfCamper'
            className='block text-sm font-semibold text-gray-700'
          >
            Nature of Camper <span className='text-xs text-red-600'>*</span>
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
            <span className='error'>This field is required</span>
          )}
        </div>
        <div className='form-group'>
          <label
            htmlFor='amount'
            className='block text-sm font-semibold text-gray-700'
          >
            Amount <span className='text-xs text-red-600'>*</span>
          </label>
          <select
            className='w-full border-gray-400 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
            id='amount'
            {...register('amount', { required: true })}
          >
            <option disabled selected></option>
            <option>Rs. 150</option>
            <option>Rs. 300</option>
            <option>Rs. 500</option>
          </select>
          {errors.amount && (
            <span className='error'>This field is required</span>
          )}
        </div>
        <Button
          type='submit'
          variant='primary'
          className='rounded-none border-0'
          isLoading={loading}
        >
          Submit
        </Button>
      </div>
    </form>
  );
}
