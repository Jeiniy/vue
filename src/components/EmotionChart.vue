<template>
  <div class="container">
    <!-- 上排：標題 + 顯示週數 -->
    <div class="header-bar">
      <div class="card-header">情緒追蹤</div>
      <div class="select-group">
        <label for="weekSelect">顯示週數：</label>
        <select id="weekSelect" v-model="selectedWeeks" @change="loadChartData">
          <option value="4">最近4週</option>
          <option value="8">最近8週</option>
          <option value="12">最近12週</option>
          <option value="24">最近24週</option>
        </select>
      </div>
    </div>

    <!-- 右上角按鈕 -->
    <button class="btn" @click="forceUpdate">手動更新統計</button>

    <!-- 情緒圖例 -->
    <div class="emotion-legend">
      <div class="legend-item" v-for="(item, index) in legends" :key="index">
        <div class="legend-color" :style="{ background: item.color }"></div>
        <span>{{ item.label }}</span>
      </div>
    </div>

    <!-- 圖表 -->
    <div class="chart-container">
      <canvas ref="chartRef"></canvas>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Chart from 'chart.js/auto'

const API_BASE = 'http://localhost:5001/api/emotion'

const chartRef = ref(null)
let emotionChart = null
const selectedWeeks = ref('12')

const legends = [
  { color: '#ff6b6b', label: '生氣 (0)' },
  { color: '#2CA2CD', label: '悲傷 (1)' },
  { color: '#69BC7A', label: '中性 (2)' },
  { color: '#FAEF4C', label: '快樂 (3)' }
]

function initChart() {
  const ctx = chartRef.value.getContext('2d')
  emotionChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [],
      datasets: [{
        label: '週平均情緒值',
        data: [],
        borderColor: '#007bff',
        backgroundColor: 'rgba(0, 123, 255, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#007bff',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          max: 3,
          ticks: {
            stepSize: 1,
            callback: value => ['生氣', '悲傷', '中性', '快樂'][value] ?? value
          },
          title: { display: true, text: '情緒指數' }
        },
        x: {
          title: { display: true, text: '週次' }
        }
      },
      plugins: {
        title: {
          display: true,
          text: '每週情緒變化趨勢',
          font: { size: 16 }
        },
        legend: { display: false }
      },
      elements: { point: { hoverRadius: 8 } }
    }
  })
}

async function loadChartData() {
  try {
    const url = `${API_BASE}/chart-data?weeks=${selectedWeeks.value}`
    const response = await fetch(url)
    const data = await response.json()

    if (!data.weeks || !data.values) throw new Error('資料格式錯誤')

    emotionChart.data.labels = data.weeks
    emotionChart.data.datasets[0].data = data.values
    emotionChart.update()
  } catch (err) {
    console.error(err)
    alert('無法載入圖表數據，請確認 API 是否正常運作')
  }
}

async function forceUpdate() {
  try {
    await fetch(`${API_BASE}/force-update`, { method: 'POST' })
    await loadChartData()
    alert('統計已更新！')
  } catch (error) {
    alert('更新失敗，請檢查 API 服務')
  }
}

onMounted(() => {
  initChart()
  loadChartData()
})
</script>

<style scoped>
.container {
  position: relative;
  background: white;
  border-radius: 10px;
  margin-top: -30px;
  padding: 24px 30px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.card-header {
  font-size: 16px;
  font-weight: bold;
}

/* 標題 + 下拉選單 */
.header-bar {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
  font-weight: bold;
  font-size: 16px;
}

.select-group label {
  font-weight: normal;
}

.btn {
  position: absolute;
  top: 20px;
  right: 20px;
  background: #007bff;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  white-space: nowrap;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: background 0.3s;
}

.btn:hover {
  background: #0056b3;
}

/* 圖例區塊置中並換行 */
.emotion-legend {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 0px;
  margin-bottom: 20px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
}

.legend-color {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

/* 圖表區 */
.chart-container {
  margin-top: -30px;
  position: relative;
  height: 230px;
  padding: 0 10px;
  max-width: 800px;
}

.chart-container canvas {
  width: 100% !important;
  height: 100% !important;
  display: block;
}
</style>
