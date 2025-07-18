<template>
  <div class="container">
    <SideControl />

    <div class="schedule-main">
      <h1>時程安排</h1>

      <div class="content-grid">
        
          <!-- 左側行事曆 -->
          <div class="calendar-card">
            <v-calendar
              :attributes="calendarAttributes"
              @dayclick="onDateClick"
              color="indigo"
            />
            <p v-if="selectedDate" class="selected-date">📅 選擇日期：{{ selectedDate }}</p>
          </div>

          <!-- 右側活動區 -->
          <div class="activity-area">
            <!-- 活動表單 -->
            <div class="form-card">
              <h3>{{ editingId === null ? '新增活動' : '編輯活動' }}</h3>

              <div class="form-group">
                <label>時間:</label>
                <div class="time-selects">
                  <select v-model="form.hour">
                    <option disabled value="">時</option>
                    <option v-for="h in 24" :key="h" :value="padZero(h - 1)">
                      {{ padZero(h - 1) }}
                    </option>
                  </select>
                  :
                  <select v-model="form.minute">
                    <option disabled value="">分</option>
                    <option v-for="m in [0, 15, 30, 45]" :key="m" :value="padZero(m)">
                      {{ padZero(m) }}
                    </option>
                  </select>
                </div>
              
              </div>

              <div class="form-group">
                <label>內容:</label>
                <input v-model="form.content" placeholder="輸入活動內容" required />
              </div>

              <div class="form-group">
                <label>由誰安排:</label>
                <input v-model="form.user" placeholder="輸入姓名" required />
              </div>

              <div class="button-row">
                <button class="btn-submit" @click="saveEvent">
                  {{ editingId === null ? '新增' : '更新' }}
                </button>
                <button class="btn-cancel" v-if="editingId !== null" @click="cancelEdit">取消</button>
              </div>
            </div>

            <!-- 活動列表 -->
            <div class="event-list" v-if="sortedEvents.length > 0">
              <h4>活動安排：</h4>
              <ul>
                <li v-for="event in sortedEvents" :key="event.id" class="event-item">
                  <span>🕒 {{ event.time }}</span>｜<span>{{ event.content }}</span>（{{ event.user }}）
                  <div class="event-buttons">
                    <button @click="editEvent(event.id)">編輯</button>
                    <button @click="deleteEvent(event.id)">刪除</button>
                  </div>
                </li>
              </ul>
            </div>
            <div v-else-if="selectedDate" class="empty-message">目前無活動</div>
          </div>
        </div>    
      
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import SideControl from '@/components/SideControl.vue'

const currentUser = localStorage.getItem('currentUser') || 'User'

const selectedDate = ref('')
const events = ref({})
const editingId = ref(null)

const form = ref({
  hour: '',
  minute: '',
  content: '',
  user: currentUser
})

function formatDateToYMD(date) {
  const offset = date.getTimezoneOffset()
  const localDate = new Date(date.getTime() - offset * 60000)
  return localDate.toISOString().split('T')[0]
}

onMounted(() => {
  const today = new Date()
  selectedDate.value = formatDateToYMD(today)
})

const onDateClick = ({ date }) => {
  selectedDate.value = formatDateToYMD(date)
  resetForm()
}

const sortedEvents = computed(() => {
  const list = events.value[selectedDate.value] || []
  return [...list].sort((a, b) => a.time.localeCompare(b.time))
})

const saveEvent = () => {
  if (!form.value.hour || !form.value.minute || !form.value.content || !form.value.user) {
    alert("請填寫所有欄位")
    return
  }

  const time = `${form.value.hour}:${form.value.minute}`
  const newEvent = {
    id: editingId.value ?? Date.now(),
    time,
    content: form.value.content.trim(),
    user: form.value.user.trim()
  }

  const dateKey = selectedDate.value
  if (!events.value[dateKey]) events.value[dateKey] = []

  if (editingId.value === null) {
    events.value[dateKey].push(newEvent)
  } else {
    const index = events.value[dateKey].findIndex(e => e.id === editingId.value)
    if (index !== -1) events.value[dateKey][index] = newEvent
  }
  resetForm()
}

const editEvent = (id) => {
  const event = events.value[selectedDate.value].find(e => e.id === id)
  if (event) {
    const [hour, minute] = event.time.split(':')
    form.value = {
      hour,
      minute,
      content: event.content,
      user: event.user
    }
    editingId.value = id
  }
}

const deleteEvent = (id) => {
  events.value[selectedDate.value] = events.value[selectedDate.value].filter(e => e.id !== id)
  resetForm()
}

const cancelEdit = () => {
  resetForm()
}

const resetForm = () => {
  form.value = {
    hour: '',
    minute: '',
    content: '',
    user: currentUser
  }
  editingId.value = null
}

const calendarAttributes = computed(() =>
  Object.entries(events.value).map(([date, evts]) => ({
    key: date,
    dates: date,
    dot: { color: 'purple' },
    popover: {
      label: evts.map(e => `${e.time} ${e.content}`).join(', ')
    }
  }))
)

const padZero = (n) => n.toString().padStart(2, '0')
</script>



<style scoped>
.container {
  display: flex;
  height: 120%;
  background-color: #ffffff;
}

.schedule-main {
  flex: 1;
  padding: 30px;
  overflow-y: auto;
}

h2 {
  margin-bottom: 20px;
}

.content-grid {
  display: flex;
  gap: 24px;
  align-items: flex-start;
}

.calendar-card {
  background: white;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
  width: 320px;
}

.selected-date {
  margin-top: 10px;
  font-weight: 500;
  color: #555;
}

.activity-area {
  flex: 1;
  min-width: 300px;
  max-width: 600px; /* 限制最大寬度 */
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.form-card {
  background: white;
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
}

.form-group {
  margin-bottom: 12px;
}

.form-group label {
  font-weight: bold;
  display: block;
  margin-bottom: 4px;
}

input, select {
  width: 100%;
  padding: 6px 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.time-selects {
  display: flex;
  align-items: center;
  gap: 8px;
}

.button-row {
  margin-top: 10px;
  display: flex;
  gap: 10px;
}

.btn-submit {
  background-color: #7b3aed;
  color: white;
  padding: 6px 14px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.btn-cancel {
  background-color: #e5e7eb;
  padding: 6px 14px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.event-list ul {
  list-style: none;
  padding: 0;
}

.event-item {
  background: #f3f4f6;
  padding: 10px 12px;
  margin-bottom: 8px;
  border-radius: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.event-buttons button {
  margin-left: 8px;
  background-color: transparent;
  border: none;
  color: #6366f1;
  cursor: pointer;
}

.empty-message {
  color: #888;
  font-style: italic;
}

</style>
