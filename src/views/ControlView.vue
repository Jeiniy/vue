<template>
  <div class="container">
    <SideControl />
    
    <div class="dashboard-container">
  <!-- 左邊：圖表與卡片 -->
      <main class="main-content">
        <div class="chart-box">
          <h3>Time Spendings</h3>
          <canvas ref="timeChartRef"></canvas>
        </div>
        <div class="small-cards">
          <div class="card green large-card">
            <!-- Statistics 內容 -->
          </div>

          <div class="right-side">
            <div class="card orange small-card">Awards</div>
            <div class="card yellow small-card">Growth</div>
          </div>
        </div>
      </main>

      <!-- 右邊：淺灰色區域 -->
      <aside class="side-panel">
        <Schedules />
      </aside>
    </div>
  </div>
</template>

<script setup>
import Schedules from '@/components/Schedules.vue'
import SideControl from '@/components/SideControl.vue'

import { onMounted, ref } from 'vue'
// import Chart from 'chart.js/auto'
const timeChartRef = ref(null)
const growthChartRef = ref(null)


// onMounted(() => {
//   new Chart(timeChartRef.value, {
//     type: 'bar',
//     data: {
//       labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
//       datasets: [{
//         label: 'Hours',
//         data: [15, 20, 22, 28, 25, 30, 18, 24, 26, 22, 20, 23],
//         backgroundColor: '#7d4ce0'
//       }]
//     },
//     options: {
//       scales: { y: { beginAtZero: true } }
//     }
//   })

//   new Chart(growthChartRef.value, {
//     type: 'line',
//     data: {
//       labels: ['W1', 'W2', 'W3', 'W4'],
//       datasets: [{
//         label: 'Growth',
//         data: [5, 9, 6, 10],
//         borderColor: '#f0b400',
//         fill: false
//       }]
//     },
//     options: {
//       responsive: true
//     }
//   })
// })
</script>

<style scoped>
.container {
  display: flex;
  height: 100vh;
  background: #ffffff;
}


.main-content {
  flex: 1;
  padding: 30px;
  height: auto;
  overflow: visible;
}

.avatar {
  width: 40px;
  border-radius: 50%;
}

.dashboard-container {
  display: flex;
  gap: 10px;
  padding: 15px;
}

/* 左側主內容 */
.main-content {
  flex: 3;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-left: 10px;
  padding-right: 10px; /* 讓右邊有點空間 */
}

/* 上方圖表區 */
.chart-box {
  background: white;
  border-radius: 12px;
  margin-top: -30px;
  padding: 20px;
  width: 650px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}

.small-cards {
  display: flex;
  gap: 20px;
  justify-content: flex-start;
  align-items: stretch;
}

/* 綠色卡片正方形 */
.large-card {
  width: 300px;
  height: 300px;
  flex-shrink: 0; /* 防止被壓縮 */
}

/* 右側容器垂直排兩張卡片 */
.right-side {
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: space-between;
}

/* 橘色與黃色卡片佔一半高度，長方形 */
.small-card {
  width: 320px;
  height: 140px; /* 兩張共280px，加上間距總高約300px */
}

/* 卡片通用樣式 */
.card {
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
  background-color: white;
}

/* 各色背景 */
.green {
  background-color: #e6fcf2;
}
.orange {
  background-color: #fff0e6;
}
.yellow {
  background-color: #fff9cc;
}


/* 右側側邊欄 */
.side-panel {
  flex: 1;
  background-color: #f5f5f5;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
  height: 605px;
  width: 300px;
}


</style>
