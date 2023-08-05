import { createSignal } from "solid-js"
import { A, useNavigate } from "@solidjs/router"
import "./Navbar.css"


export default function NavBar(){
    const [loggedIn, setLoggedIn] = createSignal(sessionStorage.getItem("token"))
    const navigate = useNavigate()
    return (
        <header class="nav">
            <div class="nav-left">
                <a href="/"><h2>Blog</h2></a>
                {loggedIn() && <A href="/posts">View Posts</A>}
            </div>
            <div class="nav-right">
                {!loggedIn() && 
                <>
                <a href="/login"><button>Log In</button></a>
                <a href="/signup"><button>Sign Up</button></a>
                </>}
                {loggedIn() &&
                <button onClick={() => {
                    sessionStorage.removeItem("token")
                    setLoggedIn(null)
                    navigate("/", {replace: true})
                    }}>Log Out</button>}
            </div>
        </header>
    )
}