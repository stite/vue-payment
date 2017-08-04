<template>
  <div id="app">
   <button @click="payClick">点击支付</button>
   <payment 
   :payShow="payShow" 
   :payStatus="payStatus" 
   :payTitle = "payTitle"
   @paySubmit="submitFns" 
   @payClose="payShow=false"
   >
    </payment>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
        payShow: false,
        payStatus: false,
        payTitle:"请输入支付密码"
    }
  },
  methods:{
    payClick:function(){
        // 显示支付键盘
        this.payShow = true;
    },
    submitFns:function(value){
        // 关闭键盘
        if(value=='123456'){
            //密码正确
            setTimeout(function(_this){
                _this.payStatus = true;
            },100,this)
        }else{
            // 密码错误
            setTimeout(function(_this){
                _this.payStatus = false;
            },100,this)
        }
    }
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

button{
    font-size: 16px;
    background: #42b983;
    color: #fff;
    padding: 10px;
    border:none;
    border-radius: 5px;
    outline: none;
}

</style>
