<template>

  <div class="max-w-3xl mx-auto p-4 text-white">

    <h1 class="text-3xl font-bold mb-4 text-center">跌倒偵測監控台</h1>



    <!-- 即時影像 -->

    <div class="border-4 border-gray-700 rounded-xl overflow-hidden shadow-lg">

      <img :src="`${api}/video_feed`" class="block w-full" />

    </div>



    <!-- 跌倒狀態 -->

    <div class="mt-6 text-center">

      <span v-if="fall" class="text-red-500 text-2xl font-bold animate-pulse">

        ⚠️ 跌倒警報！

      </span>

      <span v-else class="text-green-400 text-xl font-medium">

        ✅ 無跌倒狀態

      </span>

    </div>



    <p class="mt-2 text-sm text-gray-400 text-center">更新：{{ tsLabel }}</p>

  </div>

</template>



<script setup>

import { ref, computed } from 'vue'



const api  = import.meta.env.VITE_API ?? location.origin

const fall = ref(false)

const ts   = ref(0)



/* 監聽後端 SSE */

const es = new EventSource(`${api}/events`)

es.onmessage = e => {

  const { fall: f, ts: t } = JSON.parse(e.data)

  fall.value = f

  ts.value   = t

}

es.onerror = () => console.warn('SSE 連線中斷，將自動重試…')



const tsLabel = computed(() =>

  ts.value ? new Date(ts.value * 1000).toLocaleString() : '—'

)
function goBack() {
  router.go(-1)
}
</script>

