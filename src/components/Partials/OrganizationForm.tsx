import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import capitalizeFirstCharacters from '@/lib/capitalizeFirstCharacter';

import Button from '@/components/buttons/Button';
import { IIndividualCamper } from '@/components/Partials/IndividualForm';

import westBengalDistricts from '@/constant/westBengalDistricts';

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
  physicallyFit: '',
  religion: '',
  foodPreference: '',
  campExperience: '',
  natureOfCamper: '',
  amount: '',
  guardian: '',
  address: '',
  district: '',
  pin: '',
  age: '',
  contact: '',
  occupation: '',
  course: '',
};

export default function OrganizationForm() {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
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
      toast.error('Something went wrong', {
        position: 'bottom-center',
      });
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
            Unit/Organization Name{' '}
            <span className='text-xs text-red-600'>*</span>
          </label>
          <input
            type='text'
            className='w-full border-gray-400 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
            id='name'
            {...register('organizationName', { required: true })}
            onChange={(e) => {
              e.target.value = capitalizeFirstCharacters(e.target.value);
            }}
          />
          {errors.organizationName && (
            <span className='error'>
              {errors.organizationName.message || 'This field is required'}
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
          <textarea
            rows={3}
            className='w-full border-gray-400 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
            id='name'
            {...register('organizationAddress')}
          />
          {errors.organizationAddress && (
            <span className='error'>
              {errors.organizationAddress.message || 'This field is required'}
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
              {errors.organizationEmail.message || 'This field is required'}
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
            type='number'
            className='w-full border-gray-400 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
            id='organizationContact'
            {...register('organizationContact')}
          />
          {errors.organizationContact && (
            <span className='error'>
              {errors.organizationContact.message || 'This field is required'}
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
              {errors.organizationContactPerson.message ||
                'This field is required'}
            </span>
          )}
        </div>
      </div>
      <h5 className='my-4 text-center'>Camper Details</h5>
      {fields.map((item, index) => {
        const occupation = watch(`campers.${index}.occupation`);

        return (
          <div className='' key={index}>
            <div className='mb-2 mt-3 text-center text-lg font-bold'>
              Camper {index + 1}
            </div>
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
                key={item.id}
                {...register(`campers.${index}.name`, { required: true })}
                onChange={(e) => {
                  e.target.value = capitalizeFirstCharacters(e.target.value);
                }}
              />

              {errors?.campers && errors?.campers[index]?.name && (
                <span className='error'>
                  {errors?.campers[index]?.name?.message ||
                    'This field is required'}
                </span>
              )}
            </div>
            <div className='form-group'>
              <label
                htmlFor='guardian'
                className='block text-sm font-semibold text-gray-700'
              >
                Father/Mother's Name
              </label>
              <input
                type='text'
                className='w-full border-gray-400 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                id='guardian'
                defaultValue={item.guardian}
                key={item.id}
                {...register(`campers.${index}.guardian`)}
                onChange={(e) => {
                  e.target.value = capitalizeFirstCharacters(e.target.value);
                }}
              />
              {errors?.campers && errors?.campers[index]?.guardian && (
                <span className='error'>
                  {errors?.campers[index]?.guardian?.message ||
                    'This field is required'}
                </span>
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
                defaultValue={item.address}
                key={item.id}
                {...register(`campers.${index}.address`, { required: true })}
              />
              {errors?.campers && errors?.campers[index]?.address && (
                <span className='error'>
                  {errors?.campers[index]?.address?.message ||
                    'This field is required'}
                </span>
              )}
            </div>

            <div className='form-group'>
              <label
                htmlFor='district'
                className='block text-sm font-semibold text-gray-700'
              >
                District <span className='text-xs text-red-600'>*</span>
              </label>

              <select
                className='w-full border-gray-400 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                id='district'
                {...register(`campers.${index}.district`, { required: true })}
              >
                <option disabled selected></option>
                {westBengalDistricts.map((district, index) => (
                  <option key={index} value={district}>
                    {district}
                  </option>
                ))}
              </select>

              {errors?.campers && errors?.campers[index]?.district && (
                <span className='error'>
                  {errors?.campers[index]?.district?.message ||
                    'This field is required'}
                </span>
              )}
            </div>

            <div className='form-group'>
              <label
                htmlFor='pin'
                className='block text-sm font-semibold text-gray-700'
              >
                Pin Code <span className='text-xs text-red-600'>*</span>
              </label>
              <input
                type='number'
                className='w-full border-gray-400 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                id='pin'
                {...register(`campers.${index}.pin`, {
                  required: true,
                })}
              />
              {errors?.campers && errors?.campers[index]?.pin && (
                <span className='error'>
                  {errors?.campers[index]?.pin?.message ||
                    'This field is required'}
                </span>
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
                defaultValue={item.age}
                key={item.id}
                {...register(`campers.${index}.age`, {
                  required: true,
                  pattern: {
                    value: /^[0-9]*$/,
                    message: 'Please enter a valid age',
                  },
                })}
              />
              {errors?.campers && errors?.campers[index]?.age && (
                <span className='error'>
                  {errors?.campers[index]?.age?.message ||
                    'This field is required'}
                </span>
              )}
            </div>

            <div className='form-group'>
              <label
                htmlFor='occupation'
                className='block text-sm font-semibold text-gray-700'
              >
                Occupation <span className='text-xs text-red-600'>*</span>
              </label>
              <select
                className='w-full border-gray-400 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                id='occupation'
                defaultValue={item.occupation}
                key={item.id}
                {...register(`campers.${index}.occupation`, { required: true })}
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
                <option>Farmer</option>
                <option>Student</option>
                <option>Tutor</option>
                <option>Unemployed</option>
                <option>Others</option>
              </select>
              {errors?.campers && errors?.campers[index]?.occupation && (
                <span className='error'>
                  {errors?.campers[index]?.occupation?.message ||
                    'This field is required'}
                </span>
              )}
            </div>

            {occupation === 'Student' && (
              <div className='form-group'>
                <label
                  htmlFor='course'
                  className='block text-sm font-semibold text-gray-700'
                >
                  Class/Course with Year{' '}
                  <span className='text-xs text-red-600'>*</span>
                </label>
                <input
                  type='text'
                  className='w-full border-gray-400 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                  id='course'
                  {...register(`campers.${index}.course`, {
                    required: occupation === 'Student',
                  })}
                />
                {errors?.campers && errors?.campers[index]?.course && (
                  <span className='error'>
                    {errors?.campers[index]?.course?.message ||
                      'This field is required'}
                  </span>
                )}
              </div>
            )}

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
                defaultValue={item.contact}
                key={item.id}
                {...register(`campers.${index}.contact`, {
                  required: true,
                  pattern: {
                    value: /^[0-9]*$/,
                    message: 'Please enter a valid contact number',
                  },
                  minLength: {
                    value: 10,
                    message: 'Must be 10 digits',
                  },
                  maxLength: {
                    value: 10,
                    message: 'Must be 10 digits',
                  },
                })}
              />
              {errors?.campers && errors?.campers[index]?.contact && (
                <span className='error'>
                  {errors?.campers[index]?.contact?.message ||
                    'This field is required'}
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
                defaultValue={item.email}
                key={item.id}
                {...register(`campers.${index}.email`, {
                  pattern: {
                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: 'Please enter a valid email',
                  },
                })}
              />
              {errors?.campers && errors?.campers[index]?.email && (
                <span className='error'>
                  {errors?.campers[index]?.email?.message ||
                    'This field is required'}
                </span>
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
                defaultValue={item.physicallyFit}
                key={item.id}
                {...register(`campers.${index}.physicallyFit`, {
                  required: true,
                })}
              >
                <option disabled selected></option>
                <option>Yes</option>
                <option>No</option>
              </select>
              {errors?.campers && errors?.campers[index]?.physicallyFit && (
                <span className='error'>
                  {errors?.campers[index]?.physicallyFit?.message ||
                    'This field is required'}
                </span>
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
                defaultValue={item.religion}
                key={item.id}
                {...register(`campers.${index}.religion`, { required: true })}
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
              {errors?.campers && errors?.campers[index]?.religion && (
                <span className='error'>
                  {errors?.campers[index]?.religion?.message ||
                    'This field is required'}
                </span>
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
                defaultValue={item.foodPreference}
                key={item.id}
                {...register(`campers.${index}.foodPreference`, {
                  required: true,
                })}
              >
                <option disabled selected></option>
                <option>Vegetarian</option>
                <option>Non-Vegetarian</option>
              </select>
              {errors?.campers && errors?.campers[index]?.foodPreference && (
                <span className='error'>
                  {errors?.campers[index]?.foodPreference?.message ||
                    'This field is required'}
                </span>
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
                defaultValue={item.campExperience}
                key={item.id}
                {...register(`campers.${index}.campExperience`, {
                  required: true,
                })}
              >
                <option disabled selected></option>
                <option>Yes</option>
                <option>No</option>
              </select>
              {errors?.campers && errors?.campers[index]?.campExperience && (
                <span className='error'>
                  {errors?.campers[index]?.campExperience?.message ||
                    'This field is required'}
                </span>
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
                defaultValue={item.natureOfCamper}
                key={item.id}
                {...register(`campers.${index}.natureOfCamper`, {
                  required: true,
                })}
              >
                <option disabled selected></option>
                <option>Leader</option>
                <option>Ordinary</option>
              </select>
              {errors?.campers && errors?.campers[index]?.natureOfCamper && (
                <span className='error'>
                  {errors?.campers[index]?.natureOfCamper?.message ||
                    'This field is required'}
                </span>
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
                defaultValue={item.amount}
                key={item.id}
                {...register(`campers.${index}.amount`, { required: true })}
              >
                <option disabled selected></option>
                <option>Rs. 150</option>
                <option>Rs. 300</option>
                <option>Rs. 600</option>
              </select>
              {errors?.campers && errors?.campers[index]?.amount && (
                <span className='error'>
                  {errors?.campers[index]?.amount?.message ||
                    'This field is required'}
                </span>
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
        );
      })}
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
