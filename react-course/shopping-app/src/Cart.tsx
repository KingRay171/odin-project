import './Cart.css'
import product1 from './images/bracelet1.jpg'


export default function Cart({ selections, deleteItem }) {
    const items = [
        {name: "Studded Chain Bracelet", img: product1, id: 1}
    ]
    const cartItemNumbers = Object.entries(selections).flat().filter(e => typeof e === "number")
    return (
        <div className='cart'>
            {items.map((e, idx) => (
                cartItemNumbers[idx] ?
                <div key={idx} className={`${e.id}`}>
                    <img src={e.img} />
                    <p>{e.name}</p>
                    <button onClick={deleteItem}>Remove from Cart</button>
                </div> : <></>
            ))}

        </div>
    )
}