<template>
  <div id="app" class="min-h-screen flex flex-col">
    <!-- 一般 Navbar：當前路由不在排除名單時顯示 -->
    <Navbar v-if="!noNavbarRoutes.includes(route.path)" @toggle-menu="openMenu" />
    
    <!-- 控制頁專用 Navbar -->
    <NavbarControl v-if="controlNavbarRoutes.includes(route.path)" />
    
    <!-- 側邊選單 -->
    <SideMenu :isOpen="showSideMenu" :closeMenu="closeMenu" />
    
    <!-- 主要內容 -->
    <div class="flex-grow">
      <router-view />
    </div>

    <!-- Footer 只在首頁顯示 -->
    <Footer v-if="route.path === '/'" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import Navbar from './components/Navbar.vue'
import NavbarControl from './components/NavbarControl.vue'
import SideMenu from './components/SideMenu.vue'
import Footer from './components/Footer.vue'


const showSideMenu = ref(false)
const route = useRoute()

// 哪些頁面不顯示主 Navbar
const noNavbarRoutes = ['/control', '/Enter']
// 哪些頁面顯示控制專用 NavbarControl
const controlNavbarRoutes = ['/control', '/Enter']

function openMenu() {
  showSideMenu.value = true
}

function closeMenu() {
  showSideMenu.value = false
}
</script>

<style>
html, body, #app {
  width: 100%;
  min-height: 100vh;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;

}


.page-container {
  width: 100%;
  margin: 0;
  padding: 20px;
  background: #fff;
}
</style>


