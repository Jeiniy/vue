<template>
  <nav class="navbar">
    <div class="menu-toggle" @click="$emit('toggle-menu')">
      <span class="bar"></span>
      <span class="bar"></span>
      <span class="bar"></span>
    </div>
    <h1 class="logo">陪伴型照護機器人</h1>
    <ul class="nav-list">
      <li>
        <router-link to="/login">註冊 & 登入</router-link>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.navbar {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 80px;
  align-items: center;
  padding: 15px 30px;
  background-color: #ffffff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
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
