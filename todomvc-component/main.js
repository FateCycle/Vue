//Vue实例作为特殊的组件也是可以设置template的但是设置完会把el对应的标签替换掉
//这样可以避免嵌套两层div ，原来的id='app'一个，在app.js为保证一个根节点还是需要添加一个div，所以要进行替换用新增的div替换老的
//那么div数量就不会变了
new Vue({
    el:"#app",
    template:'<App/>',
    components:{
        App
    }
})