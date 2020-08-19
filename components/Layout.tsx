import React, { ReactNode } from 'react'
import Link from 'next/link'
import Head from 'next/head'

type Props = {
  children?: ReactNode
  title?: string
}

const Layout = ({ children, title = 'This is the default title' }: Props) => (
  <div style={{backgroundColor: '#FBF8F3', height: '100vh'}}>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet"></link>
    </Head>
    <header style={{padding: '0 5vw 0 5vw', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
      <h1>goodcontent.ai</h1>
      <nav>
        <Link href="https://goodcontent.ai/">
          <a>Home</a>
        </Link>{' '}
        <Link href="https://www.goodcontent.ai/blog">
          <a>Blog</a>
        </Link>{' '}
        <Link href="/">
          <a>App</a>
        </Link>{' '}
      </nav>
    </header>
    {children}
    <footer style={{justifyContent: 'center', display:'flex', padding: '5vh 0 5vh', fontSize: '12px'}}>
      <span>Looking for something else? Get in touch at human@goodcontent.ai 👋</span>
    </footer>
  </div>
)

export default Layout
