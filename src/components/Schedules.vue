<template>
  <div class="schedule-card">
    <!-- 上方日期與新增活動按鈕 -->
    <div class="calendar-header">
      <div class="calendar-date">{{ formattedDate }}</div>
      <button class="add-button" @click="goToSchedule">新增活動</button>
    </div>

    <!-- 行事曆元件（v-calendar） -->
    <v-calendar
      :attributes="attributes"
      @dayclick="selectDate"
      color="indigo"
    />


    <!-- 活動清單列表 -->
    <div v-if="selectedDate && sortedEvents.length" class="event-list">
      <h4>活動安排：</h4>
      <ul>
        <li v-for="(event, i) in sortedEvents" :key="i" class="event-item">
          <span class="event-text">
            {{ event.time }} {{ event.content }} （{{ event.user }}）
          </span>
          <button class="delete-btn" @click="deleteEvent(i)">✕</button>
        </li>
      </ul>
    </div>

    <!-- 無活動時顯示 -->
    <div v-else-if="selectedDate && !isAdding" class="no-event">無安排</div>
  </div>
</template>




<script setup>
import { ref, computed } from 'vue'

// 📌 目前選中的日期（格式：YYYY-MM-DD）
const selectedDate = ref(new Date().toISOString().split('T')[0])

// 📌 活動輸入欄資料
const hour = ref('')
const minute = ref('')
const eventContent = ref('')
const eventUser = ref('')

// 📌 控制是否正在新增活動
const isAdding = ref(false)

// 📌 所有活動紀錄（以日期分類）
const events = ref({})

// ✅ 點日期後：設定為選中的日期並關閉新增表單
const selectDate = ({ date }) => {
  selectedDate.value = date.toLocaleDateString('sv-SE') // sv-SE 是 yyyy-mm-dd 格式
  isAdding.value = false
}

// ⏱ 將數字補 0（例如 8 變成 08）
const padZero = (n) => n.toString().padStart(2, '0')

// ✅ 新增活動邏輯
const addEvent = () => {
  if (!hour.value || !minute.value || !eventContent.value || !eventUser.value) return

  const time = `${hour.value}:${minute.value}`

  const newItem = {
    time,
    content: eventContent.value.trim(),
    user: eventUser.value.trim()
  }

  // 若該日期尚無活動，先建立陣列
  if (!events.value[selectedDate.value]) {
    events.value[selectedDate.value] = []
  }

  events.value[selectedDate.value].push(newItem)

  // 清空欄位
  hour.value = ''
  minute.value = ''
  eventContent.value = ''
  eventUser.value = ''
  isAdding.value = false
}

// ✅ 刪除活動
const deleteEvent = (index) => {
  events.value[selectedDate.value].splice(index, 1)
  if (events.value[selectedDate.value].length === 0) {
    delete events.value[selectedDate.value]
  }
}

// ✅ 將當天的活動排序（依時間）
const sortedEvents = computed(() => {
  return [...(events.value[selectedDate.value] || [])].sort((a, b) =>
    a.time.localeCompare(b.time)
  )
})

// ✅ 轉換日期格式（顯示在標題區）
const formattedDate = computed(() => {
  const date = new Date(selectedDate.value)
  return date.toLocaleDateString('zh-TW', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'short'
  })
})

// ✅ 給 v-calendar 的標記（小圓點、popover）
const attributes = computed(() =>
  Object.entries(events.value).map(([date, evts]) => ({
    key: date,
    dates: date,
    dot: { color: 'purple' },
    popover: {
      label: evts.map(e => `${e.time} ${e.content}`).join(', ')
    }
  }))
)

import { useRouter } from 'vue-router'
const router = useRouter()

const goToSchedule = () => {
  router.push('/schedule')
}
</script>



<style scoped>
.schedule-card {
  border-radius: 12px;
  padding: 20px;
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
  transform: translateX(-5%);
  margin-top: -20px;
  font-family: "Segoe UI", sans-serif;
}

.calendar-header {
  display: flex;
  justify-content: space-between; /* 左右對齊 */
  align-items: center;
  margin-bottom: 10px;
}

.calendar-date {
  flex-shrink: 0; /* 不要被壓縮 */
  font-weight: bold;
  font-size: 16px;
  color: #333;
  max-width: 70%; /* 避免過長佔滿空間，可調整 */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.add-button {
  background-color: #7b3aed;
  color: white;
  padding: 6px 12px;
  border-radius: 8px;
  border: none;
  font-weight: bold;
  cursor: pointer;
  flex-shrink: 0; /* 不要被壓縮 */
  margin-left: 16px;
}


.event-form {
  margin-top: 15px;
}

.event-title {
  margin-bottom: 8px;
  font-weight: bold;
  color: #444;
}

.event-input {
  width: 100%;
  height: 60px;
  border-radius: 8px;
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  resize: none;
  margin-bottom: 10px;
}

.save-button {
  background-color: #7b3aed;
  color: white;
  padding: 6px 12px;
  border-radius: 8px;
  border: none;
  font-weight: bold;
  cursor: pointer;
}

.event-list {
  margin-top: 15px;
}

.event-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f7f7f7;
  border-radius: 8px;
  padding: 6px 10px;
  margin-bottom: 6px;
}

.event-info {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
  flex-wrap: wrap;
  min-width: 0;
}

.event-time {
  width: 50px;
  font-weight: bold;
  color: #333;
  flex-shrink: 0;
}

.event-content {
  flex-grow: 1;
  min-width: 60px;
  color: #444;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.event-user {
  color: #666;
  font-size: 0.9em;
  white-space: nowrap;
  flex-shrink: 0;
}

.event-text {
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 15px;
  color: #333;
}

.delete-btn {
  background: transparent;
  border: none;
  color: #ff5555;
  font-weight: bold;
  cursor: pointer;
  margin-left: 10px;
}

.no-event {
  margin-top: 10px;
  text-align: center;
  color: #999;
  font-size: 14px;
}
.time-select {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
}

.who {
  color: #888;
  font-size: 12px;
  margin-left: 6px;
}


</style>
