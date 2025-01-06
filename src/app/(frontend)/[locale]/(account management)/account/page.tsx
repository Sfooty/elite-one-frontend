import { headers as getHeaders } from 'next/headers.js'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'
import React, { Fragment } from 'react'

import config from '@payload-config'
import { Button } from '@/components/Button'
import { Gutter } from '@/components/Gutter'
import { HydrateClientUser } from '@/components/HydrateClientUser'
import { RenderParams } from '@/components/RenderParams'
import { AccountForm } from './AccountForm'
import classes from './index.module.scss'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import ProfileSettings from '@/components/accounts/ProfileSettings'
import PasswordSettings from '@/components/accounts/PasswordSettings'
import PreferencesSettings from '@/components/accounts/PreferencesSettings'
import AccountDeletion from '@/components/accounts/AccountDeletion'

export default async function Account() {
  const headers = await getHeaders()
  const payload = await getPayload({ config })
  const { permissions, user } = await payload.auth({ headers })

  if (!user) {
    redirect(
      `/login?error=${encodeURIComponent('You must be logged in to access your account.')}&redirect=/account`,
    )
  }

  // @ts-ignore
  return (
    <Fragment>
      <HydrateClientUser permissions={permissions} user={user} />
      <Gutter className={classes.account}>
        <RenderParams className={classes.params} />
        <h1>Account</h1>
        <div>
          {`This is your account dashboard. Here you can update your account information and more. To manage all users, `}
          <Link href={`${process.env.NEXT_PUBLIC_SERVER_URL}/admin/collections/users`}>
            login to the admin dashboard
          </Link>
          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="flex space-x-4">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
              <TabsTrigger value="accounts">Linked Accounts</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
              <TabsTrigger value="payments">Payment Methods</TabsTrigger>
              <TabsTrigger value="delete">Delete Account</TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <ProfileSettings />
            </TabsContent>
            <TabsContent value="password">
              <PasswordSettings />
            </TabsContent>
            <TabsContent value="accounts">
              <p> Linked accounts coming soon</p>
            </TabsContent>
            <TabsContent value="preferences">
              <PreferencesSettings />
            </TabsContent>
            <TabsContent value="payments">
              <p> Payment methods coming soon</p>
            </TabsContent>
            <TabsContent value="delete">
              <AccountDeletion />
            </TabsContent>
          </Tabs>
        </div>
        <AccountForm />
        <Button appearance="secondary" href="/logout" label="Log out" />
      </Gutter>
    </Fragment>
  )
}
