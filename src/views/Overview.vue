<template>
  <div class="dashboard">
    <!-- 顶部概览卡片 -->
    <div class="overview-cards">
      <div class="overview-card" v-for="item in overviewData" :key="item.label">
        <div class="card-title">{{ item.label }}</div>
        <div class="card-value">{{ item.value }}</div>
        <div class="card-subtext">{{ item.subtext }}</div>
      </div>
    </div>

    <!-- 用电趋势图和用水趋势图卡片，左右排列 -->
    <div style="display: flex; gap: 20px;">
      <!-- 用电趋势图卡片 -->
      <div class="chart-card" style="flex: 1;">
        <h3>📈 教学楼用电能耗趋势图</h3>
        <LineOrBarChart :chartData="trendChartDataElectric" />
      </div>

      <!-- 用水趋势图卡片 -->
      <div class="chart-card" style="flex: 1;">
        <h3>💧 教学楼用水量趋势图</h3>
        <LineOrBarChart :chartData="trendChartDataWater" />
      </div>
    </div>

    <!-- 用电饼图和用水饼图，左右排列 -->
    <div style="display: flex; gap: 20px;">
      <!-- 用电饼图 -->
      <div class="chart-card" style="flex: 1;">
        <h3>🧩 各教学楼用电能耗占比</h3>
        <PieChart :chartData="pieChartDataElectric" />
      </div>

      <!-- 用水饼图 -->
      <div class="chart-card" style="flex: 1;">
        <h3>💧 各教学楼用水占比</h3>
        <PieChart :chartData="pieChartDataWater" />
      </div>
    </div>
  </div>
</template>

<script setup>
import LineOrBarChart from '../components/charts/LineChart.vue';
import PieChart from '../components/charts/PieChart.vue';
import { ref } from 'vue';

// 教学楼名称
const buildings = ['仁爱', '忠孝', '至善', '四维', '兴业'];

// 用电趋势图数据
const trendChartDataElectric = ref({
  xAxis: ['1月', '2月', '3月', '4月'],
  series: buildings.map(name => ({
    name,
    type: 'line',
    data: Array.from({ length: 4 }, () => +(Math.random() * 100).toFixed(2)) // 用电数据
  }))
});

// 用水趋势图数据
const trendChartDataWater = ref({
  xAxis: ['1月', '2月', '3月', '4月'],
  series: buildings.map(name => ({
    name,
    type: 'line',
    data: Array.from({ length: 4 }, () => +(Math.random() * 50).toFixed(2)) // 用水数据
  }))
});

// 用电饼图数据
const pieChartDataElectric = ref({
  name: '总用电能耗',
  legendData: buildings,
  data: buildings.map(name => ({
    name,
    value: +(Math.random() * 500).toFixed(2) // 用电能耗数据
  }))
});

// 用水饼图数据
const pieChartDataWater = ref({
  name: '总用水量',
  legendData: buildings,
  data: buildings.map(name => ({
    name,
    value: +(Math.random() * 200).toFixed(2) // 用水量数据
  }))
});

// 顶部概览指标（用电 + 用水）
const overviewData = ref([
  { label: '总用电能耗（本年）', value: '123456 kWh', subtext: '较去年同期 ↑12.3%' },
  { label: '总用水量（本年）', value: '34000 m³', subtext: '较去年同期 ↑8.5%' },
  { label: '本月用电量', value: '8345 kWh', subtext: '较上月 ↑5.2%' },
  { label: '本月用水量', value: '1200 m³', subtext: '较上月 ↑4.8%' },
  { label: '日均用电', value: '278 kWh', subtext: '最近7日平均' },
  { label: '日均用水', value: '40 m³', subtext: '最近7日平均' }
]);
</script>

<style scoped>
.dashboard {
  padding: 24px;
  font-family: 'Segoe UI', Roboto, sans-serif;
  background-color: #f5f7fa;
}

/* 顶部指标卡片样式 */
.overview-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 16px;
  margin-bottom: 32px;
}

.overview-card {
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  padding: 16px;
  transition: transform 0.2s ease;
}

.overview-card:hover {
  transform: translateY(-3px);
}

.card-title {
  font-size: 14px;
  color: #666;
  margin-bottom: 8px;
}

.card-value {
  font-size: 24px;
  font-weight: bold;
  color: #333;
}

.card-subtext {
  font-size: 12px;
  color: #999;
  margin-top: 4px;
}

/* 图表卡片 */
.chart-card {
  background: #ffffff;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 30px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.chart-card h3 {
  font-size: 18px;
  margin-bottom: 16px;
  color: #333;
}

/* 用电与用水趋势图并排显示 */
.dashboard>div {
  display: flex;
  gap: 20px;
}

.chart-card {
  flex: 1;
}

/* 用电饼图和用水饼图并排显示 */
.dashboard>div:nth-child(3) {
  display: flex;
  gap: 20px;
}

.chart-card {
  flex: 1;
}
</style>
