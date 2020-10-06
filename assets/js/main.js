const VueScrollTo = require('vue-scrollto');
import Vue from 'vue'
import HtmlPrev from './HtmlPreview';

Vue.use(VueScrollTo, {
    container: "body",
    duration: 500,
    easing: "ease",
    offset: 0,
    force: true,
    cancelable: true,
    onStart: false,
    onDone: false,
    onCancel: false,
    x: false,
    y: true
})

Vue.prototype.$getHtml = function () {

}

// new Vue({
//     el: '#html_prev',
//     components: {
//         'app': HtmlPrev
//     },
//     render: h => h(HtmlPrev)
// })

//$('.html__responsive').scrollIntoView()