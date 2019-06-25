import React from 'react'
import ReactDom from 'react-dom'
import Logo from '../assets/logo.png'
import './index.scss'

const FtbReact = () => {
  return (
    <div className="ftb-cli-react">
      <img src={Logo} alt="Ftb logo"/>
      <div>Ftb React Demo</div>
    </div>
  )
}

ReactDom.render(<FtbReact />, document.getElementById('app'))