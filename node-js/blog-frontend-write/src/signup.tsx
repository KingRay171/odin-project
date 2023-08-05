import NavBar from './components/Navbar'
import { Navigate } from '@solidjs/router'
import './signup.css'

export default function Signup(){
    const [user, setUser] = useAuth()
    let userRef
    let pwdRef
    return (
        <>
        <NavBar/>
        <form onSubmit={async (e) => {
            e.preventDefault()
            const res = await fetch(
                `${import.meta.env.VITE_BACKEND_URI}/api/signup`, 
                {method: "POST", headers: {
            'Content-Type': 'application/json' }, body: JSON.stringify({username: userRef.value, password: pwdRef.value})}
            ).then(e => e.json())
            if(res.message === "User created") setUser(userRef.value)
        }}>
            <input type='text' placeholder='Username' ref={userRef} />
            <input type='password' ref={pwdRef} />
            <input type='submit' />
            
        </form>
        {user() && <Navigate href={"/"} />}
        </>
    )
}