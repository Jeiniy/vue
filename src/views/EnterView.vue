<template>
    <div class="enter-view">
      <ElderInfoForm />
      <EmergencyContact title="緊急聯絡人1" />
      <EmergencyContact title="緊急聯絡人2" />

    </div>
  </template>
  
  <script setup>
  import ElderInfoForm from '@/components/ElderInfoForm.vue'
  import EmergencyContact from '@/components/EmergencyContact.vue'
  
  const handleSave = () => {
    alert('點擊儲存，可在此處新增表單驗證或送出資料至後端')
    // 可加入欄位檢查邏輯與錯誤提示
  }
  </script>
  
  <style scoped>
  .enter-view {
    padding: 40px;
  
  }
  .save-button-wrapper {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
  .save-button {
    padding: 12px 32px;
    background-color: #ae6c45;
    color: white;
    border: none;
    border-radius: 999px;
    font-size: 16px;
    cursor: pointer;
  }
  .save-button:hover {
    background-color: #935b39;
  }
  </style>