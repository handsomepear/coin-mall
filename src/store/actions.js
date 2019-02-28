export const setPageTitle = (data) => {
  return (dispatch, getState) => {
    dispatch({ type: 'SET_PAGE_TITLE', data: data })
  }
}

function getData() {
  return new Promise((resolve => {
    setTimeout(() => {
      const data = [
        {id: 11 ,data: 1 },
        {id: 12 ,data: 2 },
        {id: 13 ,data: 3 }
      ]
      resolve(data)
    })
  }))
}


export const setInfoList = (data) => {
  return (dispatch, getState) => {
    getData().then(data => {
      dispatch({ type: 'SET_INFO_LIST', data })
    })
  }
}
