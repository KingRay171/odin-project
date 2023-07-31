import Head from 'next/head'
import clientPromise from '../lib/mongodb'
import {useSession} from 'next-auth/react'

import type { InferGetServerSidePropsType } from 'next'
import NavBar from '../components/Navbar'
import Modal from '@/components/Modal'
import { useState } from 'react'


export const getServerSideProps = async () => {
    await clientPromise
    const client = await clientPromise
    const db = client.db("auth_course")

    let posts = (await db.collection("posts").find({}).toArray())

    for(let i = 0; i < posts.length; i++){
      posts[i].poster = (await db.collection("users").findOne({_id: posts[i].poster}))?.username
    }
  
    // `await clientPromise` will use the default database passed in the MONGODB_URI
    // However you can use another database (e.g. myDatabase) by replacing the `await clientPromise` with the following code:
    //
    // `const client = await clientPromise`
    // `const db = client.db("myDatabase")`
    //
    // Then you can execute queries against your database like so:
    // db.find({}) or any of the MongoDB Node Driver commands
    
    return {
      props: { posts: JSON.stringify(posts) },
    }
}

export default function Home({posts}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const {data, status} = useSession();
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <NavBar />
    <div className="container">
      <Head>
        <title>Members Only</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">
          Messages
        </h1>

        <div className="grid">
          {JSON.parse(posts).map((e, idx) => (
            <div className="card" key={idx}>
              <h3>{e.title}</h3>
              <p>
                {e.content}
              </p>
              {data?.user.member && <p className='right'>Posted by {e.poster}</p>}
          </div>
          ))}
          {status === "authenticated" && <div onClick={() => setShowModal(true)} className="card post">
              <h3>+</h3>
              
          </div>}
          {showModal &&
            <Modal onClose={() => setShowModal(false)}>
                Hello from the modal!
            </Modal>
          }

        </div>
      </main>

      <footer>
        <a
          href="https://github.com/KingRay171"
          target="_blank"
          rel="noopener noreferrer"
        >
          Made by Ray Ikome
        </a>
      </footer>

      <style jsx>{`
        .container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;

          
          margin-top: 3rem;
        }

        .card {
          margin: 1rem;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
          width: 80vw;
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          line-height: 1.5;
        }

        .right {
          text-align: right;
          font-size: 12px;
        }

        .post {
          text-align: center;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
    </>
  )
}
