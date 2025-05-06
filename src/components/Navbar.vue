<template>
  <nav class="navbar w-full max-w-screen-xl fixed top-0 left-0 w-full z-50 shadow-md ">
    <div class="max-w-screen-2xl mx-auto px-4 sm:px-8 h-[85px] flex items-center justify-between">
        <div class="menu-toggle" @click="$emit('toggle-menu')">
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
        </div>
      </div>
      <h1 class="logo text-base sm:text-xl font-bold text-black whitespace-nowrap truncate ml-4">陪伴型照護機器人</h1>
   
    <ul class="nav-list">
      <li>
        <router-link to="/login">註冊 & 登入</router-link>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
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
  list-style: none;
  margin-left: auto;
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
