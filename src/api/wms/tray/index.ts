import request from '@/config/axios'

export interface TrayVO {
  id: number
  trayNo: string
  type: number
  status: number
}

// 查询托盘分页
export const getTrayPage = async (params) => {
  return await request.get({ url: `/wms/tray/page`, params })
}

// 查询托盘详情
export const getTray = async (id: number) => {
  return await request.get({ url: `/wms/tray/get?id=` + id })
}

// 新增托盘
export const createTray = async (data: TrayVO) => {
  return await request.post({ url: `/wms/tray/create`, data })
}

// 修改托盘
export const updateTray = async (data: TrayVO) => {
  return await request.put({ url: `/wms/tray/update`, data })
}

// 删除托盘
export const deleteTray = async (id: number) => {
  return await request.delete({ url: `/wms/tray/delete?id=` + id })
}

// 导出托盘 Excel
export const exportTray = async (params) => {
  return await request.download({ url: `/wms/tray/export-excel`, params })
}