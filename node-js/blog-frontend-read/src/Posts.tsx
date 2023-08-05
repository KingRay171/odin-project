import { For, Suspense, createResource } from 'solid-js'
import NavBar from './components/Navbar'

import './App.css'
import { getPosts } from './utils/getPosts'
import { useNavigate } from '@solidjs/router'

function App() {
  
  let [posts, {mutate, refetch}] = createResource(getPosts)
  const navigate = useNavigate()
  return (
    <Suspense>
      <NavBar />
      <h2 class="read-the-docs">
        Blog Posts
      </h2>
      <div class="card">
        <For each={posts()}>{(post) => (
          <div class='post' onClick={() => {navigate(`/posts/${post._id}`, {replace: true})}}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <p>{`Posted by ${post.poster.username}, ${post.timeStamp}`}</p>
          </div>
        )}</For>
      </div>
      
    </Suspense>
  )
}

export default App
