import './Home.css'
import Nav from './Nav'
import { Outlet } from 'react-router-dom'
export default function Home({selections}) {
    return (
        <>
        <Nav selections={selections}/>
        <Outlet />
        
        </>
    )
}