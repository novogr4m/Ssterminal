import { CommandType } from "../../../command";
import { defineAsyncComponent } from "vue";
import ComponentOutputType = SsTerminal.ComponentOutputType;

/**
 * 摸鱼游戏命令
 */
const moyuCommand: CommandType = {
  func: "game",
  name: "摸鱼游戏时间到！！",
  options: [],
  collapsible: true,
  action(options, terminal) {
    const output: ComponentOutputType = {
      type: "component",
      component: defineAsyncComponent(() => import("./gameBox.vue")),
      props: {},
    };
    terminal.writeResult(output);
  },
};

export default moyuCommand;
