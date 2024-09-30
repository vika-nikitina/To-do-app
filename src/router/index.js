import { createRouter, createWebHistory } from 'vue-router';
import TheRegistrationPage from '../components/TheRegistrationPage.vue';
import TheKanban from '../components/TheKanban.vue';
import TheAuthPage from '../components/TheAuthPage.vue';

const routes = [
  { 
    path: '/', 
    component: TheKanban, 
    meta: { requiresAuth: true }
  },
  { 
    path: '/register', 
    component: TheRegistrationPage 
  },
  { 
    path: '/auth', 
    component: TheAuthPage 
  },
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
});

//Функция, которая проверяет наличие токена
function isAuthenticated() {
    return !!localStorage.getItem('token');
} 

// Навешиваем глобальный охранник маршрутов
router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && !isAuthenticated()) {
        next('/auth'); // Перенаправляем на страницу авторизации, если нет токена
    } else {
        next(); // Иначе продолжаем маршрут
    }
});

export default router;


