import { CommandType } from "../../command";
import { defineAsyncComponent } from "vue";
import ComponentOutputType = SsTerminal.ComponentOutputType;

/**
 * @desc 天气指令
 */
const weatherCommand: CommandType = {
    func: 'weather',
    name: '获取当前天气||获取未来三天天气',
    params: [
        {
            key: 'city',
            desc: '城市名称',
            required:true
        }
    ],
    options: [
        {
            key: 'now',
            alias: ['n'],
            desc: '当前天气',
            type: 'string',
            defaultValue: false,
        },
        {
            key: 'future',
            alias: ['f'],
            desc: '未来三天天气',
            type: "boolean",
            defaultValue: false,
        }
    ],
    collapsible: true,
    action(options, terminal) {
        let { _, future } = options;
        const city = _.length > 0 ? _[0] : '';
        if (!city) {
            terminal.writeTextErrorResult('请输入城市名');
            return;
        }
        let output: ComponentOutputType;
        if (future) {
            output = {
                type: "component",
                component: defineAsyncComponent(() => import("./futureWeatherBox.vue")),
                props: {
                    city,
                },
            };

        } else {
            output = {
                type: "component",
                component: defineAsyncComponent(() => import("./weatherBox.vue")),
                props: {
                    city,
                },
            };
        }

        terminal.writeResult(output);
    },
}




export default weatherCommand;