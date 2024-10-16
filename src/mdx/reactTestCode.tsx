
export const reactJsxAstR17 = `
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
</head>
<style>
    .red {
        color: red;
    }
</style>

<body>
    <!-- 注意: 部署时，将 "development.js" 替换为 "production.min.js"。-->
    <!-- <script src="https://unpkg.com/react@17/umd/react.development.js" crossorigin></script>
    <script src="https://unpkg.com/react-dom@17/umd/react-dom.development.js" crossorigin></script> -->

    <!-- <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script> -->
    <!-- 18 -->
    <!-- <script src="/react/react.development18.js"></script>
    <script src="/react/react-dom.development18.js"></script> -->

    <!-- 17 -->
    <script src="/react/react.development17.js"></script>
    <script src="/react/react-dom.development17.js"></script>

    <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
    <div id="root"></div>
    <script type="text/babel">
        class LikeButton extends React.Component {
            constructor(props) {
                super(props);
                this.state = { liked: false };
            }

            render() {
                if (this.state.liked) {
                    return (
                        <div onClick={() => this.setState({ liked: !this.state.liked })}>click me again</div>);
                }

                // /* 不使用Jsx
                // return React.createElement(
                //     'button',
                //     { onClick: () => this.setState({ liked: true }) },
                //     'Like'
                // );

                // /* 使用babel
                return (
                    <div>
                        <button onClick={() => this.setState({ liked: !this.state.liked })}>
                            Like1
                        </button>
                        <p>这是兄弟节点</p>
                    </div>
                );
                // */
            }
        }

        const element = React.createElement(
            'div',
            { className: 'red' },
            'Click Me'
        )

        function MyApp() {
            return <h1>Hello, world!</h1>;
        }

        const container = document.getElementById('root');
        // test 1
        const astTree = React.createElement(LikeButton)
        // test 2
        // const astTree = React.createElement(MyApp)

        // test 3
        // const astTree = element

        // console.log('createElement 转化后ast树的结构:', astTree)

        // 这样17渲染报错？
        // /*
        // const root = ReactDOM.createRoot(container);
        // root.render(astTree);
        // */

        // 或则这样渲染,ReactDOM.render 在17可以用，18会弃用
        ReactDOM.render(astTree, container);
    </script>
</body>

</html>
`

export const reactRenderCommit18 = `
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
  <!-- <script src="https://unpkg.com/react@17/umd/react.development.js" crossorigin></script>
    <script src="https://unpkg.com/react-dom@17/umd/react-dom.development.js" crossorigin></script> -->
  <!-- <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script> -->

  <script src="/react/react.development18.js"></script>
  <script src="/react/react-dom.development18.js"></script>
  <!-- <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script> -->
  <script src="./babel-6.26.0.js"></script>
  <!-- <script src="./babel.min-6.26.0.js"></script> -->
  <div id="root"></div>
  <script type="text/babel">
    console.log('=Babel:', Babel)
    function Test() {
      console.log('test-render')
      const [data, setData] = React.useState('改变我')
      const [showDiv, setShowDiv] = React.useState(false)

      const onClickText = () => {
        console.log('=useState=onClick');
        setData('努力哦')
        setShowDiv(!showDiv)
      }

      const onClickText2 = () => {
        console.log('=useState=onClick:', data);
      }

      React.useEffect(() => {
        console.log('=副作用-useEffect-->运行');
        return () => {
          console.log('useEffect销毁时触发的回调');
        };
      }, [])

      React.useLayoutEffect(() => {
        console.log('=副作用-useLayoutEffect-->运行');
      }, [])

      return (
        <div id='div1' className='c1'>
          <button onClick={onClickText} className="btn">Hello world,Click me</button>
          <span>{data}</span>
          {showDiv && <div>被你发现了</div>}
          <div id='div2' className='c2'>
            <p>测试子节点</p>
          </div>
        </div>
      )
    }

    const root = ReactDOM.createRoot(document.getElementById('root'))
    console.log("=app=root:", root)
    root.render(<Test />);
    // 17 写法
    // ReactDOM.render(<Test />, document.getElementById('root'))
  </script>
</body>

</html>
`

