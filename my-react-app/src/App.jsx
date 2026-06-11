import { useState } from 'react'

import './App.css'

function App() {
  

  return (
    <>
      <form>
        <input type="text"
         placeholder="Full Name" />
         <input type="email"
         placeholder="Email" />
         <input type="password"
         placeholder="Password" />
         <input type="password"
         placeholder=" Confirm Password" />
        <button type="submit">Login</button>

      </form>
    </>
  )
}

export default App
