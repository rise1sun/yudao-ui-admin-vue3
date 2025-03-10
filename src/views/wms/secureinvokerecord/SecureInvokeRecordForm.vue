<template>
  <Dialog :title="dialogTitle" v-model="dialogVisible">
    <el-form
      ref="formRef"
      :model="formData"
      :rules="formRules"
      label-width="100px"
      v-loading="formLoading"
    >
      <el-form-item label="快照参数" prop="secureInvokeJson">
        <el-input v-model="formData.secureInvokeJson" placeholder="请输入快照参数" />
      </el-form-item>
      <el-form-item label="下次时间" prop="nextRetryTime">
        <el-date-picker
          v-model="formData.nextRetryTime"
          type="date"
          value-format="x"
          placeholder="选择下次重试时间"
        />
      </el-form-item>
      <el-form-item label="已重试次数" prop="retryTimes">
        <el-input v-model="formData.retryTimes" placeholder="请输入已重试次数" />
      </el-form-item>
      <el-form-item label="最大次数" prop="maxRetryTimes">
        <el-input v-model="formData.maxRetryTimes" placeholder="请输入最大重试次数" />
      </el-form-item>
      <el-form-item label="失败信息" prop="failReason">
        <el-input v-model="formData.failReason" placeholder="请输入失败信息" />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="formData.status" placeholder="请选择状态">
          <el-option
            v-for="dict in getIntDictOptions(DICT_TYPE.WMS_INVOKE_RECODE_STATUS)"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="submitForm" type="primary" :disabled="formLoading">确 定</el-button>
      <el-button @click="dialogVisible = false">取 消</el-button>
    </template>
  </Dialog>
</template>
<script setup lang="ts">
import { getIntDictOptions, DICT_TYPE } from '@/utils/dict'
import * as SecureInvokeRecordApi from '@/api/wms/secureinvokerecord'

const { t } = useI18n() // 国际化
const message = useMessage() // 消息弹窗

const dialogVisible = ref(false) // 弹窗的是否展示
const dialogTitle = ref('') // 弹窗的标题
const formLoading = ref(false) // 表单的加载中：1）修改时的数据加载；2）提交的按钮禁用
const formType = ref('') // 表单的类型：create - 新增；update - 修改
const formData = ref({
  id: undefined,
  secureInvokeJson: undefined,
  nextRetryTime: undefined,
  retryTimes: undefined,
  maxRetryTimes: undefined,
  failReason: undefined,
  status: undefined,
})
const formRules = reactive({
  secureInvokeJson: [{ required: true, message: '快照参数不能为空', trigger: 'blur' }],
  nextRetryTime: [{ required: true, message: '下次重试时间不能为空', trigger: 'blur' }],
  retryTimes: [{ required: true, message: '已重试次数不能为空', trigger: 'blur' }],
  maxRetryTimes: [{ required: true, message: '最大重试次数不能为空', trigger: 'blur' }],
  status: [{ required: true, message: '状态不能为空', trigger: 'change' }],
})
const formRef = ref() // 表单 Ref

/** 打开弹窗 */
const open = async (type: string, id?: number) => {
  dialogVisible.value = true
  dialogTitle.value = t('action.' + type)
  formType.value = type
  resetForm()
  // 修改时，设置数据
  if (id) {
    formLoading.value = true
    try {
      formData.value = await SecureInvokeRecordApi.getSecureInvokeRecord(id)
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
    const data = formData.value as unknown as SecureInvokeRecordApi.SecureInvokeRecordVO
    if (formType.value === 'create') {
      await SecureInvokeRecordApi.createSecureInvokeRecord(data)
      message.success(t('common.createSuccess'))
    } else {
      await SecureInvokeRecordApi.updateSecureInvokeRecord(data)
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
    secureInvokeJson: undefined,
    nextRetryTime: undefined,
    retryTimes: undefined,
    maxRetryTimes: undefined,
    failReason: undefined,
    status: undefined,
  }
  formRef.value?.resetFields()
}
</script>