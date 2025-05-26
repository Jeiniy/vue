<template>
    <div class="form-wrapper">
      <h1 class="form-title">輸入年長者資訊</h1>
      <form class="form-area" @submit.prevent="submitForm">
        <!-- 姓名與性別 -->
        <div class="form-row-basic">
          <div class="form-group">
            <label class="required-label">姓名:</label>
            <input type="text" class="small-input" v-model="elder.name" required placeholder="請輸入姓名"  />
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
  
            <input type="text" class="small-input1" v-model="elder.detailAddress" placeholder="請輸入街道或門牌號" />
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
            <br>
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
            <br>
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
  import axios from 'axios'

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
    defineExpose({
    elder
  })
  
  const counties = Object.keys({
    台北市: [], 新北市: [], 基隆市: [], 桃園市: [], 新竹市: [], 新竹縣: [], 苗栗縣: [],
    臺中市: [], 彰化縣: [], 南投縣: [], 雲林縣: [], 嘉義市: [], 嘉義縣: [], 臺南市: [],
    高雄市: [], 屏東縣: [], 宜蘭縣: [], 花蓮縣: [], 臺東縣: [], 澎湖縣: [], 金門縣: [], 連江縣: []
  })
  
  const districtData = {
    台北市: ["中正區","中正區","內湖區", "大安區", "信義區", "士林區", "北投區","內湖區","南港區","大同區","文山區","松山區","萬華區"],
    新北市: ["三峽區","三芝區","三重區","中和區","五股區","八里區","土城區","坪林區","平溪區","新店區","新莊區","板橋區","林口區","樹林區","永和區","汐止區","泰山區","淡水區","深坑區","烏來區","瑞芳區","石碇區","石門區","萬里區","蘆洲區","貢寮區","金山區","雙溪區","鶯歌區"],
    基隆市: ["七堵區","中山區","中正區","仁愛區","信義區","安樂區","暖暖區"],
    桃園市: ["中壢區","八德區","大園區","大溪區","桃園區","龜山區","蘆竹區","觀音區","新屋區","楊梅區","平鎮區","復興區","龍潭區"],
    新竹市: ["北區","東區","香山區"],
    新竹縣: ["竹北市", "竹東鎮", "新埔鎮", "關西鎮", "湖口鄉", "新豐鄉", "芎林鄉", "橫山鄉", "北埔鄉", "寶山鄉", "峨眉鄉", "尖石鄉", "五峰鄉"],
    苗栗縣: ["苗栗市", "頭份市","苑裡鎮", "通霄鎮", "竹南鎮", "後龍鎮", "卓蘭鎮", "西湖鄉", "造橋鄉", "頭屋鄉", "公館鄉", "銅鑼鄉", "三義鄉", "大湖鄉", "獅潭鄉", "南庄鄉", "三灣鄉", "泰安鄉"],
    臺中市: ["中區", "東區", "南區", "西區", "北區", "北屯區", "西屯區", "南屯區", "太平區", "大里區", "霧峰區", "烏日區", "豐原區", "后里區", "石岡區", "東勢區", "和平區", "新社區", "潭子區", "大雅區", "神岡區", "大肚區", "沙鹿區", "龍井區", "梧棲區", "清水區", "大甲區", "外埔區", "大安區"],
    彰化縣:["彰化市", "鹿港鎮", "和美鎮", "線西鄉", "伸港鄉", "福興鄉", "秀水鄉", "花壇鄉", "芬園鄉", "員林市", "溪湖鎮", "田中鎮", "大村鄉", "埔鹽鄉", "埔心鄉", "永靖鄉", "社頭鄉", "二水鄉", "北斗鎮", "二林鎮", "田尾鄉", "埤頭鄉", "芳苑鄉", "大城鄉", "竹塘鄉", "溪州鄉"],
    南投縣:["南投市", "埔里鎮", "草屯鎮", "竹山鎮", "集集鎮", "名間鄉", "鹿谷鄉", "中寮鄉", "魚池鄉", "國姓鄉", "水里鄉", "信義鄉", "仁愛鄉"],
    雲林縣:["斗六市", "斗南鎮", "虎尾鎮", "西螺鎮", "土庫鎮", "北港鎮", "古坑鄉", "大埤鄉", "莿桐鄉", "林內鄉", "二崙鄉", "崙背鄉", "麥寮鄉", "東勢鄉", "褒忠鄉", "臺西鄉", "元長鄉", "四湖鄉", "口湖鄉", "水林鄉"],
    嘉義市:["東區", "西區"],
    嘉義縣:["番路鄉", "梅山鄉", "竹崎鄉", "阿里山鄉", "中埔鄉", "大埔鄉", "水上鄉", "鹿草鄉", "太保市", "朴子市", "東石鄉", "六腳鄉", "新港鄉", "民雄鄉", "大林鎮", "溪口鄉", "義竹鄉", "布袋鎮"],
    臺南市:["中西區", "東區", "南區", "北區", "安平區", "安南區", "永康區", "歸仁區", "新化區", "左鎮區", "玉井區", "楠西區", "南化區", "仁德區", "關廟區", "龍崎區", "官田區", "麻豆區", "佳里區", "西港區", "七股區", "將軍區", "學甲區", "北門區", "新營區", "後壁區", "白河區", "東山區", "六甲區", "下營區", "柳營區", "鹽水區", "善化區", "大內區", "山上區", "新市區", "安定區"],
    高雄市:["新興區", "前金區", "苓雅區", "鹽埕區", "鼓山區", "旗津區", "前鎮區", "三民區", "楠梓區", "小港區", "左營區", "仁武區", "大社區", "岡山區", "路竹區", "阿蓮區", "田寮區", "燕巢區", "橋頭區", "梓官區", "彌陀區", "永安區", "湖內區", "鳳山區", "大寮區", "林園區", "鳥松區", "大樹區", "旗山區", "美濃區", "六龜區", "內門區", "杉林區", "甲仙區", "桃源區", "那瑪夏區", "茂林區", "茄萣區"],
    屏東縣:["屏東市", "潮州鎮", "東港鎮", "恆春鎮", "萬丹鄉", "長治鄉", "麟洛鄉", "九如鄉", "里港鄉", "鹽埔鄉", "高樹鄉", "萬巒鄉", "內埔鄉", "竹田鄉", "新埤鄉", "枋寮鄉", "新園鄉", "崁頂鄉", "林邊鄉", "南州鄉", "佳冬鄉", "琉球鄉", "車城鄉", "滿州鄉", "枋山鄉", "三地門鄉", "霧臺鄉", "瑪家鄉", "泰武鄉", "來義鄉", "春日鄉", "獅子鄉", "牡丹鄉"],
    宜蘭縣:["宜蘭市", "羅東鎮", "蘇澳鎮", "頭城鎮", "礁溪鄉", "壯圍鄉", "員山鄉", "冬山鄉", "五結鄉", "三星鄉", "大同鄉", "南澳鄉"],
    花蓮縣:["花蓮市", "鳳林鎮", "玉里鎮", "新城鄉", "吉安鄉", "壽豐鄉", "光復鄉", "豐濱鄉", "瑞穗鄉", "萬榮鄉", "卓溪鄉", "富里鄉"],
    臺東縣:["臺東市", "成功鎮", "關山鎮", "卑南鄉", "大武鄉", "太麻里鄉", "東河鄉", "長濱鄉", "鹿野鄉", "池上鄉", "綠島鄉", "延平鄉", "海端鄉", "達仁鄉", "金峰鄉", "蘭嶼鄉"],
    澎湖縣:["馬公市", "湖西鄉", "白沙鄉", "西嶼鄉", "望安鄉", "七美鄉"],
    金門縣:["金城鎮", "金沙鎮", "金湖鎮", "金寧鄉", "烈嶼鄉", "烏坵鄉"],
    連江縣:["南竿鄉", "北竿鄉", "莒光鄉", "東引鄉"],
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