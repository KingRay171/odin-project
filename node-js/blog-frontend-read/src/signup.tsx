import { useNavigate } from '@solidjs/router'
import NavBar from './components/Navbar'
import './signup.css'

export default function Signup(){
    let userRef
    let pwdRef
    const navigate = useNavigate()
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
            if(res.message === "User created") {
                sessionStorage.setItem("token", res.token)
                
                navigate("/", {replace: true})
            }
        }}>
            <input type='text' placeholder='Username' ref={userRef} />
            <input type='password' ref={pwdRef} />
            <input type='submit' />
            
        </form>
        </>
    )
}