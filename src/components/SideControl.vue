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
  </div> 
</template>   

<script setup>
import img1 from '@/assets/image/home.png'
import img2 from '@/assets/image/assignment.png' 
import img3 from '@/assets/image/edit.png' 
import img4 from '@/assets/image/settings.png' 

const router = useRouter()

const goToHome = () => {
  router.push('/')
}

const goToEnter = () => {
  router.push('/enter')
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
</style>