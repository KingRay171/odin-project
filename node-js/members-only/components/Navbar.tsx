import {useSession} from 'next-auth/react'
import { signIn, signOut } from 'next-auth/react'
import { useEffect, useState } from 'react';

export default function MainNavigation() {
    const {data, status} = useSession();
    const [loading, setLoading] = useState(true)
    useEffect(() => {setLoading(false)}, [])
    if(status === "loading") return <></>
    return (
        !loading && <header>
            <div>Members Only</div>
            <nav>
                <ul>
                    {status !== "authenticated" && (
                        <li>
                            <button onClick={() => {signIn()}}>Login</button>
                        </li>
                    )}
                    {status !== "unauthenticated" && (
                        <li>
                            <button onClick={() => {signOut()}} >Logout</button>
                        </li>
                    )}
                </ul>
            </nav>
            <style jsx>{`
            header {
                display: flex;
                justify-content: space-between;
                margin-top: 2vh;
            }
            div {
                margin-left: 2vw;
            }
            ul {
                margin-right: 2vw;
            }

            `}</style>
        </header>
        
    );
}