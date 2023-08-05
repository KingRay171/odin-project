
type Post = {
        _id: string,
        title: string,
        content: string
    }


export async function getPost(id: String){
    const post = await fetch(
                `${import.meta.env.VITE_BACKEND_URI}/api/posts/${id}/edit`, 
                {method: "POST", headers: {
            'Content-Type': 'application/json' }, body: JSON.stringify({token: sessionStorage.getItem("token")})}
            ).then(e => e.json())

    return post as Post
}