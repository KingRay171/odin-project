import '../styles/game.css'
import PropTypes from 'prop-types'
import { Card } from './card'

export function Game({ pokemon, onClick, restartGame }){
    return (
        <div className='game'>
            {pokemon.sort(() => Math.random() - 0.5).map((e, idx) => (
                <Card key={idx} onClick={onClick} name={e.name} img={e.img} number={idx} />
            ))}
            <button onClick={restartGame}>Restart</button>
        </div>
    )

}

Game.propTypes = {
    pokemon: PropTypes.arrayOf(PropTypes.object),
    onClick: PropTypes.func,
    restartGame: PropTypes.func
}