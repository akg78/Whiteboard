import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faPencilAlt, faSquare, faCircle } from '@fortawesome/free-solid-svg-icons';


library.add(faPencilAlt, faSquare, faCircle);

const app = createApp(App);

app.component('font-awesome-icon', FontAwesomeIcon);

app.use(router);

app.mount('#app');
