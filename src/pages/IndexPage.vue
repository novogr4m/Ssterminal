<template>
    <ss-terminal 
        ref="terminalRef" 
        :user="loginUser" 
        full-screen 
        :on-submit-command="onSubmitCommand" />
</template>

<script setup lang="ts">
import { doCommandExecute } from "../core/commandExecutor";
import { onMounted, ref } from "vue";
import { useUserStore } from "@/core/commands/user/store/userStore";
import { storeToRefs } from "pinia";

const terminalRef = ref();

const onSubmitCommand = async (inputText: string) => {
    if (!inputText) {
        return;
    }
    const terminal = terminalRef.value.terminal;
    await doCommandExecute(inputText, terminal);
};


const userStore = useUserStore();
const { loginUser } = storeToRefs(userStore);
onMounted(() => {
    //挂载时会去携带请求的cookie中的sessionid给服务端，服务端鉴别该sessionid后，
    //返回session中的用户名，前端拿到后进行自动登录操作。没有则打印登录失败的错误信息
    //并设置默认
    userStore.getAndSetLoginUser();
});


//tab相关代码
// const panes = ref<{ title: string; content: string; key: string; closable?: boolean }[]>([
//       { title: 'Tab 1', content: 'Content of Tab 1', key: '1' },
//       { title: 'Tab 2', content: 'Content of Tab 2', key: '2' },
//       { title: 'Tab 3', content: 'Content of Tab 3', key: '3', closable: false },
// ]);
// const activeKey = ref(panes.value[0].key);
// const newTabIndex = ref(0);
// //tab的+事件
// const add = () => {
//   activeKey.value = `newTab${++newTabIndex.value}`;
//   panes.value.push({ title: 'New Tab', content: 'Content of new Tab', key: activeKey.value });
// };

// //tab的关闭事件
// const remove = (targetKey: string) => {
//   let lastIndex = 0;
//   panes.value.forEach((pane, i) => {
//     if (pane.key === targetKey) {
//       lastIndex = i - 1;
//     }
//   });
//   panes.value = panes.value.filter(pane => pane.key !== targetKey);
//   if (panes.value.length && activeKey.value === targetKey) {
//     if (lastIndex >= 0) {
//       activeKey.value = panes.value[lastIndex].key;
//     } else {
//       activeKey.value = panes.value[0].key;
//     }
//   }
// };

// //tab的操作判断
// const onEdit = (targetKey: string | MouseEvent, action: string) => {
//   if (action === 'add') {
//     add();
//   } else {
//     remove(targetKey as string);
//   }
// };
</script>

<style></style>
