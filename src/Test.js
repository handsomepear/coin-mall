import React, { Component } from 'react'

import { connect } from 'react-redux'

import { setPageTitle, setInfoList } from './store/actions'

class Test extends Component {
  //constructor(props) {
  //  super(props)
  //}

  componentDidMount() {
    let { setPageTitle, setInfoList } = this.props
    setPageTitle('新的标题')

    setInfoList()
  }

  render() {
    let { pageTitle, infoList } = this.props
    return (
      <div>
        <h1>{pageTitle}</h1>
        {
          infoList.length > 0 ? (
            <ul>
              {
                infoList.map(item => {
                  return (<li key={item.id}>{item.data}</li>)
                })
              }
            </ul>
          ) : null
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    pageTitle: state.pageTitle,
    infoList: state.infoList
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setPageTitle(data) {
      dispatch(setPageTitle(data))
    },
    setInfoList(data) {
      dispatch(setInfoList(data))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Test)