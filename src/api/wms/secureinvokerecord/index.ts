import request from '@/config/axios'

export interface SecureInvokeRecordVO {
  id: number
  secureInvokeJson: string
  nextRetryTime: Date
  retryTimes: number
  maxRetryTimes: number
  failReason: string
  status: number
}

// 查询本地消息分页
export const getSecureInvokeRecordPage = async (params) => {
  return await request.get({ url: `/wms/secure-invoke-record/page`, params })
}

// 查询本地消息详情
export const getSecureInvokeRecord = async (id: number) => {
  return await request.get({ url: `/wms/secure-invoke-record/get?id=` + id })
}

// 新增本地消息
export const createSecureInvokeRecord = async (data: SecureInvokeRecordVO) => {
  return await request.post({ url: `/wms/secure-invoke-record/create`, data })
}

// 修改本地消息
export const updateSecureInvokeRecord = async (data: SecureInvokeRecordVO) => {
  return await request.put({ url: `/wms/secure-invoke-record/update`, data })
}

// 删除本地消息
export const deleteSecureInvokeRecord = async (id: number) => {
  return await request.delete({ url: `/wms/secure-invoke-record/delete?id=` + id })
}

// 导出本地消息 Excel
export const exportSecureInvokeRecord = async (params) => {
  return await request.download({ url: `/wms/secure-invoke-record/export-excel`, params })
}