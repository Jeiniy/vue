<template>
  <nav class="navbar w-full fixed top-0 left-0 z-50 shadow-md ">
    <div class="max-w-screen-2xl mx-auto px-4 sm:px-8 h-[85px] flex items-center justify-between">
        <div class="menu-toggle" @click="$emit('toggle-menu')">
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
        </div>
      </div>
        <div>
          <h1 class="logo text-base sm:text-xl font-bold text-black whitespace-nowrap truncate">
            陪伴型照護機器人
          </h1>
        </div>
      
      <!-- 右側：根據登入狀態切換 -->
      <ul class="nav-list flex items-center space-x-4">
        <li v-if="!isLoggedIn">
          <router-link to="/register">註冊</router-link>
        </li>
         <li v-if="!isLoggedIn">|</li>
        <li v-if="!isLoggedIn">
          <router-link to="/login">登入</router-link>
        </li>
        <li v-else>
          <router-link to="/" @click="logout">登出</router-link>
        </li>
      </ul>

  </nav>
</template>

<script setup>
import { ref, onMounted, watchEffect } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isLoggedIn = ref(false)
const userName = ref('')



// 初始化
onMounted(() => {
  isLoggedIn.value = localStorage.getItem('isLoggedIn') === 'true'
  userName.value = localStorage.getItem('userName') || ''
})

// 即時同步
watchEffect(() => {
  isLoggedIn.value = localStorage.getItem('isLoggedIn') === 'true'
})

function logout() {
  localStorage.setItem('isLoggedIn', 'false')
  localStorage.removeItem('userName')
  isLoggedIn.value = false
  userName.value = ''
  alert('您已成功登出')
  router.push('/')
}

</script>

<style scoped>
/* 原本的樣式保持不變 */
.navbar {
  max-width: none;
  margin: 0;
  align-items: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  flex-direction: row;
  display: flex;
  padding: 0px 30px;
  height: 85px;
}
.menu-toggle {
  display: flex;
  flex-direction: column;
  cursor: pointer;
}
.bar {
  width: 25px;
  height: 3px;
  background-color: black;
  margin: 3.5px 0;
}
.logo {
  font-size: 25px;
  margin-left: 16px;
  color: #000;
}
.nav-list {
  display: flex; 
  top: 10px;
  flex-wrap: wrap;
  justify-content: center;
  list-style: none;
  margin-left: auto;
}

.nav-list li {
    margin: 0 8px;
    white-space: nowrap;
}

.nav-list a {
  color: #ba6666;
  font-size: 18px;
}
.nav-list a:hover {
  color: #ba6666;
  background-color: #f5d8d8;
  transform: translateX(5px);
}
</style>
