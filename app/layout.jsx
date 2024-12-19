import { Layout } from '@/components/dom/Layout'
import '@/global.css'
import { SessionProvider } from '@/components/sessionProvider'
import { getServerSession } from 'next-auth'


export const metadata = {
  title: 'TinkerBread',
  description: 'Decorate friends gingerbreads. Send a love through the Christmas.',
}

export default async function RootLayout({ children }) {
  const session = await getServerSession()
  return (
    <html lang='en' className='antialiased'>
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        {/* To avoid FOUT with styled-components wrap Layout with StyledComponentsRegistry https://beta.nextjs.org/docs/styling/css-in-js#styled-components */}
        
          <Layout><SessionProvider session={session}>{children}</SessionProvider></Layout>
        
      </body>
    </html>
  )
}
