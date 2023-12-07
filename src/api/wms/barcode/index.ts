import request from '@/config/axios'

export interface BarcodeVO {
  id: number
  barcode: string
  dataSource: string
  spec: string
  type: string
  area: string
  tray: string
  storage: string
  barcodeStatus: number
  formulaId: number
  formulaName: string
  formulaItemId: number
  formulaItemName: string
  ngSite: string
  retestMarkers: number
  channelIndex: number
  batchId: number
  remark: string
}

// 查询条码分页
export const getBarcodePage = async (params) => {
  return await request.get({ url: `/wms/barcode/page`, params })
}

// 查询条码详情
export const getBarcode = async (id: number) => {
  return await request.get({ url: `/wms/barcode/get?id=` + id })
}

// 新增条码
export const createBarcode = async (data: BarcodeVO) => {
  return await request.post({ url: `/wms/barcode/create`, data })
}

// 修改条码
export const updateBarcode = async (data: BarcodeVO) => {
  return await request.put({ url: `/wms/barcode/update`, data })
}

// 删除条码
export const deleteBarcode = async (id: number) => {
  return await request.delete({ url: `/wms/barcode/delete?id=` + id })
}

// 导出条码 Excel
export const exportBarcode = async (params) => {
  return await request.download({ url: `/wms/barcode/export-excel`, params })
}