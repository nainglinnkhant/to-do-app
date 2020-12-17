import { createApp, defineAsyncComponent } from 'vue';
import App from './App.vue';
import router from './router.js';
import store from './store/index.js';

import TheHeader from './components/TheHeader.vue';

const BaseDialog = defineAsyncComponent(() => import('./components/BaseDialog.vue'));
const BaseSpinner = defineAsyncComponent(() => import('./components/BaseSpinner.vue'));

const app = createApp(App);

app.use(router);
app.use(store);

app.component('base-dialog', BaseDialog);
app.component('base-spinner', BaseSpinner);
app.component('the-header', TheHeader);

app.mount('#app')


