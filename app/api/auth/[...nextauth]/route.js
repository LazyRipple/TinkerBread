import NextAuth from 'next-auth'
import authOptions from '@/api/auth/[...nextauth]/authOption'
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
