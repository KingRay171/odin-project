import './Nav.css'
import { NavLink } from 'react-router-dom'

export default function Nav({ selections }: { selections: object }) {
    const items = Object.entries(selections).flat().filter(e => typeof e === "number").reduce((acc, curr) => acc + (curr ? 1 : 0), 0)
    
    return (
        <div className='nav'>
            <div className='name'>Shop-a-Palooza</div>
            <div className='links'>
                <NavLink to='/'>Go Home</NavLink>
                <NavLink to='shop'>Shop</NavLink>
                <div className='cart'>
                    <NavLink to='cart'>Cart</NavLink>
                    <span className={`item-number` + (items ? " display" : "")}>
                        {items}
                    </span>
                </div>
                
            </div>
        </div>
    )
}