export const requestIdleCallbackApi = `
const sleep = (delay) => {
  const start = Date.now();
  while (Date.now() - start <= delay) {}
};
const taskQueue = [
  () => {
    console.log("task1 start");
    sleep(3);
    console.log("task1 end");
  },
  () => {
    console.log("task2 start");
    sleep(3);
    console.log("task2 end");
  },
  () => {
    console.log("task3 start");
    sleep(3);
    console.log("task3 end");
  },
];
const performUnitWork = () => {
  // 取出第一个队列中的第一个任务并执行
  taskQueue.shift()();
};
const workloop = (deadline) => {
  console.log('此帧的剩余时间为: ',deadline.timeRemaining());
  // 如果此帧剩余时间大于0或者已经到了定义的超时时间（上文定义了timeout时间为1000，到达时间时必须强制执行），且当时存在任务，则直接执行这个任务
  // 如果没有剩余时间，则应该放弃执行任务控制权，把执行权交还给浏览器
  while (
    (deadline.timeRemaining() > 0 || deadline.didTimeout) &&
    taskQueue.length > 0
  ) {
    performUnitWork();
  }
  // 如果还有未完成的任务，继续调用requestIdleCallback申请下一个时间片
  if (taskQueue.length > 0) {
    window.requestIdleCallback(workloop, { timeout: 1000 });
  }
};
requestIdleCallback(workloop, { timeout: 1000 });
/*
上面定义了一个任务队列taskQueue，并定义了workloop函数，其中采用window.requestIdleCallback(workloop, { timeout: 1000 })去执行taskQueue中的任务。每个任务中仅仅做了console.log、sleep(3)的工作，时间是非常短的（大约3ms多一点），浏览器计算此帧中还剩余15.5ms，足以一次执行完这三个任务，因此在此帧的空闲时间中，taskQueue中定义的三个任务均执行完毕。打印结果如下： 
此帧的剩余时间为: 49.8
task1 start
task1 end
task2 start
task2 end
task3 start
task3 end
*/
`

export const testClassComponent = `
<!DOCTYPE html>
<html>

<head>
  <meta charset="UTF-8">
</head>

<body>
  <script src="/react/react.development18.js"></script>
  <script src="/react/react-dom.development18.js"></script>
  <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
  <div id="root"></div>
  <script type="text/babel">
    class LikeButton extends React.Component {
      constructor(props) {
        super(props);
        this.state = { liked: false };
      }

      render() {
        console.log('render start')
        if (this.state.liked) {
          return (
            <div onClick={() => this.setState({ liked: !this.state.liked })}>click me again</div>);
        }
        return (
          <div>
            <button onClick={() => this.setState({ liked: !this.state.liked })}>
              Like1
            </button>
            <p>这是兄弟节点</p>
          </div>
        );
      }
    }
    const container = document.getElementById('root');
    const astTree = React.createElement(LikeButton)
    console.log('createElement 转化后ast树的结构:', astTree)
    // debugger
    const root = ReactDOM.createRoot(container);
    root.render(astTree);
  </script>
</body>

</html>
`

export const testSetState = `
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
  <!-- <script src="https://unpkg.com/react@17/umd/react.development.js" crossorigin></script>
    <script src="https://unpkg.com/react-dom@17/umd/react-dom.development.js" crossorigin></script> -->
  <!-- <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script> -->

  <script src="/react/react.development18.js"></script>
  <script src="/react/react-dom.development18.js"></script>
  <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
  <div id="root"></div>
  <script type="text/babel">
    function Test() {
      console.log('test-render')
      const [data, setData] = React.useState('改变我')
      const [showDiv, setShowDiv] = React.useState(false)

      const onClickText = () => {
        console.log('=useState=onClick=例5-没有导致state的值发生变化的setState是否会导致重渲染?',);
        setData('改变我')
      }

      const onClickText2 = () => {
        console.log('=useState=onClick:', data);
      }

      React.useEffect(() => {
        console.log('=副作用-useEffect-->运行');
      }, [])

      React.useLayoutEffect(() => {
        console.log('=副作用-useLayoutEffect-->运行');
      }, [])

      return (
        <div id='div1' className='c1'>
          <button onClick={onClickText} className="btn">Hello world,Click me</button>
          <span>{data}</span>
          {showDiv && <div>被你发现了</div>}
          <div id='div2' className='c2'>
            <p>测试子节点</p>
          </div>
        </div>
      )
    }

    // <button onClick={onClickText2} className="btn">获取值</button>

    // 17 写法
    // ReactDOM.render(<Test />, document.getElementById('root'))

    // 18 写法
    // const container = document.getElementById('root');
    // const root = ReactDOM.createRoot(container);
    const root = ReactDOM.createRoot(document.getElementById('root'))
    root.render(<Test />);
    // ReactDOM.createRoot(<Test />, document.getElementById('root'))
  </script>
</body>

</html>
`

