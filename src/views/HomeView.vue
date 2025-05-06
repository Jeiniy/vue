<template>
  
   
    <div class="carousel-wrapper ">
    <Carousel /> 
    </div>
    <AboutUs/>
    <section class="home-intro">
      
    </section>
 
</template>

<script setup>
import AboutUs from '@/components/AboutUs.vue';
import Carousel from '@/components/Carousel.vue'
</script>


<style scoped>
.page-container {
  min-height: 100vh; 
  width: 100%;
  top:-20px;
  margin: 0 auto; /* 讓它左右自動置中 */
  padding: 20px;
  box-sizing: border-box;
}

.content-wrapper {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
}
</style>
