export const vueTestCode1 = `
<!DOCTYPE html>
<html>

<head>
  <meta charset="UTF-8">
</head>
<style>
  .btn {
    margin-right: 10px;
    border: 0px;
    color: white;
    background-color: rgb(99, 99, 242);
  }
</style>

<body>
  <script src="/vue/vue3.global.js"></script>
  <div id="root">
    <div>
      <button v-on:click='onClickText' class="btn">Hello world,Click me</button>
      <span>{{refData.myName}}-{{msg}}-{{info.msg2}}</span>
      <div v-if="showDiv">
        被你发现了
      </div>
    </div>
  </div>
  <script>
    const { ref, reactive, nextTick } = Vue

    const app = Vue.createApp({
      data() {
        return {
          msg: '改变我',
          showDiv: false
        }
      },
      methods: {
        onClickText() {
          console.log('%c=onClickText','color:blue')
          this.msg = '努力'
          this.showDiv = !this.showDiv
          this.info.msg2 = this.showDiv ? '直接点' : '其他选择'
          nextTick(() => {
            console.log('--nextTick--', this.showDiv, this.msg);
          })
        }
      },

      setup(props) {
        const refData = ref({
          myName: 'Ruo'
        })

        const info = reactive({
          msg2: 'hello',
        });

        nextTick(() => {
          console.log('--nextTick--');
        })

        Vue.onBeforeMount(() => {
          console.log('--1:组件挂载前 onBeforeMount-->')
        })

        Vue.onMounted(() => {
          console.log('--2:组件挂载后 onMounted-->')
        });

        return {
          info,
          refData
        };
      },

    })

    console.log('app:', app)
    app.mount('#root')
  </script>
</body>

</html>
`

// 02-vue3-源码探究-单个data好调试
export const testCodeSingalData = `
<!DOCTYPE html>
<html>

<head>
  <meta charset="UTF-8">
</head>
<style>
  .btn {
    margin-right: 10px;
    border: 0px;
    color: white;
    background-color: rgb(99, 99, 242);
  }
</style>

<body>
  <script src="./vue3.global.js"></script>
  <div id="root">
    <div>
      <button v-on:click='onClickText' class="btn">Hello world,Click me</button>
      <div><span>ruo-{{msg}}</span></div>
      <div>{{info2.age}}</div>
      <button v-on:click='onChange' class="btn">Change</button>
    </div>
  </div>
  <script>
    /*
    注释节点也会被模板引擎编译
    <!-- <div v-if="showDiv">
      被你发现了
    </div>
    */
    const { ref, reactive, nextTick } = Vue

    Vue.createApp({
      data() {
        return {
          msg: '改变我',
          info2: {
            age: 26
          }
          // showDiv: false
        }
      },
      methods: {
        onClickText() {
          this.msg = '努力'
          // this.showDiv = !this.showDiv
          // this.info.msg2 = this.showDiv ? '直接点' : '其他选择'
        },
        onChange() {
          this.info2.age = this.info2.age + 1
        }
      },

      setup(props) {
        console.log('start响应式=>setup()', 'color:chartreuse')
        const info = reactive({
          msg2: 'hello',
        });
        console.log('end响应式=>代码中setup:调用reactive返回值', 'color:chartreuse', info, info.msg2)

        const ins = Vue.getCurrentInstance();
        console.log('--0:setup-在组件被挂载之前被调用')

        nextTick(() => {
          console.log('--nextTick--');
        })

        Vue.onBeforeMount(() => {
          console.log('--1:组件挂载前 onBeforeMount-->')
        })

        Vue.onMounted(() => {
          console.log('--2:组件挂载后 onMounted-->')
          console.log('this-ins:', ins, 'this:', this)

          // 注意数据b和a的使用方法
          // console.log('msg:', ins.data.msg)
          // console.log('info:', info.msg2)
        });

        Vue.onBeforeUpdate(() => {
          console.log('a1-组件更新前-onBeforeUpdate')
        })

        Vue.onUpdated(() => {
          console.log('a2-组件更新后-onUpdated')
        })

        Vue.onBeforeUnmount(() => {
          console.log('c1-组件销毁前-onBeforeUnmount')
        })

        Vue.onUnmounted(() => {
          console.log('c2-组件销毁后-onUnmounted')
        })

        return {
          info
        };
      },

    }).mount('#root')
  </script>
</body>

</html>
`

