<template>
    <div class="control-view">
      <h1>控制中心</h1>
  
      <!-- 快速操作按鈕列 -->
      <div class="button-group">
        <button @click="goToFallMonitor">查看影像</button>
        <button @click="goToEnter">設定/修改年長者資訊</button>
      </div>
  
      <!-- 下面是其他元件 -->
      <Schedules />
      <MoodGauge />
    </div>
  </template>
  
  <script setup>
  import Schedules from '@/components/Schedules.vue'
  import { useRouter } from 'vue-router'
const router = useRouter()

  function goToFallMonitor() {
    router.push('/fall')
  }
  
  function goToEnter() {
    // 導向行程頁
    window.location.href = '/enter'
  }
  
  function logout() {
    localStorage.removeItem('token')
    window.location.href = '/login'
  }
  </script>
  
  <style scoped>
  .button-group {
    margin-bottom: 16px;
  }
  button {
    margin-right: 12px;
    padding: 10px 20px;
    border: none;
    background-color: #4a90e2;
    color: white;
    border-radius: 8px;
    cursor: pointer;
  }
  button:hover {
    background-color: #357abd;
  }
  </style>
  