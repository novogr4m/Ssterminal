<template>
    <div class="ss-terminal-wrapper" :style="wrapperStyle" @click="handleClickWrapper">
        <div ref="terminalRef" class="ss-terminal" :style="mainStyle">
            <a-collapse v-model:activeKey="activeKeys" :bordered="false" expand-icon-position="right">
                <template v-for="(output, index) in outputList" :key="index">
                    <!-- 可折叠 -->
                    <a-collapse-panel v-if="output.collapsible" :key="index" class="terminal-row">
                        <template #header>
                            <span style="user-select: none; margin-right: 10px">
                                {{ prompt }}
                            </span>
                            <span>{{ output.text }}</span>
                        </template>
                        <div v-for="(result, idx) in output.resultList" :key="idx" class="terminal-row">
                            <content-output :output="result" />
                        </div>
                    </a-collapse-panel>
                    <!-- 不折叠 -->
                    <template v-else>
                        <!-- 输出命令及结果-->
                        <template v-if="output.type === 'command'">
                            <div class="terminal-row">
                                <span style="user-select: none; margin-right: 10px">{{
                                    prompt
                                }}</span>
                                <span>{{ output.text }}</span>
                            </div>
                            <div v-for="(result, idx) in output?.resultList" :key="idx" class="terminal-row">
                                <content-output :output="result" />
                            </div>
                        </template>
                        <!-- 打印信息 -->
                        <template v-else>
                            <div class="terminal-row">
                                <content-output :output="output" />
                            </div>
                        </template>
                    </template>
                </template>
            </a-collapse>
            <div class="terminal-row">
                <a-input ref="commandInputRef" v-model:value="inputCommand.text" :disabled="isRunning" class="command-input"
                    :placeholder="inputCommand.placeholder" :bordered="false" autofocus @press-enter="doSubmitCommand">
                    <template #addonBefore>
                        <span class="command-input-prompt">{{ prompt }}</span>
                    </template>
                </a-input>
            </div>
            <!-- 输入提示-->
            <div v-if="hint && !isRunning" class="terminal-row" style="color: #bbb">
                hint：{{ hint }}
            </div>
            <div style="margin-bottom: 16px" />
        </div>
        <div style="position: fixed; bottom: 0; right: 50%">
        <a href="https://beian.miit.gov.cn/" id="icp"
          >粤ICP备2023099070号</a
        >
      </div>
    </div>
</template>

<script setup lang="ts">
import {
    computed,
    onMounted,
    ref,
    StyleValue,
    toRefs,
    watchEffect,
} from "vue";
import CommandOutputType = SsTerminal.CommandOutputType;
import OutputType = SsTerminal.OutputType;
import CommandInputType = SsTerminal.CommandInputType;
import { registerShortcuts } from "./shortcuts";
import TerminalType = SsTerminal.TerminalType;
import TextOutputType = SsTerminal.TextOutputType;
import useHistory from "./history";
import ContentOutput from "./ContentOutput.vue";
import OutputStatusType = SsTerminal.OutputStatusType;
import { useTerminalConfigStore } from "../../core/commands/terminal/config/store/terminalConfigStore";
import useHint from "./hint";
import UserType = User.UserType;
import { LOCAL_USER } from "../../core/commands/user/userConstant";

interface SsTerminalProps {
    height?: string | number;
    fullScreen?: boolean;
    user?: UserType;
    // eslint-disable-next-line vue/require-default-prop
    onSubmitCommand?: (inputText: string) => void;
}

const props = withDefaults(defineProps<SsTerminalProps>(), {
    height: "400px",
    fullScreen: false,
    user: LOCAL_USER as any,
});

const { user } = toRefs(props);

const terminalRef = ref();
const activeKeys = ref<number[]>([]);
// 输出列表
const outputList = ref<OutputType[]>([]);
// 命令列表
const commandList = ref<CommandOutputType[]>([]);
const commandInputRef = ref();

// 命令是否运行
const isRunning = ref(false);

// 引入终端配置状态
const configStore = useTerminalConfigStore();

/**
 * 初始命令
 */
