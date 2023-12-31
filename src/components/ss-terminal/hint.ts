import { ref } from "vue";
import { getUsageStr } from "../../core/commands/terminal/help/helpUtils";
import { commandMap } from "../../core/commandRegister";
import _, { trim } from "lodash";
import { useTerminalConfigStore } from "../../core/commands/terminal/config/store/terminalConfigStore";

/**
 * 命令提示功能
 * 
 */
const useHint = () => {
  const hint = ref("");
  const { showHint } = useTerminalConfigStore();

  const setHint = (inputText: string) => {
    // 未开启提示
    if (!showHint) {
      return;
    }
    //没有输入
    if (!inputText) {
      hint.value = "";
      return;
    }
    const args = trim(inputText).split(" ");
    // 大小写无关
    let func = args[0].toLowerCase();
    // 前缀匹配
    const likeKey = Object.keys(commandMap).filter((key) =>
      key.startsWith(func)
    )[0];
    let command = commandMap[likeKey];
    if (!command) {
      hint.value = "";
      return;
    }
      
    // 子命令提示
      if (
        //存在子命令
      command.subCommands &&
      Object.keys(command.subCommands).length > 0 &&
      args.length > 1
    ) {
      hint.value = getUsageStr(command.subCommands[args[1]], command);
    } else {
      hint.value = getUsageStr(command);
    }
  };

  /**
   * 输入提示防抖
   */
  const debounceSetHint = _.throttle(function (inputText: string) {
    setHint(inputText);
  }, 200);

  return {
    hint,
    setHint,
    debounceSetHint,
  };
};

export default useHint;
