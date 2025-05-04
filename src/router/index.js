import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import ControlView from '@/views/ControlView.vue'
import FallMonitor from '@/components/FallMonitor.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'Home', component: HomeView },
    { path: '/login', name: 'Login', component: LoginView },
    { path: '/register', name: 'Register', component: RegisterView },
    { path: '/control', name: 'Control', component: ControlView },
    { path: '/fall', component: FallMonitor },
    { path: '/schedules', name: 'Schedules',component: () => import('@/components/Schedules.vue')}
  ]
})

export default router