const initCommand: CommandInputType = {
    text: "",
    placeholder: "",
};

/**
 * 待输入的命令
 */
const inputCommand = ref<CommandInputType>({
    ...initCommand,
});

/**
 * 全局记录当前命令，便于写入结果
 */
let currentNewCommand: CommandOutputType;

const {
    commandHistoryPos,
    showPrevCommand,
    showNextCommand,
    listCommandHistory,
} = useHistory(commandList.value, inputCommand);

const { hint, setHint, debounceSetHint } = useHint();

/**
 * 提交命令（回车）
 */
const doSubmitCommand = async () => {
    isRunning.value = true;
    setHint("");
    let inputText = inputCommand.value.text;
    // 执行某条历史命令
    if (inputText.startsWith("!")) {
        const commandIndex = Number(inputText.substring(1));
        const command = commandList.value[commandIndex - 1];
        if (command) {
            inputText = command.text;
        }
    }
    // 执行命令
    const newCommand: CommandOutputType = {
        text: inputText,
        type: "command",
        resultList: [],
    };
    // 记录当前命令，便于写入结果
    currentNewCommand = newCommand;
    // 执行命令
    await props.onSubmitCommand?.(inputText);
    // 添加输出（为空也要输出换行）
    outputList.value.push(newCommand);
    // 不为空字符串才算是有效命令
    if (inputText) {
        commandList.value.push(newCommand);
        // 重置当前要查看的命令位置
        commandHistoryPos.value = commandList.value.length;
    }
    inputCommand.value = { ...initCommand };
    // 默认展开折叠面板
    activeKeys.value.push(outputList.value.length - 1);
    // 自动滚到底部
    setTimeout(() => {
        terminalRef.value.scrollTop = terminalRef.value.scrollHeight;
    }, 50);
    isRunning.value = false;
};

// 输入框内容改变时，触发输入提示
watchEffect(() => {
    debounceSetHint(inputCommand.value.text);
});

/**
 * 输入提示符
 */
const prompt = computed(() => {
    return `[${user.value.username}]:~$`;
});

/**
 * 终端主样式
 */
const mainStyle = computed(() => {
    const fullScreenStyle: StyleValue = {
        position: "fixed",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    };
    return props.fullScreen
        ? fullScreenStyle
        : {
            height: props.height,
        };
});

/**
 * 终端包装类主样式
 */
const wrapperStyle = computed(() => {
    const { background } = configStore;
    const style = {
        ...mainStyle.value,
    };
    if (background.startsWith("http")) {
        style.background = `url(${background})`;
    } else {
        style.background = background;
    }
    return style;
});

/**
 * 清空所有输出
 */
const clear = () => {
    outputList.value = [];
};

/**
 * 写命令文本结果
 * @param text
 * @param status
 */
const writeTextResult = (text: string, status?: OutputStatusType) => {
    const newOutput: TextOutputType = {
        text,
        type: "text",
        status,
    };
    currentNewCommand.resultList.push(newOutput);
};

/**
 * 写文本错误状态结果
 * @param text
 */
const writeTextErrorResult = (text: string) => {
    writeTextResult(text, "error");
};

/**
 * 写文本成功状态结果
 * @param text
 */
const writeTextSuccessResult = (text: string) => {
    writeTextResult(text, "success");
};

/**
 * 写结果
 * @param output
 */
const writeResult = (output: OutputType) => {
    currentNewCommand.resultList.push(output);
};

/**
 * 立即输出文本
 * @param text
 * @param status
 */
const writeTextOutput = (text: string, status?: OutputStatusType) => {
    const newOutput: TextOutputType = {
        text,
        type: "text",
        status,
    };
    outputList.value.push(newOutput);
};

/**
 * 设置命令是否可折叠
 * @param collapsible
 */
const setCommandCollapsible = (collapsible: boolean) => {
    currentNewCommand.collapsible = collapsible;
};

/**
 * 立即输出
 * @param newOutput
 */
const writeOutput = (newOutput: OutputType) => {
    outputList.value.push(newOutput);
};

/**
 * 输入框聚焦
 */
