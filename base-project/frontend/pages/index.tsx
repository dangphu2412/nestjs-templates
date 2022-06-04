import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { Footer } from '../modules/shared/Footer/Footer'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Example app</title>
        <meta name="description" content="Generated app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        Hello world
      </main>

      <Footer/>
    </div>
  )
}

export default Home
