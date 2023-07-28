import { CommandType } from "../../command";
import { defineAsyncComponent } from 'vue'
import ComponentOutputType = SsTerminal.ComponentOutputType;
/**
 * @desc 掘金文章指令
 * @author Spike
 * @date 2023-07-28
 */


const articleCommand: CommandType = {
    func: "article",
    name: "掘金文章",
    desc: "随机获取掘金文章",
    alias: ["art"],
    options: [
        {
            key: "size",
            desc: "文章篇数",
            alias: ["s"],
            type: "string"
        }
    ],
    collapsible: true,
    action(options, terminal) {
        let { size = "20" } = options;
        if (size.startsWith("=")) size = size.replace("=", "");
        size = parseInt(size);
        if (size >= 100 || isNaN(size)) {
          terminal.writeTextErrorResult("请求参数不合法!");
          return;
        }
        const output: ComponentOutputType = {
            type: "component",
            component: defineAsyncComponent(() => import("./articleBox.vue")),
            props: {
                size
            }
        }
        terminal.writeResult(output);
    }
}

export default articleCommand;