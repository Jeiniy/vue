<template>
  <main class="login-page-main">
    <div class="login-box">
      <div class="input-box">
        <i class="fas fa-envelope"></i>
        <input type="email" id="email" placeholder="Email" v-model="email" />
      </div>

      <div class="input-box">
        <i class="fas fa-lock"></i>
        <input type="password" id="password" placeholder="Password" v-model="password" />
      </div>

      <div class="btn-group ">
        <button class="btn register" @click="goToRegister">註冊</button>
        <button class="btn login" @click="login">登入</button>  
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'



// 假資料：可自行更改
// const dummyUsers = [
//   {
//     email: 'test@example.com',
//     password: '123456',
//     name: 'Test User'
//   },
//   {
//     email: 'admin@example.com',
//     password: 'admin123',
//     name: 'Admin'
//   }
// ]

// function login() {
//   if (!email.value || !password.value) {
//     alert('請輸入Email和密碼')
//     return
//   }

//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
//   if (!emailRegex.test(email.value)) {
//     alert('Email格式錯誤')
//     return
//   }

//   // 用前端寫死的帳號密碼比對
//   const user = dummyUsers.find(
//     u => u.email === email.value && u.password === password.value
//   )

//   if (user) {
//     alert('登入成功！')
//     localStorage.setItem('isLoggedIn', 'true')
//     localStorage.setItem('userName', user.name)

//     window.location.href = '/control'  // 或 router.push('/control')
//   } else {
//     alert('登入失敗，帳號或密碼錯誤')
//   }
// }

// function goToRegister() {
//   router.push('/register')
// }


import { ref } from 'vue'
import axios from 'axios'
import { nextTick } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const router = useRouter()

async function login() {
  if(!email.value || !password.value){
    alert('請輸入Email和密碼')
    return
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if(!emailRegex.test(email.value)){
    alert('Email格式錯誤')
    return
  }
  try {
    const response = await axios.post('http://localhost:3000/api/login', {
      email: email.value,
      password: password.value
    })

    if (response.data.success) {
      alert('登入成功！')
      localStorage.setItem('isLoggedIn', 'true')
      localStorage.setItem('userName', response.data.name)

      window.location.href = '/control'

    } else {
      alert(response.data.message || '登入失敗')
    }
    } catch (error) {
      alert('連線失敗，請稍後再試')
      console.error(error)
    }
}
function goToRegister() {
  router.push('/register')
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
    width: 00px;
    margin: 0 auto;
    margin-top: 20px;
  }
  
  /* 按鈕的外觀 */
  .btn {
    min-width: 120px;   /* 保底寬度 */
    width: 45%;
    padding: 10px 20px;
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
  
  
