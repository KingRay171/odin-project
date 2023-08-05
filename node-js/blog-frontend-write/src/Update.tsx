import { createResource } from "solid-js"
import NavBar from "./components/Navbar"
import { useParams } from "@solidjs/router"

type Post = {
        _id: string,
        title: string,
        content: string
    }

async function getPost(){
    const {id} = useParams()
    const post = await fetch(
                `${import.meta.env.VITE_BACKEND_URI}/api/posts/${id}/edit`, 
                {method: "POST", headers: {
            'Content-Type': 'application/json' }, body: JSON.stringify({token: sessionStorage.getItem("token")})}
            ).then(e => e.json())

    return post as Post
}

export default function Update() {
    const {id} = useParams()
    let [posts] = createResource(getPost)
    let titleRef
    let contentRef
    return (
        <>
        <NavBar />
        <form onSubmit={async e => {
          e.preventDefault()
          const res = await fetch(
                `${import.meta.env.VITE_BACKEND_URI}/api/posts/${id}/edit`, 
                {method: "PUT", 
                headers: {'Content-Type': 'application/json' }, 
                body: JSON.stringify({
                    title: titleRef.value, 
                    content: contentRef.value, 
                    token: sessionStorage.getItem("token")}
                    )
                }
            ).then(e => e.json())
            console.log(res)
        }} >
            <input type="text" value={posts()?.title} ref={titleRef} />
            <input type="text" value={posts()?.content} ref={contentRef} />
            <input type="submit" />
        </form>
        </>
    )
}