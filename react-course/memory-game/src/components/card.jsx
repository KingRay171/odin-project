import '../styles/card.css'
import PropTypes from 'prop-types'

export function Card({ name, number, img, onClick }){
    return (
        <div className={`card ${number}`} onClick={onClick}>
            <img src={img} onClick={onClick} />
            <div>{name}</div>
        </div>
    )
}

Card.propTypes = {
    name: PropTypes.string,
    number: PropTypes.number,
    img: PropTypes.string,
    onClick: PropTypes.func
}

