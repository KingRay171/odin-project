import NextAuth, { Account, Profile, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoClient } from "mongodb";
import {compare} from 'bcryptjs';
import { JWT } from "next-auth/jwt";


export default NextAuth({
  providers: [
    CredentialsProvider({
      id: "credentials",
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "my-project",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: {
          label: "username",
          type: "text",
          placeholder: "jsmith@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if(!credentials?.password){
          throw new Error("Invalid password")
        }
        
        const payload = {
          username: credentials?.username,
          password: credentials.password,
        };
        
        

        const client = await MongoClient.connect(process.env.MONGODB_URI as string);
        //Get all the users
        const users = client.db().collection('users');
        //Find user with the email  
        const result = await users.findOne({
            username: credentials?.username,
        });
        
        //Not found - send error res
        if (!result) {
            client.close();
            throw new Error('No user found with the email');
        }
        //Check hased password with DB passwords
        

        const checkPassword = await compare(credentials.password, result.password);
        //Incorrect password - send response
        if (!checkPassword) {
            client.close();
            throw new Error('Password doesnt match');
        }
        //Else send success response
        client.close();

        return { id: "1", username: credentials?.username, member: result.clubMember};
      },
    }),
    // ...add more providers here
  ],
  secret: process.env.JWT_SECRET,
  callbacks: {
    async jwt({ token, user, account }: {
    token: JWT;
    user: User,
    account: Account | null;
    profile?: Profile | undefined;
    trigger?: "signIn" | "signUp" | "update" | undefined;
    isNewUser?: boolean | undefined;
    session?: any;
}) {
      if (account && user) {
      
        return {
          ...token,
          username: user.username,
          member: user.member
        };

      }

      return token;
    },

    async session({ session, token }) {
      if(!session.user){
        throw new Error("Invalid user")
      }
      session.user.username = token.username;
      session.user.member = token.member;
      return session;
    },
  },
  theme: {
    colorScheme: "auto", // "auto" | "dark" | "light"
    brandColor: "", // Hex color code #33FF5D
    logo: "/vercel.svg", // Absolute URL to image
  },
  // Enable debug messages in the console if you are having problems
  debug: process.env.NODE_ENV === "development",
});
