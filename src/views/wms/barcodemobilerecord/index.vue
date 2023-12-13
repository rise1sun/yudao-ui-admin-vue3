<template>
  <ContentWrap>
    <!-- 搜索工作栏 -->
    <el-form
      class="-mb-15px"
      :model="queryParams"
      ref="queryFormRef"
      :inline="true"
      label-width="68px"
    >
      <el-form-item label="托盘号" prop="trayNo">
        <el-input
          v-model="queryParams.trayNo"
          placeholder="请输入托盘号"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="组托编号" prop="suNo">
        <el-input
          v-model="queryParams.suNo"
          placeholder="请输入组托编号"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
<!--      <el-form-item label="条码号" prop="barcode">-->
<!--        <el-input-->
<!--          v-model="queryParams.barcode"-->
<!--          placeholder="请输入条码号"-->
<!--          clearable-->
<!--          @keyup.enter="handleQuery"-->
<!--          class="!w-240px"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="数量" prop="number">-->
<!--        <el-input-->
<!--          v-model="queryParams.number"-->
<!--          placeholder="请输入数量"-->
<!--          clearable-->
<!--          @keyup.enter="handleQuery"-->
<!--          class="!w-240px"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="规格型号" prop="spec">-->
<!--        <el-input-->
<!--          v-model="queryParams.spec"-->
<!--          placeholder="请输入规格/型号"-->
<!--          clearable-->
<!--          @keyup.enter="handleQuery"-->
<!--          class="!w-240px"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="批次" prop="batch">-->
<!--        <el-input-->
<!--          v-model="queryParams.batch"-->
<!--          placeholder="请输入批次"-->
<!--          clearable-->
<!--          @keyup.enter="handleQuery"-->
<!--          class="!w-240px"-->
<!--        />-->
<!--      </el-form-item>-->
      <el-form-item label="库区" prop="region">
        <el-input
          v-model="queryParams.region"
          placeholder="请输入库区"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="储位" prop="storage">
        <el-input
          v-model="queryParams.storage"
          placeholder="请输入储位"
          clearable
          @keyup.enter="handleQuery"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="条码状态" prop="barcodeStatus">
        <el-select
          v-model="queryParams.barcodeStatus"
          placeholder="请选择条码状态"
          clearable
          class="!w-240px"
        >
          <el-option
            v-for="dict in getStrDictOptions(DICT_TYPE.WMS_BARCODE_STATUS)"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="移动类型" prop="moveType">
        <el-select
          v-model="queryParams.moveType"
          placeholder="请选择移动类型"
          clearable
          class="!w-240px"
        >
          <el-option
            v-for="dict in getStrDictOptions(DICT_TYPE.WMS_MOVE_TYPE)"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