// vue3-reactive-ref-nextTick-生命周期
export const testCodeReactive_ref_nextTick = `
<!DOCTYPE html>
<html>

<head>
  <meta charset="UTF-8">
</head>
<style>
  .btn {
    margin-right: 10px;
    border: 0px;
    color: white;
    background-color: rgb(99, 99, 242);
  }
</style>

<body>
  <script src="./vue3.global.js"></script>
  <div id="root">
    <div>
      <button v-on:click='onClickText' class="btn">Hello world,Click me</button>
      <span>{{refData.myName}}-{{msg}}-{{info.msg2}}</span>
      <div v-if="showDiv">
        被你发现了
      </div>
    </div>
  </div>
  <script>
    const { ref, reactive, nextTick } = Vue

    Vue.createApp({
      data() {
        return {
          msg: '改变我',
          showDiv: false
        }
      },
      methods: {
        onClickText() {
          console.log('test:', this, '-', this.refData)
          this.msg = '努力'
          this.showDiv = !this.showDiv
          this.info.msg2 = this.showDiv ? '直接点' : '其他选择'

          // nextTick 测试 start
          console.log('--before-nextTick--', this.info.msg2);
          nextTick(() => {
            // 访问更新后的 DOM
            console.log('--nextTick开始运行--this.info.msg2:', this.info.msg2);
          })
          console.log('--after-nextTick--', this.info.msg2);
          // nextTick 测试 end
        }
      },

      setup(props) {
        const refData = ref({
          myName: 'Ruo'
        })

        const info = reactive({
          msg2: 'hello',
        });

        const ins = Vue.getCurrentInstance();
        console.log('--0:setup-在组件被挂载之前被调用')

        nextTick(() => {
          console.log('--nextTick--');
        })

        Vue.onBeforeMount(() => {
          console.log('--1:组件挂载前 onBeforeMount-->')
        })

        Vue.onMounted(() => {
          console.log('--2:组件挂载后 onMounted-->')
          console.log('this-ins:', ins, 'this:', this)

          // 注意数据b和a的使用方法
          console.log('msg:', ins.data.msg)
          console.log('info:', info.msg2)
        });

        Vue.onBeforeUpdate(() => {
          console.log('a1-组件更新前-onBeforeUpdate')
        })

        Vue.onUpdated(() => {
          console.log('a2-组件更新后-onUpdated')
        })

        Vue.onBeforeUnmount(() => {
          console.log('c1-组件销毁前-onBeforeUnmount')
        })

        Vue.onUnmounted(() => {
          console.log('c2-组件销毁后-onUnmounted')
        })

        // 其他start
        Vue.onErrorCaptured(() => {
          console.log('A注册一个钩子:onErrorCaptured-在捕获了后代组件传递的错误时调用')
        })
        Vue.onRenderTracked(() => {
          console.log('B注册一个调试钩子:onRenderTracked-当组件渲染过程中追踪到响应式依赖时调用')
        })
        Vue.onRenderTriggered(() => {
          console.log('C注册一个调试钩子:onRenderTriggered-当响应式依赖的变更触发了组件渲染时调用')
        })
        // 被包含在中的组件，会多出onActivated,onActivated 两个生命周期钩子函数。被激活时执行。
        Vue.onActivated(() => {
          console.log('D注册一个回调函数-onActivated-若组件实例是 <KeepAlive> 缓存树的一部分，当组件被插入到 DOM 中时调用')
        })
        Vue.onDeactivated(() => {
          console.log('E注册一个回调函数-onDeactivated-若组件实例是 <KeepAlive> 缓存树的一部分，当组件从 DOM 中被移除时调用,比如从 A 组件，切换到 B 组件，A 组件消失时执行。')
        })
        Vue.onServerPrefetch(() => {
          console.log('F注册一个异步函数-onServerPrefetch-在组件实例在服务器上被渲染之前调用')
        })
        // 其他 end

        return {
          info,
          refData
        };
      },

    }).mount('#root')
  </script>
</body>

</html>
`