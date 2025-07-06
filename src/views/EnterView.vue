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
    <div class="enter-view">
      <div class="form-container">
        <ElderInfoForm ref="elderFormRef" />

        <!-- 按鈕放在所有表單最下面 -->
        <div class="save-button-wrapper">
          <button class="save-button" @click="handleSave">完成</button>
        </div>
      </div>
    </div>
  </div>  
</template>

<script setup>
import img1 from '@/assets/image/home.png'
import img2 from '@/assets/image/assignment.png' 
import img3 from '@/assets/image/edit.png' 
import img4 from '@/assets/image/settings.png' 
import img5 from '@/assets/image/analytics.png' 

import { ref } from 'vue'
import axios from 'axios'
import ElderInfoForm from '@/components/ElderInfoForm.vue'

const elderFormRef = ref()
// const contact1Ref = ref()
// const contact2Ref = ref()

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

const handleSave = async () => {
  const elder = elderFormRef.value.elder
  // const contact1 = contact1Ref.value.contact
  // const contact2 = contact2Ref.value.contact

  const payload = {
    elder,
    // contact1,
    // contact2
  }

  try {
    const res = await axios.post('http://localhost:3000/api/saveData', payload)
    alert('資料已成功送出')
  } catch (err) {
    alert('送出失敗，請稍後再試')
    console.error(err)
  }
}
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
  height: 100%;
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

/* 外層容器：讓整個畫面置中 */
.enter-view {
  display: flex;
  justify-content: flex-start;
  padding: 40px 16px;
  align-items: flex-start; 
  padding: 20px 16px 60px;
}

/* 表單容器：統一寬度並置中內容 */
.form-container {
  width: 100%;
  max-width: 2000px;
  display: flex;
  flex-direction: column;
  gap: 24px; /* 元件之間留白 */
}

/* 儲存按鈕容器 */
.save-button-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 30px;
}

/* 儲存按鈕樣式 */
.save-button {
  padding: 12px 32px;
  background-color: #ae6c45;
  color: white;
  border: none;
  border-radius: 999px;
  font-size: 16px;
  cursor: pointer;
}

.save-button:hover {
  background-color: #935b39;
}
</style>
