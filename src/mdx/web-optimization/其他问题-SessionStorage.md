## 你说的应该是浏览器里的 sessionStorage
1. sessionStorage 是“同源 + 同一个浏览器标签页（tab）隔离”的
```
也就是说：

✔️ 同一个 tab（窗口）
页面刷新（F5）：✅ 共享（数据还在）
同一个 tab 内跳转页面：✅ 共享
```

不同 tab（哪怕是同一个网站）
新开一个标签页：❌ 不共享
复制标签页（duplicate tab）：⚠️ 会“复制一份初始数据”，但之后互不影响

## SessionStorage,设置过期的原理是？
```json
{expiresAt: 1779504531873, data: [,…]}
```
原理就是“给缓存加一个时间戳，到点就当作没缓存”。

在 localStorage 里不只存数据，还存一个过期时间：

写入时：把 expiresAt = Date.now() + 48小时 一起存进去
读取时：
now = Date.now()
如果 expiresAt > now：说明没过期，直接用缓存数据
否则：说明已过期，localStorage.removeItem(key) 删除，然后走接口重新拉取
Date.now() 是当前时间的毫秒数（Unix time in ms），所以用毫秒做比较最简单可靠。



## localStorage SessionStorage 区别
1. 数据的生命周期：localStorage中存储的数据是永久性的，除非手动删除或清除浏览器缓存，否则数据会一直存在；而sessionStorage中存储的数据只在当前会话中有效，关闭浏览器窗口或标签页时，数据会被清除。

2. 数据的作用域：localStorage中存储的数据在同源的所有窗口和标签页中都是共享的；而sessionStorage中存储的数据只在同一窗口或标签页中共享，不同窗口或标签页之间的数据是不共享的。

3. 存储数据的大小限制：通常情况下，localStorage中可以存储更多的数据，一般限制为5MB左右，而sessionStorage的存储容量较小，通常限制在2.5MB左右