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
      <el-form-item label="条码号" prop="barcode">
        <el-input
            v-model="queryParams.barcode"
            placeholder="请输入条码号"
            clearable
            @keyup.enter="handleQuery"
            class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="数据来源" prop="dataSource">
        <el-select
            v-model="queryParams.dataSource"
            placeholder="请选择数据来源"
            clearable
            class="!w-240px"
        >
          <el-option
              v-for="dict in getIntDictOptions(DICT_TYPE.WMS_BARCODE_SOURCE)"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
          />
        </el-select>
      </el-form-item>
<!--      <el-form-item label="规格型号" prop="spec">-->
<!--        <el-input-->
<!--            v-model="queryParams.spec"-->
<!--            placeholder="请输入规格型号"-->
<!--            clearable-->
<!--            @keyup.enter="handleQuery"-->
<!--            class="!w-240px"-->
<!--        />-->
<!--      </el-form-item>-->
      <el-form-item label="类型" prop="type">
        <el-select
            v-model="queryParams.type"
            placeholder="请选择类型"
            clearable
            class="!w-240px"
        >
          <el-option
              v-for="dict in getIntDictOptions(DICT_TYPE.WMS_BARCODE_TYPE)"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="库区" prop="area">
        <el-input
            v-model="queryParams.area"
            placeholder="请输入库区"
            clearable
            @keyup.enter="handleQuery"
            class="!w-240px"
        />
      </el-form-item>
      <el-form-item label="托盘号" prop="tray">
        <el-input
            v-model="queryParams.tray"
            placeholder="请输入托盘号"
            clearable
            @keyup.enter="handleQuery"
            class="!w-240px"
        />
      </el-form-item>
<!--      <el-form-item label="库位" prop="storage">-->
<!--        <el-input-->
<!--            v-model="queryParams.storage"-->
<!--            placeholder="请输入库位"-->
<!--            clearable-->
<!--            @keyup.enter="handleQuery"-->
<!--            class="!w-240px"-->
<!--        />-->
<!--      </el-form-item>-->
      <el-form-item label="条码状态" prop="barcodeStatus">
        <el-select
            v-model="queryParams.barcodeStatus"
            placeholder="请选择条码状态"
            clearable
            class="!w-240px"
        >
          <el-option
              v-for="dict in getIntDictOptions(DICT_TYPE.WMS_BARCODE_STATUS)"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
          />
        </el-select>
      </el-form-item>
<!--      <el-form-item label="流程名称" prop="formulaName">-->
<!--        <el-input-->
<!--            v-model="queryParams.formulaName"-->
<!--            placeholder="请输入流程名称"-->
<!--            clearable-->
<!--            @keyup.enter="handleQuery"-->
<!--            class="!w-240px"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="节点名称" prop="formulaItemName">-->
<!--        <el-input-->
<!--            v-model="queryParams.formulaItemName"-->
<!--            placeholder="请输入节点名称"-->
<!--            clearable-->
<!--            @keyup.enter="handleQuery"-->
<!--            class="!w-240px"-->
<!--        />-->
<!--      </el-form-item>-->
      <!--      <el-form-item label="ng点位" prop="ngSite">-->
      <!--        <el-input-->
      <!--          v-model="queryParams.ngSite"-->
      <!--          placeholder="请输入ng点位"-->
      <!--          clearable-->
      <!--          @keyup.enter="handleQuery"-->
      <!--          class="!w-240px"-->
      <!--        />-->
      <!--      </el-form-item>-->
<!--      <el-form-item label="复测标记" prop="retestMarkers">-->
<!--        <el-input-->
<!--            v-model="queryParams.retestMarkers"-->
<!--            placeholder="请输入复测标记"-->
<!--            clearable-->
<!--            @keyup.enter="handleQuery"-->
<!--            class="!w-240px"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="通道号" prop="channelIndex">-->
<!--        <el-input-->
<!--            v-model="queryParams.channelIndex"-->
<!--            placeholder="请输入通道号"-->
<!--            clearable-->
<!--            @keyup.enter="handleQuery"-->
<!--            class="!w-240px"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="批次" prop="batchId">-->
<!--        <el-input-->
<!--            v-model="queryParams.batchId"-->
<!--            placeholder="请输入批次"-->
<!--            clearable-->
<!--            @keyup.enter="handleQuery"-->
<!--            class="!w-240px"-->
<!--        />-->
<!--      </el-form-item>-->
      <!--      <el-form-item label="备注" prop="remark">-->
      <!--        <el-input-->
      <!--          v-model="queryParams.remark"-->
      <!--          placeholder="请输入备注"-->
      <!--          clearable-->
      <!--          @keyup.enter="handleQuery"-->
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
        <el-button @click="handleQuery">
          <Icon icon="ep:search" class="mr-5px"/>
          搜索
        </el-button>
        <el-button @click="resetQuery">
          <Icon icon="ep:refresh" class="mr-5px"/>
          重置
        </el-button>
        <el-button
            type="primary"
            plain
            @click="openForm('create')"
            v-hasPermi="['wms:barcode:create']"
        >
          <Icon icon="ep:plus" class="mr-5px"/>
          新增
        </el-button>
        <el-button
            type="success"
            plain
            @click="handleExport"
            :loading="exportLoading"
            v-hasPermi="['wms:barcode:export']"
        >
          <Icon icon="ep:download" class="mr-5px"/>
          导出
        </el-button>
      </el-form-item>
    </el-form>
  </ContentWrap>

  <!-- 列表 -->
  <ContentWrap>
    <el-table v-loading="loading" :data="list" :stripe="true" :show-overflow-tooltip="true">
