<template>
    <div class="payment" :class="{payOpacity}" v-if="payShow">
        <!--{{payData}}-->
        <div class="payment-main" :class={payShow:payShow}>
            <div class="payment-title">
                {{payTitle}}
                <div class="payment-close" @click="payClose">
                </div>
            </div>
            <div class="hide" :class="{'payment-success':!payEntry&&!payloader}">
                <svg t="1501508156392" @animationend="payEnd" class="icon loading" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                    p-id="1936" xmlns:xlink="http://www.w3.org/1999/xlink" width="100" height="100">
                    <path d="M914.9 682.1c-22 52.1-53.5 98.8-93.7 139s-86.9 71.7-139 93.7c-53.9 22.8-111.1 34.3-170.2 34.3s-116.3-11.5-170.1-34.3c-52.1-22-98.8-53.5-139-93.7s-71.7-86.9-93.7-139C86.4 628.3 74.8 571.1 74.8 512s11.5-116.3 34.3-170.2c22-52.1 53.5-98.8 93.7-139s86.9-71.7 139-93.7c43.3-18.3 88.8-29.4 135.7-33C497 74.6 512 58.4 512 38.9l0 0c0-21.8-18.6-39-40.3-37.3C207.8 22.1 0 242.8 0 512c0 282.8 229.2 512 512 512 269.2 0 489.9-207.8 510.4-471.7 1.7-21.7-15.5-40.3-37.3-40.3l0 0c-19.5 0-35.8 15-37.3 34.4C944.2 593.3 933.2 638.8 914.9 682.1z"
                        p-id="1937" fill="#13ae00"></path>
                </svg>
                <p>正在支付...</p>
            </div>
            <div class="hide" :class="{'pay-entry':payEntry}">
                <div class="payment-input">
                    <ul>
                        <li v-for="item in 6">
                            <input type="password" disabled name="password" :value="password[item-1]" id="">
                        </li>
                    </ul>
                </div>
                <div class="payment-keyboard">
                    <ul>
                        <li @touchstart="keytouchStart" @touchend="keytouchEnd($event,item)" v-for="item in 9" :data-val="item">{{item}}</li>
                        <li data-val="delete" @touchstart="keytouchStart" @touchend="keytouchEnd($event,'delete')">-</li>
                        <li data-val="0" @touchstart="keytouchStart" @touchend="keytouchEnd($event,0)">0</li>
                        <li data-val="complete" @touchstart="keytouchStart" @touchend="keytouchEnd($event,'complete')" class="complete">完成</li>
                    </ul>
                </div>
            </div>
            <div class="hide" :class="{'payment-success':payStatus&&payloader}">
                <div class="hook">
                    <span class="d"></span>
                    <span class="c"></span>
                </div>
                <svg t="1501508156392" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                    p-id="1936" xmlns:xlink="http://www.w3.org/1999/xlink" width="100" height="100">
                    <path d="M914.9 682.1c-22 52.1-53.5 98.8-93.7 139s-86.9 71.7-139 93.7c-53.9 22.8-111.1 34.3-170.2 34.3s-116.3-11.5-170.1-34.3c-52.1-22-98.8-53.5-139-93.7s-71.7-86.9-93.7-139C86.4 628.3 74.8 571.1 74.8 512s11.5-116.3 34.3-170.2c22-52.1 53.5-98.8 93.7-139s86.9-71.7 139-93.7c43.3-18.3 88.8-29.4 135.7-33C497 74.6 512 58.4 512 38.9l0 0c0-21.8-18.6-39-40.3-37.3C207.8 22.1 0 242.8 0 512c0 282.8 229.2 512 512 512 269.2 0 489.9-207.8 510.4-471.7 1.7-21.7-15.5-40.3-37.3-40.3l0 0c-19.5 0-35.8 15-37.3 34.4C944.2 593.3 933.2 638.8 914.9 682.1z"
                        p-id="1937" fill="#13ae00"></path>
                </svg>
                <p>支付成功</p>
            </div>
            <div class="hide" :class="{'payment-fail':!payStatus&&payloader}">
                <div class="fail-icon"></div>
                <p>支付失败</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'payment',
        data() {
            return {
                password: [],
                passIndex: 0,
                payOpacity:false,
                payloader:false,
                payEntry:true
            }
        },
        props: {
            payShow: {
                default:false,
                type:Boolean
            },
            // 支付状态
            payStatus: {
                default: true,
                type:Boolean
            },
            // 支付标题
            payTitle: {
                default: '请输入支付密码',
                type: String
            },
            payLoad: {
                default: true,
                type: Boolean
            }
        },
        methods: {
            payEnd:function(){
                setTimeout(function(vue){
                    vue.payloader = true;
                },100,this);

                // 关闭窗口
                setTimeout(function(vue){
                    vue.payClose();
                },1500,this);
            },
            // 点击键盘添加颜色
            keytouchStart: function (ev) {
                // console.log(this.payData)
                ev.target.style.background = "#eff6ff";
            },
            // 放开还原
            keytouchEnd: function (ev, value) {
                ev.target.style.background = "#fff";
                this.fillValue(value);
            },
            // 给密码框添加值
            fillValue: function (value) {
                if (value == "complete") {
                    if (this.password.length == 6) {
                        this.submitFn(this.password);
                    } else {
                        return false;
                    }
                }
                // 输入点击值
                value == "delete" ? this.password.pop() : this.password.length < 6 ? this.password.push(value) : "";
            },
            // 提交
            submitFn: function (value) {
                this.payEntry = false;
                this.$emit('paySubmit', value.join(''));
            },
            // 关闭弹出框
            payClose: function () {
                // 打开输入框
                this.payEntry = true;
                this.payloader = false;
                this.$emit('payClose');

                this.password = [];
            }
        },
        mounted() {
            // console.log(this.payData)
            setTimeout(function(vue){
                vue.payOpacity = true;
            },20,this)
        }
    }
