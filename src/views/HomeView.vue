<template>
  
   <div class="page-container">
    <div class="carousel-wrapper">
      <Carousel /> 
    </div>

    <section class="home-intro">
      
    </section>
  </div>
</template>

<script setup>
import Carousel from '@/components/Carousel.vue'
</script>


<style scoped>
.page-container {
  min-height: calc(100vh - 100px);
  width: 100%;
  max-width: 1200px; /* 控制版心最大寬度 */
  margin: 0 auto; /* 讓它左右自動置中 */
  padding: 20px;
  box-sizing: border-box;
}
/* .home-view {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
} */


.carousel-wrapper-full {
  width: 100%;
  margin: 0;
  padding: 0;
}


.content-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}
</style>
