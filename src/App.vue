<template>
  <div id="app">
    <Navbar @toggle-menu="openMenu" />
    <SideMenu :isOpen="showSideMenu" :closeMenu="closeMenu" />
    <router-view />
    <Footer />
  </div>
</template>``

<script setup>
import { ref } from 'vue'
import Navbar from './components/Navbar.vue'
import SideMenu from './components/SideMenu.vue'
import Footer from './components/Footer.vue'

const showSideMenu = ref(false)

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
  height: 100vh;
  display: flex;
  flex-direction: column;

}


.page-container {
  width: 1280px;
  margin: 0 auto;
  padding: 20px;
  background: #fff;
}
</style>


