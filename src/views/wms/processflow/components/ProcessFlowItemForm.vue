<template>
  <Dialog :title="dialogTitle" v-model="dialogVisible">
    <el-form
      ref="formRef"
      :model="formData"
      :rules="formRules"
      label-width="100px"
      v-loading="formLoading"
    >
      <el-form-item label="序号" prop="serialNumber">
        <el-input v-model="formData.serialNumber" placeholder="请输入序号" />
      </el-form-item>
       <el-form-item label="节点名称" prop="name">
        <el-input v-model="formData.name" placeholder="请输入节点名称" />
      </el-form-item>
      <el-form-item label="静置时间" prop="settingTime">
        <el-input v-model="formData.settingTime" placeholder="输入静置时间" />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="formData.status" placeholder="请选择状态">
          <el-option
            v-for="dict in getIntDictOptions(DICT_TYPE.WMS_PROCESS_FLOW_ITEM_STATUS)"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
<!--      <el-form-item label="规则表id" prop="ruleId">
        <el-input v-model="formData.ruleId" placeholder="请输入规则表id" />
      </el-form-item>-->
    </el-form>
    <template #footer>
      <el-button @click="submitForm" type="primary" :disabled="formLoading">确 定</el-button>
      <el-button @click="dialogVisible = false">取 消</el-button>
    </template>
  </Dialog>
</template>
<script setup lang="ts">
import { getIntDictOptions, DICT_TYPE } from '@/utils/dict'
import * as ProcessFlowApi from '@/api/wms/processflow'

const { t } = useI18n() // 国际化
const message = useMessage() // 消息弹窗

const dialogVisible = ref(false) // 弹窗的是否展示
const dialogTitle = ref('') // 弹窗的标题
const formLoading = ref(false) // 表单的加载中：1）修改时的数据加载；2）提交的按钮禁用
const formType = ref('') // 表单的类型：create - 新增；update - 修改
const formData = ref({
  id: undefined,
  serialNumber: undefined,
  processFlowId: undefined,
  name: undefined,
  settingTime: undefined,
  status: undefined,
  ruleId: undefined,
})
const formRules = reactive({
  serialNumber: [{ required: true, message: '序号不能为空', trigger: 'blur' }],
  status: [{ required: true, message: '状态不能为空', trigger: 'change' }],
})
const formRef = ref() // 表单 Ref

/** 打开弹窗 */
const open = async (type: string, id?: number, processFlowId: number) => {
  dialogVisible.value = true
  dialogTitle.value = t('action.' + type)
  formType.value = type
  resetForm()
  formData.value.processFlowId = processFlowId
  // 修改时，设置数据
  if (id) {
    formLoading.value = true
    try {
      formData.value = await ProcessFlowApi.getProcessFlowItem(id)
    } finally {
      formLoading.value = false
    }
  }
}
defineExpose({ open }) // 提供 open 方法，用于打开弹窗

/** 提交表单 */
const emit = defineEmits(['success']) // 定义 success 事件，用于操作成功后的回调
const submitForm = async () => {
  // 校验表单
  await formRef.value.validate()
  // 提交请求
  formLoading.value = true
  try {
    const data = formData.value
    if (formType.value === 'create') {
      await ProcessFlowApi.createProcessFlowItem(data)
      message.success(t('common.createSuccess'))
    } else {
      await ProcessFlowApi.updateProcessFlowItem(data)
      message.success(t('common.updateSuccess'))
    }
    dialogVisible.value = false
    // 发送操作成功的事件
    emit('success')
  } finally {
    formLoading.value = false
  }
}

/** 重置表单 */
const resetForm = () => {
  formData.value = {
    id: undefined,
    serialNumber: undefined,
    processFlowId: undefined,
    name: undefined,
    settingTime: undefined,
    status: undefined,
    ruleId: undefined,
  }
  formRef.value?.resetFields()
}
</script>