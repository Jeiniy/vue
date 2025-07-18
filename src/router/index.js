import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import ControlView from '@/views/ControlView.vue'
import FallMonitor from '@/views/FallMonitor.vue'
import ChangeView from '@/views/ChangeView.vue'
import EnterView from '@/views/EnterView.vue'
import EnterView2 from '@/views/EnterView2.vue'
import ScheduleView from '@/views/ScheduleView.vue'
import EmotionView from '@/views/EmotionView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'Home', component: HomeView },
    { path: '/login', name: 'Login', component: LoginView },
    { path: '/register', name: 'Register', component: RegisterView },
    { path: '/control', name: 'Control', component: ControlView },
    { path: '/change', name: 'Change', component: ChangeView },
    { path: '/enter', name: 'Enter', component: EnterView },
    { path: '/enter2', name: 'Enter2', component: EnterView2 },
    { path: '/fall', component: FallMonitor },
    { path: '/Emotion', name: 'Emotion',component: EmotionView },
    { path: '/schedule', name: 'Schedule',component: ScheduleView}
  ]
})

export default router
