<template>
  <div class="container">
    <SideControl />

    <div class="main-layout">
      <!-- 📸 左邊：即時影像與目前狀態 -->
      <div class="left-panel">
        <h1 class="title">跌倒偵測監控台</h1>

        <div class="video-box">
          <img :src="`${api}/video_feed`" class="video-feed" />
        </div>

        <div class="status-box">
          <div v-if="fall" class="status-line danger">
            <span>⚠️</span>
            <span>跌倒警報！</span>
          </div>
          <div v-else class="status-line safe">
            <span>✅</span>
            <span>無跌倒狀態</span>
          </div>
          <p class="timestamp">更新：{{ tsLabel }}</p>
        </div>
      </div>

      <!-- 📋 右邊：紀錄查詢 -->
      <div class="right-panel">
        <h2 class="record-title">過去 3 小時狀態紀錄</h2>
        <div class="record-list">
          <div
            v-for="(log, index) in historyLogs"
            :key="index"
            class="record-item"
          >
            <span :class="log.fall ? 'danger' : 'safe'">
              {{ log.fall ? '⚠️ 跌倒' : '✅ 正常' }}
            </span>
            <span class="record-time">{{ formatTime(log.ts) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>

import { ref, computed } from 'vue'
import SideControl from '@/components/SideControl.vue'


const api  = import.meta.env.VITE_API ?? location.origin

const fall = ref(false)

const ts   = ref(0)



/* 監聽後端 SSE */

const es = new EventSource(`${api}/events`)

es.onmessage = e => {

  const { fall: f, ts: t } = JSON.parse(e.data)

  fall.value = f

  ts.value   = t

}

es.onerror = () => console.warn('SSE 連線中斷，將自動重試…')



const tsLabel = computed(() =>

  ts.value ? new Date(ts.value * 1000).toLocaleString() : '—'

)
function goBack() {
  router.go(-1)
}

</script>

<style scoped>
.container {
  display: flex;
  height: 100vh;
  background: #ffffff;
}
.main-layout {
  display: flex;
  flex: 1;
  padding: 24px;
  gap: 24px;
}

.left-panel {
  width: 66%;
}

.right-panel {
  width: 34%;
}

/* 左側標題 */
.title {
  font-size: 28px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
}

/* 影像區塊 */
.video-box {
  border: 4px solid #4b5563;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.video-feed {
  width: 100%;
  height: 400px;
  object-fit: cover;
}

.status-line {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 22px;
  font-weight: bold;
}


/* 即時狀態 */
.status-box {
  text-align: center;
  margin-top: 20px;
}

.status-line {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 22px;
  font-weight: bold;
}

.status-line.safe {
  color: #22c55e;
}

.status-line.danger {
  color: #dc2626;
  animation: pulse 1s infinite;
}

.timestamp {
  margin-top: 6px;
  font-size: 14px;
  color: #6b7280;
}

/* 右側紀錄區 */
.record-title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 10px;
}

.record-list {
  background-color: white;
  color: black;
  border-radius: 10px;
  padding: 16px;
  height: 500px;
  overflow-y: auto;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
}

.record-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.record-time {
  font-size: 14px;
  color: #6b7280;
}

.safe {
  color: #16a34a;
}

.danger {
  color: #dc2626;
}

/* 簡單的 pulse 動畫 */
@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}
</style>
