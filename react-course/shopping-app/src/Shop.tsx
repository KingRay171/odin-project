import './shop.css'
import product1 from './images/bracelet1.jpg'


export default function Shop({ selections, toggleSelections }: {selections: object, toggleSelections: React.MouseEventHandler}){
    const items = [
        {name: "Studded Chain Bracelet", img: product1, id: 1}
    ]
    return (
        <div className='products'>
            {items.map(e => (
                <div className={`${e.id}`} key={e.id}>
                    <img src={e.img} />
                    <p>{e.name}</p>
                    <button onClick={toggleSelections}>{selections[e.id] ? "Remove from Cart" : "Add to Cart"}</button>
                    <input type='number' min={1} defaultValue={1}/>
                </div>
            ))}
        </div>
    )
}