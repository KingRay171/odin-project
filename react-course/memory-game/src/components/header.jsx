import '../styles/header.css'
import PropTypes from 'prop-types'

export function Header({score, highScore}){
    
    return (
        <div className='header'>
            <div className='title'>
                Pokemon Memory
            </div>
            <div className='scoreboard'>
                <div className='score'>Score: {score}</div>
                <div className='highScore'>High Score: {highScore}</div>
            </div>

        </div>
    )
}

Header.propTypes = {
    score: PropTypes.number,
    highScore: PropTypes.number
}