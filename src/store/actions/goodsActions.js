import * as GoodsServer from '@API/goods'

import * as types from '@store/types/goodTypes'

export const getGoodsList = () => async (dispatch) => {
  const goodsList = await GoodsServer.getGoodsList().then(res => res.data.goodsList)
  return dispatch({
    type: types.GETGOODSLIST,
    goodsList
  })
}


export const getGoodsDetail = goodsId => async (dispatch) => {
  const goodsDetail = await GoodsServer.getGoodsDetail({ goodsId }).then(res => res.data.goods)
  if (goodsDetail) {
    goodsDetail.detail = goodsDetail.detail.replace(/\\/g, '')// 替换返回数据中的 反斜杠 转义字符
  }
  return dispatch({
    type: types.GETGOODSDETAIL,
    goodsDetail
  })
}




