+ 关于js的this

​    1. 普通对象没有this,对象的this指的是window,this只有在函数被调用，或者通过构造函数new Object()的形式才会指明this

​    2.  只有函数才会有this,他指向调用函数的对象(x=new test(),那么test的this指向x)，如果是全局函数this则为windows,this在调用的时候才会被确认，但是如果函数为函数中的一个函数变量那么可能会出现无法找到调用它的对象则默认为windows或者undefined

3. 箭头函数没有this所以他的this是继承父元素的this如果父元素是个全局函数则会指向windows,尽量别在箭头函数里面使用this.

4.  [this详细信息](https://blog.csdn.net/cataclysm2012/article/details/80350403)

+ 单页面(Single Page Application)
  + 单页面通常采用前后端分离的方式另外为降低但也开发难度会使用React，Vue，Angular三中框架.
  + SPA不利于SEO所以对于大型的电商网站并不适合.
  + SPA对于手机端和后台管理系统是不错的选择应为无需涉及SEO.

+ js 事件

  + 事件绑定

    + 可以使用内联方式onclick=test()**必须加括号**，镶嵌在html标签里

    + 可以使用addEventListener(事件类型，事件操作函数)

    + 可以通过DOM对象事件属性来设置,DOM对象.onclick=function(){}

    + jq还可以进行on来绑定事件，用法和addEventListener类似

  + input事件是输入即触发，onchange事件是失去焦点才出发不是实时触发

  + 使用setAttribute对DOM对象进行属性添加，如果直接使用.添加那么只会作为DOM中的一个键值对

    而不是属性

+ Vue
  
  + 数字，变量，表达式可以直接放入vue的表达式中{{}}或者" "，但如果是字符串常量需要' '来进行区分
  
  + 嵌入页面中的vue元素只能引用data中的变量不能使用window,console等变量
  
  + v-bind用来绑定HTML的动态属性,{{}}用来绑定动态文本，特殊的是class由于class属性是由多个css中的classname拼接而成的字符串所以动态绑定需要使用对象key为className value为是否显示的布尔值
  
    所以:class="{key:value}"(value为布尔值)
  
  + 数字可以直接写入，字符串需要带上引号不然需要在vue的data中定义也就是被解析成了vue的变量名
  
  + v-bind是单向绑定,v-model是双向绑定,对于需要用户交互采用v-model对于不需要用户交互但会动态改变
  
    使用bind,对于一次性数据，输完就消失使用e.target.value获取
  
  + js 事件再不传递参数时候event默认为第一个参数，你可以获取或者不获取，但在传入参数后就需要在函数参数手动传入$event才能获取.
  
  + {{}}会导致先显示一会在填数据，所以可以用v-text来替换但每个标签都加上v-text太麻烦所以使用v-cloak
  
  + v-if是整个DOM添加和移除，v-show则是css的display来控制是否显示，所以show增加初次渲染开销，if增加DOM来回切换开销，show更适合频繁的DOM显示隐藏操作
  
  + v-pre 可以让vue跳过一些不需要vue编译的HTML使得运行速度变快
  
  + 在{{}}中使用函数需要加上()来表示执行以免输出函数体，计算属性用于需要多次重复计算的情况，它可以缓存第一次执行的结果来提高效率，他是介于函数和属性之间，拥有行为的属性，但不能作为事件处理函数来调用
  
  + 计算属性，是一种属性，但是是动态获取的，获取的方式为一种函数形式，他可以绑定到v-model上，但和一般的绑定有所区别，他的改变不收表单变化影响而是受自己的get函数影响，例如:复选框的改变并不会改变v-model的值但是会调用他的set方法(这个方法是计算属性被赋值才调用)，v-model的值只由get决定。总结就是:get=>v-model=>checked属性   checked=>set=>get(在set中设置改变get返回值的代码)=>v-model,平常的v-model=>checked   checked=>v-model两者等价(=>为影响的意思)
  
  + 全局自定义指令必须声明在Vue实例前，bind和insert用于初始化唯一的区别是从insert开始都能拿到el节点的父节点，update和componentupdate只要Vue管理的组件的任何地方更新（不一定是指令所应用的位置）他都会执行，并且两者参数binding, vnode, oldVnode完全一致，唯一区别el.innerHTML,前者保留原来的后者保留更新的，unbind当所绑定的DOM移除或者指令解绑调用一般是清除在bind初始化设置后可能对后续造成的影响(比如定时器)
  
  + vue组件为特殊的实例拥有独立的作用域有独立的data,method等属性不过区别传统的vue实例，组件的data是一个函数返回值为k-v对象而不是普通vue实例的k-v对象
  
  + Vue实例作为特殊的组件也是可以设置template的但是设置完会把el对应的标签替换掉
  
  + 和react一样vue的props进行父子组件传输也是单向的，但引用类型是可以修改但不能复制，其他类型既不能修改该也不能赋值，采取方法是子组件告诉父节点数据，再让父组件自己修改
  
  + react在针对子组件影响父组件是采用回调方式处理传递进去一个父组件的方法在子组件中填入所需要得值然后进行修改,vue则是从子组件触发一个自定义事件并传入参数然后有父组件监听事件，得到子组件传递的值后调用自身的方法进行操作，那么子组件只负责发送数据父节点只负责处理数据这样就可以将子组件单独拿出来也可以使用和父节点没有关系

