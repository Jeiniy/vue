<template>
    <div class="form-wrapper1">
      <h2 class="form-title">{{ title }}</h2>
      <form class="form-area">
        <!-- 姓名與電話 -->
        <div class="form-row-basic">
          <div class="form-group">
            <label class="required-label">姓名:</label>
            <input type="text" class="small-input1" v-model="contact.name" required />
          </div>
          <div class="form-group">
            <label class="required-label">電話:</label>
            <input type="text" class="small-input1" v-model="contact.phone" required />
          </div>
        </div>
  
        <!-- 地址 -->
        <div class="form-group form-full">
          <label class="required-label">地址:</label>
          <div class="address-group">
            <select v-model="contact.county">
              <option value="">請選擇縣市</option>
              <option v-for="county in counties" :key="county" :value="county">{{ county }}</option>
            </select>
  
            <select v-model="contact.district">
              <option value="">請選擇區域</option>
              <!-- 可根據縣市動態更新 -->
            </select>
  
            <input type="text" v-model="contact.detailAddress" placeholder="請輸入街道或門牌號" />
          </div>
        </div>
  
        <!-- 關係 -->
        <div class="form-group">
          <label class="required-label">身分:</label>
          <select v-model="contact.relationship">
            <option value="" selected disabled></option>
            <option value="son">兒子</option>
            <option value="daughter">女兒</option>
            <option value="grandson">孫子</option>
            <option value="granddaughter">孫女</option>
            <option value="spouse">配偶</option>
            <option value="relative">其他親戚</option>
            <option value="friend">朋友</option>
            <option value="caregiver">照護者</option>
            <option value="other">其他</option>
          </select>
        </div>
      </form>
    </div>
  </template>
  
  <script setup>
  import { reactive, defineProps } from 'vue'
  
  const props = defineProps({
    title: String
  })
  
  const contact = reactive({
    name: '',
    phone: '',
    county: '',
    district: '',
    detailAddress: '',
    relationship: ''
  })
  
  const counties = [
    '台北市', '新北市', '基隆市', '桃園市', '新竹市', '新竹縣', '苗栗縣',
    '臺中市', '彰化縣', '南投縣', '雲林縣', '嘉義市', '嘉義縣', '臺南市',
    '高雄市', '屏東縣', '宜蘭縣', '花蓮縣', '臺東縣', '澎湖縣', '金門縣', '連江縣'
  ]
  </script>
  
  <style scoped>
  .form-wrapper1 {
    padding: 20px;
    margin-bottom: 20px;
    background: #fff9f0;
    border: 1px solid #ccc;
    border-radius: 10px;
  }
  .form-title {
    font-size: 18px;
    margin-bottom: 15px;
  }
  .form-row-basic {
    display: flex;
    gap: 20px;
  }
  .small-input1 {
    padding: 8px;
    width: 150px;
  }
  .address-group select,
  .address-group input {
    margin-right: 10px;
    padding: 6px;
  }
  .required-label::after {
    content: '*';
    color: red;
    margin-left: 4px;
  }
  </style>