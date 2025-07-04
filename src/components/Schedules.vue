<template>
  <div class="schedule-card">
    <div class="calendar-header">
      <div class="calendar-date">{{ formattedDate }}</div>
      <button class="add-button" @click="isAdding = true">新增活動</button>
    </div>

    <v-calendar :attributes="attributes" @dayclick="selectDate" color="indigo" />

    <!-- 新增活動表單 -->
    <div v-if="selectedDate && isAdding" class="event-form">
      <div class="event-title">新增活動</div>
      <div class="time-select">
        <label>時間:</label>
        <select v-model="hour">
          <option value="">--</option>
          <option v-for="h in 24" :key="h" :value="padZero(h - 1)">
            {{ padZero(h - 1) }}
          </option>
        </select>
        :
        <select v-model="minute">
          <option value="">--</option>
          <option v-for="m in [0, 15, 30, 45]" :key="m" :value="padZero(m)">
            {{ padZero(m) }}
          </option>
        </select>
      </div>
      <input v-model="eventContent" placeholder="輸入活動內容" class="event-input" />
      <input v-model="eventUser" placeholder="由誰安排" class="event-input" />
      <button @click="addEvent" class="save-button">儲存活動</button>
    </div>

    <!-- 活動列表 -->
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

    <div v-else-if="selectedDate && !isAdding" class="no-event">無安排</div>
  </div>
</template>



<script setup>
import { ref, computed } from 'vue'

const selectedDate = ref(new Date().toISOString().split('T')[0])
const hour = ref('')
const minute = ref('')
const eventContent = ref('')
const eventUser = ref('')
const isAdding = ref(false)
const events = ref({})

const selectDate = ({ date }) => {
  selectedDate.value = date.toLocaleDateString('sv-SE')
  isAdding.value = false
}

const padZero = (n) => n.toString().padStart(2, '0')

const addEvent = () => {
  if (!hour.value || !minute.value || !eventContent.value || !eventUser.value) return
  const time = `${hour.value}:${minute.value}`
  const newItem = {
    time,
    content: eventContent.value.trim(),
    user: eventUser.value.trim()
  }
  if (!events.value[selectedDate.value]) {
    events.value[selectedDate.value] = []
  }
  events.value[selectedDate.value].push(newItem)
  hour.value = ''
  minute.value = ''
  eventContent.value = ''
  eventUser.value = ''
  isAdding.value = false
}

const deleteEvent = (index) => {
  events.value[selectedDate.value].splice(index, 1)
  if (events.value[selectedDate.value].length === 0) {
    delete events.value[selectedDate.value]
  }
}

const sortedEvents = computed(() => {
  return [...(events.value[selectedDate.value] || [])].sort((a, b) =>
    a.time.localeCompare(b.time)
  )
})

const formattedDate = computed(() => {
  const date = new Date(selectedDate.value)
  return date.toLocaleDateString('zh-TW', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'short'
  })
})

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
