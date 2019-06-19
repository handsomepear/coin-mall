import req from '../common/js/http'

export const fetchCSJVideoStatus = data => req('/api/fetchCSJVideoStatus', data)