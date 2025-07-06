<template>
  <div class="container">
    <aside class="sidebar">
      <!-- <h2 class="sidebar-title">陪伴型照護機器人</h2> -->

      <ul class="menu">
        <li class="menu-item" @click="goToHome">
            <img :src="img1" alt="首頁" class="menu-icon" />
            <span>首頁</span>
        </li>
        <li class="menu-item">
            <img :src="img2" alt="教學" class="menu-icon" />
            <span>使用教學</span>
        </li>
        <li class="menu-item" @click="goToControl">
            <img :src="img5" alt="分析" class="menu-icon" />
            <span>分析頁面</span>
        </li>
        <li class="menu-item" @click="goToEnter">
            <img :src="img3" alt="輸入" class="menu-icon" />
            <span>年長者資訊</span>
        </li>
        <li class="menu-item">
            <img :src="img4" alt="設定" class="menu-icon" />
            <span>設定</span>
        </li>
      </ul>
    </aside>
    
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
import img1 from '@/assets/image/home.png'
import img2 from '@/assets/image/assignment.png' 
import img3 from '@/assets/image/edit.png' 
import img4 from '@/assets/image/settings.png' 
import img5 from '@/assets/image/analytics.png'

import { onMounted, ref } from 'vue'
// import Chart from 'chart.js/auto'
const timeChartRef = ref(null)
const growthChartRef = ref(null)

import { useRouter } from 'vue-router'
const router = useRouter()

function goToHome() {
  router.push('/')
}

function goToEnter() {
  router.push('/Enter')
}

function goToControl() {
  router.push('/control')
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
  height: 100vh;
  background: #ffffff;
}

.sidebar {
  background: #ffffff;
  width: 200px;
  padding: 20px;
  border-right: 1px solid #ddd;
}

.sidebar-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 16px;
  padding-left: 12px;
}

.menu {
  list-style: none;
  padding: 0;
  margin: 0;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  color: #333;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  font-size: 17px;
}

.menu-item:hover {
  background-color: #f0f0f0;
  color: #7d4ce0; /* 變成紫色字 */
  border-radius: 6px;
}

.menu-icon {
  width: 25px;
  height: 25px;
  filter: brightness(0.7);
  opacity: 0.7; /* 調低明度 */
}

.logout {
  position: absolute;
  bottom: 20px;
  right: 80%;
  padding: 10px 12px;
  color: #333;
  cursor: pointer;
  transition: background 0.3s, color 0.3s;
  border-radius: 6px;
  background-color: transparent;
}

.logout:hover {
  background-color: #f0f0f0;
  color: #7d4ce0;
}

.sidebar ul {
  list-style: none;
  padding-left: 0;
}

.sidebar li {
  margin-bottom: 20px;
  color: #444;
  cursor: pointer;
}

.sidebar li.active {
  color: white;
  background: #7d4ce0;
  padding: 8px 12px;
  border-radius: 8px;
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
  height: 545px;
  width: 300px;
}


</style>
