import { MongoClient, ObjectId } from "mongodb";

export default async function handler(req: Request, res: Response) {
  
  const body = JSON.parse(req.body)
 
  
 
  // Guard clause checks for first and last name,
  // and returns early if they are not found
  if (!body.title || !body.content) {
    // Sends a HTTP bad request error code
    return res.status(400).json({ data: 'Body or content is missing' })
  }

  const client = await MongoClient.connect(process.env.MONGODB_URI as string);
  const id = (await client.db().collection("users").findOne({username: body.name}))?._id
  client.db().collection("posts").insertOne({title: body.title, content: body.content, poster: new ObjectId(id)})
 
  // Found the name.
  // Sends a HTTP success code
  res.status(200).send("Hi")
  
}