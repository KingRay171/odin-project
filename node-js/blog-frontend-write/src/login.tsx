import NavBar from './components/Navbar'
import { useNavigate } from '@solidjs/router'
import './login.css'

export default function Login(){
    let userRef
    let pwdRef
    const navigate = useNavigate()
    return (
        <>
        <NavBar />
        <form onSubmit={async (e) => {
            e.preventDefault()
            const res = await fetch(
                `${import.meta.env.VITE_BACKEND_URI}/api/login`, 
                {method: "POST", headers: {
            'Content-Type': 'application/json' }, body: JSON.stringify({username: userRef.value, password: pwdRef.value})}
            ).then(e => e.json())
            if (res.token) {
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