import Vue from 'vue'; // 引入类库
import App from './app.vue';

import './assets/styles/base.css'
import './assets/styles/base-stylus.styl'
import './assets/images/bg.jpg'

const root = document.createElement('div');
document.body.appendChild(root);


// .vue 文件是个组件，不能直接挂载到浏览器，
new Vue({
    render: (h) => h(App)
}).$mount(root);