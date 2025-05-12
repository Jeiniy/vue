<template>
  <div class="carousel w-full max-w-screen-xl ">
    <div 
      class="carousel-slide  h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] " 
      :style="{ backgroundImage: `url(${images[currentIndex]})` }"
    >
    </div>

    <!-- 左右切換按鈕 -->
    <!-- <button class="carousel-button prev" @click="prevImage">‹</button>
    <button class="carousel-button next" @click="nextImage">›</button> -->

  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

import img1 from '@/assets/image/8.png'
import img2 from '@/assets/image/9.png'
import img3 from '@/assets/image/10.png'

const images = [img1, img2, img3]

const currentIndex = ref(0)

function nextImage() {
  currentIndex.value = (currentIndex.value + 1) % images.length
}
function prevImage() {
  currentIndex.value = (currentIndex.value - 1 + images.length) % images.length
}
function goToImage(index) {
  currentIndex.value = index
}

let timer
onMounted(() => {
  timer = setInterval(nextImage, 4000) // 每4秒換一次
})
onUnmounted(() => {
  clearInterval(timer)
})
</script>

<style scoped>
.carousel {
  margin-top: 20px;

  overflow: hidden;
  
}

.carousel-slide {
  width: 100%;
  height: 600px; /* 高度你可以自己調 */
  background-size: cover;
  background-position: center ;
  background-repeat: no-repeat;
}

/* 左右按鈕 */
.carousel-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.3);
  color: white;
  border: none;
  font-size: 30px;
  padding: 10px;
  cursor: pointer;
  border-radius: 30%;
}

.carousel-button.prev {
  left: 20px;
}
.carousel-button.next {
  right: 20px;
}

/* 小圓點 */
/* .carousel-indicators {
  position: absolute;
  bottom: 15px;
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 10px;
} */

.carousel-indicators span {
  display: block;
  width: 12px;
  height: 12px;
  background: #ccc;
  border-radius: 50%;
  cursor: pointer;
}

.carousel-indicators span.active {
  background: #00a67e;
}
</style>
