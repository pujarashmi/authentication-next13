"use client"

import React from 'react'
import {useSession} from 'next-auth/react'
import { getServerAuthSession } from '../../pages/api/auth/[...nextauth]'  

export default function TestPage() {
  const {data, status} = useSession ()

  // here we are validating pagewise, and we can do this globally in layout.js also
  if (status === 'loading')
    return <h3>loading</h3>

  if (status === 'unauthenticated')
    return <h3>{status}</h3>

  return (
    <div>Test file
      <h1 className="mb-6">Status : {status}</h1>

      {data && <pre>{JSON.stringify(data,null,2)}</pre>}

      {/* <pre>{JSON.stringify(data.user,null,2)}</pre> */}

    </div>

  )
}

// this page req authentication
TestPage.auth = true


// // serverside getServerSideProps is in not use -- 
// /**
//  * @param {import('next').GetServerSidePropsContext} ctx 
// */

// export async function getServerSideProps(ctx) {
//   console.log("in getserverprop")
//   const session = await getServerAuthSession(ctx.req, ctx.res)
//   console.log(session)

//   if(!session) {
//     return {
//       redirect: {
//         destination: '/',
//         permanent: false
//       }
//     }
//   }

//   return {
//     props: {
//       user: session.user
//     }
//   }
// }