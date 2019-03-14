import store from '@store'

import * as GoodsServer from '@API/goods'

import * as types from '@store/types/goodsTypes'

// 获取首页列表
export const getGoodsList = (pageNum, pageSize) => async (dispatch) => {
  const homeGoodsList = await GoodsServer.getGoodsList({ pageNum, pageSize }).then(res => res.data.goodsList)
  return dispatch({
    type: types.GETGOODSLIST,
    data: {
      homeGoodsList
    }
  })
}

// 获取分类列表
export const getClassifyGoodsList = (positionId, pageNum, pageSize = 10) => async dispatch => {
  const classifyGoodsList = await GoodsServer.coinsMallClassifyGoods({ positionId, pageNum, pageSize }).then(res => res.data.goodsList)
  return dispatch({
    type: types.GETCLASSIFYGOODSLIST,
    data: {
      classifyGoodsList,
      hasMoreGoods: pageSize <= classifyGoodsList.length,
      currentPage: pageNum
    }
  })
}

// 获取商品详情
export const getGoodsDetail = goodsId => async (dispatch) => {
  const goodsDetail = await GoodsServer.coinsMallGoodsDetail({ goodsId }).then(res => res.data.goods)
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
  const buttonStatus = await GoodsServer.coinsMallPreMakeOrderBtnStatus({ goodsId }).then(res => res.data.btnStatus)
  return dispatch({
    type: types.GETBUTTONSTATUS,
    buttonStatus: buttonStatus
  })
}

// 更新选中SKU信息

export const updateChoosedSkuInfo = choosedSkuInfo => store.dispatch({ type: types.UPDATECHOOSEDSKUINFO, choosedSkuInfo })



