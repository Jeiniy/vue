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
        <li class="menu-item" @click="goToControl" >
            <img :src="img5" alt="分析" class="menu-icon" />
            <span>分析頁面</span>
        </li>
        <li class="menu-item" @click="goToEmotion" >
            <img :src="img9" alt="情緒追蹤" class="menu-icon" />
            <span>情緒追蹤</span>
        </li>
         <li class="menu-item" @click="goToSchedule" >
            <img :src="img7" alt="時程安排" class="menu-icon" />
            <span>時程安排</span>
        </li>
        <li class="menu-item" @click="goToFall" >
            <img :src="img8" alt="跌倒偵測" class="menu-icon" />
            <span>跌倒偵測</span>
        </li>
        <li class="menu-item" @click="goToEnter">
            <img :src="img3" alt="年長者資訊" class="menu-icon" />
            <span>年長者資訊</span>
        </li>
        <li class="menu-item" @click="goToEnter2">
            <img :src="img6" alt="緊急聯絡人" class="menu-icon" />
            <span>緊急聯絡人</span>
        </li>
        <li class="menu-item" @click="goToSettings">
            <img :src="img4" alt="設定" class="menu-icon" />
            <span>設定</span>
        </li>
      </ul>
    </aside>
  </div> 
</template>   

<script setup>
import img1 from '@/assets/image/home.png'
import img2 from '@/assets/image/assignment.png' 
import img3 from '@/assets/image/edit.png' 
import img4 from '@/assets/image/settings.png' 
import img5 from '@/assets/image/analytics.png'
import img6 from '@/assets/image/emergency-call.png'
import img7 from '@/assets/image/schedule.png'
import img8 from '@/assets/image/person.png'
import img9 from '@/assets/image/emotions.png'

import { useRouter } from 'vue-router'
const router = useRouter()

function goToHome() {
  router.push('/')
}

function goToSchedule() {
  router.push('/schedule')
}

function goToFall() {
  router.push('/fall')
}

function goToEmotion(){
  router.push('/Emotion')
}

function goToEnter() {
  router.push('/Enter')
}

function goToEnter2() {
  router.push('/Enter2')
}

function goToControl() {
  router.push('/control')
}

function goToSettings() {
  router.push('/change')
}

// const route = useRoute() // ✅ 取得目前的路由路徑
// const isActive = (path) => route.path === path

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
  height: 120%;
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

.menu-icon[alt="緊急聯絡人"] {
  width: 25px;
  height: 25px;
  filter: brightness(0.7);
  opacity: 0.9;
}

.menu-icon[alt="跌倒偵測"] {
  width: 25px;
  height: 25px;
  filter: brightness(0.7);
  opacity: 1;
}

.menu-icon[alt="情緒追蹤"] {
  width: 25px;
  height: 25px;
  filter: brightness(0.7);
  opacity: 1;
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
</style>