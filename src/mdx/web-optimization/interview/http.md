
# sse
## chatgpt 文字的流传输怎么实现

使用 OpenAI API 时，可以设置参数 stream: true，表示你希望模型边生成边返回：
```js
const response = await fetch('https://api.openai.com/v1/chat/completions', {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${API_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    model: 'gpt-4',
    messages: [{ role: 'user', content: '介绍一下牛顿第一定律' }],
    stream: true,
  }),
});
```

2. 读取流（ReadableStream）
```js
const reader = response.body?.getReader();
const decoder = new TextDecoder('utf-8');

let done = false;
while (!done) {
  const { value, done: readerDone } = await reader.read();
  done = readerDone;
  const chunk = decoder.decode(value, { stream: true });

  // 处理返回的 chunk
  console.log(chunk);
}
```

## 如何处理前端大文件上传与断点续传？
- 使用 Blob.slice 分片；

- 控制并发数量；

- 使用唯一 hash 标识文件；

- 后端记录上传进度；

- 合并分片接口。

| 步骤       | 技术点                                  |
| -------- | ------------------------------------ |
| 1. 切片    | `Blob.slice()`，将大文件切成多个小块            |
| 2. 并发控制  | 使用 `Promise.all` + 限制并发（如 `p-limit`） |
| 3. 唯一标识  | 通过文件内容生成唯一 `hash`（如 MD5、SparkMD5）    |
| 4. 断点续传  | 通过后端记录已上传分片的 `index`                 |
| 5. 合并分片  | 后端提供 `merge` 接口进行合并                  |
| 6. 校验完整性 | 合并后再校验 hash 或大小                      |


✅ 大文件上传流程图解
```
浏览器：
 └──> 读取文件，切片 Blob.slice()
 └──> 计算文件 hash
 └──> 向后端问：我哪些分片已上传？
 └──> 并发上传未上传的分片（带 index + hash）
 └──> 通知后端 merge 合并
```
