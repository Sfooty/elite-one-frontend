"use client";

import React, { useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';

type ProfileFormData = {
  name: string;
  email: string;
};

const ProfileSettings = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ProfileFormData>();

  useEffect(() => {
    // Fetch user data from API and set form values
    async function fetchUserData() {
      const response = await fetch('/api/user');
      const data = await response.json();
      setValue('name', data.name);
      setValue('email', data.email);
    }
    fetchUserData();
  }, [setValue]);

  const onSubmit = async (data: ProfileFormData) => {
    // Update user data via API
    await fetch('/api/user', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    // Handle success/error responses as needed
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
      <div>
        <label htmlFor="name" className="block text-sm font-medium">
          Name
        </label>
        <Input
          {...register('name', { required: 'Name is required' })}
          id="name"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium">
          Email
        </label>
        <Input
          {...register('email', {
            required: 'Email is required',
            pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' },
          })}
          id="email"
          type="email"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>
      <Button type="submit">Save Changes</Button>
    </form>
  );
};

export default ProfileSettings;
