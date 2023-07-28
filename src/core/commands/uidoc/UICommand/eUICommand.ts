import { CommandType } from "../../../command";
/**
 * @author spike    
 * @desc elementUI组件库搜索命令
 * @date 2023-07-27 22:00
 */

const eUICommand: CommandType = {
    func: "eui",
    name: "element-Plus组件文档",
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
            targetLink = `https://element-plus.gitee.io/zh-CN/component/${word}.html`
        } else {
            targetLink = `https://element-plus.gitee.io/zh-CN/`
        }
        if (self) {
            window.location.href = targetLink;
        } else {
            window.open(targetLink);
        }
    }
}

export default eUICommand;