import React, { Component } from 'react'
import Clock from './components/Clock'

import './index.scss'

export default class ReactPackage extends Component {
  render() {
    return (
      <div className="react-library">
        <h2>Welcome use ftb cli create react package !</h2>
        <Clock />
      </div>
    )
  }
}
