import { useRef } from "react";


export default function SignUp(){

    const userRef = useRef()
    const passwordRef = useRef()
    const secretRef = useRef()
    return (
        <form onSubmit={async (e) => {
        e.preventDefault();
        //Getting value from useRef()
        const username = userRef.current.value;
        const password = passwordRef.current.value;
        const secret = secretRef.current.value;
        //Validation
        if (!username || !password) {
            alert('Invalid details');
            return;
        }
        //POST form values
        const res = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username, password, secret}),
        });
        //Await for data for any desirable next steps
        const data = await res.json();
        if(data.message !== "User created") alert(data.message)
    }}>
        <input type="text" placeholder="Username" ref={userRef}/>
        <input type="password" ref={passwordRef} />
        <input type="text" placeholder="Secret (for members)" ref={secretRef} />
        <input type="submit" />
    </form>
    )
}