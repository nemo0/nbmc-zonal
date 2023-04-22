import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import Button from '@/components/buttons/Button';
import { IIndividualCamper } from '@/components/Partials/IndividualForm';

interface IOrganizationEntry {
  organizationName: string;
  organizationAddress: string;
  organizationContact: number;
  organizationEmail: string;
  organizationContactPerson: string;
  campers: IIndividualCamper[];
}

const camper = {
  name: '',
  email: '',
  physicallyFit: 'Yes',
  religion: 'Buddhism',
  foodPreference: 'Vegetarian',
  campExperience: 'No',
  natureOfCamper: 'Ordinary',
  amount: 'Rs. 150',
  guardian: '',
  address: '',
  age: 0,
  contact: 0,
  occupation: 'Advocate',
};

export default function OrganizationForm() {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<IOrganizationEntry>({
    defaultValues: {
      campers: [
        {
          ...camper,
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'campers',
  });

  const onSubmit: SubmitHandler<IOrganizationEntry> = async (data) => {
    try {
      setLoading(true);
      await axios.post('/api/organization/create', data);
      // console.log(res);
      toast.success('Successfully submitted', {
        position: 'bottom-center',
      });
      reset();
      router.push('/success');
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <h5 className='text-center'>Organization Details</h5>
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
            {...register('organizationName', { required: true })}
          />
          {errors.organizationName && (
            <span className='error'>This field is required</span>
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
            {...register('organizationAddress', { required: true })}
          />
          {errors.organizationAddress && (
            <span className='error'>This field is required</span>
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
            {...register('organizationEmail', { required: true })}
          />
          {errors.organizationEmail && (
            <span className='error'>This field is required</span>
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
            {...register('organizationContact', { required: true })}
          />
          {errors.organizationContact && (
            <span className='error'>This field is required</span>
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
            {...register('organizationContactPerson', { required: true })}
          />
          {errors.organizationContactPerson && (
            <span className='error'>This field is required</span>
          )}
        </div>
      </div>
      <h5 className='my-4 text-center'>Camper Details</h5>
      {fields.map((item, index) => (
        <div className='' key={index}>
          <div className='mb-2 mt-3 text-center text-lg font-bold'>
            Camper {index + 1}
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
              key={item.id}
              {...register(`campers.${index}.name`, { required: true })}
            />

            {errors?.campers && errors?.campers[index]?.name && (
              <span className='error'>This field is required</span>
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
              defaultValue={item.guardian}
              key={item.id}
              {...register(`campers.${index}.guardian`, { required: true })}
            />
            {errors?.campers && errors?.campers[index]?.guardian && (
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
              defaultValue={item.address}
              key={item.id}
              {...register(`campers.${index}.address`, { required: true })}
            />
            {errors?.campers && errors?.campers[index]?.address && (
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
              defaultValue={item.age}
              key={item.id}
              {...register(`campers.${index}.age`, { required: true })}
            />
            {errors?.campers && errors?.campers[index]?.age && (
              <span className='error'>This field is required</span>
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
              className='w-full border-gray-400 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
              id='occupation'
              defaultValue={item.occupation}
              key={item.id}
              {...register(`campers.${index}.occupation`, { required: true })}
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
            {errors?.campers && errors?.campers[index]?.occupation && (
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
              defaultValue={item.contact}
              key={item.id}
              {...register(`campers.${index}.contact`, { required: true })}
            />
            {errors?.campers && errors?.campers[index]?.contact && (
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
              defaultValue={item.email}
              key={item.id}
              {...register(`campers.${index}.email`, { required: true })}
            />
            {errors?.campers && errors?.campers[index]?.email && (
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
              defaultValue={item.physicallyFit}
              key={item.id}
              {...register(`campers.${index}.physicallyFit`, {
                required: true,
              })}
            >
              <option>Yes</option>
              <option>No</option>
            </select>
            {errors?.campers && errors?.campers[index]?.physicallyFit && (
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
              defaultValue={item.religion}
              key={item.id}
              {...register(`campers.${index}.religion`, { required: true })}
            >
              <option>Buddhism</option>
              <option>Christianity</option>
              <option>Hinduism</option>
              <option>Islam</option>
              <option>Jainism</option>
              <option>Sikhism</option>
              <option>Other</option>
            </select>
            {errors?.campers && errors?.campers[index]?.religion && (
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
              defaultValue={item.foodPreference}
              key={item.id}
              {...register(`campers.${index}.foodPreference`, {
                required: true,
              })}
            >
              <option>Vegetarian</option>
              <option>Non-Vegetarian</option>
            </select>
            {errors?.campers && errors?.campers[index]?.foodPreference && (
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
              defaultValue={item.campExperience}
              key={item.id}
              {...register(`campers.${index}.campExperience`, {
                required: true,
              })}
            >
              <option>Yes</option>
              <option>No</option>
            </select>
            {errors?.campers && errors?.campers[index]?.campExperience && (
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
              defaultValue={item.natureOfCamper}
              key={item.id}
              {...register(`campers.${index}.natureOfCamper`, {
                required: true,
              })}
            >
              <option>Leader</option>
              <option>Ordinary</option>
            </select>
            {errors?.campers && errors?.campers[index]?.natureOfCamper && (
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
              defaultValue={item.amount}
              key={item.id}
              {...register(`campers.${index}.amount`, { required: true })}
            >
              <option>Rs. 150</option>
              <option>Rs. 300</option>
              <option>Rs. 500</option>
            </select>
            {errors?.campers && errors?.campers[index]?.amount && (
              <span className='error'>This field is required</span>
            )}
          </div>
          <div className='flex justify-end'>
            <Button
              type='button'
              variant='dark'
              className='rounded-none border-0 bg-red-700'
              onClick={() => {
                remove(index);
              }}
            >
              Remove Camper
            </Button>
          </div>
        </div>
      ))}
      <div className='flex gap-x-4'>
        <Button
          type='button'
          variant='dark'
          className='rounded-none border-0'
          onClick={() => {
            append(camper);
          }}
        >
          Add Camper
        </Button>
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
