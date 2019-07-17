import React from 'react'
import Logo from '../public/logo.png'
import './App.scss'

const App = () => {
  return (
    <div className="ftb-cli">
      <img src={Logo} alt="Ftb logo" />
      <div className="ftb-cli_title">Ftb React Demo</div>
    </div>
  )
}

export default App
