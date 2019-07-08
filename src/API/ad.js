import req from '../common/js/http'

export const fetchCSJVideoStatus = data => req('/api/fetchCSJVideoStatus', data)

export const fetchInteractiveAdList = data => req('/api/fetchInteractiveAdList', data)

export const reportInteractiveAdAction = data => req('/api/reportInteractiveAdAction', data)