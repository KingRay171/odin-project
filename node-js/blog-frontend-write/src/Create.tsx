import NavBar from "./components/Navbar";


export default function Create() {
    let titleRef
    let contentRef
    return (
        <>
        <NavBar />
        <form onSubmit={async e => {
          e.preventDefault()
          const res = await fetch(
                `${import.meta.env.VITE_BACKEND_URI}/api/posts/new`, 
                {method: "POST", 
                headers: {'Content-Type': 'application/json' }, 
                body: JSON.stringify({
                    title: titleRef.value, 
                    content: contentRef.value, 
                    token: sessionStorage.getItem("token")}
                    )
                }
            ).then(e => e.json())
            console.log(res)
        }} >
            <input type="text" placeholder="Post Title" ref={titleRef} />
            <input type="text" placeholder="Post Content" ref={contentRef} />
            <input type="submit" />
        </form>
        </>
    )
}