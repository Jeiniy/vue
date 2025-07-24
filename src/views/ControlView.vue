<template>
  <div class="container">
    <SideControl />
    
    <div class="dashboard-container">
    <!-- 左邊：圖表與卡片 -->
      <main class="main-content">
        
        <EmotionChart  @click="goToEmotion"/>
        
        <div class="small-cards">
          <div class="card large-card" :class="status === 'safe' ? 'safe' : 'danger'" @click="goToFall">
            <div class="card-header">跌倒偵測</div>

            <div class="status-icon">
              <span v-if="status === 'safe'">👍</span>
              <span v-else>⚠️</span>
            </div>

            <div class="status-text">
              {{ status === 'safe' ? '目前無異狀' : '發生危險' }}
            </div>

            <div class="card-footer" @click.stop>
              <span>更新時間：{{ updateTime }}</span>
              <button class="button" @click="testDetection">測試</button>
            </div>
          </div>

           <div class="right-side">
            <div class="card orange small-card">今日情緒分析</div>
              
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
import EmotionChart from '@/components/EmotionChart.vue'
import { onMounted, ref } from 'vue'
// import Chart from 'chart.js/auto'
const timeChartRef = ref(null)
const growthChartRef = ref(null)

const status = ref('safe') // 初始狀態為安全
const updateTime = ref('—')

// function testDetection() {
//   // 假裝隨機測試狀態
//   const random = Math.random() > 0.5 ? 'safe' : 'danger'
//   status.value = random
//   updateTime.value = new Date().toLocaleTimeString()
// }

// // 每 3 秒自動模擬跌倒或安全狀態
// onMounted(() => {
//   setInterval(() => {
//     const fake = Math.random() > 0.5 ? 'safe' : 'danger'
//     status.value = fake
//     updateTime.value = new Date().toLocaleTimeString()
//   }, 3000)
// })

import { useRouter } from 'vue-router'
const router = useRouter()

function goToFall() {
  router.push('/fall')
}

function goToEmotion(){
  router.push('/Emotion')
}

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
  height: 600px;
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
  height: 600px;
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

.button {
  background-color: #7b3aed;
  color: white;
  padding: 6px 12px;
  border-radius: 8px;
  border: none;
}

.button:hover {
  background: #6930cc;
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
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
}

/*跌倒偵測*/
.status-card {
  width: 300px;
  height: 300px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: background-color 0.3s ease;
  color: #222;
}

.card.safe {
  background-color: #e6fcf2;
}

.card.danger {
  background-color: #ffe6e6;
}

.status-icon {
  font-size: 60px;
  text-align: center;
  margin-top: 20px; 
}

.status-text {
  text-align: center;
  font-size: 18px;
  font-weight: bold;
 
}

.card-header {
  font-size: 16px;
  font-weight: bold;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  margin-top: 50px;
}

/* 各色背景 */
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
  height: 665px;
  width: 300px;
}
/* * {
  outline: 1px solid red;
} */

</style>
