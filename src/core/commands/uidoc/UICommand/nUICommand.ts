import { CommandType } from "../../../command";
/**
 * @author spike    
 * @desc naiveUI组件库搜索命令
 * @date 2023-07-27 22:00
 */

const nUICommand: CommandType = {
    func: "nui",
    name: "Naive-UI组件文档",
    alias: [],
    params: [
        {
            key: "word",
            desc: "组件名(请输入正确的英文)",
            required: true
        },
    ],
    options: [
        {
            key: "self",
            desc: "是否当前页面打开",
            alias: ["s"],
            type: "boolean",
            defaultValue: false
        }
    ],
    action(options, terminal) {
        const { _, self } = options;
        const word = _.length > 0 ? _[0] : "";
        let targetLink;
        if (word) {
            //带组件名跳转 
            targetLink = `https://www.naiveui.com/zh-CN/light/components/button/${word}`
        } else {
            targetLink = `https://www.naiveui.com/zh-CN/light`
        }
        if (self) {
            window.location.href = targetLink;
        } else {
            window.open(targetLink);
        }
    }
}

export default nUICommand;