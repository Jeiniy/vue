<template>
    <main class="login-page-main">
      <div class="login-box">
        <div class="input-box">
          <i class="fas fa-envelope"></i>
          <input type="email" id="email"  placeholder="Email" v-model="email" />
        </div>
  
        <div class="input-box">
          <i class="fas fa-lock"></i>
          <input type="password" id="password" placeholder="Password" v-model="password" />
        </div>
  
        <div class="btn-group">
          <router-link to="/register">
            <button class="btn register">註冊</button>
          </router-link>
          <router-link to="/userhome">
            <button class="btn login">登入</button>
          </router-link>
        </div>
      </div>
      <!-- <div class="circle"></div> -->
      <!-- <svg width="100" height="100">
            <polygon points="50,15 90,85 10,85" fill="#e67e22" />
      </svg> -->

      <!-- <div class="rounded-box"></div> -->
    </main>
    
  </template>
  
  <script>
  export default {
    name: 'LoginPage',
    data() {
      return {
        email: '',
        password: ''
      }
    }
  }
  </script>
  
  <style scoped>
  .login-page-main {
    min-height: calc(100vh - 200px);
    min-width: 100vh;
    position: relative;
  }
  
  .login-box {
    position: absolute;
    top: 50%;
    left: 20%;
    transform: translate(-50%, -50%);
    width: 400px;
    padding: 50px 40px;
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 20px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    z-index: 1000;
  }

  /* Email 與 Password 輸入欄 */
  .input-box {
    width: 300px; 
    margin: 0 auto 30px; 
    display: flex;
    align-items: center;
    background-color: #ddd;
    border-radius: 25px;
    padding: 10px 20px;
  }
  
/* 信封圖示和鎖頭圖示 */
  .input-box i {
    font-size: 20px;
    margin-right: 10px;
  }  
  

  /* 輸入 Email 和 Password 的文字欄位 */
  .input-box input {
    border: none;
    background: transparent;
    outline: none;
    flex: 1;
    font-size: 15px;
    padding: 12px 10px;
  }

  
  /* 註冊和登入 按鈕區 */
  .btn-group {
    display: flex;
    justify-content: center;
    gap: 30px;
    width: 300px;
    margin: 0 auto;
    margin-top: 20px;
  }
  
  /* 按鈕的外觀 */
  .btn {
    min-width: 120px;   /* 保底寬度 */
    width: 45%;
    padding: 12px 20px;
    border: none;
    border-radius: 999px !important;
    font-size: 16px;
    cursor: pointer;
  }

   /* 註冊按鈕顏色 */
   .btn.register {
    background-color: #ae6c45;
    color: white;
  }
  /* 登入按鈕顏色 */
  .btn.login {
    background-color: #ae6c45;
    color: white;
  }

  .btn.register:hover {
    background-color: #935b39;
  }
  .btn.login:hover {
  background-color: #935b39;
  }

/* .circle {
  width: 100px;
  height: 100px;
  background-color: #3498db;
  border-radius: 50%; 
} */
/* .rounded-box {
  width: 300px;
  height: 200px;
  margin-top: 200px;   
  margin-left: 800px;
  background-color: #e7a57c; 
  border-radius: 20px; 
} */
</style>
  
  