import { ObjectId } from "mongoose";

type Comments = [
    {
        _id: string,
        content: string,
        poster: {_id: ObjectId, username: string},
        post: string,

        timeStamp: Date
    }
]

export async function getComments(){
    const comments = await fetch(
                `${import.meta.env.VITE_BACKEND_URI}/api/comments`, 
                {method: "POST", headers: {
            'Content-Type': 'application/json' }, body: JSON.stringify({token: sessionStorage.getItem("token")})}
            ).then(e => e.json())

    return comments as Comments
}