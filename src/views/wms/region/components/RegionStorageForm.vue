<template>
  <Dialog :title="dialogTitle" v-model="dialogVisible">
    <el-form
      ref="formRef"
      :model="formData"
      :rules="formRules"
      label-width="100px"
      v-loading="formLoading"
    >
      <el-form-item label="库位编号" prop="code">
        <el-input v-model="formData.code" placeholder="请输入库位编号" />
      </el-form-item>
      <el-form-item label="库位名称" prop="name">
        <el-input v-model="formData.name" placeholder="请输入库位名称" />
      </el-form-item>
      <el-form-item label="层" prop="line">
        <el-input v-model="formData.line" placeholder="请输入层" />
      </el-form-item>
      <el-form-item label="列" prop="row">
        <el-input v-model="formData.row" placeholder="请输入列" />
      </el-form-item>
      <el-form-item label="面" prop="face">
        <el-input v-model="formData.face" placeholder="请输入面" />
      </el-form-item>

       <el-form-item label="状态" prop="status">
        <el-select v-model="formData.status" placeholder="请选择状态">
          <el-option
            v-for="dict in getIntDictOptions(DICT_TYPE.WMS_STORAGE_STATUS)"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="消防通道" prop="fireChannel">
        <el-select v-model="formData.fireChannel" placeholder="请选择消防通道">
          <el-option
            v-for="dict in getIntDictOptions(DICT_TYPE.WMS_FIRE_CHANNEL)"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="特殊库位" prop="specialStorage">
        <el-select v-model="formData.specialStorage" placeholder="请选择特殊库位">
          <el-option
            v-for="dict in getIntDictOptions(DICT_TYPE.WMS_SPECIAL_STORAGE)"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="plc地址" prop="storageAddress">
        <el-input v-model="formData.storageAddress" placeholder="请输入plc地址" />
      </el-form-item>
      <el-form-item label="站点顺序" prop="doorOrder">
        <el-input v-model="formData.doorOrder" placeholder="请输入站点顺序" />
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
import { getIntDictOptions, DICT_TYPE } from '@/utils/dict'
import * as RegionApi from '@/api/wms/region'

const { t } = useI18n() // 国际化
const message = useMessage() // 消息弹窗

const dialogVisible = ref(false) // 弹窗的是否展示
const dialogTitle = ref('') // 弹窗的标题
const formLoading = ref(false) // 表单的加载中：1）修改时的数据加载；2）提交的按钮禁用
const formType = ref('') // 表单的类型：create - 新增；update - 修改
const formData = ref({
  id: undefined,
  code: undefined,
  name: undefined,
  line: undefined,
  row: undefined,
  face: undefined,
  remark: undefined,
  regionId: undefined,
  status: undefined,
  fireChannel: undefined,
  specialStorage: undefined,
  storageAddress: undefined,
  doorOrder: undefined,
})
const formRules = reactive({
  regionId: [{ required: true, message: '区域ID不能为空', trigger: 'blur' }],
  status: [{ required: true, message: '状态不能为空', trigger: 'change' }],
  fireChannel: [{ required: true, message: '消防通道不能为空', trigger: 'change' }],
  specialStorage: [{ required: true, message: '特殊库位不能为空', trigger: 'change' }],
})
const formRef = ref() // 表单 Ref

/** 打开弹窗 */
const open = async (type: string, id?: number, regionId: number) => {
  dialogVisible.value = true
  dialogTitle.value = t('action.' + type)
  formType.value = type
  resetForm()
  formData.value.regionId = regionId
  // 修改时，设置数据
  if (id) {
    formLoading.value = true
    try {
      formData.value = await RegionApi.getRegionStorage(id)
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
      await RegionApi.createRegionStorage(data)
      message.success(t('common.createSuccess'))
    } else {
      await RegionApi.updateRegionStorage(data)
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
    code: undefined,
    name: undefined,
    line: undefined,
    row: undefined,
    face: undefined,
    remark: undefined,
    regionId: undefined,
    status: undefined,
    fireChannel: undefined,
    specialStorage: undefined,
    storageAddress: undefined,
    doorOrder: undefined,
  }
  formRef.value?.resetFields()
}
</script>