"use client"
import {useSession, signIn, signOut} from 'next-auth/react'
import Link from 'next/link'
import { Inter } from 'next/font/google'
import { useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const {data, status} = useSession ()
  return (
    <>
      <h1 className='text-4xl text-red-700 font-bold mb-6'>Next auth</h1>
      <h1 className="mb-6">Status : {status}</h1>

      {/* if user exist the show user info */}
      {data && <pre>{JSON.stringify(data,null,2)}</pre>}

      {/* signin page containing both google signin button and google signin form */}
      {!data && ( 
        <div className='has-tooltip'>
          <span className='tooltip rounded shadow-lg p-1 bg-gray-100 text-red-500 -mt-8'>Go to Sign In page of Google and custom form</span>
            <Link className='bg-green-800 p-2 text-white font-bold ml-6 rounded-xl text-xl mt-6' href = '/api/auth/signin'>Sign In</Link>
        </div>
      )}

      {/* for direct go to google signin page */}
      {!data && (
        <button className='bg-blue-800 p-2 text-white font-bold ml-6 rounded-xl text-xl mt-6' onClick={() => signIn('google')}>Sign in with google</button>
      )} 

      {/* for showing custom form */}
      {!data && 
        <SignInForm />
      } 

      {/* signout */}
      {data && <button className='bg-pink-800 p-2 text-white font-bold ml-6 rounded-xl text-xl mt-6' onClick={() => signOut()} >Sign out</button>}

    </>
  )
}

function SignInForm () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleSignin(e) {
    e.preventDefault()
    // here email, password matched to the name and value given in [...nextauth.ts] page
    
    // if want callbackurl as localhost:3000
    // signIn('credentials', {email, password})
    
    // if want callbackurl as localhost:3000/test where test is a test.tsx file
    signIn('credentials', {email, password, callbackUrl: '/test'})
  }

  return (
    <form onSubmit = {handleSignin} className='ml-10 mt-6 border w-2/5 p-8'>
      <input className="shadow appearance-none border rounded w-4/5 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Username" value = {email} onChange = {e =>setEmail(e.target.value)} />
      <br/>
      <input className="mt-6 shadow appearance-none border rounded w-4/5 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type = 'text' placeholder="Password" value = {password} onChange = {e =>setPassword(e.target.value)} />
      <br/>
      <button className='bg-blue-800 p-2 text-white font-bold rounded-xl text-xl mt-6' type='submit'>Login</button>
    </form>
  )
}
