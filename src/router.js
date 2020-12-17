import { defineAsyncComponent } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

import TaskList from './pages/TaskList.vue';
import UserAuth from './pages/UserAuth.vue';
import store from './store/index.js';

const NotFound = defineAsyncComponent(() => import('./pages/NotFound.vue'));

const router = createRouter({
     history: createWebHistory(),
     routes: [
          { path: '/', component: TaskList, meta: { userAuth: true } },
          { path: '/auth', component: UserAuth },
          { path: '/:notFound(.*)', component: NotFound }
     ]
});

router.beforeEach(function(to, _, next) {
     if(to.meta.userAuth && !store.getters.isAuthenticated) {
          next('/auth');
     }
     else {
          next();
     }
});

export default router;

