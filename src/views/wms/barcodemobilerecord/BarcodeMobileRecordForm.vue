<template>
  <Dialog :title="dialogTitle" v-model="dialogVisible">
    <el-form
      ref="formRef"
      :model="formData"
      :rules="formRules"
      label-width="100px"
      v-loading="formLoading"
    >
      <el-form-item label="托盘号" prop="trayNo">
        <el-input v-model="formData.trayNo" placeholder="请输入托盘号" />
      </el-form-item>
      <el-form-item label="组托编号" prop="suNo">
        <el-input v-model="formData.suNo" placeholder="请输入组托编号" />
      </el-form-item>
      <el-form-item label="条码号" prop="barcode">
        <el-input v-model="formData.barcode" placeholder="请输入条码号" />
      </el-form-item>
      <el-form-item label="数量" prop="number">
        <el-input v-model="formData.number" placeholder="请输入数量" />
      </el-form-item>
      <el-form-item label="规格/型号" prop="spec">
        <el-input v-model="formData.spec" placeholder="请输入规格/型号" />
      </el-form-item>
      <el-form-item label="批次" prop="batch">
        <el-input v-model="formData.batch" placeholder="请输入批次" />
      </el-form-item>
      <el-form-item label="库区" prop="region">
        <el-input v-model="formData.region" placeholder="请输入库区" />
      </el-form-item>
      <el-form-item label="储位" prop="storage">
        <el-input v-model="formData.storage" placeholder="请输入储位" />
      </el-form-item>
      <el-form-item label="条码状态" prop="barcodeStatus">
        <el-select v-model="formData.barcodeStatus" placeholder="请选择条码状态">
          <el-option
            v-for="dict in getStrDictOptions(DICT_TYPE.WMS_BARCODE_STATUS)"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="移动类型" prop="moveType">
        <el-select v-model="formData.moveType" placeholder="请选择移动类型">
          <el-option
            v-for="dict in getStrDictOptions(DICT_TYPE.WMS_MOVE_TYPE)"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="formData.remark" placeholder="请输入备注" />
      </el-form-item>
      <el-form-item label="静置时间" prop="restTime">
        <el-input v-model="formData.restTime" placeholder="请输入静置长" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="submitForm" type="primary" :disabled="formLoading">确 定</el-button>
      <el-button @click="dialogVisible = false">取 消</el-button>
    </template>
  </Dialog>
</template>
<script setup lang="ts">
import { getStrDictOptions, DICT_TYPE } from '@/utils/dict'
import * as BarcodeMobileRecordApi from '@/api/wms/barcodemobilerecord'

const { t } = useI18n() // 国际化
const message = useMessage() // 消息弹窗

const dialogVisible = ref(false) // 弹窗的是否展示
const dialogTitle = ref('') // 弹窗的标题
const formLoading = ref(false) // 表单的加载中：1）修改时的数据加载；2）提交的按钮禁用
const formType = ref('') // 表单的类型：create - 新增；update - 修改
const formData = ref({
  id: undefined,
  trayNo: undefined,
  suNo: undefined,
  barcode: undefined,
  number: undefined,
  spec: undefined,
  batch: undefined,
  region: undefined,
  storage: undefined,
  barcodeStatus: undefined,
  moveType: undefined,
  remark: undefined,
  restTime: undefined,
})
const formRules = reactive({
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
      formData.value = await BarcodeMobileRecordApi.getBarcodeMobileRecord(id)
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
    const data = formData.value as unknown as BarcodeMobileRecordApi.BarcodeMobileRecordVO
    if (formType.value === 'create') {
      await BarcodeMobileRecordApi.createBarcodeMobileRecord(data)
      message.success(t('common.createSuccess'))
    } else {
      await BarcodeMobileRecordApi.updateBarcodeMobileRecord(data)
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
    trayNo: undefined,
    suNo: undefined,
    barcode: undefined,
    number: undefined,
    spec: undefined,
    batch: undefined,
    region: undefined,
    storage: undefined,
    barcodeStatus: undefined,
    moveType: undefined,
    remark: undefined,
    restTime: undefined,
  }
  formRef.value?.resetFields()
}
</script>