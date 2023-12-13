import request from '@/config/axios'

export interface BarcodeMobileRecordVO {
  id: number
  trayNo: string
  suNo: string
  barcode: string
  number: number
  spec: string
  batch: string
  region: string
  storage: string
  barcodeStatus: string
  moveType: string
  remark: string
  restTime: string
}

// 查询条码移动记录分页
export const getBarcodeMobileRecordPage = async (params) => {
  return await request.get({ url: `/wms/barcode-mobile-record/page`, params })
}

// 查询条码移动记录详情
export const getBarcodeMobileRecord = async (id: number) => {
  return await request.get({ url: `/wms/barcode-mobile-record/get?id=` + id })
}

// 新增条码移动记录
export const createBarcodeMobileRecord = async (data: BarcodeMobileRecordVO) => {
  return await request.post({ url: `/wms/barcode-mobile-record/create`, data })
}

// 修改条码移动记录
export const updateBarcodeMobileRecord = async (data: BarcodeMobileRecordVO) => {
  return await request.put({ url: `/wms/barcode-mobile-record/update`, data })
}

// 删除条码移动记录
export const deleteBarcodeMobileRecord = async (id: number) => {
  return await request.delete({ url: `/wms/barcode-mobile-record/delete?id=` + id })
}

// 导出条码移动记录 Excel
export const exportBarcodeMobileRecord = async (params) => {
  return await request.download({ url: `/wms/barcode-mobile-record/export-excel`, params })
}