import * as GoodsServer from '../../API/goods'


import * as types from '../types/goodTypes'


export const getGoodsList = () =>  async (dispatch) => {
  const taskList = await GoodsServer.getGoodsList().then(res => res.data.taskList)
  return dispatch({
    type: types.GETGOODSLIST,
    data: taskList
  })
}