</script>

<style scoped>
    * {
        margin: 0;
        padding: 0;
        list-style: none;
    }

    .hide {
        display: none;
    }

    .payment {
        width: 100%;
        height: 100%;
        position: fixed;
        z-index: 9999;
        left: 0;
        top: 0;
    }

    .pay-entry {
        display: block;
    }

    .payment:before {
        content: "";
        width: 100%;
        height: 100%;
        background: #000;
        position: fixed;
        left: 0;
        top: 0;
        opacity: 0;
        transition: all .5s;
    }

    .payment-main {
        width: 100%;
        position: fixed;
        background: #fff;
        z-index: 10;
        left: 0;
        bottom: 0;
    }

    .payment-title {
        font-size: 16px;
        line-height: 55px;
        border-bottom: 1px solid #dfdfdf;
        position: relative;
    }

    .payment-close {
        position: absolute;
        right: 0;
        top: -5px;
        padding-right: 15px;
    }

    .payment-close::before {
        content: "";
        width: 25px;
        height: 1px;
        background: #bdbdbd;
        transform: rotate(45deg);
        display: inline-block;
        margin-right: -10px;
    }

    .payment-close::after {
        content: "";
        width: 25px;
        height: 1px;
        background: #bdbdbd;
        transform: rotate(-45deg);
        display: inline-block;
        margin-left: -15px;
    }
    /*密码框*/

    .payment-input {
        width: 100%;
        overflow: hidden;
        box-sizing: border-box;
        padding: 35px 20px;
    }

    .payment-input ul {
        border: 1px solid #dbdbdb;
        overflow: hidden;
        border-radius: 5px;
        display: flex;
        align-items: center;
        -webkit-align-items: center;
        display: -webkit-flex;
    }

    .payment-input li {
        flex: 1;
        -webkit-flex: 1;
        box-sizing: border-box;
        overflow: hidden;
        line-height: 40px;
        border-right: 1px solid #dbdbdb;
    }

    .payment-input li:last-child {
        border-right: none;
    }

    .payment-input li input {
        width: 100%;
        font-size: 22px;
        height: 40px;
        text-align: center;
        color: #888;
    }

    .payment-keyboard {
        overflow: hidden;
        padding-top: 40px;
    }

    .payment-keyboard li {
        width: 33.333333%;
        float: left;
        border-right: 1px solid #dbdbdb;
        border-top: 1px solid #dbdbdb;
        line-height: 40px;
        text-align: center;
        font-size: 18px;
        box-sizing: border-box;
    }

    .payment-keyboard li:nth-child(3n) {
        border-right: none;
    }

    .payment-success {
        position: relative;
        display: block;
        margin: 50px 0;
    }

    .payment-success .hook {
        overflow: hidden;
        position: absolute;
        width: 100px;;
        height: 80px;
        left: 43%;
        top: 1px;
    }

    .payment-success .hook .d {
        content: "";
        width: 7px;
        height: 25px;
        display: inline-block;
        transform: rotate(-45deg);
        position: absolute;
        left: 9px;
        top: 40px;
    }

    .payment-success .hook .c {
        content: "";
        width: 7px;
        height: 65px;
        display: inline-block;
        position: relative;
        position: absolute;
        left: 36px;
        top: 6px;
        transform: rotate(-135deg);
        transition: all 2s;
    }
    .payment-success .hook .c:before{
        content: "";
        float: left;
        height: 0%;
        width: 100%;
        background: #13ae00;
        animation: hook .2s ease .5s forwards;
    }
    .payment-success .hook .d:before{
        content: "";
        float: left;
        height: 0%;
        width: 100%;
        background: #13ae00;
        animation: hook .2s ease forwards;
    }

    .payment-success p {
        font-size: 16px;
        line-height: 50px;
    }

    .loading {
        animation: loadingRotate 2s forwards;
    }

    .payShow {
        animation-name: paybounceInUp;
        animation-duration: .6s;
        animation-fill-mode: both;
    }

    .payOpacity:before{
        opacity: .5;
    }

    .payment-fail{
        display: block;
        padding-bottom: 30px;
        text-align: center;
    }
    .payment-fail .fail-icon{
        width: 100px;
        height: 100px;
        border:5px solid #c40909;
        border-radius: 50%;
        margin: 50px 0 20px 0;
        display: inline-block;
        position: relative;
    }
    .payment-fail .fail-icon:before {
        content: "";
        width: 65px;
        height: 5px;
        background: #c40909;
        transform: rotate(45deg);
        display: inline-block;
        position: absolute;
        left: 20px;
        top: 45px;
    }

    .payment-fail .fail-icon:after {
        content: "";
        width: 65px;
        height: 5px;
        background: #c40909;
        transform: rotate(-45deg);
        display: inline-block;
        position: absolute;
        left: 20px;
        top: 45px;
    }
    .payment-fail p{
        padding-bottom: 20px;
        overflow: hidden;
        font-size: 16px;
    }

    @keyframes paybounceInUp {
        from {
            transform: translate3d(0, 100%, 0);
            visibility: visible;
        }

        to {
            transform: translate3d(0, 0, 0);
        }
    }

    @keyframes hook {
        from {
            height: 0px;
        }

        to {
            height: 100%;
        }
    }

    @keyframes loadingRotate {
        0% {
            transform: rotate(0deg);
        }
        33.333% {
            transform: rotate(360deg)
        }
        66.666% {
            transform: rotate(720deg);
        }
        100% {
            transform: rotate(1080deg)
        }
    }
</style>