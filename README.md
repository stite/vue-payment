# vue-payment是什么？
一个基于vue框架的支付弹窗插件
### [先睹为快](http://www.stite.net/content/caseDemo/vue-payment/)
## 安装
```javascript
npm install vue-payment -S
```
### 使用
```javascript
import payment from 'vue-payment';  // 引用
Vue.use(payment);   // 注入
```
然后直接当组件一样用

```javascript
<payment></payment>
```

## 传参

```javascript
<payment 
   :payShow="payShow" 
   :payStatus="payStatus" 
   :payTitle = "payTitle"
   @paySubmit="submitFns" 
   @payClose="payShow=false"
   >
</payment>
``` 
<table width="100%" border="0">
    <thead>
    <tr>
        <td>key</td>
        <td>value</td>
        <td>说明</td>
    </tr>
    </thead>
    <tbody>
        <tr>
            <td>
                payShow
            </td>
            <td>
                Boolean
            </td>
            <td>
                弹出框是否显示
            </td>
        </tr>
        <tr>
            <td>
                payStatus
            </td>
            <td>
                Boolean
            </td>
            <td>
                支付状态（支付成功or支付失败）
            </td>
        </tr>
        <tr>
            <td>
                payT
            </td>
            <td>
                String
            </td>
            <td>
                弹出框标题
            </td>
        </tr>
    </tbody>
</table>

## 方法


<table width="100%" border="0">
    <thead>
    <tr>
        <td>name</td>
        <td>说明</td>
    </tr>
    </thead>
    <tbody>
        <tr>
            <td>
                paySubmit
            </td>
            <td>
                提交时触发，密码当参数返回
            </td>
        </tr>
        <tr>
            <td>
                payClose
            </td>
            <td>
                点击关掉支付框触发
            </td>
        </tr>
    </tbody>
</table>

## [博客](http://www.stite.net)

* ps 插件代码已开源，如需扩展其它功能，可自行添加
