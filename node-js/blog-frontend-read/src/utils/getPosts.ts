import { ObjectId } from "mongoose";

type Posts = [
    {
        _id: string,
        title: string,
        content: string,
        poster: {_id: ObjectId, username: string},
        timeStamp: Date
    }
]

export async function getPosts(){
    const posts = await fetch(
                `${import.meta.env.VITE_BACKEND_URI}/api/posts`, 
                {method: "POST", headers: {
            'Content-Type': 'application/json' }, body: JSON.stringify({token: sessionStorage.getItem("token")})}
            ).then(e => e.json())

    return posts as Posts
}