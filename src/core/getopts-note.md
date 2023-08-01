## Getopts

### 1、作用：

> 分析得到命令行参数。
>
> 将命令行参数分解得到键值对。

### 2、官方npm文档：

https://www.npmjs.com/package/getopts?activeTab=readme

### 3、ParsedOptions定义

```tsx
interface ParsedOptions{
	_:string[]
	[key:string]:any	
}
```

#### 4、子命令识别(操作数)

> 每个没有option的参数都会被解析为子命令，保存在结果的_数组中
>
> ```js
> getopts(["a","-f9","b"])//=>{_:["a","b"],f:9}
> ```
>
> 