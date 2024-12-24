import { Layout } from '@/components/dom/Layout'
import '@/global.css'
import { SessionProvider } from '@/components/sessionProvider'
import { getServerSession } from 'next-auth'
import MusicPlayer from '@/components/AudioPlayer'

export const metadata = {
  title: 'TinkerBread',
  description: 'Decorate friends gingerbreads. Send a love through the Christmas.',
}

export default async function RootLayout({ children }) {
  const session = await getServerSession()
  return (
    <html lang='en' className='antialiased'>
      <head>
        <link rel='shortcut icon' href='/ggb1_logo.ico' type='image/x-icon' />
      </head>
      <body>
        <MusicPlayer />
        <Layout>
          <SessionProvider session={session}>{children}</SessionProvider>
        </Layout>
      </body>
    </html>
  )
}
