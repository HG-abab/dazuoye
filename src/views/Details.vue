<template>
  <div class="details-page">
    <!-- 顶部标签 -->
    <div class="building-tabs">
      <button v-for="building in buildings" :key="building" @click="selectBuilding(building)"
              :class="{ active: selectedBuilding === building }">
        {{ building }}
      </button>
    </div>

    <!-- 显示选中楼的用电与用水图表 -->
    <div class="charts">
      <div class="chart-card">
        <h3>📈 {{ selectedBuilding }} 用电能耗趋势图</h3>
        <BarChart :chartData="electricTrendData" :height="'25vh'" />
      </div>

      <div class="chart-card">
        <h3>💧 {{ selectedBuilding }} 用水量趋势图</h3>
        <BarChart :chartData="waterTrendData" :height="'25vh'" />
      </div>
    </div>

    <!-- 用电与用水增长比例趋势图，左右排列 -->
    <div style="display: flex; gap: 20px;">
      <!-- 用电增长比例 -->
      <div class="chart-card" style="flex: 1;">
        <h3>⚡ 每月用电增长率</h3>
        <LineOrBarChart :chartData="growthChartDataElectric" />
      </div>

      <!-- 用水增长比例 -->
      <div class="chart-card" style="flex: 1;">
        <h3>🚿 每月用水增长率</h3>
        <LineOrBarChart :chartData="growthChartDataWater" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import BarChart from '../components/charts/BarChart.vue';
import LineOrBarChart from '../components/charts/LineChart.vue';

// 楼名
const buildings = ['仁爱', '忠孝', '至善', '四维', '兴业'];

// 当前选中的楼
const selectedBuilding = ref(buildings[0]);

// 用电和用水数据（按月份的趋势）
const trendData = {
  '仁爱': {
    electric: [120, 150, 130, 180],
    water: [50, 60, 55, 70]
  },
  '忠孝': {
    electric: [110, 140, 120, 170],
    water: [45, 55, 50, 65]
  },
  '至善': {
    electric: [100, 130, 110, 160],
    water: [40, 50, 45, 60]
  },
  '四维': {
    electric: [140, 180, 160, 210],
    water: [60, 75, 65, 85]
  },
  '兴业': {
    electric: [130, 160, 140, 190],
    water: [55, 65, 60, 75]
  }
};

// 根据选中的楼，更新图表数据
const electricTrendData = ref([]);
const waterTrendData = ref([]);

// 监听选中的楼并更新数据
watch(selectedBuilding, (newBuilding) => {
  electricTrendData.value = {
    xAxis: ['1月', '2月', '3月', '4月'],
    series: [{
      name: '用电能耗',
      type: 'bar',
      data: trendData[newBuilding].electric
    }]
  };

  waterTrendData.value = {
    xAxis: ['1月', '2月', '3月', '4月'],
    series: [{
      name: '用水量',
      type: 'bar',
      data: trendData[newBuilding].water
    }]
  };
});

// 初始化时设置选中的楼的数据
electricTrendData.value = {
  xAxis: ['1月', '2月', '3月', '4月'],
  series: [{
    name: '用电能耗',
    type: 'bar',
    data: trendData['仁爱'].electric
  }]
};

waterTrendData.value = {
  xAxis: ['1月', '2月', '3月', '4月'],
  series: [{
    name: '用水量',
    type: 'bar',
    data: trendData['仁爱'].water
  }]
};

// 用电增长率数据（模拟每月百分比增长）
const growthChartDataElectric = ref({
  xAxis: ['1月', '2月', '3月', '4月'],
  series: [{
    name: '用电增长率',
    type: 'line',
    data: [0, 5.2, 3.1, 4.7] // 可根据真实数据替换，单位：%
  }]
});

// 用水增长率数据（模拟每月百分比增长）
const growthChartDataWater = ref({
  xAxis: ['1月', '2月', '3月', '4月'],
  series: [{
    name: '用水增长率',
    type: 'line',
    data: [0, 4.8, 2.5, 3.9] // 可根据真实数据替换，单位：%
  }]
});


// 点击楼标签时更新选中的楼
const selectBuilding = (building) => {
  selectedBuilding.value = building;
};
</script>

<style scoped>
.details-page {
  padding: 24px;
  font-family: 'Segoe UI', Roboto, sans-serif;
  background-color: #f5f7fa;
}

/* 标签样式 */
.building-tabs {
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
}

.building-tabs button {
  padding: 10px 16px;
  background: #fff;
  border: 2px solid #ccc;
  border-radius: 12px;
  cursor: pointer;
  transition: background 0.3s, border 0.3s;
}

.building-tabs button.active {
  background: #4CAF50;
  color: white;
  border-color: #4CAF50;
}

.building-tabs button:hover {
  background: #f0f0f0;
}

/* 图表卡片样式 */
.charts {
  display: flex;
  gap: 20px;
}

.chart-card {
  background: #ffffff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  flex: 1;
}

.chart-card h3 {
  font-size: 18px;
  margin-bottom: 16px;
  color: #333;
}

.details-page {
  padding: 24px;
  font-family: 'Segoe UI', Roboto, sans-serif;
  background-color: #f5f7fa;
  --primary-color: #4CAF50;
  --card-bg: #ffffff;
  --text-color: #333;
  --hover-bg: #f0f0f0;
  --shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
}

/* 标签按钮区域 */
.building-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 24px;
}

.building-tabs button {
  padding: 10px 20px;
  background: #fff;
  border: 2px solid #ccc;
  border-radius: 999px;
  cursor: pointer;
  font-size: 15px;
  font-weight: 500;
  color: #444;
  transition: all 0.3s ease;
}

.building-tabs button.active {
  background: var(--primary-color);
  color: #fff;
  border-color: var(--primary-color);
}

.building-tabs button:hover {
  background: var(--hover-bg);
}

/* 图表整体容器：支持换行响应 */
.charts {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 20px;
}

/* 图表卡片统一风格 */
.chart-card {
  background: var(--card-bg);
  border-radius: 16px;
  padding: 24px;
  box-shadow: var(--shadow);
  flex: 1 1 300px;
  min-width: 280px;
}

.chart-card h3 {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 16px;
  color: var(--text-color);
}

/* 用电/用水增长率区域响应式排版 */
@media (max-width: 768px) {

  .charts,
  .growth-section {
    flex-direction: column;
  }

  .chart-card {
    flex: 1 1 100%;
  }
}
</style>
