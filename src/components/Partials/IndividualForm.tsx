import axios from 'axios';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import Button from '@/components/buttons/Button';
export interface IIndividualCamper {
  name: string;
  guardian: string;
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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IIndividualCamper>();
  const onSubmit: SubmitHandler<IIndividualCamper> = async (data) => {
    try {
      const { data: response } = await axios.post('/api/individual', data);

      console.log(response);

      toast.success('Registration Successful', {
        position: 'bottom-center',
      });
    } catch (error) {
      console.log(error);
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
            Name
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
            {...register('guardian', { required: true })}
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
            Address
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
            Age
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
            Occupation
          </label>
          <select
            className='w-full border-gray-400 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
            id='occupation'
            {...register('occupation', { required: true })}
          >
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
            Contact
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
            {...register('email', { required: true })}
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
            Physically Fit
          </label>
          <select
            className='w-full border-gray-400 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
            id='physicallyFit'
            {...register('physicallyFit', { required: true })}
          >
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
            Religion
          </label>
          <select
            className='w-full border-gray-400 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
            id='religion'
            {...register('religion', { required: true })}
          >
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
            Food Preference
          </label>
          <select
            className='w-full border-gray-400 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
            id='foodPreference'
            {...register('foodPreference', { required: true })}
          >
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
            Camp Experience
          </label>
          <select
            className='w-full border-gray-400 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
            id='campExperience'
            {...register('campExperience', { required: true })}
          >
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
            Nature of Camper
          </label>
          <select
            className='w-full border-gray-400 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
            id='natureOfCamper'
            {...register('natureOfCamper', { required: true })}
          >
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
            Amount
          </label>
          <select
            className='w-full border-gray-400 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
            id='amount'
            {...register('amount', { required: true })}
          >
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
        >
          Submit
        </Button>
      </div>
    </form>
  );
}