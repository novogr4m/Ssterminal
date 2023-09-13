import { CommandType } from "../../command";
import { defineAsyncComponent } from "vue";
import ComponentOutputType = SsTerminal.ComponentOutputType;

const bilibiliCommand: CommandType = {
    func: "bilibili",
    name: "b站视频",
    alias: ['bili', 'video'],
    params: [],
    options: [],
    collapsible: true,
    async action(options, terminal) {
        const output: ComponentOutputType = {
            type: "component",
            component: defineAsyncComponent(() => import("./videoBox.vue")),
            
        };
        terminal.writeResult(output);
    },
}
export default bilibiliCommand;
