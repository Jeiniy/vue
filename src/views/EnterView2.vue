<template>
  <div class="container">
    <SideControl />
    <div class="enter-view">
      <div class="form-container">
        <EmergencyContact title="緊急聯絡人 1" ref="contact1Ref" />
        <EmergencyContact title="緊急聯絡人 2" ref="contact2Ref" />

        <!-- 按鈕放在所有表單最下面 -->
        <div class="save-button-wrapper">
          <button class="save-button" @click="handleSave">完成</button>
        </div>
      </div>
    </div>
  </div>  
</template>

<script setup>
import SideControl from '@/components/SideControl.vue'

import { ref } from 'vue'
import axios from 'axios'
const contact1Ref = ref()
const contact2Ref = ref()

import { useRouter } from 'vue-router'
import EmergencyContact from '@/components/EmergencyContact.vue'
const router = useRouter()


function goToHome() {
  router.push('/')
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

const handleSave = async () => {

  const contact1 = contact1Ref.value.contact
  const contact2 = contact2Ref.value.contact

  const payload = {
    contact1,
    contact2
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
