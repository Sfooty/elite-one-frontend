'use client'

import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useCallback, useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Message } from '@/components/Message'
import { useAuth } from '@/providers/Auth'
import classes from './index.module.scss'
import { useTranslations } from 'use-intl'
import { cn } from '@/utilities/cn'
import { DatePicker } from '@/components/DatePicker'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'


enum GenderEnum {
  male = "male",
  female = "female"
}

type FormData = {
  email: string
  password: string
  passwordConfirm: string
  dateOfBirth: Date | null
  firstName: string
  lastName: string
  consent: boolean
  gender: GenderEnum
}

export const CreateAccountForm: React.FC = () => {
  const searchParams = useSearchParams()
  const allParams = searchParams.toString() ? `?${searchParams.toString()}` : ''
  const { login } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<null | string>(null)

  const {
    formState: { errors, isLoading },
    handleSubmit,
    register,
    watch,
    control,
  } = useForm<FormData>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordConfirm: '',
      dateOfBirth: null, // Since dateOfBirth can be null
      consent: false,
      gender: GenderEnum.male,
    },
  })

  const password = useRef({})
  password.current = watch('password', '')

  const { ref: emailRef, ...emailRest } = register('email', {
    required: 'Email is required',
  })

  const { ref: passwordRef, ...passwordRest } = register('password', {
    required: 'Password is required',
  })

  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null)

  const t = useTranslations()

  const onSubmit = (data: FormData) => { console.log(data) }
  /*useCallback(
    async (data: FormData) => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users`, {
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      })

      if (!response.ok) {
        const message = response.statusText || 'There was an error creating the account.'
        setError(message)
        return
      }

      const redirect = searchParams.get('redirect')

      const timer = setTimeout(() => {
        setLoading(true)
      }, 1000)

      try {
        await login(data)
        clearTimeout(timer)
        if (redirect) {
          router.push(redirect)
        } else {
          router.push(`/account?success=${encodeURIComponent('Account created successfully')}`)
        }
      } catch (_) {
        clearTimeout(timer)
        setError('There was an error with the credentials provided. Please try again.')
      }
    },
    [login, router, searchParams],
  )*/

  return (
    <form className={cn('flex flex-col gap-6')} onSubmit={handleSubmit(onSubmit)}>
      <Message className={classes.message} error={error} />
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">{t('create-your-account')}</h1>
        <p className="text-balance text-sm text-muted-foreground">{t('enter-details')}</p>
      </div>
      <div className="grid gap-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 grid gap-2">
            <Label htmlFor="firstName">{t('first-name')}</Label>
            <Controller
              name="firstName"
              control={control}
              rules={{ required: 'First name is required' }}
              render={({ field }) => <Input id="firstName" type="text" {...field} />}
            />
            {errors.firstName && <p className="text-red-600">{errors.firstName.message}</p>}
          </div>
          <div className="flex-1 grid gap-2">
            <Label htmlFor="lastName">{t('last-name')}</Label>
            <Controller
              name="lastName"
              control={control}
              rules={{ required: 'Last name is required' }}
              render={({ field }) => <Input id="lastName" type="text" {...field} />}
            />
            {errors.lastName && <p className="text-red-600">{errors.lastName.message}</p>}
          </div>
        </div>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            ref={emailRef}
            {...emailRest}
            placeholder="m@example.com"
            required
          />
          {errors.email && <p className="text-red-600">{errors.email.message}</p>}
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">{t('password')}</Label>
            <Link
              className="ml-auto text-sm underline-offset-4 hover:underline"
              href={`/recover-password${allParams}`}
            >
              {t('forgot-password')}
            </Link>
          </div>
          <Input id="password" type="password" {...passwordRest} ref={passwordRef} required />
          {errors.password && <p className="text-red-600">{errors.password.message}</p>}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="passwordConfirm">{t('confirm-password')}</Label>
          <Controller
            name="passwordConfirm"
            control={control}
            rules={{
              required: 'Please confirm your password',
              validate: (value) => value === password.current || 'The passwords do not match',
            }}
            render={({ field }) => (
              <Input id="passwordConfirm" type="password" {...field} required />
            )}
          />
          {errors.passwordConfirm && (
            <p className="text-red-600">{errors.passwordConfirm.message}</p>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="dateOfBirth">{t('date-of-birth')}</Label>
          <Controller
            name="dateOfBirth"
            control={control}
            rules={{ required: 'Date of birth is required' }}
            render={({ field }) => (
              <Controller
                name="dateOfBirth"
                control={control}
                rules={{ required: 'Date of birth is required' }}
                render={({ field }) => (
                  <DatePicker value={field.value} onChange={field.onChange} id="dateOfBirth" />
                )}
              />
            )}
          />
          {errors.dateOfBirth && <p className="text-red-600">{errors.dateOfBirth.message}</p>}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="gender">{t('gender')}</Label>
          <Controller
            name="gender"
            control={control}
            rules={{ required: 'Please select your gender' }}
            render={({ field }) => (
              <RadioGroup
                onValueChange={field.onChange}
                value={field.value}
                name={field.name}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value={GenderEnum.male} id={GenderEnum.male} />
                  <Label htmlFor="male">Male</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value={GenderEnum.female} id={GenderEnum.female} />
                  <Label htmlFor="female">Female</Label>
                </div>
              </RadioGroup>
            )}
          />
          {errors.gender && <p className="text-red-600">{errors.gender.message}</p>}
        </div>
      </div>
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? t('processing') : t('create-account')}
      </Button>
      <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
        <span className="relative z-10 bg-background px-2 text-muted-foreground">
          {t('continue-with')}
        </span>
      </div>
      <div className={'grid gap-6'}>
        <div className="flex flex-col gap-4">
          <Button variant="outline" className="w-full">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                fill="currentColor"
              />
            </svg>
            {t('login-with')} Apple
          </Button>
          <Button variant="outline" className="w-full">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                fill="currentColor"
              />
            </svg>
            {t('login-with')} Google
          </Button>
        </div>
      </div>
      <div>
        {t('already-have-account')}{' '}
        <Link className={'hover:underline'} href={`/login${allParams}`}>
          {t('login')}
        </Link>
      </div>
    </form>
  )
}