const focusInput = () => {
    commandInputRef.value.focus();
};
/**
 * 获取输入框是否聚焦
 */
const isInputFocused = () => {
    return (
        (commandInputRef.value.input as HTMLInputElement) == document.activeElement
    );
};
/**
 * 设置输入框的值（补全）
 */
const setTabCompletion = () => {
    if (hint.value) {
        console.log(hint.value.split(" "));
        
        inputCommand.value.text = `${hint.value.split(" ")[0]}${hint.value.split(" ").length > 1 ? " " : ""
            }`; //有参数或选项则多输入一个空格
    }
};

/**
 * 折叠 / 展开所有块
 */
const toggleAllCollapse = () => {
    // 展开
    if (activeKeys.value.length === 0) {
        activeKeys.value = outputList.value.map((_, index) => {
            return index;
        });
    } else {
        // 折叠
        activeKeys.value = [];
    }
};

/**
 * 操作终端的对象
 */
const terminal: TerminalType = {
    writeTextResult,
    writeTextErrorResult,
    writeTextSuccessResult,
    writeResult,
    writeTextOutput,
    writeOutput,
    clear,
    focusInput,
    isInputFocused,
    setTabCompletion,
    doSubmitCommand,
    showNextCommand,
    showPrevCommand,
    listCommandHistory,
    toggleAllCollapse,
    setCommandCollapsible,
};

/**
 * 只执行一次
 */
onMounted(() => {
    //挂载时注册快捷键
    registerShortcuts(terminal);
    //挂载时设置欢迎语
    const { welcomeTexts } = configStore;
    if (welcomeTexts?.length > 0) {
        welcomeTexts.forEach((welcomeText) => {
            terminal.writeTextOutput(welcomeText);
        });
    } else {
        terminal.writeTextOutput(
            `👀Welcome to SsTerminal, coolest browser index for geeks!`
        );
        terminal.writeTextOutput(
            ` 🐱‍👤 
    please input 'help' to enjoy~~`
        );
        terminal.writeTextOutput(
            `⭐⭐⭐have a nice day!!!⭐⭐⭐`
        );
        terminal.writeTextOutput("<br/>");
    }
});

/**
 * 当点击空白聚焦输入框
 */
function handleClickWrapper(event: Event): void {
    //@ts-ignore
    if (event.target.className === "ss-terminal") {
        focusInput();
    }
}

defineExpose({
    terminal
});
</script>

<style scoped>
.ss-terminal-wrapper {
    background: black;
}

/* 顶部？ */
.ss-terminal {
    background: rgba(0, 0, 0, 0.6);
    padding: 20px;
    overflow: scroll;
    font-family: "Microsoft YaHei";
}

.ss-terminal::-webkit-scrollbar {
    display: none;
}

.ss-terminal span {
    font-size: 16px;
}

/* 显示的指令样式 */
.ss-terminal :deep(.ant-collapse-icon-position-right > .ant-collapse-item > .ant-collapse-header) {
    color: rgb(103, 102, 102);
    padding: 0;
}

.ss-terminal :deep(.ant-collapse) {
    background: none;
}

.ss-terminal :deep(.ant-collapse-borderless > .ant-collapse-item) {
    border: none;
}

.ss-terminal :deep(.ant-collapse-content > .ant-collapse-content-box) {
    padding: 0;
}

.command-input {
    caret-color: rgb(87, 140, 153);
}

/* 输入的样式 */
.command-input :deep(input) {
    color: rgb(138, 138, 138) !important;
    font-size: 16px;
    padding: 0 10px;
}

.command-input :deep(.ant-input-group-addon) {
    background: none;
    border: none;
    padding: 0;
}

/* 前缀样式 */
.command-input-prompt {
    color: rgb(53, 49, 49);
    background: transparent;
}

/* 输入命令并回车后展示的样式 */
.terminal-row {
    color: rgb(145, 114, 68);
    font-size: 15px;
    font-family: "Microsoft YaHei" courier-new, courier, monospace;
}


a{
    color: rgb(124, 124, 124);
    font-size: 5px;
}
</style>