<!--      <el-table-column label="条码id" align="center" prop="id"/>-->
      <el-table-column label="条码号" align="center" prop="barcode"/>
      <el-table-column label="数据来源" align="center" prop="dataSource" width="80px">
        <template v-slot="scope">
          <dict-tag :type="DICT_TYPE.WMS_BARCODE_SOURCE" :value="scope.row.dataSource"/>
        </template>
      </el-table-column>
      <el-table-column label="规格型号" align="center" prop="spec"/>
      <el-table-column label="类型" align="center" prop="type" width="80px">
        <template v-slot="scope">
          <dict-tag :type="DICT_TYPE.WMS_BARCODE_TYPE" :value="scope.row.type"/>
        </template>
      </el-table-column>
      <el-table-column label="库区" align="center" prop="area"/>
      <el-table-column label="托盘号" align="center" prop="tray"/>
      <el-table-column label="库位" align="center" prop="storage"/>
      <el-table-column label="条码状态" align="center" prop="barcodeStatus">
        <template v-slot="scope">
          <dict-tag :type="DICT_TYPE.WMS_BARCODE_STATUS" :value="scope.row.barcodeStatus"/>
        </template>
      </el-table-column>
<!--      <el-table-column label="流程id" align="center" prop="formulaId"/>-->
      <el-table-column label="流程名称" align="center" prop="formulaName"/>
<!--      <el-table-column label="节点编号" align="center" prop="formulaItemId"/>-->
      <el-table-column label="节点名称" align="center" prop="formulaItemName"/>
      <el-table-column label="ng点位" align="center" prop="ngSite"/>
      <el-table-column label="复测标记" align="center" prop="retestMarkers"/>
      <el-table-column label="通道号" align="center" prop="channelIndex"/>
      <el-table-column label="批次" align="center" prop="batchId"/>
      <el-table-column label="备注" align="center" prop="remark"/>
      <el-table-column
          label="创建时间"
          align="center"
          prop="createTime"
          :formatter="dateFormatter"
          width="180px"
      />
      <el-table-column label="操作" align="center" width="115px" >
        <template #default="scope">
          <el-button
              link
              type="primary"
              @click="openForm('update', scope.row.id)"
              v-hasPermi="['wms:barcode:update']"
          >
            编辑
          </el-button>
          <el-button
              link
              type="danger"
              @click="handleDelete(scope.row.id)"
              v-hasPermi="['wms:barcode:delete']"
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
  <BarcodeForm ref="formRef" @success="getList"/>
</template>

<script setup lang="ts">
import { DICT_TYPE, getIntDictOptions } from '@/utils/dict'
import {dateFormatter} from '@/utils/formatTime'
import download from '@/utils/download'
import * as BarcodeApi from '@/api/wms/barcode'
import BarcodeForm from './BarcodeForm.vue'

defineOptions({name: 'Barcode'})

const message = useMessage() // 消息弹窗
const {t} = useI18n() // 国际化

const loading = ref(true) // 列表的加载中
const list = ref([]) // 列表的数据
const total = ref(0) // 列表的总页数
const queryParams = reactive({
  pageNo: 1,
  pageSize: 10,
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
  createTime: [],
})
const queryFormRef = ref() // 搜索的表单
const exportLoading = ref(false) // 导出的加载中

/** 查询列表 */
const getList = async () => {
  loading.value = true
  try {
    const data = await BarcodeApi.getBarcodePage(queryParams)
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
    await BarcodeApi.deleteBarcode(id)
    message.success(t('common.delSuccess'))
    // 刷新列表
    await getList()
  } catch {
  }
}

/** 导出按钮操作 */
const handleExport = async () => {
  try {
    // 导出的二次确认
    await message.exportConfirm()
    // 发起导出
    exportLoading.value = true
    const data = await BarcodeApi.exportBarcode(queryParams)
    download.excel(data, '条码.xls')
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