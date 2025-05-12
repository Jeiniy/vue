<template>
  <div id="app" class="min-h-screen flex flex-col">
    <Navbar @toggle-menu="openMenu" />
    <SideMenu :isOpen="showSideMenu" :closeMenu="closeMenu" />
    <div class="flex-grow">
      <router-view />
    </div>
    <Footer v-if="route.path === '/'"  />
  </div>
</template>`

<script setup>
import { ref } from 'vue'
import Navbar from './components/Navbar.vue'
import SideMenu from './components/SideMenu.vue'
import Footer from './components/Footer.vue'
import { useRoute } from 'vue-router' 

const isLoggedIn = ref(localStorage.getItem('isLoggedIn') === 'true')
provide('isLoggedIn', isLoggedIn)  // ✅ 提供全域狀態給其他元件

const showSideMenu = ref(false)
const route = useRoute()

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


