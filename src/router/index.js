import { createRouter, createWebHistory } from 'vue-router';
import WhiteboardView from '@/View/WhiteboardView.vue';
import HomeView from '@/View/HomeView.vue';

const routes = [
    { path: '/', redirect: '/login' },
    {
        path: '/login',
        name: 'Login',
        component: HomeView,
    },
    {
        path: '/whiteboard',
        name: 'Whiteboard',
        component: WhiteboardView,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
