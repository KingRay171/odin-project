"use client";

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

export default function Game() {
  const [divX, setDivX] = useState(0)
  const [divY, setDivY] = useState(0)
  const [divVisible, setDivVisible] = useState(false)
  const characters = [
    {name: "Ash", link: "/ash.png"}, 
    {name: "Brian", link: "/brian.png"}, 
    {name: "Edward Elric", link: "/edwardelric.png"}, 
    {name: "Link", link: "/link.png"}, 
    {name: "Wilson", link: "/wilson.png"}
  ]
  const [charactersLeft, setCharactersLeft] = useState(characters)
  let headerRef = useRef()
  let selectionRef = useRef()
  
  return (
    <div className='relative'>
    <header ref={headerRef} className='flex justify-between'>
      {characters.map(char => (
        <Image key={char.link} src={char.link} width={50} height={50} alt={char.name}/>
      ))}
    </header>
    <img src='background.jpg' onClick={(e) => {
      e.preventDefault()
      if(divVisible){
        setDivVisible(false)
      } else {
        console.log(e.pageX, e.pageY)
        setDivX(e.pageX - 25)
        setDivY(e.pageY - 25)
        setDivVisible(true)
      }
    }}/>
    
    <div style={{
      position: 'absolute',
      left: divX + 50 + selectionRef.current?.offsetWidth < window.screen.width ? divX + 50 : divX - 100,
      top: divY,
      visibility: divVisible ? "visible" : "hidden",
      display: "flex",
      flexDirection: "column",
      gap: "8px"
    }}
    ref={selectionRef} >
      {characters.map(char => (
        <button key={char.name} onClick={async (e) => {
          e.preventDefault()
          const res = await fetch("/api/charcheck", {method: "POST", headers: {'Content-Type': 'application/json'}, body: JSON.stringify({character: char.name})})
        }}>
          {char.name}
        </button>
      ))}
    </div>
    <div style={{
      position: 'absolute',
      left: divX,
      top: divY,
      visibility: divVisible ? "visible" : "hidden",
      border: "5px dotted red",
      borderRadius: "100px",
      width: "50px",
      height: "50px"
    }} >

    </div>
    </div>
  )
}
