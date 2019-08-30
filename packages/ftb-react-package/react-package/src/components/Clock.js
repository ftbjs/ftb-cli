import React, { Component } from 'react'

export default class Clock extends Component {
  constructor(props) {
    super(props)
    this.state = {
      start: new Date()
    }
  }
  componentDidMount() {
    this.timer = setInterval(() => {
      this.startClock()
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  startClock() {
    this.setState({
      start: new Date()
    })
  }
  render() {
    return <button>{this.state.start.toLocaleTimeString()}</button>
  }
}
