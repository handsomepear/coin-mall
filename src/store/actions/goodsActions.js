import * as GoodsServer from '@API/goods'

import * as types from '@store/types/goodTypes'

// 获取首页列表
export const getGoodsList = (pageNum, pageSize) => async (dispatch) => {
  const goodsList = await GoodsServer.getGoodsList().then(res => res.data.goodsList)
  return dispatch({
    type: types.GETGOODSLIST,
    goodsList
  })
}

// 获取分类列表


// 获取商品详情
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

// 获取按钮状态
export const getBtnStatus = goodsId => async dispatch => {
  const buttonStatus = GoodsServer.coinsMallPreMakeOrderBtnStatus({goodsId}).then(res => res.data.btnStatus)
  return dispatch({
    type: types.GETBUTTONSTATUS,
    buttonStatus: buttonStatus
  })
}




