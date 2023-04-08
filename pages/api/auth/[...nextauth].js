import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials";
import { getServerSession } from 'next-auth/next'


export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),

    // will work on http://localhost:3000/api/auth/signin
    CredentialsProvider({
      // in case of multiple credential provdr, we will have more name.eg: otp situation
      name:'credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email'
        }, 
        password: {
          label: 'Password',
          type: 'password'
        }
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const { email, password } = credentials
        // validate email n password from database
        
        // after validating the email, this user info will given by the db. here we are not covrring the database part
        // So let think, we have a user here, then the result will show the below user
        const user = { name: "J Smith", email: "jsmith@example.com", image:'https://lh3.googleusercontent.com/a/AGNmyxbi61qA-74Llf1oC_GFxdPT8tiwE-CTnVsHwuA4CQ=s96-c' }

        // ..........................
        // If we don't have the user, will get err page
        // const isValidationFailed = true
        // if (isValidationFailed) {
        //   throw new Error('Email password invalid')
        // }


        return user
      }
    })
  ],
}

export default NextAuth(authOptions)

// export const getServerAuthSession = (req, res) => {
//   return getServerSession(req, res, authOptions)
// }