import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { PrismaClient } from '@prisma/client'
import { PrismaAdapter } from '@auth/prisma-adapter'

const prisma = new PrismaClient()

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      // explain this
      profile(profile) {
        return {
          id: profile.sub,
          username: `${profile.given_name}`,
          email: profile.email,
        }
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    signIn: async ({ user }) => {
      const existingUser = await prisma.user.findUnique({
        where: { gmail: user.email },
      })
      if (!existingUser) {
        console.log('No user with this Gmail')
        return `/signup?gmail=${encodeURIComponent(user.email)}&username=${encodeURIComponent(user.username)}` // go to signup
      }
      return true // Allow sign-in if user exists
    },
    jwt: async ({ token, user }) => {
      if (user) {
        token.user_id = user.id
        token.link_id = user.link_id
        token.username = user.username
      }
      return token
    },
    session: async ({ session, token }) => {
      if (session.user) {
        session.user.id = token.user_id
        session.user.link_id = token.link_id
        session.user.username = token.username
      }
      return session
    },
    redirect: async ({ url, baseUrl, user }) => {
      if (user?.link_id) {
        return `/bake/${user.link_id}` // Custom page if user exists
      }
      if (url.startsWith('/')) {
        return `${baseUrl}${url}` // Allow valid internal routes
      }
      return baseUrl
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
