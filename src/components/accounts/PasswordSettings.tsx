"use client";

import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';

type PasswordFormData = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

const PasswordSettings = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<PasswordFormData>();
  const newPassword = watch('newPassword');

  const onSubmit = async (data: PasswordFormData) => {
    // Update password via API
    await fetch('/api/user/password', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      }),
    });
    // Handle success/error responses as needed
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
      <div>
        <label htmlFor="currentPassword" className="block text-sm font-medium">
          Current Password
        </label>
        <Input
          {...register('currentPassword', { required: 'Current password is required' })}
          id="currentPassword"
          type="password"
        />
        {errors.currentPassword && (
          <p className="text-red-500 text-sm mt-1">
            {errors.currentPassword.message}
          </p>
        )}
      </div>
      <div>
        <label htmlFor="newPassword" className="block text-sm font-medium">
          New Password
        </label>
        <Input
          {...register('newPassword', { required: 'New password is required' })}
          id="newPassword"
          type="password"
        />
        {errors.newPassword && (
          <p className="text-red-500 text-sm mt-1">{errors.newPassword.message}</p>
        )}
      </div>
      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium">
          Confirm New Password
        </label>
        <Input
          {...register('confirmPassword', {
            required: 'Please confirm your new password',
            validate: (value) =>
              value === newPassword || 'Passwords do not match',
          })}
          id="confirmPassword"
          type="password"
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm mt-1">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>
      <Button type="submit">Update Password</Button>
    </form>
  );
};

export default PasswordSettings;
