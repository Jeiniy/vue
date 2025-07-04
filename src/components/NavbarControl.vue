
<template>
  <nav class="navbar w-full fixed top-0 left-0 z-50 shadow-lg ">
        <div>
          <h1 class="logo text-base sm:text-xl font-bold text-black whitespace-nowrap truncate">
            陪伴型照護機器人
          </h1>
        </div>
      
      <!-- 右側：根據登入狀態切換 -->
      <ul class="nav-list flex items-center space-x-4">
        <li  v-if="userName" class="menu-item1">👤 {{ userName }}</li>
         <li v-if="!isLoggedIn" class="menu-item2" >|</li>
        <li class="menu-item" @click.prevent="logout">
          <span>登出</span>
        </li>
      </ul>

  </nav>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const userName = ref('')

// 取得 localStorage 資料
onMounted(() => {
  userName.value = localStorage.getItem('userName') || ''
})

function logout() {
  localStorage.removeItem('isLoggedIn')
  localStorage.removeItem('userName')
  alert('您已成功登出')
  router.push('/')
}
</script>

<style scoped>
.navbar {
  background-color: #ffffff;
  display: flex;
  align-items: center;
  padding: 0px 30px;
  height: 70px;
  border-bottom: 1px solid #e2e2e2;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.logo {
  font-size: 25px;
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

.menu-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  color: #333;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}
.menu-item:hover {
  background-color: #f0f0f0;
  color: #7d4ce0; /* 變成紫色字 */
  border-radius: 6px;
}
.menu-item1 {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  color: #333;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}
.menu-item2 {
  display: flex;
  align-items: center;
  gap: 2px;
  padding: 5px 3px;
  color: #333;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

.menu-item:hover {
  background-color: #f0f0f0;
  color: #7d4ce0; /* 變成紫色字 */
  border-radius: 6px;
}


</style>
