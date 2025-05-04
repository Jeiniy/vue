<template>
    <div>
      <v-calendar
        is-expanded
        :attributes="attributes"
        @dayclick="selectDate"
      />
      
      <div v-if="selectedDate">
        <h3>新增活動：{{ selectedDate }}</h3>
        <input v-model="newEvent" placeholder="輸入活動名稱" />
        <button @click="addEvent">儲存活動</button>
      </div>
      
      <div v-if="events[selectedDate]">
        <h4>活動列表：</h4>
        <ul>
          <li v-for="(event, i) in events[selectedDate]" :key="i">{{ event }}</li>
        </ul>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  
  const selectedDate = ref(null)
  const newEvent = ref('')
  const events = ref({})
  
  // 點選日期
  const selectDate = ({ date }) => {
    selectedDate.value = date.toISOString().split('T')[0]
    newEvent.value = ''
  }
  
  // 新增事件
  const addEvent = () => {
    if (!events.value[selectedDate.value]) {
      events.value[selectedDate.value] = []
    }
    events.value[selectedDate.value].push(newEvent.value)
    newEvent.value = ''
  }
  
  // 日曆上標記活動日
  const attributes = computed(() =>
    Object.entries(events.value).map(([date, evts]) => ({
      key: date,
      dates: date,
      dot: { color: 'blue', class: 'my-dot' },
      popover: {
        label: evts.join(', '),
      },
    }))
  )
  </script>
  
  <style>
  .my-dot {
    background-color: #3498db;
  }
  </style>
  