<script setup>
defineProps({
  msg: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <section class="concept">
    <div class="text-area">
      <h1>關於我們</h1>
      <h3>「用心傾聽，化作溫暖」</h3>
      <p>
        隨著高齡化社會的加劇，獨居老人的人數逐年攀升，面臨社交孤立、記憶衰退與健康管理等多重挑戰。
        傳統的人力照護方式受限於資源，難以提供即時且持續的陪伴。</p><br>
      <p>
          因此，我們希望結合 AI 技術，打造一套智慧照護解決方案，提升長者的生活品質與安全感。
      </p>
      
        <router-link to="/AboutView" class="view-more">VIEW MORE
          <span class="circle-arrow"> 
            <span class="inner-arrow">&gt;</span>
          </span>
        </router-link>
    
        
    </div>
    <div class="image-wrap">
      <div class="bg-block"></div>
      <img src="@/assets/image/us.png" alt="關於我們">
    </div>
  </section>      
</template>

<style scoped>
.concept {
  width: 115%;
  display: flex;
  background: #ffffff;
  padding: 70px;
  border-radius: 20px;
  flex-wrap: wrap;
  transform: translateX(-115px);
}

.text-area {
  width: 65%;  
  padding-right: 30px;
}

.text-area h1 {
  font-size: 100px;
  color: #5d5954;
  opacity: 0.2;
}

.text-area h3 {
  font-size: 24px;
  margin-bottom: 20px;
  color: #686868;
}

.text-area p {
  font-size: 20px;
  color: #666;
  line-height: 1.8;
}

.view-more {
  font-size: 20px;
  display: inline-flex;
  align-items: center;
  margin-top: 20px;
  color: #ba6666; /* 這裡是文字顏色 */
  text-decoration: none;
  font-weight: 500;
  gap: 10px;
  border-bottom: 1px solid #ba6666; /* 底線顏色 */
  transition: all 0.3s; 
}

.view-more:hover {
  color: #7d4f4f;
  background-color: #f5d8d8; 
  transform: translateX(5px);
}

.circle-arrow {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #a67c52;
  color: #fff;
  font-size: 20px;
  transition: all 0.3s;
  top: -2px; 
}
.inner-arrow {
  position: relative;
  top: -2px; /* ⬅️ 箭頭往上移動 */
}

.view-more:hover .circle-arrow {
  transform: scale(1.1);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.image-wrap {
  position: relative;
  top: 10;
  width: 10%;
  padding: 20px;
  margin-top: 40px;
  margin-left: -40px;  
  transform: translateX(70px);
}

.bg-block {
  position: absolute;
  left: -20px;
  width: 300px;
  height: 220px;
  background: #efe7dc;
  border-radius: 12px;
  z-index: 1;
  transform: translate(80%, -20%);
}

.image-wrap img {
  position: relative;
  width: 350px;
  border-radius: 8px;
  z-index: 2;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
}
@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
