<template>
  <div>
    <h2>客户行业分析</h2>
    <el-row v-loading="loading">
      <el-col :span="10">
        <Echart :height="300" :options="areaChartOptions" />
      </el-col>
      <el-col :span="10">
        <Echart :height="300" :options="areaChartOptions" />
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'
import { EChartsOption } from 'echarts'
import china from '@/assets/map/json/china.json'
import { MemberAreaStatisticsRespVO } from '@/api/mall/statistics/member'
import echarts from '@/plugins/echarts'

// 注册地图
echarts?.registerMap('china', china as any)

const loading = ref(true) // 加载中
const areaStatisticsList = ref<MemberAreaStatisticsRespVO[]>([]) // 省份会员统计

const areaChartOptions = reactive<EChartsOption>({
  tooltip: {
    trigger: 'item',
    formatter: (params: any) => {
      return `${params?.data?.areaName || params?.name}<br/>
客户数量：${params?.data?.userCount || 0}<br/>`
    }
  },
  visualMap: {
    text: ['高', '低'],
    realtime: false,
    calculable: true,
    top: 'middle',
    inRange: {
      color: ['#fff', '#3b82f6']
    }
  },
  series: [
    {
      name: '客户地域分布',
      type: 'map',
      map: 'china',
      roam: false,
      selectedMode: false,
      data: []
    }
  ]
}) as EChartsOption

/** 按照省份，查询客户统计列表 */
const getMemberAreaStatisticsList = async () => {
  // 在这里根据实际情况获取会员统计数据，并更新 areaStatisticsList 和 areaChartOptions 的值
  // 例如：areaStatisticsList.value = await MemberStatisticsApi.getMemberAreaStatisticsList();
  // 然后更新 areaChartOptions 的 series 数据
  // 例如：
  // let min = 0;
  // let max = 0;
  // areaChartOptions.series![0].data = areaStatisticsList.value.map((item) => {
  //   min = Math.min(min, item.orderPayUserCount || 0);
  //   max = Math.max(max, item.orderPayUserCount || 0);
  //   return { ...item, name: item.areaName, value: item.orderPayUserCount || 0 };
  // });
  // areaChartOptions.visualMap!['min'] = min;
  // areaChartOptions.visualMap!['max'] = max;
}

onMounted(async () => {
  loading.value = true
  await getMemberAreaStatisticsList()
  loading.value = false
})
</script>