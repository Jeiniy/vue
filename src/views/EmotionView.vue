<template>
  <div class="container">
    <!-- 左邊側邊欄 -->
    <div class="side-bar">
      <SideControl />
    </div>

    <!-- 右邊主內容 -->
    <div class="main-content">
       <div class="container1">
            <h1>🎭 情緒追蹤分析</h1>

        <div class="controls">
        <div>
            <label for="weekSelect">顯示週數：</label>
            <select id="weekSelect" v-model="selectedWeeks" @change="loadChartData">
            <option value="4">最近4週</option>
            <option value="8">最近8週</option>
            <option value="12">最近12週</option>
            <option value="24">最近24週</option>
            </select>
        </div>
        <button class="btn" @click="forceUpdate">手動更新統計</button>
        </div>

        <div class="emotion-legend">
        <div class="legend-item" v-for="(label, index) in emotionLabels" :key="index">
            <div class="legend-color" :style="{ background: emotionColors[index] }"></div>
            <span>{{ label }} ({{ index }})</span>
        </div>
        </div>

        <div class="chart-container">
        <canvas id="emotionChart"></canvas>
        </div>

        <div class="stats-grid">
        <div class="stat-card">
            <div class="stat-value">{{ avgEmotion }}</div>
            <div>平均情緒值</div>
        </div>
        <div class="stat-card">
            <div class="stat-value">{{ totalWeeks }}</div>
            <div>統計週數</div>
        </div>
        <div class="stat-card">
            <div class="stat-value">{{ trendDirection }}</div>
            <div>情緒趨勢</div>
        </div>
        <div class="stat-card">
            <div class="stat-value">{{ lastUpdate }}</div>
            <div>最後更新</div>
        </div>
        </div>
    </div>
        </div>
  </div>
</template>

<script setup>
import SideControl from '@/components/SideControl.vue'

import { onMounted, ref } from 'vue'
import Chart from 'chart.js/auto'

const API_BASE = 'http://localhost:5001/api/emotion'

const selectedWeeks = ref('12')
const avgEmotion = ref('--')
const totalWeeks = ref('--')
const trendDirection = ref('--')
const lastUpdate = ref('正在載入...')

let emotionChart = null

const emotionLabels = ['生氣', '悲傷', '中性', '快樂']
const emotionColors = ['#ff6b6b', '#2CA2CD', '#69BC7A', '#FAEF4C']

function initChart() {
  const ctx = document.getElementById('emotionChart').getContext('2d')
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
            callback: value => emotionLabels[value] || value
          },
          title: {
            display: true,
            text: '情緒指數'
          }
        },
        x: {
          title: {
            display: true,
            text: '週次'
          }
        }
      },
      plugins: {
        title: {
          display: true,
          text: '每週情緒變化趨勢',
          font: {
            size: 16
          }
        },
        legend: {
          display: false
        }
      },
      elements: {
        point: {
          hoverRadius: 8
        }
      }
    }
  })
}

async function loadChartData() {
  try {
    const url = `${API_BASE}/chart-data?weeks=${selectedWeeks.value}`
    const response = await fetch(url)
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`)

    const data = await response.json()

    emotionChart.data.labels = data.weeks
    emotionChart.data.datasets[0].data = data.values
    emotionChart.update()

    updateStats(data)
    lastUpdate.value = '剛剛更新 ✅'
  } catch (error) {
    lastUpdate.value = '載入失敗 ❌'
    alert(`載入失敗：${error.message}`)
  }
}

function updateStats(data) {
  const values = data.values
  if (values.length === 0) return

  const avg = (values.reduce((a, b) => a + b, 0) / values.length).toFixed(2)
  const total = values.length

  let trend = '--'
  if (values.length >= 2) {
    const recent = values.slice(-3).reduce((a, b) => a + b, 0) / Math.min(3, values.length)
    const earlier = values.slice(0, -3).reduce((a, b) => a + b, 0) / Math.max(1, values.length - 3)
    trend = recent > earlier + 0.2 ? '📈 上升'
         : recent < earlier - 0.2 ? '📉 下降'
         : '➡️ 平穩'
  }

  avgEmotion.value = avg
  totalWeeks.value = total
  trendDirection.value = trend
  lastUpdate.value = new Date().toLocaleString('zh-TW')
}

async function forceUpdate() {
  try {
    await fetch(`${API_BASE}/force-update`, { method: 'POST' })
    await loadChartData()
    alert('統計已更新！')
  } catch (error) {
    alert('更新失敗，請確認 API 運行')
  }
}

onMounted(() => {
  initChart()
  loadChartData()
})
</script>

<style scoped>

.container {
  display: flex;
  height: 660px;
  background: #ffffff;
}

.main-content {
  flex: 1;
  padding: 10px;
  overflow-y: auto;
  height: 800px;

}
.container1 {
  background: white;
  border-radius: 10px;
  padding: 30px;
  width: 100%;
  margin: 0 auto;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  font-family: 'Microsoft JhengHei', Arial, sans-serif;
  /* background-color: #f5f5f5; */
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 30px;
}

.chart-container {
  position: relative;
  height: 400px;
  margin-bottom: 30px;
}

.controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.emotion-legend {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.legend-color {
  width: 20px;
  height: 20px;
  border-radius: 50%;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.stat-card {
  background: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
  text-align: center;
}

.stat-value {
  font-size: 1.5em;
  font-weight: bold;
  color: #007bff;
}

.btn {
  background: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

.btn:hover {
  background: #0056b3;
}

</style>
