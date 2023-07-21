import { useState } from 'react'
import './App.css'
import { Header } from './components/header'
import { Game } from './components/game'
import { useEffect } from 'react'

function App() {
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const [pokemon, setPokemon] = useState([{name: "", img: "", clicked: false}])
  const [gameOver, setGameOver] = useState(false)
 

  async function getPokemon (){
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${Math.floor(Math.random() * 1000) + 1}`)
    const {name, sprites} = await res.json()
    const image = sprites.other["official-artwork"].front_default;
    return {name, img: image, clicked: false}
  }
  async function getRandomPokemon() {
    const results = []
    for(let i = 0; i < 8; i++) {
      results.push(await getPokemon())
    }
    setPokemon(results)
  }


  async function restart(e){
    setGameOver(false)
    const results = []
    for(let i = 0; i < 8; i++) {
      results.push(await getPokemon())
    }
    setPokemon(results)
  }

  useEffect(() => {
    getRandomPokemon()
  }, [])


  return (
    <>
      <Header score={score} highScore={highScore}/>
      <Game pokemon={pokemon} onClick={(e) => {
        if(!gameOver){
          const idx = parseInt(e.target.parentElement.classList[1])
          if(pokemon[idx].clicked){
            setGameOver(true)
            setScore(0)
          
          
          } else {
            setScore(score + 1)
            if(score + 1 > highScore) setHighScore(highScore + 1)
            setPokemon(pokemon.map((poke, i) => idx === i ? {...poke, clicked: true} : poke ))
          
          }
          }
        
        }} restartGame={restart}/>
    </>
  )
}

export default App
