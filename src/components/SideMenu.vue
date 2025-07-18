<template>
  <div v-if="isOpen" class="overlay" @click.self="closeMenu">
    <div
      class="side-menu fixed top-0 left-0 h-full w-[75%] sm:w-[240px] md:w-[320px] bg-white shadow-lg p-4 sm:p-6 flex flex-col justify-between transition-all duration-300"
      :class="{
        'left-0': isOpen,
        '-left-[75%] sm:-left-[260px] lg:-left-[320px]': !isOpen,
      }"
    >
      <!-- 標題 -->
      <div class="menu-header text-base sm:text-xl font-bold mb-2">
        <h2>陪伴型照護機器人</h2>
        <hr />
      </div>

      <!-- 未登入選單（僅顯示前三項） -->
      <ul class="menu-list" v-if="!isLoggedIn">
        <li><router-link to="/"><img :src="img1" /> 回首頁</router-link></li>
        <li><a href="#"><img :src="img2" /> 關於我們 </a></li>
        <li><a href="#"><img :src="img3" /> 使用教學 </a></li>
        <li><router-link to="/control"><img :src="img5" /> 分析頁面 </router-link></li>
      </ul>

      <!-- 底部登入連結 -->
      <div class="menu-footer">
        <router-link to="/login">登入</router-link>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref } from 'vue'
import img1 from '@/assets/image/home.png'
import img2 from '@/assets/image/graduate.png'
import img3 from '@/assets/image/assignment.png'
import img4 from '@/assets/image/user.png'
import img5 from '@/assets/image/analytics.png'
defineProps({
  isOpen: Boolean,
  closeMenu: Function
})

const isLoggedIn = ref(false) // 預設未登入

</script>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 3000; 
}

.side-menu {
  position: fixed;
  top: 0;
  /* left: -160px; 
  width: 260px; */
  height: 100vh;
  background: white;
  box-shadow: 2px 0 5px rgba(0,0,0,0.2);
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: left 0.3s ease; 
}

.side-menu.open {
  left: 0; 
}

/* .menu-header h2 {
  margin-bottom: 10px;
  font-size: 27px;
} */

.menu-header hr {
  margin-top: 20px;
  margin-bottom: 20px;
}
.menu-list {
  list-style: none;
  padding: 0;
  margin: 0;
  flex-grow: 1;
}
.menu-footer  {
  text-align: right;
}

.menu-footer a{
  color: #ba6666;
  font-size: 18px;
}

.menu-footer a:hover {
  color: #7d4f4f;
  background-color: #f5d8d8; 
  transform: translateX(5px);
}

.menu-list li {
  margin: 15px 0;
  display: flex; 
  align-items: center;
}

.menu-list a {
  text-decoration: none;
  color: #ba6666;
  font-size: 18px;
  display: flex; 
  align-items: center;
  gap: 10px; 
}
.menu-list a:hover {
  color: #7d4f4f;
  background-color: #f5d8d8; 
  transform: translateX(5px);
}

</style>
