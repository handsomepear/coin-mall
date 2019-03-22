import React, { Component } from 'react'
import PropTypes from 'prop-types';

class CountDown extends Component {

  static propTypes = {
    endTimeMs: PropTypes.number.isRequired,
    onTimeEnd: PropTypes.func
  }
  constructor(props) {
    super(props)
    this.state = {
      minute: '00',
      second: '00'
    }
  }
  componentDidMount(){
    this.count(this.props.endTimeMs)
  }
  componentWillUnmount(){
    clearInterval(this.timer)
  }
  count = (endTime) => {
    let diff = Math.floor((Date.parse(new Date(endTime)) - Date.parse(new Date())) / 1000)
    if(diff <= 0) {
      return false
    }
    this.timer = setInterval(() => {
      if(diff > 0) {
        diff -= 1
        let minute = Math.floor(diff / 60);
        let second = Math.floor(diff % 60);
        this.setState({
          minute:minute < 10 ? "0" + minute : minute,
          second:second < 10 ? "0" + second : second
        })
      }else {
        clearInterval(this.timer)
        ;(typeof this.props.onTimeEnd === 'function') && this.props.onTimeEnd()
      }
    }, 1000)
  }

  render(){
    return (
      <div className="count-down-component">
        {this.state.minute} : {this.state.second}
      </div>
    )
  }
}

export default CountDown