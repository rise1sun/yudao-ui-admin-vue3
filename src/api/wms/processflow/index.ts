import request from '@/config/axios'

export interface ProcessFlowVO {
  id: number
  name: string
  status: number
  type: number
  description: string
}

// 查询工艺流程表分页
export const getProcessFlowPage = async (params) => {
  return await request.get({ url: `/wms/process-flow/page`, params })
}

// 查询工艺流程表详情
export const getProcessFlow = async (id: number) => {
  return await request.get({ url: `/wms/process-flow/get?id=` + id })
}

// 新增工艺流程表
export const createProcessFlow = async (data: ProcessFlowVO) => {
  return await request.post({ url: `/wms/process-flow/create`, data })
}

// 修改工艺流程表
export const updateProcessFlow = async (data: ProcessFlowVO) => {
  return await request.put({ url: `/wms/process-flow/update`, data })
}

// 删除工艺流程表
export const deleteProcessFlow = async (id: number) => {
  return await request.delete({ url: `/wms/process-flow/delete?id=` + id })
}

// 导出工艺流程表 Excel
export const exportProcessFlow = async (params) => {
  return await request.download({ url: `/wms/process-flow/export-excel`, params })
}

// ==================== 子表（工艺流程表） ====================

// 获得工艺流程表分页
export const getProcessFlowItemPage = async (params) => {
  return await request.get({ url: `/wms/process-flow/process-flow-item/page`, params })
}
// 新增工艺流程表
export const createProcessFlowItem = async (data) => {
  return await request.post({ url: `/wms/process-flow/process-flow-item/create`, data })
}

// 修改工艺流程表
export const updateProcessFlowItem = async (data) => {
  return await request.put({ url: `/wms/process-flow/process-flow-item/update`, data })
}

// 删除工艺流程表
export const deleteProcessFlowItem = async (id: number) => {
  return await request.delete({ url: `/wms/process-flow/process-flow-item/delete?id=` + id })
}

// 获得工艺流程表
export const getProcessFlowItem = async (id: number) => {
  return await request.get({ url: `/wms/process-flow/process-flow-item/get?id=` + id })
}