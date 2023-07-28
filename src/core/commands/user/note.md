## user 指令

### 1、设计目的

> user指令为了可以使用户保存一些设置，再下次访问时可以使用某些配置而设计。目前已实现注册、登录和退出三个功能。

### 2、用法

- #### 用户注册

![image-20230728221821528](C:\Users\93554\AppData\Roaming\Typora\typora-user-images\image-20230728221821528.png)

终端输入用户名、密码和邮箱即可注册成功。

- #### 用户登录

![image-20230728221908896](C:\Users\93554\AppData\Roaming\Typora\typora-user-images\image-20230728221908896.png)

- #### 退出用户

  （没有参数）

![image-20230728221944000](C:\Users\93554\AppData\Roaming\Typora\typora-user-images\image-20230728221944000.png)





### 3、pinia持久化插件相关知识点

- 安装：

```
npm install pinia-plugin-persistedstate
```

- 注册：

```
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
```

- 使用：

> 安装注册完成后，persist是一个对象，类似于pinia中的state、action、getters

- 配置：

> persist对象可以配置以下属性：
>
> - key
>
> > 类型：string
> >
> > 默认值：store.$id
> >
> > 作用：key用于引用storage中的数据
>
> - storage
>
> > 类型：storageLike
> >
> > 默认值：localStorage
> >
> > 作用：将数据持久化存储到storage中
>
> - path
>
> > 类型：string[]
> >
> > 默认值：undefined
> >
> > 作用：用于指定state中哪些数据需要被持久化，[]表示不持久化任何状态，undefined或null表示持久化整个state
>
> - serializer
>
> > 类型：Serializer
> >
> > 默认值：JSON.stringify/JSON.parse
> >
> > 作用：该配置能够指定持久化时所使用的序列化方法，以及恢复store时的反序列化方法
>
> - beforeRestore
>
> > 类型：(context:PiniaPluginContext)=>void
> >
> > 默认值：undefined
> >
> > 作用：一个钩子函数，在从storage中恢复数据之前触发，可以执行一些操作。
>
> - afterRestore
>
> > 类型：(context:PiniaPluginContext)=>void
> >
> > 默认值：undefined
> >
> > 作用：一个钩子函数，在从storage中恢复数据后触发，可以执行一些操作。
>
> - debug
>
> > 类型：boolean
> >
> > 默认值：false
> >
> > 作用：当设置为true时，存储和恢复store时可能发生的任何错误都将使用console.error输出。