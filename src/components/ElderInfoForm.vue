<template>
    <div class="form-wrapper">
      <h1 class="form-title">輸入年長者資訊</h1>
      <form class="form-area">
        <!-- 姓名與性別 -->
        <div class="form-row-basic">
          <div class="form-group">
            <label class="required-label">姓名:</label>
            <input type="text" class="small-input1" v-model="elder.name" required />
          </div>
          <div class="form-group">
            <label class="required-label">性別:</label>
            <label><input type="radio" value="male" v-model="elder.gender" /> 男性</label>
            <label><input type="radio" value="female" v-model="elder.gender" /> 女性</label>
          </div>
        </div>
  
        <!-- 身高與體重 -->
        <div class="form-row-physical">
          <div class="form-group">
            <label class="required-label">身高:</label>
            <input type="number" class="small-input" v-model="elder.height" placeholder="請輸入公分" /> cm
          </div>
          <div class="form-group">
            <label class="required-label">體重:</label>
            <input type="number" class="small-input" v-model="elder.weight" placeholder="請輸入公斤" /> kg
          </div>
        </div>
  
        <!-- 地址 -->
        <div class="form-group form-full">
          <label class="required-label">地址:</label>
          <div class="address-group">
            <select v-model="elder.county" @change="updateDistricts">
              <option value="">請選擇縣市</option>
              <option v-for="county in counties" :key="county" :value="county">{{ county }}</option>
            </select>
  
            <select v-model="elder.district">
              <option value="">請選擇區域</option>
              <option v-for="district in districts" :key="district">{{ district }}</option>
            </select>
  
            <input type="text" v-model="elder.detailAddress" placeholder="請輸入街道或門牌號" />
          </div>
        </div>
  
        <!-- 血型 -->
        <div class="form-group form-full">
          <label class="required-label">血型:</label>
          <div class="radio-group">
            <label><input type="radio" value="A" v-model="elder.bloodType" /> A型</label>
            <label><input type="radio" value="B" v-model="elder.bloodType" /> B型</label>
            <label><input type="radio" value="O" v-model="elder.bloodType" /> O型</label>
            <label><input type="radio" value="AB" v-model="elder.bloodType" /> AB型</label>
            <label>
              <input type="radio" value="other" v-model="elder.bloodType" /> 其他：
              <input type="text" v-model="elder.bloodTypeOther" class="other-input" />
            </label>
          </div>
        </div>
  
        <!-- 慢性病 -->
        <div class="form-group form-full">
          <label class="required-label">慢性病:</label>
          <div class="checkbox-group">
            <label><input type="checkbox" value="糖尿病" v-model="elder.diseases" /> 糖尿病</label>
            <label><input type="checkbox" value="高血壓" v-model="elder.diseases" /> 高血壓</label>
            <label>
              <input type="checkbox" value="其他" v-model="elder.diseases" /> 其他：
              <input type="text" v-model="elder.diseaseOther" class="other-input" />
            </label>
          </div>
        </div>
  
        <!-- 用藥狀況 -->
        <div class="form-group1 form-full">
          <label class="required-label">用藥狀況:</label>
          <div class="checkbox-group">
            <label><input type="checkbox" value="三餐飯後" v-model="elder.medications" /> 三餐飯後</label>
            <label><input type="checkbox" value="三餐飯前" v-model="elder.medications" /> 三餐飯前</label>
            <label><input type="checkbox" value="早晚各一次" v-model="elder.medications" /> 早晚各一次</label>
            <label><input type="checkbox" value="睡前" v-model="elder.medications" /> 睡前</label>
            <label>
              <input type="checkbox" value="其他" v-model="elder.medications" /> 其他：
              <input type="text" v-model="elder.medicationOther" class="other-input" />
            </label>
          </div>
        </div>
  
        <!-- 睡眠習慣 -->
        <div class="form-group1 form-full">
          <label class="required-label">睡眠習慣:</label>
          <div id="sleep-wake-time">
            <div class="time-row">
              <label>晚上睡覺時間:</label>
              <select v-model="elder.sleepHour">
                <option value="">--</option>
                <option v-for="h in 24" :key="h" :value="padZero(h - 1)">{{ padZero(h - 1) }}</option>
              </select>
              :
              <select v-model="elder.sleepMinute">
                <option value="">--</option>
                <option v-for="m in [0,15,30,45]" :key="m" :value="padZero(m)">{{ padZero(m) }}</option>
              </select>
            </div>
  
            <div class="time-row">
              <label>早上起床時間:</label>
              <select v-model="elder.wakeHour">
                <option value="">--</option>
                <option v-for="h in 24" :key="h" :value="padZero(h - 1)">{{ padZero(h - 1) }}</option>
              </select>
              :
              <select v-model="elder.wakeMinute">
                <option value="">--</option>
                <option v-for="m in [0,15,30,45]" :key="m" :value="padZero(m)">{{ padZero(m) }}</option>
              </select>
            </div>
  
            <div class="time-row">
              <label>中午午睡時間:</label>
              <select v-model="elder.napHour">
                <option value="">--</option>
                <option v-for="h in 24" :key="h" :value="padZero(h - 1)">{{ padZero(h - 1) }}</option>
              </select>
              :
              <select v-model="elder.napMinute">
                <option value="">--</option>
                <option v-for="m in [0,15,30,45]" :key="m" :value="padZero(m)">{{ padZero(m) }}</option>
              </select>
            </div>
          </div>
        </div>
  
        <!-- 興趣 -->
        <div class="form-group form-full">
          <label class="required-label">興趣:</label>
          <div class="checkbox-group">
            <label><input type="checkbox" value="看電視" v-model="elder.hobbies" /> 看電視</label>
            <label><input type="checkbox" value="下棋" v-model="elder.hobbies" /> 下棋</label>
            <label><input type="checkbox" value="看報紙" v-model="elder.hobbies" /> 看報紙</label>
            <label><input type="checkbox" value="看書" v-model="elder.hobbies" /> 看書</label>
            <label>
              <input type="checkbox" value="其他" v-model="elder.hobbies" /> 其他：
              <input type="text" v-model="elder.hobbyOther" class="other-input" />
            </label>
          </div>
        </div>
      </form>
    </div>
  </template>
  
  <script setup>
  import { reactive, ref } from 'vue'
  
  const elder = reactive({
    name: '',
    gender: '',
    height: '',
    weight: '',
    county: '',
    district: '',
    detailAddress: '',
    bloodType: '',
    bloodTypeOther: '',
    diseases: [],
    diseaseOther: '',
    medications: [],
    medicationOther: '',
    sleepHour: '',
    sleepMinute: '',
    wakeHour: '',
    wakeMinute: '',
    napHour: '',
    napMinute: '',
    hobbies: [],
    hobbyOther: ''
  })
  
  const counties = Object.keys({
    taipei: [], newtaipei: [], keelung: [], taoyuan: [], hsinchu: [], hsinchu_c: [], miaoli: [],
    taichung: [], changhua: [], nantou: [], yunlin: [], chiayi: [], chiayi_c: [], tainan: [],
    kaohsiung: [], pingtung: [], yilan: [], hualien: [], taitung: [], penghu: [], kinmen: [], lienchiang: []
  })
  
  const districtData = {
    taipei: ['中正區','內湖區','大安區'], // 範例，實際可補齊
    newtaipei: ['板橋區','新莊區'],
    taoyuan: ['桃園區','中壢區'],
    // ...其餘縣市區域
  }
  
  const districts = ref([])
  
  const updateDistricts = () => {
    districts.value = districtData[elder.county] || []
  }
  
  const padZero = (num) => {
    return num.toString().padStart(2, '0')
  }
  </script>
  
  <style scoped>
  @import '@/assets/form.css';
  </style>