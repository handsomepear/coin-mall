import * as GoodsServer from '@API/goods'


import * as types from '@store/types/goodTypes'


export const getGoodsList = () => async (dispatch) => {
  const goodsList = await GoodsServer.getGoodsList().then(res => res.data.goodsList)
  return dispatch({
    type: types.GETGOODSLIST,
    goodsList
  })
}


export const getGoodsDetail = () => async (dispatch) => {
  const goodsDetail = await GoodsServer.getGoodsDetail().then(res => res.data.goods)
  return dispatch({
    type: types.GETGOODSDETAIL,
    goodsDetail
  })
}

