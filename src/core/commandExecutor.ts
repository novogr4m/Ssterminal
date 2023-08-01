import getopts from "getopts";
import { commandMap } from "./commandRegister";
import { CommandOptionType, CommandType } from "./command";
import TerminalType = SsTerminal.TerminalType;
import helpCommand from "./commands/terminal/help/helpCommand";

/**
 * 执行命令
 * @param text 输入字符串
 * @param terminal 终端
 * @param parentCommand
 * @notes 命令执行
 */

export const doCommandExecute = async (
    text: string,
    terminal: TerminalType,
    parentCommand?: CommandType
) => {
    //去除命令首尾空格
    text = text.trim();
    if (!text) {
        return;
    }

    // 解析文本，得到命令
    const command: CommandType = getCommand(text, parentCommand);
    if (!command) {
        //不存在命令
        terminal.writeTextErrorResult("找不到该命令");
        return;
    }
    // 解析参数（需传递不同的解析规则）
    const parsedOptions = doParse(text, command.options);   //一个对象

    const { _ } = parsedOptions;
    // 有子命令，递归（？）执行子命令
    if (
        _.length > 0 &&
        command.subCommands/* &&
        Object.keys(command.subCommands).length > 0*/
    ) {
        // 把子命令当做新命令解析，user login xxx => login xxx
        const subText = text.substring(text.indexOf(" ") + 1);
        await doCommandExecute(subText, terminal, command);
        return;
    }
    // 执行命令
    await doAction(command, parsedOptions, terminal, parentCommand);
};



/**
 * 获取命令函数（匹配）
 * @param text
 * @param parentCommand
 */
const getCommand = (text: string, parentCommand?: CommandType): CommandType => {
    let func = text.split(" ", 1)[0]; //匹配指令，不带参数，如help
    // 大小写无关
    func = func.toLowerCase();
    let commands = commandMap;
    // 有父命令，则从父命令中查找
    if (
        parentCommand &&
        parentCommand.subCommands &&
        Object.keys(parentCommand.subCommands).length > 0
    ) {
        commands = parentCommand.subCommands;
    }
    //匹配命令
    const command = commands[func]; //一个对象 OR undefined
    console.log("getCommand = ", command);
    return command;
};

/**
 * 解析参数
 * @param text
 * @param commandOptions
 */
const doParse = (
    text: string,
    commandOptions: CommandOptionType[]
): getopts.ParsedOptions => {
    // 过滤掉关键词
    const args: string[] = text.split(" ").slice(1);  //过滤掉指令，留下参数，（eg:[333003,-n])
    // 转换
    const options: getopts.Options = {
        alias: {},
        default: {},
        string: [],
        boolean: [],
    };
    //options是一个数组，可能有多个option
    commandOptions.forEach((commandOption) => {
        const { alias, key, type, defaultValue } = commandOption;
        if (alias && options.alias) {
            options.alias[key] = alias;
        }
        options[type]?.push(key);
        if (defaultValue && options.default) {
            options.default[key] = defaultValue;
        }
    });
    
    const parsedOptions = getopts(args, options);
    console.log("parsedOptions = ", parsedOptions);
    return parsedOptions;
};

/**
 * 执行
 * @param command
 * @param options
 * @param terminal
 * @param parentCommand
 */
const doAction = async (
    command: CommandType,
    options: getopts.ParsedOptions,
    terminal: TerminalType,
    parentCommand?: CommandType
) => {
    const { help } = options;
    // 设置输出折叠
    if (command.collapsible || help) {
        terminal.setCommandCollapsible(true);
    }

    // 查看帮助
    // eg： xxx --help => { _: ["xxx"] }
    if (help) {
        const newOptions = { ...options, _: [command.func] };
        helpCommand.action(newOptions, terminal, parentCommand);
        return;
    }
    await command.action(options, terminal);
};
