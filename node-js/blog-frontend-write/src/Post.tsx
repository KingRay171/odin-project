import { useParams } from "@solidjs/router"
import { For, Index, Show, Suspense, createResource, createSignal } from "solid-js"
import NavBar from "./components/Navbar"

type Comment = {
    _id: string,
    content: string,
    likeCount: number,
    likes: Array<string>,
    post: string,
    timeStamp: string
}


type Post = {
        _id: string,
        title: string,
        content: string,
        likes: Array<string>,
        comments: Array<Comment>
    }

async function getPost(derivedState: {id: string}){
    
    const post = await fetch(
                `${import.meta.env.VITE_BACKEND_URI}/api/posts/${derivedState.id}`, 
                {method: "POST", headers: {
            'Content-Type': 'application/json' }, body: JSON.stringify({token: sessionStorage.getItem("token")})}
            ).then(e => e.json())

    return post as Post
}

export default function Post() {
    let {id} = useParams() 
    const [idSignal, setIdSignal] = createSignal(id);
    const derivedState = () => {
        
      return {id: idSignal()}
    }
    let [post, {mutate, refetch}] = createResource(derivedState, getPost)
    let [writing, setWriting] = createSignal(false)
    
    
    let textRef = document.createElement("input")
    return (
        
        <Suspense>
            <NavBar />
            <h2 class="read-the-docs">
              {post()?.title}
            </h2>
            <h4>
              {post()?.content}
            </h4>
            <p>{post()?.likes.length} likes</p>
            <For each={post()?.comments}>
                {(comment) => (
                    <div class="post">
                        <h3>{comment.content}</h3>
                        <p>{`Posted by ${comment.poster}, ${comment.timeStamp}`}</p>
                    </div>
                )}
            </For>
            <Show when={writing()} fallback={<div class="post" onClick={() => {setWriting(true)}}>+</div>}>
                    <form onSubmit={async e => {
                      e.preventDefault()
                      const res = await fetch(
                          `${import.meta.env.VITE_BACKEND_URI}/api/posts/${id}/comment`, 
                          {method: "POST", 
                          headers: {'Content-Type': 'application/json' }, 
                          body: JSON.stringify({
                              comment: textRef.value,
                              token: sessionStorage.getItem("token")}
                              )
                          }
                      ).then(e => e.json())
                      let oldPost = post() as Post
                      let newComment = {_id: "", content: textRef.value, likeCount: 0, likes: [], post: id, timeStamp: `${new Date()}`} as Comment
                      mutate((post) => {
                        return {title: oldPost?.title, content: oldPost.content, comments: [...oldPost.comments, newComment], likes: oldPost.likes, _id: oldPost._id}
                    })
                      setWriting(false)
                    }}>
                        <input type="text" ref={textRef} />
                        <input type="submit" />
                    </form>
            </Show>
            
        </Suspense>
        
    )
    
}