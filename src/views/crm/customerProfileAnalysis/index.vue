<template>
  <div>
    <div class="flex flex-row items-center justify-between">
      <CardTitle title="区域、行业状况" />
      <!-- 查询条件 -->

      <el-form-item label="用户名称" prop="username">
        <div class="form-item-container">
        <el-input v-model="queryParams.username" placeholder="请输入用户名称" />
        </div>
      </el-form-item>

      <el-form-item label="用户名称" prop="username" >
        <el-input v-model="queryParams.username" placeholder="请输入用户名称" />
      </el-form-item>

      <ShortcutDateRangePicker ref="shortcutDateRangePicker" @change="getStatisticsList">
        <el-button
            class="ml-4"
            @click="handleExport"
            :loading="exportLoading"
            v-hasPermi="['statistics:trade:export']"
        >
          <Icon icon="ep:download" class="mr-1" />导出
        </el-button>
      </ShortcutDateRangePicker>

    </div>
    <div class="tab-container">
      <button
          v-for="(tab, index) in tabs"
          :key="index"
          :class="{'active': activeTab === index}"
          @click="changeTab(index)"
      >
        {{ tab.name }}
      </button>
    </div>
    <div>
      <div v-if="activeTab === 0">
        <CityDistributionAnalysis />
      </div>
      <div v-if="activeTab === 1">
        <CustomerIndustryAnalysis />
      </div>
    </div>
  </div>
</template>

<style>
.tab-container {
  margin-top: 20px;
}

button {
  padding: 10px 20px;
  margin-right: 10px;
  background-color: #f0f0f0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  color: #fff;
}

.form-item-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

button.active {
  background-color: #007bff;
}
</style>

<script>
import CityDistributionAnalysis from './components/CityDistributionAnalysis.vue'
import CustomerIndustryAnalysis from './components/CustomerIndustryAnalysis.vue'
import * as TradeStatisticsApi from "../../../api/mall/statistics/trade";
import {fenToYuan} from "../../../utils";
import {defaultProps as shortcutDateRangePicker} from "../../../utils/tree";

/** 查询交易状况数据列表 */
const getStatisticsList = async () => {
  // 查询数据
  const times = shortcutDateRangePicker.value.times
  const list = await TradeStatisticsApi.getTradeStatisticsList({ times })
  // 处理数据
  for (let item of list) {
    item.turnoverPrice = fenToYuan(item.turnoverPrice)
    item.orderPayPrice = fenToYuan(item.orderPayPrice)
    item.rechargePrice = fenToYuan(item.rechargePrice)
    item.expensePrice = fenToYuan(item.expensePrice)
  }
  // 更新 Echarts 数据
  if (lineChartOptions.dataset && lineChartOptions.dataset['source']) {
    lineChartOptions.dataset['source'] = list
  }
}

export default {
  components: {
    CityDistributionAnalysis,
    CustomerIndustryAnalysis
  },
  data() {

    return {
      activeTab: 0,
      queryParams: {
        username: '', // 初始化为一个空字符串
        deptId: undefined,
        createTime: []
      },
      tabs: [
        { name: '城市分布分析' },
        { name: '客户行业分析' }
      ]
    }
  },
  methods: {
    changeTab(index) {
      this.activeTab = index
    }
  }
}
</script>