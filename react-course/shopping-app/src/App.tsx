
import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Shop from './Shop';
import Home from './Home';
import Cart from './Cart';
import HomeBody from './HomeBody'
import { useState } from 'react';



function App() {

  const [selections, setSelections] = useState({
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0
  })


  function toggleSelections(e) {
    if(e.target.textContent === "Add to Cart") {
      const amt = parseInt(e.target.parentElement.children[3].value)
      setSelections({...selections, [parseInt(e.target.parentElement.classList[0])]: amt})
    } else {
      setSelections({...selections, [parseInt(e.target.parentElement.classList[0])]: 0})
    }
    console.log(selections)
  } 

  function deleteItem(e) {
    setSelections({...selections, [parseInt(e.target.parentElement.classList[0])]: 0})
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home selections={selections}/>,
      children: [
        {
          path: "/shop",
          element: <Shop selections={selections} toggleSelections={toggleSelections}/>,
        },
        {
          path: "/cart",
          element: <Cart selections={selections} deleteItem={deleteItem} />
        }, 
        {
          index: true,
          element: <HomeBody />
        }
      ]
    },

  ]);

  return (
    <>
    <RouterProvider router={router} />
    </>
  )
}

export default App
