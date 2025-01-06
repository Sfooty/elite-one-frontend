import { headers as getHeaders } from 'next/headers.js'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'
import React from 'react'

import config from '@payload-config'
import { Gutter } from '@/components/Gutter'
import { RenderParams } from '@/components/RenderParams'
import { CreateAccountForm } from './CreateAccountForm'
import classes from './index.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import { LoginForm } from '@/components/login-form'
import { LocaleSwitcher } from '@/components/LocaleSwitcher'

export default async function CreateAccount() {
  const headers = await getHeaders()
  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers })

  if (user) {
    redirect(
      `/account?message=${encodeURIComponent(
        'Cannot create a new account while logged in, please log out and try again.',
      )}`,
    )
  }

  return (
    <>
      <RenderParams />
      <Gutter className='h-auto'>
        <div className="flex">
          <div className="w-full lg:w-1/2 overflow-y-auto flex flex-col gap-4 p-6 md:p-10">
            <div className="flex flex-row w-full justify-between">
              <Link href="/" className="flex items-center gap-2 font-medium" replace>
                <div className="flex items-center justify-center text-primary-foreground">
                  <Image src={"/logo@2x.png"} alt={"Fecafoot logo"} width={50} height={50} />
                </div>
              </Link>
              <LocaleSwitcher />
            </div>
            <div className="flex flex-1 items-center justify-center">
              <div className="w-full max-w-md md:py-20">
                <CreateAccountForm />
              </div>
            </div>
          </div>

          <div className="hidden lg:block lg:w-1/2">
            <div className="sticky top-0 h-screen">
              <img
                src="/lions.avif"
                alt="Image"
                className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
              />
            </div>
          </div>
        </div>
      </Gutter>
    </>
  )
}
