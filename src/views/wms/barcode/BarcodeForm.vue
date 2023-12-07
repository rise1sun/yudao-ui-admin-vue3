<template>
  <Dialog :title="dialogTitle" v-model="dialogVisible">
    <el-form
      ref="formRef"
      :model="formData"
      :rules="formRules"
      label-width="100px"
      v-loading="formLoading"
    >
      <el-form-item label="条码号" prop="barcode">
        <el-input v-model="formData.barcode" placeholder="请输入条码号" />
      </el-form-item>
      <el-form-item label="数据来源" prop="dataSource">
        <el-select v-model="formData.dataSource" placeholder="请选择数据来源">
          <el-option
              v-for="dict in getIntDictOptions(DICT_TYPE.WMS_BARCODE_SOURCE)"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="规格型号" prop="spec">
        <el-input v-model="formData.spec" placeholder="请输入规格型号" />
      </el-form-item>
      <el-form-item label="类型" prop="type">
        <el-select v-model="formData.type" placeholder="请选择类型">
          <el-option v-for="dict in getIntDictOptions(DICT_TYPE.WMS_BARCODE_TYPE)"
                     :key="dict.value" :label="dict.label" :value="dict.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="库区" prop="area">
        <el-input v-model="formData.area" placeholder="请输入库区" />
      </el-form-item>
      <el-form-item label="托盘号" prop="tray">
        <el-input v-model="formData.tray" placeholder="请输入托盘号" />
      </el-form-item>
      <el-form-item label="库位" prop="storage">
        <el-input v-model="formData.storage" placeholder="请输入库位" />
      </el-form-item>
      <el-form-item label="条码状态" prop="barcodeStatus">
        <el-select v-model="formData.barcodeStatus" placeholder="请选择条码状态">
          <el-option
              v-for="dict in getIntDictOptions(DICT_TYPE.WMS_BARCODE_STATUS)"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
          /></el-select>
      </el-form-item>
      <el-form-item label="流程id" prop="formulaId">
        <el-input v-model="formData.formulaId" placeholder="请输入流程id" />
      </el-form-item>
      <el-form-item label="流程名称" prop="formulaName">
        <el-input v-model="formData.formulaName" placeholder="请输入流程名称" />
      </el-form-item>
      <el-form-item label="节点编号" prop="formulaItemId">
        <el-input v-model="formData.formulaItemId" placeholder="请输入节点编号" />
      </el-form-item>
      <el-form-item label="节点名称" prop="formulaItemName">
        <el-input v-model="formData.formulaItemName" placeholder="请输入节点名称" />
      </el-form-item>
      <el-form-item label="ng点位" prop="ngSite">
        <el-input v-model="formData.ngSite" placeholder="请输入ng点位" />
      </el-form-item>
      <el-form-item label="复测标记" prop="retestMarkers">
        <el-input v-model="formData.retestMarkers" placeholder="请输入复测标记" />
      </el-form-item>
      <el-form-item label="通道号" prop="channelIndex">
        <el-input v-model="formData.channelIndex" placeholder="请输入通道号" />
      </el-form-item>
      <el-form-item label="批次" prop="batchId">
        <el-input v-model="formData.batchId" placeholder="请输入批次" />
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="formData.remark" placeholder="请输入备注" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="submitForm" type="primary" :disabled="formLoading">确 定</el-button>
      <el-button @click="dialogVisible = false">取 消</el-button>
    </template>
  </Dialog>
</template>
<script setup lang="ts">
import * as BarcodeApi from '@/api/wms/barcode'
import { DICT_TYPE, getIntDictOptions } from '@/utils/dict'
const { t } = useI18n() // 国际化
const message = useMessage() // 消息弹窗

const dialogVisible = ref(false) // 弹窗的是否展示
const dialogTitle = ref('') // 弹窗的标题
const formLoading = ref(false) // 表单的加载中：1）修改时的数据加载；2）提交的按钮禁用
const formType = ref('') // 表单的类型：create - 新增；update - 修改
const formData = ref({
  id: undefined,
  barcode: undefined,
  dataSource: undefined,
  spec: undefined,
  type: undefined,
  area: undefined,
  tray: undefined,
  storage: undefined,
  barcodeStatus: undefined,
  formulaId: undefined,
  formulaName: undefined,
  formulaItemId: undefined,
  formulaItemName: undefined,
  ngSite: undefined,
  retestMarkers: undefined,
  channelIndex: undefined,
  batchId: undefined,
  remark: undefined,
})
const formRules = reactive({
  barcode: [{ required: true, message: '条码号不能为空', trigger: 'blur' }],
  dataSource: [{ required: true, message: '数据来源不能为空', trigger: 'change' }],
  type: [{ required: true, message: '类型不能为空', trigger: 'change' }],
  area: [{ required: true, message: '库区不能为空', trigger: 'blur' }],
  barcodeStatus: [{ required: true, message: '条码状态不能为空', trigger: 'change' }],
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
      formData.value = await BarcodeApi.getBarcode(id)
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
    const data = formData.value as unknown as BarcodeApi.BarcodeVO
    if (formType.value === 'create') {
      await BarcodeApi.createBarcode(data)
      message.success(t('common.createSuccess'))
    } else {
      await BarcodeApi.updateBarcode(data)
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
    barcode: undefined,
    dataSource: undefined,
    spec: undefined,
    type: undefined,
    area: undefined,
    tray: undefined,
    storage: undefined,
    barcodeStatus: undefined,
    formulaId: undefined,
    formulaName: undefined,
    formulaItemId: undefined,
    formulaItemName: undefined,
    ngSite: undefined,
    retestMarkers: undefined,
    channelIndex: undefined,
    batchId: undefined,
    remark: undefined,
  }
  formRef.value?.resetFields()
}
</script>