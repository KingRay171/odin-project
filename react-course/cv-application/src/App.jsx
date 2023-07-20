import { useState } from 'react'
import Title from '../components/title'
import Content from '../components/content'
import '../styles/app.css'

function App() {
  const [count, setCount] = useState(0)
  
  return (
    <div className='app'>
    <Title />
    <Content />
    </div>
  )
}

export default App
