import React from '../node_modules/react'
import ReactDom from '../node_modules/react-dom'
import Logo from '../assets/logo.png'
import './index.scss'

const FtbReact = () => {
  return (
    <div className="ftb-cli-react">
      <img src={Logo} alt="Ftb logo" />
      <div>Ftb React Demo</div>
    </div>
  )
}

ReactDom.render(<FtbReact />, document.getElementById('app'))
