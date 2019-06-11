

import req from '@common/js/http'

export const coinsMallOrderUserInfo = () => req('/api/coinsMallOrderUserInfo')

export const saveAddress = data => req('/api/coinsMallAddUserAddress', data) // 保存地址

