import request from '@/config/axios'

export interface RegionVO {
  id: number
  name: string
  prefix: string
}

// 查询库位管理分页
export const getRegionPage = async (params) => {
  return await request.get({ url: `/wms/region/page`, params })
}

// 查询库位管理详情
export const getRegion = async (id: number) => {
  return await request.get({ url: `/wms/region/get?id=` + id })
}

// 新增库位管理
export const createRegion = async (data: RegionVO) => {
  return await request.post({ url: `/wms/region/create`, data })
}

// 修改库位管理
export const updateRegion = async (data: RegionVO) => {
  return await request.put({ url: `/wms/region/update`, data })
}

// 删除库位管理
export const deleteRegion = async (id: number) => {
  return await request.delete({ url: `/wms/region/delete?id=` + id })
}

// 导出库位管理 Excel
export const exportRegion = async (params) => {
  return await request.download({ url: `/wms/region/export-excel`, params })
}

// ==================== 子表（库位） ====================

// 获得库位分页
export const getRegionStoragePage = async (params) => {
  return await request.get({ url: `/wms/region/region-storage/page`, params })
}
// 新增库位
export const createRegionStorage = async (data) => {
  return await request.post({ url: `/wms/region/region-storage/create`, data })
}

// 修改库位
export const updateRegionStorage = async (data) => {
  return await request.put({ url: `/wms/region/region-storage/update`, data })
}

// 删除库位
export const deleteRegionStorage = async (id: number) => {
  return await request.delete({ url: `/wms/region/region-storage/delete?id=` + id })
}

// 获得库位
export const getRegionStorage = async (id: number) => {
  return await request.get({ url: `/wms/region/region-storage/get?id=` + id })
}