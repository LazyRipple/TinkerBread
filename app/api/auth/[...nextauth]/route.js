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
    signIn: async ({ user, account, profile }) => {
      const existingUser = await prisma.user.findFirst({
        where: {
          email: user.email,
        },
      })
      if (!existingUser) {
        return `/signup?email=${encodeURIComponent(user.email)}&username=${encodeURIComponent(user.username)}` // go to signup
      }

      const existingAccount = await prisma.account.findFirst({
        where: {
          userId: existingUser.id,
          provider: account.provider,
        },
      })

      if (!existingAccount) {
        await prisma.account.create({
          data: {
            userId: existingUser.id,
            provider: account.provider,
            providerAccountId: account.providerAccountId,
            type: account.type,
            access_token: account.access_token,
            id_token: account.id_token,
            expires_at: account.expires_at,
          },
        })
      }

      return true // Allow sign-in if user exists
    },
    jwt: async ({ token, user }) => {
      const user_db = await prisma.user.findFirst({
        where: {
          email: user?.email || '',
        },
      })
      if (user_db) {
        token.user_id = user_db.id
        token.link_id = user_db.link_id
        token.username = user_db.username
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
    redirect: async ({ url, baseUrl, user, session }) => {
      if (user?.link_id) {
        return `/bake/${session.user.link_id}` // Custom page if user exists
      }
      // if (url.startsWith('/')) {
      //   return `${baseUrl}${url}` // Allow valid internal routes
      // }
      return baseUrl
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
