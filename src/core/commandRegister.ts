/**
 * 注册指令文件
 */

import { CommandType } from "./command";
import searchCommands from "./commands/search/searchCommands";
import gotoCommand from "./commands/gotoCommand";
import dateCommand from "./commands/dateCommand";
import clearCommand from "./commands/terminal/clearCommand";
import historyCommand from "./commands/terminal/historyCommand";
import userCommands from "./commands/user/userCommands";
import timingCommand from "./commands/timing/timingCommand";
import backgroundCommand from "./commands/terminal/config/backgroundCommand";
import resetCommand from "./commands/terminal/config/resetCommand";
import fanyiCommand from "./commands/fanyi/fanyiCommand";
import helpCommand from "./commands/terminal/help/helpCommand";
import infoCommand from "./commands/terminal/info/infoCommand";
import pingCommand from "./commands/pingCommand";
import hintCommand from "./commands/terminal/config/hintCommand";
import todoCommand from "./commands/todo/todoCommand";
import musicCommand from "./commands/relax/music/musicCommand";
import ddosCommand from "./commands/relax/ddos/ddosCommand";
import gameCommand from "./commands/relax/game/gameCommand";
import shortcutCommand from "./commands/terminal/shortcut/shortcutCommand";
import welcomeCommand from "./commands/terminal/config/welcomeCommand";
import hotCommand from "./commands/hot/hotCommand";
import varbookCommand from "./commands/varbook/varbookCommand";
import fullScreenCommand from "./commands/search/fullScreen";
import huyaCommand from "./commands/relax/huyaCommand";
import UICommand from './commands/uidoc/index';
import articleCommand from "./commands/article/articleCommand";
/**
 * 命令列表（数组元素顺序会影响 help 命令的展示顺序）
 */
const commandList: CommandType[] = [
    ...userCommands,
    shortcutCommand,
    ...UICommand,
    gotoCommand,
    ...searchCommands,
    varbookCommand,
    hotCommand,
    gameCommand,
    huyaCommand,
    todoCommand,
    timingCommand,
    dateCommand,
    clearCommand,
    fanyiCommand,
    pingCommand,
    musicCommand,
    ddosCommand,
    welcomeCommand,
    backgroundCommand,
    articleCommand,
    resetCommand,
    hintCommand,
    fullScreenCommand,
    historyCommand,
    helpCommand,
    infoCommand,
];

/**
 * 命令字典
 */
const commandMap: Record<string, CommandType> = {};

//设置命令map
//eg:help:{func:....,alias:....}
commandList.forEach((command) => {
    commandMap[command.func] = command;
    command.alias?.forEach((name) => {
        commandMap[name] = command;
    });
});

export { commandList, commandMap };