export const testReduxCode = `
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
  <!-- <script src="https://unpkg.com/react@17/umd/react.development.js" crossorigin></script>
    <script src="https://unpkg.com/react-dom@17/umd/react-dom.development.js" crossorigin></script> -->
  <!-- <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script> -->

  <script src="/react/react.development18-nolog.js"></script>
  <script src="/react/react-dom.development18-nolog.js"></script>
  <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
  <!-- <script src="./hoist-non-react-statics.js"></script> -->
  <!-- <script src="./react-redux.js"></script> -->
  <!-- <script type="module" src="./react-redux-module.js"></script> -->
  <script src="/react/redux-4.2.0.js"></script>
  <script src="/react/redux-thunk-2.4.2.js"></script>
  <div id="root"></div>
  <script type="text/babel">

    console.log('=源码:React:', React)
    // console.log('ReduxThunk:', ReduxThunk)
    console.log('=源码:redux-4.2.0:', Redux)

    const { Provider, connect, useSelector } = React
    const { applyMiddleware, createStore } = Redux

    const initUserState = {
      increaseVal: 9,
      constVal: 100
    };

    const userStore = (
      state = initUserState,
      action
    ) => {

      const { payload, type } = action;

      switch (type) {
        case 'INCREASE':
          console.log('INCREASE', payload);
          const userState = { ...state, increaseVal: action.payload };

          return userState;
        case 'DECREMENT':
          console.log('ON_INCREASE');

          return {};
        default:
          return state;
      }
    };

    const enhancers = applyMiddleware(ReduxThunk)
    // const store = createStore(userStore, applyMiddleware(logger1, logger2, logger3))
    const store = createStore(userStore, enhancers)
    console.log('=redux-4.2.0=store:', store)

    function Redux1(props) {
      const { increaseVal } = props

      const onIncrease = () => {
        props.onIncreaseAction && props.onIncreaseAction(increaseVal + 1)
      }

      console.log('=Redux1 render:', props)

      return (
        <div>
          同级组件
          <button onClick={onIncrease}>增加</button>
          {increaseVal}
        </div>
      );
    }

    const onIncreaseAction = (data) => (dispatch) => {
      dispatch({
        type: 'INCREASE',
        payload: data
      });
    };

    console.log('%c=react-app=Redux1Wrap-执行connect', 'color:white')
    const Redux1Wrap = connect((state) => {
      return {
        increaseVal: state.increaseVal
      };
    }, (dispatch) => {
      return {
        onIncreaseAction: (data) => dispatch(onIncreaseAction(data)),
      };
    })(Redux1)

    function Redux2(props) {
      const { increaseVal } = props

      const counter = useSelector((state) => state.counter);
      console.log('=Redux2 render:', props)

      return (
        <div>
          同级组件,增加的值：<span>
            {increaseVal}
          </span>
        </div>
      );
    }

    console.log('%c=react-app=Redux2Wrap-执行connect', 'color:white')
    const Redux2Wrap = connect((state) => {
      return {
        increaseVal: state.increaseVal
      };
    }, null)(Redux2)
    // console.log('ReactRedux.connect:', Redux2Wrap)

    function Redux3(props) {
      const { constVal } = props
      console.log('=Redux3 render:', props)

      return (
        <div>
          同级组件,固定值：<span>
            {constVal}
          </span>
        </div>
      );
    }

    console.log('%c=react-app=Redux3Wrap-执行connect', 'color:white')
    const Redux3Wrap = connect((state) => {
      return {
        constVal: state.constVal
      };
    }, null)(Redux3)


    function Test() {
      const [data, setData] = React.useState('改变我')
      const [showDiv, setShowDiv] = React.useState(false)

      const onClickText = () => {
        setData('改变我')
      }

      const onClickText2 = () => {
        console.log('=useState=onClick:', data);
      }

      React.useEffect(() => {
        console.log('=副作用-useEffect-->运行');
      }, [])

      React.useLayoutEffect(() => {
        console.log('=副作用-useLayoutEffect-->运行');
      }, [])

      return (
        <div id='div1' className='c1'>
          <button onClick={onClickText} className="btn">Hello world,Click me</button>
          <span>{data}</span>
          <Redux1Wrap />
          <Redux2Wrap increaseVal={1} />
          <Redux3Wrap />
        </div>
      )
    }

    // <Redux1 />
    // <Redux2 increaseVal={1} />
    // <Redux2Wrap increaseVal={1} />
    // <button onClick={onClickText2} className="btn">获取值</button>
    const root = ReactDOM.createRoot(document.getElementById('root'))
    root.render(
      <Provider store={store}>
        <Test />
      </Provider>
    );
  </script>
  </script>
</body>

</html>
`