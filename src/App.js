import React, { Component } from 'react';
import Proptypes from 'prop-types'

class App extends Component {
  render() {
    return (
      <div className="container">
        <h1 className="jumbotron-heading text-center">{this.props.value}</h1>
        <p className="text-center">
         {/* <button onClick={this.props.onIncrement} className="btn btn-primary mr-2">Increase</button>
          <button
            onClick={this.props.onDecrement}
            className="btn btn-danger my-2">Decrease</button>*/}
          <button className="btn btn-primary mr-2">Increase</button>
          <button
            className="btn btn-danger my-2">Decrease</button>
        </p>
      </div>
    )
  }
}


// 类似于vue组件中的props
//App.propTypes = {
//  value: Proptypes.number.isRequired,
//  onIncrement: Proptypes.func.isRequired,
//  onDecrement: Proptypes.func.isRequired
//}

export default App;
