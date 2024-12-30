"use client";

// components/settings/PreferencesSettings.tsx
import React, { useEffect } from 'react';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';

type PreferencesFormData = {
  language: string;
  notifications: boolean;
};

const PreferencesSettings = () => {
  const { register, handleSubmit, setValue } = useForm<PreferencesFormData>();

  useEffect(() => {
    // Fetch user preferences
    async function fetchPreferences() {
      const response = await fetch('/api/user/preferences');
      const data = await response.json();
      setValue('language', data.language);
      setValue('notifications', data.notifications);
    }
    fetchPreferences();
  }, [setValue]);

  const onSubmit = async (data: PreferencesFormData) => {
    // Update preferences via API
    await fetch('/api/user/preferences', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    // Handle success/error responses as needed
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
      <div>
        <label htmlFor="language" className="block text-sm font-medium">
          Language
        </label>
        <select
          {...register('language')}
          id="language"
          className="mt-1 block w-full"
        >
          <option value="en">English</option>
          <option value="fr">French</option>
          <option value="es">Spanish</option>
          {/* Add more languages */}
        </select>
      </div>
      <div className="flex items-center">
        <Switch {...register('notifications')} id="notifications" />
        <label htmlFor="notifications" className="ml-2">
          Enable Notifications
        </label>
      </div>
      <Button type="submit">Save Preferences</Button>
    </form>
  );
};

export default PreferencesSettings;
