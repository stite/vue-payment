import Vpayment from './payment.vue';
const payment = {
    install(Vue, options) {
        Vue.component(Vpayment.name, Vpayment);
    }
}

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(payment);
}
export default payment;