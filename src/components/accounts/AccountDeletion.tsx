"use client";

// components/settings/AccountDeletion.tsx
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'


const AccountDeletion = () => {
  const [open, setOpen] = useState(false);

  const handleDeleteAccount = async () => {
    // Delete account via API
    await fetch('/api/user', {
      method: 'DELETE',
    });
    // Handle sign-out and redirection
  };

  return (
    <>
      <Button variant="destructive" onClick={() => setOpen(true)}>
        Delete Account
      </Button>

      <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Account</DialogTitle>
          </DialogHeader>
            <p>
              Are you sure you want to delete your account? This action cannot be undone.
            </p>
          <DialogFooter>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDeleteAccount}>
              Confirm Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AccountDeletion;
