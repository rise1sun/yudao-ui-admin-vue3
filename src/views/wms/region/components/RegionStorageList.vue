<template>
  <!-- 列表 -->
  <ContentWrap>
    <el-button
      type="primary"
      plain
      @click="openForm('create')"
      v-hasPermi="['wms:region:create']"
    >
      <Icon icon="ep:plus" class="mr-5px" /> 新增
    </el-button>
    <el-table v-loading="loading" :data="list" :stripe="true" :show-overflow-tooltip="true">
      <el-table-column label="id" align="center" prop="id" />
      <el-table-column label="库位编号" align="center" prop="code" />
      <el-table-column label="库位名称" align="center" prop="name" />
      <el-table-column label="层" align="center" prop="line" />
      <el-table-column label="列" align="center" prop="row" />
      <el-table-column label="面" align="center" prop="face" />


       <el-table-column label="状态" align="center" prop="status">
        <template #default="scope">
          <dict-tag :type="DICT_TYPE.WMS_STORAGE_STATUS" :value="scope.row.status" />
        </template>
      </el-table-column>
      <el-table-column label="消防通道" align="center" prop="fireChannel">
        <template #default="scope">
          <dict-tag :type="DICT_TYPE.WMS_FIRE_CHANNEL" :value="scope.row.fireChannel" />
        </template>
      </el-table-column>
      <el-table-column label="特殊库位" align="center" prop="specialStorage">
        <template #default="scope">
          <dict-tag :type="DICT_TYPE.WMS_SPECIAL_STORAGE" :value="scope.row.specialStorage" />
        </template>
      </el-table-column>
      <el-table-column label="plc地址" align="center" prop="storageAddress" />
      <el-table-column label="站点顺序" align="center" prop="doorOrder" />
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column
          label="创建时间"
          align="center"
          prop="createTime"
          :formatter="dateFormatter"
          width="180px"
      />
      <el-table-column label="操作" align="center">
        <template #default="scope">
          <el-button
            link
            type="primary"
            @click="openForm('update', scope.row.id)"
            v-hasPermi="['wms:region:update']"
          >
            编辑
          </el-button>
          <el-button
            link
            type="danger"
            @click="handleDelete(scope.row.id)"
            v-hasPermi="['wms:region:delete']"
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
    <RegionStorageForm ref="formRef" @success="getList" />
</template>
<script setup lang="ts">
import { DICT_TYPE } from '@/utils/dict'
import { dateFormatter } from '@/utils/formatTime'
import * as RegionApi from '@/api/wms/region'
import RegionStorageForm from './RegionStorageForm.vue'

const { t } = useI18n() // 国际化
const message = useMessage() // 消息弹窗

const props = defineProps<{
  regionId: undefined // 区域ID（主表的关联字段）
}>()
const loading = ref(false) // 列表的加载中
const list = ref([]) // 列表的数据
const total = ref(0) // 列表的总页数
const queryParams = reactive({
  pageNo: 1,
  pageSize: 10,
  regionId: undefined
})

/** 监听主表的关联字段的变化，加载对应的子表数据 */
watch(
  () => props.regionId,
  (val) => {
    queryParams.regionId = val
    handleQuery()
  },
  { immediate: false }
)

/** 查询列表 */
const getList = async () => {
  loading.value = true
  try {
    const data = await RegionApi.getRegionStoragePage(queryParams)
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

/** 添加/修改操作 */
const formRef = ref()
const openForm = (type: string, id?: number) => {
  if (!props.regionId) {
    message.error('请选择一个库位管理')
    return
  }
  formRef.value.open(type, id, props.regionId)
}

/** 删除按钮操作 */
const handleDelete = async (id: number) => {
  try {
    // 删除的二次确认
    await message.delConfirm()
    // 发起删除
    await RegionApi.deleteRegionStorage(id)
    message.success(t('common.delSuccess'))
    // 刷新列表
    await getList()
  } catch {}
}
</script>