<!--      <el-form-item label="备注" prop="remark">-->
<!--        <el-input-->
<!--          v-model="queryParams.remark"-->
<!--          placeholder="请输入备注"-->
<!--          clearable-->
<!--          @keyup.enter="handleQuery"-->
<!--          class="!w-240px"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="静置时间" prop="restTime">-->
<!--        <el-date-picker-->
<!--          v-model="queryParams.restTime"-->
<!--          value-format="YYYY-MM-DD HH:mm:ss"-->
<!--          type="daterange"-->
<!--          start-placeholder="开始日期"-->
<!--          end-placeholder="结束日期"-->
<!--          :default-time="[new Date('1 00:00:00'), new Date('1 23:59:59')]"-->
<!--          class="!w-240px"-->
<!--        />-->
<!--      </el-form-item>-->
      <el-form-item label="创建时间" prop="createTime">
        <el-date-picker
          v-model="queryParams.createTime"
          value-format="YYYY-MM-DD HH:mm:ss"
          type="daterange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="[new Date('1 00:00:00'), new Date('1 23:59:59')]"
          class="!w-240px"
        />
      </el-form-item>
      <el-form-item>
        <el-button @click="handleQuery"><Icon icon="ep:search" class="mr-5px" /> 搜索</el-button>
        <el-button @click="resetQuery"><Icon icon="ep:refresh" class="mr-5px" /> 重置</el-button>
        <el-button
          type="primary"
          plain
          @click="openForm('create')"
          v-hasPermi="['wms:barcode-mobile-record:create']"
        >
          <Icon icon="ep:plus" class="mr-5px" /> 新增
        </el-button>
        <el-button
          type="success"
          plain
          @click="handleExport"
          :loading="exportLoading"
          v-hasPermi="['wms:barcode-mobile-record:export']"
        >
          <Icon icon="ep:download" class="mr-5px" /> 导出
        </el-button>
      </el-form-item>
    </el-form>
  </ContentWrap>

  <!-- 列表 -->
  <ContentWrap>
    <el-table v-loading="loading" :data="list" :stripe="true" :show-overflow-tooltip="true">
      <el-table-column label="主键" align="center" prop="id" />
      <el-table-column label="托盘号" align="center" prop="trayNo" />
      <el-table-column label="组托编号" align="center" prop="suNo" />
      <el-table-column label="条码号" align="center" prop="barcode" />
      <el-table-column label="数量" align="center" prop="number" />
      <el-table-column label="规格/型号" align="center" prop="spec" />
      <el-table-column label="批次" align="center" prop="batch" />
      <el-table-column label="库区" align="center" prop="region" />
      <el-table-column label="储位" align="center" prop="storage" />
      <el-table-column label="条码状态" align="center" prop="barcodeStatus">
        <template #default="scope">
          <dict-tag :type="DICT_TYPE.WMS_BARCODE_STATUS" :value="scope.row.barcodeStatus" />
        </template>
      </el-table-column>
      <el-table-column label="移动类型" align="center" prop="moveType">
        <template #default="scope">
          <dict-tag :type="DICT_TYPE.WMS_MOVE_TYPE" :value="scope.row.moveType" />
        </template>
      </el-table-column>
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column label="静置时间" align="center" prop="restTime" />
      <el-table-column
        label="创建时间"
        align="center"
        prop="createTime"
        :formatter="dateFormatter"
        width="180px"
      />
      <el-table-column label="操作" align="center" width="110px">
        <template #default="scope">
          <el-button
            link
            type="primary"
            @click="openForm('update', scope.row.id)"
            v-hasPermi="['wms:barcode-mobile-record:update']"
          >
            编辑
          </el-button>
          <el-button
            link
            type="danger"
            @click="handleDelete(scope.row.id)"
            v-hasPermi="['wms:barcode-mobile-record:delete']"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <Pagination
      :total="total"
      v-model:page="queryParams.pageNo"
      v-model:limit="queryParams.pageSize"
      @pagination="getList"
    />
  </ContentWrap>

  <!-- 表单弹窗：添加/修改 -->
  <BarcodeMobileRecordForm ref="formRef" @success="getList" />
</template>

<script setup lang="ts">
import { getStrDictOptions, DICT_TYPE } from '@/utils/dict'
import { dateFormatter } from '@/utils/formatTime'
import download from '@/utils/download'
import * as BarcodeMobileRecordApi from '@/api/wms/barcodemobilerecord'
import BarcodeMobileRecordForm from './BarcodeMobileRecordForm.vue'

defineOptions({ name: 'BarcodeMobileRecord' })

const message = useMessage() // 消息弹窗
const { t } = useI18n() // 国际化

const loading = ref(true) // 列表的加载中
const list = ref([]) // 列表的数据
const total = ref(0) // 列表的总页数
const queryParams = reactive({
  pageNo: 1,
  pageSize: 10,
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
  restTime: [],
  createTime: [],
})
const queryFormRef = ref() // 搜索的表单
const exportLoading = ref(false) // 导出的加载中

/** 查询列表 */
const getList = async () => {
  loading.value = true
  try {
    const data = await BarcodeMobileRecordApi.getBarcodeMobileRecordPage(queryParams)
    list.value = data.list
    total.value = data.total
  } finally {
    loading.value = false
  }
}

/** 搜索按钮操作 */
const handleQuery = () => {
  queryParams.pageNo = 1
  getList()
}

/** 重置按钮操作 */
const resetQuery = () => {
  queryFormRef.value.resetFields()
  handleQuery()
}

/** 添加/修改操作 */
const formRef = ref()
const openForm = (type: string, id?: number) => {
  formRef.value.open(type, id)
}

/** 删除按钮操作 */
const handleDelete = async (id: number) => {
  try {
    // 删除的二次确认
    await message.delConfirm()
    // 发起删除
    await BarcodeMobileRecordApi.deleteBarcodeMobileRecord(id)
    message.success(t('common.delSuccess'))
    // 刷新列表
    await getList()
  } catch {}
}

/** 导出按钮操作 */
const handleExport = async () => {
  try {
    // 导出的二次确认
    await message.exportConfirm()
    // 发起导出
    exportLoading.value = true
    const data = await BarcodeMobileRecordApi.exportBarcodeMobileRecord(queryParams)
    download.excel(data, '条码移动记录.xls')
  } catch {
  } finally {
    exportLoading.value = false
  }
}

/** 初始化 **/
onMounted(() => {
  getList()
})
</script>