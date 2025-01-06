import React from 'react'
import Link from 'next/link'
import { ClientUser } from 'payload'

type NamedClientUser = {
  firstName: string
  lastName: string
} & ClientUser

export function Login({user}:{user?: NamedClientUser}) {
  return (
    <>
      {user && (
        <React.Fragment>
          <Link href="/account">{user.firstName}</Link>
          <Link href="/logout">Logout</Link>
        </React.Fragment>
      )}
      {!user && (
        <React.Fragment>
          <Link href="/login">Login</Link>
          <Link href="/create-account">Create Account</Link>
        </React.Fragment>
      )}
    </>
  )
}
